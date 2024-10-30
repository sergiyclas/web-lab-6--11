import axios from "axios";

export default async function getCatalogItems(filter, page) {
    return axios.get(`${import.meta.env.VITE_SERVER_LINK}/api/cars`, {
        params: {
            page: page,
            ...filter
        }
    })
}