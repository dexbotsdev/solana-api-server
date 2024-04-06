import websocket from "websocket";
const client = new websocket.client();

client.on("connect", (connection: any) => {
  connection.on("message", (message: { type: string; utf8Data: string; }) => {
    if (!message || message.type !== "utf8") return;
    const data = JSON.parse(message.utf8Data);
    if (data === "You have successfully subscribed") {
      return;
    }

    console.log(data);
    // do logic under here
  });

  connection.sendUTF(
    JSON.stringify({
      action: "subscribe",
      apiKey: "a4ffc923-1b63-4842-b014-1c4bfcc1707e",
      subscriptionId: "e0a90b37-e947-4962-990d-33687314d62d",
    })
  );
});

client.connect("wss://kiki-stream.hellomoon.io");
