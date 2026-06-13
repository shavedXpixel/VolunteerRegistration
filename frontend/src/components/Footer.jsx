import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Phone, Mail, MapPin } from 'lucide-react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-secondary text-gray-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="NayePankh Logo" className="h-10 w-auto object-contain" />
              <div>
                <span className="font-bold text-xl block leading-none">NayePankh</span>
                <span className="text-sm font-medium">Foundation</span>
              </div>
            </Link>
            <p className="text-sm font-medium mb-6">
              Together, we can give wings to dreams and build a stronger, kinder and better tomorrow.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 rounded-full border border-gray-900 flex items-center justify-center hover:bg-gray-900 hover:text-secondary transition-colors">
                <FaFacebook size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-gray-900 flex items-center justify-center hover:bg-gray-900 hover:text-secondary transition-colors">
                <FaInstagram size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-gray-900 flex items-center justify-center hover:bg-gray-900 hover:text-secondary transition-colors">
                <FaTwitter size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-gray-900 flex items-center justify-center hover:bg-gray-900 hover:text-secondary transition-colors">
                <FaLinkedin size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-gray-900 flex items-center justify-center hover:bg-gray-900 hover:text-secondary transition-colors">
                <FaYoutube size={16} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'About Us', 'Our Programs', 'Get Involved', 'Gallery', 'Contact Us'].map((link) => (
                <li key={link}>
                  <Link to={link === 'Home' ? '/' : '#'} className="text-sm font-medium hover:text-primary transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Get Involved</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/register" className="text-sm font-medium hover:text-primary transition-colors">
                  Become a Volunteer
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
                  Internships
                </a>
              </li>
              <li>
                <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
                  Donate Now
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={18} className="mt-0.5" />
                <span className="text-sm font-medium">+91 91234 56789</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="mt-0.5" />
                <span className="text-sm font-medium">info@nayepankhfoundation.org</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0" />
                <span className="text-sm font-medium">NayePankh Foundation, Pune, Maharashtra, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-900/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm font-medium">
            &copy; {new Date().getFullYear()} NayePankh Foundation. All Rights Reserved.
          </p>
          <p className="text-sm font-medium flex items-center gap-1">
            Made with <Heart size={14} className="fill-primary text-primary" /> for a better tomorrow.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
