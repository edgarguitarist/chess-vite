export default function Header() {
  return (
    <div className="h-[10vh] bg-slate-800 ring-1 ring-slate-900/5 shadow-xl flex justify-between items-center px-10">
      <span className="text-3xl font-bold text-white">
        AJEDREZ
      </span>
      <button type="button" className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200">COMENZAR PARTIDA</button>
    </div>
  );
}
