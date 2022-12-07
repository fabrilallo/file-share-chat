import net from 'node:net';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// TODO: keep client online after sending message
// TODO: create a prompt in order to let the user choose the file to upload

let id = '';
const client = net.createConnection({ port: 3000 }, () => {
  console.log('Connected to server!');

  const filename = fileURLToPath(import.meta.url);
  const dirname = path.dirname(filename);

  // Open the file that we want to send to the server.
  const fileStream = fs.createReadStream(dirname + '/file.txt');

  // Pipe the file to the server through the socket connection.
  fileStream.pipe(client);
});

client.on('data', (data) => {
  console.log('Received data from server:', data.toString());

  try {
    const message = JSON.parse(data);

    if (message && typeof message === 'object') {
      if (message.id) {
        id = message.id;
      }
    }
  } catch (error) {}
});

client.on('end', () => {
  console.log('Disconnected from server.');
});
