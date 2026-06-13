import React, { useState, useEffect, useMemo } from 'react';
import { Search, Edit, X, Save, MessageSquare, Mail, Phone, MapPin, Loader2, Download, Trash2, Filter } from 'lucide-react';
import api from '../../utils/api';

const Volunteers = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filtering & Sorting
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  
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
      const response = await api.get('/admin/volunteers');
      if (response.data.success) {
        setVolunteers(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching volunteers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this application? This action cannot be undone.")) {
      try {
        const response = await api.delete(`/admin/volunteer/${id}`);
        if (response.data.success) {
          setVolunteers(volunteers.filter(v => v.id !== id));
        }
      } catch (error) {
        console.error('Error deleting:', error);
      }
    }
  };

  const handleExportCSV = async () => {
    try {
      const response = await api.get('/admin/export/csv', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'volunteers.csv');
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error("Export failed", err);
    }
  };

  const handleExportExcel = async () => {
    try {
      const response = await api.get('/admin/export/excel', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'volunteers.xlsx');
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error("Export failed", err);
    }
  };

  const openModal = (volunteer) => {
    setSelectedVolunteer(volunteer);
    setUpdateStatus(volunteer.status || 'Pending');
    setAdminNotes(volunteer.admin_notes || '');
    setIsModalOpen(true);
  };

  const handleUpdate = async () => {
    if (!selectedVolunteer) return;
    setIsUpdating(true);
    try {
      const response = await api.post(`/admin/volunteers/${selectedVolunteer.id}/respond`, {
        status: updateStatus,
        admin_notes: adminNotes
      });
      if (response.data.success) {
        setVolunteers(volunteers.map(v => v.id === selectedVolunteer.id ? response.data.data : v));
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error('Error updating:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  // Process data (Filter -> Sort)
  const processedData = useMemo(() => {
    let data = volunteers.filter(v => {
      const matchesSearch = 
        v.full_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        v.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.city.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || v.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    if (sortBy === 'Newest') {
      data = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else {
      data = data.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    }
    
    return data;
  }, [volunteers, searchTerm, statusFilter, sortBy]);

  // Pagination
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = processedData.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(processedData.length / recordsPerPage);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Contacted': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Reviewed': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'Rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Volunteer Applications</h1>
          <p className="text-gray-500 mt-1">Manage, filter, and export volunteer data.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleExportCSV} className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 transition-colors">
            <Download size={16} /> CSV
          </button>
          <button onClick={handleExportExcel} className="inline-flex items-center gap-2 px-4 py-2 border border-transparent rounded-lg text-sm font-bold text-white bg-green-600 hover:bg-green-700 transition-colors">
            <Download size={16} /> Excel
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Search by name, email, or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="block w-40 pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary sm:text-sm bg-white"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Reviewed">Reviewed</option>
              <option value="Contacted">Contacted</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="block w-40 pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary sm:text-sm bg-white"
            >
              <option value="Newest">Newest First</option>
              <option value="Oldest">Oldest First</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64 bg-white rounded-2xl border border-gray-100">
          <Loader2 className="h-10 w-10 text-primary animate-spin" />
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Volunteer</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Area</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentRecords.length > 0 ? (
                  currentRecords.map((volunteer) => (
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
                        <div className="text-sm text-gray-900 font-medium">{volunteer.preferred_area}</div>
                        <div className="text-xs text-gray-500 mt-1">{new Date(volunteer.created_at).toLocaleDateString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full border ${getStatusColor(volunteer.status)}`}>
                          {volunteer.status || 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => openModal(volunteer)}
                            className="text-primary bg-primary/10 hover:bg-primary hover:text-white p-2 rounded-md transition-colors"
                            title="View/Edit"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(volunteer.id)}
                            className="text-red-600 bg-red-100 hover:bg-red-600 hover:text-white p-2 rounded-md transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                      No volunteers found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6 flex items-center justify-between">
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{indexOfFirstRecord + 1}</span> to <span className="font-medium">{Math.min(indexOfLastRecord, processedData.length)}</span> of <span className="font-medium">{processedData.length}</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === i + 1 ? 'z-10 bg-primary/10 border-primary text-primary' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'}`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Response Modal */}
      {isModalOpen && selectedVolunteer && (
        <div className="fixed inset-0 z-[100] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setIsModalOpen(false)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
                <div className="flex justify-between items-start border-b border-gray-100 pb-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Volunteer Profile</h3>
                    <p className="text-sm text-gray-500 mt-1">Application ID: {selectedVolunteer.id}</p>
                  </div>
                  <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-500">
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
                      <p className="text-sm text-gray-800 mt-1"><span className="font-semibold">DOB:</span> {selectedVolunteer.dob}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Application Details</p>
                      <p className="text-sm text-gray-800 mt-1"><span className="font-semibold">Area:</span> {selectedVolunteer.preferred_area}</p>
                      <p className="text-sm text-gray-800"><span className="font-semibold">Availability:</span> {selectedVolunteer.availability}</p>
                      <p className="text-sm text-gray-800"><span className="font-semibold">Source:</span> {selectedVolunteer.source || 'N/A'}</p>
                      {selectedVolunteer.document_path && (
                        <p className="text-sm text-blue-600 font-bold mt-2">
                          <a href={`http://localhost:5000/${selectedVolunteer.document_path}`} target="_blank" rel="noreferrer">
                            View Uploaded Document
                          </a>
                        </p>
                      )}
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
                        className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-lg bg-white"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Reviewed">Reviewed</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Admin Notes (Internal only)</label>
                      <textarea
                        rows={3}
                        className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm resize-none"
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
                  className="w-full inline-flex justify-center rounded-lg border border-transparent px-6 py-2 bg-primary text-base font-bold text-white hover:bg-primary-dark sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-70"
                  onClick={handleUpdate}
                  disabled={isUpdating}
                >
                  {isUpdating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                  {isUpdating ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 px-6 py-2 bg-white text-base font-bold text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Volunteers;
