import { Client, IFrame, IMessage } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

class ActiveMQService {
  private client: Client;

  constructor() {
    this.client = new Client({
      brokerURL: 'ws://localhost:61614/stomp',
      connectHeaders: {
        login: 'admin',
        passcode: 'admin',
      },
      debug: (str) => {
        // if (str.includes('PING') || str.includes('PONG')) return;
        // console.info(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    this.client.onConnect = this.onConnect.bind(this);
    this.client.onStompError = this.onError.bind(this);
  }

  public activate() {
    this.client.activate();
  }

  private onConnect(frame: any) {
    console.info('Connected to ActiveMQ:', frame);
  }

  private onError(frame: IFrame) {
    const error = frame.body as unknown;
    console.error('STOMP Error:', error);
  }

  public sendMessage(queue: string, message: string) {
    if (this.client.connected) {
      this.client.publish({ destination: `/queue/${queue}`, body: message });
      console.info(`Message sent to queue ${queue}: ${message}`);
    } else {
      console.warn('STOMP client is not connected. Queuing message.');
    }
  }
}

export default new ActiveMQService();
