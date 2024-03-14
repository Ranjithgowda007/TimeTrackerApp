import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ProjectContext } from "../Contexts/ProjectContext";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Projects = () => {
  const navigate= useNavigate()
  const { projectlist, deleteProject } = useContext(ProjectContext);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleAdd = () => {
    navigate("/projects/addproject");
  };

  const handleEdit = (index) => {
    navigate(`/projects/editproject/${index}`);
  };

  const handleDelete = (index) => {
    deleteProject(index.toString());
  };

  const filteredProjects = projectlist.filter((project) =>
    project.projectName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-dark vh-100 w-100 project">
      <div className="container">
        <div className="row">
          <div className="col-md-offset-1 col-md-10 m-auto pt-5 mt-4">
            <div className="panel">
              <div className="panel-heading">
                <div className="row justify-content-between align-items-center">
                  <div>
                    <h4 className="title text-center">
                      Project <span>List</span>
                    </h4>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div className="btn_group text-start">
                      <input
                        type="text"
                        className="form-control w-75"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={handleSearchChange}
                      />
                    </div>
                    <div className=" btn_group">
                      <button
                        className="btn btn-default"
                        title="Reload"
                        onClick={handleAdd}
                      >
                        Add project
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="panel-body table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Project Name</th>
                      <th>Client</th>
                      <th>Start Date</th>
                      <th>Project Lead</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProjects.map((project, index) => (
                      <tr key={index} className="">
                        <td>{index + 1}</td>
                        <td>{project.projectName}</td>
                        <td>{project.client}</td>
                        <td>{project.startDate}</td>
                        <td>{project.projectLead}</td>
                        <td>{project.projectStatus}</td>
                        <td>
                          <ul className="action-list" id="ul">
                            <li
                              className="li"
                              id="list"
                              onClick={() => handleEdit(index)}
                            >
                              <Link to="#" data-tip="edit" className="me-1">
                                <i className="fa fa-edit text-white"></i>
                              </Link>
                            </li>
                            <li
                              className="li"
                              id="list"
                              onClick={() => handleDelete(index)}
                            >
                              <Link to="#" data-tip="delete" className="ms-2">
                                <i className="fa fa-trash text-white"></i>
                              </Link>
                            </li>
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
