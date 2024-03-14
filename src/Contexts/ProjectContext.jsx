// ProjectProvider.js
import React, { createContext, useEffect, useState } from 'react';

// Create the context
export const ProjectContext = createContext();

// Create the provider
const ProjectProvider = (props) => {
  // Define state or any other necessary variables
  const [projectlist, setProjectlist] = useState([]);

  // Retrieve data from local storage when the component mounts
  useEffect(() => {
    const storedProjectList = JSON.parse(localStorage.getItem('projectlist'));
    if (storedProjectList) {
      setProjectlist(storedProjectList);
    }
  }, []);

  // Define function to add project
  // Define function to add project
const addProject = (formData) => {
  // Update project list state with new form data
  setProjectlist((prevProjectList) => {
    const updatedProjectList = [...prevProjectList, formData];
    updateLocalStorage(updatedProjectList);
    return updatedProjectList;
  });
};

// Define function to edit project
const editProject = (id, updatedProject) => {
  setProjectlist((prevProjectList) => {
    const updatedProjectList = prevProjectList.map((project, index) =>
      index.toString() === id ? updatedProject : project
    );
    updateLocalStorage(updatedProjectList);
    return updatedProjectList;
  });
};

// Define function to delete project
const deleteProject = (id) => {
  setProjectlist((prevProjectList) => {
    const updatedProjectList = prevProjectList.filter((_, index) => index.toString() !== id);
    updateLocalStorage(updatedProjectList);
    return updatedProjectList;
  });
};

// Update local storage with the current project list
const updateLocalStorage = (updatedProjectList) => {
  localStorage.setItem('projectlist', JSON.stringify(updatedProjectList));
};


  // Pass the state and functions down through the context provider value prop
  return (
    <ProjectContext.Provider value={{ projectlist, setProjectlist, addProject, editProject, deleteProject }}>
      {props.children}
    </ProjectContext.Provider>
  );
};

export default ProjectProvider;
