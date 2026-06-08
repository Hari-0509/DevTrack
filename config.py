import os

class Config:
    SECRET_KEY = "devtrack-secret-key"

    SQLALCHEMY_DATABASE_URI = (
    "mysql+pymysql://root:Harish%400905@localhost/devtrack"
    )

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    JWT_SECRET_KEY = "jwt-secret-key"