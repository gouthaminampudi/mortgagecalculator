import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SubmissionSearchResult.css';

const SubmissionSearchResult = () => {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmissions, setSelectedSubmissions] = useState(new Set());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notification, setNotification] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // Define the isSubmitting state

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const handleSearch = async () => {
    if (validateInputs()) {
    try {    
      setIsSubmitting(true); 
      const response = await fetch(`https://4wnvkdtjm4.execute-api.us-east-1.amazonaws.com/test/mortgageSubmissionsReader?email=${email}&phoneNumber=${phoneNumber}`);

      if (response.ok) {
        setNotification('Data has been submitted successfully.');
        setIsSubmitting(false); // Start submission

        const data = await response.json();
        setSubmissions(data.submissions);
        // You can also reset email and phone number if needed
        setEmail('');
        setPhoneNumber('');
      } else {
        console.error(response);
        setIsSubmitting(false); // Start submission
        alert('Error fetching results. Please try again.');
      }

     }catch (error) {
        console.error('Error submitting data:', error);
        alert('Error fetching results.. Please try again.');
      }
    }
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError('');
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
    setPhoneError('');
  };
  const validateInputs = () => {
    // Validate email and phone number
    const emailRegex = /^\S+@\S+\.\S+$/;
    const phoneRegex = /^\d{10}$/;

    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
      return false;
    }

    if (!phoneRegex.test(phoneNumber)) {
      setPhoneError('Please enter a valid phone number (10 digits).');
      return false;
    }
    return true;
  };

  const handleCheckboxChange = (submissionId) => {
    const updatedSelection = new Set(selectedSubmissions);
    if (updatedSelection.has(submissionId)) {
      updatedSelection.delete(submissionId);
    } else {
      updatedSelection.add(submissionId);
    }
    setSelectedSubmissions(updatedSelection);
  };

  const handleDelete = () => {
    // Add logic to delete selected submissions here
    // This may involve calling another API endpoint with the selectedSubmission IDs
  };

  return (

    <div className="submission-search-container">
            <div className="hamburger-icon" onClick={toggleMenu}>
            ☰
            </div>
            {isMenuOpen && (
            <div className="hamburger-menu">
                {/* Add your links here */}
                <Link to="/">Home</Link>
                {/* ... other links ... */}
            </div>
            )}
          {/* Search Section */}
        <div className="search-section">
                <h2>Search</h2>
                <div className="search-group">
                    <div className="input-group">
                        <label htmlFor="email">Email:</label>
                    </div>
                    <div className="input-group">
                        <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Enter Email"
                        />
                        <div className="validation-error">{emailError && <span >{emailError}</span>}</div>
                    </div>
                    <div className="input-group">
                        <label htmlFor="phone-number">Phone Number:</label>
                    </div>
                    <div className="input-group">
                        <input
                        id="phone-number"
                        type="tel"
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                        placeholder="Enter Phone Number"
                        />
                        <div className="validation-error">{phoneError && <span>{phoneError}</span>}</div>
                    </div>
                
                    <div className="input-group">
                        <button onClick={handleSearch}>Search</button>
                    </div>
                    {isSubmitting && <div className="progress-bar">Searching...</div>}
                </div>
        </div>

            <div className="results-section">
                    <h2>Search Results</h2>
                    {!submissions||submissions.length === 0 ? (
                        <p>No results found!</p>
                    ) : (
                    <table>
                        <thead>
                        <tr>
                            <th>Select</th>
                            <th>Purchase Price</th>
                            <th>Down Payment</th>
                            <th>Repayment Time</th>
                            <th>Interest Rate</th>
                            <th>Loan Amount</th>
                            <th>Monthly Payment</th>
                        </tr>
                        </thead>
                        <tbody>
                        {submissions.map((submission, index) => (
                            <tr key={index}>
                            <td>
                                <input
                                type="checkbox"
                                checked={selectedSubmissions.has(index)}
                                onChange={() => handleCheckboxChange(index)}
                                />
                            </td>
                            <td>${submission.purchasePrice}</td>
                            <td>${submission.downPayment}</td>
                            <td>${submission.repaymentTime}</td>
                            <td>${submission.interestRate}</td>
                            <td>${submission.loanAmount}</td>
                            <td>${submission.monthlyPayment}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    )}
                    {submissions.length > 0 && (
                    <button onClick={handleDelete}>Delete Selected</button>
                    )}
            </div>
    </div>
  );
};

export default SubmissionSearchResult;
