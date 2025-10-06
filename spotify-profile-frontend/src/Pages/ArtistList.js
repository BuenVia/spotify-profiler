import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import apiCall from "../api";

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
    return <div className="results__container">Searching...</div>;
  }

  return (
    <div className="results__container">
        <h2>Artists</h2>

        <table className="table table-sm table-dark table-striped">
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Artist Name</th>
                    <th>Genre</th>
                    <th>Followers</th>
                </tr>
            </thead>
            <tbody className="table-group-divider" style={{textAlign: "left"}}>
                {results.artists.items.map((artist) => (
                    <tr>
                        <td><a href={"/artist/" + artist.id}><img src={artist.images?.[0]?.url} alt={artist.name} className="artist__img" /></a></td>
                        <td style={{cursor: "pointer"}}><a href={"/artist/" + artist.id} className="table__link  align-middle">{artist.name}</a></td>
                        <td>{artist.genres.map(g => g).join(", ")}</td>
                        <td>{artist.followers.total.toLocaleString()}</td>
                    </tr>
                ))}      
            </tbody>
        </table>

    </div>
  );
};

export default ArtistsList;
