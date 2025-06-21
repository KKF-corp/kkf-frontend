import React, { useState, useEffect } from "react";
import { Box, TextField, Button, MenuItem } from "@mui/material";
import { Transaction } from "../../types/Transaction";

interface TransactionFormProps {
  initial?: Transaction | null;
  onSubmit: (transaction: Transaction) => void;
  onCancel: () => void;
}

const emptyTransaction: Omit<Transaction, "id"> = {
  name: "",
  description: "",
  date: "",
  type: "revenue",
  categoryId: 0,
};

const TransactionForm: React.FC<TransactionFormProps> = ({
  initial,
  onSubmit,
  onCancel,
}) => {
  const [form, setForm] = useState<Omit<Transaction, "id">>(emptyTransaction);

  useEffect(() => {
    if (initial) {
      const { id, ...rest } = initial;
      setForm(rest);
    } else {
      setForm(emptyTransaction);
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
        label="Data"
        name="date"
        value={form.date}
        onChange={handleChange}
        fullWidth
        margin="normal"
        type="date"
        InputLabelProps={{ shrink: true }}
        required
      />
      <TextField
        select
        label="Typ"
        name="type"
        value={form.type}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      >
        <MenuItem value="revenue">Przychód</MenuItem>
        <MenuItem value="expense">Wydatek</MenuItem>
      </TextField>
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

export default TransactionForm;
