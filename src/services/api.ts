import axios from "axios";

const API_URL = 'https://fedtest.bylith.com/api'

export const fetchAllProduct = async (page: number) => {
    const response = await axios.get(`${API_URL}/catalog/getAll`, {
        //   params: { page, search },
    });
    return response.data;
};


export const fetchProductById = async (id: string) => {
    const { data } = await axios.get(`${API_URL}/catalog/get?id=${id}`);
    return data
};

