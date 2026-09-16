import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")

if not MONGO_URI:
    raise ValueError("MONGO_URI is not set in the .env file!")

client = MongoClient(MONGO_URI)
db = client["developer_room_db"]
users_collection = db["users"]
posts_collection = db["posts"]