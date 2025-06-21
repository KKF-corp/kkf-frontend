import React, { useState, useEffect } from "react";
import { Box, TextField, Button } from "@mui/material";
import { Service } from "../../types/Service";

interface ServiceFormProps {
  initial?: Service | null;
  onSubmit: (service: Service) => void;
  onCancel: () => void;
}

const emptyService: Omit<Service, "id"> = {
  name: "",
  description: "",
  categoryId: 0,
  netPrice: 0,
  grossPrice: 0,
};

const ServiceForm: React.FC<ServiceFormProps> = ({
  initial,
  onSubmit,
  onCancel,
}) => {
  const [form, setForm] = useState<Omit<Service, "id">>(emptyService);

  useEffect(() => {
    if (initial) {
      const { id, ...rest } = initial;
      setForm(rest);
    } else {
      setForm(emptyService);
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
        label="Kategoria (ID)"
        name="categoryId"
        value={form.categoryId}
        onChange={handleNumberChange}
        fullWidth
        margin="normal"
        type="number"
        required
      />
      <TextField
        label="Cena netto"
        name="netPrice"
        value={form.netPrice}
        onChange={handleNumberChange}
        fullWidth
        margin="normal"
        type="number"
        required
      />
      <TextField
        label="Cena brutto"
        name="grossPrice"
        value={form.grossPrice}
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

export default ServiceForm;
