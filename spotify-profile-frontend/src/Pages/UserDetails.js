import axios from "axios"
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";


const UserDetails = () => {
    const [ searchParams ] = useSearchParams()
    const [userDetails, setUserDetails] = useState(null)

    useEffect(() => {
        const auth_code = searchParams.get("code");        

        if (auth_code && !userDetails) {
            const getUser = async () => {
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/user-profile?auth_code=${auth_code}`);
                    setUserDetails(response.data);
                    
                } catch (error) {
                    console.error("Error fetching user:", error);
                }
            };
            getUser();
        }
    }, []);

    return <>
            {userDetails ? 
            <div className="artist__container">

                <div className="card text-bg-dark border-0 shadow-sm rounded-3 overflow-hidden" style={{maxWidth: "700px"}}>
                    <div className="row g-0 align-items-center">
                        <div className="col-md-4">
                            <img src={userDetails.profile.images[0]?.url} className="img-fluid rounded-start" alt="Band Image" />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h1 className="card-title fw-bold mb-1">{userDetails.profile.display_name}</h1>
                                <p className="mb-2">{userDetails.profile.product}</p>
                                <p className="mb-0"><strong>{userDetails.profile.followers.total}</strong> followers</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
    
                    <div className="col">
                        <h2>Top 20 Tracks</h2>
                        <table className="table table-sm table-dark table-striped">
                            <thead>
                                <tr>
                                    <th>Track</th>
                                    <th></th>
                                    <th>Album</th>
                                    <th>Artist</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userDetails.top_tracks.items.map(item => {
                                    return (
                                        <tr>
                                            <td><a className="table__link" href={`/track/${item.id}?artist_id=${item.artists[0].id}&artist_name=${item.artists[0].name}`}>{item.name}</a></td> 
                                            <td><a className="table__link" href={`/album/${item.album.id}?artist_id=${item.artists[0].id}&artist_name=${item.artists[0].name}`}><img className="artist__img" src={item.album.images[0].url} /></a></td>
                                            <td><a className="table__link" href={`/album/${item.album.id}?artist_id=${item.artists[0].id}&artist_name=${item.artists[0].name}`}>{item.album.name}</a></td>
                                            <td><a className="table__link" href={`/artist/${item.artists[0].id}?artist_id=${item.artists[0].id}&artist_name=${item.artists[0].name}`}>{item.artists.map(a => a.name).join(", ")}</a></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                
                    <div className="col">
                        <h2>Top 20 Artists</h2>
                        <table className="table table-sm table-dark table-striped">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Artist</th>
                                    <th>Genres</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userDetails.top_artists.items.map(item => {
                                    return (
                                        <tr>
                                            <td><a className="table__link" href={`/artist/${item.id}?artist_id=${item.id}&artist_name=${item.name}`}><img className="artist__img" src={item.images[2]?.url} alt="Artist Image" /></a></td> 
                                            <td><a className="table__link" href={`/artist/${item.id}?artist_id=${item.id}&artist_name=${item.name}`}>{item.name}</a></td>
                                            <td>{item.genres.map(g => g).join(", ")}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>

                </div>

            </div>          
            : "Loading..." } 
    </>
}

export default UserDetails