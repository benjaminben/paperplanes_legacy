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
      <div class="layout marquee-video"><?php the_sub_field( 'embed' ) ?></div> <?php
    endif;
    if ( get_row_layout() == 'title' ) : ?>
      <div class="layout title">
        <h1><?php get_sub_field( 'alt' ) ? the_sub_field( 'alt' ) : the_title() ?></h1>
      </div> <?php
    endif;
    if ( get_row_layout() == 'generic' ) : ?>
      <div class="layout generic"><?php the_sub_field( 'content' ) ?></div> <?php
    endif;
    if ( get_row_layout() == 'credits' ) : ?>
      <div class="layout credits">
        <p>Credit List</p>
        <div class="lines"><?php
          if ( have_rows( 'lines' ) ) :
            $ct = 0;
            while ( have_rows( 'lines' ) ) : the_row();
              if ( $ct == 0 ) :
                ?><span class="group"><?php
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
          <div class="layout slideshow">
            <div ref="items" class="items"> <?php
                foreach ( $items as $key=>$item ) : ?>
                <div :active="active == <?php echo $key ?>" class="item">
                  <?php echo wp_get_attachment_image( $item["ID"], $size ) ?>
                </div> <?php
                endforeach; ?>
            </div>
            <span @click="navPrev" class="ctrl prev"><</span>
            <span @click="navNext" class="ctrl next">></span>
          </div> <?php
        else: ?>
          <div class="layout gallery"> <?php
              foreach ( $items as $key=>$item ) : ?>
              <div class="item">
                <?php echo wp_get_attachment_image( $item["ID"], $size ) ?>
              </div> <?php
              endforeach; ?>
          </div><?php
        endif;
    endif;
  endwhile;
else :
  // no layouts found
endif; ?>
	<footer class="entry-footer">
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
