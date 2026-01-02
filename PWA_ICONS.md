# PWA Icons Guide

The app requires PWA icons for installation on iOS and Android devices.

## Required Icons

Place these files in the `public/` folder:

1. **pwa-192x192.png** - 192x192 pixels (Android)
2. **pwa-512x512.png** - 512x512 pixels (Android)
3. **apple-touch-icon.png** - 180x180 pixels (iOS)

## Quick Generation Methods

### Method 1: Online Tools (Easiest)

1. **PWA Asset Generator** (Recommended)
   - Go to: https://github.com/elegantapp/pwa-asset-generator
   - Or use: https://www.pwabuilder.com/imageGenerator
   - Upload a 512x512px source image
   - Download generated icons
   - Place in `public/` folder

2. **RealFaviconGenerator**
   - Go to: https://realfavicongenerator.net/
   - Upload your icon
   - Download and extract files
   - Place in `public/` folder

### Method 2: Manual Creation

1. Create a 512x512px square image
2. Use image editing software (Photoshop, GIMP, Canva, etc.)
3. Export/resize to required sizes:
   - 512x512px → `pwa-512x512.png`
   - 192x192px → `pwa-192x192.png`
   - 180x180px → `apple-touch-icon.png`

### Method 3: Simple Placeholder (For Testing)

If you just want to test the app, you can create simple colored squares:

1. Use any image editor or online tool
2. Create a solid color square (e.g., blue #3b82f6)
3. Add text "75" in the center
4. Export at required sizes

## Icon Design Tips

- **Keep it simple** - Icons are small on mobile
- **Use high contrast** - Should be visible on various backgrounds
- **Square format** - Will be automatically rounded on iOS
- **No text** - Or minimal, large text only
- **Brand colors** - Use your challenge theme colors

## Example Icon Ideas

- Number "75" in bold font
- Checkmark symbol
- Calendar icon
- Fitness/dumbbell icon
- Simple geometric shape with "75"

## Verification

After adding icons:

1. Build the app: `npm run build`
2. Check `dist/` folder - icons should be there
3. Deploy and test PWA installation
4. On mobile, try "Add to Home Screen"
5. Icon should appear on home screen

## Troubleshooting

### Icons not showing

- Verify files are in `public/` folder (not `src/`)
- Check file names match exactly (case-sensitive)
- Ensure files are PNG format
- Rebuild: `npm run build`

### Wrong icon on home screen

- Clear browser cache
- Uninstall PWA and reinstall
- Check `manifest.json` in `vite.config.js` references correct files

### Icon looks blurry

- Ensure source image is high resolution (512x512px minimum)
- Use PNG format (not JPEG)
- Avoid upscaling small images

