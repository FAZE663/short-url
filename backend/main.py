from fastapi import FastAPI, Request , Depends
from fastapi.responses import HTMLResponse, RedirectResponse, JSONResponse
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
from .short import shorten
from .storage import addentry ,getentry
import os 


FRONTEND_URL = os.getenv('FRONTEND_URL')


from .database.db import get_db

from sqlalchemy.orm import Session


class Payload(BaseModel):
    url : str


origins = [
    "http://localhost:5173",  # React dev server
    "http://127.0.0.1:5173",
]


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials = True,
    allow_methods=['*'],
    allow_headers=['*']
)

 

@app.post("/shorten")
def short(payload : Payload , db : Session = Depends(get_db) ):
    print("shorten: ",payload)
    lourl = payload.url
    shurl = shorten()

    addentry(db, shurl,lourl)

    return {
        "short_url": f"{FRONTEND_URL}/{shurl}"
    }








@app.get("/{shurl}")
def redirect(shurl , db : Session = Depends(get_db)):
    #get value from temparr and redirect to correcturl
    print(shurl)
    data = getentry(db,shurl)
    

    if data is None:
        return RedirectResponse(url=f"{FRONTEND_URL}/error") 
    
    if not data.isactive:
        return RedirectResponse(url=f"{FRONTEND_URL}/error?reason=expired")
    
    if data.expires_at <= datetime.now():
        data.isactive=False
        db.commit() 
        
        return RedirectResponse(url=f"{FRONTEND_URL}/error?reason=expired")

    data.clicks +=1
    db.commit()

    return RedirectResponse(url= data.url)
    
     

