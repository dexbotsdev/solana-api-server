import websocket from "websocket";
import formatAmmKeysById from '../src/util/formatAmmKeysById'

import { createMarket } from "../src/db/db";


const client = new websocket.client();

client.on("connect", (connection: any) => {
  connection.on("message", (message: { type: string; utf8Data: string; }) => {
    if (!message || message.type !== "utf8") return;
    const data = JSON.parse(message.utf8Data);
    if (data === "You have successfully subscribed") {
      return;
    } 
    data.forEach(async (poolInfo: any) => {   
      // const ammId = poolInfo.poolAddress;
      // let targetPoolInfo = await formatAmmKeysById(ammId);
      console.log(poolInfo); 

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

client.connect("wss://kiki-stream.hellomoon.io");
