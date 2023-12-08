const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const app = express();
app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });
// Cấu hình middleware
app.use(express.json()); // Cho phép xử lý dữ liệu dạng JSON trong yêu cầu




// Kết nối tới cơ sở dữ liệu MongoDB
mongoose.connect("mongodb://localhost:27017/uwb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const swaggerDocument = YAML.load('./swagger.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Import và sử dụng các tuyến đường (routes)
const deviceRoutes = require('./Routes/deviceRoute')
const localizationRoutes = require('./Routes/localizationRoute')
const operationRoutes = require('./Routes/operationRoute')

app.use("/operation",operationRoutes)
app.use("/localizations",localizationRoutes)
app.use("/devices",deviceRoutes)

// Xử lý tuyến đường mặc định
app.get("/", (req, res) => {
  res.send("Hello, this is the backend!");
});

// Khởi chạy server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
