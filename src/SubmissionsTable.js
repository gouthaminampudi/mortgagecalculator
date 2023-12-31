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
  const [isSubmitting, setIsSubmitting] = useState(false); // Define the isSubmitting state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };  

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
    setIsSubmitting(true); // Start submission
    // Create a POST request to the server
    const requestBody = JSON.stringify({
        submissions,
        email,
        phoneNumber,
    });

    //console.log('Request Body:', requestBody);
    // Create a POST request to the serverß
    try {
      const response = await fetch('https://4wnvkdtjm4.execute-api.us-east-1.amazonaws.com/test/mortgagesubmission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestBody,
      });

      // Check if the request was successful (you may need to adjust this based on your server's response)
      if (response.ok) {
        setNotification('Data has been submitted successfully.');
        setIsSubmitting(false); // Start submission
        // Clear submissions
        setSubmissions([]);
        // You can also reset email and phone number if needed
        setEmail('');
        setPhoneNumber('');
      } else {
        console.error(response);
        setIsSubmitting(false); // Start submission
        alert('Error submitting data. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Error submitting data. Please try again.');
    }
  };  
  return (
    <div className="centered-container">
    {/* Hamburger Icon */}
    <div className="hamburger-icon" onClick={toggleMenu}>
      ☰
    </div>

    {/* Hamburger Menu */}
    {isMenuOpen && (
      <div className="hamburger-menu">
        <Link to="/" onClick={toggleMenu}>Home</Link>
        {/* Add more links as needed */}
      </div>
    )}      
        <div className="table-container">
            <h2>Submissions Table</h2>
            <table>
                <thead>
                <tr>
                    <th onClick={() => handleSort('purchasePrice')}>Purchase Price</th>
                    <th onClick={() => handleSort('downPayment')}>Down Payment</th>
                    <th onClick={() => handleSort('repaymentTime')}>Repayment Time</th>
                    <th onClick={() => handleSort('interestRate')}>Interest Rate</th>
                    <th onClick={() => handleSort('loanAmount')}>Loan Amount</th>
                    <th onClick={() => handleSort('monthlyPayment')}>Monthly Payment</th>
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
                        <td>{submission.loanAmount}</td>
                        <td>{submission.monthlyPayment}</td>
                        <td>
                            <button onClick={() => handleDelete(index)}>Delete</button>
                        </td>
                        </tr>
                    ))}
                </tbody>
            </table>
                <div className="form-container">
                {isSubmitting && <div className="progress-bar">Submitting...</div>}
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
