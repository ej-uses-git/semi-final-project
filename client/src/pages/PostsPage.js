import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getReq } from "../utilities/fetchUtils";
import Post from "../components/Post";

// page to display user posts
function PostsPage(props) {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getReq(`/api/users/${userId}/posts`);
      if (data instanceof Error) return navigate(`/error/${data}`);
      setPosts(data);
    })();
  }, [navigate, userId]);

  return (
    <div className="user-posts">
      {posts.map((post) => (
        <Post
          key={post.post_id}
          title={post.title}
          fullName={post.full_name}
          body={post.body}
          postId={post.post_id}
        />
      ))}
    </div>
  );
}

export default PostsPage;
