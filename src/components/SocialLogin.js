import { authService, fbInstance } from "myFirebase";
import React from "react";

const SocialLogin = () => {
    const onSocialClick = async (event) => {
        const {
            target: { name },
        } = event;
        let provider;
        if (name === "google") {
            provider = new fbInstance.auth.GoogleAuthProvider();
        } else if (name === "github") {
            provider = new fbInstance.auth.GithubAuthProvider();
        }
        await authService.signInWithPopup(provider);
    };
    return (
        <div>
            <button name="google" onClick={onSocialClick}>
                Continue with Google
            </button>
            <button name="github" onClick={onSocialClick}>
                Continue with Github
            </button>
        </div>
    );
};

export default SocialLogin;
