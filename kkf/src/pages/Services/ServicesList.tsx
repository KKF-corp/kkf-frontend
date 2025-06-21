import React, { useState } from "react";
import { Typography, Box, Button, Dialog, DialogTitle, DialogContent } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ServicesTable from "../../components/tables/ServicesTable";
import ServiceForm from "./ServiceForm";
import ServiceDetails from "./ServiceDetails";
import { servicesMock } from "../../mock/services.mock";
import { Service } from "../../types/Service";

const ServicesList: React.FC = () => {
  const [services, setServices] = useState<Service[]>(servicesMock);
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [openDetails, setOpenDetails] = useState(false);
  const [details, setDetails] = useState<Service | null>(null);

  const handleAdd = () => {
    setEditing(null);
    setOpenForm(true);
  };

  const handleEdit = (service: Service) => {
    setEditing(service);
    setOpenForm(true);
  };

  const handleDelete = (id: number) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  const handleDetails = (service: Service) => {
    setDetails(service);
    setOpenDetails(true);
  };

  const handleSubmit = (service: Service) => {
    if (editing) {
      setServices(prev => prev.map(s => s.id === service.id ? service : s));
    } else {
      setServices(prev => [...prev, { ...service, id: Date.now() }]);
    }
    setOpenForm(false);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>Lista usług</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>Dodaj</Button>
      </Box>
      <ServicesTable
        rows={services}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onDetails={handleDetails}
      />

      <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editing ? "Edytuj usługę" : "Dodaj usługę"}</DialogTitle>
        <DialogContent>
          <ServiceForm
            initial={editing}
            onSubmit={handleSubmit}
            onCancel={() => setOpenForm(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={openDetails} onClose={() => setOpenDetails(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Szczegóły usługi</DialogTitle>
        <DialogContent>
          {details && <ServiceDetails service={details} />}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ServicesList;
