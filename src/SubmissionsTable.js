// SubmissionsTable.js
import React, { useState }  from 'react';
import { Link } from 'react-router-dom';
import './SubmissionsTable.css';
const SubmissionsTable = ({ submissions,setSubmissions }) => {
  const [sortBy, setSortBy] = useState('purchasePrice');
  const [sortOrder, setSortOrder] = useState('asc');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [notification, setNotification] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const handleSort = (column) => {
    if (sortBy === column) {
      // If clicking on the same column, reverse the sort order
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // If clicking on a different column, set the new column and default to ascending order
      setSortBy(column);
      setSortOrder('asc');
    }
  };
  const handleDelete = (index) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this submission?');
    if (isConfirmed) {
      const updatedSubmissions = [...submissions];
      updatedSubmissions.splice(index, 1);
      setSubmissions(updatedSubmissions);
    }
  };
  
  
  const sortedSubmissions = [...submissions].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
  
    if (sortOrder === 'asc') {
      return aValue - bValue;
    } else {
      return bValue - aValue;
    }
  });
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError('');
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
    setPhoneError('');
  };

  const handleSubmit = async () => {
    // Validate email and phone number
    const emailRegex = /^\S+@\S+\.\S+$/;
    const phoneRegex = /^\d{10}$/;

    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    if (!phoneRegex.test(phoneNumber)) {
      setPhoneError('Please enter a valid phone number (10 digits).');
      return;
    }
    // Create a POST request to the server
    const requestBody = JSON.stringify({
        submissions,
        email,
        phoneNumber,
    });

  console.log('Request Body:', requestBody);
    // Create a POST request to the serverß
    try {
      const response = await fetch('https://tf6ajztbc1.execute-api.us-east-2.amazonaws.com/dev/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestBody,
      });

      // Check if the request was successful (you may need to adjust this based on your server's response)
      if (response.ok) {
        setNotification('Data has been submitted successfully.');
        // Clear submissions
        setSubmissions([]);
        // You can also reset email and phone number if needed
        setEmail('');
        setPhoneNumber('');
      } else {
        console.error(response);
        alert('Error submitting data. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Error submitting data. Please try again.');
    }
  };  
  return (
    <div className="centered-container">
        <div className="table-container">
            <h2>Submissions Table</h2>
            <table>
                <thead>
                <tr>
                    <th onClick={() => handleSort('purchasePrice')}>Purchase Price</th>
                    <th onClick={() => handleSort('downPayment')}>Down Payment</th>
                    <th onClick={() => handleSort('repaymentTime')}>Repayment Time</th>
                    <th onClick={() => handleSort('interestRate')}>Interest Rate</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                    {sortedSubmissions.map((submission, index) => (
                        <tr key={index}>
                        <td>${submission.purchasePrice}</td>
                        <td>${submission.downPayment}</td>
                        <td>{submission.repaymentTime} years</td>
                        <td>{submission.interestRate}%</td>
                        <td>
                            <button onClick={() => handleDelete(index)}>Delete</button>
                        </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/" className="go-back-link">Go Back to Mortgage Calculator</Link>

                <div className="form-container">
                    <div className="rounded-textbox">
                        <label>Email<span className="required">*</span>:</label>
                        <input type="text" value={email} onChange={handleEmailChange} />
                        <div className="validation-error">{emailError && <span >{emailError}</span>}</div>
                    </div>
                    <div className="rounded-textbox">
                        <label>Phone<span className="required">*</span>:</label>
                        <input type="text" value={phoneNumber} onChange={handlePhoneNumberChange} />
                        <div className="validation-error">{phoneError && <span>{phoneError}</span>}</div>
                    </div>
                    <div className="submit-container">
                    <button onClick={handleSubmit} className="button-green">Submit</button>
                    </div>
                    {notification && <div className="notification">{notification}</div>}
                </div>
        </div>
    </div>
  );
};

export default SubmissionsTable;
