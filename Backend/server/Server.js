import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ecommerce",
      version: "1.0.0",
      description: "API documentation for the Tinder platform",
    },
    servers: [
      { url: process.env.BACKEND_URL || "http://localhost:4000/api" } // ✅ backend URL
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "token"
        }
      }
    },
    security: [{ cookieAuth: [] }]
  },
  apis: ["./routes/*.js"], 
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;