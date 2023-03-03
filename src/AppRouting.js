//routing
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Link, Navigate} from "react-router-dom";
import HomePage from './pages/home/HomePage';
import NotFoundPage from './pages/404/NotFoundPage'
import AboutPage from './pages/about-faqs/AboutPage';
import ProfilePage from './pages/profile/ProfilePage';
import TaskDetailPage from './pages/tasks/TaskDetailPage';
import Nav from './components/pure/nav';
import TaskPage from './pages/tasks/TaskPage';
import LoginPage from './pages/auth/LoginPage';
import StatePage from './pages/home/StatePage';
/* import TaskListComponent from './components/container/task_list'; */


function AppRounting() {
  const [user, setUser] = useState(null);

  const handleLogin = () => {setUser(localStorage.getItem('credentials'))};
  const handleLogout = () => {setUser(null)};

  const ProtectedRoute = ({ fUser, children }) => {
    if (!fUser) {
      alert("You must be logged in. Redirecting to login...")
      return <Navigate to="/login"/>;
    }
  
    return children;
  };
  
  const taskList = [
    {
      id: 0,
      name: "Task 1",
      description: "my first task"
    },
    {
      id: 1,
      name: "Task 2",
      description: "my second task"
    },
  ]

  return (
    <Router>
      {/* nav bar (header) */}
      <Nav/>

      {/* login/logout Buttons */}
      {user ? (
        <button onClick={handleLogout} className="btn btn-secondary">Sign Out</button>
      ) : (
        <button onClick={handleLogin} className="btn btn-success">Sign In</button>
      )}
      
      {/* body */}
      <div className="routes-body">
      <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/online-state" element={<StatePage/>} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/about' element={<AboutPage/>} />
          <Route path='/profile' element={<ProtectedRoute fUser={user}> <ProfilePage/> </ProtectedRoute>}/>
          <Route path='/tasks' element={<TaskPage/>}/>
          <Route path='/task/:id' element={<TaskDetailPage tasks={taskList} />} />

          {/* 404 page */}
          <Route path='*' element={<NotFoundPage/>} />
        </Routes>
      </div>
    </Router>  
  );
}

export default AppRounting;

