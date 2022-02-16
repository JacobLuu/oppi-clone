import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  formStyle: {
    backgroundColor: '#ecf5fd',
    margin: 'auto',
    width: '80%',
    padding: '0 15px',
    borderRadius: '2.5rem',
    boxShadow: '0 5px 15px rgb(0,0,0,0.2)',
}}));

function PollDetail() {
  const classes = useStyles();
  const [poll, setPoll] = useState();
  const ID = localStorage.getItem("ID");
  const AccessToken = localStorage.getItem("AdminAccessToken");
  const URL_DETAIL = `https://dev.oppi.live/api/admin/v1/polls`;
  const params = useParams();

  const formatDate = (second, format) => {
    let time = new Date(second * 1000);
    let day = String(time.getDate()).padStart(2, "0");
    let month = String(time.getMonth() + 1).padStart(2, "0");
    let year = time.getFullYear();
    return `${year}-${month}-${day}`;
  };
  const { setValue, control, handleSubmit, register } = useForm({});

  const onSubmit = (data) => {
    if (data.title && data.question && data.description) {
      const dataSend = {
        ...poll,
        name: data.title.trim(),
        question: data.question.trim(),
        description: data.description.trim(),
        is_turn_on_intergration_setting: true,
        passcode: "2123124",
      };
      axios({
        method: "put",
        url: `${URL_DETAIL}/${params.pollId}`,
        headers: { Authorization: `Bearer ${AccessToken}` },
        data: dataSend,
      })
        .then(alert("Done !\nInformation updated"), getData())
        .catch((e) => alert(e));
    }
  };

  const getData = () => {
    return axios
      .get(`${URL_DETAIL}/${params.pollId}`, {
        headers: { Authorization: `Bearer ${AccessToken}` },
      })
      .then((response) => {
        setValue("title", response.data.title);
        setValue("question", response.data.question);
        setValue("description", response.data.description);
        setValue("openedAt", formatDate(response.data.openedAt));
        setValue("closedAt", formatDate(response.data.closedAt));
        setPoll(response.data);
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className={classes.formStyle}>
      <form className="col-xl-12" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-left text-dark my-5">Poll Detail Form</h1>
        <div className="col-xl-12">
          <label htmlFor="pollName">Poll Name*</label>
          <input
            type="text"
            className="form-control col-xl-12"
            id="pollName"
            aria-describedby="pollName"
            {...register("title")}
          />
          <div>
            <small
              style={{ float: "right" }}
              id="pollName"
              className="form-text text-muted text-right"
            >
              Max 80 characters
            </small>
          </div>
        </div>
        <div className="col-lg-12">
          <label htmlFor="pollQuestion">Poll Question*</label>
          <input
            name="question"
            type="text"
            className="form-control"
            id="pollQuestion"
            aria-describedby="pollQ"
            {...register("question")}
          />
          <div>
            <small
              style={{ float: "right" }}
              id="pollQ"
              className="form-text text-muted text-right"
            >
              Max 255 characters
            </small>
          </div>
        </div>
        <div className="col-lg-12">
          <label htmlFor="exampleFormControlTextarea1">Description*</label>
          <textarea
            name="description"
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="10"
            {...register("description")}
          ></textarea>
          <div>
            <small
              style={{ float: "right" }}
              id="pollName"
              className="form-text text-muted text-right"
            >
              Max 999 characters
            </small>
          </div>
        </div>
        <div className="row my-4 col-xl-12 d-flex justify-content-start ">
          <div className="col-lg-5 ">
            <label className="mr-2">From:</label>
            <TextField
              name="openedAt"
              id="date"
              label=""
              type="date"
              sx={{ width: "13em", height: "1em" }}
              InputLabelProps={{
                shrink: true,
              }}
              {...register("openedAt")}
            />
          </div>
          <div className="col-lg-5 ">
            <label className="mr-2">To: </label>
            <TextField
              name="closedAt"
              id="date"
              label=""
              type="date"
              sx={{ width: "13em", height: "1em" }}
              InputLabelProps={{
                shrink: true,
              }}
              {...register("closedAt")}
            />
          </div>
        </div>
        <div className="row col-xl-12 my-4 d-flex justify-content-between ">
          <div className="">
            <button
              type="submit"
              style={{ color: "white", width:"17%",float:"right"}}
              className="b col-lg-12 col-sm-2 btn btn-warning mt-3"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
export default PollDetail;
