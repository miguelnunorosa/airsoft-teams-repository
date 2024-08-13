import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/teams')
            .then(response => setTeams(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleTeamClick = (id) => {
        axios.get(`http://localhost:5000/teams/${id}`)
            .then(response => setSelectedTeam(response.data))
            .catch(error => console.error(error));
    };

    return (
        <div>
            <h1>Teams</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th>Logo</th>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {teams.map(team => (
                        <tr key={team.id}>
                            <td><img src={team.logo} alt={team.name} /></td>
                            <td>{team.name}</td>
                            <td><button onClick={() => handleTeamClick(team.id)}>Details</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedTeam && (
                <div>
                    <h2>{selectedTeam.name}</h2>
                    <p>{selectedTeam.description}</p>
                    <button onClick={() => setSelectedTeam(null)}>Close</button>
                </div>
            )}
        </div>
    );
}

export default App;