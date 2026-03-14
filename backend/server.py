import os
import asyncio
import logging
from datetime import datetime, timezone
from typing import Optional, List
from contextlib import asynccontextmanager

import httpx
import resend
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
from motor.motor_asyncio import AsyncIOMotorClient

load_dotenv()

# Logging setup
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# MongoDB connection
MONGO_URL = os.environ.get("MONGO_URL")
DB_NAME = os.environ.get("DB_NAME", "portfolio_db")

# Resend setup
RESEND_API_KEY = os.environ.get("RESEND_API_KEY")
SENDER_EMAIL = os.environ.get("SENDER_EMAIL", "onboarding@resend.dev")
NOTIFICATION_EMAIL = os.environ.get("NOTIFICATION_EMAIL", "gauravathode.dev@gmail.com")

if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY

# Pydantic Models
class ContactMessage(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    subject: str = Field(..., min_length=3, max_length=200)
    message: str = Field(..., min_length=10, max_length=2000)

class ContactResponse(BaseModel):
    success: bool
    message: str
    message_id: Optional[str] = None

class GitHubRepo(BaseModel):
    name: str
    description: Optional[str] = None
    html_url: str
    language: Optional[str] = None
    stargazers_count: int = 0
    forks_count: int = 0
    topics: List[str] = []
    updated_at: str

class GitHubStats(BaseModel):
    total_repos: int
    total_stars: int
    top_languages: dict
    repos: List[GitHubRepo]

# Database client
client = None
db = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global client, db
    try:
        client = AsyncIOMotorClient(MONGO_URL)
        db = client[DB_NAME]
        # Test connection
        await client.admin.command('ping')
        logger.info("Connected to MongoDB")
        
        # Create indexes
        await db.contact_messages.create_index("created_at")
        logger.info("Database indexes created")
    except Exception as e:
        logger.error(f"Failed to connect to MongoDB: {e}")
    
    yield
    
    if client:
        client.close()
        logger.info("MongoDB connection closed")

app = FastAPI(
    title="Gaurav Athode Portfolio API",
    description="Backend API for portfolio website",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "service": "Portfolio API"
    }

@app.post("/api/contact", response_model=ContactResponse)
async def submit_contact(contact: ContactMessage):
    """Submit a contact message and send email notification"""
    try:
        # Prepare document for MongoDB
        doc = {
            "name": contact.name,
            "email": contact.email,
            "subject": contact.subject,
            "message": contact.message,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "read": False
        }
        
        # Store in MongoDB
        result = await db.contact_messages.insert_one(doc)
        message_id = str(result.inserted_id)
        logger.info(f"Contact message stored with ID: {message_id}")
        
        # Send email notification
        if RESEND_API_KEY and RESEND_API_KEY != "re_your_api_key_here":
            try:
                html_content = f"""
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #6366f1; border-bottom: 2px solid #6366f1; padding-bottom: 10px;">
                        New Contact Message
                    </h2>
                    <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p><strong>From:</strong> {contact.name}</p>
                        <p><strong>Email:</strong> {contact.email}</p>
                        <p><strong>Subject:</strong> {contact.subject}</p>
                    </div>
                    <div style="background: #fff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
                        <h3 style="color: #334155; margin-top: 0;">Message:</h3>
                        <p style="color: #475569; line-height: 1.6;">{contact.message}</p>
                    </div>
                    <p style="color: #94a3b8; font-size: 12px; margin-top: 20px;">
                        Received from your portfolio website
                    </p>
                </div>
                """
                
                params = {
                    "from": SENDER_EMAIL,
                    "to": [NOTIFICATION_EMAIL],
                    "subject": f"Portfolio Contact: {contact.subject}",
                    "html": html_content,
                    "reply_to": contact.email
                }
                
                # Run sync SDK in thread to keep FastAPI non-blocking
                await asyncio.to_thread(resend.Emails.send, params)
                logger.info(f"Email notification sent to {NOTIFICATION_EMAIL}")
            except Exception as e:
                logger.error(f"Failed to send email notification: {e}")
                # Don't fail the request if email fails
        
        return ContactResponse(
            success=True,
            message="Thank you for your message! I'll get back to you soon.",
            message_id=message_id
        )
        
    except Exception as e:
        logger.error(f"Error submitting contact: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit message. Please try again.")

@app.get("/api/github/repos")
async def get_github_repos():
    """Fetch public repositories from GitHub"""
    github_username = "GauravAthode"
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"https://api.github.com/users/{github_username}/repos",
                params={
                    "sort": "updated",
                    "direction": "desc",
                    "per_page": 30,
                    "type": "owner"
                },
                headers={
                    "Accept": "application/vnd.github.v3+json",
                    "User-Agent": "Portfolio-Website"
                },
                timeout=10.0
            )
            
            if response.status_code != 200:
                logger.error(f"GitHub API error: {response.status_code}")
                raise HTTPException(status_code=502, detail="Failed to fetch GitHub repositories")
            
            repos_data = response.json()
            
            # Filter and transform repos
            repos = []
            for repo in repos_data:
                if not repo.get("fork"):  # Exclude forks
                    repos.append(GitHubRepo(
                        name=repo.get("name", ""),
                        description=repo.get("description"),
                        html_url=repo.get("html_url", ""),
                        language=repo.get("language"),
                        stargazers_count=repo.get("stargazers_count", 0),
                        forks_count=repo.get("forks_count", 0),
                        topics=repo.get("topics", []),
                        updated_at=repo.get("updated_at", "")
                    ))
            
            return {"repos": repos}
            
    except httpx.TimeoutException:
        logger.error("GitHub API timeout")
        raise HTTPException(status_code=504, detail="GitHub API timeout")
    except Exception as e:
        logger.error(f"Error fetching GitHub repos: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch repositories")

