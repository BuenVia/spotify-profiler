from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import httpx
import datetime

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

CLIENT_ID = "7bd78ba02f35448c94cdf661ab160686"
CLIENT_SECRET = "8f0843175ed74119afae7a45e66606a0"

@app.get("/")
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
            "client_id": CLIENT_ID,
            "client_secret": CLIENT_SECRET
        }

        response = await client.post(url=url, headers=headers, params=params)

        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.json())
        
        token = response.json()
        return token


@app.get("/search")
async def search(artist: str = ""):
    async with httpx.AsyncClient() as client:
        token = await get_token()
        url = "https://api.spotify.com/v1/search"
        headers = {
            "Authorization": f"Bearer {token["access_token"]}"
        }
        query = f"artist:{artist}&type=artist"
        full_url = f"{url}?q={query}"
        print(full_url)

        response = await client.get(url=full_url, headers=headers)

        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.json())
        
        return response.json()

@app.get("/artist")
async def album(artist_id: str = ""):
    async with httpx.AsyncClient() as client:
        token = await get_token()
        url = f"https://api.spotify.com/v1/artists/{artist_id}"
        headers = {
            "Authorization": f"Bearer {token["access_token"]}"
        }

        response = await client.get(url=url, headers=headers)

        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.json())


        result = response.json()
        return result

@app.get("/album")
async def album(album_id: str = ""):
    async with httpx.AsyncClient() as client:
        token = await get_token()
        url = f"https://api.spotify.com/v1/albums/{album_id}"
        headers = {
            "Authorization": f"Bearer {token["access_token"]}"
        }

        response = await client.get(url=url, headers=headers)

        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.json())


        result = response.json()

        for item in result["tracks"]["items"]:
            seconds = (item["duration_ms"] / 1000)
            seconds = int(seconds)
            seconds_conv = str(datetime.timedelta(seconds=seconds))
            conv_seconds = datetime.datetime.strptime(seconds_conv, "%H:%M:%S")
            item["duration"] = datetime.datetime.strftime(conv_seconds, "%M:%S")
        return result
        

@app.get("/albums")
async def artist(artist_id: str = ""):
    async with httpx.AsyncClient() as client:
        items_list = []
        token = await get_token()
        url = f"https://api.spotify.com/v1/artists/{artist_id}/albums"
        headers = {
            "Authorization": f"Bearer {token["access_token"]}"
        }

        response = await client.get(url=url, headers=headers)

        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.json())


        result = response.json()
        items_list += result["items"]

        while result["next"] != None:
            url = result["next"]
            headers = {
                "Authorization": f"Bearer {token["access_token"]}"
            }

            response = await client.get(url=url, headers=headers)

            if response.status_code != 200:
                raise HTTPException(status_code=response.status_code, detail=response.json())
            
            result = response.json()
            items_list += result["items"]

        for item in items_list:
            item["date"] = item["release_date"][0:4]

        return items_list
    
@app.get("/top-tracks")
async def artist_top_tracks(artist_id: str = ""):
    async with httpx.AsyncClient() as client:
        token = await get_token()
        url = f"https://api.spotify.com/v1/artists/{artist_id}/top-tracks"
        headers = {
            "Authorization": f"Bearer {token["access_token"]}"
        }
        response = await client.get(url=url, headers=headers)

        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.json())
        
        return response.json()
    
@app.get("/album-tracks")
async def album_tracks(album_id: str = ""):
    async with httpx.AsyncClient() as client:
        token = await get_token()
        url = f"https://api.spotify.com/v1/albums/{album_id}/tracks"
        headers = {
            "Authorization": f"Bearer {token["access_token"]}"
        }
        response = await client.get(url=url, headers=headers)

        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.json())

        return response.json()

@app.get("/track-data")
async def track_data(track_id: str = ""):
    async with httpx.AsyncClient() as client:
        token = await get_token()
        url = f"https://api.spotify.com/v1/tracks/{track_id}"
        headers = {
            "Authorization": f"Bearer {token["access_token"]}"
        }
        response = await client.get(url=url, headers=headers)

        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.json())
        
        item = response.json()

        seconds = (item["duration_ms"] / 1000)
        seconds = int(seconds)
        seconds_conv = str(datetime.timedelta(seconds=seconds))
        conv_seconds = datetime.datetime.strptime(seconds_conv, "%H:%M:%S")
        item["duration"] = datetime.datetime.strftime(conv_seconds, "%M:%S")

        return item