import React from "react";
import { Card, CardContent, Typography, Box, Divider, Avatar, Grid } from "@mui/material";
import ReceiptIcon from "@mui/icons-material/Receipt";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CategoryIcon from "@mui/icons-material/Category";
import BusinessIcon from "@mui/icons-material/Business";
import { Expense } from "../../types/Expense";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";

interface ExpenseDetailsProps {
  expense: Expense;
}

const details = [
  { icon: <InfoOutlinedIcon />, label: "Nazwa", value: (e: Expense) => e.name },
  { icon: <InfoOutlinedIcon />, label: "Opis", value: (e: Expense) => e.description || "-" },
  { icon: <CalendarTodayIcon />, label: "Data zakupu", value: (e: Expense) => formatDate(e.purchaseDate) },
  { icon: <AttachMoneyIcon />, label: "Netto", value: (e: Expense) => formatCurrency(e.totalNetPrice) },
  { icon: <AttachMoneyIcon />, label: "Brutto", value: (e: Expense) => formatCurrency(e.totalGrossPrice) },
  { icon: <CategoryIcon />, label: "Kategoria", value: (e: Expense) => e.categoryId },
  { icon: <BusinessIcon />, label: "Kontrahent", value: (e: Expense) => e.contractorId ?? "-" },
];

const ExpenseDetails: React.FC<ExpenseDetailsProps> = ({ expense }) => (
  <Card elevation={4} sx={{ borderRadius: 3, p: 3, minWidth: 340 }}>
    <CardContent>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <ReceiptIcon color="error" sx={{ fontSize: 40, mr: 2 }} />
        <Typography variant="h5" fontWeight={700}>Szczegóły wydatku</Typography>
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
                {detail.value(expense)}
              </Typography>
            </Box>
          </Box>
        ))}
      </Grid>
    </CardContent>
  </Card>
);

export default ExpenseDetails;
