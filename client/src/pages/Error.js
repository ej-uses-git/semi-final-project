// display an error page
import { useResolvedPath, Link } from "react-router-dom";

function Error(props) {
  const { pathname } = useResolvedPath();
  return (
    <div className="error-page">
      <div className="error-message | fs-600 ff-headings fw-bold text-primary-600">
        {pathname
          .split("/")
          .slice(-1)[0]
          .toUpperCase()
          .replaceAll(/[(%20|+|/)]/g, " ")}
      </div>
      <Link to="/login" className="ff-body fw-regular fs-300 text-accent-500">
        Back to Log-In
      </Link>
    </div>
  );
}

export default Error;
