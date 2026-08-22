from pydantic_settings import BaseSettings, SettingsConfigDict, NoDecode
from pydantic import field_validator
from typing import List, Union, Annotated
import json

class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/travel_planner"
    SECRET_KEY: str = "placeholder_secret_key"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    CORS_ORIGINS: Annotated[Union[List[str], str], NoDecode] = ["http://localhost:5173"]

    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> List[str]:
        if isinstance(v, str):
            if v.startswith("[") and v.endswith("]"):
                try:
                    return json.loads(v)
                except Exception:
                    pass
            return [i.strip() for i in v.split(",") if i.strip()]
        elif isinstance(v, list):
            return v
        return [v]

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

settings = Settings()