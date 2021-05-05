import axios from "axios";

const PROTOSHAUN_API_BASE_URL = "http://localhost:8081/parking/records";

class ProtoSeanService {
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
  }

  addRecords(protoSean) {
    return axios.post(PROTOSHAUN_API_BASE_URL, protoSean);
  }

  getRecordById(recordId) {
    return axios.get(PROTOSHAUN_API_BASE_URL + "/" + recordId);
  }

  updateRecord(protoSean, recordId) {
    return axios.put(PROTOSHAUN_API_BASE_URL + "/" + recordId, protoSean);
  }

  deleteRecord(recordId) {
    return axios.delete(PROTOSHAUN_API_BASE_URL + "/" + recordId);
  }
}

export default new ProtoSeanService();
