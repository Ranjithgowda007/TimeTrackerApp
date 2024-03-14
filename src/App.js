import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeeList from "./Components/EmployeeList";
import EmployeeProvider from "./Contexts/EmployeeContext";
import { AuthProvider } from "./Contexts/LoginContext";
import ProjectProvider from "./Contexts/ProjectContext";
import "./Components/Css/style.css";
import "./Components/Css/style1.css"
import "./Components/Css/style3.css";
import Dashboard from "./Components/Dashboard";
import Projects from "./Components/ProjectList";
import EmployForm from "./Components/EmployForm";
import ErrorPage from "./Components/ErrorPage";
import ProjectForm from "./Components/ProjectForm";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TrashPage from "./Components/TrashPage";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <EmployeeProvider>
          <ProjectProvider>
        <ToastContainer />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route exact path="/" element={<Navbar />}>
              <Route exact path="" element={<EmployeeList />} />

              <Route path="/dashboard" element={<Dashboard />} />
              <Route exact path="/projects" element={<Projects />} >
              
              </Route>
              <Route
                exact
                path="/projects/addproject"
                element={<ProjectForm isedit={false}/>}
              />
              <Route
                exact
                path="/projects/editproject/:id"
                element={<ProjectForm isedit={true}/>}
              />
              <Route path="/employlist/trash" element={<TrashPage />} />
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
          </ProjectProvider>
        </EmployeeProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
