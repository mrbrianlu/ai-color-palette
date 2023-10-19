import { useState } from "react";

// const colors = ["#321325", "#5f0f40", "#9a031e", "#cb793a", "#fcdc4d"];
// const colors = ["#daa89b", "#ae847e", "#2c0e37", "#690375"];
const colorsPre = ["#FF9200", "#FFD700", "#FFFFFF", "#800000"];

function App() {
  const [query, setQuery] = useState("");
  const [colors, setColors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: query }),
    };

    fetch("http://localhost:8000/api/colors", requestOptions)
      .then((response) => response.json())
      .then((data) => setColors(data.colors));
    setQuery("");
  };

  return (
    <div className="relative">
      <div className="flex h-screen w-screen flex-row">
        {colors.map((color, index) => (
          <div
            key={index}
            className="flex h-full w-full cursor-pointer items-end justify-center active:opacity-90"
            style={{ backgroundColor: color }}
            onClick={() => {
              navigator.clipboard.writeText(color);
            }}
          >
            <p className="mb-20 text-4xl text-white drop-shadow-[0_2px_2px_rgba(0,0,0,1)]">
              {color}
            </p>
          </div>
        ))}
      </div>
      <form
        onSubmit={handleSubmit}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <input
          type="text"
          value={query}
          placeholder="Enter your magical word"
          className="rounded-lg p-3 text-xl outline-none"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="ml-2 rounded-lg bg-slate-600 p-3 text-xl text-white hover:bg-slate-500 active:opacity-80">
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
