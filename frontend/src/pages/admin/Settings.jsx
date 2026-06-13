import React, { useState, useEffect } from 'react';
import { Save, Loader2 } from 'lucide-react';
import api from '../../utils/api';

const Settings = () => {
  const [formData, setFormData] = useState({
    org_name: '',
    contact_email: '',
    phone_number: '',
    address: '',
    facebook: '',
    instagram: '',
    twitter: '',
    linkedin: '',
    youtube: ''
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await api.get('/admin/settings');
      if (response.data.success && response.data.data) {
        setFormData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ text: '', type: '' });
    try {
      const response = await api.post('/admin/settings', formData);
      if (response.data.success) {
        setMessage({ text: 'Settings saved successfully!', type: 'success' });
      }
    } catch (error) {
      setMessage({ text: 'Failed to save settings.', type: 'error' });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    }
  };

  if (loading) {
    return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-primary w-8 h-8" /></div>;
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Organization Settings</h1>
        <p className="text-gray-500 mt-1">Manage public contact details and social media links.</p>
      </div>

      {message.text && (
        <div className={`p-4 rounded-lg font-bold text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Info */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-3">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Organization Name</label>
              <input
                type="text"
                name="org_name"
                value={formData.org_name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Contact Email</label>
              <input
                type="email"
                name="contact_email"
                value={formData.contact_email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Phone Number</label>
              <input
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary transition-all"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-1">Office Address</label>
              <textarea
                name="address"
                rows="2"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary transition-all resize-none"
              />
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-3">Social Media Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Facebook URL</label>
              <input
                type="url"
                name="facebook"
                value={formData.facebook}
                onChange={handleChange}
                placeholder="https://facebook.com/..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Instagram URL</label>
              <input
                type="url"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                placeholder="https://instagram.com/..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Twitter (X) URL</label>
              <input
                type="url"
                name="twitter"
                value={formData.twitter}
                onChange={handleChange}
                placeholder="https://twitter.com/..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">LinkedIn URL</label>
              <input
                type="url"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary transition-all"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg shadow-sm transition-colors disabled:opacity-70"
          >
            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
