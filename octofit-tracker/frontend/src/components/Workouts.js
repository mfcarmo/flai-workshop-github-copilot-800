import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const baseUrl = process.env.REACT_APP_CODESPACE_NAME 
      ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
      : 'http://localhost:8000';
    const apiUrl = `${baseUrl}/api/workouts/`;
    console.log('Workouts - Fetching from:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Workouts - Raw data received:', data);
        // Handle both paginated (.results) and plain array responses
        const workoutsData = data.results || data;
        console.log('Workouts - Processed data:', workoutsData);
        setWorkouts(Array.isArray(workoutsData) ? workoutsData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Workouts - Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="container mt-4">
      <div className="loading-spinner">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading workouts...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="container mt-4">
      <div className="alert alert-danger" role="alert">
        <strong>Error:</strong> {error}
      </div>
    </div>
  );

  return (
    <div className="container mt-4 fade-in">
      <div className="page-header">
        <h2>💪 Personalized Workouts</h2>
      </div>
      <div className="row">
        {workouts.length > 0 ? (
          workouts.map((workout, index) => (
            <div key={workout._id || workout.id || index} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title text-success">💪 {workout.name || 'Unnamed Workout'}</h5>
                  <p className="card-text text-muted">{workout.description || 'No description available'}</p>
                  <div className="mt-3">
                    <div className="d-flex justify-content-between mb-2">
                      <span><strong>Category:</strong></span>
                      <span className="badge bg-primary">{workout.category || 'N/A'}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span><strong>Duration:</strong></span>
                      <span className="badge bg-info">{workout.duration || 0} min</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span><strong>Difficulty:</strong></span>
                      <span className="badge bg-warning text-dark">{workout.difficulty || 'N/A'}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span><strong>Calories:</strong></span>
                      <span className="badge bg-danger">{workout.estimated_calories || 0}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="empty-state">
              <div className="empty-state-icon">💪</div>
              <p className="mb-0">No workouts found</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Workouts;
