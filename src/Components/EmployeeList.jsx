import React, { useContext, useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { EmployeeContext } from "../Contexts/EmployeeContext";
import { AuthContext } from "../Contexts/LoginContext";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { PROFILE_URL } from "./Data/Constants";

const EmployeeList = () => {
  const navigate = useNavigate();
  const { employees, setEmployees, isUpdated, setIsUpdated } = useContext(EmployeeContext);
  const { login } = useContext(AuthContext);
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddEmployee = () => {
    navigate("/employlist/addemploy");
  };

  const handleDeleteEmployee = (employeeId, index) => {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        const deletedEmployee = employees.find(emp => emp.employee_Id === employeeId);
        const updatedEmployees = employees.filter(emp => emp.employee_Id !== employeeId);
        setEmployees(updatedEmployees);
        localStorage.setItem("employees", JSON.stringify(updatedEmployees));
        setIsUpdated(true);
        toast.success("Employee moved to Trash successfully");

        // Store the original index of the deleted employee in localStorage
        const trashList = JSON.parse(localStorage.getItem('trash')) || [];
        trashList.push({ ...deletedEmployee, originalIndex: index });
        localStorage.setItem('trash', JSON.stringify(trashList));

        // Navigate to the trash page
        navigate("/employlist/trash");
      }
    });
  };

  const handleEditEmployee = (employeeId) => {
    navigate(`/employlist/edit/${employeeId}`);
  };

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-fluid login emplist h-100">
      <div className="row align-items-center mb-4 px-5">
        <h1 className="text-center mt-3">EMPLOYEE LIST</h1>

        <div className="col-sm-12 col-md-6 col-lg-6 col-12 d-flex justify-content-center justify-content-lg-start my-3">
          <input
            type="text"
            className="form-control border me-2 w-auto py-2 pe-4" id="submit"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoComplete="off"
            style={{boxShadow : "inherit"}}
          />
          
        </div>
        <div className="col-sm-12 col-md-6 col-lg-6 col-12 d-flex justify-content-center justify-content-lg-end">
          <button
            className="btn btn-info add fs-5 rounded-pill fw-semibold fst-italic"
            onClick={handleAddEmployee}
          >
            <span>Add Employee</span>
          </button>
        </div>
      </div>

      <div className="row justify-content-center px-sm-4 px-md-4 px-lg-4 px-1">
        {filteredEmployees.length === 0 ? (
          <div className="col-12 text-center fs-2 text-dark">
            No employees present
          </div>
        ) : (
          <>
            {filteredEmployees.map((employee, index) => (
              <div key={index} className="col-lg-4 col-md-6 col-sm-12 my-3">
                <div
                  className="card card-smaller mx-1"
                  style={{ height: "100%" }}
                  id={index}
                >
                  <div className="card-body d-flex flex-column text-white text-center">
                    <img src={PROFILE_URL} alt="" className="d-block m-auto rounded-circle"/>
                    <hr className="mx-0 my-2 mt-4" />
                    <h5 className="card-title fs-3">{employee.name}</h5>
                    <p className="card-text mb-2">
                      {employee.employee_role}
                    </p>
                    <p className="card-text mb-2">
                      employee Id:  {employee.employee_Id}
                    </p>
                    <p className="card-text mb-3">
                     Joined on {employee.joining_date}
                    </p>
                    <div className="mt-auto d-flex justify-content-lg-between justify-content-md-between justify-content-between align-items-center">
                      <button
                        className="d-flex justify-content-between align-items-center btn btn-outline-dark position-relative btn-sm text-primary border-2 addedit"
                        onClick={() => handleEditEmployee(employee.employee_Id)}
                      >
                        <span className="d-md-inline d-lg-inline">EDIT</span>{" "}
                        <FaEdit className="ml-2" />
                      </button>
                      <button
                        className="d-flex justify-content-between align-items-center btn btn-outline-dark position-relative btn-sm border-2 rounded-pill addedit text-primary"
                        onClick={() => handleDeleteEmployee(employee.employee_Id)}
                      >
                        <span className="d-md-inline d-lg-inline">DELETE</span>{" "}
                        <FaTrash className="ml-2" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          </>
        )}
      </div>
    </div>
  );
};

export default EmployeeList;