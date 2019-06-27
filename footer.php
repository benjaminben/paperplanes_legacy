<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Paper_Planes
 */

?>


		</div><!-- #content -->
	</main><!-- #barba-wrapper -->
	<?php get_template_part( 'template-parts/content', 'photoswipe' ); ?><!-- Ideally this isn't global -->
	<div id="loader" data-vue-root="Loader" v-bind:style="{ display: loaded ? 'none' : 'flex' }">
		<?php get_template_part( 'template-parts/graphic', 'plane' ); ?>
	</div>
	<noscript>
		<style>#loader {display: none;}</style>
	</noscript>
</div><!-- #page -->
<footer id="colophon" class="site-footer">
	<span class="legal">&copy; VT Pro Design. All rights reserved</span>
	<span class="tag">Let&apos;s make cool shit. <span class="year">2019</span></span>
</footer><!-- #colophon -->
<?php wp_footer(); ?>

</body>
</html>
