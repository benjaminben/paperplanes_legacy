<?php
/**
 * The template for displaying staff
 *
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Paper_Planes
 */

get_header();

$loop = new WP_Query(array(
    "post_type"   => "vt_staff",
    "post_status" => "publish",
));
?>

<?php
/**
 * Template part for displaying page content in page.php
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Paper_Planes
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class("team"); ?>>
	<div class="staff">
		<?php while ( $loop->have_posts() ) : $loop->the_post(); ?>
      <span class="member">
        <?php echo get_the_post_thumbnail($post->ID) ?>
        <a href="<?php echo get_permalink($post->ID) ?>">
          <?php echo get_field("name") ?>
        </a><br>
        <span><?php echo get_field("role") ?></span>
        <p><?php echo get_field("bio") ?></p>
      </span>
    <?php endwhile; ?>
	</div><!-- .staff -->

	<?php if ( get_edit_post_link() ) : ?>
		<footer class="entry-footer">
			<?php
			edit_post_link(
				sprintf(
					wp_kses(
						/* translators: %s: Name of current post. Only visible to screen readers */
						__( 'Edit <span class="screen-reader-text">%s</span>', 'paperplanes' ),
						array(
							'span' => array(
								'class' => array(),
							),
						)
					),
					get_the_title()
				),
				'<span class="edit-link">',
				'</span>'
			);
			?>
		</footer><!-- .entry-footer -->
	<?php endif; ?>
</article><!-- #post-<?php the_ID(); ?> -->


<?php
get_footer();
