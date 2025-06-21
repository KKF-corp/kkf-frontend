import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { Box, Button, Drawer, List, ListItem, ListItemButton, ListItemText, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ReceiptIcon from "@mui/icons-material/Receipt";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import BusinessIcon from "@mui/icons-material/Business";
import BuildIcon from "@mui/icons-material/Build";
import SortableTile from "./SortableTile";
import { formatCurrency } from "../utils/formatCurrency";
import { formatDate } from "../utils/formatDate";
import { revenuesMock } from "../mock/revenues.mock";
import { expensesMock } from "../mock/expenses.mock";
import { transactionsMock } from "../mock/transactions.mock";
import { invoicesMock } from "../mock/invoices.mock";
import { contractorsMock } from "../mock/contractors.mock";
import { servicesMock } from "../mock/services.mock";

interface Tile {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
  span?: number;
}

const getTiles = (balance: number, totalRevenue: number, totalExpense: number): Tile[] => [
  {
    id: "balance",
    title: "Bilans",
    icon: <SwapHorizIcon color="primary" sx={{ mr: 1 }} />,
    content: <Typography variant="h4">{formatCurrency(balance)}</Typography>,
    span: 1,
  },
  {
    id: "revenues",
    title: "Przychody",
    icon: <TrendingUpIcon color="success" sx={{ mr: 1 }} />,
    content: <Typography variant="h4">{formatCurrency(totalRevenue)}</Typography>,
    span: 1,
  },
  {
    id: "expenses",
    title: "Wydatki",
    icon: <ReceiptIcon color="error" sx={{ mr: 1 }} />,
    content: <Typography variant="h4">{formatCurrency(totalExpense)}</Typography>,
    span: 1,
  },
  {
    id: "transactions",
    title: "Ostatnie transakcje",
    icon: <SwapHorizIcon color="info" sx={{ mr: 1 }} />,
    content: (
      <>
        {transactionsMock.slice(0, 5).map((t) => (
          <Box key={t.id} sx={{ mb: 1 }}>
            <Typography>{t.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {formatDate(t.date)} • {formatCurrency(t.type === 'revenue' ? 500 : -200)}
            </Typography>
          </Box>
        ))}
      </>
    ),
    span: 2,
  },
  {
    id: "invoices",
    title: "Faktury",
    icon: <ReceiptIcon color="warning" sx={{ mr: 1 }} />,
    content: (
      <>
        <Typography variant="h4">{invoicesMock.length}</Typography>
        <Typography variant="body2" color="text.secondary">
          Ostatnia: {invoicesMock[0] ? invoicesMock[0].number : "-"}
        </Typography>
      </>
    ),
    span: 1,
  },
  {
    id: "contractors",
    title: "Kontrahenci",
    icon: <BusinessIcon color="secondary" sx={{ mr: 1 }} />,
    content: (
      <>
        <Typography variant="h4">{contractorsMock.length}</Typography>
        <Typography variant="body2" color="text.secondary">
          Ostatni: {contractorsMock[0] ? contractorsMock[0].name : "-"}
        </Typography>
      </>
    ),
    span: 1,
  },
  {
    id: "services",
    title: "Usługi",
    icon: <BuildIcon color="info" sx={{ mr: 1 }} />,
    content: (
      <>
        <Typography variant="h4">{servicesMock.length}</Typography>
        <Typography variant="body2" color="text.secondary">
          Ostatnia: {servicesMock[0] ? servicesMock[0].name : "-"}
        </Typography>
      </>
    ),
    span: 1,
  },
];

const Dashboard = () => {
  const totalRevenue = revenuesMock.reduce((sum, r) => sum + r.totalGrossPrice, 0);
  const totalExpense = expensesMock.reduce((sum, e) => sum + e.totalGrossPrice, 0);
  const balance = totalRevenue - totalExpense;

  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [activeTiles, setActiveTiles] = useState(getTiles(balance, totalRevenue, totalExpense));
  const [availableTiles, setAvailableTiles] = useState<Tile[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setActiveTiles((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over?.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleCloseTile = (tileId: string) => {
    const tile = activeTiles.find(t => t.id === tileId);
    if (tile) {
      setActiveTiles(activeTiles.filter(t => t.id !== tileId));
      setAvailableTiles([...availableTiles, tile]);
    }
  };

  const handleRestoreTile = (tileId: string) => {
    const tile = availableTiles.find(t => t.id === tileId);
    if (tile) {
      setAvailableTiles(availableTiles.filter(t => t.id !== tileId));
      setActiveTiles([...activeTiles, tile]);
    }
  };

  const toggleMode = () => setMode((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <Box sx={{ display: "flex" }}>
      {/* Prawy górny róg: tryb i menu */}
      <Box sx={{ position: "fixed", right: 20, top: 20, zIndex: 1300, display: "flex", gap: 2 }}>
        
        <Button
          variant="contained"
          onClick={() => setDrawerOpen(open => !open)}
          sx={{
            minWidth: 40,
            height: 40,
            borderRadius: "50%",
            padding: 0,
          }}
        >
          <MenuIcon />
        </Button>
      </Box>

      {/* Panel widgetów */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 250, p: 2 }}>
          <Typography variant="h6" gutterBottom>Dostępne widgety</Typography>
          <List>
            {availableTiles.map((tile) => (
              <ListItem key={tile.id} disablePadding>
                <ListItemButton onClick={() => handleRestoreTile(tile.id)}>
                  <ListItemText primary={tile.title} />
                </ListItemButton>
              </ListItem>
            ))}
            {availableTiles.length === 0 && (
              <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
                Brak dostępnych widgetów
              </Typography>
            )}
          </List>
        </Box>
      </Drawer>

      {/* Kafelki */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={activeTiles.map(t => t.id)}>
          <Box
            sx={{
              flexGrow: 1,
              display: "grid",
              gap: 3,
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
              },
              gridAutoRows: "minmax(150px, auto)",
              gridAutoFlow: "dense",
              p: 2,
              alignItems: "start",
            }}
          >
            {activeTiles.map((tile) => (
              <SortableTile
                key={tile.id}
                id={tile.id}
                title={tile.title}
                icon={tile.icon}
                onClose={() => handleCloseTile(tile.id)}
                sx={{
                  gridRow: `span ${tile.span || 1}`,
                  height: "100%",
                }}
              >
                {tile.content}
              </SortableTile>
            ))}
          </Box>
        </SortableContext>
      </DndContext>
    </Box>
  );
};

export default Dashboard;
