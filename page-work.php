<?php
/**
 * The template for displaying work
 *
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Paper_Planes
 */

get_header();

$loop = new WP_Query(array(
    "post_type"   => "vt_project",
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

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<div class="entry-content">
		<?php while ( $loop->have_posts() ) : $loop->the_post(); ?>
      <a class="project" href="<?php echo get_permalink($post->ID) ?>">
        <?php echo get_the_post_thumbnail($post->ID) ?>
        <span><?php echo get_field("main_label") ?></span><br>
        <span><?php echo get_field("sub_label") ?></span>
      </a>
    <?php endwhile;

		wp_link_pages( array(
			'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'paperplanes' ),
			'after'  => '</div>',
		) );
		?>
	</div><!-- .entry-content -->

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
