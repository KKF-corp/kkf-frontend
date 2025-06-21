import React from "react";
import { Card, CardContent, Typography, Box, Divider, Avatar, Grid } from "@mui/material";
import ReceiptIcon from "@mui/icons-material/Receipt";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BusinessIcon from "@mui/icons-material/Business";
import { Invoice } from "../../types/Invoice";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";

interface InvoiceDetailsProps {
  invoice: Invoice;
}

const details = [
  { icon: <InfoOutlinedIcon />, label: "Numer", value: (i: Invoice) => i.number },
  { icon: <CalendarTodayIcon />, label: "Data wystawienia", value: (i: Invoice) => formatDate(i.issueDate) },
  { icon: <CalendarTodayIcon />, label: "Data sprzedaży", value: (i: Invoice) => formatDate(i.saleDate) },
  { icon: <BusinessIcon />, label: "Kontrahent", value: (i: Invoice) => i.contractorId },
  { icon: <AttachMoneyIcon />, label: "Netto", value: (i: Invoice) => formatCurrency(i.totalNetPrice) },
  { icon: <AttachMoneyIcon />, label: "Brutto", value: (i: Invoice) => formatCurrency(i.totalGrossPrice) },
  { icon: <ReceiptIcon />, label: "Status", value: (i: Invoice) => i.status },
  { icon: <ReceiptIcon />, label: "Rodzaj", value: (i: Invoice) => i.kind },
];

const InvoiceDetails: React.FC<InvoiceDetailsProps> = ({ invoice }) => (
  <Card elevation={4} sx={{ borderRadius: 3, p: 3, minWidth: 340 }}>
    <CardContent>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <ReceiptIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
        <Typography variant="h5" fontWeight={700}>Szczegóły faktury</Typography>
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
                {detail.value(invoice)}
              </Typography>
            </Box>
          </Box>
        ))}
      </Grid>
    </CardContent>
  </Card>
);

export default InvoiceDetails;
