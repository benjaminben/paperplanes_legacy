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
	<div id="loader" v-bind:style="{ display: shared.loaded ? 'none' : 'flex' }">
		<svg id="plane" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380.79 369.3">
			<polyline
				ref="l1" class="l1" points="6 6 193.69 190.8 353.26 191.19 166.25 6.55 112.73 105.26"
				fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"/>
			<polyline
				ref="l2" class="l2" points="6.82 7.27 84.8 154.33 274.96 339.7 274.96 191.27"
				fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"/>
		</svg>
	</div>
	<noscript>
		<style>#loader {display: none;}</style>
	</noscript>
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
