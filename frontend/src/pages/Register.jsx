import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Heart, Users, Star, Award, Phone, Mail, ChevronRight, CheckCircle2 } from 'lucide-react';

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", 
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", 
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];
const Register = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const formData = new FormData();
      Object.keys(data).forEach(key => {
        if (key === 'document' && data[key][0]) {
          formData.append('document', data[key][0]);
        } else {
          formData.append(key, data[key]);
        }
      });

      const response = await axios.post('http://localhost:5000/api/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data.success) {
        setSubmitStatus('success');
        reset();
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page Hero */}
      <section className="bg-dark py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Volunteer Registration</h1>
          <p className="text-lg text-gray-300 mb-6 font-medium">Join hands with us and be a part of the change.<br/>Together, we can give wings to dreams and build a better tomorrow.</p>
          <div className="flex items-center justify-center text-sm font-medium text-gray-400 gap-2">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-gray-300">Get Involved</span>
            <ChevronRight size={14} />
            <span className="text-primary">Volunteer Registration</span>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Why Volunteer</h3>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Users size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Create Impact</h4>
                    <p className="text-sm text-gray-600 font-medium mt-1">Make a real difference in people's lives and communities.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Heart size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Learn & Grow</h4>
                    <p className="text-sm text-gray-600 font-medium mt-1">Gain new skills, experiences and personal growth.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Award size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Be a Part of a Team</h4>
                    <p className="text-sm text-gray-600 font-medium mt-1">Work with passionate youth and build lasting connections.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Star size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Bring the Change</h4>
                    <p className="text-sm text-gray-600 font-medium mt-1">Your small efforts can bring big changes in the society.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-100 text-center">
                <span className="text-4xl text-primary/40 font-serif leading-none">"</span>
                <p className="text-gray-900 font-medium italic mb-4">Be the reason someone feels supported, heard and hopeful.</p>
                <p className="text-sm font-bold text-primary">- NayePankh Foundation</p>
              </div>
            </div>

            <div className="bg-primary/5 rounded-2xl p-8 border border-primary/10 text-center">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <Phone size={20} />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-2">Need Help?</h3>
              <p className="text-gray-600 text-sm font-medium mb-6">Feel free to contact us if you have any questions.</p>
              <div className="space-y-2">
                <p className="font-bold text-gray-900">+91 91234 56789</p>
                <p className="font-medium text-sm text-gray-600">info@nayepankhfoundation.org</p>
              </div>
            </div>
          </div>

          {/* Form Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Become a Volunteer</h2>
              <p className="text-gray-600 font-medium mb-8">Fill in the form below to register with us.</p>

              {submitStatus === 'success' && (
                <div className="mb-8 bg-green-50 text-green-800 p-4 rounded-lg flex items-center gap-3 border border-green-200">
                  <CheckCircle2 className="text-green-600" />
                  <div>
                    <p className="font-bold">Registration Successful!</p>
                    <p className="text-sm">Thank you for joining us. We will contact you shortly.</p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-8 bg-red-50 text-red-800 p-4 rounded-lg border border-red-200">
                  <p className="font-bold">Error!</p>
                  <p className="text-sm">{errorMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Full Name <span className="text-primary">*</span></label>
                    <input 
                      type="text" 
                      placeholder="Enter your full name"
                      className={`w-full px-4 py-3 rounded-lg border ${errors.full_name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary focus:border-primary'} focus:outline-none focus:ring-2 transition-all`}
                      {...register("full_name", { required: "Full name is required" })} 
                    />
                    {errors.full_name && <span className="text-red-500 text-xs mt-1 block">{errors.full_name.message}</span>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Email Address <span className="text-primary">*</span></label>
                    <input 
                      type="email" 
                      placeholder="Enter your email"
                      className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary focus:border-primary'} focus:outline-none focus:ring-2 transition-all`}
                      {...register("email", { 
                        required: "Email is required",
                        pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" }
                      })} 
                    />
                    {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email.message}</span>}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Phone Number <span className="text-primary">*</span></label>
                    <input 
                      type="tel" 
                      placeholder="Enter your phone number"
                      className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary focus:border-primary'} focus:outline-none focus:ring-2 transition-all`}
                      {...register("phone", { required: "Phone number is required" })} 
                    />
                    {errors.phone && <span className="text-red-500 text-xs mt-1 block">{errors.phone.message}</span>}
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Date of Birth <span className="text-primary">*</span></label>
                    <input 
                      type="date" 
                      className={`w-full px-4 py-3 rounded-lg border text-gray-700 ${errors.dob ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary focus:border-primary'} focus:outline-none focus:ring-2 transition-all`}
                      {...register("dob", { required: "Date of birth is required" })} 
                    />
                    {errors.dob && <span className="text-red-500 text-xs mt-1 block">{errors.dob.message}</span>}
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">City <span className="text-primary">*</span></label>
                    <input 
                      type="text" 
                      placeholder="Enter your city"
                      className={`w-full px-4 py-3 rounded-lg border ${errors.city ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary focus:border-primary'} focus:outline-none focus:ring-2 transition-all`}
                      {...register("city", { required: "City is required" })} 
                    />
                    {errors.city && <span className="text-red-500 text-xs mt-1 block">{errors.city.message}</span>}
                  </div>

                  {/* State */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">State <span className="text-primary">*</span></label>
                    <select 
                      className={`w-full px-4 py-3 rounded-lg border bg-white ${errors.state ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary focus:border-primary'} focus:outline-none focus:ring-2 transition-all`}
                      {...register("state", { required: "State is required" })} 
                    >
                      <option value="">Select your state</option>
                      {INDIAN_STATES.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                    {errors.state && <span className="text-red-500 text-xs mt-1 block">{errors.state.message}</span>}
                  </div>

                  {/* Education */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Education</label>
                    <input 
                      type="text" 
                      placeholder="Enter your education"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary focus:outline-none focus:ring-2 transition-all"
                      {...register("education")} 
                    />
                  </div>

                  {/* Profession */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Profession / Occupation</label>
                    <input 
                      type="text" 
                      placeholder="Enter your profession"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary focus:outline-none focus:ring-2 transition-all"
                      {...register("profession")} 
                    />
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Skills / Interests <span className="text-primary">*</span></label>
                  <input 
                    type="text" 
                    placeholder="E.g. Teaching, Event Management, Content Writing, etc."
                    className={`w-full px-4 py-3 rounded-lg border ${errors.skills ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary focus:border-primary'} focus:outline-none focus:ring-2 transition-all`}
                    {...register("skills", { required: "Skills are required" })} 
                  />
                  {errors.skills && <span className="text-red-500 text-xs mt-1 block">{errors.skills.message}</span>}
                </div>

                {/* Motivation */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Why do you want to volunteer with NayePankh? <span className="text-primary">*</span></label>
                  <textarea 
                    rows="4"
                    placeholder="Tell us what motivates you to be a part of our journey."
                    className={`w-full px-4 py-3 rounded-lg border resize-none ${errors.motivation ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary focus:border-primary'} focus:outline-none focus:ring-2 transition-all`}
                    {...register("motivation", { required: "This field is required" })} 
                  />
                  {errors.motivation && <span className="text-red-500 text-xs mt-1 block">{errors.motivation.message}</span>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Availability */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Availability <span className="text-primary">*</span></label>
                    <select 
                      className={`w-full px-4 py-3 rounded-lg border bg-white ${errors.availability ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary focus:border-primary'} focus:outline-none focus:ring-2 transition-all`}
                      {...register("availability", { required: "Availability is required" })} 
                    >
                      <option value="">Select your availability</option>
                      <option value="Weekends">Weekends</option>
                      <option value="Weekdays">Weekdays</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                    {errors.availability && <span className="text-red-500 text-xs mt-1 block">{errors.availability.message}</span>}
                  </div>

                  {/* Preferred Area */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Preferred Area of Volunteering <span className="text-primary">*</span></label>
                    <select 
                      className={`w-full px-4 py-3 rounded-lg border bg-white ${errors.preferred_area ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary focus:border-primary'} focus:outline-none focus:ring-2 transition-all`}
                      {...register("preferred_area", { required: "Preferred area is required" })} 
                    >
                      <option value="">Select an area</option>
                      <option value="Food Distribution">Food Distribution</option>
                      <option value="Education">Education Support</option>
                      <option value="Women Hygiene">Women Hygiene</option>
                      <option value="Operations">Operations & Management</option>
                    </select>
                    {errors.preferred_area && <span className="text-red-500 text-xs mt-1 block">{errors.preferred_area.message}</span>}
                  </div>
                </div>

                {/* Source */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">How did you hear about us?</label>
                  <select 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary focus:outline-none focus:ring-2 transition-all bg-white"
                    {...register("source")} 
                  >
                    <option value="">Select an option</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Friends/Family">Friends / Family</option>
                    <option value="Website">Website</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Document Upload */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Upload Any Document (Optional)</label>
                  <div className="flex items-center gap-4">
                    <input 
                      type="file" 
                      id="document"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      {...register("document")} 
                    />
                    <label 
                      htmlFor="document" 
                      className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                    >
                      Choose File
                    </label>
                    <span className="text-sm text-gray-500">
                      No file chosen
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">(PDF, JPG, PNG - Max size 5MB)</p>
                </div>

                {/* Declaration Checkbox */}
                <div className="bg-primary/5 p-4 rounded-lg flex items-start gap-3 mt-8">
                  <input 
                    type="checkbox" 
                    id="declaration"
                    className="mt-1 w-4 h-4 text-primary bg-white border-gray-300 rounded focus:ring-primary"
                    {...register("declaration", { required: "You must agree to the declaration" })}
                  />
                  <label htmlFor="declaration" className="text-sm text-gray-800 font-medium">
                    I hereby confirm that the information provided above is true to the best of my knowledge and I wish to volunteer with NayePankh Foundation.
                  </label>
                </div>
                {errors.declaration && <span className="text-red-500 text-xs mt-1 block">{errors.declaration.message}</span>}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg shadow-md transition-all duration-300 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  ) : (
                    <motion.div whileHover={{ scale: 1.05 }} className="flex items-center justify-center w-full h-full gap-2">
                      <Heart size={20} className="fill-white" />
                      Submit Registration
                    </motion.div>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Register;
