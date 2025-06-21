import React, { useState } from "react";
import { Typography, Box, Button, Dialog, DialogTitle, DialogContent } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import InvoicesTable from "../../components/tables/InvoicesTable";
import InvoiceForm from "./InvoiceForm";
import InvoiceDetails from "./InvoiceDetails";
import { invoicesMock } from "../../mock/invoices.mock";
import { Invoice } from "../../types/Invoice";

const InvoicesList: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>(invoicesMock);
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState<Invoice | null>(null);
  const [openDetails, setOpenDetails] = useState(false);
  const [details, setDetails] = useState<Invoice | null>(null);

  const handleAdd = () => {
    setEditing(null);
    setOpenForm(true);
  };

  const handleEdit = (inv: Invoice) => {
    setEditing(inv);
    setOpenForm(true);
  };

  const handleDelete = (id: number) => {
    setInvoices(prev => prev.filter(i => i.id !== id));
  };

  const handleDetails = (inv: Invoice) => {
    setDetails(inv);
    setOpenDetails(true);
  };

  const handleSubmit = (inv: Invoice) => {
    if (editing) {
      setInvoices(prev => prev.map(i => i.id === inv.id ? inv : i));
    } else {
      setInvoices(prev => [...prev, { ...inv, id: Date.now() }]);
    }
    setOpenForm(false);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>Lista faktur</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>Dodaj</Button>
      </Box>
      <InvoicesTable
        rows={invoices}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onDetails={handleDetails}
      />

      <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editing ? "Edytuj fakturę" : "Dodaj fakturę"}</DialogTitle>
        <DialogContent>
          <InvoiceForm
            initial={editing}
            onSubmit={handleSubmit}
            onCancel={() => setOpenForm(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={openDetails} onClose={() => setOpenDetails(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Szczegóły faktury</DialogTitle>
        <DialogContent>
          {details && <InvoiceDetails invoice={details} />}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default InvoicesList;
