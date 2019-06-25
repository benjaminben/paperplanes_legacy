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

$post_objects = get_field('whitelisted_staff', 'theme-settings');
?>


<article id="post-<?php the_ID(); ?>" <?php post_class("team"); ?>>
  <h1 class="page-title"><?php the_title() ?></h1>
  <div class="staff">
		<?php
    if ( $post_objects ) :
      foreach ( $post_objects as $post ) : ?>
        <span class="member anim-fade">
          <div class="headshot"><?php the_post_thumbnail($post->ID) ?></div>
          <?php the_title('<h4 class="name">', "</h4>") ?>
          <span class="role"><?php echo get_field("role") ?></span>
        </span> <?php
      endforeach;
      wp_reset_postdata();
    endif; ?>
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
