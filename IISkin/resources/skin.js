/**
 * IISkin JavaScript
 * Modern interactions for IIWiki
 */
( function () {
	'use strict';

	/**
	 * Initialize IISkin functionality
	 */
	function init() {
		setupSearch();
		setupStickyHeader();
		setupMobileNav();
	}

	/**
	 * Enhanced search functionality
	 */
	function setupSearch() {
		var searchInput = document.getElementById( 'searchInput' );
		var searchForm = document.getElementById( 'searchform' );
		
		if ( searchInput ) {
			// Focus search on keyboard shortcut (Alt+Shift+F or just /)
			document.addEventListener( 'keydown', function ( e ) {
				// Press / to focus search (when not in input/textarea)
				if ( e.key === '/' && !isEditableElement( e.target ) ) {
					e.preventDefault();
					searchInput.focus();
				}
			});
			
			// Clear search on Escape
			searchInput.addEventListener( 'keydown', function ( e ) {
				if ( e.key === 'Escape' ) {
					this.value = '';
					this.blur();
				}
			});
		}
	}

	/**
	 * Check if element is editable
	 */
	function isEditableElement( element ) {
		var tagName = element.tagName.toLowerCase();
		return tagName === 'input' || 
			   tagName === 'textarea' || 
			   element.contentEditable === 'true';
	}

	/**
	 * Sticky header with hide on scroll down, show on scroll up
	 */
	function setupStickyHeader() {
		var header = document.getElementById( 'iiskin-header' );
		if ( !header ) return;

		var lastScrollY = 0;
		var ticking = false;

		function onScroll() {
			var currentScrollY = window.scrollY;
			
			// Only hide header after scrolling 100px
			if ( currentScrollY > 100 ) {
				// Scrolling down - hide header
				if ( currentScrollY > lastScrollY ) {
					header.classList.add( 'iiskin-header--hidden' );
				} else {
					// Scrolling up - show header
					header.classList.remove( 'iiskin-header--hidden' );
				}
			} else {
				header.classList.remove( 'iiskin-header--hidden' );
			}
			
			lastScrollY = currentScrollY;
			ticking = false;
		}

		window.addEventListener( 'scroll', function () {
			if ( !ticking ) {
				requestAnimationFrame( onScroll );
				ticking = true;
			}
		}, { passive: true });
	}

	/**
	 * Mobile navigation toggle
	 */
	function setupMobileNav() {
		// Create mobile menu button if on small screen
		if ( window.innerWidth <= 768 ) {
			var sidebar = document.getElementById( 'iiskin-sidebar' );
			var header = document.getElementById( 'iiskin-header' );
			
			if ( sidebar && header ) {
				// Create toggle button
				var toggleBtn = document.createElement( 'button' );
				toggleBtn.className = 'iiskin-mobile-menu-btn';
				toggleBtn.innerHTML = '☰';
				toggleBtn.setAttribute( 'aria-label', 'Toggle menu' );
				toggleBtn.style.cssText = 'display:none; padding:8px 12px; background:transparent; border:1px solid var(--ii-border); border-radius:var(--ii-radius-sm); font-size:18px; cursor:pointer; margin-right:8px;';
				
				// Check viewport and show/hide
				function checkViewport() {
					if ( window.innerWidth <= 768 ) {
						toggleBtn.style.display = 'block';
						sidebar.classList.add( 'iiskin-sidebar--collapsed' );
					} else {
						toggleBtn.style.display = 'none';
						sidebar.classList.remove( 'iiskin-sidebar--collapsed' );
					}
				}
				
				toggleBtn.addEventListener( 'click', function () {
					sidebar.classList.toggle( 'iiskin-sidebar--collapsed' );
					sidebar.classList.toggle( 'iiskin-sidebar--open' );
				});
				
				// Insert at start of header
				var headerLeft = header.querySelector( '.iiskin-header-left' );
				if ( headerLeft ) {
					headerLeft.insertBefore( toggleBtn, headerLeft.firstChild );
				}
				
				checkViewport();
				window.addEventListener( 'resize', checkViewport );
			}
		}
	}

	// Initialize when DOM is ready
	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}

}() );
