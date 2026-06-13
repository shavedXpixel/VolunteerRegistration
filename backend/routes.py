import os
import csv
import io
import jwt
from datetime import datetime, timedelta
from flask import Blueprint, request, jsonify, current_app, send_file, make_response
from werkzeug.utils import secure_filename
from werkzeug.security import check_password_hash
from sqlalchemy import func
from extensions import db
from models import Volunteer, Admin, Settings
from auth import token_required
import openpyxl
from openpyxl.utils import get_column_letter

api_bp = Blueprint('api', __name__)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'pdf'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# ==========================================
# PUBLIC ROUTES
# ==========================================

@api_bp.route('/register', methods=['POST'])
def register():
    try:
        # File handling
        document_path = None
        if 'document' in request.files:
            file = request.files['document']
            if file and file.filename != '' and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                filepath = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
                file.save(filepath)
                document_path = f"uploads/{filename}"

        data = request.form
        
        existing_user = Volunteer.query.filter_by(email=data.get('email')).first()
        if existing_user:
            return jsonify({'success': False, 'message': 'Email already registered.'}), 400

        new_volunteer = Volunteer(
            full_name=data.get('full_name'),
            email=data.get('email'),
            phone=data.get('phone'),
            dob=data.get('dob'),
            city=data.get('city'),
            state=data.get('state'),
            education=data.get('education'),
            profession=data.get('profession'),
            skills=data.get('skills'),
            motivation=data.get('motivation'),
            availability=data.get('availability'),
            preferred_area=data.get('preferred_area'),
            source=data.get('source'),
            document_path=document_path
        )

        db.session.add(new_volunteer)
        db.session.commit()

        return jsonify({'success': True, 'message': 'Registration successful!'}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'message': str(e)}), 500

# ==========================================
# ADMIN AUTH ROUTES
# ==========================================

@api_bp.route('/admin/login', methods=['POST'])
def admin_login():
    data = request.json
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'success': False, 'message': 'Missing email or password'}), 400

    admin = Admin.query.filter_by(email=data.get('email')).first()
    
    if not admin or not check_password_hash(admin.password_hash, data.get('password')):
        return jsonify({'success': False, 'message': 'Invalid credentials'}), 401

    token = jwt.encode({
        'admin_id': admin.id,
        'exp': datetime.utcnow() + timedelta(hours=24)
    }, current_app.config['SECRET_KEY'], algorithm='HS256')

    return jsonify({
        'success': True, 
        'token': token,
        'admin': {'email': admin.email}
    })

# ==========================================
# ADMIN PROTECTED ROUTES
# ==========================================

@api_bp.route('/admin/dashboard', methods=['GET'])
@token_required
def dashboard_stats(current_admin):
    try:
        total_volunteers = Volunteer.query.count()
        today = datetime.utcnow().date()
        today_start = datetime(today.year, today.month, today.day)
        today_regs = Volunteer.query.filter(Volunteer.created_at >= today_start).count()
        
        unique_cities = db.session.query(func.count(func.distinct(Volunteer.city))).scalar()
        active_apps = Volunteer.query.filter(Volunteer.status.in_(['Pending', 'Reviewed', 'Contacted'])).count()

        latest_volunteers = Volunteer.query.order_by(Volunteer.created_at.desc()).limit(5).all()

        return jsonify({
            'success': True,
            'stats': {
                'total_volunteers': total_volunteers,
                'today_registrations': today_regs,
                'total_cities': unique_cities or 0,
                'active_applications': active_apps
            },
            'recent_activity': [v.to_dict() for v in latest_volunteers]
        })
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@api_bp.route('/admin/volunteers', methods=['GET'])
@token_required
def get_volunteers(current_admin):
    try:
        volunteers = Volunteer.query.order_by(Volunteer.created_at.desc()).all()
        return jsonify({'success': True, 'data': [v.to_dict() for v in volunteers]})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@api_bp.route('/admin/volunteer/<int:id>', methods=['GET'])
@token_required
def get_volunteer(current_admin, id):
    volunteer = Volunteer.query.get(id)
    if not volunteer:
        return jsonify({'success': False, 'message': 'Not found'}), 404
    return jsonify({'success': True, 'data': volunteer.to_dict()})

@api_bp.route('/admin/volunteer/<int:id>', methods=['DELETE'])
@token_required
def delete_volunteer(current_admin, id):
    volunteer = Volunteer.query.get(id)
    if not volunteer:
        return jsonify({'success': False, 'message': 'Not found'}), 404
    try:
        db.session.delete(volunteer)
        db.session.commit()
        return jsonify({'success': True, 'message': 'Deleted successfully'})
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'message': str(e)}), 500

