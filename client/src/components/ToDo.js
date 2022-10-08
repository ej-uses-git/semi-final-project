import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { putReq } from "../utilities/fetchUtils";

function Todo(props) {
  const navigate = useNavigate();
  const { title, completedInit, todoId } = props;
  const [checked, setChecked] = useState(completedInit);

  const handleChange = useCallback(async () => {
    const data = await putReq(`/api/todos/${todoId}`, {
      completed: !checked,
    });
    if (data instanceof Error || !data)
      return navigate("/error/something went wrong");
    setChecked((prev) => !prev);
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
