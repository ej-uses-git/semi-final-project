// display an error page
import { useResolvedPath, Link } from "react-router-dom";

function Error(props) {
  const { pathname } = useResolvedPath();
  return (
    <div className="error-page">
      <div className="error-message | fs-600 ff-headings fw-bold text-primary-600">
        {pathname
          .toUpperCase()
          .replaceAll("+", " ")
          .replaceAll("%20", " ")
          .replaceAll("/", " ")
          .replace("ERROR", "ERROR:")}
      </div>
      <Link to="/login" className="ff-body fw-regular fs-300 text-accent-500">Back to Log-In</Link>
    </div>
  );
}

export default Error;
