import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createBrowserHistory } from "history";
import Todo from "../components/ToDo";
import { getReq, putReq } from "../utilities/fetchUtils";

const history = createBrowserHistory();
// page to display user todos
function TodosPage(props) {
  const { userId } = useParams();
  const navigate = useNavigate();
  const unlisten = useRef();

  const [todos, setTodos] = useState([]);
  const [unsavedChanges, setUnsavedChanges] = useState([]);

  const makeChange = useCallback(
    (id, value) => {
      const existingChange = unsavedChanges.find(
        (change) => id === change.id && value === !change.value
      );
      if (existingChange) {
        return setUnsavedChanges((prev) => {
          const copy = [...prev];
          copy.splice(prev.indexOf(existingChange));
          return copy;
        });
      }
      setUnsavedChanges((prev) => [...prev, { id, value }]);
    },
    [unsavedChanges]
  );

  const handleSave = useCallback(async () => {
    if (!unsavedChanges.length) return;
    for (let change of unsavedChanges) {
      const data = await putReq(`/api/todos/${change.id}`, {
        completed: change.value,
      });
      if (data instanceof Error || !data)
        return navigate(`/error/${data || "something went wrong"}`);
      setTodos((prev) => {
        const todoIndex = prev.findIndex((todo) => todo.todo_id === change.id);
        const item = { ...prev[todoIndex] };
        item.completed = !item.completed;
        const copy = [...prev];
        copy[todoIndex] = item;
        return copy;
      });
    }
    setUnsavedChanges([]);
    if (unlisten.current) {
      unlisten.current();
      unlisten.current = null;
    }
  }, [navigate, unsavedChanges]);

  useEffect(() => {
    if (!unsavedChanges.length) {
      if (unlisten.current) unlisten.current();
      return;
    }
    if (unlisten.current) return;
    unlisten.current = history.listen((tx) => {
      const answer = window.confirm(
        "Your unsaved changes will be discarded. Do you want to exit?"
      );
      if (answer) {
        return unlisten.current();
      }
      navigate("");
    });
  }, [unsavedChanges.length, navigate]);

  useEffect(() => {
    (async () => {
      const data = await getReq(`/api/users/${userId}/todos`);
      if (data instanceof Error) return navigate(`/error/${data}`);
      setTodos(data);
    })();
  }, [navigate, userId]);

  return (
    <div className="user-todos">
      {todos.map((todo) => (
        <Todo
          key={todo.todo_id}
          makeChange={makeChange}
          title={todo.title}
          completedInit={todo.completed}
          todoId={todo.todo_id}
        />
      ))}
      <button className="btn" onClick={handleSave}>
        SAVE
      </button>
    </div>
  );
}

export default TodosPage;
