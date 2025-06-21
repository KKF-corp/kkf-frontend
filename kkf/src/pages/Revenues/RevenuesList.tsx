import React, { useState } from "react";
import { Typography, Box, Button, Dialog, DialogTitle, DialogContent } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RevenuesTable from "../../components/tables/RevenuesTable";
import RevenueForm from "./RevenueForm";
import RevenueDetails from "./RevenueDetails";
import { revenuesMock } from "../../mock/revenues.mock";
import { Revenue } from "../../types/Revenue";

const RevenuesList: React.FC = () => {
  const [revenues, setRevenues] = useState<Revenue[]>(revenuesMock);
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState<Revenue | null>(null);
  const [openDetails, setOpenDetails] = useState(false);
  const [details, setDetails] = useState<Revenue | null>(null);

  const handleAdd = () => {
    setEditing(null);
    setOpenForm(true);
  };

  const handleEdit = (rev: Revenue) => {
    setEditing(rev);
    setOpenForm(true);
  };

  const handleDelete = (id: number) => {
    setRevenues(prev => prev.filter(r => r.id !== id));
  };

  const handleDetails = (rev: Revenue) => {
    setDetails(rev);
    setOpenDetails(true);
  };

  const handleSubmit = (rev: Revenue) => {
    if (editing) {
      setRevenues(prev => prev.map(r => r.id === rev.id ? rev : r));
    } else {
      setRevenues(prev => [...prev, { ...rev, id: Date.now() }]);
    }
    setOpenForm(false);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>Lista przychodów</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>Dodaj</Button>
      </Box>
      <RevenuesTable
        rows={revenues}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onDetails={handleDetails}
      />

      <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editing ? "Edytuj przychód" : "Dodaj przychód"}</DialogTitle>
        <DialogContent>
          <RevenueForm
            initial={editing}
            onSubmit={handleSubmit}
            onCancel={() => setOpenForm(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={openDetails} onClose={() => setOpenDetails(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Szczegóły przychodu</DialogTitle>
        <DialogContent>
          {details && <RevenueDetails revenue={details} />}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default RevenuesList;
