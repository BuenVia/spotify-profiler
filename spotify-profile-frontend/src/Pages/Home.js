import { useState } from "react";

const Home = () => {
      const [searchTerm, setSearchTerm] = useState("");
    
      const handleChange = (e) => setSearchTerm(e.target.value);
    
    return ( 
    <div className="main__container">
        <h3>Welcome to The Spotify Profiler</h3>
        <p>Search for data on your favourite artists.</p>

        <div className="search__container d-flex">
            <input 
              className="form-control me-2" 
              type="text"
              name="artist"
              value={searchTerm}
              onChange={handleChange}
              placeholder="Artist name..."
              aria-label="Search"
              />
            <a href={"/search?search_term=" + searchTerm} className="btn btn__search">Search</a>
          </div>

    </div>
    )
}

export default Home