import { useCallback, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { putReq } from "../utilities/fetchUtils";

function Todo(props) {
  const navigate = useNavigate();
  const { title, completedInit, todoId } = props;
  const [checked, setChecked] = useState(completedInit);
  const isMount = useRef(true);

  const handleChange = useCallback(() => {
    setChecked((prev) => !prev);
  }, []);

  useEffect(() => {
    isMount.current = false;
  }, []);

  useEffect(() => {
    (async () => {
      if (isMount.current) return;
      const data = await putReq(`/api/todos/${todoId}`, {
        completed: checked,
      });
      if (data instanceof Error || !data)
        return navigate("/error/something went wrong");
    })();
  }, [checked, navigate, todoId]);

  return (
    <div className="todo">
      <input
        id={todoId}
        checked={checked}
        onChange={handleChange}
        type="checkbox"
      />
      <label htmlFor={todoId}>{title}</label>
    </div>
  );
}

export default Todo;
