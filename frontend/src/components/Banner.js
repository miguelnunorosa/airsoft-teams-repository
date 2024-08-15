import React from 'react';
import './Banner.css';

function Banner() {
    return (
        <div className="banner">
            <div className="banner-logo">
                <img
                    src="https://firebasestorage.googleapis.com/v0/b/airsoft-diretorio-equipas.appspot.com/o/sponsors%2FLOGO-SITE-1.png?alt=media&token=8233f082-15f3-4957-b321-1294a3589b68"
                    alt="Sponsor Logo"
                    className="sponsor-logo"
                />
            </div>
            <div className="banner-buttons">
                <button className="btn btn-danger">Directório Geral</button>
                <button className="btn btn-danger">Apoiar Projeto!</button>
                <button className="btn btn-danger">Registar Equipa!</button>
            </div>
        </div>
    );
}

export default Banner;
