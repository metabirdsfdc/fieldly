import axios from "axios";
import { API_BASE_URL } from "../config/api";

export const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json"
  }
});
