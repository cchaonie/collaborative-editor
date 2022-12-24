import ReconnectingWebSocket from "reconnecting-websocket";
import Client from "sharedb/lib/client";
import otJSON1 from "ot-json1";

let connection = null;

export const getShareDBConnection = () => {
  if (connection) return connection;
  const socket = new ReconnectingWebSocket("ws://localhost:8080");
  // register client ot type
  Client.types.register(otJSON1.type);

  const { Connection } = Client;
  connection = new Connection(socket);
  return connection;
};
