import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import cors from 'cors';
import * as process from 'process';
import { RegisterRoutes } from './routes/routes';
import { saveChunkFiles } from './utils/UploadedFileHandler';

require('dotenv').config();

const app = express();
const port = process.env.REST_API_PORT_NO;
const url = process.env.REST_API_ROOT_URL;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const upload = multer({ dest: 'uploads/' });
app.post('/tsfile/upload', upload.single('file'), async (req, res, next) => {
  const { originalName, chunkNumber } = req.body;
  if (!req.file) return res.status(400).send({ message: 'Uploaded file is missing' });
  await saveChunkFiles(originalName, chunkNumber, req.file);
  res.send({ message: 'Your chunk file uploaded successfully' });
});

RegisterRoutes(app);

app.listen(port, () => {
  console.log(`Server running on ${url}:${port}`);
});
