import React from "react";
import { dictionariesMock } from "../../mock/dictionaries.mock";
import { Dictionary } from "../../types/Dictionary";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from "@mui/material";

const ContractorTypes: React.FC = () => {
  const contractorTypes = dictionariesMock.filter(d => d.type === "contractorType");

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Typy kontrahentów</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nazwa</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contractorTypes.map((type: Dictionary) => (
              <TableRow key={type.id}>
                <TableCell>{type.id}</TableCell>
                <TableCell>{type.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ContractorTypes;
