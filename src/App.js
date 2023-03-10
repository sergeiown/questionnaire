import React from 'react';
import './styles/App.css';
import { useState } from 'react';
import MyAuth from './Auth/MyAuth';
import AdminArea from './components/AdminArea/AdminArea';

function App() {
    const [user, setUser] = useState(null);

    const handleSignIn = (user) => {
        setUser(user);
    };

    const handleSignOut = () => {
        setUser(null);
    };

    return (
        <div className="App">
            <MyAuth onSignIn={handleSignIn} onSignOut={handleSignOut} />
            {user && <AdminArea />}
        </div>
    );
}

export default App;
