import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./Pages/Home";
import ArtistDetails from "./Pages/ArtistDetails";
import ArtistsList from "./Pages/ArtistList";
import AlbumDetails from "./Pages/AlbumDetails";
import TrackDetails from "./Pages/TrackDetails";
import { useState } from "react";
import UserDetails from "./Pages/UserDetails";


function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => setSearchTerm(e.target.value);

  return (
    <BrowserRouter>
    <div className="App">

      <nav className="navbar nav__bg" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand nav__logo" href="/">Spotify Profiler</a>
          <span className="d-flex">
            <input 
              className="form-control me-2" 
              type="text"
              name="artist"
              value={searchTerm}
              onChange={handleChange}
              placeholder="Artist name..."
              aria-label="Search"
              />
            <a href={"/search?search_term=" + searchTerm} className="btn btn-outline-success">Search</a>
          </span>
        </div>
      </nav>

      

      <div className="main__container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<ArtistsList />} />
          <Route path="/artist/:artist" element={<ArtistDetails />} />
          <Route path="/album/:album" element={<AlbumDetails />} />
          <Route path="/track/:trackId" element={<TrackDetails />}></Route>
          <Route path="/user" element={<UserDetails />} />
        </Routes>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
