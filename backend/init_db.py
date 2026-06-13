from app import create_app
import os
from extensions import db
from models import Admin, Settings
from werkzeug.security import generate_password_hash

app = create_app()

with app.app_context():
    db.drop_all()
    db.create_all()
    
    # Create default admin from environment variables
    admin_email = os.environ.get('ADMIN_EMAIL', 'admin@nayepankh.org')
    admin_pass = os.environ.get('ADMIN_PASSWORD', 'admin123')
    admin = Admin(email=admin_email, password_hash=generate_password_hash(admin_pass))
    db.session.add(admin)
    
    # Create default settings
    settings = Settings()
    db.session.add(settings)
    
    db.session.commit()
    print("Database initialized successfully with default admin account.")
