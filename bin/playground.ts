Error.stackTraceLimit = 25;

import { Server } from "../lib/server";
import { Player } from "../lib/util/player";

import {
  RoomCreationEvent,
  JoinRoomRequestEvent,
  ConnectionEvent,
  RoomListingRequestEvent,
  DisconnectionEvent,
  JoinRoomEvent,
} from "../lib/events";

const playerNames:string[] = new Array(
  "Admin",
  "Dimmadome",
  "Spongebob",
  "Imposter",
  "Crew",
  "Me",
  "Blue",
  "Red",
  "Green",
  "Cyan",
  "Sus",
  "Ikki",
  "Diablo",
  "Zelda",
  "Corpse",
  "Card Swipe Is A Lie",
  "Imploster",
  "Hampus",
  "Apollyon"
);

// import AnnouncementServer from "../lib/announcements/Server";
// import { FreeWeekendState } from '../lib/announcements/packets/subpackets/FreeWeekend';
// import Text from '../lib/util/Text';

const server = new Server({
  port: 22023,
});

process.stdin.on("data", () => {
  process.exit(1);
});

server.on("roomCreated", async (evt: RoomCreationEvent) => {
  console.log("[Event] Server > 'roomCreated'");
  let room = evt.room;
  room.setCode("HACKER");
  room.on("playerJoined", async (evt: JoinRoomEvent) => {
    playerNames.push(evt.player.name);
    RandomLook(evt.player);
    setInterval(() => {
      RandomLook(evt.player);
    }, room.settings.KillCooldown * 1000);
  });

  room
});

server.on("joinRoomRequest", async (evt: JoinRoomRequestEvent) => {
  console.log("[Event] Server > 'joinRoomRequest'");
});

server.on("connection", async (evt: ConnectionEvent) => {
  let connection = evt.connection;
  console.log(`[Event] Server > 'connection'[${connection.ID}]`);
  evt.connection.on("joinRoomRequest", async (evt: JoinRoomRequestEvent) => {
    console.log(`[Event] Connection[${connection.ID}] > 'joinRoomRequest'`);
  });
  evt.connection.on("disconnection", async (evt: DisconnectionEvent) => {
    console.log(`[Event] Connection[${connection.ID}] > 'disconnection'`);
  });
  evt.connection.on("joinRoom", async (evt: JoinRoomEvent) => {
    console.log(`[Event] Connection[${connection.ID}] > 'joinRoom'`);
    // evt.player.setName("A Name Override")
  });
});

server.on("roomListingRequest", async (evt: RoomListingRequestEvent) => {
  console.log("[Event] Server > 'roomListingRequest'");
});

server.on("disconnection", async (evt: DisconnectionEvent) => {
  console.log("[Event] Server > 'disconnection'");
});

server.listen();
// annServer.listen();

function RandomLook(player:Player): void {
  if (player.connection) {
    const num = Math.floor(Math.random() * playerNames.length);
    player.setName(String(playerNames[num]));
    player.setColor(Math.floor(Math.random() * Math.floor(11)));
    player.setHat(Math.floor(Math.random() * Math.floor(93)));
    player.setSkin(Math.floor(Math.random() * Math.floor(15)));
    player.setPet(Math.floor(Math.random() * Math.floor(10)));
  }
}
