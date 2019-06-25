<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Paper_Planes
 */

global $post;

$theme = get_field( 'theme' );
if ( !$theme ) $theme = 'dark';
$slug = $post->post_name;

?>

<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">

	<?php wp_head(); ?>
</head>

<body
	data-slug="<?php echo $slug ?>"
	data-theme="<?php echo $theme ?>"
	<?php body_class( ($theme ? 'theme-' . $theme : '') ); ?>
	data-site-url="<?php echo site_url() ?>">

<div id="page" data-barba="wrapper" class="site">
	<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', 'paperplanes' ); ?></a>
	<header id="masthead" class="site-header">
		<div class="site-branding">
			<?php the_custom_logo(); ?>
		</div><!-- .site-branding -->
		<?php get_template_part("template-parts/navigation", "primary") ?>
	</header><!-- #masthead -->
	<main>
		<div data-barba="container">
