<?php
/**
 * The template for displaying the footer
 *
 * Contains footer content and the closing of the #main and #page div elements.
 *
 * @package WordPress
 * @subpackage Twenty_Twelve
 * @since Twenty Twelve 1.0
 */
?>

    <div class="separator"></div>

    </div><!-- #main .wrapper -->

      </div><!-- #page -->

        <footer id="page_footer">
            <div id="copyright">
                <small>Copyright © Jason Brazeal</small>
                <img class="logo" src="<?php echo get_stylesheet_directory_uri() ?>/img/logo.png" />
            </div>
        </footer>

        <div id="footer_links">
            <a href="https://github.com/jsonbrazeal">
                <span id="github" class="sink"></span>
            </a>
            <a href="https://twitter.com/jsonbrazeal">
                <span id="twitter" class="sink"></span>
            </a>
            <a href="https://linkedin.com/in/jsonbrazeal">
                <span id="linkedin" class="sink"></span>
            </a>

            <span id="up_arrow" class="sink"></span>

        </div>

        <div class="thin_strip"></div>

<?php wp_footer(); ?>
</body>
</html>