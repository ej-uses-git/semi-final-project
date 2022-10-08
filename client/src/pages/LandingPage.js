import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LandingPage(props) {
  const navigate = useNavigate();

  useEffect(() => {
    const userInStorage = localStorage.getItem("currentUser");
    if (userInStorage) return navigate(`/users/${userInStorage}`);
    navigate("/login");
  }, [navigate]);

  return <></>;
}

export default LandingPage;
