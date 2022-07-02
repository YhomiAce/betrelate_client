const express = require('express');
const Cors = require("cors");
const connectDB = require('./config/db');


const app = express();
connectDB();

// Init middleware
app.use(Cors());
app.use(express.json({ extend: false }));
if (process.env === "development") {
    app.use(require("morgan"))
}

app.get('/', (req, res) => res.send('Betrelate Client Api running'));

app.use("/api/client", require("./routes"));


// Handles all errors
app.use((err, req, res, next) => {
    try {
        if (process.env.NODE_ENV === "production") {
            console.log("Betrelate-Client-error-logs", err);
            if (err.status === 412) {
                return res
                    .status(err.status)
                    .send({ success: false, message: err.message });
            }
            return res
                .status(err.status || 400)
                .send({ success: false, message: "An error occur" });
        }
        console.log("Betrelate-Client-error-logs", err);
        return res
            .status(err.status || 400)
            .send({ success: false, message: err.message, err });
    } catch (error) {
        return res
            .status(error.status || 400)
            .send({ success: false, message: error.message });
    }
});

// Not found route
app.use((req, res) => {
    return res.status(404).send({ success: false, message: "Route not found" });
});


const PORT = process.env.PORT || 7000;

app.listen(PORT, () => console.log(`Server started on Port: ${PORT}`));