
import './App.css';
import React, { useState } from 'react';
import AppRoutes from './Routes';
import { BrowserRouter as Router } from 'react-router-dom';


function App() {
  const initialSubmissions = [
    {
      purchasePrice: 250000,
      downPayment: 50000,
      repaymentTime: 15,
      interestRate: 3.5,
    }
    // Add more default submissions if needed
  ];

  const [submissions, setSubmissions] = useState(initialSubmissions); 
  return (
    <Router>
    <AppRoutes submissions={submissions} setSubmissions={setSubmissions} />
  </Router>
  );
}

export default App;
