import React, {useState, useEffect} from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./store/auth-context";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    //когда будет перезапуск этого компонента App.js то анонимная функция из первого аргумента useEffect не будет перезапускаться,
    // исключение первый запуск скрипта, так как массив dependens считается измененным.
    //Если deps пустой массив, значит изменятся нечему будет, и ананонимка будет запускаться только 1 раз.
    useEffect(() => {
        const storedLoginInfo = localStorage.getItem('isLoggedIn');
        if (storedLoginInfo === '1') {
            setIsLoggedIn(true);
        }
    }, []);

    const loginHandler = (email, password) => {
        localStorage.setItem('isLoggedIn', '1');
        setIsLoggedIn(true);
    };

    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: isLoggedIn,
                onLogout: logoutHandler,
            }}>
            <MainHeader onLogout={logoutHandler}/>
            <main>
                {/* тут я не убрал onLogin={loginHandler} в контекст так как внутри компонента используется этот props */}
                {!isLoggedIn && <Login onLogin={loginHandler}/>}
                {isLoggedIn && <Home onLogout={logoutHandler}/>}
            </main>
        </AuthContext.Provider>
    );
}

export default App;
