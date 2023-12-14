import Board from "./components/Board";
import Header from "./components/Header";

function App() {

  return (
    <>
      <Header />
      <section className="grid place-content-center h-[80vh]">
        <Board /> 
      </section>
    </>
  );
}

export default App;
