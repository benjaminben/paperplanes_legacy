<?php
$theme = get_field( 'theme' );
?>

<nav
  id="site-navigation"
  class="main-navigation"
  data-vue-root="Navigation"
  data-theme="<?php echo $theme; ?>"
  v-bind:class="{ toggled: open, exiting: exiting, escape: escape, trans: trans }">
  <div
    class="banner"
    v-bind:style="{
      borderColor: open && !exiting ? 'white' : 'rgba('+
        255*theme+','+255*theme+','+255*theme+
      ',1)'
    }">
    <a class="home-link" data-dest="home" href="<?php echo get_home_url(); ?>">
      <img class="theme-dark" src="<?php echo get_theme_mod( 'dark_theme_logo' ); ?>"
           v-bind:style="{ opacity: open && !exiting ? 1 : theme }" />
      <img class="theme-light" src="<?php echo get_theme_mod( 'light_theme_logo' ); ?>"
           v-bind:style="{ opacity: open && !exiting ? 0 : 1 - theme }" />
    </a>
    <a
      v-bind="{ href: escape ? escape : 'javascript:void(0)' }"
      class="menu-toggle"
      aria-controls="primary-menu"
      :aria-expanded="open"
      v-on="{
        click : escape
          ? clearEscape
          : open
            ? setNavClosed
            : setNavOpen
      }">
      <svg width="20" height="20" viewBox="0 0 100 100">
        <path d="M0 27.5 L100 27.5" stroke-width="8" transform-origin="100 27.5"
              v-bind:style="{ stroke: open && !exiting ? 'white' : 'rgba('+255*theme+','+255*theme+','+255*theme+',1)' }"/>
        <path d="M0 72.5 L100 72.5" stroke-width="8" transform-origin="100 72.5"
              v-bind:style="{ stroke: open && !exiting ? 'white' : 'rgba('+255*theme+','+255*theme+','+255*theme+',1)' }"/>
      </svg>
    </a>
  </div>
  <?php
    wp_nav_menu( array(
      'theme_location' => 'menu-1',
      'menu_id'        => 'primary-menu',
    ) ); ?>
</nav><!-- #site-navigation -->
