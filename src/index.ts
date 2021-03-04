import * as express from 'express';
const app = express();
import * as bodyParser from 'body-parser';
import * as path from 'path';
import { User, UserService } from './UserService';
import { Message, MessageService } from './MessageService';
import { ServiceError } from './Model';

const userService = new UserService();
const messageService = new MessageService();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, '../static')));

// =================================   MESSAGES   =================================
app.post('/api/messages', async (req: express.Request, res: express.Response, next:express.NextFunction) => {
  console.info(req.body);
  const message = req.body as Message;
  // TODO validation?
  const saved = await messageService.set(message).catch(next);
  return res.status(200).json(saved);
});


app.get('/api/messages/:id', async (req: express.Request, res: express.Response, next:express.NextFunction) => {
  const messageId = req.params.id
  const message = await messageService.get(messageId).catch(next);
  return res.status(message ? 200 : 404).json(message);;
});


app.get('/api/messages', async (req: express.Request, res: express.Response, next:express.NextFunction) => {
  console.info(req.query);
  const from = req.query.from as string;
  const to = req.query.to as string;
  const result = await messageService.list(from, to).catch(next);
  res.status(200);
  res.json(result);
});


// =================================   USERS   =================================

app.post('/api/users', async (req: express.Request, res: express.Response, next:express.NextFunction) => {
  console.info(req.body);
  const user = req.body as User;
  // TODO validation?
  const saved = await userService.set(user).catch(next);
  res.status(200);
  res.json(saved);
});

app.get('/api/users/:id', async (req: express.Request, res: express.Response, next:express.NextFunction) => {
  const userId = req.params.id
  const user = await userService.get(userId).catch(next);
  res.status(user ? 200 : 404);
  res.json(user);
});

// app.put('/api/users/:id', async (req: express.Request, res: express.Response) => {
//   const userId = req.params.id
//   const user = await userService.get(userId);
//   if(!user){
//     res.status(404);
//     res.json(undefined);
//   }
//   const user = userService.set(user);
//   res.status(200);
// });

app.get('/api/users', async (_req: express.Request, res: express.Response, next:express.NextFunction) => {
  const users = await userService.list().catch(next);
  res.status(200);
  res.json(users);
});



app.use((error:Error, _req: express.Request, res: express.Response, _next:express.NextFunction) => {
  if(error){
    if(error instanceof ServiceError){
      return res.status(error.code).json({ error })
    } else {
      return res.status(500).json({ error })
    }
  }
  return res.status(500).json({ error })
  }
);

app.listen(process.env.PORT || 3000);

