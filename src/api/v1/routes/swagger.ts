import express from "express";
import swaggerJSDoc, { Options } from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerRoute = express.Router();

const options: Options = {
  definition: {
    info: {
      title: "Bar/Resto Management Bn",
      version: "1.0.0",
      description:
        "This The Version 1.0.0 Documentation of the Bar/Resto Management System",
      contact: {
        name: "ZenDev Lab",
        url: "https://github.com/ZenDev-Lab",
      },
      license: {
        name: "MIT",
        url: "https://www.mit.edu/~amini/LICENSE.md",
      },
    },
    openapi: "3.0.0",
    servers: [
      {
        url: "http://localhost:4000/api/v1",
      },
    ],
  },
  apis: ["./src/api/v1/documentations/*yaml"],
};
const swaggerSpec = swaggerJSDoc(options);

swaggerRoute.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default swaggerRoute;
