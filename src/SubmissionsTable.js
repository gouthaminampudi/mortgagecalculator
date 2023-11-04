// SubmissionsTable.js
import React from 'react';
import { Link } from 'react-router-dom';

const SubmissionsTable = ({ submissions }) => {
    console.log(submissions);
  return (
    
    <div>
      <h2>Submissions Table</h2>
      <table>
        <thead>
          <tr>
            <th>Purchase Price</th>
            <th>Down Payment</th>
            <th>Repayment Time</th>
            <th>Interest Rate</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission, index) => (
            <tr key={index}>
              <td>${submission.purchasePrice}</td>
              <td>${submission.downPayment}</td>
              <td>{submission.repaymentTime} years</td>
              <td>{submission.interestRate}%</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/" className="go-back-link">Go Back to Mortgage Calculator</Link>

    </div>
  );
};

export default SubmissionsTable;
