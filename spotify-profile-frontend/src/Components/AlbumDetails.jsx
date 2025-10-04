import { useEffect, useState } from "react";
import apiCall from "../api";
import TrackDetails from "./TrackDetails";

const AlbumDetails = ({ albumId }) => {
  const [tracks, setTracks] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAlbumTracks = async () => {
      try {
        setLoading(true);
        const res = await apiCall("/album-tracks", `?album_id=${albumId}`);
        setTracks(res.data || null);
      } catch (err) {
        console.error("Error fetching album tracks:", err);
        setError("Failed to load tracks.");
      } finally {
        setLoading(false);
      }
    };
    getAlbumTracks();
  }, [albumId]);

  if (loading) return <p>Loading tracks...</p>;
  if (error) return <p>{error}</p>;
  if (!tracks?.items?.length) return <p>No tracks available.</p>;

  return (
    <div className="track-list">
      {selectedTrack && <TrackDetails trackId={selectedTrack} />}
      {tracks.items.map((track) => (
        <p
          key={track.id}
          onClick={() => setSelectedTrack(track.id)}
          className="track-item"
        >
          {track.name}
        </p>
      ))}
    </div>
  );
};

export default AlbumDetails;
