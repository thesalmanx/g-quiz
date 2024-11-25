import Home from "./Components/Home";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout";
import { useAuth } from "./Hooks/useAuth";
import HomeLayout from "./Components/HomeLayout";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import ToDoList from "./Components/ToDoList";
import QuizBoard from "./Components/ToDoList";

function App() {
  const isAuthenticated = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        {isAuthenticated ? (
          <Route path="/" element={<Layout />}>
            <Route index element={<ToDoList />} />
          </Route>
        ) : (
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<Home />} />
          </Route>
        )}

        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
