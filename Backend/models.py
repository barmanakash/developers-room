from pydantic import BaseModel, EmailStr

class UserSignup(BaseModel):
    full_name: str
    mobile_number: str
    email: EmailStr
    location: str
    current_company: str
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class PostCreate(BaseModel):
    user_email: str
    author_name: str
    title: str
    content: str