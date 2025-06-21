import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { Invoice } from "../../types/Invoice";
import InvoiceFormFields from "../../components/forms/InvoiceFormFields";

interface InvoiceFormProps {
  initial?: Invoice | null;
  onSubmit: (invoice: Invoice) => void;
  onCancel: () => void;
}

const emptyInvoice: Omit<Invoice, "id"> = {
  number: "",
  issueDate: "",
  saleDate: "",
  contractorId: 0,
  totalNetPrice: 0,
  totalGrossPrice: 0,
  status: "draft",
  kind: "VAT",
};

const InvoiceForm: React.FC<InvoiceFormProps> = ({
  initial,
  onSubmit,
  onCancel,
}) => {
  const [form, setForm] = useState<Omit<Invoice, "id">>(emptyInvoice);

  useEffect(() => {
    if (initial) {
      const { id, ...rest } = initial;
      setForm(rest);
    } else {
      setForm(emptyInvoice);
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
      <InvoiceFormFields
        form={form}
        onChange={handleChange}
        onNumberChange={handleNumberChange}
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

export default InvoiceForm;
