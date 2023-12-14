import useStore from "../../store/example";

export function BearCounter() {
  const bears = useStore((state) => state.bears);
  return (
    <>
      <h1>{bears} around here...</h1>
      <Controls />
    </>
  );
}

function Controls() {
  const increasePopulation = useStore((state) => state.increasePopulation);
  return <button onClick={increasePopulation}>one up</button>;
}
