# IIWiki-IISkin-MW

A custom MediaWiki skin for [IIWiki](https://iiwiki.com), the SimFic and Alt-History Encyclopedia.

## Overview

**IISkin** is a clean, minimal MediaWiki skin with a light blue-grey color palette. It's designed to be unobtrusive and professional, keeping the focus on the content.

## Features

- 🎨 Clean, minimal design
- 🔵 Light blue-grey color palette  
- 📱 Fully responsive (desktop, tablet, mobile)
- ⚡ Simple, lightweight structure
- 🖼️ Supports `$wgLogos` for custom logos

## Quick Install

1. Copy the `IISkin` folder to `skins/IISkin` in your MediaWiki installation

2. Add to `LocalSettings.php`:
   ```php
   wfLoadSkin( 'IISkin' );
   $wgDefaultSkin = 'iiskin';
   ```

3. Clear your cache and reload

## Requirements

- MediaWiki 1.43.0+

## Documentation

See [IISkin/README.md](IISkin/README.md) for detailed documentation.

## License

GPL-2.0-or-later