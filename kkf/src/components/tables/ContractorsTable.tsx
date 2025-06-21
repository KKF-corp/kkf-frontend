import React from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Contractor } from "../../types/Contractor";

interface ContractorsTableProps {
  rows: Contractor[];
  onEdit?: (contractor: Contractor) => void;
  onDelete?: (id: number) => void;
  onDetails?: (contractor: Contractor) => void;
}

const ContractorsTable: React.FC<ContractorsTableProps> = ({
  rows, onEdit, onDelete, onDetails
}) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Nazwa</TableCell>
          <TableCell>NIP</TableCell>
          <TableCell>Adres</TableCell>
          <TableCell>Typ</TableCell>
          <TableCell align="center">Akcje</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.nip}</TableCell>
            <TableCell>{row.address}</TableCell>
            <TableCell>{row.type === "company" ? "Firma" : "Osoba fizyczna"}</TableCell>
            <TableCell align="center">
              <IconButton onClick={() => onDetails?.(row)}><VisibilityIcon /></IconButton>
              <IconButton onClick={() => onEdit?.(row)}><EditIcon /></IconButton>
              <IconButton onClick={() => onDelete?.(row.id)}><DeleteIcon /></IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default ContractorsTable;
