import { useEffect, useState } from "react";
import apiCall from "../api";

const TrackDetails = ({ trackId }) => {
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
  if (!track) return <p>No track data available.</p>;

  return (
    <div className="track__card mt-3 p-3 shadow-sm">
      <h4>{track.name}</h4>
      <p>
        <strong>Artist:</strong> {track.artists?.map((a) => a.name).join(", ")}
      </p>
      <p>
        <strong>Album:</strong> {track.album?.name}
      </p>
      <p>
        <strong>Duration:</strong>{" "}
        {(track.duration_ms / 60000).toFixed(2)} min
      </p>
      <p>
        <strong>Popularity:</strong> {track.popularity}
      </p>

      {track.preview_url && (
        <audio controls src={track.preview_url} className="mt-2">
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
};

export default TrackDetails;
