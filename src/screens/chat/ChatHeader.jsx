import { Button } from "@chakra-ui/react";
import React, { useState } from "react";
const ChatHeader = ({ onUpdate, socket }) => {
  //Room State
  const [room, setRoom] = useState("");
  const [name, setName] = useState("");

  const joinRoom = () => {
    if (room.length === 0 && name.length === 0) {
      alert("Please enterChatRoom ID");
    } else if (room.length === 0) {
      alert("Enter RoomId");
    } else if (name.length === 0) {
      alert("Please enter your name");
    } else {
      if (room !== "") {
        socket.emit("join_room", room);
        socket.emit("name", name);
        console.log(room, "jiji");
        alert("Conncected Succesfully");
      }
    }
  };
  const onClickButton = () => {
    onUpdate(room, name);
    joinRoom();
  };
  return (
    <div
      style={{
        width: "100%",
        height: 100,
        backgroundColor: "#003060",
        flex: 1,
        position: "absolute",
      }}
    >
      <div
        style={{
          flexDirection: "row",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          marginTop: 25,
        }}
      >
        <div style={{ paddingRight: 20 }}>
          <input
            placeholder="Room Number..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
            style={{
              borderRadius: 10,
              elevation: 3,
              height: 30,
              paddingLeft: 10,
            }}
          />
          <div style={{ padding: 3 }} />
          <input
            placeholder="Name"
            onChange={(event) => {
              setName(event.target.value);
            }}
            style={{
              borderRadius: 10,
              elevation: 3,
              height: 30,
              paddingLeft: 10,
            }}
          />
        </div>
        <Button colorScheme="orange" onClick={onClickButton}>
          Join
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
