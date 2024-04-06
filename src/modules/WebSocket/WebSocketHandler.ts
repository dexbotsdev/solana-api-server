// src/modules/WebSocket/WebSocketHandler.ts
import WebSocket from 'ws';
 
export class WebSocketHandler {
  private wsServer: WebSocket.Server;
  private newpoolsubscriptions: Set<WebSocket>;
  
  constructor() {
    this.wsServer = new WebSocket.Server({ port: 8009 }); 
    this.newpoolsubscriptions = new Set();
    this.initPoolSubscriptions();
  }

  setupWebSocketServer(): WebSocket.Server {
    return this.wsServer;
  }


  sendPoolDataToSubscribers(poolData: any): void {
    this.newpoolsubscriptions.forEach((ws) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(poolData));
      }
    });
  }

  initPoolSubscriptions(): WebSocket.Server {
    
    console.log('WebSocket server Started');

    this.wsServer.on('connection', (ws) => {
      console.log('WebSocket client connected');
      
      ws.addEventListener("message",({data,type,target:ws})=>{
        try {
          const subscription = JSON.parse(data);
          if (
            subscription.method === 'newRaydiumPools' &&
            subscription.format === 'json' &&
            subscription.params === 'apiKeys'
          ) {
            console.log('Subscribed to newRaydiumPools');
            this.newpoolsubscriptions.add(ws);
          }
        } catch (error) {
          console.error('Invalid subscription message format:', error);
          ws.send('Invalid subscription message format:')
        }

        
      }) 

      ws.on('close', () => {
        console.log('WebSocket client disconnected');
        this.newpoolsubscriptions.delete(ws);
      });
    }); 

    return this.wsServer;
  }
}
