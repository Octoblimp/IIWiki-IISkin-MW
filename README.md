# IIWiki Skin for MediaWiki 1.43+

A custom skin designed for IIWiki, a SimFic and Alt-History Encyclopedia.

## Features

- **Modern Design**: Clean, professional layout inspired by Vector with modern enhancements
- **Responsive**: Fully responsive design with mobile menu
- **Category Navigation**: Quick access category bar in header
- **Community Portals**: Sidebar integration for worldbuilding communities
- **Dark Mode**: Automatic dark mode based on user preference
- **Performance**: Optimized CSS and JavaScript with lazy loading
- **Accessibility**: WCAG 2.1 compliant with proper ARIA labels
- **Print Styles**: Optimized styles for printing articles

## Installation

1. Download and extract the `IIWikiSkin` folder to your MediaWiki `skins/` directory.

2. Add the following to your `LocalSettings.php`:

```php
wfLoadSkin( 'IIWikiSkin' );
$wgDefaultSkin = 'iiwikiskin';
```

3. Optional configuration:

```php
// Show portal links in sidebar
$wgIIWikiShowPortalLinks = true;

// Enable worldbuilding-focused UI features
$wgIIWikiEnableWorldbuildingFeatures = true;

// Set featured article (page name)
$wgIIWikiFeaturedArticle = 'Some Featured Article';
```

## Customization

### Logo
Replace `resources/images/logo.png` with your own logo (recommended size: 200x50px).

### Colors
Edit the CSS variables in `resources/skins.iiwiki.styles.css` under the `:root` selector to customize the color scheme.

### Portal Links
Modify the `getPortalLinks()` method in `includes/SkinIIWiki.php` to add or remove community portal links.

## Requirements

- MediaWiki 1.43.0 or higher
- PHP 8.0 or higher

## License

GPL-2.0-or-later

## Credits

Developed for IIWiki by the IIWiki Team.