import { AppBar, Toolbar, Typography } from "@mui/material";

const AppBarComponent = () => (
  <AppBar position="fixed" sx={{ zIndex: 1201 }}>
    <Toolbar>
      <Typography variant="h6" noWrap>
        KnoKoFin – Zarządzanie Finansami Firmy
      </Typography>
    </Toolbar>
  </AppBar>
);

export default AppBarComponent;
