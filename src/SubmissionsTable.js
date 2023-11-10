// SubmissionsTable.js
import React, { useState }  from 'react';
import { Link } from 'react-router-dom';
import './SubmissionsTable.css';
const SubmissionsTable = ({ submissions,setSubmissions }) => {
  const [sortBy, setSortBy] = useState('purchasePrice');
  const [sortOrder, setSortOrder] = useState('asc');
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
        </div>
    </div>
  );
};

export default SubmissionsTable;
