<?php

wp_enqueue_script( 'paperplanes-home', get_template_directory_uri() . '/js/home.js', array(), '20151215', true );
get_header();

$reel = get_field('reel');

?>

<video class="reel" autoplay muted playsinline loop
       src="<?php echo $reel['url'] ?>"></video>

<article id="post-<?php the_ID(); ?>" <?php post_class("home"); ?>>
<?php while ( have_posts() ) : the_post(); ?>
<?php
  if ( have_rows( 'content' ) ) :
    while ( have_rows( 'content' ) ) : the_row();
      if ( get_row_layout() == 'banner' ) : ?>
        <div class="layout banner">
        <?php the_sub_field( 'content' ) ?>
        </div> <?php
      endif;
      if ( get_row_layout() == 'grid' ) : ?>
        <div class="layout grid"> <?php
          if ( have_rows( 'items' ) ) :
            while ( have_rows( 'items' ) ) : the_row();
              the_sub_field( 'content' );
            endwhile;
          endif; ?>
        </div> <?php
      endif;
    endwhile;
  endif;
?>
<?php endwhile; wp_reset_query(); ?>
<span class="close">Explore</span>
</article><!-- #post-<?php the_ID(); ?> -->

<?php get_footer(); ?>
