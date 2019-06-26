<?php
/**
 * Template part for displaying projects
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Paper_Planes
 */

$projects = get_field('whitelisted_projects', 'theme-settings');
$prev = null;
$next = null;
$currIdx = array_search($post, $projects);
if ( $currIdx > 0 ) :
  $prev = $projects[$currIdx - 1];
endif;
if ( $currIdx < sizeof($projects) - 1 ):
  $next = $projects[$currIdx + 1];
endif;
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
<?php
if ( have_rows( 'content' ) ) :
  while ( have_rows( 'content' ) ) : the_row();
    if ( get_row_layout() == 'headspace' ) : ?>
      <div class="layout headspace"></div> <?php
    endif;
    if ( get_row_layout() == 'marquee_video' ) : ?>
      <div class="layout marquee-video" data-vue-root="Project__MarqueeVideo">
        <div
          id="vimeo_<?php echo get_sub_field('vid_id'); ?>"
          class="embed"
          data-vimeo-id="<?php echo get_sub_field('vid_id') ?>"></div>
        <div ref="cover" class="cover" v-bind:style="{ display: played ? 'none' : 'flex' }">
          <?php echo get_the_post_thumbnail($post->ID) ?>
          <span class="ctrl" v-if="player" v-bind:class="{ loading: loading }">
            <span ref="playBtn" @click="handlePlay" class="play-btn">
              <span class="play" v-if="!loading"></span>
              <span ref="loader" v-if="loading" class="loader">
                <?php get_template_part( 'template-parts/graphic', 'plane' ); ?>
              </span>
            </span>
          </span>
        </div>
      </div> <?php
    endif;
    if ( get_row_layout() == 'title' ) : ?>
      <div class="layout title anim-fade anim-under">
        <h1><?php get_sub_field( 'alt' ) ? the_sub_field( 'alt' ) : the_title() ?></h1>
      </div> <?php
    endif;
    if ( get_row_layout() == 'generic' ) : ?>
      <div class="layout generic anim-fade anim-under"><?php the_sub_field( 'content' ) ?></div> <?php
    endif;
    if ( get_row_layout() == 'credits' ) : ?>
      <div class="layout credits">
        <h5 class="heading anim-fade anim-under">Credit List</h5>
        <div class="lines"><?php
          if ( have_rows( 'lines' ) ) :
            $ct = 0;
            while ( have_rows( 'lines' ) ) : the_row();
              if ( $ct == 0 ) :
                ?><span class="group anim-fade anim-under"><?php
              endif; ?>
            <span class="line">
              <span class="role"><?php the_sub_field("role"); ?>: </span>
              <span class="entity"><?php the_sub_field("entity"); ?></span>
            </span> <?php
              $ct += 1;
              if ( $ct == 6 ) :
                ?></span><?php
                $ct = 0;
              endif;
            endwhile;
          endif; ?>
        </div>
      </div> <?php
    endif;
    if ( get_row_layout() == 'gallery' ) :
        $items = get_sub_field( 'items' );
        $size = "full";
        if ( get_sub_field( 'slideshow' ) ) : ?>
          <div class="layout slideshow" data-vue-root="Project__Slideshow">
            <div ref="items" class="items"> <?php
                foreach ( $items as $key=>$item ) : ?>
                <div :active="active == <?php echo $key ?>" class="item">
                  <?php echo wp_get_attachment_image( $item["ID"], $size ) ?>
                </div> <?php
                endforeach; ?>
            </div>
            <span @click="navPrev" class="ctrl prev">
              <svg width="1.2em" height="1.2em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29.73 29.73">
                <circle cx="14.87" cy="14.87" r="14.87" fill="rgba(0,0,0,0.2)"/>
                <polyline points="18.54 6.62 11.19 14.87 18.54 23.11" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="2"/>
              </svg>
            </span>
            <span @click="navNext" class="ctrl next">
              <svg width="1.2em" height="1.2em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29.73 29.73">
                <circle cx="14.87" cy="14.87" r="14.87" fill="rgba(0,0,0,0.2)"/>
                <polyline points="11.19 23.11 18.54 14.87 11.19 6.62" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="2"/>
              </svg>
            </span>
          </div> <?php
        else: ?>
          <div class="layout gallery"> <?php
              foreach ( (array)$items as $key=>$item ) : ?>
              <div class="item">
                <?php echo wp_get_attachment_image($item['ID'], $size, '', array('class' => 'anim-fade anim-scale-down', 'data-thumb-src' => wp_get_attachment_image_src($item['ID'], $size )[0] ) ) ?>
                <?php if ( $item['caption'] ) : ?>
                  <span class="caption"><?php echo $item['caption']; ?></span>
                <?php endif ?>
              </div> <?php
              endforeach; ?>
          </div><?php
        endif;
    endif;
  endwhile;
else :
  // no layouts found
endif; ?>
	<footer style="display: none" class="entry-footer"> <!-- TEMP: hidden -->
		<?php paperplanes_entry_footer(); ?>
    <div class="post-navigation">
      <a class="prev" href="<?php echo $prev ? get_permalink($prev->ID) : '' ?>">
        <?php echo $prev ? 'Previous Project' : '' ?>
      </a>
      <a class="next" href="<?php echo $next ? get_permalink($next->ID) : '' ?>">
        <?php echo $next ? 'Next Project' : '' ?>
      </a>
    </div>
	</footer><!-- .entry-footer -->
</article><!-- #post-<?php the_ID(); ?> -->
