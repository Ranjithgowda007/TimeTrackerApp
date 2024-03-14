import React, { useState, useRef, useEffect, useContext } from "react";
import { ProjectContext } from "../Contexts/ProjectContext";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ProjectForm = ({ isedit }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("Project Status");
  const { projectlist, addProject, editProject } = useContext(ProjectContext);
  const navigate = useNavigate()
  const { id } = useParams();

  useEffect(() => {
    if (isedit) {
      
      const project = projectlist.find((_, index) => index.toString() === id);
      if (project) {
        projectNameRef.current.value = project.projectName;
        setSelectedStatus(project.projectStatus);
        startDateRef.current.value = project.startDate;
        clientRef.current.value = project.client;
        projectLeadRef.current.value = project.projectLead;
        endDateRef.current.value = project.endDate;
      }
    }
  }, [isedit, id, projectlist]);

  const dropdownRef = useRef(null);
  const projectNameRef = useRef(null);
  const startDateRef = useRef(null);
  const clientRef = useRef(null);
  const projectLeadRef = useRef(null);
  const endDateRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleOptionClick = (status) => {
    setSelectedStatus(status);
    setDropdownOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      projectName: projectNameRef.current.value,
      projectStatus: selectedStatus,
      startDate: startDateRef.current.value,
      client: clientRef.current.value,
      projectLead: projectLeadRef.current.value,
      endDate: endDateRef.current.value
    };

    if (isedit) {
    
      editProject(id, formData);
      navigate('/projects')
      toast.success("project data updated successfully");

      
    } else {
    
      if (!formData.projectName || !formData.client || !formData.startDate || !formData.endDate || !formData.projectStatus || !formData.projectLead) {
        return toast.error("All fields are required");
      }else{
        addProject(formData);
        toast.success("project data aded successfully");
      }
    }


    setSelectedStatus("Project Status");
    e.target.reset(); 
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="project-form vh-100 w-100 text-white">
      <div className="d-flex justify-content-center align-items-center h-100 w-100">
        <div className="p-2 rounded w-75 border">
          <h3 className="text-center my-2 text-white">{isedit ? "Edit Project" : "Add Project"}</h3>
          <hr className="text-black" />
          <form className="row justify-content-center my-3" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-6 col-12">
                <div className="col-12 my-3">
                  <label htmlFor="projectName" className="form-label">
                    PROJECT NAME
                  </label>
                  <input
                    type="text"
                    className="form-control border input rounded-pill"
                    id="projectName"
                    placeholder="project name"
                    style={{ outline: "none", boxShadow: "none" }}
                    ref={projectNameRef}
                    autoComplete="off"
                  />
                </div>
                <div className="my-3" ref={dropdownRef}>
                  <label htmlFor="projectStatus" className="form-label">
                    PROJECT STATUS
                  </label>
                  <div className="dropdown">
                    <button
                      className="form-control border input rounded-pill dropdown-toggle d-flex justify-content-between align-items-center"
                      type="button"
                      id="projectStatus"
                      onClick={toggleDropdown}
                      aria-expanded={dropdownOpen ? "true" : "false"}
                    >
                      <span className={selectedStatus === "Project Status" ? "text-muted" : ""}>
                        {selectedStatus === "Project Status" ? "Project Status" : selectedStatus}
                      </span>
                      <i className="bi bi-chevron-down"></i>
                    </button>
                    <div
                      className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}
                      aria-labelledby="projectStatus"
                    >
                      <button
                        className="dropdown-item"
                        type="button"
                        onClick={() => handleOptionClick("Active")}
                      >
                        Active
                      </button>{" "}
                      <hr id="hr" />
                      <button
                        className="dropdown-item"
                        type="button"
                        onClick={() => handleOptionClick("Hold")}
                      >
                        Hold
                      </button>{" "}
                      <hr id="hr" />
                      <button
                        className="dropdown-item"
                        type="button"
                        onClick={() => handleOptionClick("Completed")}
                      >
                        Completed
                      </button>{" "}
                      <hr id="hr" />
                    </div>
                  </div>
                </div>
                <div className="col-12 my-3">
                  <label htmlFor="startDate" className="form-label">
                    START DATE
                  </label>
                  <input
                    type="date"
                    className="form-control border input rounded-pill"
                    id="startDate"
                    placeholder="start date"
                    style={{ outline: "none", boxShadow: "none" }}
                    autoComplete="off"
                    ref={startDateRef}
                  />
                </div>
              </div>

              <div className="col-sm-12 col-md-12 col-lg-6 col-12">
                <div className="col-12 my-3">
                  <label htmlFor="client" className="form-label">
                    CLIENT
                  </label>
                  <input
                    type="text"
                    className="form-control border input rounded-pill"
                    id="client"
                    placeholder="client"
                    style={{ outline: "none", boxShadow: "none" }}
                    ref={clientRef}
                    autoComplete="off"
                  />
                </div>

                <div className="col-12 my-3">
                  <label htmlFor="projectLead" className="form-label">
                    PROJECT LEAD
                  </label>
                  <input
                    type="text"
                    className="form-control border input rounded-pill"
                    id="projectLead"
                    placeholder="project lead"
                    style={{ outline: "none", boxShadow: "none" }}
                    autoComplete="off"
                    ref={projectLeadRef}
                  />
                </div>

                <div className="col-12 my-3">
                  <label htmlFor="endDate" className="form-label">
                    END DATE
                  </label>
                  <input
                    type="date"
                    className="form-control border rounded-pill"
                    id="endDate"
                    placeholder="end date"
                    style={{ outline: "none", boxShadow: "none" }}
                    autoComplete="off"
                    ref={endDateRef}
                  />
                </div>
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-6 w-auto">
                <button
                  type="submit"
                  className="btn btn-primary fs-5 px-4 w-lg-25 w-md-50 w-sm-50 mt-4 btn2"
                >
                  {isedit ? "Update" : "Add"}
                </button>
              </div>
              <div className="col-6 d-flex justify-content-end">
                <button onClick={()=>navigate('/projects')}
                  type="button"
                  className="btn btn-primary w-lg-25 fs-5 w-md-50 w-sm-50 mt-4 btn2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProjectForm;
