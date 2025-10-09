from fastapi import APIRouter, HTTPException
from fastapi.responses import RedirectResponse
import httpx, datetime, base64, os
from dotenv import load_dotenv
from src.format import Formatter

load_dotenv()

client_id = os.getenv("CLIENT_ID")
client_secret = os.getenv("CLIENT_SECRET")
BASE_URL = "https://api.spotify.com/v1"

router = APIRouter()

@router.get("/")
def index():
    return { "status": 200, "message": "Hello World" }

async def get_token():
    async with httpx.AsyncClient() as client:
        url = "https://accounts.spotify.com/api/token"
        headers = {
            "Content-Type": "application/x-www-form-urlencoded"
        }
        params = {
            "grant_type": "client_credentials",
            "client_id": client_id,
            "client_secret": client_secret
        }

        response = await client.post(url=url, headers=headers, params=params)

        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.json())
        
        token = response.json()
        return token

async def call_spotify_api(endpoint: str):
    async with httpx.AsyncClient() as client:
        items_list = []
        token = await get_token()
        url = f"{BASE_URL}{endpoint}"
        headers = {
            "Authorization": f"Bearer {token["access_token"]}"
        }
        response = await client.get(url=url, headers=headers)
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.json())
        
        result = response.json()

        return result

@router.get("/search")
async def search(artist: str = ""):
    query = f"?q=artist:{artist}&type=artist"
    endpoint = f"/search{query}"
    result = await call_spotify_api(endpoint)

    # Bubble Sort to arrange results in order of followers.total.
    arr = result["artists"]["items"]
    n = len(arr)
    for i in range(n-1):
        for j in range(n - i -1):
            if arr[j]["followers"]["total"] > arr[j + 1]["followers"]["total"]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    arr.reverse()

    # Format followers
    for item in result["artists"]["items"]:
        item["followers"]["total"] = format(item["followers"]["total"], ",")

    result["artists"]["items"] = arr

    return result

@router.get("/artist")
async def artist(artist_id: str = ""):
    endpoint = f"/artists/{artist_id}"
    result = await call_spotify_api(endpoint)
    return result

@router.get("/album")
async def album(album_id: str = ""):
    endpoint = f"/albums/{album_id}"
    result = await call_spotify_api(endpoint)

    for item in result["tracks"]["items"]:
        seconds = (item["duration_ms"] / 1000)
        seconds = int(seconds)
        seconds_conv = str(datetime.timedelta(seconds=seconds))
        conv_seconds = datetime.datetime.strptime(seconds_conv, "%H:%M:%S")
        item["duration"] = datetime.datetime.strftime(conv_seconds, "%M:%S")

    return result

@router.get("/albums")
async def albums(artist_id: str = ""):
    items_list = []
    endpoint = f"/artists/{artist_id}/albums"
    result = await call_spotify_api(endpoint)
    items_list += result["items"]

    # Handle "next" call
    while result["next"] != None:
        endpoint = result["next"].split(BASE_URL)[1]
        result = await call_spotify_api(endpoint)
        items_list += result["items"]

    # Only return the YYYY value of the release_date.
    # This is sliced rathen the strpformat due to spotify date formatting issues
    for item in items_list:
        item["date"] = item["release_date"][0:4]

    return items_list
    
@router.get("/artist-data")
async def artist_data(artist_id: str = ""):
    artist_result = await artist(artist_id)
    albums_result = await albums(artist_id)
    top_tracks = await artist_top_tracks(artist_id)

    # Total number of albums
    total_albums = 0
    total_singles = 0
    for album in albums_result:
        if album["album_type"] == "album":
            total_albums += 1
        if album["album_type"] == "single":
            total_singles += 1

    # Conver and format followers    
    followers = format(artist_result["followers"]["total"], ",")
    info = {
        "total_albums": total_albums,
        "total_singles": total_singles,
        "followers": followers
        }
    
    # Format genre
    artist_result["genres"] = [item.capitalize() for item in artist_result["genres"]]

    return { "artist": artist_result, "albums": albums_result, "top_tracks": top_tracks, "info": info }
    
@router.get("/top-tracks")
async def artist_top_tracks(artist_id: str = ""):
    endpoint = f"/artists/{artist_id}/top-tracks"
    result = await call_spotify_api(endpoint)
    return result
    
@router.get("/album-tracks")
async def album_tracks(album_id: str = ""):

    endpoint = f"/albums/{album_id}/tracks"
    result = await call_spotify_api(endpoint)
    return result

@router.get("/track-data")
async def track_data(track_id: str = ""):
    endpoint = f"/tracks/{track_id}"
    result = await call_spotify_api(endpoint)
    
    seconds = (result["duration_ms"] / 1000)
    seconds = int(seconds)
    seconds_conv = str(datetime.timedelta(seconds=seconds))
    conv_seconds = datetime.datetime.strptime(seconds_conv, "%H:%M:%S")
    result["duration"] = datetime.datetime.strftime(conv_seconds, "%M:%S")

    return result

@router.get("/artist-summary")
async def artist_summary(artist_id: str):
    albums_result = await albums(artist_id)
    
    all_album_tracks = []
    for album_data in albums_result:
        if album_data["album_type"] == "album":
            album_tracks = await album(album_data["id"])
            all_album_tracks.append(album_tracks)
    
    formatter = Formatter(all_album_tracks)
    formatted_data = formatter.format()
    print(formatted_data)
    return formatted_data
