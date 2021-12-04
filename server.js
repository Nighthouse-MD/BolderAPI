import e from 'express';
import bodyParser from 'body-parser'; 'body-parser';
const app = e();
const port = 3001 || process.env.PORT;
import productRouter from './routes/productRoutes.js';
import productStatisticRoutes from './routes/productStatisticRoutes.js';
import productToTrackRoutes from './routes/productToTrackRoutes.js';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    console.log('ping check, alive at ' + new Date().toISOString());
    res.json({ message: 'alive' });
});

app.use('/:apiKey/productsToTrack', productToTrackRoutes);
app.use('/:apiKey/products', productRouter);
app.use('/:apiKey/productStatistics', productStatisticRoutes);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});