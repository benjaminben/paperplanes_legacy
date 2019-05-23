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
  <?php the_field("marquee_video") ?>
	<?php the_title( "<h1 class='entry-title'>", "</h1>" ); ?>
	<div class="entry-content">
		<?php the_field("description") ?>
	</div><!-- .entry-content -->
  <?php if( have_rows("credits") ): ?>
  <div class="credits">
    <h3>Credit List</h3>
    <?php while ( have_rows("credits") ) : the_row(); ?>
        <span><?php the_sub_field("role"); ?>: </span>
        <span><?php the_sub_field("entity"); ?></span><br>
    <?php endwhile; ?>
  </div><!-- .credits  -->
  <?php endif; ?>
  </div>
  <?php
  $images = get_field("gallery");
  $size = "full";

  if ($images): ?>
  <div class="gallery">
    <?php foreach ( $images as $image ): ?>
      <div class="item">
        <?php echo wp_get_attachment_image( $image["ID"], $size ) ?>
      </div><!-- .item -->
    <?php endforeach; ?>
  </div><!-- .gallery -->
  <?php endif; ?>
	<footer class="entry-footer">
		<?php paperplanes_entry_footer(); ?>
	</footer><!-- .entry-footer -->
</article><!-- #post-<?php the_ID(); ?> -->
