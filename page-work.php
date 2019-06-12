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

$post_objects = get_field('whitelisted_projects', 'theme-settings');
?>

<div id="content" class="site-content">
  <article id="post-<?php the_ID(); ?>" <?php post_class("work"); ?>>
  	<div class="projects">
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
</div><!-- #content -->

<?php
get_footer();
