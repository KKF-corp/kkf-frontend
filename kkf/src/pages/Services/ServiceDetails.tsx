import React from "react";
import { Card, CardContent, Typography, Box, Divider, Avatar, Grid } from "@mui/material";
import BuildIcon from "@mui/icons-material/Build";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CategoryIcon from "@mui/icons-material/Category";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Service } from "../../types/Service";
import { formatCurrency } from "../../utils/formatCurrency";

interface ServiceDetailsProps {
  service: Service;
}

const details = [
  { icon: <InfoOutlinedIcon />, label: "Nazwa", value: (s: Service) => s.name },
  { icon: <InfoOutlinedIcon />, label: "Opis", value: (s: Service) => s.description || "-" },
  { icon: <CategoryIcon />, label: "Kategoria", value: (s: Service) => s.categoryId },
  { icon: <AttachMoneyIcon />, label: "Cena netto", value: (s: Service) => formatCurrency(s.netPrice) },
  { icon: <AttachMoneyIcon />, label: "Cena brutto", value: (s: Service) => formatCurrency(s.grossPrice) },
];

const ServiceDetails: React.FC<ServiceDetailsProps> = ({ service }) => (
  <Card elevation={4} sx={{ borderRadius: 3, p: 3, minWidth: 340 }}>
    <CardContent>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <BuildIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
        <Typography variant="h5" fontWeight={700}>Szczegóły usługi</Typography>
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
                {detail.value(service)}
              </Typography>
            </Box>
          </Box>
        ))}
      </Grid>
    </CardContent>
  </Card>
);

export default ServiceDetails;
