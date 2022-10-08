import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import "./App.css";
import Info from "./pages/Info";
import PostsPage from "./pages/PostsPage";
import TodosPage from "./pages/TodosPage";
import UserPage from "./pages/UserPage";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Error from "./pages/Error";

function App() {
  // TODO use a ref or global variable to keep track of data retrieved from the server, and check in pages/components to see if request is needed

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />

        <Route path="/users/:userId" element={<UserPage />}>
          <Route index element={<Welcome />} />
          <Route path="info" element={<Info />} />
          <Route path="todos" element={<TodosPage />} />
          <Route path="posts" element={<PostsPage />} />
        </Route>

        <Route path="/error">
          <Route path="*" element={<Error />} />
        </Route>

        <Route path="/*" element={<Navigate to="/error/page not found" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
