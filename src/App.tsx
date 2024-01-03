import Board from "./components/Board";
import GameInfo from "./components/GameInfo";
import Header from "./components/Header";
import PiecesInfo from "./components/PiecesInfo";
import Principal from "./layouts/Principal";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    <>
      <Header />
      <Principal>
        <GameInfo />
        <Board />
        <PiecesInfo />
      </Principal>
      <ToastContainer />
    </>
  );
}

export default App;
