import { useBoardStore } from "../store/BoardStore";

export default function GameInfo() {
    const {turn} = useBoardStore();
    console.log({ turn });
  return (
    <div className="grid grid-rows-3">
      <div>fichas negras perdidas</div>
      <div>Es el turno de las {turn}</div>
      <div>fichas blancas perdidas</div>
    </div>
  );
}
