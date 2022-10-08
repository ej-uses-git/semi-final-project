// outlet page
import { useCallback, useContext, useEffect } from "react";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import { CacheContext } from "../App";
function UserPage(props) {
  const navigate = useNavigate();
  const { userId } = useParams();

  const { clearCache } = useContext(CacheContext);

  const handleLogOut = useCallback(() => {
    localStorage.removeItem("currentUser");
    clearCache();
    navigate("/login");
  }, [navigate, clearCache]);

  useEffect(() => {
    const userInStorage = localStorage.getItem("currentUser");
    if (!userInStorage || userInStorage !== userId)
      return navigate("/error/not logged in");
  }, [navigate, userId]);

  return (
    <>
      <div className="page-header">
        <nav className="primary-nav | bg-primary-300">
          <NavLink
            to={`/users/${userId}/posts`}
            className={({ isActive }) =>
              "fw-bold fs-400" +
              (isActive ? " text-primary-800" : " text-primary-600")
            }
          >
            Posts
          </NavLink>
          <NavLink
            to={`/users/${userId}/info`}
            className={({ isActive }) =>
              "fw-bold fs-400" +
              (isActive ? " text-primary-800" : " text-primary-600")
            }
          >
            Info
          </NavLink>
          <NavLink
            to={`/users/${userId}/todos`}
            className={({ isActive }) =>
              "fw-bold fs-400" +
              (isActive ? " text-primary-800" : " text-primary-600")
            }
          >
            ToDos
          </NavLink>
        </nav>
      </div>
      <button onClick={handleLogOut} className="log-out btn">
        LOG OUT
      </button>
      <Outlet />
    </>
  );
}

export default UserPage;
