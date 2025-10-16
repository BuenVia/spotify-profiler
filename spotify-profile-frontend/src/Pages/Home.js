import { useState } from "react";

const Home = () => {
      const [searchTerm, setSearchTerm] = useState("");
    
      const handleChange = (e) => setSearchTerm(e.target.value);
    
    return ( 
    <div className="search__container">
      <h2 className="mb-4">Welcome to <span className="home__title">Spotify Profiler</span></h2>
      <p>Search for data on your favourite artists.</p>

      <div>
        <a href="/about" className="learn__link">Learn more</a>
      </div>

      <div className="search__box d-flex mt-3">
        <input 
          className="me-2 mb-4" 
          type="text"
          name="artist"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Artist name..."
          aria-label="Search"
          autoFocus
          />
        <a href={"/search?search_term=" + searchTerm} className="btn__search">Search</a>
      </div>

    </div>
    )
}

export default Home