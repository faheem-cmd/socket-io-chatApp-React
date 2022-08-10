import React from "react";

const ChatScreen = ({ data1 }) => {
  const handleScroll = (e) => {
    let element = e.target;
    if (element.scrollTop === 0) {
    }
  };
  return (
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
          alignItems: "end",
          overflowY: "auto",
        }}
        onScroll={handleScroll}
      >
        {data1.map((item) => (
          <div
            style={{
              padding: 10,
              flexDirection: item.id == false ? "row" : "row-reverse",
              display: "flex",
            }}
          >
            <div style={{}}>
              {" "}
              <p
                style={{
                  alignItems: "center",
                  alignSelf: "center",
                  justifyContent: "center",
                  fontSize: 10,
                  fontWeight: "bold",
                  backgroundColor: "#003060",
                  elevation: 2,
                  width: 50,
                  height: 50,
                  borderWidth: 2,
                  borderColor: "#CDF0EA",
                  borderRadius: 200,
                  textAlign: "center",
                  flex: 1,
                  display: "flex",
                  color: "white",
                }}
              >
                {" "}
                {item.name || "you"}{" "}
              </p>{" "}
            </div>
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
      </div>
    </div>
  );
};

export default ChatScreen;
