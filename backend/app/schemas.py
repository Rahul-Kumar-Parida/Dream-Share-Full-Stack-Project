from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

class UserShareBase(BaseModel):
    username: str
    email: EmailStr

class UserShareCreate(UserShareBase):
    password: str

class UserShareOut(UserShareBase):
    id: int
    created_at: datetime
    model_config = {
        "from_attributes": True
    }

class PostBase(BaseModel):
    content: str

class PostCreate(PostBase):
    pass

class PostOut(PostBase):
    id: int
    user_id: int
    username: str 
    created_at: datetime
    like_count: int
    model_config = {
        "from_attributes": True
    }

class LikeOut(BaseModel):
    id: int
    user_id: int
    post_id: int
    created_at: datetime
    model_config = {
        "from_attributes": True
    }

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    user_id: Optional[int] = None