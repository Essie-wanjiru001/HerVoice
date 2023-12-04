import React from 'react';
import './App.css';

// Adding the components
import Navbar from './components/Navbar';
import MainSection from './components/MainSection';
import Footer from './components/Footer';

function App() {
 return (
    <div className="App">
      <header className="App-header">
        <h1>HerVoice</h1>
      </header>
      <main>
        <Navbar />
        <MainSection />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
 );
}

export default App;
