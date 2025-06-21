import React from "react";
import { TextField, MenuItem } from "@mui/material";
import { Transaction } from "../../types/Transaction";

interface TransactionFormFieldsProps {
  form: Partial<Transaction>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TransactionFormFields: React.FC<TransactionFormFieldsProps> = ({ form, onChange, onNumberChange }) => (
  <>
    <TextField label="Nazwa" name="name" value={form.name} onChange={onChange} fullWidth margin="normal" required />
    <TextField label="Opis" name="description" value={form.description} onChange={onChange} fullWidth margin="normal" />
    <TextField label="Data" name="date" value={form.date} onChange={onChange} fullWidth margin="normal" type="date" InputLabelProps={{ shrink: true }} required />
    <TextField
      select
      label="Typ"
      name="type"
      value={form.type}
      onChange={onChange}
      fullWidth
      margin="normal"
      required
    >
      <MenuItem value="revenue">Przychód</MenuItem>
      <MenuItem value="expense">Wydatek</MenuItem>
    </TextField>
    <TextField label="Kategoria (ID)" name="categoryId" value={form.categoryId} onChange={onNumberChange} fullWidth margin="normal" type="number" required />
  </>
);

export default TransactionFormFields;
