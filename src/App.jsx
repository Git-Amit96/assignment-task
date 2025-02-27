import UserDataForm from "./components/UserFormComponent"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserInfo from "./components/UserInfo";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Auth from "./components/Auth";

const App=() =>{
return (
  <Router>
    <Navbar/>
  <Routes>
    <Route path="/" element={<Dashboard/>}/>
    <Route path="/form" element={<UserDataForm />} />
    <Route path="/user/:id" element={<UserInfo />} />
    <Route path="/auth" element={<Auth />} />
  </Routes>
</Router>
)
  
}

export default App;
