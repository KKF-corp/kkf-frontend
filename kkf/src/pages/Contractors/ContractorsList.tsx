import React, { useState } from "react";
import { Typography, Box, Button, Dialog, DialogTitle, DialogContent } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ContractorsTable from "../../components/tables/ContractorsTable";
import ContractorForm from "./ContractorForm";
import ContractorDetails from "./ContractorDetails";
import { contractorsMock } from "../../mock/contractors.mock";
import { Contractor } from "../../types/Contractor";

const ContractorsList: React.FC = () => {
  const [contractors, setContractors] = useState<Contractor[]>(contractorsMock);
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState<Contractor | null>(null);
  const [openDetails, setOpenDetails] = useState(false);
  const [details, setDetails] = useState<Contractor | null>(null);

  const handleAdd = () => {
    setEditing(null);
    setOpenForm(true);
  };

  const handleEdit = (contractor: Contractor) => {
    setEditing(contractor);
    setOpenForm(true);
  };

  const handleDelete = (id: number) => {
    setContractors(prev => prev.filter(c => c.id !== id));
  };

  const handleDetails = (contractor: Contractor) => {
    setDetails(contractor);
    setOpenDetails(true);
  };

  const handleSubmit = (contractor: Contractor) => {
    if (editing) {
      setContractors(prev => prev.map(c => c.id === contractor.id ? contractor : c));
    } else {
      setContractors(prev => [...prev, { ...contractor, id: Date.now() }]);
    }
    setOpenForm(false);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>Lista kontrahentów</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>Dodaj</Button>
      </Box>
      <ContractorsTable
        rows={contractors}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onDetails={handleDetails}
      />

      <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editing ? "Edytuj kontrahenta" : "Dodaj kontrahenta"}</DialogTitle>
        <DialogContent>
          <ContractorForm
            initial={editing}
            onSubmit={handleSubmit}
            onCancel={() => setOpenForm(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={openDetails} onClose={() => setOpenDetails(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Szczegóły kontrahenta</DialogTitle>
        <DialogContent>
          {details && <ContractorDetails contractor={details} />}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ContractorsList;
