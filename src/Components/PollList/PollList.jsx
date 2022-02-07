import * as React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  tableTitle:{
    textAlign: "center",
    fontWeight: "bold",
    color:"#6c757d",
  },
  tableContainer: {
    borderRadius: 15,
    margin: "15px 170px",
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

// function createData(
//   poll_name,
//   poll_question,
//   start_date,
//   end_date,
//   participants,
//   status,
//   action
// ) {
//   return {
//     poll_name,
//     poll_question,
//     start_date,
//     end_date,
//     participants,
//     status,
//     action,
//   };
// }

const rows = [
  
];

const PollList = () => {
  const classes = useStyles();
  const [openLogOut, setOpenLogOut] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [offset, setOffset] = useState(0);
  const [polls, setPolls] = useState([]);
  const [selectedID,setSelectedID] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const URL = `https://dev.oppi.live/api/admin/v1/polls?offset=${offset}&limit=10&direction=desc&search=`;
  const SIGNOUT_URL = "https://dev.oppi.live/api/admin/v1/auth/signout";
  const DEL_URL = "https://dev.oppi.live/api/admin/v1/polls";
  
  const [open, setOpen] = React.useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  const openDetail = async (id) => {
    getDetail(id);
    await navigate("/polldetail");
  };

  const getDetail = (id) =>{
    localStorage.setItem('ID',id);
  }
  
  const getData = async () => {
    const AccessToken = localStorage.getItem("AdminAccessToken");
    try {
      const response = await axios.get(URL, { headers: { Authorization: `Bearer ${AccessToken}` } });
      const data = response.data.list;
      // xử lý data đẩy từ serve về
      
      setPolls(data);
      const pages = response.data.totalCount;
      pages % 10 === 0
        ? setPage(pages / 10)
        : setPage((pages - (pages % 10)) / 10 + 1);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(()=>{
    getData()
  },[])

  return (
    <Typography gutterBottom variant="h3" component="div" className={classes.tableTitle}>
          Poll Management
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
            <TableCell 
             className={classes.tableHeaderCell}>
              Start Date
            </TableCell>
            <TableCell 
             className={classes.tableHeaderCell}>End Date</TableCell>
            <TableCell 
             className={classes.tableHeaderCell}>
              Participants
            </TableCell>
            <TableCell  align="center" className={classes.tableHeaderCell}>
              Status
            </TableCell>
            <TableCell  align="center" className={classes.tableHeaderCell}>
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {polls.map((row) => (
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
                      alt="delete-poll-image"
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
    </Typography>
  );
};

export default PollList;
