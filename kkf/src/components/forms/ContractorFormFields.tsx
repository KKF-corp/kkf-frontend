import React from "react";
import { TextField, MenuItem } from "@mui/material";
import { Contractor } from "../../types/Contractor";

interface ContractorFormFieldsProps {
  form: Omit<Contractor, "id">;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ContractorFormFields: React.FC<ContractorFormFieldsProps> = ({ form, onChange }) => (
  <>
    <TextField
      label="Nazwa"
      name="name"
      value={form.name}
      onChange={onChange}
      fullWidth
      margin="normal"
      required
    />
    <TextField
      label="NIP"
      name="nip"
      value={form.nip}
      onChange={onChange}
      fullWidth
      margin="normal"
      required
    />
    <TextField
      label="Adres"
      name="address"
      value={form.address}
      onChange={onChange}
      fullWidth
      margin="normal"
      required
    />
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
      <MenuItem value="company">Firma</MenuItem>
      <MenuItem value="individual">Osoba fizyczna</MenuItem>
    </TextField>
  </>
);

export default ContractorFormFields;
