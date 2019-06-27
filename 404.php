<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package Paper_Planes
 */

$bg_color = "#000";
$theme = "dark";
get_header();
?>

<div
  id="content"
  data-vue-root="Team"
  data-barba="container"
  style="background-color: <?php echo $bg_color ?>"
  data-bg-color="<?php echo $bg_color ?>"
  data-theme="<?php echo $theme ?>"
  class="site-content 404">

	<h1>Oops! That page can't be found. Maybe we're building it...</h1>
  <img
    title="Under Construction"
    alt="UNDER CONSTRUCTION"
    src="<?php echo get_stylesheet_directory_uri() ?>/assets/images/under-construction.gif" />

<?php
get_footer();
