// Routes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SubmissionsTable from './SubmissionsTable';
import MortgageCalculator from './MortgageCalculator';

const AppRoutes = ({ submissions , setSubmissions}) =>  (
  <Routes>
    <Route path="/submissions" element={<SubmissionsTable submissions={submissions} />} />
    <Route path="/" element={<MortgageCalculator submissions={submissions} setSubmissions={setSubmissions} />} />
  </Routes>
);

export default AppRoutes;
