from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from models import UserSignup, UserLogin, PostCreate
from database import users_collection, posts_collection

app = FastAPI(title="Developer Room API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/signup", status_code=status.HTTP_201_CREATED)
def signup(user: UserSignup):
    existing_user = users_collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email is already registered."
        )
    
    user_dict = user.dict()
    users_collection.insert_one(user_dict)
    user_dict.pop("password", None)
    user_dict["id"] = str(user_dict.pop("_id", ""))
    
    return {"message": "User registered successfully", "user": user_dict}

@app.post("/api/login")
def login(credentials: UserLogin):
    user = users_collection.find_one({"email": credentials.email})
    if not user or user["password"] != credentials.password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password."
        )
    
    user_data = {
        "id": str(user["_id"]),
        "full_name": user["full_name"],
        "email": user["email"],
        "mobile_number": user["mobile_number"],
        "location": user["location"],
        "current_company": user["current_company"]
    }
    
    return {"message": "Login successful", "user": user_data}

@app.post("/api/posts", status_code=status.HTTP_201_CREATED)
def create_post(post: PostCreate):
    post_dict = post.dict()
    result = posts_collection.insert_one(post_dict)
    post_dict["id"] = str(result.inserted_id)
    post_dict.pop("_id", None)
    return {"message": "Post created successfully", "post": post_dict}

@app.get("/api/posts")
def get_posts():
    # Fetches all posts from all users across the system
    posts = list(posts_collection.find({}, {"_id": 0}))
    return {"posts": posts}

@app.get("/api/posts/{email}")
def get_user_posts(email: str):
    posts = list(posts_collection.find({"user_email": email}, {"_id": 0}))
    return {"posts": posts}