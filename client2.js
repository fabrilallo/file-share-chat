import net from 'node:net';
import fs from 'node:fs';
const client = net.createConnection({ port: 3000 }, () => {
  console.log('Connected to server!');
});

client.on('data', (data) => {
  console.log('Received data from server:', data.toString());
});

client.on('end', () => {
  console.log('Disconnected from server.');
});
