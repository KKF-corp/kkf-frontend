import React, { useState } from "react";
import { Typography, Box, Button, Dialog, DialogTitle, DialogContent } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TransactionsTable from "../../components/tables/TransactionTable";
import TransactionForm from "./TransactionForm";
import TransactionDetails from "./TransactionDetails";
import { transactionsMock } from "../../mock/transactions.mock";
import { Transaction } from "../../types/Transaction";

const TransactionsList: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(transactionsMock);
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState<Transaction | null>(null);
  const [openDetails, setOpenDetails] = useState(false);
  const [details, setDetails] = useState<Transaction | null>(null);

  const handleAdd = () => {
    setEditing(null);
    setOpenForm(true);
  };

  const handleEdit = (tr: Transaction) => {
    setEditing(tr);
    setOpenForm(true);
  };

  const handleDelete = (id: number) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const handleDetails = (tr: Transaction) => {
    setDetails(tr);
    setOpenDetails(true);
  };

  const handleSubmit = (tr: Transaction) => {
    if (editing) {
      setTransactions(prev => prev.map(t => t.id === tr.id ? tr : t));
    } else {
      setTransactions(prev => [...prev, { ...tr, id: Date.now() }]);
    }
    setOpenForm(false);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>Lista transakcji</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>Dodaj</Button>
      </Box>
      <TransactionsTable
        rows={transactions}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onDetails={handleDetails}
      />

      <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editing ? "Edytuj transakcję" : "Dodaj transakcję"}</DialogTitle>
        <DialogContent>
          <TransactionForm
            initial={editing}
            onSubmit={handleSubmit}
            onCancel={() => setOpenForm(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={openDetails} onClose={() => setOpenDetails(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Szczegóły transakcji</DialogTitle>
        <DialogContent>
          {details && <TransactionDetails transaction={details} />}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default TransactionsList;
