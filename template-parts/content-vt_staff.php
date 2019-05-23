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
  <span class="member">
    <?php echo get_the_post_thumbnail($post->ID) ?>
    <a href="<?php echo get_permalink($post->ID) ?>">
      <?php echo get_field("name") ?>
    </a><br>
    <span><?php echo get_field("role") ?></span>
    <p><?php echo get_field("bio") ?></p>
  </span>
	<footer class="entry-footer">
		<?php paperplanes_entry_footer(); ?>
	</footer><!-- .entry-footer -->
</article><!-- #post-<?php the_ID(); ?> -->
