import React, {useState, useEffect, useReducer} from "react";

import Card from "../UI/Card/Card";
import styles from "./Login.module.css";
import Button from "../UI/Button/Button";

// с помощью редюсера с кмобинируем валидацию поля и его значение в 1 состояние.

// эта функция за пределами функции компонента, так как внутри функции редюсера не нужли какието данные которые генерятся внутри функции компонента Login
// все что нужно в эту функцию будет передаваться возможностями реакта
const emailReducer = (prevState, action) => {
    if (action.type === 'USER_INPUT') {
        return {
            value: action.value,
            isValid: action.value.includes('@'),
        };
    }
    if (action.type === 'INPUT_BLUR') {
        return {
            value: prevState.value,
            isValid: prevState.value.includes('@'),
        }
    }
    return {
        value: '',
        isValid: false,
    }
}

const passwordReducer = (prevState, action) => {
    if (action.type === 'USER_INPUT') {
        return {
            value: action.value,
            isValid: action.value.trim().length > 7,
        };
    }
    if (action.type === 'INPUT_BLUR') {
        return {
            value: prevState.value,
            isValid: prevState.value.trim().length > 7,
        }
    }
    return {
        value: '',
        isValid: false,
    }
}

const Login = (props) => {
    //useReducer нужен для комбинирования  в одно состояние, двух и более относящихся друг к другу состояний

    // const [inputEmail, setInputEmail] = useState("");
    // const [emailIsValid, setEmailIsValid] = useState();

    // const [inputPassword, setInputPassword] = useState("");
    // const [passwordIsValid, setPasswordIsValid] = useState();

    const [formIsValid, setFormIsValid] = useState(false);


    // {value: '', isValid: false} это начальное состояние которые мы задаем для emailState
    const [emailState, dispatchEmailState] = useReducer(emailReducer, {
        value: '',
        isValid: undefined
    });

    const [passwordState, dispatchPasswordState] = useReducer(passwordReducer, {
        value: '',
        isValid: undefined
    });


    // useEffect(() => {
    //     const timer = setTimeout(()=> {
    //         console.log('Effect function')
    //
    //         setFormIsValid(inputEmail.includes("@") && inputPassword.trim().length > 7);
    //     }, 1000);
    //
    //     return () => {
    //         console.log('Cleear timer');
    //         clearTimeout(timer);
    //     }
    //
    // }, [inputEmail, inputPassword]);


    const emailChangeHandler = (event) => {
        // вызов dispatchEmailState приведет к вызову функции emailReducer
        //{type:'USER_INPUT', value: event.target.value} --- action , действие
        dispatchEmailState({type: 'USER_INPUT', value: event.target.value});

        setFormIsValid(event.target.value.includes('@') && passwordState.isValid);
    };

    const passwordChangeHandler = (event) => {
        // setInputPassword(event.target.value);
        dispatchPasswordState({type:'USER_INPUT', value:event.target.value});
        setFormIsValid(event.target.value.trim().length > 7 && emailState.isValid);
    };

    /**
     * Валидируем емейл когда инпут теряет фокус
     */
    const validateEmailHandler = () => {
        dispatchEmailState({type: 'INPUT_BLUR'});
    };

    const validatePasswordHandler = () => {
        // setPasswordIsValid(inputPassword.trim().length > 7);
        dispatchPasswordState({type: 'INPUT_BLUR'});
    };

    const submitHandler = (event) => {
        event.preventDefault();
        props.onLogin(emailState.value, passwordState.value);
    };

    return (
        <Card className={styles.login}>
            <form onSubmit={submitHandler}>
                <div
                    className={`${styles.control} ${
                        emailState.isValid === false ? styles.invalid : ""
                    }`}
                >
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={emailState.value}
                        onChange={emailChangeHandler}
                        onBlur={validateEmailHandler}
                    />
                </div>
                <div
                    className={`${styles.control} ${
                        passwordState.isValid === false ? styles.invalid : ""
                    }`}
                >
                    <label htmlFor="password">Пароль</label>
                    <input
                        type="password"
                        id="password"
                        value={passwordState.value}
                        onChange={passwordChangeHandler}
                        onBlur={validatePasswordHandler}
                    />
                </div>
                <div className={styles.actions}>
                    <Button type="submit" className={styles.btn} disabled={!formIsValid}>
                        Вход
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default Login;
