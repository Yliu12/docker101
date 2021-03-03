import * as express from 'express';
const app = express();
import * as bodyParser from 'body-parser';
import * as path from 'path';
import { User, UserService } from './UserService';
import { Message, MessageService } from './MessageService';

const userService = new UserService();
const messageService = new MessageService();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, '../static')));

// =================================   MESSAGES   =================================
app.post('/api/messages', async (req: express.Request, res: express.Response) => {
  console.info(req.body);
  const message = req.body as Message;
  // TODO validation?
  const saved = await messageService.set(message);
  res.status(200);
  res.send(saved);
});


app.get('/api/messages/:id', async (req: express.Request, res: express.Response) => {
  const messageId = req.params.id
  const message = await messageService.get(messageId);
  res.status(message ? 200 : 404);
  res.send(message);
});


app.get('/api/messages/user1/:user1/user2/:user2', async (req: express.Request, res: express.Response) => {
  console.info(req.params);
  const user1 = req.params.user1;
  const user2 = req.params.user2;
  const result = await messageService.list(user1, user2);
  res.status(200);
  res.send(result);
});


app.get('/api/messages/user1/:user1', async (req: express.Request, res: express.Response) => {
  console.info(req.params);
  const user1 = req.params.user1;
  const result = await messageService.list(user1);
  res.status(200);
  res.send(result);
});


// =================================   USERS   =================================

app.post('/api/users', async (req: express.Request, res: express.Response) => {
  console.info(req.body);
  const user = req.body as User;
  // TODO validation?
  const saved = await userService.set(user);
  res.status(200);
  res.send(saved);
});

app.get('/api/users/:id', async (req: express.Request, res: express.Response) => {
  const userId = req.params.id
  const user = await userService.get(userId);
  res.status(user ? 200 : 404);
  res.send(user);
});


app.get('/api/users', async (_req: express.Request, res: express.Response) => {
  const users = await userService.list();
  res.status(200);
  res.send(users);
});


app.listen(process.env.PORT || 3000);

