<?php
/**
 * Template part for displaying staff
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Paper_Planes
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
  <span class="member">
    <?php echo the_post_thumbnail($post->ID) ?>
    <?php echo the_title() ?>
    <span><?php echo get_field("role") ?></span>
  </span>
	<footer class="entry-footer">
		<?php paperplanes_entry_footer(); ?>
	</footer><!-- .entry-footer -->
</article><!-- #post-<?php the_ID(); ?> -->
