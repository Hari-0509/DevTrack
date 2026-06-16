class Config:

    SECRET_KEY = "devtrack-secret-key"

    SQLALCHEMY_DATABASE_URI = "sqlite:///devtrack.db"

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    JWT_SECRET_KEY = "jwt-secret-key"