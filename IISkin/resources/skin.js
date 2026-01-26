/**
 * IISkin v4.0 JavaScript
 * Worldbuilder's Paradise - IIWiki
 */
( function () {
	'use strict';

	var STORAGE_KEY_THEME = 'iiskin-theme';
	var STORAGE_KEY_SIDEBAR = 'iiskin-sidebar';

	/**
	 * Initialize IISkin functionality
	 */
	function init() {
		initTheme();
		initSidebar();
		initSearch();
		initCategoryLinks();
		buildTableOfContents();
	}

	/**
	 * Fix category links to use proper wiki article path
	 */
	function initCategoryLinks() {
		var catLinks = document.querySelectorAll( '.ii-cat-btn[data-category]' );
		if ( !catLinks.length ) return;

		// Get article path from mw.config if available
		var articlePath = '/wiki/$1'; // fallback
		if ( typeof mw !== 'undefined' && mw.config ) {
			articlePath = mw.config.get( 'wgArticlePath' ) || articlePath;
		}

		catLinks.forEach( function ( link ) {
			var category = link.getAttribute( 'data-category' );
			if ( category ) {
				if ( category === 'Browse' ) {
					// Special:Categories page
					link.href = articlePath.replace( '$1', 'Special:Categories' );
				} else {
					// Category pages
					link.href = articlePath.replace( '$1', 'Category:' + category );
				}
			}
		});
	}

	/**
	 * Dark/Light Theme Toggle
	 */
	function initTheme() {
		var wrapper = document.getElementById( 'ii-wrapper' );
		var toggle = document.getElementById( 'ii-theme-toggle' );
		
		if ( !wrapper || !toggle ) return;

		// Load saved theme preference
		var savedTheme = localStorage.getItem( STORAGE_KEY_THEME );
		if ( savedTheme === 'dark' ) {
			wrapper.classList.add( 'ii-skin--dark' );
		} else if ( savedTheme === null ) {
			// Check system preference
			if ( window.matchMedia && window.matchMedia( '(prefers-color-scheme: dark)' ).matches ) {
				wrapper.classList.add( 'ii-skin--dark' );
			}
		}

		// Toggle button click
		toggle.addEventListener( 'click', function () {
			var isDark = wrapper.classList.toggle( 'ii-skin--dark' );
			localStorage.setItem( STORAGE_KEY_THEME, isDark ? 'dark' : 'light' );
		});

		// Listen for system theme changes
		if ( window.matchMedia ) {
			window.matchMedia( '(prefers-color-scheme: dark)' ).addEventListener( 'change', function ( e ) {
				if ( localStorage.getItem( STORAGE_KEY_THEME ) === null ) {
					if ( e.matches ) {
						wrapper.classList.add( 'ii-skin--dark' );
					} else {
						wrapper.classList.remove( 'ii-skin--dark' );
					}
				}
			});
		}
	}

	/**
	 * Collapsible Sidebar with TOC
	 */
	function initSidebar() {
		var wrapper = document.getElementById( 'ii-wrapper' );
		var sidebar = document.getElementById( 'ii-sidebar' );
		var toggle = document.getElementById( 'ii-sidebar-toggle' );
		
		if ( !wrapper || !sidebar || !toggle ) return;

		// Load saved sidebar state
		var savedState = localStorage.getItem( STORAGE_KEY_SIDEBAR );
		if ( savedState === 'open' ) {
			wrapper.classList.add( 'ii-sidebar--open' );
		}

		// Toggle sidebar
		toggle.addEventListener( 'click', function () {
			var isOpen = wrapper.classList.toggle( 'ii-sidebar--open' );
			localStorage.setItem( STORAGE_KEY_SIDEBAR, isOpen ? 'open' : 'closed' );
		});

		// Close sidebar when clicking outside on mobile
		document.addEventListener( 'click', function ( e ) {
			if ( window.innerWidth <= 768 && 
				wrapper.classList.contains( 'ii-sidebar--open' ) &&
				!sidebar.contains( e.target ) && 
				!toggle.contains( e.target ) ) {
				wrapper.classList.remove( 'ii-sidebar--open' );
				localStorage.setItem( STORAGE_KEY_SIDEBAR, 'closed' );
			}
		});
	}

	/**
	 * Build Table of Contents from article headings
	 */
	function buildTableOfContents() {
		var tocList = document.getElementById( 'ii-toc-list' );
		var article = document.querySelector( '.ii-article' );
		
		if ( !tocList || !article ) return;

		var headings = article.querySelectorAll( 'h2, h3, h4' );
		
		if ( headings.length === 0 ) {
			// Hide TOC section if no headings
			var tocSection = document.getElementById( 'ii-toc' );
			if ( tocSection ) {
				tocSection.style.display = 'none';
			}
			return;
		}

		var tocHTML = '';
		var counter = { h2: 0, h3: 0, h4: 0 };

		headings.forEach( function ( heading ) {
			var text = '';
			var level = heading.tagName.toLowerCase();
			
			// Get heading text (excluding edit section links)
			var clone = heading.cloneNode( true );
			var editSection = clone.querySelector( '.mw-editsection' );
			if ( editSection ) {
				editSection.remove();
			}
			text = clone.textContent.trim();

			// Get or create ID for heading
			var id = heading.id;
			if ( !id ) {
				id = text.toLowerCase().replace( /[^a-z0-9]+/g, '-' ).replace( /^-|-$/g, '' );
				heading.id = id;
			}

			// Build number prefix
			var prefix = '';
			if ( level === 'h2' ) {
				counter.h2++;
				counter.h3 = 0;
				counter.h4 = 0;
				prefix = counter.h2 + '. ';
			} else if ( level === 'h3' ) {
				counter.h3++;
				counter.h4 = 0;
				prefix = counter.h2 + '.' + counter.h3 + ' ';
			} else if ( level === 'h4' ) {
				counter.h4++;
				prefix = counter.h2 + '.' + counter.h3 + '.' + counter.h4 + ' ';
			}

			tocHTML += '<a href="#' + id + '" class="ii-toc-' + level + '">' + prefix + text + '</a>';
		});

		tocList.innerHTML = tocHTML;

		// Smooth scroll for TOC links
		tocList.querySelectorAll( 'a' ).forEach( function ( link ) {
			link.addEventListener( 'click', function ( e ) {
				e.preventDefault();
				var targetId = this.getAttribute( 'href' ).slice( 1 );
				var target = document.getElementById( targetId );
				if ( target ) {
					var headerOffset = 100; // Account for sticky header + category bar
					var elementPosition = target.getBoundingClientRect().top;
					var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

					window.scrollTo({
						top: offsetPosition,
						behavior: 'smooth'
					});

					// Close sidebar on mobile after clicking
					if ( window.innerWidth <= 768 ) {
						var wrapper = document.getElementById( 'ii-wrapper' );
						if ( wrapper ) {
							wrapper.classList.remove( 'ii-sidebar--open' );
						}
					}
				}
			});
		});
	}

	/**
	 * Enhanced search functionality
	 */
	function initSearch() {
		var searchInput = document.getElementById( 'searchInput' );
		
		if ( !searchInput ) return;

		// Keyboard shortcuts
		document.addEventListener( 'keydown', function ( e ) {
			// Press / to focus search (when not in input/textarea)
			if ( e.key === '/' && !isEditableElement( e.target ) ) {
				e.preventDefault();
				searchInput.focus();
				searchInput.select();
			}
			
			// Press Escape to blur search
			if ( e.key === 'Escape' && document.activeElement === searchInput ) {
				searchInput.blur();
			}
		});
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

	// Initialize when DOM is ready
	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}

}() );
