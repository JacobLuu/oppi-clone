import { URL_POLL } from "../constants/apiHosts";
import baseService from "./BaseService";

export function fetchDataPollDetail(id) {
  return baseService.get(`${URL_POLL}/${id}`);
}

export function updatePoll({ pollId, dataUpdate }) {
  return baseService.put(`${URL_POLL}/${pollId}`, dataUpdate);
}
