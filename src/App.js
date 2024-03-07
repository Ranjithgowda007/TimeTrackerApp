import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeeList from "./Components/EmployeeList";
import EmployeeProvider from "./Contexts/EmployeeContext";
import { AuthProvider } from "./Contexts/LoginContext";
import "./Components/style.css";
import Dashboard from "./Components/Dashboard";
import EmployForm from "./Components/EmployForm";
import ErrorPage from "./Components/ErrorPage";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <EmployeeProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route exact path="/" element={<Navbar />}>
              <Route exact path="" element={<EmployeeList />} />

              <Route path="/dashboard" element={<Dashboard />} />
              <Route exact path="/employlist" element={<EmployeeList />} />
              <Route
                exact
                path="/employlist/addemploy"
                element={<EmployForm isEdit={false} />}
              />
              <Route
                path="/employlist/edit/:id"
                element={<EmployForm isEdit={true} />}
              />
              <Route path="*" element={<ErrorPage />} />
            </Route>
          </Routes>
        </EmployeeProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
