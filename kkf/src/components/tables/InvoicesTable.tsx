import React from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Invoice } from "../../types/Invoice";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";

interface InvoicesTableProps {
  rows: Invoice[];
  onEdit?: (inv: Invoice) => void;
  onDelete?: (id: number) => void;
  onDetails?: (inv: Invoice) => void;
}

const InvoicesTable: React.FC<InvoicesTableProps> = ({ rows, onEdit, onDelete, onDetails }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Numer</TableCell>
          <TableCell>Data wystawienia</TableCell>
          <TableCell>Data sprzedaży</TableCell>
          <TableCell>Kontrahent</TableCell>
          <TableCell>Netto</TableCell>
          <TableCell>Brutto</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Rodzaj</TableCell>
          <TableCell align="center">Akcje</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.number}</TableCell>
            <TableCell>{formatDate(row.issueDate)}</TableCell>
            <TableCell>{formatDate(row.saleDate)}</TableCell>
            <TableCell>{row.contractorId ?? "-"}</TableCell>
            <TableCell>{formatCurrency(row.totalNetPrice)}</TableCell>
            <TableCell>{formatCurrency(row.totalGrossPrice)}</TableCell>
            <TableCell>{row.status}</TableCell>
            <TableCell>{row.kind}</TableCell>
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

export default InvoicesTable;
