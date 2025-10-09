from fastapi import APIRouter, HTTPException
from fastapi.responses import RedirectResponse
import httpx, datetime, base64, os
from dotenv import load_dotenv

load_dotenv()

client_id = os.getenv("CLIENT_ID")
client_secret = os.getenv("CLIENT_SECRET")

router = APIRouter()

@router.get("/login")
async def login():
    async with httpx.AsyncClient() as client:
        # query = f"?response_type=code&client_id={client_id}&scope=user-read-private%20user-read-email%20user-top-read&redirect_uri=http://127.0.0.1:8000/callback" 
        query_params = {
            "response_type": "code",
            "client_id": client_id,
            "scope": "user-read-private user-read-email user-top-read",
            "redirect_uri": "http://127.0.0.1:8000/callback"
        }
        url = "https://accounts.spotify.com/authorize"
        auth_url = f"{url}?{query_params}"
        return RedirectResponse(auth_url)

@router.get("/callback")
async def callback(code: str = ""):
    async with httpx.AsyncClient() as client:
        url = "https://accounts.spotify.com/api/token"
        encoded_auth_headed = base64.b64encode(f"{client_id}:{client_secret}".encode()).decode()
        headers = {
            "content-type": "application/x-www-form-urlencoded",
            "Authorization": f"Basic {encoded_auth_headed}"
        }
        data = {
            "code": code,
            "redirect_uri": "http://127.0.0.1:8000/callback",
            "grant_type": 'authorization_code'
        }
        token_response = await client.post(url=url, headers=headers, data=data)

        if token_response.status_code != 200:
            raise HTTPException(status_code=token_response.status_code, detail=token_response.json())

        tokens = token_response.json()
        access_token = tokens["access_token"]
        
        profile = user_profile(access_token)
        
    
@router.get("/user-profile")
async def user_profile(auth_code: str = ""):
    async with httpx.AsyncClient() as client:
        headers = {"Authorization": f"Bearer {auth_code}"}
        profile_url = "https://api.spotify.com/v1/me"
        profile_response = await client.get(url=profile_url, headers=headers)

        if profile_response.status_code != 200:
            raise HTTPException(status_code=profile_response.status_code, detail=profile_response.json())
        
        top_tracks_response = await client.get(url="https://api.spotify.com/v1/me/top/tracks", headers=headers)

        if top_tracks_response.status_code != 200:
            raise HTTPException(status_code=top_tracks_response.status_code, detail=top_tracks_response.json())
        
        top_artists_response = await client.get(url="https://api.spotify.com/v1/me/top/artists", headers=headers)

        if top_tracks_response.status_code != 200:
            raise HTTPException(status_code=top_tracks_response.status_code, detail=top_tracks_response.json())

        return {"profile": profile_response.json() , "top_tracks": top_tracks_response.json(), "top_artists": top_artists_response.json()}
    
# @router.get("/user-top")
# async def user_top(auth_code: str = ""):
#     async with httpx.AsyncClient() as client:
#         type = "tracks"
#         url = f"https://api.spotify.com/v1/me/top/{type}"
#         headers = {"Authorization": f"Bearer {auth_code}"}
        
#         response = await client.get(url=url, headers=headers)

#         if response.status_code != 200:
#             raise HTTPException(status_code=response.status_code, detail=response.json())
        
#         return response.json()



# async def get_auth_token(auth_code: str = ""):
#     async with httpx.AsyncClient() as client:
#         url = "https://accounts.spotify.com/api/token"
#         encoded_auth_headed = base64.b64encode(f"{client_id}:{client_secret}".encode()).decode()
#         headers = {
#             "content-type": "application/x-www-form-urlencoded",
#             "Authorization": f"Basic {encoded_auth_headed}"
#         }
#         data = {
#             "code": auth_code,
#             "redirect_uri": "http://127.0.0.1:3000/user",
#             "grant_type": 'authorization_code'
#         }
#         response = await client.post(url=url, headers=headers, data=data)

#         if response.status_code != 200:
#             raise HTTPException(status_code=response.status_code, detail=response.json())

#         tokens = response.json()
#         return tokens
