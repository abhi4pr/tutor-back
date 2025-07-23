import swaggerJSDoc from "swagger-jsdoc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "NodeApp API",
      version: "1.0.0",
      description: "Documentation for NodeApp APIs",
    },
    servers: [{ url: "http://localhost:5000" }],
  },
  apis: [path.join(__dirname, "./docs/*.yaml")],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
