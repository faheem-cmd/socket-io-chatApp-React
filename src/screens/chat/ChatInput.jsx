import React, { useState } from "react";
import Picker from "emoji-picker-react";
import { FaSmile } from "react-icons/fa";
import { Button, InputRightElement } from "@chakra-ui/react";
import { Input, InputGroup } from "@chakra-ui/react";

const ChatInput = ({ socket, room, name, setNotification, setData1 }) => {
  const [picker, setPicker] = useState(false);

  // Messages States
  const [message, setMessage] = useState("");

  const onEmojiClick = (event, emojiObject) => {
    console.log(emojiObject);
    setMessage(message + emojiObject.emoji);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("send_message", { message, room, name });
    setData1((oldArray) => [...oldArray, { id: true, message: message }]);
    setMessage("");
  };
  return (
    <div
      style={{
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderColor: "orange",
        marginHorizontal: 5,
        flex: 1,
        width: "50%",
        display: "flex",
        bottom: -54,
        position: "absolute",
      }}
    >
      <form onSubmit={sendMessage} style={{ display: "flex" }}>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            onClick={() => setNotification()}
            onChange={(event) => {
              setMessage(event.target.value);
            }}
            placeholder="Enter message"
            style={{ bottom: 3, right: 14, width: "680px" }}
            value={message}
          />
          <InputRightElement width="4.5rem">
            {" "}
            {
              <FaSmile
                fontSize={22}
                onClick={() => setPicker(!picker)}
                color={"#ffcb4c"}
              />
            }{" "}
          </InputRightElement>
        </InputGroup>
        {picker && <Picker onEmojiClick={onEmojiClick} />}

        <Button
          disabled={message.length >= 1 ? false : true}
          colorScheme="red"
          type="submit"
          style={{ width: 60, marginHorizontal: 15, left: 6, bottom: 3 }}
        >
          <p style={{ fontSize: 12 }}>Send</p>{" "}
        </Button>
      </form>
    </div>
  );
};

export default ChatInput;
