import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { deleteReq } from "../utilities/fetchUtils";

function DeleteCommentButton(props) {
  const { removeComment, commentId } = props;
  const navigate = useNavigate();

  const handleClick = useCallback(
    async (id) => {
      const data = await deleteReq(`/api/comments/${commentId}`);
      if (data instanceof Error) return navigate("/error/something went wrong");
      removeComment();
    },
    [removeComment, commentId, navigate]
  );

  return (
    <>
      <button
        onClick={handleClick}
        className="visibly-hidden"
        id={`delete-btn-${commentId}`}
      >
        Delete
      </button>

      <label
        htmlFor={`delete-btn-${commentId}`}
        className="trash-icon-container"
      >
        <svg
          tabIndex={0}
          onKeyDown={(e) =>
            e.key === "Enter" || e.key === " " ? handleClick() : ""
          }
          role="button"
          className="trash-icon"
          width="752pt"
          height="752pt"
          version="1.1"
          viewBox="0 0 752 752"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m376.45 196.04c-16.508 0-27.957 6.1406-36.406 12.578-8.4492 6.4414-14.348 12.562-24.418 16.574v0.003906c-3.6797 1.3438-6.1484 4.8164-6.2188 8.7305h-89.684v18.941h312.56v-18.941h-89.684c-0.066406-3.9141-2.5352-7.3867-6.2148-8.7305-10.141-4.0273-16.348-10.191-24.715-16.574-8.3672-6.3867-19.488-12.578-35.223-12.578zm0 18.941c11.309 0 16.531 3.2773 23.68 8.7305 3.7852 2.8906 7.918 6.6016 13.023 10.211h-74.59c5.1055-3.6523 9.2344-7.3242 13.023-10.211 7.082-5.3984 12.496-8.7305 24.863-8.7305zm-128.31 47.359v251.14c0 28.332 14.133 42.473 42.77 42.473h170.49c28.223 0 42.473-14.141 42.473-42.473v-251.14h-255.73zm52.094 61.566h18.941v170.49h-18.941zm66.301 0h18.941v170.49h-18.941zm66.301 0h18.941v170.49h-18.941z" />
        </svg>
      </label>
    </>
  );
}

export default DeleteCommentButton;
