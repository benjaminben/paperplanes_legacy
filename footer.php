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

				<footer id="colophon" class="site-footer">

				</footer><!-- #colophon -->
			</div><!-- #content -->
		</div><!-- .barba-container -->
	</main><!-- #barba-wrapper -->
	<?php get_template_part( 'template-parts/content', 'photoswipe' ); ?><!-- Ideally this isn't global -->
	<div id="loader" v-bind:style="{ display: shared.loaded ? 'none' : 'flex' }">
		<?php get_template_part( 'template-parts/graphic', 'plane' ); ?>
	</div>
	<noscript>
		<style>#loader {display: none;}</style>
	</noscript>
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
