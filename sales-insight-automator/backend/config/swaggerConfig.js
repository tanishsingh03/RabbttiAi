const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Sales Insight Automator API",
            version: "1.0.0",
            description:
                "API documentation for the Sales Insight Automator prototype. " +
                "This scaffold demonstrates the intended architecture for an AI-powered " +
                "sales data analysis service. AI processing and email delivery are not " +
                "implemented in this prototype.",
            contact: {
                name: "Engineering Team",
                email: "engineering@example.com",
            },
        },
        servers: [
            {
                url: "http://localhost:5000",
                description: "Local development server",
            },
        ],
        components: {
            securitySchemes: {
                apiKey: {
                    type: "apiKey",
                    in: "header",
                    name: "X-API-Key",
                },
            },
        },
    },
    // Glob pattern for route files containing JSDoc swagger annotations
    apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
