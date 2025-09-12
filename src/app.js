import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';


const app = express();
const PORT = process.env.PORT||3001;
const connection = mongoose.connect(`mongodb+srv://LuisaG:6Cw9q0dhFm4ogrSA@cluster0.k7udovs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)

app.use(express.json());
app.use(cookieParser());

import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Adoptme",
            version: "1.0.0",
            description: "API-REST Adoptme",
        },
        servers: [
            {
                url: "http://localhost:3001",
                description: "Desarrollo",
            },
            {
                url: "http://localhost:8080",
                description: "Producción",
            },
        ],
    },
    apis: ["./src/docs/*.yaml"]
};
const swaggerDocs = swaggerJSDoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/api/mocks', mocksRouter);

app.get('/', (req, res) => {
    const style = `
        <style>
            body { font-family: Arial, sans-serif; }
            h1 { color: #333; }
            p { color: #555; }
        </style>
    `;
    const content = `
        <h1>Welcome to the AdoptMe API</h1>
        <p>Use the endpoints to manage users, pets, adoptions, and sessions.</p>
    `;
    res.send(`${style}${content}`);
});

app.listen(PORT,()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
});
