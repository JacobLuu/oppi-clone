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
import Pagination from "@mui/material/Pagination";
import NavBar from "../../NavBar/NavBar";

const useStyles = makeStyles((theme) => ({
  Container: {
    backgroundColor: "#fff",
    margin: "auto",
    width: "80%",
    borderRadius: "2.5rem",
    boxShadow: "0 5px 15px rgb(0,0,0,0.2)",
    padding: "40px 0",
  },
  tableTitle: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#6c757d",
  },
  tableContainer: {
    width: "100%",
  },
  tableHeaderCell: {
    fontWeight: "bold",
    backgroundColor: "#fff",
    color: "blue",
    textAlign: "center",
  },
  status: {
    fontWeight: "bold",
    fontSize: "0.75rem",
    borderRadius: "20px",
    padding: "3px 10px",
    display: "inline-block",
  },
}));

const PollList = () => {
  const classes = useStyles();
  const [offset, setOffset] = useState(0);
  const [polls, setPolls] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedID, setSelectedID] = useState();
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const URL = `https://dev.oppi.live/api/admin/v1/polls?offset=${offset}&limit=10&direction=desc&search=`;
  const SIGNOUT_URL = "https://dev.oppi.live/api/admin/v1/auth/signout";
  const DEL_URL = "https://dev.oppi.live/api/admin/v1/polls";

  // delete function
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleClickOpen = (id) => {
    setIsDeleteModalOpen(true);
    setSelectedID(id);
  };

  const handleClose = () => {
    setIsDeleteModalOpen(false);
  };

  const deletePoll = async (id) => {
    return await axios
      .delete(`${DEL_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AdminAccessToken")}`,
        },
      })
      .then((respon) => console.log(respon))
      .catch((e) => console.log(e));
  };

  const handleDelete = async (id) => {
    await deletePoll(id);
    getData();
    setIsDeleteModalOpen(false);
  };

  //Pagination
  const handleChangePage = (page) => {
    setCurrentPage(page);
    setOffset((page - 1) * 10);
  };

  // format date
  const formatDate = (second, format) => {
    let time = new Date(second * 1000);
    let day = String(time.getDate()).padStart(2, "0");
    let month = String(time.getMonth() + 1).padStart(2, "0");
    let year = time.getFullYear();
    if (format && format.format === "YYYY-MM-DD") {
      return `${year}-${month}-${day}`;
    }
    return `${day}-${month}-${year}`;
  };

  const openDetail = (id) => {
    navigate(`/polldetail/${id}`);
  };

  // get data
  const getData = async () => {
    const AccessToken = localStorage.getItem("AdminAccessToken");
    try {
      const response = await axios.get(URL, {
        headers: { Authorization: `Bearer ${AccessToken}` },
      });
      const data = response.data.list;
      console.log(data);

      setPolls(data);
      const pages = response.data.totalCount;
      pages % 10 === 0
        ? setPage(pages / 10)
        : setPage((pages - (pages % 10)) / 10 + 1);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getData();
  }, [offset]);

  return (
    <React.Fragment>
      <NavBar />
      <div className={classes.Container}>
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table sx={{ maxWidth: "100%" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHeaderCell}>
                  Poll Name
                </TableCell>
                <TableCell
                  className={classes.tableHeaderCell}
                  sx={{ minWidth: 200 }}
                >
                  Poll Question
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Start Date
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  End Date
                </TableCell>
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
              {polls.map((poll) => (
                <TableRow
                  key={poll.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  onClick={(e) => {
                    e.stopPropagation();
                    openDetail(poll.id);
                  }}
                >
                  <TableCell component="th" scope="row">
                    {poll.title}
                  </TableCell>
                  <TableCell>{poll.question}</TableCell>
                  <TableCell>{formatDate(poll.openedAt)}</TableCell>
                  <TableCell>{formatDate(poll.closedAt)}</TableCell>
                  <TableCell align="center">{poll.participantCount}</TableCell>
                  <TableCell align="center">
                    <Typography
                      className={classes.status}
                      style={{
                        backgroundColor:
                          (poll.status === "live" && "#ffc2c2") ||
                          (poll.status === "created" && "#ffd597") ||
                          (poll.status === "ended" && "#c1c0c0"),
                        color:
                          (poll.status === "live" && "#ff4141") ||
                          (poll.status === "created" && "#a36200") ||
                          (poll.status === "ended" && "#000000"),
                      }}
                    >
                      {poll.status}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClickOpen(poll.id);
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div style={{ margin: "auto", padding: "15px 0px" }}>
        <Pagination
          count={page}
          variant="outlined"
          shape="rounded"
          onChange={(e, page) => handleChangePage(page)}
        />
      </div>

      <Dialog
        open={isDeleteModalOpen}
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
            Are you sure you would like to delete this poll? Once deleted, it
            cannot be retrieved.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="primary">
            Keep Poll
          </Button>
          <Button
            onClick={() => handleDelete(selectedID)}
            autoFocus
            variant="outlined"
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default PollList;
