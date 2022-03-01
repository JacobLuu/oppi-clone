import { URL_POLL } from "../constants/apiHosts";
import baseService from "./BaseService";

function getDataService(offset) {
  return baseService.get(
    `${URL_POLL}?offset=${offset}&limit=10&direction=desc&search=`
  );
}

function deletePollService(pollId) {
  return baseService.delete(`${URL_POLL}/${pollId}`);
}

export { getDataService, deletePollService };
