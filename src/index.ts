import * as express from 'express';
const app = express();
import * as bodyParser from 'body-parser';
 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', function (req: express.Request, res: express.Response) {
  res.send("Hello world");
  console.log(req.body)
})

app.post('/message', function (req: express.Request, res: express.Response) {
    res.send(req.body)
    console.log(req.body)
  })
 
app.listen(process.env.PORT||3000);