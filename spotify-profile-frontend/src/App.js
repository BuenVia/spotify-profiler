import { useState } from "react";
import "./App.css";
import axios from "axios";
import ArtistsList from "./Components/ArtistsList";
import ArtistDetails from "./Components/ArtistDetails";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState(null);
  const [artist, setArtist] = useState(null);
  const [view, setView] = useState("search"); // "search" | "results" | "artist"

  const handleChange = (e) => setSearchTerm(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/search?artist=${searchTerm}`
      );
      setResults(res.data);
      setView("results");
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  const handleSelectArtist = (artist) => {
    setArtist(artist);
    setView("artist");
  };

  return (
    <div className="App">

      <nav className="nav">
        x
      </nav>

      {view === "search" && (
        <div>
          <h1>Search for an artist</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="artist"
              value={searchTerm}
              onChange={handleChange}
              placeholder="Artist name..."
            />
            <button type="submit">Search</button>
          </form>
        </div>
      )}

      {view === "results" && (
        <ArtistsList results={results} onSelectArtist={handleSelectArtist} />
      )}

      {view === "artist" && <ArtistDetails artist={artist} />}
    </div>
  );
}

export default App;
