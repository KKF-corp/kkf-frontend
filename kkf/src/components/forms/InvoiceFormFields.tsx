import React from "react";
import { TextField, MenuItem } from "@mui/material";
import { Invoice } from "../../types/Invoice";

interface InvoiceFormFieldsProps {
  form: Omit<Invoice, "id">;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InvoiceFormFields: React.FC<InvoiceFormFieldsProps> = ({
  form,
  onChange,
  onNumberChange,
}) => (
  <>
    <TextField
      label="Numer"
      name="number"
      value={form.number}
      onChange={onChange}
      fullWidth
      margin="normal"
      required
    />
    <TextField
      label="Data wystawienia"
      name="issueDate"
      value={form.issueDate}
      onChange={onChange}
      fullWidth
      margin="normal"
      type="date"
      InputLabelProps={{ shrink: true }}
      required
    />
    <TextField
      label="Data sprzedaży"
      name="saleDate"
      value={form.saleDate}
      onChange={onChange}
      fullWidth
      margin="normal"
      type="date"
      InputLabelProps={{ shrink: true }}
      required
    />
    <TextField
      label="Kontrahent (ID)"
      name="contractorId"
      value={form.contractorId}
      onChange={onNumberChange}
      fullWidth
      margin="normal"
      type="number"
      required
    />
    <TextField
      label="Netto"
      name="totalNetPrice"
      value={form.totalNetPrice}
      onChange={onNumberChange}
      fullWidth
      margin="normal"
      type="number"
      required
    />
    <TextField
      label="Brutto"
      name="totalGrossPrice"
      value={form.totalGrossPrice}
      onChange={onNumberChange}
      fullWidth
      margin="normal"
      type="number"
      required
    />
    <TextField
      select
      label="Status"
      name="status"
      value={form.status}
      onChange={onChange}
      fullWidth
      margin="normal"
      required
    >
      <MenuItem value="draft">Szkic</MenuItem>
      <MenuItem value="issued">Wystawiona</MenuItem>
      <MenuItem value="paid">Opłacona</MenuItem>
      <MenuItem value="cancelled">Anulowana</MenuItem>
    </TextField>
    <TextField
      select
      label="Rodzaj"
      name="kind"
      value={form.kind}
      onChange={onChange}
      fullWidth
      margin="normal"
      required
    >
      <MenuItem value="VAT">VAT</MenuItem>
      <MenuItem value="proforma">Proforma</MenuItem>
    </TextField>
  </>
);

export default InvoiceFormFields;
