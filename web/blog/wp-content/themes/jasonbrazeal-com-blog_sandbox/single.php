<?php
/**
 * The Template for displaying all single posts
 *
 * @package WordPress
 * @subpackage Twenty_Twelve
 * @since Twenty Twelve 1.0
 */

get_header();
// get_sidebar();
?>

	<div id="primary" class="site-content">
		<div id="content" role="main">

			<?php while ( have_posts() ) : the_post(); ?>

				<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
		        <header class="entry-header">
		            <?php the_post_thumbnail(); ?>
		            <h1 class="entry-title"><?php the_title(); ?></h1>
		            <p><?php the_time('F j, Y') ?>
            	    <?php if ( get_comments_number() ) : ?>
		            	<p><a href="<?php echo get_comments_link( $post->ID ); ?>">
		                <?php comments_number('', '1 comment', '% comments' ); ?>
		            	</a></p>
		            <?php endif; // get_comments_number() ?>
		        	</p>
		        </header><!-- .entry-header -->
		        <div class="entry-content">
					<?php the_content(); ?>
	        	</div>
		        </article>

				<nav class="nav-single clearfix">
					<h3 class="assistive-text"><?php _e( '', 'twentytwelve' ); ?></h3>
					<span class="nav-previous"><?php previous_post_link( '%link', '<span class="meta-nav">' . _x( '&larr;', 'Previous post link', 'twentytwelve' ) . '</span> %title' ); ?></span>
					<span class="nav-next"><?php next_post_link( '%link', '%title <span class="meta-nav">' . _x( '&rarr;', 'Next post link', 'twentytwelve' ) . '</span>' ); ?></span>
				</nav><!-- .nav-single -->

			    <div class="separator"></div>

				<?php comments_template( '', true ); ?>

			<?php endwhile; // end of the loop. ?>

		</div><!-- #content -->
	</div><!-- #primary -->

<?php get_footer(); ?>