import net from 'node:net';
import { randomUUID } from 'node:crypto';

// TODO: exclude who send message from broadcast
// TODO: keep client1 online after sending message

const server = net.createServer();
const usersMap = new Map();

server.on('connection', (socket) => {
  socket.id = 'user_' + randomUUID();
  usersMap.set(socket.id, socket);
  console.log('New connection!', socket.id);

  socket.on('close', () => {
    console.log('Disconnected!', socket.id);
    usersMap.delete(socket.id);
  });

  socket.on('data', (data) => {
    console.log('Received data from client: ', data.toString());

    const users = usersMap.values();

    for (const user of users) {
      user.write(data);
    }
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000.');
});
