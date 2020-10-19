// @flow

import WebSocket from 'ws';

/**
 * Whiteboard server
 */
export default class WhiteboardServer {
  /**
   * Constructs a WebSocket server that will respond to the given path on webServer.
   */
  constructor(webServer: http$Server | https$Server, path: string) {
    const server = new WebSocket.Server({ server: webServer, path: path + '/whiteboard' });

    server.on('connection', (connection, request) => {
      connection.on('message', (message) => {
        // Send the message to all current client connections
        server.clients.forEach((connection) => connection.send(message));
      });
    });
  }
}
