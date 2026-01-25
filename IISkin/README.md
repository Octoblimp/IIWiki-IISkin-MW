# IISkin - MediaWiki Skin for IIWiki

A clean, unobtrusive MediaWiki skin designed for **IIWiki** - the SimFic and Alt-History Encyclopedia. Based on the classic Vector skin design with modern enhancements and a neutral blue-grey color palette.

## Features

- **Classic Vector-inspired layout** - Familiar sidebar navigation with content tabs
- **Neutral blue-grey color scheme** - Professional, unobtrusive design
- **Responsive design** - Works on desktop, tablet, and mobile devices
- **Modern CSS/Less** - Clean, maintainable stylesheets with CSS custom properties
- **Accessibility** - Skip links, keyboard navigation, ARIA attributes
- **Extension compatibility** - Styled support for Echo notifications and other extensions
- **$wgLogo support** - Uses MediaWiki's standard logo configuration

## Requirements

- MediaWiki 1.43.0 or later
- PHP 8.0 or later

## Installation

1. Download and extract the skin files to your MediaWiki `skins/` directory:
   ```
   skins/IISkin/
   ```

2. Add the following to your `LocalSettings.php`:
   ```php
   wfLoadSkin( 'IISkin' );
   ```

3. (Optional) Set IISkin as the default skin:
   ```php
   $wgDefaultSkin = 'iiskin';
   ```

## Configuration

### Logo Setup

IISkin uses MediaWiki's standard logo configuration. Add to your `LocalSettings.php`:

```php
$wgLogos = [
    'icon' => "$wgResourceBasePath/resources/assets/your-logo.png",
    // Optional: Add a wordmark
    'wordmark' => [
        'src' => "$wgResourceBasePath/resources/assets/your-wordmark.png",
        'width' => 135,
        'height' => 20,
    ],
];
```

Or use the legacy method:
```php
$wgLogo = "$wgResourceBasePath/resources/assets/wiki.png";
```

### Skin Options

```php
// Show footer icons (default: true)
$wgIISkinShowFooterIcons = true;
```

## Directory Structure

```
IISkin/
├── skin.json                 # Skin manifest
├── includes/
│   └── IISkin.php           # Main skin class
├── templates/
│   ├── skin.mustache        # Main template
│   ├── Logo.mustache        # Logo component
│   ├── SearchBox.mustache   # Search box component
│   ├── PersonalMenu.mustache # User menu component
│   ├── Sidebar.mustache     # Sidebar navigation
│   ├── ContentActions.mustache # Page tabs
│   └── Footer.mustache      # Footer component
├── resources/
│   ├── skins.iiskin.styles/
│   │   ├── main.less        # Main stylesheet entry
│   │   ├── variables.less   # Color palette & variables
│   │   ├── mixins.less      # Reusable patterns
│   │   ├── layout.less      # Page structure
│   │   ├── header.less      # Header styles
│   │   ├── sidebar.less     # Sidebar styles
│   │   ├── content.less     # Content area styles
│   │   ├── footer.less      # Footer styles
│   │   ├── components.less  # UI components
│   │   ├── responsive.less  # Mobile/tablet styles
│   │   ├── ext.echo.less    # Echo notification styles
│   │   └── mediawiki.action.view.postEdit.less
│   ├── skins.iiskin.js/
│   │   └── main.js          # JavaScript functionality
│   └── mediawiki.less/
│       └── mediawiki.skin.variables.less
├── i18n/
│   ├── en.json              # English messages
│   └── qqq.json             # Message documentation
└── README.md
```

## Color Palette

IISkin uses a neutral blue-grey palette that's professional and unobtrusive:

| Variable | Hex | Usage |
|----------|-----|-------|
| `@color-primary` | `#4a5568` | Primary blue-grey |
| `@color-accent` | `#5a7a9a` | Accent color |
| `@color-background` | `#ffffff` | Content background |
| `@color-background-header` | `#edf2f7` | Header background |
| `@color-border` | `#cbd5e0` | Standard borders |
| `@color-text` | `#2d3748` | Primary text |
| `@color-link` | `#3182ce` | Links |

## Customization

### Overriding Styles

Create a custom CSS file and add it in `LocalSettings.php`:

```php
$wgResourceModules['skins.iiskin.custom'] = [
    'styles' => [ 'skins/IISkin/custom.css' ],
    'dependencies' => [ 'skins.iiskin.styles' ],
];
```

### Changing Colors

Override the Less variables in a custom Less file or use CSS custom properties:

```css
:root {
    --iiskin-color-accent: #your-color;
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome for Android)

## Contributing

Contributions are welcome! Please submit issues and pull requests to the project repository.

## License

GNU General Public License v2.0 or later (GPL-2.0-or-later)

## Credits

- Inspired by MediaWiki's Vector skin
- Built for [IIWiki](https://iiwiki.com) - the SimFic and Alt-History Encyclopedia
- Uses MediaWiki's SkinMustache framework

## Changelog

### Version 1.0.0
- Initial release
- Classic Vector-inspired design
- Neutral blue-grey color palette
- Responsive layout
- Extension:Echo styling
- Accessibility features
