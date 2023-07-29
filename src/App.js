import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    // id: Math.random().toString(16).slice(2),
    name: '',
    email: '',
    mobile: '',
    password: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateData = () => {
    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^\d{10}$/;

    if (!formData.name.match(nameRegex)) {
      alert('Lỗi tên!');
      return false;
    }

    if (!formData.email.match(emailRegex)) {
      alert('Lỗi email');
      return false;
    }

    if (!formData.mobile.match(mobileRegex)) {
      alert('Lỗi số điện thoại');
      return false;
    }

    if (formData.password.trim() === '') {
      alert('Lỗi password');
      return false;
    }

    return true;
  };

  const handleCreateData = async () => {
      fetch('https://64c34397eb7fd5d6ebd0aa57.mockapi.io/api/lab1/regis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          alert('Tạo thành công rồi!!!!');
          setFormData({
            // id: Math.random().toString(16).slice(2),
            name: '',
            email: '',
            mobile: '',
            password: ''
          });
        })
        .catch((error) => {
          alert(`Lỗi rồi!!!!, lỗi là ${error?.message}`);
        });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateData()) {
      // Đưa dữ liệu được nhập vào hàm xử lý tại đây (ví dụ: gửi dữ liệu đăng ký lên máy chủ).
      handleCreateData();
    }
  };

  return (
    <div className="App">
    <form className="registration-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label className="label-left">Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </div>
      <div className="form-field">
        <label className="label-left">Email ID:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </div>
      <div className="form-field">
        <label className="label-left">Mobile No:</label>
        <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} />
      </div>
      <div className="form-field">
        <label className="label-left">Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
      </div>
      <button type="submit" className="register-button">Register</button>
    </form>
  </div>
  );
}

export default App;
