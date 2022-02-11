import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  formStyle: {
    width: 100,
    paddingLeft: 50,
  },
}));

function PollDetail() {
  const classes = useStyles();
  const [poll, setPoll] = useState();
  const [isPublic, setIsPublic] = useState();
  const ID = localStorage.getItem("ID");
  const AccessToken = localStorage.getItem("AdminAccessToken");
  const URL_DETAIL = `https://dev.oppi.live/api/admin/v1/polls/${ID}`;

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

  const { setValue, control, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      question: "",
      description: "",
      openedAt: 0,
      closedAt: 0,
      isPublicResult: false,
      resultRedirectUrl: "",
      isRequireEmail: false,
    },
  });

  const onSubmit = () => {
    return axios
    .put(URL_DETAIL, { headers: { Authorization: `Bearer ${AccessToken}` } })
    .then((response) => {
        console.log(response)
    })
    .catch((e) => console.log(e));
  };
  
  const getData = () => {
    return axios
      .get(URL_DETAIL, { headers: { Authorization: `Bearer ${AccessToken}` } })
      .then((response) => {
        setPoll(response.data);
        setIsPublic(response.data.isPublicResult);
        console.log("response :", response);
        console.log("response.data : ", response.data);
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <form className="form-style col-xl-10" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-left text-dark my-5">Poll Detail Form</h1>
      <div class="col-xl-12">
        <label for="pollName">Poll Name*</label>
        <input
          value={poll?.title}
          type="text"
          class="form-control col-xl-12"
          id="pollName"
          aria-describedby="pollName"
        />
        <small id="pollName" class="form-text text-muted text-right">
          Max 80 characters
        </small>
      </div>
      <div class="col-lg-12">
        <label for="pollQuestion">Poll Question*</label>
        <input
          value={poll?.question}
          type="text"
          class="form-control"
          id="pollQuestion"
          aria-describedby="pollQ"
        />
        <small id="pollQ" class="form-text text-muted text-right">
          Max 255 characters
        </small>
      </div>
      <div class="col-lg-12">
        <label for="exampleFormControlTextarea1">Description*</label>
        <textarea
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="10"
          value={poll?.description}
        ></textarea>
      </div>
      <div className="row my-4 col-xl-12 d-flex justify-content-start ">
        <div class="col-lg-3 ">
          <label className="mr-2">From:</label>
          <TextField
            id="date"
            label=""
            type="date"
            value={formatDate(poll?.openedAt)}
            sx={{ width: "13em", height: "1em" }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div class="col-lg-3 ">
          <label className="mr-2">To: </label>
          <TextField
            id="date"
            label=""
            type="date"
            value={formatDate(poll?.closedAt)}
            sx={{ width: "13em", height: "1em" }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
      </div>
      <div className="row col-xl-12 my-4 d-flex justify-content-between ">
        <div className="col-lg-2">
          <button
            type="submit"
            style={{ color: "white" }}
            className="b col-lg-12 col-sm-2 btn btn-warning mt-3"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};
export default PollDetail;
