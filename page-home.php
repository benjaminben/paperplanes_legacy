<?php

wp_enqueue_script( 'paperplanes-home', get_template_directory_uri() . '/js/home.js', array(), '20151215', true );
get_header();

$reel = get_field('reel');

?>

<video class="reel" autoplay muted playsinline loop
       src="<?php echo $reel['url'] ?>"></video>

<div id="content" class="site-content">
  <?php while ( have_posts() ) : the_post(); ?>
  <?php the_content(); ?>
  <?php endwhile; wp_reset_query(); ?>
  <span class="close">Explore</span>
</div><!-- #content -->
<?php get_footer(); ?>
