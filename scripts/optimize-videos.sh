#!/bin/bash

# Video optimization script for Vercel deployment
# Reduces video size by ~70% while maintaining good quality

echo "🎬 Optimizing videos for web deployment..."

# Check if ffmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo "❌ FFmpeg is not installed!"
    echo "📦 Install it with: brew install ffmpeg"
    exit 1
fi

cd public

# Optimize each video
for i in 1 2 3; do
    input="video-$i.mp4"
    output="video-$i-optimized.mp4"

    if [ -f "$input" ]; then
        echo "⚙️  Optimizing $input..."

        # Optimize: reduce size, web-optimized
        ffmpeg -i "$input" \
            -c:v libx264 \
            -crf 28 \
            -preset medium \
            -vf "scale='min(1080,iw)':'min(1920,ih)':force_original_aspect_ratio=decrease" \
            -movflags +faststart \
            -c:a aac \
            -b:a 128k \
            "$output" \
            -y -hide_banner -loglevel error

        if [ $? -eq 0 ]; then
            # Get file sizes
            original_size=$(du -h "$input" | cut -f1)
            optimized_size=$(du -h "$output" | cut -f1)

            echo "✅ $input: $original_size → $optimized_size"

            # Replace original
            mv "$output" "$input"
        else
            echo "❌ Failed to optimize $input"
            rm -f "$output"
        fi
    fi
done

echo ""
echo "✨ Optimization complete!"
echo "📊 Total size:"
du -sh video-*.mp4
