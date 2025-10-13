
import { useEffect, useState } from "react";
import apiCall from "../api";
import { useParams, useSearchParams } from "react-router-dom";
import LoadingSpinner from "../Components/LoadingSpinner";

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


  if (loading) return <LoadingSpinner />;
  if (error) return <p>{error}</p>;
  if (!tracks?.items?.length) return <p>No tracks available.</p>;

  return (
    <div className="album__container">

        <div className="card text-bg-dark border-0 shadow-sm rounded-3 overflow-hidden" style={{maxWidth: "700px"}}>
          <div className="row g-0 align-items-center">
            <div className="col-md-4">
              <img src={albumData.images[1]?.url} className="img-fluid rounded-start" alt="Band" />
            </div>
            <div className="col-md-8">
                <div className="card-header">
                  <a href={`/artist/${searchParams.get("artist_id")}`} className="artist__header">
                    <h1>{searchParams.get("artist_name")}</h1>
                  </a>
                </div>
              <div className="card-body card-body-text">
                <h3 className="card-title fw-bold mb-1" style={{ textAlign: "left"}}>{albumData.name}</h3>
                <p className="mb-2" style={{ textAlign: "left"}}>{albumData.release_date}</p>
                <p className="mb-0" style={{ textAlign: "left"}}>{albumData.label}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="artist__container mt-5">
            <h3 style={{ textAlign: "left"}}>Track Listing</h3>
            <p style={{ textAlign: "left", fontSize: "12px"}}>Click on a track name to view more information.</p>
            <table className="table table-hover table-dark">
                <thead>
                    <tr>
                      <th>Disc No.</th>
                      <th>Track No.</th>
                      <th>Track Name</th>
                      <th>Artist(s)</th>
                      <th>Duration</th>
                    </tr>
                </thead>
                <tbody>
                    {tracks.items.map((track) => (
                        <tr key={track.id}>
                          <td>{track.disc_number}</td>
                            <td>{track.track_number}</td>
                            <td><a href={`/track/${track.id}?artist_id=${searchParams.get("artist_id")}&artist_name=${searchParams.get("artist_name")}`} className="table__link">{track.name}</a></td>
                            <td>{track.artists.map(a => a.name)}</td>
                            <td>{track.duration}</td>
                        </tr>
                    ))}
            </tbody>
        </table>
        </div>

        <a className="btn btn-primary mb-3" href={`/artist/${searchParams.get("artist_id")}`}>Back</a>
    </div>
  );
};

export default AlbumDetails;
