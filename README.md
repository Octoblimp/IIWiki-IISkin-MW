# IIWiki-IISkin-MW

A custom MediaWiki skin for [IIWiki](https://iiwiki.com), the SimFic and Alt-History Encyclopedia.

## Overview

**IISkin** is a modern, clean MediaWiki skin with a light blue-grey color palette. It's designed to be unobtrusive and professional, keeping the focus on your worldbuilding content while providing useful features for wiki contributors.

## Features

- 🎨 **Modern Design** - Clean, light blue-grey color palette
- 🔔 **Notifications** - Full support for Extension:Echo notifications
- 📱 **Responsive** - Works on desktop, tablet, and mobile
- 🌍 **Worldbuilding Focused** - Quick article creation, wiki-friendly navigation
- ⚡ **Lightweight** - Pure CSS styling, minimal JavaScript
- 🖼️ **Logo Support** - Uses standard `$wgLogos` configuration
- ⌨️ **Keyboard Shortcuts** - Press `/` to focus search, `Esc` to clear
- 🖨️ **Print Ready** - Clean print styles included

## Quick Install

1. Copy the `IISkin` folder to `skins/IISkin` in your MediaWiki installation

2. Add to `LocalSettings.php`:
   ```php
   wfLoadSkin( 'IISkin' );
   $wgDefaultSkin = 'iiskin';
   
   // Configure logo
   $wgLogos = [
       'icon' => '/path/to/logo.png',    // 50x50 icon
       '1x' => '/path/to/logo-1x.png',   // 135x135 standard
       '2x' => '/path/to/logo-2x.png',   // 270x270 retina (optional)
   ];
   ```

3. Clear your MediaWiki cache and reload

## Notifications Setup

IISkin supports Echo notifications. To enable:

```php
// In LocalSettings.php
wfLoadExtension( 'Echo' );
```

Notification icons will appear in the header next to user links.

## Requirements

- MediaWiki 1.43.0+
- PHP 8.1+

## File Structure

```
IISkin/
├── skin.json           # Skin manifest
├── templates/
│   └── skin.mustache   # Main template
├── resources/
│   ├── skin.css        # All styling
│   └── skin.js         # Interactive features
└── i18n/
    └── en.json         # English messages
```

## Customization

### Colors

Edit the CSS variables in `resources/skin.css`:

```css
:root {
    --ii-accent: #4a90a4;        /* Primary accent color */
    --ii-link: #2b6cb0;          /* Link color */
    --ii-bg: #f4f6f8;            /* Background color */
    --ii-text: #243b53;          /* Main text color */
}
```

### Logo

IISkin uses MediaWiki's `$wgLogos` configuration. Set up in LocalSettings.php:

```php
$wgLogos = [
    'icon' => "$wgResourceBasePath/resources/assets/wiki-icon.png",
    '1x' => "$wgResourceBasePath/resources/assets/wiki-logo.png",
];
```

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile Safari & Chrome

## License

GPL-2.0-or-later