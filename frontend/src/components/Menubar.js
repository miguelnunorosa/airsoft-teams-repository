import React from 'react';
import './Menubar.css';
import logo from '../assets/img/prtSmall.png'; // Certifique-se de que o caminho esteja correto

function Menubar() {
    return (
        <nav className="navbar navbar-expand-lg">
            <a className="navbar-brand" href="/">
                <img src={logo} alt="[PRT] AIRSOFT" className="navbar-logo" />
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="/">Equipas</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#about">Campos</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#contact"><i className="fas fa-search"></i></a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Menubar;
