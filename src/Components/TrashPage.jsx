import React, { useContext, useEffect, useState } from "react";
import { FaUndo, FaTrash } from "react-icons/fa";
import { EmployeeContext } from "../Contexts/EmployeeContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const TrashPage = () => {
  const { employees, setEmployees, setIsUpdated } = useContext(EmployeeContext);
  const [trashList, setTrashList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedTrashList = JSON.parse(localStorage.getItem('trash')) || [];
    setTrashList(storedTrashList);
  }, []);

  const handleRestoreEmployee = (employeeId) => {
    const restoredEmployee = trashList.find(emp => emp.employee_Id === employeeId);
    const updatedTrashList = trashList.filter(emp => emp.employee_Id !== employeeId);
  
    // Find the original index of the employee
    const originalIndex = restoredEmployee.originalIndex;
    console.log(originalIndex)
  
    // Insert the restored employee at its original index
    const updatedEmployees = [...employees];
    updatedEmployees.splice(originalIndex, 0, restoredEmployee);
  
    setEmployees(updatedEmployees);
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
    localStorage.setItem('trash', JSON.stringify(updatedTrashList));
    setIsUpdated(true);
  
    // Navigate back to the employlist page
    navigate("/employlist");
  
    // Display success message
    toast.success("Employee restored successfully");
  };
  
  
  const handleDeletePermanently = (employeeId) => {
    const updatedTrashList = trashList.filter(emp => emp.employee_Id !== employeeId);

    setTrashList(updatedTrashList);
    localStorage.setItem('trash', JSON.stringify(updatedTrashList));
    setIsUpdated(true);
  };

  return (
    <div className="container-fluid login emplist h-100">
      <h1 className="text-center">TRASH</h1>
      <div className="row justify-content-center px-sm-4 px-md-4 px-lg-4 px-1">
        {trashList.length === 0 ? (
          <div className="col-12 text-center fs-2 text-dark">
            No employees in trash
          </div>
        ) : (
          <>
            {trashList.map((employee, index) => (
              <div key={index} className="col-lg-4 col-md-6 col-sm-12 my-3">
                <div
                  className="card card-smaller mx-1"
                  style={{ height: "100%" }}
                  id={index}
                >
                  <div className="card-body d-flex flex-column text-white text-center">
                    <img src={employee.profileUrl} alt="" className="d-block m-auto rounded-circle"/>
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
                    <div className="mt-auto d-flex justify-content-center align-items-center">
                      <button
                        className="btn btn-outline-dark position-relative btn-sm border-2 rounded-pill addedit text-primary"
                        onClick={() => handleRestoreEmployee(employee.employee_Id)}
                      >
                        <span className="d-md-inline d-lg-inline">RESTORE</span>{" "}
                        <FaUndo className="ml-2" />
                      </button>
                      <button
                        className="btn btn-outline-danger position-relative btn-sm border-2 rounded-pill addedit text-primary"
                        onClick={() => handleDeletePermanently(employee.employee_Id)}
                      >
                        <span className="d-md-inline d-lg-inline">DELETE PERMANENTLY</span>{" "}
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

export default TrashPage;
