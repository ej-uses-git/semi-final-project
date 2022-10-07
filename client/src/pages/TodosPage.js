import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Todo from "../components/ToDo";
import { getReq } from "../utilities/fetchUtils";

// page to display user todos
function TodosPage(props) {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getReq(`/api/users/${userId}/todos`);
      if (data instanceof Error) return navigate("/error/something went wrong");
      if (!data) return;
      setTodos(data);
    })();
  }, [navigate, userId]);

  // title, completedInit, todoId
  return (
    <div className="user-todos">
      {todos.map((todo) => (
        <Todo
          key={todo.todo_id}
          title={todo.title}
          completedInit={todo.completed}
          todoId={todo.todo_id}
        />
      ))}
    </div>
  );
}

export default TodosPage;