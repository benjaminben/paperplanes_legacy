<?php
/**
 * Template part for displaying projects
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Paper_Planes
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
<?php
if ( have_rows( 'content' ) ) :
  while ( have_rows( 'content' ) ) : the_row();
    if ( get_row_layout() == 'headspace' ) : ?>
      <h1>HEADSPACE</h1> <?php
    endif;
    if ( get_row_layout() == 'marquee_video' ) : ?>
      <div class="layout marquee-video"><?php the_sub_field( 'embed' ) ?><div> <?php
    endif;
    if ( get_row_layout() == 'generic' ) : ?>
      <div class="layout generic"><?php the_sub_field( 'content' ) ?></div> <?php
    endif;
    if ( get_row_layout() == 'credits' ) : ?>
      <div class="layout credits"> <?php
        if ( have_rows( 'lines' ) ) :
          while ( have_rows( 'lines' ) ) : the_row(); ?>
          <span class="line">
            <span class="role"><?php the_sub_field("role"); ?>: </span>
            <span class="entity"><?php the_sub_field("entity"); ?></span>
          </span> <?php
          endwhile;
        endif; ?>
      </div> <?php
    endif;
    if ( get_row_layout() == 'gallery' ) :
        $items = get_sub_field( 'items' );
        $size = "full";
        if ( get_sub_field( 'slideshow' ) ) : ?>
          <div class="layout slideshow">
            <?php foreach ( $items as $key=>$item ): ?>
              <div data-active="<?php echo ($key == 0 ? 1 : 0) ?>" class="item">
                <?php echo wp_get_attachment_image( $item["ID"], $size ) ?>
              </div>
            <?php endforeach; ?>
          </div> <?php
        else: ?>
          <div class="layout gallery">
            <?php foreach ( $items as $key=>$item ): ?>
              <div class="item">
                <?php echo wp_get_attachment_image( $item["ID"], $size ) ?>
              </div>
            <?php endforeach; ?>
          </div><?php
        endif;
    endif;
  endwhile;
else :
  // no layouts found
endif; ?>
	<footer class="entry-footer">
		<?php paperplanes_entry_footer(); ?>
	</footer><!-- .entry-footer -->
</article><!-- #post-<?php the_ID(); ?> -->
