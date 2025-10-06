import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import apiCall from "../api";

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
    if (loading) return <p>Loading track details...</p>;
    if (error) return <p>{error}</p>;
    if (!track) return null;

    return (
        <div className="track__container mt-3 p-3 shadow-sm">

            <div class="card text-bg-dark border-0 shadow-sm rounded-3 mb-3" style={{maxWidth: "700px"}}>
                <div class="row g-0 align-items-center">
                    <div class="col-auto">
                        <img src={track.album.images?.[1]?.url} alt="Album Cover" class="img-fluid rounded-start" />
                    </div>

                    <div class="col">
                    <div class="card-body py-2" style={{textAlign: "left"}}>
                        <div class="d-flex justify-content-between align-items-start">
                        <h5 class="card-title mb-3 fw-bold">{track.name}</h5>
                        </div>
                        <p class="card-text mb-0"><strong>Artist:</strong> {track.artists?.map((a) => a.name).join(", ")} </p>
                        <p class="card-text mb-0"><strong>Album:</strong> <a className="table__link" href={`/album/${track.album.id}?artist_id=${searchParams.get("artist_id")}&artist_name=${searchParams.get("artist_name")}`}>{track.album?.name}</a></p>
                        <p class="card-text mb-0"><small class="">Track {track.track_number}</small></p>
                        <p><small class="card-text mb-0">Duration: {track.duration}</small></p>
                    </div>
                    </div>
                </div>
                </div>




        </div>
    );
};

export default TrackDetails;
