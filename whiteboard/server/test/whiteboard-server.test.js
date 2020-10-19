// @flow

import http from 'http';
import WebSocket from 'ws';
import WhiteboardServer from '../src/whiteboard-server';

let webServer;
beforeAll((done) => {
  webServer = http.createServer();
  const whiteboardServer = new WhiteboardServer(webServer, '/api/v1');
  // Use separate port for testing
  webServer.listen(3001, () => done());
});

afterAll((done) => {
  if (!webServer) return done.fail(new Error());
  webServer.close(() => done());
});

describe('WhiteboardServer tests', () => {
  test('Connection opens successfully', (done) => {
    const connection = new WebSocket('ws://localhost:3001/api/v1/whiteboard');

    connection.on('open', () => {
      connection.close();
      done();
    });

    connection.on('error', (error) => {
      done.fail(error);
    });
  });

  test('WhiteboardServer replies correctly', (done) => {
    const connection = new WebSocket('ws://localhost:3001/api/v1/whiteboard');

    connection.on('open', () => connection.send('test'));

    connection.on('message', (data) => {
      expect(data).toEqual('test');
      connection.close();
      done();
    });

    connection.on('error', (error) => {
      done.fail(error);
    });
  });
});
