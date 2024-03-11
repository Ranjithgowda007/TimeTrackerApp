import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { createContext, useState, useEffect } from 'react';
import { employeelist } from '../Components/Data/Employ';
export const EmployeeContext = createContext();

const EmployeeProvider = (props) => {
  const [employees, setEmployees] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const [emailexits, setemailexits] = useState(false)

  
  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem('employees'));
    if (Array.isArray(storedEmployees)) {
      setEmployees(storedEmployees);
    } else if (employees.length === 0) { 
      setEmployees(employeelist);
    } else {
      console.error('Data retrieved from local storage is not in the expected format.');
      setEmployees([]);
    }
  }, []);

  const addEmployee = (newEmployee) => {
    const emailExists = employees.some(emp => emp.email === newEmployee.email);
    const idExists = employees.some(emp => emp.employee_Id === newEmployee.employee_Id);
  
    if (emailExists || idExists) {
     setemailexits(true)
    } else{
      setemailexits(false)
    }

    const updatedEmployees = [...employees, newEmployee];
    setEmployees(updatedEmployees);
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
  
  };

  const editEmployee = (id, employee) => {
    const employeeIndex = employees.findIndex((emp) => emp.employee_Id === id);
    if (employeeIndex !== -1) {
      const updatedEmployees = [...employees];

      if(employee !== updatedEmployees[employeeIndex]){
        setIsUpdated(true);
        toast.success(`${employee.name} details updated successfully`);
      }

      updatedEmployees[employeeIndex] = { ...updatedEmployees[employeeIndex], ...employee };
      
      setEmployees(updatedEmployees);
      localStorage.setItem('employees', JSON.stringify(updatedEmployees));
    } else {
      console.error(`Employee with ID ${id} not found.`);
    }
  };

  return (
    <EmployeeContext.Provider value={{ employees, addEmployee, setEmployees, editEmployee, isUpdated, setIsUpdated, emailexits, setemailexits }}>
      {props.children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeProvider;
