import React from "react";
import { Card, CardContent, Typography, Box, Divider, Avatar, Grid } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import HomeIcon from "@mui/icons-material/Home";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PersonIcon from "@mui/icons-material/Person";
import { Contractor } from "../../types/Contractor";

interface ContractorDetailsProps {
  contractor: Contractor;
}

const details = [
  { icon: <InfoOutlinedIcon />, label: "Nazwa", value: (c: Contractor) => c.name },
  { icon: <CreditCardIcon />, label: "NIP", value: (c: Contractor) => c.nip },
  { icon: <HomeIcon />, label: "Adres", value: (c: Contractor) => c.address },
  { icon: <BusinessIcon />, label: "Typ", value: (c: Contractor) => c.type === "company" ? "Firma" : "Osoba fizyczna" },
];

const ContractorDetails: React.FC<ContractorDetailsProps> = ({ contractor }) => (
  <Card elevation={4} sx={{ borderRadius: 3, p: 3, minWidth: 340 }}>
    <CardContent>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        {contractor.type === "company"
          ? <BusinessIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
          : <PersonIcon color="secondary" sx={{ fontSize: 40, mr: 2 }} />
        }
        <Typography variant="h5" fontWeight={700}>Szczegóły kontrahenta</Typography>
      </Box>
      <Divider sx={{ mb: 3 }} />
      <Grid
        columns={12}
        rowSpacing={2}
        columnSpacing={2}
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gap: 2,
        }}
      >
        {details.map((detail, idx) => (
          <Box
            key={detail.label}
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: "background.default",
              borderRadius: 2,
              p: 2,
              boxShadow: 1,
              gridColumn: { xs: "1", sm: (idx % 2) + 1 },
            }}
          >
            <Avatar sx={{ bgcolor: "primary.light", width: 32, height: 32, mr: 2 }}>
              {detail.icon}
            </Avatar>
            <Box>
              <Typography variant="body2" color="text.secondary">
                {detail.label}
              </Typography>
              <Typography variant="subtitle1" fontWeight={600}>
                {detail.value(contractor)}
              </Typography>
            </Box>
          </Box>
        ))}
      </Grid>
    </CardContent>
  </Card>
);

export default ContractorDetails;
