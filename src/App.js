import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Chat from "./screens/Chat";
function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Chat />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
