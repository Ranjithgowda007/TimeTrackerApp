import React, { useContext, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { EmployeeContext } from "../Contexts/EmployeeContext";
import Swal from "sweetalert2";

const EmployeeList = () => {
  const navigate = useNavigate();
  const { employees, setEmployees } = useContext(EmployeeContext);

  console.log(employees);

  // if (!Array.isArray(employees)) {
  //   // If employees is not an array, return a message indicating the issue
  //   return <p>Error: Employees data is not available.</p>;
  // }

  const handleAddEmployee = () => {
    navigate("/employlist/addemploy");
  };

  const handleDeleteEmployee = (employeeId, index) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure!",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      ConfirmButtonText: "Yes, delete it!",
      cacelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.value) {
        const updatedEmployees = employees.filter(
          (emp) => emp.employee_Id !== employeeId
        );
        setEmployees(updatedEmployees);
        localStorage.setItem("employees", JSON.stringify(updatedEmployees));

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: `${employees[index].name}'s data has been Added`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleEditEmployee = (employeeId) => {
    navigate(`/employlist/edit/${employeeId}`);
  };

  return (
    <div className="container  login">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3 px-4 pt-3 py-3">
        <h1>EMPLOYEE LIST</h1>
        <button
          className="btn btn-info add fs-5 rounded-pill fw-semibold fst-italic"
          onClick={handleAddEmployee}
        >
          <span>Add Employee</span>
        </button>
      </div>
      <div className="row justify-content-center px-sm-4 px-md-4 px-lg-4 px-1">
        {employees.length === 0 ? (
          <div className="col-12 text-center fs-2 text-dark">
            No employees present
          </div>
        ) : (
          employees.map((employee, index) => (
            <div key={index} className="col-lg-4 col-md-6 col-sm-12 mb-3">
              <div
                className="card card-smaller mx-1"
                style={{ height: "100%" }}
                id={index}
              >
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title"> {employee.name}</h5>{" "}
                  <hr className="mx-0 my-1" />
                  <p className="card-text">
                    <strong>ROLE:</strong> {employee.employee_role}
                  </p>
                  <p className="card-text">
                    <strong>JOIN DATE:</strong> {employee.joining_date}
                  </p>
                  <p className="card-text">
                    <strong>EMPLOYEE ID:</strong> {employee.employee_Id}
                  </p>
                  <div className="mt-auto d-flex justify-content-lg-between justify-content-md-between justify-content-between align-items-center">
                    <button
                      className="d-flex justify-content-between align-items-center btn btn-outline-dark position-relative  btn-sm text-primary border-2 addedit"
                      onClick={() => handleEditEmployee(employee.employee_Id)}
                    >
                      <span className="d-md-inline d-lg-inline">EDIT</span>{" "}
                      <FaEdit className="ml-2" />
                    </button>
                    <button
                      className=" d-flex justify-content-between align-items-center btn btn-outline-dark position-relative btn-sm border-2 rounded-pill addedit text-primary"
                      onClick={() =>
                        handleDeleteEmployee(employee.employee_Id, index)
                      }
                    >
                      <span className=" d-md-inline d-lg-inline">DELETE</span>{" "}
                      <FaTrash className="ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EmployeeList;
