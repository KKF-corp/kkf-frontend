import React from 'react';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { getTheme } from './theme/muiTheme'; // <- popraw ścieżkę zgodnie z Twoją strukturą!
import Sidebar from './components/layout/Sidebar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import RevenuesList from './pages/Revenues/RevenuesList';
import ExpensesList from './pages/Expenses/ExpensesList';
import TransactionsList from './pages/Transactions/TransactionsList';
import InvoicesList from './pages/Invoices/InvoicesList';
import ContractorsList from './pages/Contractors/ContractorsList';
import ServicesList from './pages/Services/ServicesList';
import { CustomThemeProvider, useCustomTheme } from './context/ThemeContext';

const MainApp = () => {
  const { mode } = useCustomTheme();
  return (
    <MuiThemeProvider theme={getTheme(mode)}>
      <CssBaseline />
      <BrowserRouter>
        <div style={{ display: 'flex', minHeight: '100vh', background: 'background.default' }}>
          <Sidebar />
          <main style={{ flexGrow: 1, padding: 24 }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/revenues" element={<RevenuesList />} />
              <Route path="/expenses" element={<ExpensesList />} />
              <Route path="/transactions" element={<TransactionsList />} />
              <Route path="/invoices" element={<InvoicesList />} />
              <Route path="/contractors" element={<ContractorsList />} />
              <Route path="/services" element={<ServicesList />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </MuiThemeProvider>
  );
};

const App = () => (
  <CustomThemeProvider>
    <MainApp />
  </CustomThemeProvider>
);

export default App;
