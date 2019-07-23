<?php

get_header();
$theme = get_field( 'theme' );
$bg_color = get_field( 'bg_color' );
if ( !$theme ) $theme = 'dark';
$slug = $post->post_name; ?>

<div
  id="content"
  data-vue-root="Play"
  data-barba="container"
  data-barba-namespace="<?php echo $slug ?>"
  style="background-color: <?php echo $bg_color ?>"
  data-theme="<?php echo $theme ?>"
  data-bg-color="<?php echo $bg_color ?>"
  class="site-content <?php echo get_post_type() ?> <?php echo $slug ?>">

PLAY

<?php get_footer(); ?>
