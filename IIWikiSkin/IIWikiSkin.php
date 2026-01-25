<?php
/**
 * IIWiki Skin
 *
 * @file
 * @ingroup Skins
 */

namespace MediaWiki\Skins\IIWiki;

use MediaWiki\MediaWikiServices;
use SkinMustache;
use SkinTemplate;

/**
 * Skin class for IIWiki
 * @ingroup Skins
 */
class SkinIIWiki extends SkinMustache {
    
    /** @var string */
    private const SKIN_NAME = 'iiwikiskin';

    /**
     * @inheritDoc
     */
    public function __construct( $options = [] ) {
        $options['name'] = self::SKIN_NAME;
        $options['templateDirectory'] = __DIR__ . '/../templates';
        parent::__construct( $options );
    }

    /**
     * @inheritDoc
     */
    public function getTemplateData(): array {
        $data = parent::getTemplateData();
        $config = $this->getConfig();
        
        // Add IIWiki-specific template data
        $data['data-iiwiki'] = [
            'show-portal-links' => $config->get( 'IIWikiShowPortalLinks' ),
            'enable-worldbuilding' => $config->get( 'IIWikiEnableWorldbuildingFeatures' ),
            'featured-article' => $config->get( 'IIWikiFeaturedArticle' ),
        ];

        // Add portal/community links
        $data['data-portals'] = $this->getPortalLinks();
        
        // Add category navigation
        $data['data-categories-nav'] = $this->getCategoryNavigation();
        
        // Custom footer data
        $data['data-iiwiki-footer'] = $this->getIIWikiFooter();

        return $data;
    }

    /**
     * Get portal/community links for sidebar
     * @return array
     */
    private function getPortalLinks(): array {
        return [
            [
                'href' => '/w/Portal:Ajax',
                'text' => 'Ajax',
                'class' => 'portal-link'
            ],
            [
                'href' => '/w/Portal:Anteria',
                'text' => 'Anteria',
                'class' => 'portal-link'
            ],
            [
                'href' => '/w/Portal:Astyria',
                'text' => 'Astyria',
                'class' => 'portal-link'
            ],
            [
                'href' => '/w/Portal:Coalition_of_Crown_Albatross',
                'text' => 'Coalition of Crown Albatross',
                'class' => 'portal-link'
            ],
            [
                'href' => '/w/Portal:Eurth',
                'text' => 'Eurth',
                'class' => 'portal-link'
            ],
            [
                'href' => '/w/Portal:Kali_Yuga',
                'text' => 'Kali Yuga',
                'class' => 'portal-link'
            ],
        ];
    }

    /**
     * Get category navigation links
     * @return array
     */
    private function getCategoryNavigation(): array {
        return [
            [
                'href' => '/w/Category:Countries',
                'text' => 'Countries',
                'icon' => 'globe'
            ],
            [
                'href' => '/w/Category:Regions',
                'text' => 'Regions',
                'icon' => 'map'
            ],
            [
                'href' => '/w/Category:Organizations',
                'text' => 'Organizations',
                'icon' => 'organization'
            ],
            [
                'href' => '/w/Category:People',
                'text' => 'People',
                'icon' => 'user'
            ],
            [
                'href' => '/w/Category:Culture',
                'text' => 'Culture',
                'icon' => 'palette'
            ],
            [
                'href' => '/w/Category:History',
                'text' => 'History',
                'icon' => 'clock'
            ],
            [
                'href' => '/w/Category:Politics',
                'text' => 'Politics',
                'icon' => 'gavel'
            ],
            [
                'href' => '/w/Category:Military',
                'text' => 'Military',
                'icon' => 'shield'
            ],
        ];
    }

    /**
     * Get custom footer content
     * @return array
     */
    private function getIIWikiFooter(): array {
        return [
            'tagline' => 'SimFic and Alt-History Encyclopedia',
            'links' => [
                [
                    'href' => 'https://discord.gg/J5qH7Pv',
                    'text' => 'IIWiki on Discord',
                    'icon' => 'discord'
                ],
                [
                    'href' => 'https://www.patreon.com/iiwiki/overview',
                    'text' => 'Support on Patreon',
                    'icon' => 'patreon'
                ],
                [
                    'href' => 'https://forum.nationstates.net/viewtopic.php?f=5&t=349466',
                    'text' => 'NSForums Thread',
                    'icon' => 'forum'
                ],
            ]
        ];
    }

    /**
     * @inheritDoc
     */
    public function getDefaultModules(): array {
        $modules = parent::getDefaultModules();
        $modules['styles']['skin'][] = 'skins.iiwiki.styles';
        $modules['core'][] = 'skins.iiwiki.js';
        return $modules;
    }
}