@app.get("/api/github/stats")
async def get_github_stats():
    """Fetch GitHub user stats"""
    github_username = "GauravAthode"
    
    try:
        async with httpx.AsyncClient() as client:
            # Fetch user info
            user_response = await client.get(
                f"https://api.github.com/users/{github_username}",
                headers={
                    "Accept": "application/vnd.github.v3+json",
                    "User-Agent": "Portfolio-Website"
                },
                timeout=10.0
            )
            
            # Fetch repos for language stats
            repos_response = await client.get(
                f"https://api.github.com/users/{github_username}/repos",
                params={"per_page": 100, "type": "owner"},
                headers={
                    "Accept": "application/vnd.github.v3+json",
                    "User-Agent": "Portfolio-Website"
                },
                timeout=10.0
            )
            
            if user_response.status_code != 200 or repos_response.status_code != 200:
                raise HTTPException(status_code=502, detail="Failed to fetch GitHub stats")
            
            user_data = user_response.json()
            repos_data = repos_response.json()
            
            # Calculate stats
            total_stars = sum(repo.get("stargazers_count", 0) for repo in repos_data)
            
            # Count languages
            language_counts = {}
            for repo in repos_data:
                lang = repo.get("language")
                if lang:
                    language_counts[lang] = language_counts.get(lang, 0) + 1
            
            # Sort languages by count
            sorted_languages = dict(sorted(language_counts.items(), key=lambda x: x[1], reverse=True)[:6])
            
            return {
                "username": github_username,
                "avatar_url": user_data.get("avatar_url"),
                "public_repos": user_data.get("public_repos", 0),
                "followers": user_data.get("followers", 0),
                "following": user_data.get("following", 0),
                "total_stars": total_stars,
                "top_languages": sorted_languages,
                "profile_url": user_data.get("html_url", f"https://github.com/{github_username}"),
                "bio": user_data.get("bio"),
                "location": user_data.get("location")
            }
            
    except httpx.TimeoutException:
        logger.error("GitHub API timeout")
        raise HTTPException(status_code=504, detail="GitHub API timeout")
    except Exception as e:
        logger.error(f"Error fetching GitHub stats: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch GitHub stats")

@app.get("/api/messages")
async def get_contact_messages():
    """Get all contact messages (for admin)"""
    try:
        cursor = db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1)
        messages = await cursor.to_list(length=100)
        return {"messages": messages}
    except Exception as e:
        logger.error(f"Error fetching messages: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch messages")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
