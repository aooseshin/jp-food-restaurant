import { sequelize } from './models';
import { ENV } from './config';
import to from 'await-to-js';
import * as express  from 'express';
import { restaurant } from './routes/restaurant';
import path = require('path');

const bodyParser = require('body-parser')

const app = express();

// app.use(express.static('public'));
app.use(bodyParser.json());

app.use('/api/restaurant', restaurant);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('public'));
    app.get(/.*/, (req, res) => res.sendFile(__dirname, '/public/index.html'))
}


app.listen({ port: ENV.PORT }, async () => {
    console.log(`🚀 Server ready at http://localhost:${ENV.PORT}`);
    let err;
    [err] = await to(sequelize.sync(
        // {force: true},
    ));

    if(err){
        console.log(err);
        console.error('Error: Cannot connect to database');
    } else {
        console.log('Connected to database');
    }
});
