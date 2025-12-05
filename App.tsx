import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { StudentDashboard } from './components/StudentDashboard';
import { FacultyDashboard } from './components/FacultyDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { AboutContact } from './components/AboutContact';
import { MOCK_STUDENTS, MOCK_SUBJECTS } from './constants';
import { AppState, Student, UserRole, View } from './types';

function App() {
  const [currentView, setCurrentView] = useState<View>('HOME');
  const [currentUser, setCurrentUser] = useState<AppState['currentUser']>(null);
  
  // "Database" state
  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS);
  const [subjects] = useState(MOCK_SUBJECTS);

  const handleLoginRequest = (role: UserRole) => {
    // Simulated Login
    let user = null;
    if (role === UserRole.STUDENT) {
      // Login as the first mock student for demo
      const student = students[0];
      user = { role, id: student.id, name: student.name };
      setCurrentView('DASHBOARD');
    } else if (role === UserRole.FACULTY) {
      user = { role, name: 'Prof. Anderson' };
      setCurrentView('DASHBOARD');
    } else if (role === UserRole.ADMIN) {
      user = { role, name: 'System Administrator' };
      setCurrentView('DASHBOARD');
    }
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('HOME');
  };

  const handleUpdateStudent = (updatedStudent: Student) => {
    setStudents(prev => prev.map(s => s.id === updatedStudent.id ? updatedStudent : s));
  };

  const handleDeleteStudent = (id: string) => {
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  const renderContent = () => {
    if (currentView === 'HOME') {
      return <Home onLoginRequest={handleLoginRequest} />;
    }
    
    if (currentView === 'FEATURES') {
        // Re-using Home but scrolling to features would be ideal, 
        // for this structure we'll just render the Home component which includes features.
        // Or we could have a dedicated simple features list page.
        // Let's redirect to Home for simplicity in this specific "File-based" routing
        return <Home onLoginRequest={handleLoginRequest} />;
    }

    if (currentView === 'ABOUT') {
      return <AboutContact />;
    }

    if (currentView === 'DASHBOARD') {
      if (!currentUser) return <Home onLoginRequest={handleLoginRequest} />;
      
      switch (currentUser.role) {
        case UserRole.STUDENT:
          const myData = students.find(s => s.id === currentUser.id);
          if (!myData) return <div>Error loading student data</div>;
          return <StudentDashboard student={myData} subjects={subjects} />;
        
        case UserRole.FACULTY:
          return (
            <FacultyDashboard 
              students={students} 
              subjects={subjects} 
              onUpdateStudent={handleUpdateStudent}
            />
          );
        
        case UserRole.ADMIN:
          return (
            <AdminDashboard 
              students={students} 
              subjects={subjects}
              onDeleteStudent={handleDeleteStudent}
            />
          );
        
        default:
          return <Home onLoginRequest={handleLoginRequest} />;
      }
    }

    return <Home onLoginRequest={handleLoginRequest} />;
  };

  return (
    <Layout
      currentView={currentView}
      currentUser={currentUser}
      onChangeView={setCurrentView}
      onLogout={handleLogout}
      onLoginRequest={handleLoginRequest}
    >
      {renderContent()}
    </Layout>
  );
}

export default App;
