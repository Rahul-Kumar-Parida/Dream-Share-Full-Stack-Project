from sqlalchemy.orm import Session
from . import models, schemas, auth
from fastapi import HTTPException, status

def get_user_by_email(db: Session, email: str):
    return db.query(models.UserShare).filter(models.UserShare.email == email).first()

def get_user_by_username(db: Session, username: str):
    return db.query(models.UserShare).filter(models.UserShare.username == username).first()

def create_user(db: Session, user: schemas.UserShareCreate):
    hashed_password = auth.get_password_hash(user.password)
    db_user = models.UserShare(username=user.username, email=user.email, password_hash=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def authenticate_user(db: Session, email: str, password: str):
    user = get_user_by_email(db, email)
    if not user or not auth.verify_password(password, user.password_hash):
        return None
    return user
# ...rest remains unchanged

def create_post(db: Session, user_id: int, post: schemas.PostCreate):
    db_post = models.Post(user_id=user_id, content=post.content)
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post

def get_user_posts(db: Session, user_id: int):
    return db.query(models.Post).filter(models.Post.user_id == user_id).order_by(models.Post.created_at.desc()).all()

def get_all_posts(db: Session):
    return db.query(models.Post).order_by(models.Post.created_at.desc()).all()

def get_post(db: Session, post_id: int):
    return db.query(models.Post).filter(models.Post.id == post_id).first()

def update_post(db: Session, post_id: int, user_id: int, post: schemas.PostCreate):
    db_post = get_post(db, post_id)
    if db_post is None or db_post.user_id != user_id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found or not authorized")
    db_post.content = post.content
    db.commit()
    db.refresh(db_post)
    return db_post

def delete_post(db: Session, post_id: int, user_id: int):
    db_post = get_post(db, post_id)
    if db_post is None or db_post.user_id != user_id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found or not authorized")
    db.delete(db_post)
    db.commit()
    return db_post

def like_post(db: Session, user_id: int, post_id: int):
    existing_like = db.query(models.Like).filter(models.Like.user_id == user_id, models.Like.post_id == post_id).first()
    if existing_like:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Already liked")
    db_like = models.Like(user_id=user_id, post_id=post_id)
    db.add(db_like)
    db.commit()
    db.refresh(db_like)
    return db_like

def get_like_count(db: Session, post_id: int):
    return db.query(models.Like).filter(models.Like.post_id == post_id).count()