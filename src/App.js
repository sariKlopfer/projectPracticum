import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeFormModal from './Employee/EmployeeFormModal';
import EmployeeListContainer from './Employee/EmployeeListContainer';
import Login from './Employee/Login';
import axios from 'axios';

const App = () => {
  const [showList, setShowList] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUserCity, setCurrentUserCity] = useState('');


  const handleStartClick = () => {
    setShowList(true);
  };

  const handleAddClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveEmployee = (employeeData) => {
    console.log('Add new employee', employeeData);
    setEmployees([...employees, employeeData]);
    setShowModal(false);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleLogin = () => {
    setLoggedIn(true);
    setShowList(true);
  };

  useEffect(() => {
    if (loggedIn) {
      getUserCity();
    }
  }, [loggedIn]);

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
            console.log("Your current location is: " + city);
            // setCurrentUserCity(city);
            return city;
          } else {
            console.log('No city name found in the results');
          }
        } else {
          console.log('No address found');
        }
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="App">
      {!loggedIn && <Login onLogin={handleLogin} />}
      
      {loggedIn && (
        <div className="top-container">
          <button onClick={handleAddClick} className="add-button">Add employee</button>
          
          <input
            className="search-input"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          
        </div>
      )}

      {showList && loggedIn && (
        <Router>
          <Routes>
            <Route path="/" element={<EmployeeListContainer employees={employees} searchTerm={searchTerm} />} />
          </Routes>
        </Router>
      )}

      {showModal && loggedIn && (
        <EmployeeFormModal
          onSave={handleSaveEmployee}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default App;
