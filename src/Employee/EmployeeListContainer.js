import React, { useState, useEffect } from 'react';
import EmployeeList from './EmployeeList';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmployeeListContainer = ({ employees, searchTerm }) => {
  const [employeesState, setEmployees] = useState(employees);
  const navigate = useNavigate();
  const [currentUserCity, setCurrentUserCity] = useState(''); // Define currentUserCity state

  const handleEdit = (employee) => {
    console.log("ll");
    console.log(employee);
    setEmployees(employee);
    navigate(`/addEmployee`, { state: { employee: employee } });
  };

  useEffect(() => {
    console.log("Fetching employees...");
    axios
      .get("https://localhost:7162/api/Employees/")
      .then((response) => {
        console.log("Employees fetched successfully:", response.data);
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch employees:", error);
      });
  }, []);

  const handleDeleteClick = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`https://localhost:7162/api/Employee/${id}/`)
          .then((response) => {
            console.log("Employee deleted successfully:", response.data);
            setEmployees(employeesState.filter((employee) => employee.id !== id));
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            );
          })
          .catch((error) => {
            console.error("Error deleting employee:", error);
            Swal.fire(
              'Error!',
              'An error occurred while deleting the employee.',
              'error'
            );
          });
      }
    });
  };

  const filteredEmployees = employeesState.filter((employee) => {
    return (
      employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.idNumber.includes(searchTerm)
    );
  });

  const getUserCity = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`);
        const data = await response.json();

        if (response.ok && data.address) {
          let city = data.address.city || data.address.town || data.address.village || data.address.hamlet || data.address.county;
          if (city) {
            city = city.toString();
            console.log("המיקום הנוכחי שלך הוא: " + city);
            setCurrentUserCity(city);
            handleFilterByCity(city);
          } else {
            console.log('לא נמצא שם עיר בתוצאות');
          }
        } else {
          console.log('לא נמצאה כתובת');
        }
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  const handleFilterByCity = (city) => {
    const filteredEmployees = employeesState.filter((employee) => {
      return currentUserCity === employee.address;
    });
    setEmployees(filteredEmployees);
  };

  useEffect(() => {
    if (searchTerm === '' && currentUserCity !== '') {
      handleFilterByCity(currentUserCity);
    }
  }, [searchTerm, currentUserCity]);

  return (
    <div className="EmployeeListContainer">
     <EmployeeList
      employees={filteredEmployees}
      onEdit={handleEdit}
      onDelete={handleDeleteClick}
    />
    </div>
  );
};

export default EmployeeListContainer;

