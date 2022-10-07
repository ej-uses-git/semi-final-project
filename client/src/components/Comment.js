import DeleteCommentButton from "./DeleteCommentButton";

function Comment(props) {
  const { name, email, body, deletable, removeComment, commentId } = props;

  return (
    <div className="comment">
      <h3 className="comment-name | ff-body fs-300 fw-bold text-neutral-100">{name}</h3>
      <h4 className="comment-email | ff-body fs-150 fw-bold text-neutral-100">{email}</h4>
      <p className="comment-body | ff-body fs-200 fw-regular text-accent-800">{body}</p>
      {deletable && (
        <DeleteCommentButton
          removeComment={removeComment}
          commentId={commentId}
        />
      )}
    </div>
  );
}

export default Comment;
