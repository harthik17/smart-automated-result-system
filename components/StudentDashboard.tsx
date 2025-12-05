import React from 'react';
import { Student, Subject } from '../types';
import { Download, CheckCircle, XCircle, TrendingUp, AlertTriangle } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface Props {
  student: Student;
  subjects: Subject[];
}

export const StudentDashboard: React.FC<Props> = ({ student, subjects }) => {
  const getSubjectDetails = (subId: string) => subjects.find(s => s.id === subId);

  const calculateGrade = (marks: number) => {
    if (marks >= 90) return 'A+';
    if (marks >= 80) return 'A';
    if (marks >= 70) return 'B';
    if (marks >= 60) return 'C';
    if (marks >= 50) return 'D';
    return 'F';
  };

  const calculateTotal = () => {
    return student.results.reduce((acc, curr) => acc + curr.marksObtained, 0);
  };

  const calculatePercentage = () => {
    const totalMax = student.results.length * 100;
    if (totalMax === 0) return "0";
    return ((calculateTotal() / totalMax) * 100).toFixed(2);
  };

  const calculateCGPA = () => {
    const percentage = parseFloat(calculatePercentage());
    return (percentage / 9.5).toFixed(2);
  };

  const handlePrint = () => {
    window.print();
  };

  const chartData = student.results.map(r => ({
    name: getSubjectDetails(r.subjectId)?.code,
    marks: r.marksObtained
  }));

  const totalAttendanceClasses = student.results.reduce((acc, curr) => acc + curr.totalClasses, 0);
  const totalAttended = student.results.reduce((acc, curr) => acc + curr.attendedClasses, 0);
  const overallAttendance = totalAttendanceClasses ? Math.round((totalAttended / totalAttendanceClasses) * 100) : 0;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6 print:shadow-none print:border-none">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Academic Result Card</h1>
            <p className="text-sm text-gray-500 mt-1">Semester {student.semester} Report</p>
          </div>
          <button 
            onClick={handlePrint}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors no-print"
          >
            <Download size={18} />
            <span>Download PDF</span>
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6 border-t border-gray-100 pt-6">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase">Student Name</p>
            <p className="text-lg font-medium text-gray-900">{student.name}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase">Roll Number</p>
            <p className="text-lg font-medium text-gray-900">{student.rollNo}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase">Department</p>
            <p className="text-lg font-medium text-gray-900">{student.department}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase">Overall CGPA</p>
            <p className="text-lg font-bold text-primary-600">{calculateCGPA()}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Results Table */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Subject Wise Performance</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject Code</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject Name</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Marks</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {student.results.map((result) => {
                  const subject = getSubjectDetails(result.subjectId);
                  const isPass = result.marksObtained >= 40;
                  return (
                    <tr key={result.subjectId}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{subject?.code}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{subject?.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{result.marksObtained} / 100</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center font-bold">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          result.marksObtained >= 80 ? 'bg-green-100 text-green-800' : 
                          result.marksObtained >= 60 ? 'bg-blue-100 text-blue-800' : 
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {calculateGrade(result.marksObtained)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {isPass ? 
                          <CheckCircle className="h-5 w-5 text-green-500 mx-auto" /> : 
                          <XCircle className="h-5 w-5 text-red-500 mx-auto" />
                        }
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td colSpan={2} className="px-6 py-4 text-right font-medium text-gray-900">Total</td>
                  <td className="px-6 py-4 text-center font-bold text-gray-900">{calculateTotal()} / {student.results.length * 100}</td>
                  <td colSpan={2} className="px-6 py-4 text-center font-bold text-primary-600">{calculatePercentage()}%</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Sidebar Analytics */}
        <div className="space-y-6">
          {/* Attendance Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-primary-500" /> Attendance Summary
            </h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Overall Attendance</span>
              <span className={`text-lg font-bold ${overallAttendance < 75 ? 'text-red-600' : 'text-green-600'}`}>
                {overallAttendance}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div 
                className={`h-2.5 rounded-full ${overallAttendance < 75 ? 'bg-red-500' : 'bg-green-500'}`} 
                style={{ width: `${overallAttendance}%` }}
              ></div>
            </div>
            {overallAttendance < 75 && (
              <div className="flex items-start p-3 bg-red-50 rounded-md">
                <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                <p className="text-sm text-red-700">Warning: Shortage of attendance. Minimum 75% required to sit for exams.</p>
              </div>
            )}
             <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-2">Detailed Breakdown:</p>
                {student.results.map(r => {
                   const sub = getSubjectDetails(r.subjectId);
                   const pct = Math.round((r.attendedClasses/r.totalClasses)*100);
                   return (
                     <div key={r.subjectId} className="flex justify-between text-sm py-1">
                       <span className="text-gray-600 truncate w-32">{sub?.name}</span>
                       <span className={pct < 75 ? 'text-red-500 font-medium' : 'text-green-600'}>{pct}%</span>
                     </div>
                   )
                })}
             </div>
          </div>
          
          {/* Remarks Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
             <h3 className="text-lg font-semibold text-gray-800 mb-2">Faculty Remarks</h3>
             <div className="p-4 bg-primary-50 rounded-lg border border-primary-100 text-primary-900 text-sm italic relative">
               <span className="absolute top-2 left-2 text-2xl text-primary-200 font-serif">"</span>
               <p className="px-2 z-10 relative">{student.remarks || "No remarks available."}</p>
             </div>
          </div>
        </div>
      </div>
      
      {/* Chart Section - Screen Only */}
      <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6 no-print">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Performance Visualization</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{fontSize: 12}} />
              <YAxis domain={[0, 100]} />
              <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Bar dataKey="marks" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};