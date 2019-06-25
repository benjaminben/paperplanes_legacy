<?php

get_header();
$theme = get_field( 'theme' );
if ( !$theme ) $theme = 'dark';
$slug = $post->post_name; ?>

<div
  id="content"
  data-vue-root="Play"
  data-barba="container"
  style="background-color: <?php echo get_field('bg_color') ?>"
  data-theme="<?php echo ($theme ? $theme : '')?>"
  class="site-content <?php echo get_post_type() ?> <?php echo $slug ?>">

PLAY

<?php get_footer(); ?>
