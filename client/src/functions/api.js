import axios from 'axios';
const storedToken = localStorage.getItem("token");

export default axios.create({
  baseURL: `http://localhost:4000/api/`,
  headers: { authorization: "Bearer " + storedToken }
});