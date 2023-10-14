require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

const userRoutes = require("./routes/users");
const shipmentsRoutes = require("./routes/shipments");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

// RUTAS
app.use("/", userRoutes);
app.use("/", shipmentsRoutes);

// Middleware para el error 404
app.use((req, res) => {
  res.status(404).send({
    status: "Error",
    message: "Página no encontrada",
  });
});

// Middleware de gestión de errores personalizados
app.use((error, req, res, next) => {
  console.error(error);

  res.status(error.httpStatus || 500).send({
    status: "Error",
    message: error.message,
  });
});

// Start server
app.listen(process.env.APP_PORT, () => {
  console.log(`Server listening on port ${process.env.APP_PORT}`);
});
