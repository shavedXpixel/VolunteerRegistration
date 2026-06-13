import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Edit, X, Save, MessageSquare, ShieldCheck, Mail, Phone, MapPin, Loader2 } from 'lucide-react';

const AdminDashboard = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal State
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateStatus, setUpdateStatus] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await axios.get(`${API_URL}/api/admin/volunteers`);
      if (response.data.success) {
        setVolunteers(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching volunteers:', error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (volunteer) => {
    setSelectedVolunteer(volunteer);
    setUpdateStatus(volunteer.status || 'Pending');
    setAdminNotes(volunteer.admin_notes || '');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVolunteer(null);
  };

  const handleUpdate = async () => {
    if (!selectedVolunteer) return;
    setIsUpdating(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await axios.post(`${API_URL}/api/admin/volunteers/${selectedVolunteer.id}/respond`, {
        status: updateStatus,
        admin_notes: adminNotes
      });
      if (response.data.success) {
        // Update local state
        setVolunteers(volunteers.map(v => v.id === selectedVolunteer.id ? response.data.data : v));
        closeModal();
      }
    } catch (error) {
      console.error('Error updating volunteer:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const filteredVolunteers = volunteers.filter(v => 
    v.full_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    v.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.preferred_area.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Contacted': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Reviewed': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Approved': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <ShieldCheck className="text-primary h-8 w-8" />
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-1 font-medium">Manage and respond to volunteer registrations.</p>
          </div>
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary sm:text-sm shadow-sm transition-colors"
              placeholder="Search volunteers by name, email, or area..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64 bg-white rounded-2xl shadow-sm border border-gray-100">
            <Loader2 className="h-10 w-10 text-primary animate-spin" />
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Volunteer</th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Contact</th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Area & Motivation</th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredVolunteers.length > 0 ? (
                    filteredVolunteers.map((volunteer) => (
                      <tr key={volunteer.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                              {volunteer.full_name.charAt(0)}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-bold text-gray-900">{volunteer.full_name}</div>
                              <div className="text-sm text-gray-500">{volunteer.city}, {volunteer.state}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 flex items-center gap-2 mb-1"><Mail size={14} className="text-gray-400"/> {volunteer.email}</div>
                          <div className="text-sm text-gray-500 flex items-center gap-2"><Phone size={14} className="text-gray-400"/> {volunteer.phone}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 font-medium mb-1">{volunteer.preferred_area}</div>
                          <div className="text-xs text-gray-500 truncate max-w-[200px]" title={volunteer.motivation}>{volunteer.motivation}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full border ${getStatusColor(volunteer.status)}`}>
                            {volunteer.status || 'Pending'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                          <button
                            onClick={() => openModal(volunteer)}
                            className="inline-flex items-center gap-2 px-3 py-1.5 border border-transparent text-sm font-bold rounded-md text-primary bg-primary/10 hover:bg-primary hover:text-white transition-colors"
                          >
                            <Edit size={16} />
                            Respond
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                        No volunteers found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Response Modal */}
        {isModalOpen && selectedVolunteer && (
          <div className="fixed inset-0 z-[100] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={closeModal} aria-hidden="true"></div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="flex justify-between items-start border-b border-gray-100 pb-4 mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900" id="modal-title">Volunteer Profile</h3>
                      <p className="text-sm text-gray-500 mt-1">Reviewing application for {selectedVolunteer.full_name}</p>
                    </div>
                    <button onClick={closeModal} className="text-gray-400 hover:text-gray-500 transition-colors">
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Contact Info</p>
                        <p className="text-sm font-medium text-gray-900 mt-1 flex items-center gap-2"><Mail size={14} className="text-primary"/> {selectedVolunteer.email}</p>
                        <p className="text-sm font-medium text-gray-900 flex items-center gap-2"><Phone size={14} className="text-primary"/> {selectedVolunteer.phone}</p>
                        <p className="text-sm font-medium text-gray-900 flex items-center gap-2"><MapPin size={14} className="text-primary"/> {selectedVolunteer.city}, {selectedVolunteer.state}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Background</p>
                        <p className="text-sm text-gray-800 mt-1"><span className="font-semibold">Education:</span> {selectedVolunteer.education || 'N/A'}</p>
                        <p className="text-sm text-gray-800"><span className="font-semibold">Profession:</span> {selectedVolunteer.profession || 'N/A'}</p>
                        <p className="text-sm text-gray-800"><span className="font-semibold">Skills:</span> {selectedVolunteer.skills}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Application Details</p>
                        <p className="text-sm text-gray-800 mt-1"><span className="font-semibold">Area:</span> {selectedVolunteer.preferred_area}</p>
                        <p className="text-sm text-gray-800"><span className="font-semibold">Availability:</span> {selectedVolunteer.availability}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Motivation</p>
                        <p className="text-sm text-gray-800 italic">"{selectedVolunteer.motivation}"</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-6">
                    <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
                      <MessageSquare className="text-primary h-5 w-5" /> Admin Action
                    </h4>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Update Status</label>
                        <select
                          value={updateStatus}
                          onChange={(e) => setUpdateStatus(e.target.value)}
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-lg border bg-white"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Reviewed">Reviewed</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Approved">Approved</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Admin Notes (Internal only)</label>
                        <textarea
                          rows={3}
                          className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm resize-none"
                          placeholder="Log call details, next steps, or internal remarks here..."
                          value={adminNotes}
                          onChange={(e) => setAdminNotes(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-4 sm:px-6 sm:flex sm:flex-row-reverse border-t border-gray-100">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-6 py-2 bg-primary text-base font-bold text-white hover:bg-primary-dark focus:outline-none transition-colors sm:ml-3 sm:w-auto sm:text-sm items-center gap-2 disabled:opacity-70"
                    onClick={handleUpdate}
                    disabled={isUpdating}
                  >
                    {isUpdating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-6 py-2 bg-white text-base font-bold text-gray-700 hover:bg-gray-50 focus:outline-none transition-colors sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={closeModal}
                    disabled={isUpdating}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
