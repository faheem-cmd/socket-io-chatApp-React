import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { useTabNotification } from "./TabNotfication";
import ChatHeader from "./chat/ChatHeader";
import ChatScreen from "./chat/ChatScreen";
import ChatInput from "./chat/ChatInput";
const socket = io.connect("http://192.168.10.79:8000");

function Chat() {
  const [notification, setNotification] = useTabNotification();
  const [room, setRoom] = useState();
  const [name, setName] = useState();
  const [data1, setData1] = useState([]);
  const onUpdate = (room, name) => {
    setRoom(room);
    setName(name);
  };
  useEffect(() => {
    socket.on("receive_message", (data) => {
      notification(" 🔴 (1) New Message", 1000);
      console.log(data, "eette");
      setData1((oldArray) => [
        ...oldArray,
        { id: false, message: data.message, name: data.name },
      ]);
    });
  }, [socket]);

  let uniqueChars = [...new Set(data1)];

  console.log(uniqueChars);

  return (
    <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
      <ChatHeader onUpdate={onUpdate} socket={socket} />
      <ChatScreen data1={data1} />
      <ChatInput
        socket={socket}
        room={room}
        name={name}
        setNotification={setNotification}
        setData1={setData1}
      />
    </div>
  );
}
export default Chat;
