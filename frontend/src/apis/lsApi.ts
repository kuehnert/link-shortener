import axios from "axios";

const lsApi = axios.create({
  baseURL:
    process.env.REACT_APP_LINK_SHORTENER_ENDPOINT ||
    "http://localhost:5000/rest"
});

export default lsApi;
