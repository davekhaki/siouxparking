import axios from "axios";

const PROTOSAUN_API_BASE_URL = "http://localhost:8080/parking/records";

class ProtoSeanService {
<<<<<<< Updated upstream
  getRecords() {
    return axios.get(PROTOSAUN_API_BASE_URL);
=======
  getRecords(keyword, type) {
    const params = {}
    if (type) {
      params.type = type;
    }
    if (keyword) {
      params.keyword = keyword;
    }
    return axios.get(PROTOSHAUN_API_BASE_URL, {
      params
    });
>>>>>>> Stashed changes
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
