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

$theme = get_field( 'theme' );
$bg_color = get_field( 'bg_color' );
if ( !$theme ) $theme = 'dark';
$slug = $post->post_name;

$post_objects = get_field('whitelisted_projects', 'theme-settings');
$uncategorized_id = get_cat_ID( 'Uncategorized' );
$categories = get_categories(array(
  "hide_empty" => 0,
  "type" => "vt_project",
  "exclude" => $uncategorized_id,
));
?>

<div
  id="content"
  data-vue-root="Work"
  data-barba="container"
  data-barba-namespace="work"
  style="background-color: <?php echo $bg_color ?>"
  data-bg-color="<?php echo $bg_color ?>"
  data-theme="<?php echo $theme?>"
  class="site-content <?php echo get_post_type() ?> <?php echo $slug ?>">

<article id="post-<?php the_ID(); ?>" <?php post_class("work"); ?>>
  <div id="pageWipe"
    v-bind:style="{
      transform: trans ? 'translateY(0)' : 'translateY(-100vh)',
      transition: 'all 0.5s ease',
    }"></div>
  <div class="ctrl">
    <div class="filter">
      <span class="toggle" @click="setFilterOpen(!filterOpen)">
        Filter
        <span class="mark" v-bind:style="{ transform: filterOpen ? 'rotate(135deg)' : 'rotate(0deg)' }">
          <svg viewBox="0 0 100 100">
            <line x1="0" x2="100" y1="50" y2="50" stroke="black" stroke-width="5" />
            <line x1="50" x2="50" y1="0" y2="100" stroke="black" stroke-width="5" />
          </svg>
        </span>
      </span>
      <span class="cats">
        <span
          class="cat"
          v-if="filterOpen"
          @click="setFilter(null)"
          :active="!filter">All</span>
        <?php
        foreach ($categories as $cat) : ?>
          <span
            class="cat"
            v-if="filterOpen"
            @click="setFilter('<?php echo $cat->slug ?>')"
            :active="filter === '<?php echo $cat->slug ?>'"><?php echo $cat->name; ?>
          </span> <?php
        endforeach; ?>
      </span>
    </div>
    <div class="grid">
      <span class="option" @click="setCols" data-cols="1fr"
            v-bind:class="{active: gridStyle.gridTemplateColumns == '1fr'}">
        <svg viewbox="0 0 90 50">
          <rect x="0" y="0" width="90" height="50" fill="rgba(110,112,102,1)" />
        </svg>
      </span>
      <span class="option" @click="setCols" data-cols="1fr 1fr"
            v-bind:class="{active: gridStyle.gridTemplateColumns == '1fr 1fr'}">
        <svg viewbox="0 0 105 50">
          <rect x="0" y="0" width="50" height="50" fill="rgba(110,112,102,1)" />
          <rect x="55" y="0" width="50" height="50" fill="rgba(110,112,102,1)" />
        </svg>
      </span>
      <span class="option" @click="setCols" data-cols="1fr 1fr 1fr"
            v-bind:class="{active: gridStyle.gridTemplateColumns == '1fr 1fr 1fr'}">
        <svg viewbox="0 0 160 50">
          <rect x="0" y="0" width="50" height="50" fill="rgba(110,112,102,1)" />
          <rect x="55" y="0" width="50" height="50" fill="rgba(110,112,102,1)" />
          <rect x="110" y="0" width="50" height="50" fill="rgba(110,112,102,1)" />
        </svg>
      </span>
    </div>
  </div>
  <div class="projects" v-bind:style="gridStyle">
		<?php
    if ( $post_objects ) :
      foreach ( $post_objects as $post ) :
        setup_postdata( $post );
        if ($post->post_status == "private") {continue;}
        $post_cats = wp_get_post_categories($post->ID) ?>
        <a
          class="project"
          :active="!filter || [
          <?php foreach ($post_cats as $cat) {
            echo "'" . get_term($cat)->slug . "',";
          } ?>
          ].indexOf(filter) > -1"
          href="<?php echo get_permalink($post->ID) ?>">
          <div class="preview"><?php echo get_the_post_thumbnail($post->ID) ?></div>
          <span class="label main"><?php echo get_field("main_label") ?></span>
          <span class="label sub"><?php echo get_field("sub_label") ?></span>
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
