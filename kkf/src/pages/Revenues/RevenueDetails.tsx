import React from "react";
import { Card, CardContent, Typography, Box, Divider, Avatar, Grid } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CategoryIcon from "@mui/icons-material/Category";
import BusinessIcon from "@mui/icons-material/Business";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { Revenue } from "../../types/Revenue";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";

interface RevenueDetailsProps {
  revenue: Revenue;
}

const details = [
  { icon: <InfoOutlinedIcon />, label: "Nazwa", value: (r: Revenue) => r.name },
  { icon: <InfoOutlinedIcon />, label: "Opis", value: (r: Revenue) => r.description || "-" },
  { icon: <CalendarTodayIcon />, label: "Data sprzedaży", value: (r: Revenue) => formatDate(r.saleDate) },
  { icon: <AttachMoneyIcon />, label: "Netto", value: (r: Revenue) => formatCurrency(r.totalNetPrice) },
  { icon: <AttachMoneyIcon />, label: "Brutto", value: (r: Revenue) => formatCurrency(r.totalGrossPrice) },
  { icon: <CategoryIcon />, label: "Kategoria", value: (r: Revenue) => r.categoryId },
  { icon: <BusinessIcon />, label: "Kontrahent", value: (r: Revenue) => r.contractorId ?? "-" },
  { icon: <ReceiptIcon />, label: "Faktura", value: (r: Revenue) => r.invoiceId ?? "-" },
];

const RevenueDetails: React.FC<RevenueDetailsProps> = ({ revenue }) => (
  <Card elevation={4} sx={{ borderRadius: 3, p: 3, minWidth: 340 }}>
    <CardContent>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <TrendingUpIcon color="success" sx={{ fontSize: 40, mr: 2 }} />
        <Typography variant="h5" fontWeight={700}>Szczegóły przychodu</Typography>
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
                {detail.value(revenue)}
              </Typography>
            </Box>
          </Box>
        ))}
      </Grid>
    </CardContent>
  </Card>
);

export default RevenueDetails;
