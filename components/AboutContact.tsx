import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

export const AboutContact: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">About EduGrade</h1>
        <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
          Modernizing academic management through technology.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-16">
         <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12">
               <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
               <p className="text-gray-600 mb-6">
                  EduGrade was built to tackle the inefficiencies of manual grading systems. 
                  Universities and schools often struggle with error-prone spreadsheets and delayed result publishing.
                  Our goal is to provide a 100% accurate, fast, and transparent platform for managing student academic life cycles.
               </p>
               <h3 className="text-lg font-semibold text-gray-900 mb-2">Why we built this?</h3>
               <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>To eliminate calculation errors in results.</li>
                  <li>To provide instant access to grades for students.</li>
                  <li>To reduce the administrative burden on faculty.</li>
                  <li>To enable data-driven insights into student performance.</li>
               </ul>
            </div>
            <div className="bg-gray-100 h-full min-h-[300px]">
               <img src="https://picsum.photos/800/600" alt="Team meeting" className="w-full h-full object-cover" />
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
          <form className="grid grid-cols-1 gap-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <div className="mt-1">
                <input type="text" name="name" id="name" className="py-3 px-4 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 border-gray-300 rounded-md border" placeholder="Your Name" />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <div className="mt-1">
                <input type="email" name="email" id="email" className="py-3 px-4 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 border-gray-300 rounded-md border" placeholder="you@example.com" />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <div className="mt-1">
                <textarea id="message" name="message" rows={4} className="py-3 px-4 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 border-gray-300 rounded-md border" placeholder="How can we help you?"></textarea>
              </div>
            </div>
            <div>
              <button type="button" className="w-full inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                Send Message
              </button>
            </div>
          </form>
        </div>

        {/* Contact Info */}
        <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
           <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
           <div className="space-y-6">
              <div className="flex items-start">
                 <div className="flex-shrink-0">
                    <MapPin className="h-6 w-6 text-primary-600" />
                 </div>
                 <div className="ml-3 text-base text-gray-500">
                    <p>123 Education Lane</p>
                    <p>Tech District, NY 10001</p>
                 </div>
              </div>
              <div className="flex items-center">
                 <div className="flex-shrink-0">
                    <Phone className="h-6 w-6 text-primary-600" />
                 </div>
                 <div className="ml-3 text-base text-gray-500">
                    <p>+1 (555) 123-4567</p>
                 </div>
              </div>
              <div className="flex items-center">
                 <div className="flex-shrink-0">
                    <Mail className="h-6 w-6 text-primary-600" />
                 </div>
                 <div className="ml-3 text-base text-gray-500">
                    <p>support@edugrade.com</p>
                 </div>
              </div>
           </div>
           
           <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Office Hours</h3>
              <p className="text-gray-500">Monday - Friday: 9am - 5pm EST</p>
              <p className="text-gray-500">Saturday: 10am - 2pm EST</p>
           </div>
        </div>
      </div>
    </div>
  );
};
