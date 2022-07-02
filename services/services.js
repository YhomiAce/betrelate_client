require("dotenv").config();
const axios = require("axios");

const Service = {
    Book: {
        url: process.env.ADMIN_URL,
        async getAllBooks(query = null) {
            try {
                const url = `${this.url}/books/available`;
                const headers = { accept: "application/json" };
                const response = await axios.get(url, { headers });
                console.log(response.data);
                return response.data.data;
            } catch (error) {
                console.log(error);
                const externalError = new Error(error.response.data.message);
                externalError.status = error.response.status;
                throw externalError;
            }
        },
        async findBookById(bookId) {
            try {
                const url = `${this.url}/book/${bookId}`;
                const headers = { accept: "application/json" };
                const response = await axios.get(url, { headers });
                console.log(response.data);
                return response.data;
            } catch (error) {
                console.log(error);
                const externalError = new Error(error.response.data.message);
                externalError.status = error.response.status;
                throw externalError;
            }
        },      
        async updateBookAvailability(bookId, payload) {
            try {
                const url = `${this.url}/book/${bookId}`;
                const headers = { accept: "application/json" };
                const response = await axios.patch(url, payload, { headers });
                console.log(response.data);
                return response.data;
            } catch (error) {
                console.log(error);
                const externalError = new Error(error.response.data.message);
                externalError.status = error.response.status;
                throw externalError;
            }
        }        
    },
};

module.exports = Service