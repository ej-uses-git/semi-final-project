// display information about the user
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getReq } from "../utilities/fetchUtils";
import { CacheContext } from "../App";

function Info(props) {
  const navigate = useNavigate();
  const { userId } = useParams();

  const { retrieveFromCache, addToCache } = useContext(CacheContext);

  const [info, setInfo] = useState({});

  useEffect(() => {
    const storedInfo = retrieveFromCache("info");
    if (storedInfo.full_name) return setInfo(storedInfo);
    (async () => {
      const data = await getReq(`/api/users/${userId}/info`);
      if (data instanceof Error || !data)
        return navigate(`/error/${data || "something went wrong"}`);
      setInfo(data);
      addToCache("info", data);
    })();
  }, [navigate, userId, addToCache, retrieveFromCache]);

  return (
    <>
      <ul className="user-info">
        {Object.keys(info).map((key) => (
          <li key={key + info[key]} className="info-li">
            <div className="info-key">{key.replace("_", " ")}:</div>{" "}
            <div className="info-value">{info[key]}</div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Info;
