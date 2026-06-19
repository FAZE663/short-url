from sqlalchemy import Column,Integer,String,DateTime,Boolean,BLOB

from datetime import datetime , timedelta

from .db import Base


class shorturl(Base):
    __tablename__='urls'

    id = Column(Integer , primary_key= True , index=True)

    shurl = Column(String(20) , unique=True ,nullable= False , index=True)

    url = Column(String, nullable=False)

    clicks = Column(Integer , default=0)

    created_at = Column(DateTime , default=datetime.now())

    expires_at = Column(DateTime , default=datetime.now() + timedelta(hours=2))

    isactive = Column(Boolean , nullable=False ,default= True)


