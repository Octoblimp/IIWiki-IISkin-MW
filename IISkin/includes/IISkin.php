<?php
/**
 * IISkin - A custom MediaWiki skin for IIWiki
 *
 * @file
 * @ingroup Skins
 */

namespace MediaWiki\Skins\IISkin;

use MediaWiki\MediaWikiServices;
use SkinMustache;
use SkinTemplate;

/**
 * IISkin class extending SkinMustache
 * Based on the classic Vector skin design
 */
class IISkin extends SkinMustache {

	/**
	 * @inheritDoc
	 */
	public function __construct( $options = [] ) {
		$options['templateDirectory'] = __DIR__ . '/../templates';
		parent::__construct( $options );
	}

	/**
	 * @inheritDoc
	 */
	public function getTemplateData(): array {
		$data = parent::getTemplateData();
		$out = $this->getOutput();
		$config = $this->getConfig();

		// Add custom data for IISkin
		$data['data-iiskin'] = [
			'is-article' => $this->getTitle()->isContentPage(),
			'is-main-page' => $this->getTitle()->isMainPage(),
			'html-subtitle' => $out->getSubtitle(),
			'show-footer-icons' => $config->get( 'IISkinShowFooterIcons' ),
		];

		// Add body classes
		$data['html-body-class'] = implode( ' ', $this->getBodyClasses() );

		return $data;
	}

	/**
	 * Get additional body classes
	 *
	 * @return array
	 */
	private function getBodyClasses(): array {
		$classes = [];
		
		if ( $this->getTitle()->isMainPage() ) {
			$classes[] = 'iiskin-main-page';
		}
		
		if ( $this->getTitle()->isContentPage() ) {
			$classes[] = 'iiskin-content-page';
		}

		return $classes;
	}

	/**
	 * @inheritDoc
	 */
	public function getDefaultModules(): array {
		$modules = parent::getDefaultModules();
		$modules['styles']['skin'][] = 'skins.iiskin.styles';
		$modules['core'][] = 'skins.iiskin.js';
		return $modules;
	}
}
