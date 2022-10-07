import { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { postReq } from "../utilities/fetchUtils";

function NewCommentForm(props) {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { postId, addComment } = props;
  const [body, setBody] = useState("");

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const data = await postReq(`/api/posts/${postId}/comments`, {
        body,
        commenterId: userId,
      });
      if (data instanceof Error) return navigate("/error/something went wrong");
      addComment(data);
      setBody("");
    },
    [body, navigate, postId, userId, addComment]
  );

  return (
    <form onSubmit={handleSubmit} className="new-comment">
        <textarea
          className="new-comment-body"
          name="commentBody"
          id="comment-body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <button className="new-comment-btn btn | fs-300">Comment</button>
    </form>
  );
}

export default NewCommentForm;
