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
 array('vuejs', 'paperplanes-main'), '20151215', true
);
get_header();

$post_objects = get_field('whitelisted_projects', 'theme-settings');
$uncategorized_id = get_cat_ID( 'Uncategorized' );
$categories = get_categories(array(
  "hide_empty" => 0,
  "type" => "vt_project",
  "exclude" => $uncategorized_id,
));
?>

<article id="post-<?php the_ID(); ?>" <?php post_class("work"); ?>>
  <div id="pageWipe"
    v-bind:style="{
      transform: shared.ui.trans ? 'translateY(0)' : 'translateY(-100vh)',
      transition: 'all 0.5s ease',
    }"></div>
  <div class="ctrl">
    <div class="filter">
      <span class="toggle" @click="setFilterOpen(!shared.work.filterOpen)">
        Filter
        <span v-if="shared.work.filterOpen">X</span>
        <span v-if="!shared.work.filterOpen">+</span>
      </span>
      <span v-if="shared.work.filterOpen" class="cats">
        <span
          class="cat"
          @click="setFilter(null)"
          :active="!shared.work.filter">All</span>
        <?php
        foreach ($categories as $cat) : ?>
          <span
            class="cat"
            @click="setFilter('<?php echo $cat->slug ?>')"
            :active="shared.work.filter === '<?php echo $cat->slug ?>'"><?php echo $cat->name; ?>
          </span> <?php
        endforeach; ?>
      </span>
    </div>
    <div class="grid">
      <span @click="setCols" data-cols="1fr">1 </span>
      <span @click="setCols" data-cols="1fr 1fr">2 </span>
      <span @click="setCols" data-cols="1fr 1fr 1fr">3</span>
    </div>
  </div>
  <div class="projects" v-bind:style="shared.work.gridStyle">
		<?php
    if ( $post_objects ) :
      foreach ( $post_objects as $post ) :
        setup_postdata( $post );
        if ($post->post_status == "private") {continue;}
        $post_cats = wp_get_post_categories($post->ID) ?>
        <a
          class="project"
          :active="!shared.work.filter || [
          <?php foreach ($post_cats as $cat) {
            echo "'" . get_term($cat)->slug . "',";
          } ?>
          ].indexOf(shared.work.filter) > -1"
          href="<?php echo get_permalink($post->ID) ?>">
          <div class="preview"><?php echo get_the_post_thumbnail($post->ID) ?></div>
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
