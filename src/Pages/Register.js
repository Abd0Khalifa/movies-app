import { useState, useContext } from "react";
import { LanguageContext } from "../Context/LanguageContext"; // تأكد من المسار الصحيح

function Register() {
    const { contextLang } = useContext(LanguageContext); // جلب اللغة الحالية

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        userName: "",
        password: "",
        confirmPassword: ""
    });

    const [userDataErrors, setuserDataErrors] = useState({
        nameError: null,
        emailError: null,
        userNameError: null,
        passwordError: null,
        confirmPasswordError: null
    });

    // النصوص والرسائل بناءً على اللغة
    const text = {
        En: {
            title: "Register",
            nameLabel: "Name",
            emailLabel: "Email",
            userNameLabel: "Username",
            passwordLabel: "Password",
            confirmPasswordLabel: "Confirm Password",
            nameRequired: "This Field Is Required",
            nameInvalid: "Please Enter at least 3 characters",
            emailRequired: "This Field Is Required",
            emailInvalid: "Please Enter A Valid Email",
            userNameRequired: "This Field Is Required",
            userNameInvalid: "Please Enter A Valid Username (no spaces, at least 5 characters)",
            passwordRequired: "This Field Is Required",
            passwordInvalid: "Password must be at least 8 characters, contain one lowercase, one uppercase, one digit, and one special character",
            confirmPasswordRequired: "This Field Is Required",
            confirmPasswordInvalid: "Passwords do not match",
            registerButton: "Register"
        },
        Ar: {
            title: "انشاء حساب",
            nameLabel: "الاسم",
            emailLabel: "البريد الإلكتروني",
            userNameLabel: "اسم المستخدم",
            passwordLabel: "كلمة المرور",
            confirmPasswordLabel: "تأكيد كلمة المرور",
            nameRequired: "هذا الحقل مطلوب",
            nameInvalid: "يرجى إدخال 3 أحرف على الأقل",
            emailRequired: "هذا الحقل مطلوب",
            emailInvalid: "يرجى إدخال بريد إلكتروني صحيح",
            userNameRequired: "هذا الحقل مطلوب",
            userNameInvalid: "يرجى إدخال اسم مستخدم صحيح (بدون مسافات، 5 أحرف على الأقل)",
            passwordRequired: "هذا الحقل مطلوب",
            passwordInvalid: "يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل، حرف صغير، حرف كبير، رقم، ورمز خاص",
            confirmPasswordRequired: "هذا الحقل مطلوب",
            confirmPasswordInvalid: "كلمات المرور غير متطابقة",
            registerButton: "انشاء حساب"
        }
    };

    const currentText = text[contextLang]; // النصوص الحالية بناءً على اللغة

    const HandleData = (e) => {
        const { name, value } = e.target;

        setUserData({
            ...userData,
            [name]: value
        });

        setuserDataErrors({
            ...userDataErrors,
            [`${name}Error`]: validateField(name, value)
        });
    };

    const validateField = (name, value) => {
        switch (name) {
            case "name":
                return value.length === 0
                    ? currentText.nameRequired
                    : value.length < 3
                    ? currentText.nameInvalid
                    : null;
            case "email":
                return value.length === 0
                    ? currentText.emailRequired
                    : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                    ? currentText.emailInvalid
                    : null;
            case "userName":
                return value.length === 0
                    ? currentText.userNameRequired
                    : !/^\S{5,}$/.test(value)
                    ? currentText.userNameInvalid
                    : null;
            case "password":
                return value.length === 0
                    ? currentText.passwordRequired
                    : !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)
                    ? currentText.passwordInvalid
                    : null;
            case "confirmPassword":
                return value.length === 0
                    ? currentText.confirmPasswordRequired
                    : value !== userData.password
                    ? currentText.confirmPasswordInvalid
                    : null;
            default:
                return null;
        }
    };

    const SubmitData = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <div className="container register-form">
                <h1 className="text-center text-warning mb-4">{currentText.title}</h1>
                <form onSubmit={(e) => SubmitData(e)}>
                    <div className="mb-3">
                        <label htmlFor="exampleInput" className="form-label">{currentText.nameLabel}</label>
                        <input
                            type="text"
                            className={`form-control ${userDataErrors.nameError == null ? "" : userDataErrors.nameError ? "is-invalid" : "is-valid"}`}
                            name="name"
                            value={userData.name}
                            onChange={(e) => HandleData(e)}
                        />
                        <p className="text-danger"> {userDataErrors.nameError} </p>
                    </div>
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
                        <label htmlFor="exampleInput" className="form-label">{currentText.userNameLabel}</label>
                        <input
                            type="text"
                            className={`form-control ${userDataErrors.userNameError == null ? "" : userDataErrors.userNameError ? "is-invalid" : "is-valid"}`}
                            name="userName"
                            value={userData.userName}
                            onChange={(e) => HandleData(e)}
                        />
                        <p className="text-danger"> {userDataErrors.userNameError} </p>
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
                        <p className="text-danger"> {userDataErrors.passwordError} </p>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">{currentText.confirmPasswordLabel}</label>
                        <input
                            type="password"
                            className={`form-control ${userDataErrors.confirmPasswordError == null ? "" : userDataErrors.confirmPasswordError ? "is-invalid" : "is-valid"}`}
                            name="confirmPassword"
                            value={userData.confirmPassword}
                            onChange={(e) => HandleData(e)}
                        />
                        <p className="text-danger"> {userDataErrors.confirmPasswordError} </p>
                    </div>

                    <div className="text-center mt-4">
                        <button
                            disabled={
                                userDataErrors.nameError ||
                                userDataErrors.emailError ||
                                userDataErrors.userNameError ||
                                userDataErrors.passwordError ||
                                userDataErrors.confirmPasswordError
                            }
                            type="submit"
                            className="btn btn-outline-warning"
                        >
                            {currentText.registerButton}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Register;