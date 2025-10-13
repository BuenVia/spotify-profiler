import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import apiCall from "../api";
import LoadingSpinner from "../Components/LoadingSpinner";

const TrackDetails = () => {
    const { trackId } = useParams()
    const [ searchParams ] = useSearchParams()
    const [track, setTrack] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        if (!trackId) return;
        const fetchTrack = async () => {
            try {
                setLoading(true);
                const res = await apiCall("/track-data", `?track_id=${trackId}`);
                setTrack(res.data || null);
            } catch (err) {
                console.error("Error fetching track:", err);
                setError("Failed to load track data.");
            } finally {
                setLoading(false);
            }
        };
        fetchTrack();
    }, [trackId]);


    if (!trackId) return null;
    if (loading) return <LoadingSpinner />;
    if (error) return <p>{error}</p>;
    if (!track) return null;

    return (
        <div className="track__container mt-3 p-3 shadow-sm">

            <h1 className="mb-3" style={{ textAlign: "left"}}>Track Details</h1>
            

            <div className="card text-bg-dark border-0 shadow-sm rounded-3 mb-3" style={{maxWidth: "700px"}}>
                <div className="row g-0 align-items-center">
                    <div className="col-auto">
                        <img src={track.album.images?.[1]?.url} alt="Album Cover" className="img-fluid rounded-start" />
                    </div>

                    <div className="col">
                    <div className="card-body py-2" style={{textAlign: "left"}}>
                        <div className="d-flex justify-content-between align-items-start">
                        <h5 className="card-title mb-3 fw-bold">{track.name}</h5>
                        </div>
                        <p className="card-text mb-0"><strong>Artist:</strong> {track.artists?.map((a) => a.name).join(", ")} </p>
                        <p className="card-text mb-0"><strong>Album:</strong> <span >{track.album?.name}</span></p>
                        <p className="mt-3"><small className="card-text mb-0">Released: {track.album?.release_date.slice(0,4)}</small></p>
                        <p className="card-text mb-0"><small className="">Track {track.track_number}</small></p>
                        <p><small className="card-text mb-0">Duration: {track.duration}</small></p>
                    </div>
                    </div>
                </div>
            </div>

            <a className="btn btn-primary" href={`/album/${track.album.id}?artist_id=${searchParams.get("artist_id")}&artist_name=${searchParams.get("artist_name")}`}>Back</a>




        </div>
    );
};

export default TrackDetails;
