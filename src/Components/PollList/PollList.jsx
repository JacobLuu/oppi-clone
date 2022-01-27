import * as React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    borderRadius: 15,
    margin: "10px 10px",
    maxWidth: 950,
  },
  tableHeaderCell: {
    fontWeight: "bold",
    backgroundColor: "#63c2de",
    color: "blue",
    textAlign: "center",
  },
  status: {
    fontWeight: "bold",
    fontSize: "0.3rem",
    borderRadius: 8,
    padding: "3px 10px",
    display: "inline-block",
  },
}));

function createData(
  poll_name,
  poll_question,
  start_date,
  end_date,
  participants,
  status,
  action
) {
  return {
    poll_name,
    poll_question,
    start_date,
    end_date,
    participants,
    status,
    action,
  };
}

const rows = [
  createData(
    "Frozen yoghurt",
    "Why so hot?",
    "26/01/2021",
    "26/01/2021",
    1,
    "LIVE"
  ),
  createData(
    "Ice cream sandwich",
    "Why so hot?",
    "26/01/2021",
    "26/01/2021",
    0,
    "CREATE"
  ),
  createData("Eclair", "Why so hot?", "26/01/2021", "26/01/2021", 1, "ENDED"),
  createData("Cupcake", "Why so hot?", "26/01/2021", "26/01/2021", 1, "LIVE"),
  createData(
    "Gingerbread",
    "Why so hot?",
    "26/01/2021",
    "26/01/2021",
    1,
    "LIVE"
  ),
];

const PollList = () => {
  const classes = useStyles();
  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderCell}>Poll Name</TableCell>
            <TableCell className={classes.tableHeaderCell}>
              Poll Question
            </TableCell>
            <TableCell className={classes.tableHeaderCell}>
              Start Date
            </TableCell>
            <TableCell className={classes.tableHeaderCell}>End Date</TableCell>
            <TableCell className={classes.tableHeaderCell}>
              Participants
            </TableCell>
            <TableCell className={classes.tableHeaderCell}>Status</TableCell>
            <TableCell className={classes.tableHeaderCell}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.poll_name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.poll_name}
              </TableCell>
              <TableCell>{row.poll_question}</TableCell>
              <TableCell>{row.start_date}</TableCell>
              <TableCell>{row.end_date}</TableCell>
              <TableCell>{row.participants}</TableCell>
              <TableCell
                className={classes.status}
                style={{
                  backgroundColor:
                    (row.status === "LIVE" && "#ffc2c2") ||
                    (row.status === "CREATE" && "#99ff99") ||
                    (row.status === "ENDED" && "#c1c0c0"),
                  color:
                    (row.status === "LIVE" && "#ff4141") ||
                    (row.status === "CREATE" && "#006622") ||
                    (row.status === "ENDED" && "#000000"),
                }}
              >
                {row.status}
              </TableCell>
              <TableCell>
                {row.action}
                <Button variant="outlined" startIcon={<DeleteIcon />}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PollList;
