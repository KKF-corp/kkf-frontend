import React from "react";
import { TextField } from "@mui/material";
import { Service } from "../../types/Service";

interface ServiceFormFieldsProps {
  form: Partial<Service>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ServiceFormFields: React.FC<ServiceFormFieldsProps> = ({ form, onChange, onNumberChange }) => (
  <>
    <TextField label="Nazwa" name="name" value={form.name} onChange={onChange} fullWidth margin="normal" required />
    <TextField label="Opis" name="description" value={form.description} onChange={onChange} fullWidth margin="normal" />
    <TextField label="Kategoria (ID)" name="categoryId" value={form.categoryId} onChange={onNumberChange} fullWidth margin="normal" type="number" required />
    <TextField label="Cena netto" name="netPrice" value={form.netPrice} onChange={onNumberChange} fullWidth margin="normal" type="number" required />
    <TextField label="Cena brutto" name="grossPrice" value={form.grossPrice} onChange={onNumberChange} fullWidth margin="normal" type="number" required />
  </>
);

export default ServiceFormFields;
