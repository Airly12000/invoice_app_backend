const express = require("express");
const path = require("path");
const cors = require("cors");
const Invoices = require("./routes/Invoices");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Express Routes
app.use("/api/invoices", Invoices);

// app.use(express.static('dist'));
// const pathResolve = (req, res) => {
// 	res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
// };

// // React App Routes
// app.get('/', pathResolve);
// app.get('/invoice/:id', pathResolve);
// app.get('*', pathResolve);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Sever running on port ${PORT}`));
