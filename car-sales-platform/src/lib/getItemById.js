import axios from "axios";

export default async function getCarById(id) {
    return axios.get(`${import.meta.env.VITE_SERVER_LINK}/api/cars/${id}`)
}