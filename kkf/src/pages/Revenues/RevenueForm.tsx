import React, { useState, useEffect } from "react";
import { Box, TextField, Button } from "@mui/material";
import { Revenue } from "../../types/Revenue";

interface RevenueFormProps {
  initial?: Revenue | null;
  onSubmit: (revenue: Revenue) => void;
  onCancel: () => void;
}

const emptyRevenue: Omit<Revenue, "id"> = {
  name: "",
  description: "",
  saleDate: "",
  totalNetPrice: 0,
  totalGrossPrice: 0,
  categoryId: 0,
  transactionType: "revenue",
};

const RevenueForm: React.FC<RevenueFormProps> = ({
  initial,
  onSubmit,
  onCancel,
}) => {
  const [form, setForm] = useState<Omit<Revenue, "id">>(emptyRevenue);

  useEffect(() => {
    if (initial) {
      const { id, ...rest } = initial;
      setForm(rest);
    } else {
      setForm(emptyRevenue);
    }
  }, [initial]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: Number(e.target.value) });
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
      <TextField
        label="Nazwa"
        name="name"
        value={form.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Opis"
        name="description"
        value={form.description}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Data sprzedaży"
        name="saleDate"
        value={form.saleDate}
        onChange={handleChange}
        fullWidth
        margin="normal"
        type="date"
        InputLabelProps={{ shrink: true }}
        required
      />
      <TextField
        label="Netto"
        name="totalNetPrice"
        value={form.totalNetPrice}
        onChange={handleNumberChange}
        fullWidth
        margin="normal"
        type="number"
        required
      />
      <TextField
        label="Brutto"
        name="totalGrossPrice"
        value={form.totalGrossPrice}
        onChange={handleNumberChange}
        fullWidth
        margin="normal"
        type="number"
        required
      />
      <TextField
        label="Kategoria (ID)"
        name="categoryId"
        value={form.categoryId}
        onChange={handleNumberChange}
        fullWidth
        margin="normal"
        type="number"
        required
      />
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

export default RevenueForm;
