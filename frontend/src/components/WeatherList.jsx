function WeatherList({ data }) {
  return (
    <div>
      <h3>Stored Results:</h3>
      <ul>
        {data.map((w) => (
          <li key={w.id}>
            {w.city} - {w.description} ({w.temperature}°C)
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WeatherList;
