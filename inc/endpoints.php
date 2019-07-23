<?php

function get_paperplanes_menu() {
    # Change 'menu' to your own navigation slug.
    $menu_items = wp_get_nav_menu_items('primary-menu');
    foreach($menu_items as $menu_item) {
        // ALTERNATIVE: $slug = get_post_field( 'post_name', $menu_item->object_id );
        $slug = basename( get_permalink($menu_item->object_id) );
        $menu_item->slug = $slug;
    }
    return $menu_items;
}

add_action( 'rest_api_init', function () {
    register_rest_route( 'paperplanes', '/menu', array(
        'methods' => 'GET',
        'callback' => 'get_paperplanes_menu',
    ) );

    register_rest_field( array('vt_project', 'vt_play'),
        'fimg_url',
        array(
            'get_callback'    => 'get_rest_featured_image',
            'update_callback' => null,
            'schema'          => null,
        )
    );
} );

function get_rest_featured_image( $object, $field_name, $request ) {
    if( $object['featured_media'] ){
        $img = wp_get_attachment_image_src( $object['featured_media'], 'app-thumb' );
        return $img[0];
    }
    return false;
}
