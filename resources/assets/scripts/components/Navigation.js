import Vue                      from "vue"
import { mapState, mapActions } from "vuex"
import barba                    from "@barba/core"
import store                    from "../store"

export default (root) =>
new Vue({
  store,
  el: root,
  computed: {
    ...mapState({
      theme: state => state.ui.theme,
      escape: state => state.nav.escape,
      exiting: state => state.nav.exiting,
      open: state => state.nav.open,
      slug: state => state.nav.slug,
      trans: state => state.nav.trans,
    })
  },
  methods: {
    ...mapActions("nav", [
      "setNavOpen",
      "setNavClosed",
      "setEscape",
    ]),
    ...mapActions("ui", [
      "setTrans",
      "lockScroll",
      "unlockScroll",
    ]),
    toggleOpen() {
      this.setNavOpen()
      this.lockScroll()
    },
    toggleClosed() {
      this.setNavClosed()
      this.unlockScroll()
    },
    checkCurrent(e) {
      if(e.currentTarget.href === window.location.href) {
        e.preventDefault()
        e.stopPropagation()
        this.toggleClosed()
      }
    },
    clearEscape() {
      // barba.request
      // this.setEscape(null)
      // this.setTrans(true)
    },
  },
  mounted() {
    Array.from(this.$el.querySelectorAll("a[href]")).forEach(a => {
      a.addEventListener("click", this.checkCurrent)
    })
  },
});

// _s boilerplate
( function() {
	var container, button, menu, links, i, len, doc;

	container = document.getElementById( 'site-navigation' );
	if ( ! container ) {
		return;
	}

	button = container.getElementsByTagName( 'button' )[0];
	if ( 'undefined' === typeof button ) {
		return;
	}

	menu = container.getElementsByTagName( 'ul' )[0];

	// Hide menu toggle button if menu is empty and return early.
	if ( 'undefined' === typeof menu ) {
		button.style.display = 'none';
		return;
	}

	if ( -1 === menu.className.indexOf( 'nav-menu' ) ) {
		menu.className += ' nav-menu';
	}

	// Get all the link elements within the menu.
	links = menu.getElementsByTagName( 'a' );

	// Each time a menu link is focused or blurred, toggle focus.
	for ( i = 0, len = links.length; i < len; i++ ) {
		links[i].addEventListener( 'focus', toggleFocus, true );
		links[i].addEventListener( 'blur', toggleFocus, true );
	}

	/**
	 * Sets or removes .focus class on an element.
	 */
	function toggleFocus() {
		var self = this;

		// Move up through the ancestors of the current link until we hit .nav-menu.
		while ( -1 === self.className.indexOf( 'nav-menu' ) ) {

			// On li elements toggle the class .focus.
			if ( 'li' === self.tagName.toLowerCase() ) {
				if ( -1 !== self.className.indexOf( 'focus' ) ) {
					self.className = self.className.replace( ' focus', '' );
				} else {
					self.className += ' focus';
				}
			}

			self = self.parentElement;
		}
	}

	/**
	 * Toggles `focus` class to allow submenu access on tablets.
	 */
	( function( container ) {
		var touchStartFn, i,
			parentLink = container.querySelectorAll( '.menu-item-has-children > a, .page_item_has_children > a' );

		if ( 'ontouchstart' in window ) {
			touchStartFn = function( e ) {
				var menuItem = this.parentNode, i;

				if ( ! menuItem.classList.contains( 'focus' ) ) {
					e.preventDefault();
					for ( i = 0; i < menuItem.parentNode.children.length; ++i ) {
						if ( menuItem === menuItem.parentNode.children[i] ) {
							continue;
						}
						menuItem.parentNode.children[i].classList.remove( 'focus' );
					}
					menuItem.classList.add( 'focus' );
				} else {
					menuItem.classList.remove( 'focus' );
				}
			};

			for ( i = 0; i < parentLink.length; ++i ) {
				parentLink[i].addEventListener( 'touchstart', touchStartFn, false );
			}
		}
	}( container ) );
} )();
