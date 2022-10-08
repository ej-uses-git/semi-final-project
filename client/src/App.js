import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import "./App.css";
import Info from "./pages/Info";
import PostsPage from "./pages/PostsPage";
import TodosPage from "./pages/TodosPage";
import UserPage from "./pages/UserPage";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Error from "./pages/Error";
import { createContext, useCallback, useRef } from "react";
import LandingPage from "./pages/LandingPage";

export const CacheContext = createContext();

function App() {
  const cache = useRef({
    fullName: "",
    info: {},
    posts: [],
    todos: [],
    comments: {},
  });

  const addToCache = useCallback((target, value, inner) => {
    if (inner)
      return (cache.current[target][inner] =
        value instanceof Array ? [...value] : { ...value });
    if (typeof cache.current[target] === "string")
      return (cache.current[target] = value);
    if (cache.current[target] instanceof Array)
      return (cache.current[target] = [...value]);
    cache.current[target] = { ...value };
  }, []);

  const retrieveFromCache = useCallback((target, inner) => {
    if (!inner) return cache.current[target];
    return cache.current[target][inner];
  }, []);

  const clearCache = useCallback(() => {
    cache.current = {
      fullName: "",
      info: {},
      posts: [],
      todos: [],
      comments: {},
    };
  }, []);

  const cacheUtils = {
    addToCache,
    clearCache,
    retrieveFromCache,
  };

  return (
    <BrowserRouter>
      <CacheContext.Provider value={cacheUtils}>
        <Routes>
          <Route path="/" element={<LandingPage />} />

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
      </CacheContext.Provider>
    </BrowserRouter>
  );
}

export default App;
