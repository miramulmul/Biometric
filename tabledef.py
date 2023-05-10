from sqlalchemy import *
from sqlalchemy import create_engine, ForeignKey
from sqlalchemy import Column, Date, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, backref
 
engine = create_engine('sqlite:///login_db.db?check_same_thread=False', echo=True)
Base = declarative_base()
 
########################################################################
class User(Base):
    """"""
    __tablename__ = "users"
 
    id = Column(Integer, primary_key=True)
    username = Column(String)
    email = Column(String)
    rfc = Column(String)
    encoded_face = Column(PickleType)
 
    #----------------------------------------------------------------------
    def __init__(self, username, email, rfc, encoded_face):
        """"""
        self.username = username
        self.email = email
        self.rfc = rfc
        self.encoded_face = encoded_face
 
# create tables
Base.metadata.create_all(engine)