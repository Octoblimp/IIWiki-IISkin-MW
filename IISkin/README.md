# IISkin - MediaWiki Skin for IIWiki

A clean, unobtrusive MediaWiki skin with a light blue-grey color palette.

## Features

- **Clean, minimal design** - Professional appearance that doesn't distract
- **Light blue-grey colors** - Subtle, neutral palette
- **Responsive** - Works on desktop, tablet, and mobile
- **Simple structure** - Easy to customize

## Requirements

- MediaWiki 1.43.0 or later

## Installation

1. Copy the `IISkin` folder to your MediaWiki `skins/` directory

2. Add to `LocalSettings.php`:
   ```php
   wfLoadSkin( 'IISkin' );
   $wgDefaultSkin = 'iiskin';
   ```

3. Configure your logo:
   ```php
   $wgLogos = [
       'icon' => "$wgResourceBasePath/resources/assets/your-logo.png",
   ];
   ```

## Directory Structure

```
IISkin/
├── skin.json              # Skin manifest
├── templates/
│   └── skin.mustache      # Main template
├── resources/
│   ├── skin.css           # Main stylesheet
│   └── skin.js            # JavaScript
├── i18n/
│   ├── en.json            # English messages
│   └── qqq.json           # Message documentation
└── README.md
```

## Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Background | `#ffffff` | Main content |
| Secondary | `#f8f9fa` | Sidebar, tables |
| Header | `#f1f3f5` | Header, footer |
| Border | `#dee2e6` | Borders |
| Text | `#212529` | Primary text |
| Accent | `#5a7a96` | Buttons, highlights |
| Links | `#3366cc` | Links |

## Customization

Override styles by creating a custom CSS in `LocalSettings.php`:

```php
$wgResourceModules['skins.iiskin.custom'] = [
    'styles' => 'path/to/custom.css',
];
```

## License

GPL-2.0-or-later
