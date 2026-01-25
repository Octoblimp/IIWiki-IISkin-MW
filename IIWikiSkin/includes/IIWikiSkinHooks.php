<?php
/**
 * Hooks for IIWiki Skin
 *
 * @file
 * @ingroup Skins
 */

namespace MediaWiki\Skins\IIWiki;

use MediaWiki\Hook\BeforePageDisplayHook;
use MediaWiki\Output\OutputPage;
use MediaWiki\ResourceLoader\Hook\SkinPageReadyConfigHook;
use Skin;

class Hooks implements BeforePageDisplayHook, SkinPageReadyConfigHook {

    /**
     * @inheritDoc
     */
    public function onBeforePageDisplay( $out, $skin ): void {
        if ( $skin->getSkinName() === 'iiwikiskin' ) {
            // Add OpenGraph meta tags for better social sharing
            $out->addMeta( 'og:site_name', 'IIWiki' );
            $out->addMeta( 'og:type', 'article' );
            
            // Add custom body classes based on namespace
            $title = $out->getTitle();
            if ( $title ) {
                $namespace = $title->getNamespace();
                $out->addBodyClasses( 'ns-' . $namespace );
                
                // Special classes for Portal pages
                if ( $namespace === NS_PROJECT && str_starts_with( $title->getText(), 'Portal:' ) ) {
                    $out->addBodyClasses( 'iiwiki-portal-page' );
                }
            }
        }
    }

    /**
     * @inheritDoc
     */
    public function onSkinPageReadyConfig( $context, array &$config ): void {
        // Configure page ready features for IIWiki skin
        if ( $context->getSkin()->getSkinName() === 'iiwikiskin' ) {
            $config['search'] = true;
            $config['collapsibleTabs'] = true;
        }
    }
}