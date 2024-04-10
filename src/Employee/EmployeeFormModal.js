import React, { useState } from 'react';
import Modal from 'react-modal';


function EmployeeFormModal({ employees, onSave, onClose }) {
  const [employeeData, setEmployeeData] = useState({
    firstName: '',
    lastName: '',
    idNumber: '',
    startDate: '',
    birthDate: '',
    gender: '',
    roles: [],
  });
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEdit = (index) => {
    const employee = employees[index];
    setEmployeeData(employee);
    setEditingIndex(index);
    setShowAdditionalFields(true);
  };

  const handleRoleChange = (index, field, value) => {
    const updatedRoles = [...employeeData.roles];
    updatedRoles[index][field] = value;
    setEmployeeData(prevData => ({
      ...prevData,
      roles: updatedRoles,
    }));
  };

  const handleAddRole = () => {
    setEmployeeData(prevData => ({
      ...prevData,
      roles: [...prevData.roles, { name: '', management: false, startDate: '' }],
    }));
  };

  const handleRemoveRole = (index) => {
    const updatedRoles = [...employeeData.roles];
    updatedRoles.splice(index, 1);
    setEmployeeData(prevData => ({
      ...prevData,
      roles: updatedRoles,
    }));
  };

  const handleSave = () => {
    if (Object.values(employeeData).every(field => field !== '')) {
      if (editingIndex !== null) {
        const updatedEmployees = [...employees];
        updatedEmployees[editingIndex] = employeeData;
        onSave(updatedEmployees);
      } else {
        onSave([...employees, employeeData]);
      }
      onClose();
    } else {
      alert('יש למלא את כל השדות');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Employee Details</h2>
        <label>
          First Name*:
          <input
            type="text"
            name="firstName"
            value={employeeData.firstName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Last Name*:
          <input
            type="text"
            name="lastName"
            value={employeeData.lastName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          ID Number*:
          <input
            type="text"
            name="idNumber"
            value={employeeData.idNumber}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Start Date*:
          <input
            type="date"
            name="startDate"
            value={employeeData.startDate}
            onChange={handleChange}
            required
          />
        </label>
        {!showAdditionalFields && (
          <button onClick={() => setShowAdditionalFields(true)}>Show Additional Fields</button>
        )}
        {showAdditionalFields && (
          <>
            <label>
              Birth Date*:
              <input
                type="date"
                name="birthDate"
                value={employeeData.birthDate}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Gender*:
              <select
                name="gender"
                value={employeeData.gender}
                onChange={handleChange}
                required
              >
                <option value="">בחר מין</option>
                <option value="male">זכר</option>
                <option value="female">נקבה</option>
              </select>
            </label>
            {/* Additional fields... */}
          </>
        )}
        <button onClick={handleSave}>{editingIndex !== null ? 'Save Changes' : 'Save'}</button>
      </div>
      <table>
        {/* <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>ID Number</th>
            <th>Start Date</th>
            <th>Actions</th>
          </tr>
        </thead> */}
        <tbody>
          {employees && employees.map((employee, index) => (
            <tr key={index}>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.idNumber}</td>
              <td>{employee.startDate}</td>
              <td>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeFormModal;
