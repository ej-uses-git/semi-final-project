// welcome message to user
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getReq } from "../utilities/fetchUtils";
import { CacheContext } from "../App";

function Welcome(props) {
  const { userId } = useParams();
  const navigate = useNavigate();

  const { retrieveFromCache, addToCache } = useContext(CacheContext);

  const [name, setName] = useState(null);

  useEffect(() => {
    if (name) return;
    const storedName = retrieveFromCache("fullName");
    if (storedName) return setName(storedName);
    (async () => {
      const data = await getReq(`/api/users/${userId}`);
      if (data instanceof Error || !data)
        return navigate(`/error/${data || "something went wrong"}`);
      setName(data);
      addToCache("fullName", data);
    })();
  }, [navigate, userId, name, addToCache, retrieveFromCache]);

  return (
    <div className="text-primary-600 fw-bold ff-headings fs-600">
      {!!name && `Welcome,  ${name}!`}
    </div>
  );
}

export default Welcome;
