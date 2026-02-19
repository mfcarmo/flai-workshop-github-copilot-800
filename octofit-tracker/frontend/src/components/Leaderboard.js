import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const baseUrl = process.env.REACT_APP_CODESPACE_NAME 
      ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
      : 'http://localhost:8000';
    const apiUrl = `${baseUrl}/api/leaderboard/`;
    console.log('Leaderboard - Fetching from:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Leaderboard - Raw data received:', data);
        // Handle both paginated (.results) and plain array responses
        const leaderboardData = data.results || data;
        console.log('Leaderboard - Processed data:', leaderboardData);
        setLeaderboard(Array.isArray(leaderboardData) ? leaderboardData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Leaderboard - Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="container mt-4"><p>Loading leaderboard...</p></div>;
  if (error) return <div className="container mt-4"><p className="text-danger">Error: {error}</p></div>;

  return (
    <div className="container mt-4">
      <h2>Leaderboard</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Total Points</th>
              <th>Activities</th>
              <th>Team</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.length > 0 ? (
              leaderboard.map((entry, index) => (
                <tr key={entry.id || index}>
                  <td>{entry.rank || index + 1}</td>
                  <td>{entry.user_name || entry.user || 'N/A'}</td>
                  <td>{entry.total_points || 0}</td>
                  <td>{entry.total_activities || 0}</td>
                  <td>{entry.team_name || entry.team || 'N/A'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">No leaderboard data found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;
