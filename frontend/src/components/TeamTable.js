import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TeamTable.css';

function TeamTable() {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        async function fetchTeams() {
            try {
                const response = await axios.get('http://localhost:5000/teams');
                setTeams(response.data.filter(team => team.isActive));
            } catch (error) {
                console.error('Error fetching teams:', error);
            }
        }
        fetchTeams();
    }, []);

    return (
        <div className="team-table-container">
            <h2 className="table-title">DIRECTÓRIO DE EQUIPAS <span className="table-year">2024</span></h2>
            <input className="form-control search-bar" type="text" placeholder="Procurar" />
            <div className="table-responsive">
                <table className="table table-dark table-striped table-bordered">
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Nome</th>
                        <th scope="col">Cidade</th>
                        <th scope="col">Distrito</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {teams.map((team) => (
                        <tr key={team.id}>
                            <td>{team.logo ? (
                                    <img src={team.logo} alt={team.name} className="img-thumbnail logo-img" />
                                ) : ( '---' )}
                            </td>
                            <td>{team.name}</td>
                            <td>{team.city}</td>
                            <td>{team.district}</td>
                            <td><button className="btn btn-primary">Ver Mais</button></td> {/* Botão em azul */}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TeamTable;
