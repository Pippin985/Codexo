import express from "express";
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const configuration = new Configuration({  // changed variable name from Configuration to configuration
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);  // changed variable name from Configuration to configuration

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    res.status(200).send({
        message: 'hello from Pippins AI',
    })
});

app.post('/', async (req, res) => {
    try {
        const prompt = req.body.prompt;

        const response = await openai.createCompletion({

            model: "text-davinci-003",  // fixed the colon here
            prompt: `${prompt}`,  // fixed the colon here
            temperature: 0.7,  // fixed the colon here
            max_tokens: 3000,  // fixed the colon here
            top_p: 1,  // fixed the colon here
            frequency_penalty: 0,  // fixed the colon here
            presence_penalty: 0,  // fixed the colon here
        });

        res.status(200).send({
            bot: response.data.choices[0].text
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ error })
    }
})

app.listen(5000, () => console.log('Server is running on port http://localhost:5000'));
