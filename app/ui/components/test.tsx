import { useState } from "react";

export default function ScaleTest() {
  const [selected, setSelected] = useState(0);
  const labels = ["A", "B", "C", "D"];
  const colors = ["bg-green-500", "bg-yellow-500", "bg-orange-500", "bg-red-500"];

  return (
    <div className="flex gap-4 mt-8">
      {labels.map((label, idx) => (
        <div
          key={label}
          onClick={() => setSelected(idx)}
          className={`
            w-20 h-12 rounded-2xl text-white font-bold flex items-center justify-center cursor-pointer
            ${colors[idx]}
            transform transition-transform duration-300 ease-in-out
            ${selected === idx ? "scale-110" : "scale-100"}
          `}
        >
          {label}
        </div>
      ))}
    </div>
  );
}
