import os
from flask import Flask
from flask_cors import CORS
from extensions import db

def create_app():
    app = Flask(__name__)
    CORS(app)

    # Configuration
    basedir = os.path.abspath(os.path.dirname(__file__))
    app.config['SECRET_KEY'] = 'super-secret-key-for-internship'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'database.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['UPLOAD_FOLDER'] = os.path.join(basedir, 'uploads')
    app.config['MAX_CONTENT_LENGTH'] = 5 * 1024 * 1024  # 5MB max upload

    # Ensure upload folder exists
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

    # Initialize extensions with app
    db.init_app(app)

    # Import and register routes
    with app.app_context():
        import routes
        app.register_blueprint(routes.api_bp, url_prefix='/api')
        db.create_all()

        # Ensure default admin exists if configured via environment variables
        from models import Admin
        from werkzeug.security import generate_password_hash
        admin_email = os.environ.get('ADMIN_EMAIL')
        admin_pass = os.environ.get('ADMIN_PASSWORD')
        
        if admin_email and admin_pass:
            if not Admin.query.filter_by(email=admin_email).first():
                admin = Admin(email=admin_email, password_hash=generate_password_hash(admin_pass))
                db.session.add(admin)
                db.session.commit()


    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5000)
