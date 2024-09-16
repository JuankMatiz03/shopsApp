import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const BASE_URL = "https://api.escuelajs.co/api/v1"
const BASE_TOKEN = ""

axios.interceptors.request.use((config) => {
        config.headers['accept'] = 'application/json'
        config.headers['Authorization'] = `Bearer ${BASE_TOKEN}`
        return config
    }, (error) => {
    return Promise.reject(error)
})

/**
 * fetchProducts
 */
const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        try {
            const response = await axios.get(`${BASE_URL}/products`);
            return response.data;
        }catch(err) {
            console.log("****Error fetching products***");
            throw new Error("****Error fetching products***");
        }
    }
);

/**
 * fetchProductById
 * @param id id product get
 * @returns pruduct
 */
const fetchProductById = async(id: number) => {
    try {
        const response = await axios.get(`${BASE_URL}/products/${id}`);
        return response.data;
    }catch(err) {
        console.log("****Error fetching product by ID***", id);
        throw new Error("****Error fetching product by ID***");
    }
}

export { 
    fetchProducts,
    fetchProductById
}