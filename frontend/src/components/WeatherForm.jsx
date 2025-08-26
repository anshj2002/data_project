import { useState } from "react";

function WeatherForm({ onFetch }) {
  const [city, setCity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`http://127.0.0.1:8000/fetch/${city}`, { method: "POST" });
    setCity("");
    onFetch();
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
        style={{ padding: "8px" }}
      />
      <button type="submit" style={{ padding: "8px", marginLeft: "5px" }}>
        Fetch
      </button>
    </form>
  );
}

export default WeatherForm;
