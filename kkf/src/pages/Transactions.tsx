import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const Transactions = () => (
  <>
    <Typography variant="h4" gutterBottom>Transakcje</Typography>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Data</TableCell>
            <TableCell>Opis</TableCell>
            <TableCell>Kwota</TableCell>
            <TableCell>Kategoria</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>2024-05-10</TableCell>
            <TableCell>Faktura #123</TableCell>
            <TableCell>+500 PLN</TableCell>
            <TableCell>Przychód</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>2024-05-09</TableCell>
            <TableCell>Zakup materiałów</TableCell>
            <TableCell>-200 PLN</TableCell>
            <TableCell>Koszty</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  </>
);

export default Transactions;
