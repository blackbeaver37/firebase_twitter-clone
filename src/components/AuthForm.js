import { authService } from "myFirebase";
import React, { useState } from "react";

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState("true");
    const [error, setError] = useState("");
    const onChange = (event) => {
        const {
            target: { name, value },
        } = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            if (newAccount) {
                await authService.createUserWithEmailAndPassword(
                    email,
                    password
                );
            } else {
                await authService.signInWithEmailAndPassword(email, password);
            }
        } catch (e) {
            setError(e.message);
        }
    };
    const toogleAccount = () => setNewAccount((prev) => !prev);
    return (
        <>
            <form className="container" onSubmit={onSubmit}>
                <input
                    className="authInput"
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={onChange}
                />
                <input
                    className="authInput"
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={onChange}
                />
                <input
                    className="authInput authSubmit"
                    type="submit"
                    value={newAccount ? "Create Account" : "Log In"}
                />
                {error && <span className="authError">{error}</span>}
            </form>
            <span className="authSwitch" onClick={toogleAccount}>
                {newAccount ? "Sign In" : "Create Account"}
            </span>
        </>
    );
};

export default AuthForm;
