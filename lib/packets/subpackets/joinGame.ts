import { roomCode } from "../packetElements/roomCode";
import { PolusBuffer } from "../../util/polusBuffer";
import { PacketHandler } from "../packet";

export interface JoinGamePacket {
  type: "JoinGame";
  RoomCode: string;
  MapOwnership: number;
}

export const JoinGame: PacketHandler<JoinGamePacket> = {
  parse(packet: PolusBuffer): JoinGamePacket {
    return {
      type: "JoinGame",
      RoomCode: roomCode.intToString(packet.read32()),
      MapOwnership: packet.readU8(),
    };
  },

  serialize(packet: JoinGamePacket): PolusBuffer {
    const buf = new PolusBuffer(5);
    buf.write32(roomCode.stringToInt(packet.RoomCode));
    buf.writeU8(packet.MapOwnership);
    return buf;
  },
};
