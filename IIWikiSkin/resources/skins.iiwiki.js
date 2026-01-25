/**
 * IIWiki Skin JavaScript
 * Handles mobile menu, collapsible elements, and UI enhancements
 */

( function () {
    'use strict';

    /**
     * Mobile menu functionality
     */
    function initMobileMenu() {
        const toggle = document.getElementById( 'iiwiki-mobile-menu-toggle' );
        const sidebar = document.getElementById( 'iiwiki-sidebar' );
        
        if ( !toggle || !sidebar ) {
            return;
        }

        // Create overlay
        const overlay = document.createElement( 'div' );
        overlay.className = 'iiwiki-sidebar-overlay';
        document.body.appendChild( overlay );

        function openMenu() {
            sidebar.classList.add( 'open' );
            overlay.classList.add( 'active' );
            toggle.setAttribute( 'aria-expanded', 'true' );
            document.body.style.overflow = 'hidden';
        }

        function closeMenu() {
            sidebar.classList.remove( 'open' );
            overlay.classList.remove( 'active' );
            toggle.setAttribute( 'aria-expanded', 'false' );
            document.body.style.overflow = '';
        }

        toggle.addEventListener( 'click', function () {
            if ( sidebar.classList.contains( 'open' ) ) {
                closeMenu();
            } else {
                openMenu();
            }
        } );

        overlay.addEventListener( 'click', closeMenu );

        // Close on escape key
        document.addEventListener( 'keydown', function ( e ) {
            if ( e.key === 'Escape' && sidebar.classList.contains( 'open' ) ) {
                closeMenu();
            }
        } );

        // Close menu on window resize above mobile breakpoint
        window.addEventListener( 'resize', function () {
            if ( window.innerWidth > 1024 && sidebar.classList.contains( 'open' ) ) {
                closeMenu();
            }
        } );
    }

    /**
     * Collapsible navigation sections
     */
    function initCollapsibleNav() {
        const navHeadings = document.querySelectorAll( '.iiwiki-nav-heading' );

        navHeadings.forEach( function ( heading ) {
            const list = heading.nextElementSibling;
            
            if ( !list || !list.classList.contains( 'iiwiki-nav-list' ) ) {
                return;
            }

            heading.setAttribute( 'role', 'button' );
            heading.setAttribute( 'aria-expanded', 'true' );
            heading.setAttribute( 'tabindex', '0' );
            heading.style.cursor = 'pointer';

            function toggle() {
                const isExpanded = heading.getAttribute( 'aria-expanded' ) === 'true';
                heading.setAttribute( 'aria-expanded', !isExpanded );
                list.style.display = isExpanded ? 'none' : 'block';
            }

            heading.addEventListener( 'click', toggle );
            heading.addEventListener( 'keydown', function ( e ) {
                if ( e.key === 'Enter' || e.key === ' ' ) {
                    e.preventDefault();
                    toggle();
                }
            } );
        } );
    }

    /**
     * Smooth scroll for anchor links
     */
    function initSmoothScroll() {
        document.querySelectorAll( 'a[href^="#"]' ).forEach( function ( anchor ) {
            anchor.addEventListener( 'click', function ( e ) {
                const href = this.getAttribute( 'href' );
                
                if ( href === '#' ) {
                    return;
                }

                const target = document.querySelector( href );
                
                if ( target ) {
                    e.preventDefault();
                    
                    const headerHeight = document.getElementById( 'iiwiki-header' ).offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

                    window.scrollTo( {
                        top: targetPosition,
                        behavior: 'smooth'
                    } );

                    // Update URL
                    history.pushState( null, '', href );
                }
            } );
        } );
    }

    /**
     * Lazy load images
     */
    function initLazyLoad() {
        if ( 'IntersectionObserver' in window ) {
            const imageObserver = new IntersectionObserver( function ( entries ) {
                entries.forEach( function ( entry ) {
                    if ( entry.isIntersecting ) {
                        const img = entry.target;
                        
                        if ( img.dataset.src ) {
                            img.src = img.dataset.src;
                            img.removeAttribute( 'data-src' );
                        }
                        
                        imageObserver.unobserve( img );
                    }
                } );
            }, {
                rootMargin: '50px 0px'
            } );

            document.querySelectorAll( 'img[data-src]' ).forEach( function ( img ) {
                imageObserver.observe( img );
            } );
        }
    }

    /**
     * Add external link indicators
     */
    function initExternalLinks() {
        const content = document.querySelector( '.iiwiki-body-content' );
        
        if ( !content ) {
            return;
        }

        content.querySelectorAll( 'a[href^="http"]' ).forEach( function ( link ) {
            // Skip internal links
            if ( link.hostname === window.location.hostname ) {
                return;
            }

            link.setAttribute( 'target', '_blank' );
            link.setAttribute( 'rel', 'noopener noreferrer' );
            
            if ( !link.classList.contains( 'iiwiki-external-marked' ) ) {
                link.classList.add( 'iiwiki-external-marked' );
            }
        } );
    }

    /**
     * Table of Contents enhancements
     */
    function initTocEnhancements() {
        const toc = document.getElementById( 'toc' );
        
        if ( !toc ) {
            return;
        }

        // Add collapsible functionality
        const tocTitle = toc.querySelector( '.toctitle' );
        const tocList = toc.querySelector( 'ul' );
        
        if ( tocTitle && tocList ) {
            const toggleBtn = document.createElement( 'button' );
            toggleBtn.className = 'iiwiki-toc-toggle';
            toggleBtn.textContent = '[hide]';
            toggleBtn.setAttribute( 'aria-expanded', 'true' );
            
            tocTitle.appendChild( toggleBtn );

            toggleBtn.addEventListener( 'click', function () {
                const isExpanded = toggleBtn.getAttribute( 'aria-expanded' ) === 'true';
                toggleBtn.setAttribute( 'aria-expanded', !isExpanded );
                toggleBtn.textContent = isExpanded ? '[show]' : '[hide]';
                tocList.style.display = isExpanded ? 'none' : 'block';
            } );
        }

        // Highlight current section
        if ( 'IntersectionObserver' in window ) {
            const headings = document.querySelectorAll( '.iiwiki-body-content h2, .iiwiki-body-content h3' );
            const tocLinks = toc.querySelectorAll( 'a' );

            const observer = new IntersectionObserver( function ( entries ) {
                entries.forEach( function ( entry ) {
                    if ( entry.isIntersecting ) {
                        const id = entry.target.id || entry.target.querySelector( '.mw-headline' )?.id;
                        
                        tocLinks.forEach( function ( link ) {
                            link.classList.remove( 'iiwiki-toc-active' );
                            
                            if ( link.getAttribute( 'href' ) === '#' + id ) {
                                link.classList.add( 'iiwiki-toc-active' );
                            }
                        } );
                    }
                } );
            }, {
                rootMargin: '-20% 0px -80% 0px'
            } );

            headings.forEach( function ( heading ) {
                observer.observe( heading );
            } );
        }
    }

    /**
     * Search input enhancements
     */
    function initSearchEnhancements() {
        const searchInput = document.getElementById( 'searchInput' );
        
        if ( !searchInput ) {
            return;
        }

        // Focus search on '/' key (common shortcut)
        document.addEventListener( 'keydown', function ( e ) {
            if ( e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA' ) {
                e.preventDefault();
                searchInput.focus();
            }
        } );

        // Clear button functionality
        const clearBtn = document.createElement( 'button' );
        clearBtn.type = 'button';
        clearBtn.className = 'iiwiki-search-clear';
        clearBtn.innerHTML = '&times;';
        clearBtn.style.display = 'none';
        clearBtn.setAttribute( 'aria-label', 'Clear search' );

        searchInput.parentNode.style.position = 'relative';
        searchInput.parentNode.appendChild( clearBtn );

        searchInput.addEventListener( 'input', function () {
            clearBtn.style.display = this.value ? 'block' : 'none';
        } );

        clearBtn.addEventListener( 'click', function () {
            searchInput.value = '';
            searchInput.focus();
            clearBtn.style.display = 'none';
        } );
    }

    /**
     * Back to top button
     */
    function initBackToTop() {
        const button = document.createElement( 'button' );
        button.id = 'iiwiki-back-to-top';
        button.className = 'iiwiki-back-to-top';
        button.innerHTML = '↑';
        button.setAttribute( 'aria-label', 'Back to top' );
        button.style.cssText = `
            position: fixed;
            bottom: 5rem;
            right: 1.5rem;
            width: 44px;
            height: 44px;
            background: var(--iiwiki-primary);
            color: var(--iiwiki-text-inverse);
            border: none;
            border-radius: 50%;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s, visibility 0.3s, transform 0.2s;
            z-index: 100;
            font-size: 1.25rem;
            box-shadow: var(--iiwiki-shadow-md);
        `;

        document.body.appendChild( button );

        window.addEventListener( 'scroll', function () {
            if ( window.pageYOffset > 300 ) {
                button.style.opacity = '1';
                button.style.visibility = 'visible';
            } else {
                button.style.opacity = '0';
                button.style.visibility = 'hidden';
            }
        } );

        button.addEventListener( 'click', function () {
            window.scrollTo( {
                top: 0,
                behavior: 'smooth'
            } );
        } );

        button.addEventListener( 'mouseenter', function () {
            this.style.transform = 'scale(1.1)';
        } );

        button.addEventListener( 'mouseleave', function () {
            this.style.transform = 'scale(1)';
        } );
    }

    /**
     * Initialize all features
     */
    function init() {
        initMobileMenu();
        initCollapsibleNav();
        initSmoothScroll();
        initLazyLoad();
        initExternalLinks();
        initTocEnhancements();
        initSearchEnhancements();
        initBackToTop();
    }

    // Run on DOM ready
    if ( document.readyState === 'loading' ) {
        document.addEventListener( 'DOMContentLoaded', init );
    } else {
        init();
    }

}() );