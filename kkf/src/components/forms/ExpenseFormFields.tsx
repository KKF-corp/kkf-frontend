import React from "react";
import { TextField } from "@mui/material";
import { Expense } from "../../types/Expense";

interface ExpenseFormFieldsProps {
  form: Partial<Expense>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ExpenseFormFields: React.FC<ExpenseFormFieldsProps> = ({ form, onChange, onNumberChange }) => (
  <>
    <TextField label="Nazwa" name="name" value={form.name} onChange={onChange} fullWidth margin="normal" required />
    <TextField label="Opis" name="description" value={form.description} onChange={onChange} fullWidth margin="normal" />
    <TextField label="Data zakupu" name="purchaseDate" value={form.purchaseDate} onChange={onChange} fullWidth margin="normal" type="date" InputLabelProps={{ shrink: true }} required />
    <TextField label="Netto" name="totalNetPrice" value={form.totalNetPrice} onChange={onNumberChange} fullWidth margin="normal" type="number" required />
    <TextField label="Brutto" name="totalGrossPrice" value={form.totalGrossPrice} onChange={onNumberChange} fullWidth margin="normal" type="number" required />
    <TextField label="Kategoria (ID)" name="categoryId" value={form.categoryId} onChange={onNumberChange} fullWidth margin="normal" type="number" required />
  </>
);

export default ExpenseFormFields;
