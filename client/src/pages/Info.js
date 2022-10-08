// display information about the user
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getReq } from "../utilities/fetchUtils";

function Info(props) {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [info, setInfo] = useState({});

  useEffect(() => {
    (async () => {
      const data = await getReq(`/api/users/${userId}/info`);
      if (data instanceof Error || !data)
        return navigate(`/error/${data || "something went wrong"}`);
      setInfo(data);
    })();
  }, [navigate, userId]);

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
