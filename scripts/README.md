# Optimization Scripts

This directory contains scripts to optimize media files for web deployment.

## Available Scripts

### `optimize-videos.sh`
Optimizes video files for web delivery and reduces file sizes.

**Usage:**
```bash
npm run optimize:videos
```

**What it does:**
- Reduces video size by ~70% (11MB → ~3MB)
- Optimizes for web streaming with `faststart` flag
- Maintains good visual quality (CRF 28)
- Scales videos to max 1080p if larger

**Requirements:**
- FFmpeg: `brew install ffmpeg` (macOS) or `sudo apt install ffmpeg` (Linux)

---

### `optimize-images.sh`
Converts JPG/PNG images to WebP format and optionally resizes them.

**Basic Usage:**
```bash
# Convert to WebP (keep original size)
npm run optimize:images

# Convert AND resize posters to 120x180px
npm run optimize:images -- --resize

# Set custom quality
npm run optimize:images -- --quality 85

# Show help
npm run optimize:images -- --help
```

**Options:**
- `--resize` - Resize poster images to 120×180px
- `--quality NUM` - Set WebP quality (default: 80, range: 0-100)
- `--help` - Show help message

**What it does:**
- Converts JPG/PNG to WebP format
- Reduces file size by 60-80%
- Optionally resizes posters to exact dimensions (120×180px)
- Uses ImageMagick for high-quality conversion

**Requirements:**
- ImageMagick: `brew install imagemagick` (macOS) or `sudo apt-get install imagemagick` (Linux)

---

### `optimize:all`
Runs both image and video optimization scripts.

**Usage:**
```bash
npm run optimize:all
```

---

## Examples

**New poster workflow:**
```bash
# 1. Add new JPG posters to public/posters/
cp my-new-posters/*.jpg public/posters/

# 2. Resize and convert to WebP
npm run optimize:images -- --resize

# 3. Remove original JPG files (optional)
rm public/posters/*.jpg
```

**Before deployment:**
```bash
# Optimize all media files
npm run optimize:all

# Build and verify
npm run build
npm run serve

# Deploy
git add .
git commit -m "Optimize media files"
git push
```

---

## File Sizes

**Typical results:**

| Media Type | Before | After | Reduction |
|------------|--------|-------|-----------|
| Video (each) | 11MB | 3MB | ~70% |
| Poster JPG | 50-100KB | 3-8KB | ~80-90% |
| Other images | Varies | 60-80% smaller | 60-80% |

---

## Troubleshooting

**"Command not found" errors:**
- Install required tools: `brew install ffmpeg imagemagick`

**"Permission denied":**
- Make scripts executable: `chmod +x scripts/*.sh`

**Poor quality after optimization:**
- Increase quality: `npm run optimize:images -- --quality 90`
- For videos, edit `scripts/optimize-videos.sh` and change CRF value (lower = better quality, larger file)
