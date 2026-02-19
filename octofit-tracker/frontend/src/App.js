import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Link } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import UserEdit from './components/UserEdit';
import UserEdit from './components/UserEdit';

function Home() {
  return (
    <div>
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">🏋️ OctoFit Tracker</h1>
          <p className="hero-subtitle">
            Track your fitness journey, compete with your team, and achieve your goals!
          </p>
          <p className="lead">
            Join the ultimate fitness tracking platform designed for teams and individuals.
          </p>
        </div>
      </div>
      
      <div className="container mt-5 pb-5">
        <div className="row">
          <div className="col-md-4">
            <Link to="/activities" className="text-decoration-none">
              <div className="feature-card text-center clickable-card">
                <div className="feature-icon">📊</div>
                <h3 className="feature-title">Track Activities</h3>
                <p className="feature-description">
                  Log your workouts, runs, and exercises. Monitor your progress over time.
                </p>
              </div>
            </Link>
          </div>
          <div className="col-md-4">
            <Link to="/leaderboard" className="text-decoration-none">
              <div className="feature-card text-center clickable-card">
                <div className="feature-icon">🏆</div>
                <h3 className="feature-title">Compete & Win</h3>
                <p className="feature-description">
                  Climb the leaderboard and compete with your teammates for the top spot.
                </p>
              </div>
            </Link>
          </div>
          <div className="col-md-4">
            <Link to="/workouts" className="text-decoration-none">
              <div className="feature-card text-center clickable-card">
                <div className="feature-icon">💪</div>
                <h3 className="feature-title">Get Personalized Workouts</h3>
                <p className="feature-description">
                  Receive customized workout plans tailored to your fitness level and goals.
                </p>
              </div>
            </Link>
          </div>
        </div>
        
        <div className="row mt-4">
          <div className="col-md-4">
            <Link to="/teams" className="text-decoration-none">
              <div className="feature-card text-center clickable-card">
                <div className="feature-icon">👥</div>
                <h3 className="feature-title">Team Collaboration</h3>
                <p className="feature-description">
                  Join or create teams and work together towards common fitness goals.
                </p>
              </div>
            </Link>
          </div>
          <div className="col-md-4">
            <Link to="/users" className="text-decoration-none">
              <div className="feature-card text-center clickable-card">
                <div className="feature-icon">👤</div>
                <h3 className="feature-title">User Profiles</h3>
                <p className="feature-description">
                  View and manage user profiles, track individual progress and achievements.
                </p>
              </div>
            </Link>
          </div>
          <div className="col-md-4">
            <Link to="/activities" className="text-decoration-none">
              <div className="feature-card text-center clickable-card">
                <div className="feature-icon">📈</div>
                <h3 className="feature-title">Progress Analytics</h3>
                <p className="feature-description">
                  Visualize your fitness journey with detailed statistics and insights.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark">
          <div className="container-fluid">
            <NavLink className="navbar-brand" to="/">
              <img src="/octofitapp-small.png" alt="OctoFit" className="navbar-logo" />
              OctoFit Tracker
            </NavLink>
            <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNav"
              aria-controls="navbarNav" 
              aria-expanded="false" 
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/" end>Home</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/activities">Activities</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/teams">Teams</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/users">Users</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/edit/:id" element={<UserEdit />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
