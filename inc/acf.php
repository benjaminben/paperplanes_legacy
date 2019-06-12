<?php

add_filter('acf/load_value/name=content', 'default_content_layout', 10, 3);
function  default_content_layout($value, $post_id, $field) {
  if ($value !== NULL) {
    // $value will only be NULL on a new post
    return $value;
  }

  // Only add default content for certain post types
  if ( ! in_array(
    get_post_type( $post_id ),
    array(
      'vt_project'
    ) ) ) {
    return $value;
  }

  // add default layouts
  $value = array(
    array('acf_fc_layout' => 'marquee_video'),
    array('acf_fc_layout' => 'title'),
    array('acf_fc_layout' => 'generic'),
    array('acf_fc_layout' => 'credits'),
    array('acf_fc_layout' => 'gallery'),
  );

  return $value;
}
