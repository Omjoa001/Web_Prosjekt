// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import whiteboardService from './whiteboard-service';
import { Alert } from './widgets';

export class Whiteboard extends Component {
  canvas = null;
  lastPos: ?{ x: number, y: number } = null;
  subscription = null;
  connected = false;

  render() {
    return (
      <>
        <canvas
          ref={(e) => (this.canvas = e) /* Store canvas element */}
          onMouseMove={(event: SyntheticMouseEvent<HTMLCanvasElement>) => {
            // Send lines to Whiteboard server
            const pos = { x: event.clientX, y: event.clientY };
            if (this.lastPos && this.connected) {
              whiteboardService.send({ line: { from: this.lastPos, to: pos } });
            }
            this.lastPos = pos;
          }}
          width={400}
          height={400}
          style={{ border: '2px solid black' }}
        />
        <div>{this.connected ? 'Connected' : 'Not connected'}</div>
      </>
    );
  }

  mounted() {
    // Subscribe to whiteboardService to receive events from Whiteboard server in this component
    this.subscription = whiteboardService.subscribe();

    // Called when the subscription is ready
    this.subscription.onopen = () => {
      this.connected = true;
    };

    // Called on incoming message
    this.subscription.onmessage = (message) => {
      if (this.canvas) {
        const context = this.canvas.getContext('2d');
        context.beginPath();
        context.moveTo(message.line.from.x, message.line.from.y);
        context.lineTo(message.line.to.x, message.line.to.y);
        context.closePath();
        context.stroke();
      }
    };

    // Called if connection is closed
    this.subscription.onclose = (code, reason) => {
      this.connected = false;
      Alert.danger('Connection closed with code ' + code + ' and reason: ' + reason);
    };

    // Called on connection error
    this.subscription.onerror = (error) => {
      this.connected = false;
      Alert.danger('Connection error: ' + error.message);
    };
  }

  // Unsubscribe from whiteboardService when component is no longer in use
  beforeUnmount() {
    whiteboardService.unsubscribe(this.subscription);
  }
}
