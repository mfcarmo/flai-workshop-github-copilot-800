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

  if (loading) return <div className="container mt-4"><p>Loading workouts...</p></div>;
  if (error) return <div className="container mt-4"><p className="text-danger">Error: {error}</p></div>;

  return (
    <div className="container mt-4">
      <h2>Personalized Workouts</h2>
      <div className="row">
        {workouts.length > 0 ? (
          workouts.map((workout, index) => (
            <div key={workout.id || index} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{workout.name || workout.workout_type || 'Unnamed Workout'}</h5>
                  <p className="card-text">{workout.description || 'No description available'}</p>
                  <ul className="list-unstyled">
                    <li><strong>Type:</strong> {workout.workout_type || 'N/A'}</li>
                    <li><strong>Duration:</strong> {workout.duration || 0} minutes</li>
                    <li><strong>Difficulty:</strong> {workout.difficulty_level || 'N/A'}</li>
                    <li><strong>Calories:</strong> {workout.estimated_calories || 0}</li>
                    {workout.target_user && (
                      <li><strong>Target User:</strong> {workout.target_user_name || workout.target_user}</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <p className="text-center">No workouts found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Workouts;
