from app import create_app
from extensions import db
from models import Admin, Settings
from werkzeug.security import generate_password_hash

app = create_app()

with app.app_context():
    db.drop_all()
    db.create_all()
    
    # Create default admin
    admin = Admin(email='admin@nayepankh.org', password_hash=generate_password_hash('admin123'))
    db.session.add(admin)
    
    # Create default settings
    settings = Settings()
    db.session.add(settings)
    
    db.session.commit()
    print("Database initialized successfully with default admin account.")
