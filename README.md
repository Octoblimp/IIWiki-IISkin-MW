# IIWiki-IISkin-MW

A custom MediaWiki skin designed for [IIWiki](https://iiwiki.com), a SimFic and Alt-History Encyclopedia.

## Overview

**IISkin** is a clean, unobtrusive MediaWiki skin based on the classic Vector design. It features a neutral blue-grey color palette that provides a professional, wiki-appropriate appearance without being distracting.

## Features

- 🎨 **Classic Vector-inspired design** - Familiar layout with sidebar navigation and content tabs
- 🔵 **Neutral blue-grey colors** - Professional, unobtrusive palette
- 📱 **Fully responsive** - Works on desktop, tablet, and mobile
- ♿ **Accessible** - Skip links, keyboard navigation, proper ARIA attributes
- 🔔 **Extension support** - Styled Echo notifications and other extensions
- 🖼️ **Logo support** - Uses `$wgLogos` or `$wgLogo` configuration

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

## Requirements

- MediaWiki 1.43.0+
- PHP 8.0+

## Documentation

See [IISkin/README.md](IISkin/README.md) for full documentation including:
- Detailed installation instructions
- Configuration options
- Customization guide
- Color palette reference

## License

GPL-2.0-or-later