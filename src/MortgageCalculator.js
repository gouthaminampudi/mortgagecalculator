// src/MortgageCalculator.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MortgageCalculator.css';

const MortgageCalculator = ({ submissions, setSubmissions })  => {
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [downPayment, setDownPayment] = useState(0);
  const [repaymentTime, setRepaymentTime] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
 const [currentSubmission, setCurrentSubmission] = useState({});
  
  // Calculate the monthly mortgage payment
  const calculateMonthlyPayment = () => {
    const principal = purchasePrice - downPayment;
    const monthlyInterestRate = (interestRate / 100) / 12;
    const numberOfPayments = repaymentTime * 12;
    const numerator = Math.pow(1 + monthlyInterestRate, numberOfPayments);
    const denominator = numerator - 1;
    const monthlyPayment = principal * (monthlyInterestRate * numerator) / denominator;
    return monthlyPayment.toFixed(2);
  };


  const handleSubmit = () => {
    // You can send the selected values to a mortgage service or perform any other action here.
    // For this example, we'll log the values to the console.
    console.log('Selected Values:', {
      purchasePrice,
      downPayment,
      repaymentTime,
      interestRate,
    });

    // Prepare the current submission data based on the input values
    const newSubmission = {
        purchasePrice,
        downPayment,
        repaymentTime,
        interestRate,
    };
  
    console.log("submissions 1->>"+submissions);
    // Update the submissions array with the new submission
    setSubmissions([...submissions, newSubmission]);
    console.log("submissions 2->>"+submissions);
  // Optionally, clear the form or set the currentSubmission to an empty object
  setCurrentSubmission({});
    
  };

  const handleReset = () => {
    // Reset all values to their initial states
    setPurchasePrice(0);
    setDownPayment(0);
    setRepaymentTime(0);
    setInterestRate(0);
  };

  return (
    <div className="centered-container">
    <div className="calculator-container">
      <img src ={ require('./calculator.png')} alt="Calculator" className="calculator-logo" />
      <h1>Mortgage  Calculator</h1>
      <div className="calculator-row">
        <div className="calculator">
          <h2>Loan Details</h2>
          <div className="slider-container">
            <label>Purchase Price: ${purchasePrice}</label>
            <input
              type="range"
              min="0"
              max="1000000"
              step="10000"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(e.target.value)}
            />
          </div>
          <div className="slider-container">
            <label>Down Payment: ${downPayment}</label>
            <input
              type="range"
              min="0"
              max={purchasePrice}
              step="10000"
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
            />
          </div>
        </div>
        <div className="calculator">
          <h2>Loan Terms</h2>
          <div className="slider-container">
            <label>Repayment Time (in years): {repaymentTime} years</label>
            <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={repaymentTime}
              onChange={(e) => setRepaymentTime(e.target.value)}
            />
          </div>
          <div className="slider-container">
            <label>Interest Rate: {interestRate}%</label>
            <input
              type="range"
              min="1"
              max="10"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="calculator-summary">
        <h2>Loan Summary</h2>
        <p>Loan Amount: ${purchasePrice - downPayment}</p>
        <p>Monthly Payment: ${calculateMonthlyPayment()}</p>
      </div>
      <div className="summary-and-submit-container">
      <div className="calculator-summary">
        <button onClick={handleSubmit} className="submit-button">Submit</button>
        <div className="reset-container">
            <button onClick={handleReset} className="reset-button">Reset</button>
        </div>
        <Link to="/submissions" className="submissions-link">View Submissions</Link>

        </div>
        </div>
    </div>
    </div>
  );
};

export default MortgageCalculator;
