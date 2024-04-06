// src/modules/Solana/SolanaService.ts
import websocket from "websocket";
import { SolanaService } from './SolanaService';
import { EventEmitter } from "ws";

export class SolanaNewPoolsService extends SolanaService {

  private client = new websocket.client();
  constructor() {
    super();

  }

  async initiatePoolSubscription(emitter: EventEmitter) {

    console.log('"You have successfully connected"');

    this.client.on("connect", (connection: any) => {
      connection.on("message", (message: { type: string; utf8Data: string; }) => {
        if (!message || message.type !== "utf8") return;
        const data = JSON.parse(message.utf8Data);
        if (data === "You have successfully subscribed") {
          return;
        }
        data.forEach(async (poolInfo: any) => {

          //console.log(poolInfo);
          emitter.emit('newRaydiumPool', JSON.stringify({
            block: poolInfo.blockId,
            blockTime: poolInfo.blockTime, 
            transactionId: poolInfo.transactionId, 
            programId: poolInfo.programId, 
            programName: poolInfo.programName, 
            ammId: poolInfo.poolAddress, 
            lpMint: poolInfo.lpTokenMint, 
            baseMint: poolInfo.mintTokenA, 
            quoteMint:poolInfo.mintTokenB 
          }));

        })
      });

      connection.sendUTF(
        JSON.stringify({
          action: "subscribe",
          apiKey: "a4ffc923-1b63-4842-b014-1c4bfcc1707e",
          subscriptionId: "a0ae7ae6-2f3c-4c61-871d-3917ae2f39d9",
        })
      );
    });

    this.client.connect("wss://kiki-stream.hellomoon.io");

  }
  async getAllPools(): Promise<any[]> {
    // Logic to fetch all pools from Solana
    // Example: const allPools = await this.connection.getPools();
    const allPools: any[] = []; // Placeholder for actual data
    return allPools;
  }


  async searchPools(searchParams: Record<string, string>): Promise<any[]> {
    // Logic to search pools based on criteria
    // Example: const foundPools = await this.connection.searchPools(searchParams);
    const foundPools: any[] = []; // Placeholder for actual data
    return foundPools;
  }
}
