import React from 'react';
import { UserRole } from '../types';
import { ArrowRight, CheckCircle, Smartphone, Calculator, ShieldCheck } from 'lucide-react';

interface Props {
  onLoginRequest: (role: UserRole) => void;
}

export const Home: React.FC<Props> = ({ onLoginRequest }) => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-white pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Student Results</span>{' '}
                <span className="block text-primary-600 xl:inline">Made Simple</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Automate result calculation, grade generation, and attendance tracking. Empower your institution with EduGrade's intelligent management system.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                <p className="text-base font-medium text-gray-900">Login to your dashboard:</p>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button onClick={() => onLoginRequest(UserRole.ADMIN)} className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900 md:py-3 md:text-sm md:px-4">
                    Admin
                  </button>
                  <button onClick={() => onLoginRequest(UserRole.FACULTY)} className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-3 md:text-sm md:px-4">
                    Faculty
                  </button>
                  <button onClick={() => onLoginRequest(UserRole.STUDENT)} className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 md:py-3 md:text-sm md:px-4">
                    Student
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
               <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                 <img 
                  className="w-full rounded-lg" 
                  src="https://picsum.photos/600/400" 
                  alt="Student using result system"
                 />
                 <div className="absolute inset-0 bg-primary-500 mix-blend-multiply opacity-20 rounded-lg"></div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 overflow-hidden lg:py-24">
        <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
          <div className="relative">
            <h2 className="text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Why Choose EduGrade?
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-center text-xl text-gray-500">
              A complete ecosystem for academic excellence processing.
            </p>
          </div>

          <div className="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-3 lg:gap-8">
            <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-md bg-primary-500 text-white flex items-center justify-center mb-4">
                <Calculator size={24} />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Auto-Calculation</h3>
              <p className="mt-2 text-base text-gray-500">
                Enter marks once, and the system automatically computes grades, percentages, and CGPA based on configurable rules.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow mt-5 lg:mt-0">
               <div className="h-12 w-12 rounded-md bg-primary-500 text-white flex items-center justify-center mb-4">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Secure Access</h3>
              <p className="mt-2 text-base text-gray-500">
                Role-based access control ensures data privacy. Students only see their results; faculty manages their classes.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow mt-5 lg:mt-0">
               <div className="h-12 w-12 rounded-md bg-primary-500 text-white flex items-center justify-center mb-4">
                <Smartphone size={24} />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Mobile Responsive</h3>
              <p className="mt-2 text-base text-gray-500">
                Access results anytime, anywhere. Fully optimized for desktops, tablets, and mobile phones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="bg-white py-16">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
               <div>
                  <h3 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                     Streamlined for Efficiency
                  </h3>
                  <p className="mt-3 text-lg text-gray-500">
                     Stop using spreadsheets. EduGrade reduces manual errors and saves hours of administrative time.
                  </p>
                  <dl className="mt-10 space-y-10">
                     {[
                        { label: 'Instant PDF Report Cards', desc: 'Generate and download official result cards with one click.' },
                        { label: 'Attendance Integration', desc: 'Track daily attendance and warn students about shortages automatically.' },
                        { label: 'AI Performance Insights', desc: 'Get automated, personalized remarks for students based on their data.' },
                     ].map((item, idx) => (
                        <div key={idx} className="relative">
                           <dt>
                              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                                 <CheckCircle size={24} />
                              </div>
                              <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{item.label}</p>
                           </dt>
                           <dd className="mt-2 ml-16 text-base text-gray-500">
                              {item.desc}
                           </dd>
                        </div>
                     ))}
                  </dl>
               </div>
               <div className="mt-10 -mx-4 relative lg:mt-0" aria-hidden="true">
                  <img 
                     className="relative mx-auto rounded-lg shadow-lg" 
                     width="490" 
                     src="https://picsum.photos/490/400" 
                     alt="Dashboard screenshot" 
                  />
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};
