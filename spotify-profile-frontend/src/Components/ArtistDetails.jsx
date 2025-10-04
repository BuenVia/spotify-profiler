// import { useEffect, useState } from "react";
// import apiCall from "../api";
// import AlbumDetails from "./AlbumDetails";

// const ArtistDetails = ({ artist }) => {
//   const [albums, setAlbums] = useState([]);
//   const [selectedAlbum, setSelectedAlbum] = useState(null);

//   useEffect(() => {
//     const getAlbums = async () => {
//       try {
//         const res = await apiCall("/albums", `?artist_id=${artist.id}`);
//         setAlbums(res.data || []);
//       } catch (err) {
//         console.error("Error fetching albums:", err);
//       }
//     };
//     getAlbums();
//   }, [artist.id]);

//   return (
//     <div className="row">

//         <h2>{artist.name}</h2>
//         <img src={artist.images?.[0]?.url} alt={artist.name} />
//         <p>Genres: {artist.genres.join(", ")}</p>
//         <p>Followers: {artist.followers.total.toLocaleString()}</p>


//       <div className="row">
//         <h3>Albums</h3>
//         <div className="album__container">
//           {albums.length > 0 ? (
//             albums
//               .filter((album) => album.album_type === "album")
//               .map((album) => (
//                 <div key={album.id} className="card album__card">
//                   <div
//                     onClick={() => setSelectedAlbum(album)}
//                     className="album__btn"
//                   >
//                     <p>
//                       <b>{album.name}</b>
//                     </p>
//                     <img src={album.images?.[0]?.url} alt={album.name} />
//                     <p>Release Date: {album.release_date}</p>
//                   </div>
//                   {selectedAlbum?.id === album.id && (
//                     <AlbumDetails albumId={album.id} />
//                   )}
//                 </div>
//               ))
//           ) : (
//             <p>Loading albums...</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ArtistDetails;


import { useEffect, useState } from "react";
import apiCall from "../api";
import AlbumDetails from "./AlbumDetails";

const ArtistDetails = ({ artist }) => {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  useEffect(() => {
    const getAlbums = async () => {
      try {
        const res = await apiCall("/albums", `?artist_id=${artist.id}`);
        setAlbums(res.data || []);
      } catch (err) {
        console.error("Error fetching albums:", err);
      }
    };
    getAlbums();
  }, [artist.id]);

  return (
    <div className="artist-page">
      {/* Hero Header */}
      <div
        className="artist-hero text-white d-flex align-items-end p-4 mb-4"
        style={{
          backgroundImage: `url(${artist.images?.[0]?.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "400px",
        }}
      >
        <div className="bg-dark bg-opacity-50 p-3 rounded">
          <h1 className="display-4 fw-bold">{artist.name}</h1>
          <p className="mb-1">
            <strong>Followers:</strong>{" "}
            {artist.followers.total.toLocaleString()}
          </p>
          <p className="mb-0">
            <strong>Genres:</strong> {artist.genres.join(", ")}
          </p>
        </div>
      </div>

      {/* Albums Section */}
      <div className="container">
        <h2 className="mb-4">Albums</h2>
        <div className="row g-4">
          {albums.length > 0 ? (
            albums
              .filter((album) => album.album_type === "album")
              .map((album) => (
                <div key={album.id} className="col-6 col-md-4 col-lg-3">
                  <div
                    className="card h-100 shadow-sm album-card"
                    role="button"
                    onClick={() => setSelectedAlbum(album)}
                  >
                    <img
                      src={album.images?.[0]?.url}
                      className="card-img-top"
                      alt={album.name}
                    />
                    <div className="card-body text-center">
                      <h5 className="card-title">{album.name}</h5>
                      <p className="card-text text-muted">
                        {album.release_date}
                      </p>
                    </div>
                  </div>
                  {selectedAlbum?.id === album.id && (
                    <div className="mt-2">
                      <AlbumDetails albumId={album.id} />
                    </div>
                  )}
                </div>
              ))
          ) : (
            <p>Loading albums...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtistDetails;
