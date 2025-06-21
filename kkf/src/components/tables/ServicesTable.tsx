import React from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Service } from "../../types/Service";
import { formatCurrency } from "../../utils/formatCurrency";

interface ServicesTableProps {
  rows: Service[];
  onEdit?: (service: Service) => void;
  onDelete?: (id: number) => void;
  onDetails?: (service: Service) => void;
}

const ServicesTable: React.FC<ServicesTableProps> = ({ rows, onEdit, onDelete, onDetails }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Nazwa</TableCell>
          <TableCell>Opis</TableCell>
          <TableCell>Kategoria</TableCell>
          <TableCell>Cena netto</TableCell>
          <TableCell>Cena brutto</TableCell>
          <TableCell align="center">Akcje</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.description ?? "-"}</TableCell>
            <TableCell>{row.categoryId}</TableCell>
            <TableCell>{formatCurrency(row.netPrice)}</TableCell>
            <TableCell>{formatCurrency(row.grossPrice)}</TableCell>
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

export default ServicesTable;
