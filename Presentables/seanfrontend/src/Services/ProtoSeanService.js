import axios from "axios";

const PROTOSAUN_API_BASE_URL = "http://localhost:8080/parking/records";

class ProtoSeanService {
  getRecords() {
    return axios.get(PROTOSAUN_API_BASE_URL);
  }

  addRecords(protoSean) {
    return axios.post(PROTOSAUN_API_BASE_URL, protoSean);
  }

  getRecordById(recordId) {
    return axios.get(PROTOSAUN_API_BASE_URL + "/" + recordId);
  }

  upadateRecord(protoSean, recordId) {
    return axios.put(PROTOSAUN_API_BASE_URL + "/" + recordId, protoSean);
  }

  deleteRecord(recordId) {
    return axios.delete(PROTOSAUN_API_BASE_URL + "/" + recordId);
  }
}

export default new ProtoSeanService();
