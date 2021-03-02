import * as express from 'express';
const app = express();
import * as bodyParser from 'body-parser';
import * as path from 'path';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, '../static')))

app.post('/message', function (req: express.Request, res: express.Response) {
    res.send(req.body)
    console.log(req.body)
  })

app.listen(process.env.PORT||3000);

