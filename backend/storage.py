from .database.db import engine , Base
from .database.model import shorturl
from datetime import datetime , timedelta

Base.metadata.create_all(bind = engine)


def addentry(db,shurl,lourl ,created_at =datetime.now() ,expiry = 7200,isactive=True):
    entry = shorturl(
        shurl = shurl,
        url = lourl,
        expires_at = created_at + timedelta(seconds=7200)

    )

    db.add(entry)
    db.commit()
    db.refresh(entry)   

    return entry


def getentry(db,shurl):
    entry = db.query(shorturl).filter(shorturl.shurl == shurl).first()
    return entry



    