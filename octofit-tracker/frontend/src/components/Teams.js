import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_CODESPACE_NAME 
      ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
      : 'http://localhost:8000/api/teams/';
    console.log('Teams - Fetching from:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Teams - Raw data received:', data);
        // Handle both paginated (.results) and plain array responses
        const teamsData = data.results || data;
        console.log('Teams - Processed data:', teamsData);
        setTeams(Array.isArray(teamsData) ? teamsData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Teams - Error fetching data:', error);
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
        <p className="mt-3">Loading teams...</p>
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
        <h2>👥 Teams</h2>
      </div>
      <div className="row">
        {teams.length > 0 ? (
          teams.map((team, index) => (
            <div key={team._id || team.id || index} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title text-primary">👥 {team.name || 'Unnamed Team'}</h5>
                  <p className="card-text text-muted">{team.description || 'No description available'}</p>
                  <div className="mt-3">
                    <div className="d-flex justify-content-between mb-2">
                      <span><strong>Members:</strong></span>
                      <span className="badge bg-primary">{team.member_count || 0}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span><strong>Created:</strong></span>
                      <span className="text-muted small">{team.created_at ? new Date(team.created_at).toLocaleDateString() : 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="empty-state">
              <div className="empty-state-icon">👥</div>
              <p className="mb-0">No teams found</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Teams;
