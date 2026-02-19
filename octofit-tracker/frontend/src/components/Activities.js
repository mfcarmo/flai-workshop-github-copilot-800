import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_CODESPACE_NAME 
      ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
      : 'http://localhost:8000/api/activities/';
    console.log('Activities - Fetching from:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Activities - Raw data received:', data);
        // Handle both paginated (.results) and plain array responses
        const activitiesData = data.results || data;
        console.log('Activities - Processed data:', activitiesData);
        setActivities(Array.isArray(activitiesData) ? activitiesData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Activities - Error fetching data:', error);
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
        <p className="mt-3">Loading activities...</p>
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
        <h2>🏋️‍♂️ Activities</h2>
      </div>
      <div className="table-container">
        <table className="table table-striped table-hover mb-0">
          <thead className="table-dark">
            <tr>
              <th>User Email</th>
              <th>Activity Type</th>
              <th>Duration (min)</th>
              <th>Calories</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {activities.length > 0 ? (
              activities.map((activity, index) => (
                <tr key={activity._id || activity.id || index}>
                  <td>{activity.user_email || 'N/A'}</td>
                  <td><span className="badge bg-info">{activity.activity_type || 'N/A'}</span></td>
                  <td>{activity.duration || 0}</td>
                  <td><strong>{activity.calories || 0}</strong></td>
                  <td>{activity.date ? new Date(activity.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'Invalid Date'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">
                  <div className="empty-state">
                    <div className="empty-state-icon">📊</div>
                    <p className="mb-0">No activities found</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Activities;
