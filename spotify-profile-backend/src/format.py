import pandas as pd

class Formatter:
    def __init__(self, data):
        self.data = (data)

    def format(self):

        list_of_tracks = []
        albums = self.data
        albums.reverse()
        for album in albums:
            for item in album["tracks"]["items"]:
                item["album_name"] = album["name"]
                item["release_date"] = album["release_date"]
                item["label"] = album["label"]
                list_of_tracks.append(item)
        
        data = pd.DataFrame(list_of_tracks)
        
        data = data[[
            "album_name", "disc_number", "track_number", "name", "duration", "release_date", "label"
        ]]

        data.to_csv("./test.csv", encoding="utf-8", index=False)

        return data.to_json()