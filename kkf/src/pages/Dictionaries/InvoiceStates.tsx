import React from "react";
import { dictionariesMock } from "../../mock/dictionaries.mock";
import { Dictionary } from "../../types/Dictionary";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from "@mui/material";

const InvoiceStates: React.FC = () => {
  const invoiceStates = dictionariesMock.filter(d => d.type === "invoiceState");

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Statusy faktur</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nazwa</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoiceStates.map((state: Dictionary) => (
              <TableRow key={state.id}>
                <TableCell>{state.id}</TableCell>
                <TableCell>{state.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default InvoiceStates;
