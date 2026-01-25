/**
 * IISkin JavaScript
 * Interactive functionality for the skin
 */

( function () {
	'use strict';

	/**
	 * IISkin main module
	 */
	var IISkin = {
		/**
		 * Initialize the skin
		 */
		init: function () {
			this.setupSidebar();
			this.setupDropdowns();
			this.setupSearch();
			this.setupAccessibility();
		},

		/**
		 * Setup mobile sidebar toggle
		 */
		setupSidebar: function () {
			var sidebar = document.getElementById( 'mw-sidebar' );
			var toggleBtn = document.getElementById( 'iiskin-sidebar-toggle' );
			var body = document.body;

			if ( !sidebar || !toggleBtn ) {
				return;
			}

			// Create overlay
			var overlay = document.createElement( 'div' );
			overlay.className = 'iiskin-sidebar-overlay';
			overlay.id = 'iiskin-sidebar-overlay';
			body.appendChild( overlay );

			// Toggle sidebar
			toggleBtn.addEventListener( 'click', function ( e ) {
				e.preventDefault();
				e.stopPropagation();
				sidebar.classList.toggle( 'iiskin-sidebar-open' );
				overlay.classList.toggle( 'iiskin-overlay-visible' );
				body.classList.toggle( 'iiskin-sidebar-active' );

				// Update aria-expanded
				var isOpen = sidebar.classList.contains( 'iiskin-sidebar-open' );
				toggleBtn.setAttribute( 'aria-expanded', isOpen ? 'true' : 'false' );
			} );

			// Close sidebar when clicking overlay
			overlay.addEventListener( 'click', function () {
				sidebar.classList.remove( 'iiskin-sidebar-open' );
				overlay.classList.remove( 'iiskin-overlay-visible' );
				body.classList.remove( 'iiskin-sidebar-active' );
				toggleBtn.setAttribute( 'aria-expanded', 'false' );
			} );

			// Close sidebar on escape key
			document.addEventListener( 'keydown', function ( e ) {
				if ( e.key === 'Escape' && sidebar.classList.contains( 'iiskin-sidebar-open' ) ) {
					sidebar.classList.remove( 'iiskin-sidebar-open' );
					overlay.classList.remove( 'iiskin-overlay-visible' );
					body.classList.remove( 'iiskin-sidebar-active' );
					toggleBtn.setAttribute( 'aria-expanded', 'false' );
				}
			} );
		},

		/**
		 * Setup dropdown menus
		 */
		setupDropdowns: function () {
			var dropdownCheckboxes = document.querySelectorAll( '.iiskin-dropdown-checkbox' );

			// Close dropdowns when clicking outside
			document.addEventListener( 'click', function ( e ) {
				dropdownCheckboxes.forEach( function ( checkbox ) {
					var container = checkbox.closest( '.iiskin-user-dropdown, .iiskin-actions-dropdown, .iiskin-variants-dropdown' );
					if ( container && !container.contains( e.target ) ) {
						checkbox.checked = false;
					}
				} );
			} );

			// Close on escape key
			document.addEventListener( 'keydown', function ( e ) {
				if ( e.key === 'Escape' ) {
					dropdownCheckboxes.forEach( function ( checkbox ) {
						checkbox.checked = false;
					} );
				}
			} );

			// Keyboard navigation for dropdown items
			dropdownCheckboxes.forEach( function ( checkbox ) {
				var container = checkbox.closest( '.iiskin-user-dropdown, .iiskin-actions-dropdown, .iiskin-variants-dropdown' );
				if ( !container ) {
					return;
				}

				var toggle = container.querySelector( 'label[for="' + checkbox.id + '"]' );
				var menu = container.querySelector( '.iiskin-dropdown-content' );

				if ( toggle && menu ) {
					toggle.addEventListener( 'keydown', function ( e ) {
						if ( e.key === 'Enter' || e.key === ' ' ) {
							e.preventDefault();
							checkbox.checked = !checkbox.checked;
						}
						if ( e.key === 'ArrowDown' && checkbox.checked ) {
							e.preventDefault();
							var firstLink = menu.querySelector( 'a' );
							if ( firstLink ) {
								firstLink.focus();
							}
						}
					} );

					// Allow arrow key navigation within menu
					menu.addEventListener( 'keydown', function ( e ) {
						if ( e.key === 'ArrowDown' || e.key === 'ArrowUp' ) {
							e.preventDefault();
							var links = Array.from( menu.querySelectorAll( 'a' ) );
							var currentIndex = links.indexOf( document.activeElement );
							var nextIndex;

							if ( e.key === 'ArrowDown' ) {
								nextIndex = currentIndex < links.length - 1 ? currentIndex + 1 : 0;
							} else {
								nextIndex = currentIndex > 0 ? currentIndex - 1 : links.length - 1;
							}

							links[ nextIndex ].focus();
						}
					} );
				}
			} );
		},

		/**
		 * Setup search enhancements
		 */
		setupSearch: function () {
			var searchInput = document.getElementById( 'searchInput' );
			var searchForm = document.getElementById( 'searchform' );

			if ( !searchInput || !searchForm ) {
				return;
			}

			// Clear button functionality (could be added in future)
			// Autocomplete is handled by MediaWiki core

			// Focus search on keyboard shortcut (Alt+Shift+F is default)
			// This is already handled by MediaWiki, but we ensure it works
		},

		/**
		 * Setup accessibility enhancements
		 */
		setupAccessibility: function () {
			// Skip to content link
			var skipLink = document.createElement( 'a' );
			skipLink.href = '#mw-content';
			skipLink.className = 'iiskin-skip-link';
			skipLink.textContent = 'Skip to main content';
			skipLink.style.cssText = 'position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;' +
				'z-index:9999;padding:1em;background:#fff;';

			skipLink.addEventListener( 'focus', function () {
				this.style.cssText = 'position:fixed;left:10px;top:10px;width:auto;height:auto;overflow:visible;' +
					'z-index:9999;padding:1em;background:#fff;border:2px solid #4a5568;border-radius:4px;';
			} );

			skipLink.addEventListener( 'blur', function () {
				this.style.cssText = 'position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;' +
					'z-index:9999;padding:1em;background:#fff;';
			} );

			document.body.insertBefore( skipLink, document.body.firstChild );

			// Add aria-current to current page in navigation
			var currentPageLinks = document.querySelectorAll( '.iiskin-namespaces .selected a' );
			currentPageLinks.forEach( function ( link ) {
				link.setAttribute( 'aria-current', 'page' );
			} );
		}
	};

	// Initialize when DOM is ready
	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', function () {
			IISkin.init();
		} );
	} else {
		IISkin.init();
	}

	// Expose for debugging
	window.IISkin = IISkin;

}() );
