import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";

// Lazy-loaded components
const UserDataForm = lazy(() => import("./components/UserFormComponent"));
const UserInfo = lazy(() => import("./components/UserInfo"));
const Auth = lazy(() => import("./components/Auth"));

const App = () => {
  return (
    <Router>
      <Navbar />
      <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/form" element={<UserDataForm />} />
          <Route path="/user/:id" element={<UserInfo />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
 
