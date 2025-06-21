import React, { useState } from "react";
import { Typography, Box, Button, Dialog, DialogTitle, DialogContent } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ExpensesTable from "../../components/tables/ExpensesTable";
import ExpenseForm from "./ExpenseForm";
import ExpenseDetails from "./ExpenseDetails";
import { expensesMock } from "../../mock/expenses.mock";
import { Expense } from "../../types/Expense";

const ExpensesList: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>(expensesMock);
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState<Expense | null>(null);
  const [openDetails, setOpenDetails] = useState(false);
  const [details, setDetails] = useState<Expense | null>(null);

  const handleAdd = () => {
    setEditing(null);
    setOpenForm(true);
  };

  const handleEdit = (exp: Expense) => {
    setEditing(exp);
    setOpenForm(true);
  };

  const handleDelete = (id: number) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
  };

  const handleDetails = (exp: Expense) => {
    setDetails(exp);
    setOpenDetails(true);
  };

  const handleSubmit = (exp: Expense) => {
    if (editing) {
      setExpenses(prev => prev.map(e => e.id === exp.id ? exp : e));
    } else {
      setExpenses(prev => [...prev, { ...exp, id: Date.now() }]);
    }
    setOpenForm(false);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>Lista wydatków</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>Dodaj</Button>
      </Box>
      <ExpensesTable
        rows={expenses}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onDetails={handleDetails}
      />

      <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editing ? "Edytuj wydatek" : "Dodaj wydatek"}</DialogTitle>
        <DialogContent>
          <ExpenseForm
            initial={editing}
            onSubmit={handleSubmit}
            onCancel={() => setOpenForm(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={openDetails} onClose={() => setOpenDetails(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Szczegóły wydatku</DialogTitle>
        <DialogContent>
          {details && <ExpenseDetails expense={details} />}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ExpensesList;
