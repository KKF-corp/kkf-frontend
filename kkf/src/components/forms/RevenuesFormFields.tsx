import React from "react";
import { TextField } from "@mui/material";
import { Revenue } from "../../types/Revenue";

interface RevenueFormFieldsProps {
  form: Partial<Revenue>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RevenueFormFields: React.FC<RevenueFormFieldsProps> = ({ form, onChange, onNumberChange }) => (
  <>
    <TextField label="Nazwa" name="name" value={form.name} onChange={onChange} fullWidth margin="normal" required />
    <TextField label="Opis" name="description" value={form.description} onChange={onChange} fullWidth margin="normal" />
    <TextField label="Data sprzedaży" name="saleDate" value={form.saleDate} onChange={onChange} fullWidth margin="normal" type="date" InputLabelProps={{ shrink: true }} required />
    <TextField label="Netto" name="totalNetPrice" value={form.totalNetPrice} onChange={onNumberChange} fullWidth margin="normal" type="number" required />
    <TextField label="Brutto" name="totalGrossPrice" value={form.totalGrossPrice} onChange={onNumberChange} fullWidth margin="normal" type="number" required />
    <TextField label="Kategoria (ID)" name="categoryId" value={form.categoryId} onChange={onNumberChange} fullWidth margin="normal" type="number" required />
  </>
);

export default RevenueFormFields;
