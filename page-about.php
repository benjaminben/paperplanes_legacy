<?php

$theme = get_field( 'theme' );
if ( !$theme ) $theme = 'dark';
$slug = $post->post_name;

get_header(); ?>

<div
  id="content"
  data-vue-root="About"
  data-barba="container"
  style="background-color: <?php echo get_field('bg_color') ?>"
  data-theme="<?php echo ($theme ? $theme : '')?>"
  class="site-content <?php echo get_post_type() ?> <?php echo $slug ?>">

<?php
  if ( have_rows( 'content' ) ) :
    while ( have_rows( 'content' ) ) : the_row();
      if ( get_row_layout() == 'primary' ) :
        $title = get_sub_field( 'title' );
        $desc = get_sub_field( 'desc' );
        $noListClass = have_rows( 'list' ) ? "" : " anim-fade";
        $listHeadClass = have_rows( 'list' ) ? " anim-fade" : ""; ?>
        <div class="primary row<?php echo $noListClass; ?>">
          <div class="head<?php echo $listHeadClass; ?>">
            <h1 class="title"><?php echo $title ?></h1>
            <p class="desc"><?php echo $desc ?></p>
          </div> <?php
          if ( have_rows( 'list' ) ) : $ct = 0; ?>
          <div class="list"> <?php
            while ( have_rows( 'list' ) ) : the_row();
              $formatted = ($ct < 10 ? '0' : '') . ($ct + 1); ?>
              <div class="item anim-fade">
                <h1 class="count"><?php echo $formatted; ?></h1>
                <div class="info" data-count="<?php echo $formatted; ?>">
                  <h2 class="title"><?php the_sub_field( 'title' ) ?></h2>
                  <h3 class="subtitle"><?php the_sub_field( 'subtitle' ) ?></h3> <?php
                  if ( have_rows( 'items' ) ) : ?>
                    <ul> <?php
                      while ( have_rows( 'items' ) ) : the_row(); ?>
                        <li>
                          <span class="label"><?php the_sub_field( 'label' ) ?></span>
                          <?php if ( get_sub_field( 'sub' ) ) : ?>
                            <span class="sub"><?php the_sub_field( 'sub' ) ?></span>
                          <?php endif; ?>
                        </li> <?php
                      endwhile; ?>
                    </ul> <?php $ct += 1;
                  endif; ?>
                </div>
              </div><?php
            endwhile; ?>
          </div> <?php
          endif; ?>
        </div> <?php
      endif;
    endwhile;
  endif;
?>

<?php get_footer(); ?>
