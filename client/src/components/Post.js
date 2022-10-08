import { useCallback, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Comment from "./Comment";
import { getReq } from "../utilities/fetchUtils";
import NewCommentForm from "./NewCommentForm";
import { CacheContext } from "../App";

function Post(props) {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { title, fullName, body, postId } = props;

  const { retrieveFromCache, addToCache } = useContext(CacheContext);

  const [comments, setComments] = useState([]);
  const [sentRequest, setSentRequest] = useState(false);
  const [display, setDisplay] = useState(false);

  const getComments = useCallback(async () => {
    const storedComments = retrieveFromCache("comments", postId);
    if (storedComments) return setComments(storedComments);
    const data = await getReq(`/api/posts/${postId}/comments`);
    if (data instanceof Error) return navigate("/error/something went wrong");
    setSentRequest(true);
    if (!data) return;
    setComments(data);
    addToCache("comments", data, postId);
  }, [navigate, postId, addToCache, retrieveFromCache]);

  const removeComment = useCallback(
    (commentId) => {
      return () => {
        setComments((prev) => {
          const copy = prev.filter(
            (comment) => comment.comment_id !== commentId
          );
          addToCache("comments", copy, postId);
          return copy;
        });
      };
    },
    [addToCache, postId]
  );

  const addComment = useCallback(
    (comment) => {
      setComments((prev) => {
        const copy = [...prev, comment];
        addToCache("comments", copy, postId);
        return copy;
      });
    },
    [addToCache, postId]
  );

  return (
    <div className="post">
      <h2 className="post-title | text-primary-600 ff-headings fw-bold fs-400">
        {title}
      </h2>
      <h3 className="poster-name | text-accent-500 ff-headings fw-regular fs-300">
        {fullName}
      </h3>
      <p className="post-body | text-primary-800 ff-body fw-regular fs-200">
        {body}
      </p>
      <button
        onClick={async () => {
          if (!sentRequest) await getComments();
          setDisplay((prev) => !prev);
        }}
        className="toggle-comments"
      >
        {display ? "Hide" : "Show"} Comments
      </button>
      {display && (
        <div className="post-comments">
          {comments.map((comment) => (
            <Comment
              key={comment.comment_id}
              name={comment.commenter_name}
              email={comment.commenter_email}
              body={comment.body}
              commentId={comment.comment_id}
              removeComment={removeComment(comment.comment_id)}
              deletable={comment.user_id === parseInt(userId)}
            />
          ))}
          <NewCommentForm postId={postId} addComment={addComment} />
        </div>
      )}
    </div>
  );
}

export default Post;
