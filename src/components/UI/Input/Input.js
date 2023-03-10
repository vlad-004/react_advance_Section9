import React, {useImperativeHandle, useRef} from "react";
import styles from './input.module.css';

const Input = React.forwardRef((props, ref) => {
    const inputRef = useRef();

    const activate = () => {
        console.log('activate input')
        inputRef.current.focus();
    }


    useImperativeHandle(ref, () => {
        console.log('useImperativeHandle')
        return {
            focus: activate
        }
    })
    return (
        <div
            className={
                `${styles.control} ${props.isValid === false ? styles.invalid : ""}`
            }
        >
            <label htmlFor={props.id}>{props.label}</label>
            <input
                ref={inputRef}
                type={props.type}
                id={props.id}
                value={props.value}
                onChange={props.onChange}
                onBlur={props.onBlur}
            />
        </div>
    );
});

export default Input;