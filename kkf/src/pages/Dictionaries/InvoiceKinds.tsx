import React from "react";
import { dictionariesMock } from "../../mock/dictionaries.mock";
import { Dictionary } from "../../types/Dictionary";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from "@mui/material";

const InvoiceKinds: React.FC = () => {
  const invoiceKinds = dictionariesMock.filter(d => d.type === "invoiceKind");

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Rodzaje faktur</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nazwa</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoiceKinds.map((kind: Dictionary) => (
              <TableRow key={kind.id}>
                <TableCell>{kind.id}</TableCell>
                <TableCell>{kind.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default InvoiceKinds;
