import * as express from 'express';
const app = express();
import * as bodyParser from 'body-parser';
 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', function (req: express.Request, res: express.Response) {
  res.send(req.body);
  console.log(req.body)
})

app.post('/', function (req: express.Request, res: express.Response) {
    res.send(req.body)
    console.log(req.body)
  })
 
app.listen(8080);