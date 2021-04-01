import AuthForm from "components/AuthForm";
import SocialLogin from "components/SocialLogin";
import React from "react";

const Auth = () => {
    return (
        <div>
            <AuthForm />
            <SocialLogin />
        </div>
    );
};

export default Auth;
