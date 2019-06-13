<?php

get_header();
$content = get_field( 'content' );

?>

<article id="post-<?php the_ID(); ?>" <?php post_class("contact"); ?>>
<?php
if ( have_rows( 'content' ) ) :
  while ( have_rows( 'content' ) ) : the_row();
    if ( get_row_layout() == 'banner' ) : ?>
      <h1><?php echo get_sub_field( 'text' ) ?></h1> <?php
    endif;
    if ( get_row_layout() == 'grid' ) : ?>
    <div class="grid">
      <?php
      if ( have_rows( 'items' ) ) :
        while ( have_rows( 'items' ) ) : the_row();
          $layout = get_row_layout();
          if ( $layout == 'contact' ) : ?>
            <span class="item <?php echo $layout ?>">
              <h5><?php echo get_sub_field( 'label' ) ?></h5>
              <a href="<?php echo get_sub_field( 'link' ) ?>">
                <?php echo get_sub_field( 'display' ) ?>
              </a>
            </span>
          <?php endif;
          if ( $layout == 'tag' ) : ?>
            <span class="item <?php echo $layout ?>">
              <h5><?php echo get_sub_field( 'text' ) ?></h5>
            </span>
          <?php endif;
          if ( $layout == 'social' ) : ?>
            <span class="item <?php echo $layout ?>">
              <h5><?php echo get_sub_field( 'label' ) ?></h5>
              <?php
                if ( have_rows( 'links' ) ) :
                  while ( have_rows( 'links' ) ) : the_row(); ?>
                  <a href="<?php echo get_sub_field( 'link' ) ?>">
                    <img src="<?php echo get_sub_field( 'icon' )['url'] ?>" />
                  </a><?php
                  endwhile;
                endif;
              ?>
            </span>
          <?php endif;
        endwhile;
      endif;
      ?>
    <div>
    <?php endif;
  endwhile;
else :
  // no layouts found
endif; ?>
</article><!-- #post-<?php the_ID(); ?> -->

<?php get_footer(); ?>
