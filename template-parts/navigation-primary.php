<?php
  $theme = get_field( 'theme' );
?>
<nav id="site-navigation" data-theme="<?php echo $theme ?>" class="main-navigation">
  <div class="banner">
    <a class="home-link" href="<?php echo get_home_url(); ?>">
      <img class="theme-dark" src="<?php echo get_theme_mod( 'dark_theme_logo' ); ?>" />
      <img class="theme-light" src="<?php echo get_theme_mod( 'light_theme_logo' ); ?>" />
    </a>
    <button class="menu-toggle" aria-controls="primary-menu" aria-expanded="false"><?php esc_html_e( 'Primary Menu', 'paperplanes' ); ?></button>
  </div>
  <?php
    wp_nav_menu( array(
      'theme_location' => 'menu-1',
      'menu_id'        => 'primary-menu',
    ) ); ?>
</nav><!-- #site-navigation -->
