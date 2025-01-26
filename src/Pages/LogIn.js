import { useState, useContext } from "react";
import { LanguageContext } from "../Context/LanguageContext"; 

function LogIn() {
    const { contextLang } = useContext(LanguageContext); 

    const [userData, setUserData] = useState({
        email: "",
        password: ""
    });

    const [userDataErrors, setuserDataErrors] = useState({
        emailError: null,
        passwordError: null
    });

    const text = {
        En: {
            title: "Log In",
            emailLabel: "Email",
            passwordLabel: "Password",
            emailRequired: "This Field Is Required",
            emailInvalid: "Please Enter A Valid Email",
            passwordRequired: "This Field Is Required",
            passwordInvalid: "Please Enter at least 8 characters",
            loginButton: "Log In"
        },
        Ar: {
            title: "تسجيل الدخول",
            emailLabel: "البريد الإلكتروني",
            passwordLabel: "كلمة المرور",
            emailRequired: "هذا الحقل مطلوب",
            emailInvalid: "يرجى إدخال بريد إلكتروني صحيح",
            passwordRequired: "هذا الحقل مطلوب",
            passwordInvalid: "يرجى إدخال 8 أحرف على الأقل",
            loginButton: "تسجيل الدخول"
        }
    };

    const currentText = text[contextLang]; 

    const HandleData = (e) => {
        if (e.target.name === "email") {
            setUserData({
                ...userData,
                email: e.target.value
            });
            setuserDataErrors({
                ...userDataErrors,
                emailError: e.target.value.length === 0
                    ? currentText.emailRequired
                    : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)
                    && currentText.emailInvalid
            });
        } else {
            setUserData({
                ...userData,
                password: e.target.value
            });
            setuserDataErrors({
                ...userDataErrors,
                passwordError: e.target.value.length === 0 ? currentText.passwordRequired : e.target.value.length < 8 && currentText.passwordInvalid
            });
        }
    };

    const SubmitData = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <div className="container log-in-form">
                <h1 className="text-center text-warning mb-4">{currentText.title}</h1>
                <form onSubmit={(e) => SubmitData(e)}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">{currentText.emailLabel}</label>
                        <input
                            type="email"
                            className={`form-control ${userDataErrors.emailError == null ? "" : userDataErrors.emailError ? "is-invalid" : "is-valid"}`}
                            name="email"
                            value={userData.email}
                            onChange={(e) => HandleData(e)}
                        />
                        <p className="text-danger"> {userDataErrors.emailError} </p>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">{currentText.passwordLabel}</label>
                        <input
                            type="password"
                            className={`form-control ${userDataErrors.passwordError == null ? "" : userDataErrors.passwordError ? "is-invalid" : "is-valid"}`}
                            name="password"
                            value={userData.password}
                            onChange={(e) => HandleData(e)}
                        />
                    </div>
                    <p className="text-danger"> {userDataErrors.passwordError} </p>

                    <div className="text-center mt-4">
                        <button
                            disabled={userDataErrors.emailError || userDataErrors.passwordError}
                            type="submit"
                            className="btn btn-outline-warning"
                        >
                            {currentText.loginButton}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default LogIn;