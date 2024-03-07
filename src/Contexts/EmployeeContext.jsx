import React, { createContext, useState, useEffect } from 'react';
import { employeelist } from '../Components/Data/Employ';

export const EmployeeContext = createContext();

const EmployeeProvider = (props) => {
  const [employees, setEmployees] = useState([
  ]);
  console.log(employees)

  useEffect(()=>{
    setEmployees(employeelist)
  }, [])
  
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
    const updatedEmployees = [...employees, newEmployee];
    setEmployees(updatedEmployees);
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
  };

  const editEmployee = (id, employee) => {
    const employeeIndex = employees.findIndex((emp) => emp.employee_Id === id);
    if (employeeIndex !== -1) {
      const updatedEmployees = [...employees];
      updatedEmployees[employeeIndex] = { ...updatedEmployees[employeeIndex], ...employee };
      setEmployees(updatedEmployees);
      localStorage.setItem('employees', JSON.stringify(updatedEmployees));
    } else {
      console.error(`Employee with ID ${id} not found.`);
    }
  };
  
  
  
  return (
    <EmployeeContext.Provider value={{ employees, addEmployee, setEmployees, editEmployee }}>
      {props.children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeProvider;
