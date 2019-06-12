<?php

add_action( 'init', function() {
    remove_post_type_support( 'page', 'editor' );
}, 99);

if ( function_exists('acf_add_options_page') ) {

  acf_add_options_page(array(
		'page_title' 	=> 'Theme Settings',
		'menu_title'	=> 'Theme Settings',
		'menu_slug' 	=> 'theme-settings',
		'capability'	=> 'edit_posts',
		'redirect'		=> false,
    'post_id'     => 'theme-settings',
	));

}
