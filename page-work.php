<?php
/**
 * The template for displaying work
 *
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Paper_Planes
 */


wp_enqueue_script(
 'paperplanes-projects',
 get_template_directory_uri() . '/js/projects.js',
 array('vuejs'), '20151215', true
);
get_header();

$post_objects = get_field('whitelisted_projects', 'theme-settings');
?>

<article id="post-<?php the_ID(); ?>" <?php post_class("work"); ?>>
  <div class="ctrl">
    <span class="grid">
      <span @click="setCols" data-cols="1fr">1 </span>
      <span @click="setCols" data-cols="1fr 1fr">2 </span>
      <span @click="setCols" data-cols="1fr 1fr 1fr">3</span>
    </span>
  </div>
  <div class="projects" v-bind:style="gridStyle">
		<?php
    if ( $post_objects ) :
      foreach ( $post_objects as $post ) :
        setup_postdata( $post ); ?>
        <a class="project" href="<?php echo get_permalink($post->ID) ?>">
          <?php echo get_the_post_thumbnail($post->ID) ?>
          <span><?php echo get_field("main_label") ?></span><br>
          <span><?php echo get_field("sub_label") ?></span>
        </a> <?php
      endforeach;
      wp_reset_postdata();
    endif; ?>
	</div><!-- .projects -->

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