@api_bp.route('/admin/volunteers/<int:id>/respond', methods=['POST'])
@token_required
def respond_volunteer(current_admin, id):
    try:
        volunteer = Volunteer.query.get(id)
        if not volunteer:
            return jsonify({'success': False, 'message': 'Volunteer not found'}), 404
        
        data = request.json
        if 'status' in data:
            volunteer.status = data['status']
        if 'admin_notes' in data:
            volunteer.admin_notes = data['admin_notes']
            
        db.session.commit()
        return jsonify({'success': True, 'message': 'Response saved successfully', 'data': volunteer.to_dict()})
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'message': str(e)}), 500

@api_bp.route('/admin/reports', methods=['GET'])
@token_required
def get_reports(current_admin):
    try:
        # Volunteers by City
        city_counts = db.session.query(Volunteer.city, func.count(Volunteer.id)).group_by(Volunteer.city).all()
        by_city = [{'name': city, 'value': count} for city, count in city_counts]

        # Volunteers by State
        state_counts = db.session.query(Volunteer.state, func.count(Volunteer.id)).group_by(Volunteer.state).all()
        by_state = [{'name': state, 'value': count} for state, count in state_counts]

        # Volunteer Interests (Preferred Area)
        area_counts = db.session.query(Volunteer.preferred_area, func.count(Volunteer.id)).group_by(Volunteer.preferred_area).all()
        by_interest = [{'name': area, 'value': count} for area, count in area_counts]

        return jsonify({
            'success': True,
            'data': {
                'by_city': by_city,
                'by_state': by_state,
                'by_interest': by_interest
            }
        })
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@api_bp.route('/admin/export/csv', methods=['GET'])
@token_required
def export_csv(current_admin):
    volunteers = Volunteer.query.all()
    si = io.StringIO()
    cw = csv.writer(si)
    cw.writerow(['ID', 'Full Name', 'Email', 'Phone', 'DOB', 'City', 'State', 'Education', 'Profession', 'Skills', 'Availability', 'Preferred Area', 'Status', 'Applied At'])
    
    for v in volunteers:
        cw.writerow([v.id, v.full_name, v.email, v.phone, v.dob, v.city, v.state, v.education, v.profession, v.skills, v.availability, v.preferred_area, v.status, v.created_at.strftime('%Y-%m-%d')])
    
    output = make_response(si.getvalue())
    output.headers["Content-Disposition"] = "attachment; filename=volunteers.csv"
    output.headers["Content-type"] = "text/csv"
    return output

@api_bp.route('/admin/export/excel', methods=['GET'])
@token_required
def export_excel(current_admin):
    volunteers = Volunteer.query.all()
    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = "Volunteers"
    
    headers = ['ID', 'Full Name', 'Email', 'Phone', 'DOB', 'City', 'State', 'Education', 'Profession', 'Skills', 'Availability', 'Preferred Area', 'Status', 'Applied At']
    ws.append(headers)
    
    for v in volunteers:
        ws.append([v.id, v.full_name, v.email, v.phone, v.dob, v.city, v.state, v.education, v.profession, v.skills, v.availability, v.preferred_area, v.status, v.created_at.strftime('%Y-%m-%d')])
    
    # Auto-adjust column widths
    for col in ws.columns:
        max_length = 0
        column = col[0].column_letter
        for cell in col:
            try:
                if len(str(cell.value)) > max_length:
                    max_length = len(str(cell.value))
            except:
                pass
        adjusted_width = (max_length + 2)
        ws.column_dimensions[column].width = adjusted_width

    output = io.BytesIO()
    wb.save(output)
    output.seek(0)
    
    response = make_response(output.read())
    response.headers['Content-Disposition'] = 'attachment; filename=volunteers.xlsx'
    response.headers['Content-Type'] = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    return response

@api_bp.route('/admin/settings', methods=['GET', 'POST'])
@token_required
def manage_settings(current_admin):
    settings = Settings.query.first()
    if not settings:
        settings = Settings()
        db.session.add(settings)
        db.session.commit()
        
    if request.method == 'POST':
        data = request.json
        settings.org_name = data.get('org_name', settings.org_name)
        settings.contact_email = data.get('contact_email', settings.contact_email)
        settings.phone_number = data.get('phone_number', settings.phone_number)
        settings.address = data.get('address', settings.address)
        settings.facebook = data.get('facebook', settings.facebook)
        settings.instagram = data.get('instagram', settings.instagram)
        settings.twitter = data.get('twitter', settings.twitter)
        settings.linkedin = data.get('linkedin', settings.linkedin)
        settings.youtube = data.get('youtube', settings.youtube)
        db.session.commit()
        return jsonify({'success': True, 'message': 'Settings updated successfully', 'data': settings.to_dict()})
        
    return jsonify({'success': True, 'data': settings.to_dict()})

# Allow public access to settings for Navbar/Footer
@api_bp.route('/settings', methods=['GET'])
def get_public_settings():
    settings = Settings.query.first()
    if not settings:
        return jsonify({'success': True, 'data': {}})
    return jsonify({'success': True, 'data': settings.to_dict()})
