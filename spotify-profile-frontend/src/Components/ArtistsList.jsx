const ArtistsList = ({ results, onSelectArtist }) => {
  if (!results?.artists?.items?.length) {
    return <p>No artists found.</p>;
  }

  return (
    <div className="results__container">
      {results.artists.items.map((artist) => (
        <div key={artist.id} className="card artists__card">
          <div className="card-header">
            <span>{artist.name}</span>
          </div>
          <div className="card-body">
            <img src={artist.images?.[2]?.url} alt={artist.name} />
            <p>Followers: {artist.followers.total.toLocaleString()}</p>
            <button
              onClick={() => onSelectArtist(artist)}
              className="btn btn-primary"
            >
              View Artist
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArtistsList;
