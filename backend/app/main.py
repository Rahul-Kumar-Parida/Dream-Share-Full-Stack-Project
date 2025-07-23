from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from . import models, schemas, crud, auth, database
from fastapi.security import OAuth2PasswordRequestForm
from typing import List

# Import all models to ensure all tables are created
from .models import UserShare, Post, Like

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

origins = [
    "https://dream-share-full-stack-project.vercel.app/",
    "http://localhost:5173",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Welcome to DreamShare API!"}

@app.post("/register", response_model=schemas.UserShareOut)
def register(user: schemas.UserShareCreate, db: Session = Depends(auth.get_db)):
    if crud.get_user_by_email(db, user.email) or crud.get_user_by_username(db, user.username):
        raise HTTPException(status_code=400, detail="Email or username already registered")
    return crud.create_user(db, user)

@app.post("/login", response_model=schemas.Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(auth.get_db)):
    # Use email as username
    user = crud.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    access_token = auth.create_access_token(data={"sub": str(user.id)})  # Ensure sub is a string
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/me", response_model=schemas.UserShareOut)
def get_me(current_user: models.UserShare = Depends(auth.get_current_user)):
    return current_user

@app.post("/posts", response_model=schemas.PostOut)
def create_post(
    post: schemas.PostCreate,
    db: Session = Depends(auth.get_db),
    current_user: models.UserShare = Depends(auth.get_current_user)
):
    db_post = crud.create_post(db, current_user.id, post)
    like_count = crud.get_like_count(db, db_post.id)
    return schemas.PostOut(
        **db_post.__dict__,
        username=db_post.owner.username,
        like_count=like_count
    )

@app.get("/posts/me", response_model=List[schemas.PostOut])
def get_my_posts(
    db: Session = Depends(auth.get_db),
    current_user: models.UserShare = Depends(auth.get_current_user)
):
    posts = crud.get_user_posts(db, current_user.id)
    return [
        schemas.PostOut(
            **p.__dict__,
            username=p.owner.username,
            like_count=crud.get_like_count(db, p.id)
        )
        for p in posts
    ]

@app.get("/posts", response_model=List[schemas.PostOut])
def get_all_posts(db: Session = Depends(auth.get_db)):
    posts = crud.get_all_posts(db)
    return [
        schemas.PostOut(
            **p.__dict__,
            username=p.owner.username,
            like_count=crud.get_like_count(db, p.id)
        )
        for p in posts
    ]

@app.get("/posts/{post_id}", response_model=schemas.PostOut)
def get_post(post_id: int, db: Session = Depends(auth.get_db)):
    post = crud.get_post(db, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    like_count = crud.get_like_count(db, post.id)
    return schemas.PostOut(
        **post.__dict__,
        username=post.owner.username,
        like_count=like_count
    )

@app.put("/posts/{post_id}", response_model=schemas.PostOut)
def update_post(
    post_id: int,
    post: schemas.PostCreate,
    db: Session = Depends(auth.get_db),
    current_user: models.UserShare = Depends(auth.get_current_user)
):
    db_post = crud.update_post(db, post_id, current_user.id, post)
    like_count = crud.get_like_count(db, db_post.id)
    return schemas.PostOut(
        **db_post.__dict__,
        username=db_post.owner.username,
        like_count=like_count
    )

@app.delete("/posts/{post_id}")
def delete_post(
    post_id: int,
    db: Session = Depends(auth.get_db),
    current_user: models.UserShare = Depends(auth.get_current_user)
):
    crud.delete_post(db, post_id, current_user.id)
    return {"detail": "Post deleted"}

@app.post("/posts/{post_id}/like", response_model=schemas.LikeOut)
def like_post(
    post_id: int,
    db: Session = Depends(auth.get_db),
    current_user: models.UserShare = Depends(auth.get_current_user)
):
    return crud.like_post(db, current_user.id, post_id)