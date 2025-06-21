import React from "react";
import { Card, CardContent, Typography, Box, Divider, Avatar, Grid } from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CategoryIcon from "@mui/icons-material/Category";
import BusinessIcon from "@mui/icons-material/Business";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { Transaction } from "../../types/Transaction";
import { formatDate } from "../../utils/formatDate";

interface TransactionDetailsProps {
  transaction: Transaction;
}

const details = [
  { icon: <InfoOutlinedIcon />, label: "Nazwa", value: (t: Transaction) => t.name },
  { icon: <InfoOutlinedIcon />, label: "Opis", value: (t: Transaction) => t.description || "-" },
  { icon: <CalendarTodayIcon />, label: "Data", value: (t: Transaction) => formatDate(t.date) },
  { icon: <SwapHorizIcon />, label: "Typ", value: (t: Transaction) => t.type === "revenue" ? "Przychód" : "Wydatek" },
  { icon: <CategoryIcon />, label: "Kategoria", value: (t: Transaction) => t.categoryId },
  { icon: <BusinessIcon />, label: "Kontrahent", value: (t: Transaction) => t.contractorId ?? "-" },
  { icon: <ReceiptIcon />, label: "Faktura", value: (t: Transaction) => t.invoiceId ?? "-" },
];

const TransactionDetails: React.FC<TransactionDetailsProps> = ({ transaction }) => (
  <Card elevation={4} sx={{ borderRadius: 3, p: 3, minWidth: 340 }}>
    <CardContent>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <SwapHorizIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
        <Typography variant="h5" fontWeight={700}>Szczegóły transakcji</Typography>
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
                {detail.value(transaction)}
              </Typography>
            </Box>
          </Box>
        ))}
      </Grid>
    </CardContent>
  </Card>
);

export default TransactionDetails;
