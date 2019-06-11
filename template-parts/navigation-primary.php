<?php
  $theme = get_field( 'theme' );
?>
<nav id="site-navigation" class="main-navigation <?php echo 'theme-' . $theme ?>">
  <div class="banner">
    <a class="home-link" href="<?php echo get_home_url(); ?>">
      <img src="<?php echo get_theme_mod( $theme . '_theme_logo' ); ?>" />
    </a>
    <button class="menu-toggle" aria-controls="primary-menu" aria-expanded="false"><?php esc_html_e( 'Primary Menu', 'paperplanes' ); ?></button>
  </div>
  <?php
    wp_nav_menu( array(
      'theme_location' => 'menu-1',
      'menu_id'        => 'primary-menu',
    ) ); ?>
</nav><!-- #site-navigation -->
