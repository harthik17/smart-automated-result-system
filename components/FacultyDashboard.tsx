import React, { useState, useCallback } from 'react';
import { Student, Subject } from '../types';
import { Save, Wand2, Calculator, Loader2 } from 'lucide-react';
import { generateStudentRemark } from '../services/geminiService';

interface Props {
  students: Student[];
  subjects: Subject[];
  onUpdateStudent: (updatedStudent: Student) => void;
}

export const FacultyDashboard: React.FC<Props> = ({ students, subjects, onUpdateStudent }) => {
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const selectedStudent = students.find(s => s.id === selectedStudentId);

  const handleMarksChange = (subjectId: string, field: 'marksObtained' | 'totalClasses' | 'attendedClasses', value: number) => {
    if (!selectedStudent) return;

    const newResults = selectedStudent.results.map(r => {
      if (r.subjectId === subjectId) {
        return { ...r, [field]: value };
      }
      return r;
    });

    onUpdateStudent({ ...selectedStudent, results: newResults });
  };

  const handleGenerateRemark = useCallback(async () => {
    if (!selectedStudent) return;
    setIsGenerating(true);
    const remark = await generateStudentRemark(selectedStudent, subjects);
    onUpdateStudent({ ...selectedStudent, remarks: remark });
    setIsGenerating(false);
  }, [selectedStudent, subjects, onUpdateStudent]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        
        {/* Student List Sidebar */}
        <div className="w-full md:w-1/4 bg-white rounded-lg shadow-sm border border-gray-200 h-fit">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <h2 className="font-semibold text-gray-700">Class List (CS-Sem 5)</h2>
          </div>
          <ul className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
            {students.map(stu => (
              <li 
                key={stu.id} 
                onClick={() => setSelectedStudentId(stu.id)}
                className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${selectedStudentId === stu.id ? 'bg-primary-50 border-l-4 border-primary-500' : ''}`}
              >
                <p className="font-medium text-gray-900">{stu.name}</p>
                <p className="text-xs text-gray-500">{stu.rollNo}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Editor Area */}
        <div className="flex-1">
          {selectedStudent ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedStudent.name}</h2>
                  <p className="text-sm text-gray-500">Roll No: {selectedStudent.rollNo}</p>
                </div>
                <div className="flex space-x-2">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center">
                    <Save className="w-3 h-3 mr-1" /> Auto-Saving
                  </span>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="font-semibold text-gray-700 flex items-center">
                  <Calculator className="w-4 h-4 mr-2" /> Marks & Attendance Entry
                </h3>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Marks (100)</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Total Classes</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Attended</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">%</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedStudent.results.map(result => {
                        const subject = subjects.find(s => s.id === result.subjectId);
                        const attendPct = Math.round((result.attendedClasses / (result.totalClasses || 1)) * 100);
                        return (
                          <tr key={result.subjectId}>
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">{subject?.name}</td>
                            <td className="px-4 py-3 text-center">
                              <input 
                                type="number" 
                                min="0" max="100"
                                value={result.marksObtained}
                                onChange={(e) => handleMarksChange(result.subjectId, 'marksObtained', parseInt(e.target.value) || 0)}
                                className="w-20 px-2 py-1 text-center border border-gray-300 rounded focus:ring-primary-500 focus:border-primary-500"
                              />
                            </td>
                            <td className="px-4 py-3 text-center">
                              <input 
                                type="number" 
                                value={result.totalClasses}
                                onChange={(e) => handleMarksChange(result.subjectId, 'totalClasses', parseInt(e.target.value) || 0)}
                                className="w-20 px-2 py-1 text-center border border-gray-300 rounded focus:ring-primary-500 focus:border-primary-500"
                              />
                            </td>
                            <td className="px-4 py-3 text-center">
                              <input 
                                type="number" 
                                value={result.attendedClasses}
                                onChange={(e) => handleMarksChange(result.subjectId, 'attendedClasses', parseInt(e.target.value) || 0)}
                                className="w-20 px-2 py-1 text-center border border-gray-300 rounded focus:ring-primary-500 focus:border-primary-500"
                              />
                            </td>
                            <td className="px-4 py-3 text-center text-sm">
                              <span className={attendPct < 75 ? 'text-red-600 font-bold' : 'text-green-600'}>
                                {attendPct}%
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                     <h3 className="font-semibold text-gray-700 flex items-center">
                        <Wand2 className="w-4 h-4 mr-2 text-purple-600" /> Automated Remarks
                     </h3>
                     <button 
                        onClick={handleGenerateRemark}
                        disabled={isGenerating}
                        className="flex items-center space-x-2 px-3 py-1.5 bg-purple-600 text-white text-sm rounded-md hover:bg-purple-700 disabled:opacity-50 transition-colors"
                     >
                        {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
                        <span>{isGenerating ? 'Analyzing...' : 'Generate with AI'}</span>
                     </button>
                  </div>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 text-sm"
                    rows={3}
                    placeholder="Enter student remarks here or use AI generation..."
                    value={selectedStudent.remarks || ''}
                    onChange={(e) => onUpdateStudent({...selectedStudent, remarks: e.target.value})}
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Tip: The AI analyzes marks and attendance to suggest a professional remark.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-96 flex flex-col items-center justify-center bg-white rounded-lg border-2 border-dashed border-gray-300">
               <div className="bg-gray-100 p-4 rounded-full mb-4">
                 <User className="h-8 w-8 text-gray-400" />
               </div>
               <p className="text-gray-500 font-medium">Select a student from the list to manage results.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Simple Icon component used above locally
function User({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
