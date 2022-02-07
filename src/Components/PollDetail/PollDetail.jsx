import { useForm } from "react-hook-form";
import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function PollDetail() {
  const idPollDetail = sessionStorage.getItem("idPollDetail");
  const accessToken = sessionStorage.getItem("AdminAccessToken");

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

  const [data, setData] = useState({
    poll_name: "",
    poll_question: "",
    start_date: "",
    end_date: "",
  });

  const [poll, setPolls] = useState();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    const fieldName = data.target.getAttribute("name");
    const fieldValue = data.target.value;

    const newData = { ...data };
    newData[fieldName] = fieldValue;

    setData(newData);

    const newPoll = {
      poll_name: data.poll_name,
      poll_question: data.poll_question,
      start_date: data.start_date,
      end_date: data.end_date,
    };

    axios({
      method: "put",
      url: `https://dev.oppi.live/api/admin/v1/polls/${idPollDetail}`,
      headers: {
        Authorization: `Bearer  ${accessToken}`,
      },
    });
    setPolls(newPoll);
  };
  
  useEffect(() => {
    axios
      .get(`${"https://dev.oppi.live/api/admin/v1/polls"}/${idPollDetail}`, {
        headers: {
          Authorization: `Bearer  ${accessToken}`,
        },
      })
      .then((respon) => {
        if (respon.status === 200) {
          setPolls(respon.data);
          data.forEach((field) => {
            if (field === "openedAt" || field === "closedAt") {
              setValue(
                field,
                formatDate(respon.data[field], { format: "YYYY-MM-DD" })
              );
            } else
              setValue(field, respon.data[field] ? respon.data[field] : "");
          });
        }
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="row justify-content-sm-center pt-5">
      <div className="col-sm-6 shadow round pb-3">
        <h1 className="text-center pt-3 text-secondary">Poll Detail</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label className="col-form-label">Poll Name*</label>
            <input
              type="text"
              name="poll_name"
              className={`form-control  ${errors.name && "invalid"}`}
              {...register("name", { required: "Poll Name is Required" })}
              onKeyUp={() => {
                trigger("name");
              }}
              onChange={handleSubmit}
            />
            {errors.name && (
              <small className="text-danger">{errors.name.message}</small>
            )}
          </div>
          <div className="form-group">
            <label className="col-form-label">Poll Question*</label>
            <input
              type="text"
              name="poll_question"
              className={`form-control ${errors.question && "invalid"}`}
              {...register("question", {
                required: "Poll Question is Required",
              })}
              onKeyUp={() => {
                trigger("question");
              }}
              onChange={handleSubmit}
            />
            {errors.question && (
              <small className="text-danger">{errors.question.message}</small>
            )}
          </div>
          <div className="form-group">
            <label className="col-form-label">Description*</label>
            <textarea
              name="description"
              className={`form-control ${errors.message && "invalid"}`}
              {...register("message", {
                required: "Message is Required",
                maxLength: {
                  value: 999,
                  message: "Max 999 characters ",
                },
              })}
              onKeyUp={() => {
                trigger("message");
              }}
              onChange={handleSubmit}
            ></textarea>
            {errors.message && (
              <small className="text-danger">{errors.message.message}</small>
            )}
          </div>
          <div className="form-group">
            <label className="col-form-label">Start Date:</label>
            <input
              name="start_date"
              type="date"
              className={`form-control ${errors.date && "invalid"}`}
              {...register("start_date", {
                required: "Start Date is Required",
              })}
              onKeyUp={() => {
                trigger("start_date");
              }}
              onChange={handleSubmit}
            />
            {errors.date && (
              <small className="text-danger">{errors.date.message}</small>
            )}
          </div>
          <div className="form-group">
            <label className="col-form-label">End Date:</label>
            <input
              name="end_date"
              type="date"
              className={`form-control ${errors.date && "invalid"}`}
              {...register("end_date", { required: "End Date is Required" })}
              onKeyUp={() => {
                trigger("end_date");
              }}
              onChange={handleSubmit}
            />
            {errors.date && (
              <small className="text-danger">{errors.date.message}</small>
            )}
          </div>
          <input
            type="submit"
            className="btn btn-primary my-3"
            value="Submit"
          />
        </form>
      </div>
    </div>
  );
}

export default PollDetail;
