<?php
/**
 * The template for displaying comments
 *
 * The area of the page that contains both current comments
 * and the comment form.
 *
 * @package WordPress
 * @subpackage Twenty_Fifteen
 * @since Twenty Fifteen 1.0
 */

/*
 * If the current post is protected by a password and
 * the visitor has not yet entered the password we will
 * return early without loading the comments.
 */
if ( post_password_required() ) {
	return;
}
?>

<div class="separator"></div>
<div id="comments" class="comments-area clearfix">

	<?php if ( have_comments() ) : ?>
		<h2 class="comments-title">
			<?php
				printf( _nx( '1 comment', '%1$s comments', get_comments_number(), 'comments title', 'twentyfifteen' ),
					number_format_i18n( get_comments_number() ), get_the_title() );
			?>
		</h2>

		<?php twentyfifteen_comment_nav(); ?>

		<ol class="comment-list">
			<?php
				wp_list_comments( array(
					'style'       => 'ol',
					'short_ping'  => true,
					'avatar_size' => 56,
				) );
			?>
		</ol><!-- .comment-list -->

		<?php twentyfifteen_comment_nav(); ?>
		<div class="separator"></div>
	<?php endif; // have_comments() ?>

	<!-- if comments are closed, don't display anything
	<?php
		// If comments are closed and there are comments, let's leave a little note, shall we?
		if ( ! comments_open() && get_comments_number() && post_type_supports( get_post_type(), 'comments' ) ) :
	?>
		<p class="no-comments"><?php _e( 'Comments are closed.', 'twentyfifteen' ); ?></p>
		<div class="separator"></div>
	<?php endif; ?> -->

	<?php
		$fields =  array(
		  'author' =>
		    '<div><label for="author">' . __( 'Name', 'domainreference' ) . '</label> ' .
		    ( $req ? '' : '' ) .
		    '<input id="author" name="author" type="text" value="' . esc_attr( $commenter['comment_author'] ) .
		    '" size="30" maxlength="30"' . ' /></div>',

		  'email' =>
		    '<div><label for="email">' . __( 'Email', 'domainreference' ) . '</label> ' .
		    ( $req ? '' : '' ) .
		    '<input id="email" name="email" type="text" value="' . esc_attr(  $commenter['comment_author_email'] ) .
		    '" size="30" maxlength="40"' . ' /></div>',
		);
		$args = array(
			'fields' => $fields,
			'comment_notes_before' => '<p class="comment-notes">' . __( 'Your email address will not be published. All fields are required.' ) . '</p>',
			'comment_notes_after' => '',
			'label_submit' => 'Submit',
			'comment_field' =>
		  	'<div><label for="comment">' . _x( 'Comment', 'noun' ) . '</label><textarea id="comment" name="comment" cols="45" rows="8" aria-required="true"></textarea></div>'
		  	);


		comment_form($args); ?>

</div><!-- .comments-area -->
