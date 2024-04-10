import React, { useState } from 'react';
import axios from 'axios';

import EmployeeFormModal from './EmployeeFormModal';

const ActionType = {
  SET_EMPLOYEE: 'SET_EMPLOYEE',
};

const EmployeeFormPage = () => {
  const [employee, setEmployee] = useState('');

  const handleSaveEmployee = async (employeeData) => {
    console.log('Employee data:', employeeData);

    const roles = ['Developer', 'Manager'];
    const positions = ['Junior', 'Senior', 'Lead'];

    const roleObjects = roles.map(role => ({
      name: positions.findIndex(position => position === employeeData.formRoleName[roles.indexOf(role)]),
      isManagerial: !!employeeData.formIsManagerial[roles.indexOf(role)],
      dateOfStart: employeeData.formDateOfStart[roles.indexOf(role)]
    }));

    const requestData = {
      idNumber: employeeData.idNumber,
      firstName: employeeData.firstName,
      lastName: employeeData.lastName,
      status: employeeData.status === 'Active' ? 1 : 0,
      gender: employeeData.gender === "Male" ? 1 : 0,
      address: employeeData.address,
      dateOfBirth: employeeData.dateOfBirth,
      roles: roleObjects
    };

    try {
      if (employee) {
        await axios.put(`https://localhost:7243/api/Employees/${employee.id}`, requestData);
        console.log("Edited successfully");
        navigate('/myEmployees');
      } else {
        await axios.post("https://localhost:7243/api/Employees", requestData);
        console.log("Added successfully");
        navigate('/myEmployees');
      }
      dispatch({ type: ActionType.SET_EMPLOYEE, employee: "" });
    } catch (error) {
      console.error("Failed to add/edit employee:", error);
    }
  };

  return (
    <div>
      <h1>Add New Employee</h1>
      <EmployeeFormModal onSave={handleSaveEmployee} />
    </div>
  );
};

export default EmployeeFormPage;
