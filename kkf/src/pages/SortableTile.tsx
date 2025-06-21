import React from "react";
import { Card, CardContent, IconButton, Typography, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortableTileProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  onClose: () => void;
  sx?: object;
}

const SortableTile: React.FC<SortableTileProps> = ({
  id,
  title,
  icon,
  children,
  onClose,
  sx = {},
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition: transition || "transform 0.2s",
    opacity: isDragging ? 0.5 : 1,
    cursor: "default",
    position: "relative",
    minHeight: 150,
    marginBottom: 0,
    height: "100%",
    display: "flex",
    flexDirection: "column",
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      sx={{
        ...sx,
        bgcolor: (theme) =>
          theme.vars
            ? theme.vars.palette.background.paper
            : theme.palette.background.paper,
        boxShadow: "0px 3px 8px rgba(0,0,0,0.10)",
        borderRadius: 2,
        minHeight: 150,
        position: "relative",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", overflow: "hidden" }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box
            sx={{ display: "flex", alignItems: "center", flexGrow: 1, cursor: "grab" }}
            {...listeners}
            tabIndex={0}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, display: "flex", alignItems: "center" }}
            >
              {icon} {title}
            </Typography>
          </Box>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            tabIndex={-1}
            sx={{
              ml: 1,
              color: "grey.500",
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <Box sx={{ mt: 2, flexGrow: 1, minHeight: 0, overflow: "auto" }}>
          {children}
        </Box>
      </CardContent>
    </Card>
  );
};

export default SortableTile;
