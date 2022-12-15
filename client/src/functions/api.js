import axios from 'axios';
const storedToken = localStorage.getItem("token");

export default axios.create({
  baseURL: `http://localhost:4000/api/`,
  headers: { authorization: "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzg3Yjc0NmNkNDFlNTkwMmJlY2VmNjgiLCJ1c2VyVHlwZSI6ImFkbWluIiwiaWF0IjoxNjY5ODM4NjYyfQ.6m7LehsY9YT9xRPd0yU57u_5SCvsAlvNnDeHryyWYfo" }
});