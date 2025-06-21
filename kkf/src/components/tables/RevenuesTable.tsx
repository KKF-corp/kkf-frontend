import React from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Revenue } from "../../types/Revenue";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";

interface RevenuesTableProps {
  rows: Revenue[];
  onEdit?: (rev: Revenue) => void;
  onDelete?: (id: number) => void;
  onDetails?: (rev: Revenue) => void;
}

const RevenuesTable: React.FC<RevenuesTableProps> = ({ rows, onEdit, onDelete, onDetails }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Nazwa</TableCell>
          <TableCell>Data sprzedaży</TableCell>
          <TableCell>Netto</TableCell>
          <TableCell>Brutto</TableCell>
          <TableCell>Kategoria</TableCell>
          <TableCell>Kontrahent</TableCell>
          <TableCell>Faktura</TableCell>
          <TableCell align="center">Akcje</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{formatDate(row.saleDate)}</TableCell>
            <TableCell>{formatCurrency(row.totalNetPrice)}</TableCell>
            <TableCell>{formatCurrency(row.totalGrossPrice)}</TableCell>
            <TableCell>{row.categoryId}</TableCell>
            <TableCell>{row.contractorId ?? "-"}</TableCell>
            <TableCell>{row.invoiceId ?? "-"}</TableCell>
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

export default RevenuesTable;
