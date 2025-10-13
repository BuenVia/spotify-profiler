import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiCall from "../api";
import LoadingSpinner from "../Components/LoadingSpinner";

const ArtistDetails = () => {
  const { artist } = useParams()
  const [artistData, setArtistData] = useState(null)
  const [albumData, setAlbumData] = useState(null)
  const [singlesData, setSinglesData] = useState(null)
  const [topTracks, setTopTracks] = useState(null)
  const [showData, setShowData] = useState(false)

  useEffect(() => {
    const getAlbums = async () => {
      try {
        const artist_data = await apiCall("/artist-data", `?artist_id=${artist}`)
        setArtistData(artist_data.data || {});
        setAlbumData(artist_data.data["albums_list"])
        setSinglesData(artist_data.data["singles_list"])
        setTopTracks(artist_data.data["top_tracks"])
        setShowData(true)
      } catch (err) {
        console.error("Error fetching albums:", err);
      }
    };
    getAlbums();
    
    
  }, [artist]);

  return (
<div className="container-fluid py-4 artist__container">
  {showData ? (
    <div className="row">
      {/* LEFT COLUMN */}
      <div className="col-12 col-md-3 mb-4">
        <div className="card border-0 album__list">
          <div className="card-body">
            <h4 className="fw-bold mb-5" style={{textAlign: "left"}}>Top Tracks</h4>
            <div className="list-group list-group-flush">
              {topTracks.length === 0 ? "No top track data available from Spotify" :topTracks.tracks.map(track => (
                <a
                  key={track.id}
                  href={`/track/${track.id}?artist_id=${artistData.artist.id}&artist_name=${artistData.artist.name}`}
                  className="list-group-item-action d-flex align-items-center album__list__item py-2"
                >
                  <img
                    src={track.album.images[2].url}
                    alt="Track cover"
                    className="me-3 rounded"
                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                  />
                  <div className="d-flex flex-column flex-grow-1 overflow-hidden">
                    <span
                      className="album__name fw-semibold text-truncate d-inline-block"
                      style={{textAlign: "left"}}
                      title={track.name}
                    >
                      {track.name}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="col-12 col-md-9">
        {/* ARTIST HEADER */}
        <div
          className="position-relative text-white rounded-3 overflow-hidden mb-4"
          style={{
            backgroundImage: `url(${artistData.artist.images?.[0]?.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "300px",
          }}
        >
          <div
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{ background: "rgba(0, 0, 0, 0.5)" }}
          ></div>

          <div className="position-absolute bottom-0 start-0 p-4">
            <h1 className="fw-bold mb-1">{artistData.artist.name}</h1>
            <p className="mb-1">{artistData.artist.genres.join(", ")}</p>
            <p className="mb-0">
              <strong>{artistData.info.followers}</strong> followers &nbsp;|&nbsp;
              Albums: {artistData.info.total_albums} &nbsp;|&nbsp;
              Singles: {artistData.info.total_singles} &nbsp;|&nbsp;
              Popularity: {artistData.artist.popularity}%
            </p>
          </div>
        </div>

        <div className="row">

          {/* ALBUMS */}
          <div className="col card border-0 shadow-sm mb-4 album__list m-2">
            <div className="card-body">
              <h3 className="fw-bold mb-5" style={{textAlign: "left"}}>Albums</h3>
              <div className="list-group list-group-flush">
                {albumData.length === 0 ? "No album data available from Spotify" : albumData.map(album => (
                    <a
                      key={album.id}
                      href={`/album/${album.id}?artist_id=${artistData.artist.id}&artist_name=${artistData.artist.name}`}
                      className="list-group-item-action d-flex align-items-center album__list__item py-2"
                    >
                      <img
                        src={album.images?.[2]?.url}
                        alt="Album cover"
                        className="me-3 rounded"
                        style={{ width: "50px", height: "50px", objectFit: "cover" }}
                      />
                      <div className="d-flex flex-column flex-grow-1 overflow-hidden">
                        <span
                          className="album__name fw-semibold text-truncate d-inline-block"
                          style={{textAlign: "left"}}
                          title={album.name}
                        >
                          {album.name}
                        </span>
                        <small style={{textAlign: "left"}}>{album.date}</small>
                      </div>
                    </a>
                  ))}
              </div>
            </div>
          </div>

          {/* SINGLES */}
          <div className="col card border-0 shadow-sm album__list m-2">
            <div className="card-body">
              <h3 className="fw-bold mb-5" style={{textAlign: "left"}}>Singles</h3>
              <div className="list-group list-group-flush">
                {singlesData.length === 0 ? "No singles data available from Spotify." : singlesData.map(single => (
                    <a
                      key={single.id}
                      href={`/album/${single.id}?artist_id=${artistData.artist.id}&artist_name=${artistData.artist.name}`}
                      className="list-group-item-action d-flex align-items-center album__list__item py-2"
                    >
                      <img
                        src={single.images?.[2]?.url}
                        alt="Single cover"
                        className="me-3 rounded"
                        style={{ width: "50px", height: "50px", objectFit: "cover" }}
                      />
                      <div className="d-flex flex-column flex-grow-1 overflow-hidden">
                        <span
                          className="album__name fw-semibold text-truncate d-inline-block"
                          style={{textAlign: "left"}}
                          title={single.name}
                        >
                          {single.name}
                        </span>
                        <small style={{textAlign: "left"}}>
                          {single.date} • {single.total_tracks} track
                          {single.total_tracks > 1 ? "s" : ""}
                        </small>
                      </div>
                    </a>
                  ))}
              </div>
            </div>
          </div>

        </div>


      </div>
    </div>
  ) : <LoadingSpinner />}
</div>


  )

}

export default ArtistDetails