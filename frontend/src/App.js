import React from 'react';
import Banner from './components/Banner';
import Menubar from './components/Menubar';
import TeamTable from './components/TeamTable';
import Footer from './components/Footer';
import './App.css';

function App() {
    return (
        <div className="app-container">
            <Menubar />
            <Banner />
            <TeamTable />
            <Footer />
        </div>
    );
}

export default App;
