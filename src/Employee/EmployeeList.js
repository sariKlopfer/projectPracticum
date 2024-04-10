import React, { useState } from 'react';
import ExcelJS from 'exceljs';

function EmployeeList({ employees, onEdit, onDelete }) {

  const exportToExcel = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Employees');

    // Add headers
    worksheet.addRow(['שם פרטי', 'שם משפחה', 'מספר זהות', 'תאריך תחילת עבודה']);

    // Add data
    employees.forEach((employee) => {
      worksheet.addRow([employee.firstName, employee.lastName, employee.idNumber, employee.startDate]);
    });

    // Generate Excel file
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const fileName = 'employees.xlsx';
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  };

  return (
    <div>
 <div className="export-container">   
    <button className="export-button" onClick={exportToExcel}>Export to Excel</button>
</div>
      {/* Table code remains the same */}
      <table className="EmployeeList">
        <thead>
          <tr>
            <th>First name</th>
            <th>Last Name</th>
            <th>ID number</th>
            <th>Start date</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.tz}</td>
              <td>{employee.startDate}</td>
              <td>
                <button onClick={() => onEdit(employee.id)}>editing</button>
              </td>
              <td>
                <button onClick={() => onDelete(employee.id)}>deletion</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
  );
}

export default EmployeeList;
