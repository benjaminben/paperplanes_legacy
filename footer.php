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
		<svg id="plane" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 359.86 347.48">
			<polyline
				ref="l1" class="l1" points="6 6 195.94 192.74 353.86 191.7 166.91 6.36 113.17 104.81"
				fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"/>
			<polyline
				ref="l2" class="l2" points="6.18 6.09 85.88 155.88 275.5 341.48 275.3 198.03"
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
