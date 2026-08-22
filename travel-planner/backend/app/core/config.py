from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/travel_planner"

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

settings = Settings()
DATABASE_URL = settings.DATABASE_URL