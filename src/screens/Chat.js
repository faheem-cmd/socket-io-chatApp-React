import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
const socket = io.connect("http://192.168.10.79:8000");

function Chat() {
  //Room State
  const [room, setRoom] = useState("");

  // Messages States
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState([]);

  const [message2, setMessage2] = useState("");

  const [data1, setData1] = useState([]);

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
      console.log(room, "jiji");
      alert("Conncected Succesfully");
    }
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
    setData1((oldArray) => [...oldArray, { id: true, message: message }]);
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      setData1((oldArray) => [
        ...oldArray,
        { id: false, message: data.message },
      ]);
    });
  }, [socket]);

  const uniqIds = data1.reduce((ids, el) => ids.add(el.message), new Set());
  const uniqElements = data1.filter((el) => uniqIds.delete(el.message));

  let uniqueChars = [...new Set(data1)];
  const handleScroll = (e) => {
    let element = e.target;
    if (element.scrollTop === 0) {
      //fetch messages
    }
  };

  console.log(uniqueChars);

  //  <div>
  //    <input
  //      placeholder="Room Number..."
  //      onChange={(event) => {
  //        setRoom(event.target.value);
  //      }}
  //    />
  //    <button onClick={joinRoom}> Join Room</button>
  //    <input
  //      placeholder="Message..."
  //      onChange={(event) => {
  //        setMessage(event.target.value);
  //      }}
  //    />
  //    <button onClick={sendMessage}> Send Message</button>
  //    <div style={{ backgroundColor: "green" }}>Person</div>
  //    {uniqueChars.map((item) => (
  //      <h1>{item}</h1>
  //    ))}
  //    <div style={{ backgroundColor: "yellow" }}>
  //      <div>
  //        <p style={{ color: "red" }}>you</p>
  //      </div>
  //      {data1.map((item) => (
  //        <h1> {item}</h1>
  //      ))}
  //    </div>
  //  </div>;

  const dat = [
    { id: 1, mess: "hai" },
    { id: 2, mess: "haha" },
    { id: 3, mess: "ysyy" },
  ];

  return (
    <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
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
          </div>
          <Button colorScheme="orange" onClick={joinRoom}>
            Join
          </Button>
        </div>
      </div>
      <div
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          height: "100%",
        }}
      >
        <div
          style={{
            width: "52%",
            height: 500,
            backgroundColor: "#f1f4f9",
            borderWidth: 1,
            borderColor: "orange",
            borderRadius: 10,
            marginTop: 200,
            // display: "flex",
            alignItems: "end",
            // flex: 1,
            overflowY: "auto",
          }}
          onScroll={handleScroll}
        >
          {uniqElements.map((item) => (
            <div
              style={{
                padding: 10,
                flexDirection: item.id == false ? "row" : "row-reverse",
                display: "flex",
              }}
            >
              <div
                style={{
                  padding: 10,
                  backgroundColor: "#fff",
                  width: 200,
                  borderRadius: 12,
                  alignItems: "center",
                  justifyContent: "centers",
                  margin: 5,
                }}
              >
                <p>{item.message}</p>
              </div>
            </div>
          ))}

          {/* {data1.map((item) => (
            <div
              style={{
                padding: 10,
                flexDirection: "row-reverse",
                width: "100%",
                display: "flex",
              }}
            >
              <div
                style={{
                  padding: 10,
                  backgroundColor: "#fff",
                  width: 100,
                  borderRadius: 12,
                  alignItems: "center",
                  justifyContent: "centers",
                  margin: 5,
                }}
              >
                <p style={{ color: "red" }}>{item}</p>
              </div>
            </div>
          ))} */}
        </div>
      </div>
      <div
        style={{
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          borderColor: "orange",
          marginHorizontal: 5,
          flex: 1,
          width: "50%",
          display: "flex",
          bottom: 10,
          position: "absolute",
        }}
      >
        <Input
          onChange={(event) => {
            setMessage(event.target.value);
          }}
          placeholder="Enter message"
          style={{ bottom: 3, right: 6 }}
        />
        <Button
          onClick={sendMessage}
          colorScheme="red"
          style={{ width: 60, marginHorizontal: 15, left: 6, bottom: 3 }}
        >
          <p style={{ fontSize: 12 }}>Send</p>
        </Button>
      </div>
    </div>
  );
}

export default Chat;
