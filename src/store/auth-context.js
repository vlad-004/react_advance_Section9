import React, {useState, useEffect} from "react";

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => {
    },
    onLogin: (email, password) => {
    },
});

export const AuthContextProvider = (props) => {
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

    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    };

    const loginHandler = () => {
        localStorage.setItem('isLoggedIn', '1');
        setIsLoggedIn(true);
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: isLoggedIn,
                onLogout: logoutHandler,
                onLogin: loginHandler,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
