import React, { useContext, useState, useEffect, useRef } from "react";
import { EmployeeContext } from "../Contexts/EmployeeContext";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EmployForm = ({ isEdit }) => {
  const { addEmployee, editEmployee, employees } = useContext(EmployeeContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const textInput = useRef(null);
  const [onfocused, setOnfocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handlechange = (e) => {
    setEmployee({ ...employee, password: e.target.value });
          const value = e.target.value;
    value.length ? setOnfocused(true) : setOnfocused(false);
  };

  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    employee_Id: "",
    joining_date: "",
    employee_role: "",
    password: "",
  });

  useEffect(() => {
    if (isEdit) {
      const employeeToEdit = employees.find((emp) => emp.employee_Id === id);
      if (employeeToEdit) {
        setEmployee(employeeToEdit);
      }
    }
  }, [employees, id, isEdit]);

  useEffect(() => {
    textInput.current.focus();
  }, [isEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!employee.name) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required",
        showConfirmButton: true,
      });
    }

    if (isEdit) {
      
      editEmployee(id, employee);
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Employee details updated successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/employlist");
    } else {

      addEmployee(employee);
      Swal.fire({
        icon: "success",
        title: "Added!",
        text: `${employee.name}'s data has been Added`,
        showConfirmButton: false,
        timer: 1500,
      });
      setEmployee({
        name: "",
        email: "",
        employee_Id: "",
        joining_date: "",
        employee_role: "",
        password: "",
      });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3 ">
      <div className="p-3 rounded w-sm-75 w-sm-75 w-lg-75 mt-5 border forms">
        <h3 className="text-center my-2">{isEdit ? "Edit" : "Add"} Employee</h3><hr  className="text-black"/>
        <form className="row justify-content-center my-3" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-6 col-12">
              <div className="col-12 my-3">
                <label htmlFor="inputName" className="form-label">
                  Name
                </label>
                <input
                  ref={textInput}
                  type="text"
                  className="form-control rounded-pill"
                  id="inputName"
                  placeholder="EMPLOYEE NAME"
                  value={employee.name}
                  onChange={(e) =>
                    setEmployee({ ...employee, name: e.target.value })
                  }
                />
              </div>
              <div className=" my-3">
                <label htmlFor="inputEmail4" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control rounded-pill"
                  id="inputEmail4"
                  placeholder="COMPANY EMAIL ID"
                  autoComplete="off"
                  value={employee.email}
                  onChange={(e) =>
                    setEmployee({ ...employee, email: e.target.value })
                  }
                />
              </div>
              <div className="col-12 my-3">
                <label htmlFor="employeeid" className="form-label">
                  Employee Id
                </label>
                <input
                  type="text"
                  className="form-control rounded-pill"
                  id="employeeid"
                  placeholder="EMPLOY ID"
                  autoComplete="off"
                  value={employee.employee_Id}
                  onChange={(e) =>
                    setEmployee({ ...employee, employee_Id: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-6 col-12">
              <div className="col-12 my-3">
                <label htmlFor="joiningDate" className="form-label">
                  Joining Date
                </label>
                <input
                  type="date"
                  className="form-control rounded-pill"
                  id="joiningDate"
                  placeholder="JOINING DATE"
                  autoComplete="off"
                  value={employee.joining_date}
                  onChange={(e) =>
                    setEmployee({ ...employee, joining_date: e.target.value })
                  }
                />
              </div>

              <div className="col-12 my-3">
                <label htmlFor="employeeRole" className="form-label">
                  Employ role
                </label>
                <input
                  type="text"
                  className="form-control rounded-pill"
                  id="employeeRole"
                  placeholder="EMPLOYEE ROLE"
                  autoComplete="off"
                  value={employee.employee_role}
                  onChange={(e) =>
                    setEmployee({ ...employee, employee_role: e.target.value })
                  }
                />
              </div>
              <div className="col-12 my-3">
                <div>

                
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                
               <div className="d-flex">
               <input
                  type= {showPassword ? "text" : "password"}
                  className="form-control rounded-pill"
                  id="password"
                  placeholder="PASSWORD"
                  autoComplete="off"
                  value={employee.password}
                  onChange={handlechange}
                />
                 {onfocused && (
                  <i id="password"
                  className= {
                    showPassword ?
                     "bi bi-eye-slash-fill" : "bi bi-eye-fill"
                  }
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ cursor: "pointer", paddingRight:'12px', fontSize: '17px', paddingTop: '35px'}}
                ></i>
                 )}
               </div>
                    </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <button
                type="submit"
                className="btn btn-primary w-lg-25 w-md-50 w-sm-50 mt-4 btn1"
              >
                {isEdit ? "Update" : "Add +"}
              </button>
            </div>
            <div className="col-6 d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-primary w-lg-25 w-md-50 w-sm-50 mt-4 btn1"
                onClick={() => navigate("/employlist")}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployForm;
