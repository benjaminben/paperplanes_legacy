<?php
$theme = get_field( 'theme' );
?>

<nav
  id="site-navigation"
  class="main-navigation"
  data-theme="<?php echo $theme; ?>"
  v-bind:class="{ toggled: open, exiting: exiting }">
  <div
    class="banner"
    v-bind:style="{
      borderColor: 'rgba('+
        255*theme+','+255*theme+','+255*theme+
      ',1)'
    }">
    <a class="home-link" href="<?php echo get_home_url(); ?>">
      <img class="theme-dark" src="<?php echo get_theme_mod( 'dark_theme_logo' ); ?>"
           v-bind:style="{ opacity: theme }" />
      <img class="theme-light" src="<?php echo get_theme_mod( 'light_theme_logo' ); ?>"
           v-bind:style="{ opacity: 1 - theme }" />
    </a>
    <button
      class="menu-toggle"
      aria-controls="primary-menu"
      :aria-expanded="open"
      v-on="{ click : open ? toggleClosed : toggleOpen }">
      <?php esc_html_e( 'Primary Menu', 'paperplanes' ); ?>
    </button>
  </div>
  <?php
    wp_nav_menu( array(
      'theme_location' => 'menu-1',
      'menu_id'        => 'primary-menu',
    ) ); ?>
</nav><!-- #site-navigation -->
