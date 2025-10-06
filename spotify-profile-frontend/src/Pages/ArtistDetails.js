import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiCall from "../api";

const ArtistDetails = () => {
  const { artist } = useParams()
  const [albums, setAlbums] = useState([]);
  const [artistData, setArtistData] = useState(null)
  const [showData, setShowData] = useState(false)

  useEffect(() => {
    const getAlbums = async () => {
      try {
        const res = await apiCall("/albums", `?artist_id=${artist}`);
        setAlbums(res.data || []);
        const res_artist = await apiCall("/artist", `?artist_id=${artist}`)
        setArtistData(res_artist.data)
        setShowData(true)
        
      } catch (err) {
        console.error("Error fetching albums:", err);
      }
    };
    getAlbums();
  }, [artist]);



  return (
    <div className="artist__container">
      {showData ? <>
        <div className="card text-bg-dark border-0 shadow-sm rounded-3 overflow-hidden" style={{maxWidth: "700px"}}>
          <div className="row g-0 align-items-center">
            <div className="col-md-4">
              <img src={artistData.images?.[0]?.url} className="img-fluid rounded-start" alt="Band Image" />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h1 className="card-title fw-bold mb-1">{artistData.name}</h1>
                <p className="mb-2">{artistData.genres.map(g => g).join(", ")}</p>
                <p className="mb-0"><strong>{artistData.followers.total}</strong> followers</p>
              </div>
            </div>
          </div>
        </div>


      <div className="row">
        
        <div className="col">
        {/* ALBUM DETAILS */}
        <h3>Albums</h3>
        <table className="table table-dark table-striped-columns">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Released</th>
              <th>Tracks</th>
            </tr>
          </thead>
          <tbody>
            {albums.filter(album => album.album_type === "album").map(album => (
              <tr>
                <td><img src={album.images?.[2]?.url} alt="IMG"></img></td>
                <td><a href={`/album/${album.id}?artist_id=${artistData.id}&artist_name=${artistData.name}`} className="table__link">{album.name}</a></td>
                <td>{album.date}</td>
                <td>{album.total_tracks}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

        <div className="col">

        

          {/* SINGLE DETAILS */}
          <h3>Singles</h3>
          <table className="table table-dark table-striped-columns">
            <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Release</th>
              <th>Tracks</th>
              </tr>
            </thead>
            <tbody>
            {albums.filter(album => album.album_type === "single").map(single => (
              <tr>
              <td><img src={single.images?.[2]?.url} alt="IMG"></img></td>
              <td><a href={"/album/" + single.id} className="table__link">{single.name}</a></td>
              <td>{single.date}</td>
              <td>{single.total_tracks}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>

      </div>
</>: "Loading Data..."}
    </div>
  )

}

export default ArtistDetails