import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import apiCall from "../api";
import LoadingSpinner from "../Components/LoadingSpinner";

const ArtistsList = () => {

    const [ searchParams ] = useSearchParams()
    const [results, setResults] = useState(null);
    

    useEffect(() => {
        const getSearch = async () => {
            try {
                const res = await apiCall("/search", `?artist=${searchParams.get("search_term")}`);
                setResults(res.data);                    
            } catch (err) {
                console.error("Search failed:", err);
            }
        };        
        getSearch()
    }, [searchParams])
    

  if (!results?.artists?.items?.length) {
    return <LoadingSpinner />;
  }

  return (
    <div className="results__container">
        <h2>Artists</h2>

        <h3>Top Result</h3>
        <a href={"/artist/" + results.artists.items[0]?.id} className="card text-bg-dark border-0 shadow-sm rounded-3 overflow-hidden" style={{maxWidth: "700px", textDecoration: "none"}}>
          <div className="row g-0 align-items-center">
            <div className="col-md-4">
              <img src={results.artists.items[0]?.images?.[0]?.url} className="img-fluid rounded-start" alt="Band" />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h1 className="card-title fw-bold mb-1">{results.artists.items[0]?.name}</h1>
                <p className="mb-2">{results.artists.items[0]?.genres.map(g => g).join(", ")}</p>
                <p className="mb-0"><strong>{results.artists.items[0]?.followers.total}</strong> followers</p>
              </div>
            </div>
          </div>
        </a>

        <div className="mt-5">
            <h2>Other Results</h2>
            <div className="other__results__container">
                {results.artists.items.length <= 1 ? "No other results found" : results.artists.items.map((artist, index) => (
                    index !== 0? 
                    <a key={index} href={"/artist/" + artist.id} className="card result__card" style={{maxWidth: "300px", textDecoration: "none"}}>
                        <div className="row g-0 align-items-center">
                            <div className="">
                              {artist.images.length === 0 ? 
                              <img src="/assets/placeholder.png" className="artist__img" alt="Band" /> 
                              :
                              <img src={artist.images?.[0]?.url} className="artist__img" alt="Band" />
                              }
                            </div>
                            <div className="">
                                <div className="card-body">
                                    <p className="fw-bold mb-1">{artist?.name}</p>
                                </div>
                            </div>
                        </div>
                    </a> 
                    : null
                ))}
            </div>
        </div>

    </div>
  );
};

export default ArtistsList;
