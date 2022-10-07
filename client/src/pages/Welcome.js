// welcome message to user
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getReq } from "../utilities/fetchUtils";
function Welcome(props) {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState(null);

  useEffect(() => {
    if (name) return;
    (async () => {
      const data = await getReq(`/api/users/${userId}`);
      if (data instanceof Error || !data)
        return navigate("/error/something went wrong");
      setName(data);
    })();
  }, [navigate, userId, name]);

  return (
    <div className="text-primary-600 fw-bold ff-headings fs-600">
      {!!name && `Welcome,  ${name}!`}
    </div>
  );
}

export default Welcome;
