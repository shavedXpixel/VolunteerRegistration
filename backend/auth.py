import jwt
from functools import wraps
from flask import request, jsonify, current_app
from models import Admin

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            if auth_header.startswith('Bearer '):
                token = auth_header.split(' ')[1]

        if not token:
            return jsonify({'success': False, 'message': 'Token is missing!'}), 401

        try:
            data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
            current_admin = Admin.query.filter_by(id=data['admin_id']).first()
            if not current_admin:
                return jsonify({'success': False, 'message': 'Admin not found'}), 401
        except jwt.ExpiredSignatureError:
            return jsonify({'success': False, 'message': 'Token has expired!'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'success': False, 'message': 'Invalid token!'}), 401

        return f(current_admin, *args, **kwargs)

    return decorated
