export default function Header() {
  return (
    <div className="h-[10vh] bg-slate-800 ring-1 ring-slate-900/5 shadow-xl flex justify-between items-center px-10">
      <span className="text-3xl font-bold text-white">
        AJEDREZ
      </span>
      <button type="button" className="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 hover:scale-105">COMENZAR PARTIDA</button>
    </div>
  );
}
