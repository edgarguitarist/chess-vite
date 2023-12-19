import Board from "./components/Board";
import GameInfo from "./components/GameInfo";
import Header from "./components/Header";
import Principal from "./layouts/Principal";

function App() {
  
  return (
    <>
      <Header />
      <Principal>
        <GameInfo />
        <Board />
        <div></div>
      </Principal>
    </>
  );
}

export default App;
