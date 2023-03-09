import React, {useState, useEffect, useReducer, useContext} from "react";

import Card from "../UI/Card/Card";
import styles from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";
import Input from "../UI/Input/Input";

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

const Login = () => {
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

    //TODO: прочитать про Алиасы при деструктуризации
    const {isValid: emailIsValid} = emailState;
    const {isValid: passwordIsValid} = passwordState;

    const ctx = useContext(AuthContext);

    //useEffect будет запускаться только если изменится параметр isValid у состояний инпута пароля и емейла.
    useEffect(() => {
        const timer = setTimeout(() => {
            console.log('Effect function')

            setFormIsValid(emailIsValid && passwordIsValid);
        }, 1000);

        return () => {
            console.log('Cleear timer');
            clearTimeout(timer);
        }

    }, [emailIsValid, passwordIsValid]); // я бы просто использовал [emailState.isValid, passwordState.isValid]


    const emailChangeHandler = (event) => {
        // вызов dispatchEmailState приведет к вызову функции emailReducer
        //{type:'USER_INPUT', value: event.target.value} --- action , действие
        dispatchEmailState({type: 'USER_INPUT', value: event.target.value});
    };

    const passwordChangeHandler = (event) => {
        dispatchPasswordState({type: 'USER_INPUT', value: event.target.value});
    };

    /**
     * Валидируем емейл когда инпут теряет фокус
     */
    const validateEmailHandler = () => {
        dispatchEmailState({type: 'INPUT_BLUR'});
    };

    const validatePasswordHandler = () => {
        dispatchPasswordState({type: 'INPUT_BLUR'});
    };

    const submitHandler = (event) => {
        event.preventDefault();
        ctx.onLogin(emailState.value, passwordState.value);
    };

    return (
        <Card className={styles.login}>
            <form onSubmit={submitHandler}>
                <Input
                    id={'email'}
                    label={'Email'}
                    type={'email'}
                    isValid={emailIsValid}
                    value={emailState.value}
                    onChange={emailChangeHandler}
                    onBlur={validateEmailHandler}
                />
                <Input
                    id={'password'}
                    label={'password'}
                    type={'password'}
                    isValid={passwordIsValid}
                    value={passwordState.value}
                    onChange={passwordChangeHandler}
                    onBlur={validatePasswordHandler}
                />

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
