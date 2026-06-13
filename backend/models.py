from extensions import db
from datetime import datetime

class Volunteer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(150), nullable=False, unique=True)
    phone = db.Column(db.String(20), nullable=False)
    dob = db.Column(db.String(20), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    state = db.Column(db.String(100), nullable=False)
    education = db.Column(db.String(150), nullable=False)
    profession = db.Column(db.String(150), nullable=False)
    skills = db.Column(db.Text, nullable=False)
    motivation = db.Column(db.Text, nullable=False)
    availability = db.Column(db.String(100), nullable=False)
    preferred_area = db.Column(db.String(100), nullable=False)
    source = db.Column(db.String(100), nullable=True)
    document_path = db.Column(db.String(255), nullable=True)
    status = db.Column(db.String(50), default='Pending')
    admin_notes = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'full_name': self.full_name,
            'email': self.email,
            'phone': self.phone,
            'dob': self.dob,
            'city': self.city,
            'state': self.state,
            'education': self.education,
            'profession': self.profession,
            'skills': self.skills,
            'motivation': self.motivation,
            'availability': self.availability,
            'preferred_area': self.preferred_area,
            'source': self.source,
            'document_path': self.document_path,
            'status': self.status,
            'admin_notes': self.admin_notes,
            'created_at': self.created_at.isoformat()
        }

class Admin(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Settings(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    org_name = db.Column(db.String(150), default='NayePankh Foundation')
    contact_email = db.Column(db.String(150), default='info@nayepankhfoundation.org')
    phone_number = db.Column(db.String(20), default='+91 91234 56789')
    address = db.Column(db.String(255), default='Pune, Maharashtra, India')
    facebook = db.Column(db.String(255), default='')
    instagram = db.Column(db.String(255), default='')
    twitter = db.Column(db.String(255), default='')
    linkedin = db.Column(db.String(255), default='')
    youtube = db.Column(db.String(255), default='')
    
    def to_dict(self):
        return {
            'org_name': self.org_name,
            'contact_email': self.contact_email,
            'phone_number': self.phone_number,
            'address': self.address,
            'facebook': self.facebook,
            'instagram': self.instagram,
            'twitter': self.twitter,
            'linkedin': self.linkedin,
            'youtube': self.youtube
        }
