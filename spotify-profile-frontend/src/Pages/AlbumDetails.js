
import { useEffect, useState } from "react";
import apiCall from "../api";
import { useParams, useSearchParams } from "react-router-dom";

const AlbumDetails = () => {
    const { album } = useParams()
    const [ searchParams ] = useSearchParams()
    const [albumData, setAlbumData] = useState(null)
    const [tracks, setTracks] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getAlbumData = async () => {
            try {
                setLoading(true);
                const res_album = await apiCall("/album", `?album_id=${album}`)
                setAlbumData(res_album.data)
                setTracks(res_album.data.tracks || null);
            } catch (err) {
                console.error("Error fetching album tracks:", err);
                setError("Failed to load tracks.");
            } finally {
                setLoading(false);
            }
        };
        getAlbumData()
    }, [album]);


  if (loading) return <p>Loading details...</p>;
  if (error) return <p>{error}</p>;
  if (!tracks?.items?.length) return <p>No tracks available.</p>;

  return (
    <div className="album__container">

        <div className="card text-bg-dark border-0 shadow-sm rounded-3 overflow-hidden" style={{maxWidth: "700px"}}>
          <div className="row g-0 align-items-center">
            <div className="col-md-4">
              <img src={albumData.images[1]?.url} className="img-fluid rounded-start" alt="Band Image" />
            </div>
            <div className="col-md-8">
                <div className="card-header"><a href={`/artist/${searchParams.get("artist_id")}`} className="artist__header"><h1>{searchParams.get("artist_name")}</h1></a></div>
              <div className="card-body card-body-text">
                <h3 className="card-title fw-bold mb-1">{albumData.name}</h3>
                <p className="mb-2">{albumData.release_date}</p>
                <p className="mb-0">{albumData.label}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="artist__container mt-5">
            <h3>Track Listing</h3>
            <table className="table table-dark table-striped-columns">
                <thead>
                    <tr>
                        <th>Track No.</th>
                        <th>Track Name</th>
                        <th>Artist(s)</th>
                        <th>Duration</th>
                    </tr>
                </thead>
                <tbody>
                    {tracks.items.map((track) => (
                        <tr>
                            <td>{track.track_number}</td>
                            <td><a href={`/track/${track.id}?artist_id=${searchParams.get("artist_id")}&artist_name=${searchParams.get("artist_name")}`} className="table__link">{track.name}</a></td>
                            <td>{track.artists.map(a => a.name)}</td>
                            <td>{track.duration}</td>
                        </tr>
                    ))}
            </tbody>
        </table>
        </div>
    </div>
  );
};

export default AlbumDetails;
