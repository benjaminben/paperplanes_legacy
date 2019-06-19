<?php
/**
 * The template for displaying all single projects
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package Paper_Planes
 */

wp_enqueue_script('vimeo', 'https://player.vimeo.com/api/player.js', array(), null, true);
wp_enqueue_script(
  'paperplanes-project',
  get_template_directory_uri() . '/js/project.js',
  array('vuejs', 'vimeo'), '20151215', true
);
get_header();
?>

<div id="primary" class="content-area">
  <main id="main" class="site-main">

  <?php
  while ( have_posts() ) :
    the_post();

    get_template_part( 'template-parts/content', get_post_type() );

    // If comments are open or we have at least one comment, load up the comment template.
    if ( comments_open() || get_comments_number() ) :
      comments_template();
    endif;

  endwhile; // End of the loop.
  ?>

  </main><!-- #main -->
</div><!-- #primary -->

<?php
get_footer();
