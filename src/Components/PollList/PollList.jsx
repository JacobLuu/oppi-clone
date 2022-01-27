import * as React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  tableContainer: {
    borderRadius: 15,
    margin: "10px 10px",
    maxWidth: 1000,
  },
  tableHeaderCell: {
    fontWeight: "bold",
    backgroundColor: "#63c2de",
    color: "blue",
    textAlign: "center",
  },
  status: {
    fontWeight: "bold",
    fontSize: "0.75rem",
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
  createData(
    "Eclair",
    "Today is not saturday. We can not go to hometown",
    "26/01/2021",
    "26/01/2021",
    1,
    "ENDED"
  ),
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

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderCell}>Poll Name</TableCell>
            <TableCell
              className={classes.tableHeaderCell}
              sx={{ minWidth: 200 }}
            >
              Poll Question
            </TableCell>
            <TableCell className={classes.tableHeaderCell}>
              Start Date
            </TableCell>
            <TableCell className={classes.tableHeaderCell}>End Date</TableCell>
            <TableCell className={classes.tableHeaderCell}>
              Participants
            </TableCell>
            <TableCell align="center" className={classes.tableHeaderCell}>
              Status
            </TableCell>
            <TableCell align="center" className={classes.tableHeaderCell}>
              Action
            </TableCell>
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
              <TableCell align="center">{row.participants}</TableCell>
              <TableCell align="center">
                <Typography
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
                </Typography>
              </TableCell>
              <TableCell>
                {row.action}
                <Button
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  onClick={handleClickOpen}
                >
                  Delete
                </Button>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title" align="center">
                    <Box
                      component="img"
                      sx={{
                        height: 400,
                        width: 250,
                        maxHeight: { xs: 400, md: 170 },
                        maxWidth: { xs: 250, md: 200 },
                      }}
                      alt=""
                      src="https://admin.dev.oppi.live/static/media/img_decision.97fcdb38.png"
                    />
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description" align="center">
                      Are you sure you would like to delete this poll? Once
                      deleted, it cannot be retrieved.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={handleClose}
                      variant="outlined"
                      color="primary"
                    >
                      Keep Poll
                    </Button>
                    <Button
                      onClick={handleClose}
                      autoFocus
                      variant="outlined"
                      color="error"
                    >
                      Delete
                    </Button>
                  </DialogActions>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PollList;
