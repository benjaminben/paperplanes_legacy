<?php

get_header();
$content = get_field( 'content' );

?>

<article id="post-<?php the_ID(); ?>" <?php post_class("contact"); ?>>
<?php
if ( have_rows( 'content' ) ) :
  while ( have_rows( 'content' ) ) : the_row();
    if ( get_row_layout() == 'banner' ) : ?>
      <div class="layout banner">
        <div class="text"><?php echo get_sub_field( 'text' ) ?></div>
      </div> <?php
    endif;
    if ( get_row_layout() == 'grid' ) : ?>
    <div class="layout grid">
      <?php
      if ( have_rows( 'items' ) ) :
        while ( have_rows( 'items' ) ) : the_row();
          $layout = get_row_layout();
          if ( $layout == 'contact' ) : ?>
            <span class="item <?php echo $layout ?>">
              <h5 class="label"><?php echo get_sub_field( 'label' ) ?></h5>
              <a class="link" href="<?php echo get_sub_field( 'link' ) ?>">
                <?php echo get_sub_field( 'display' ) ?>
              </a>
            </span>
          <?php endif;
          if ( $layout == 'tag' ) : ?>
            <span class="item <?php echo $layout ?>">
              <h5 class="text"><?php echo get_sub_field( 'text' ) ?></h5>
            </span>
          <?php endif;
          if ( $layout == 'social' ) : ?>
            <span class="item <?php echo $layout ?>">
              <h5 class="label"><?php echo get_sub_field( 'label' ) ?></h5>
              <?php
                if ( have_rows( 'links' ) ) :
                  while ( have_rows( 'links' ) ) : the_row(); ?>
                  <a class="link" href="<?php echo get_sub_field( 'link' ) ?>">
                    <img class="icon" src="<?php echo get_sub_field( 'icon' )['url'] ?>" />
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
