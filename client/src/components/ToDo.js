import { useCallback, useState } from "react";

function Todo(props) {
  const { title, completedInit, todoId, makeChange } = props;
  const [checked, setChecked] = useState(completedInit);

  const handleChange = useCallback(async () => {
    makeChange(todoId, !checked);
    setChecked(prev => !prev);
    // const data = await putReq(`/api/todos/${todoId}`, {
    //   completed: !checked,
    // });
    // if (data instanceof Error || !data)
    //   return navigate("/error/something went wrong");
    // setChecked((prev) => !prev);
  }, [makeChange, todoId, checked]);

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
