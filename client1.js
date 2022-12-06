import net from 'node:net';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

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
  console.log('Received data from server:', data);
});

client.on('end', () => {
  console.log('Disconnected from server.');
});
