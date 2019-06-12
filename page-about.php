<?php get_header(); ?>

<div id="content" class="site-content">
<?php
  if ( have_rows( 'content' ) ) :
    while ( have_rows( 'content' ) ) : the_row();
      if ( get_row_layout() == 'primary' ) : ?>
        <div class="primary row">
          <div class="head">
            <h1><?php the_sub_field( 'title' ) ?></h1>
            <p><?php the_sub_field( 'desc' ) ?></p>
          </div> <?php
          if ( have_rows( 'list' ) ) : $ct = 0; ?>
          <div class="list"> <?php
            while ( have_rows( 'list' ) ) : the_row(); ?>
              <div class="item">
                <h1 class="count"><?php echo $ct + 1; ?></h1>
                <div class="info" data-count="<?php echo $ct + 1; ?>">
                  <h2><?php the_sub_field( 'title' ) ?></h2>
                  <h3><?php the_sub_field( 'subtitle' ) ?></h3> <?php
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
                    </ul> <?php
                  endif; ?>
                </div>
              </div><?php $ct += 1;
            endwhile;
          endif; ?>
          <div>
        </div> <?php
      endif;
    endwhile;
  endif;
?>
</div>

<?php get_footer(); ?>
