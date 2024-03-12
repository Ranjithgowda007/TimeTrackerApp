import React, { useContext, useState, useEffect, useRef } from "react";
import { EmployeeContext } from "../Contexts/EmployeeContext";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const EmployForm = ({ isEdit }) => {
  const { addEmployee, editEmployee, employees, isUpdated, setIsUpdated, emailexits, setemailexists } = useContext(EmployeeContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const textInput = useRef(null);
  const [onfocused, setOnfocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    employee_Id: "",
    joining_date: "",
    employee_role: "",
    password: "",
  });
  const handlechange = (e) => {
    setEmployee({ ...employee, password: e.target.value });
    const value = e.target.value;
    value.length ? setOnfocused(true) : setOnfocused(false);
  };

  useEffect(() => {
    if (isEdit) {
      const employeeToEdit = employees.find((emp) => emp.employee_Id === id);
      if (employeeToEdit) {
        setEmployee(employeeToEdit);
      }
    }
  }, [employees, id, isEdit]);

  useEffect(() => {
    if(textInput.current){

      textInput.current.focus();
    }
  }, [isEdit, textInput]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(employee.email)) {
      return toast.error("Please enter a valid email address");
    }
  
    const idRegex = /^[a-zA-Z0-9]+$/;
    if (!idRegex.test(employee.employee_Id)) {
      return toast.error("Employee ID can only contain letters and numbers");
    }

    if (!employee.name || !employee.email || !employee.employee_Id || !employee.joining_date || !employee.employee_role || !employee.password) {
      return toast.error("All fields are required");
    }

    if (isEdit) { 

      const employeeIndex = employees.findIndex((emp) => emp.employee_Id === id);
      const filteredEmployees= employees.filter((emp, index)=> employees.indexOf(emp) !== employeeIndex )
      
      const idcheck= filteredEmployees.some(emp =>  emp.employee_Id === employee.employee_Id)
      const emailcheck = filteredEmployees.some(emp => emp.email === employee.email)

  if (emailcheck && employee.email !== "") {
      return toast.error("Email is already in use");
  } else
   if (idcheck && employee.employee_Id !== "") {
      return toast.error("Employee ID is already in use");
  }
  
      editEmployee(id, employee);
      navigate("/employlist");
      
  
      
    } else{

      const emailcheck= employees.some(emp=> emp.email === employee.email)
      const idcheck = employees.some(emp=> emp.employee_Id === employee.employee_Id)
      if(emailcheck){
        return toast.error("Email is already in use");
      } else if(idcheck ){
        return toast.error("employee_Id is already in use");
      }
      addEmployee(employee);
      setEmployee({
        name: "",
        email: "",
        employee_Id: "",
        joining_date: "",
        employee_role: "",
        password: "",
        });
        return toast.success(`${employee.name}'s data has been added`)
    }
    
  };
  
  return (
    <div className="d-flex justify-content-center align-items-center h-100 w-100 empform">
     <div className="p-3 rounded w-75 mt-5 border forms">
        <h3 className="text-center my-2 text-white">{isEdit ? "Edit" : "Add"} Employee</h3><hr  className="text-black"/>
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
                  className="form-control input rounded-pill"
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
                  className="form-control input rounded-pill"
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
                  className="form-control input rounded-pill"
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
                  className="form-control input rounded-pill"
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
                  className="form-control input rounded-pill"
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
                  className="form-control input rounded-pill"
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
                  style={{ cursor: "pointer", paddingRight:'12px', fontSize: '17px', paddingTop: '39px'}}
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
