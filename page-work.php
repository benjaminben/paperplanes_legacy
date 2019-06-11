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

<div id="content" class="site-content">
  <article id="post-<?php the_ID(); ?>" <?php post_class("work"); ?>>
  	<div class="projects">
  		<?php while ( $loop->have_posts() ) : $loop->the_post(); ?>
        <a class="project" href="<?php echo get_permalink($post->ID) ?>">
          <?php echo get_the_post_thumbnail($post->ID) ?>
          <span><?php echo get_field("main_label") ?></span><br>
          <span><?php echo get_field("sub_label") ?></span>
        </a>
      <?php endwhile; ?>
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
