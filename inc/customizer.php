<?php

/**
 * Paper Planes Theme Customizer
 *
 * @package Paper_Planes
 */

/**
 * Add postMessage support for site title and description for the Theme Customizer.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
function paper_planes_customize_register( $wp_customize ) {
	$wp_customize->get_setting( 'blogname' )->transport         = 'postMessage';
	$wp_customize->get_setting( 'blogdescription' )->transport  = 'postMessage';
	$wp_customize->get_setting( 'header_textcolor' )->transport = 'postMessage';

	if ( isset( $wp_customize->selective_refresh ) ) {
		$wp_customize->selective_refresh->add_partial( 'blogname', array(
			'selector'        => '.site-title a',
			'render_callback' => 'paper_planes_customize_partial_blogname',
		) );
		$wp_customize->selective_refresh->add_partial( 'blogdescription', array(
			'selector'        => '.site-description',
			'render_callback' => 'paper_planes_customize_partial_blogdescription',
		) );
	}
}
add_action( 'customize_register', 'paper_planes_customize_register' );

/**
 * Render the site title for the selective refresh partial.
 *
 * @return void
 */
function paper_planes_customize_partial_blogname() {
	bloginfo( 'name' );
}

/**
 * Render the site tagline for the selective refresh partial.
 *
 * @return void
 */
function paper_planes_customize_partial_blogdescription() {
	bloginfo( 'description' );
}

/**
 * Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
 */
function paper_planes_customize_preview_js() {
	wp_enqueue_script( 'paper-planes-customizer', get_template_directory_uri() . '/js/customizer.js', array( 'customize-preview' ), '20151215', true );
}
add_action( 'customize_preview_init', 'paper_planes_customize_preview_js' );


add_action( 'customize_register', 'customizer_settings' );
function customizer_settings( $wp_customize ) {
  $wp_customize->add_section( 'paperplanes-settings' , array(
      'title'      => 'Theme Settings',
      'priority'   => 30,
  ) );

  $wp_customize->add_setting( 'dark_theme_logo' , array(
    'default'     => '',
    'transport'   => 'refresh',
  ) );

  $wp_customize->add_control( new WP_Customize_Image_Control( $wp_customize, 'dark_theme_logo', array(
    'label'      => 'Dark Theme Logo',
    'section'    => 'paperplanes-settings',
    'settings'   => 'dark_theme_logo',
  ) ) );

  $wp_customize->add_setting( 'light_theme_logo' , array(
    'default'     => '',
    'transport'   => 'refresh',
  ) );

  $wp_customize->add_control( new WP_Customize_Image_Control( $wp_customize, 'light_theme_logo', array(
    'label'      => 'Light Theme Logo',
    'section'    => 'paperplanes-settings',
    'settings'   => 'light_theme_logo',
  ) ) );
}
