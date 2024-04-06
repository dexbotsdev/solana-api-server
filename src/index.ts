// src/index.ts
import express from 'express';
import { WebSocketHandler } from './modules/WebSocket/WebSocketHandler';
import { PoolRoutes } from './modules/Http/routes/PoolRoutes';
import { SolanaService } from './modules/Solana/SolanaService';
import { EventEmitter } from "ws";
import { SolanaNewPoolsService } from './modules/Solana/SolanaNewPoolsService';

const app = express();
const port = 3000; // Or any other port you prefer
const emitter = new EventEmitter();


// Initialize modules
const webSocketHandler = new WebSocketHandler();
const poolRoutes = new PoolRoutes();
const solanaNPService = new SolanaNewPoolsService();
solanaNPService.initiatePoolSubscription(emitter);

// Setup WebSocket
const wsServer = webSocketHandler.setupWebSocketServer();

// Setup HTTP routes
app.use('/pools', poolRoutes.router);
emitter.on("newRaydiumPool",(data)=>{
  console.log('Recieved',data);
  webSocketHandler.sendPoolDataToSubscribers(data);
})
// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
