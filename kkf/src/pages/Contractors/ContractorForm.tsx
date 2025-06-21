import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { Contractor } from "../../types/Contractor";
import ContractorFormFields from "../../components/forms/ContractorFormFields";

interface ContractorFormProps {
  initial?: Contractor | null;
  onSubmit: (contractor: Contractor) => void;
  onCancel: () => void;
}

const emptyContractor: Omit<Contractor, "id"> = {
  name: "",
  nip: "",
  address: "",
  type: "company",
};

const ContractorForm: React.FC<ContractorFormProps> = ({
  initial,
  onSubmit,
  onCancel,
}) => {
  const [form, setForm] = useState<Omit<Contractor, "id">>(emptyContractor);

  useEffect(() => {
    if (initial) {
      const { id, ...rest } = initial;
      setForm(rest);
    } else {
      setForm(emptyContractor);
    }
  }, [initial]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(
      initial
        ? { ...form, id: initial.id }
        : { ...form, id: Date.now() }
    );
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400 }}>
      <ContractorFormFields form={form} onChange={handleChange} />
      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <Button type="submit" variant="contained" color="primary">
          Zapisz
        </Button>
        <Button onClick={onCancel} variant="outlined">
          Anuluj
        </Button>
      </Box>
    </Box>
  );
};

export default ContractorForm;
