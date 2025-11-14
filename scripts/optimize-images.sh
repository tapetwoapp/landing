#!/bin/bash

# Image optimization script for Vercel deployment
# Optimizes JPG/PNG to WebP format with compression and resizing

echo "🖼️  Optimizing images for web deployment..."

# Default poster dimensions
POSTER_WIDTH=120
POSTER_HEIGHT=180
RESIZE_POSTERS=false
QUALITY=80

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --resize)
            RESIZE_POSTERS=true
            shift
            ;;
        --quality)
            QUALITY="$2"
            shift 2
            ;;
        --help)
            echo "Usage: $0 [OPTIONS]"
            echo ""
            echo "Options:"
            echo "  --resize         Resize poster images to 120x180px"
            echo "  --quality NUM    Set WebP quality (default: 80)"
            echo "  --help           Show this help message"
            exit 0
            ;;
        *)
            echo "Unknown option: $1"
            echo "Use --help for usage information"
            exit 1
            ;;
    esac
done

# Check if ImageMagick is installed
if ! command -v magick &> /dev/null && ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick is not installed!"
    echo ""
    echo "📦 Install it with:"
    echo "   macOS:  brew install imagemagick"
    echo "   Linux:  sudo apt-get install imagemagick"
    exit 1
fi

# Use 'magick' command if available (ImageMagick 7+), otherwise 'convert' (ImageMagick 6)
if command -v magick &> /dev/null; then
    MAGICK_CMD="magick"
    echo "✅ ImageMagick 7+ found"
else
    MAGICK_CMD="convert"
    echo "✅ ImageMagick 6 found"
fi

# Function to resize and optimize poster
resize_and_convert_poster() {
    local input="$1"
    local output="$2"

    # Resize to exact dimensions (120x180) and convert to WebP
    $MAGICK_CMD "$input" \
        -resize "${POSTER_WIDTH}x${POSTER_HEIGHT}^" \
        -gravity center \
        -extent "${POSTER_WIDTH}x${POSTER_HEIGHT}" \
        -quality "$QUALITY" \
        "$output" 2>/dev/null
    return $?
}

# Function to convert to WebP without resizing
convert_to_webp() {
    local input="$1"
    local output="$2"

    $MAGICK_CMD "$input" -quality "$QUALITY" "$output" 2>/dev/null
    return $?
}

# Optimize posters
echo ""
if [ "$RESIZE_POSTERS" = true ]; then
    echo "📁 Resizing and optimizing posters to ${POSTER_WIDTH}x${POSTER_HEIGHT}px..."
else
    echo "📁 Optimizing posters (keeping original dimensions)..."
fi

cd public/posters

optimized_count=0
for file in *.{jpg,jpeg,png,JPG,JPEG,PNG} 2>/dev/null; do
    # Skip if no files match
    if [ ! -f "$file" ]; then
        continue
    fi

    # Get filename without extension
    filename="${file%.*}"
    output="${filename}.webp"

    # Skip if already exists and we're not resizing
    if [ -f "$output" ] && [ "$RESIZE_POSTERS" = false ]; then
        echo "⏭️  Skipping $file (already has WebP version)"
        continue
    fi

    if [ "$RESIZE_POSTERS" = true ]; then
        echo "⚙️  Resizing and converting $file..."
        if resize_and_convert_poster "$file" "$output"; then
            original_size=$(du -h "$file" | cut -f1)
            optimized_size=$(du -h "$output" | cut -f1)
            echo "✅ $file: $original_size → $optimized_size (${POSTER_WIDTH}x${POSTER_HEIGHT}px)"
            ((optimized_count++))
        else
            echo "❌ Failed to process $file"
            rm -f "$output"
        fi
    else
        echo "⚙️  Converting $file to WebP..."
        if convert_to_webp "$file" "$output"; then
            original_size=$(du -h "$file" | cut -f1)
            optimized_size=$(du -h "$output" | cut -f1)
            echo "✅ $file: $original_size → $optimized_size"
            ((optimized_count++))
        else
            echo "❌ Failed to convert $file"
            rm -f "$output"
        fi
    fi
done

cd ../..

# Optimize other images in public folder
echo ""
echo "📁 Optimizing other images in public folder..."
cd public

for file in *.{jpg,jpeg,png,JPG,JPEG,PNG} 2>/dev/null; do
    # Skip if no files match
    if [ ! -f "$file" ]; then
        continue
    fi

    filename="${file%.*}"
    output="${filename}.webp"

    if [ -f "$output" ]; then
        echo "⏭️  Skipping $file (already has WebP version)"
        continue
    fi

    echo "⚙️  Converting $file to WebP..."

    if convert_to_webp "$file" "$output"; then
        original_size=$(du -h "$file" | cut -f1)
        optimized_size=$(du -h "$output" | cut -f1)
        echo "✅ $file: $original_size → $optimized_size"
        ((optimized_count++))
    else
        echo "❌ Failed to convert $file"
        rm -f "$output"
    fi
done

cd ..

echo ""
if [ $optimized_count -eq 0 ]; then
    echo "ℹ️  No new images to optimize (all images are already in WebP format)"
else
    echo "✨ Optimization complete! Converted $optimized_count image(s)"
fi

echo ""
echo "📊 Current poster sizes:"
du -sh public/posters/
