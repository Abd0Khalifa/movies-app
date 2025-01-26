import { Link } from "react-router-dom";
import './Navbar.css';
import { useSelector } from "react-redux";
import { useContext } from "react";
import { LanguageContext } from "../Context/LanguageContext";
import { ThemeContext } from "../Context/ThemeContext";

function Navbar() {
    const favoriteCount = useSelector((state) => state.movies.length);
    const { contextLang, setContextLang } = useContext(LanguageContext);
    const { themeContext, setThemeContext } = useContext(ThemeContext)


    const text = {
        En: {
            home: "Home",
            moviesList: "Movies List",
            favorites: "Favorites",
            account: "Account",
            login: "Login",
            register: "Register",
        },
        Ar: {
            home: "الرئيسية",
            moviesList: "قائمة الأفلام",
            favorites: "المفضلة",
            account: "الحساب",
            login: "تسجيل الدخول",
            register: "إنشاء حساب",
        },
    };

    const currentText = text[contextLang] || text.En;

    return (
        <nav className="navbar navbar-expand-lg" >
            <div className="container-fluid">
                <span className="navbar-brand text-warning fw-bold">MOVIES</span>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${themeContext === "dark" ? "text-white" : "text-dark"}`} aria-current="page" to="/">
                                {currentText.home}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${themeContext === "dark" ? "text-white" : "text-dark"}`} to="/movies">
                                {currentText.moviesList}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${themeContext === "dark" ? "text-white" : "text-dark"}`} to="/Fav">
                                {currentText.favorites} {favoriteCount}
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link
                                className={`nav-link dropdown-toggle ${themeContext === "dark" ? "text-white" : "text-dark"}`}
                                id="navbarDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {currentText.account}
                            </Link>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li>
                                    <Link className="dropdown-item" to="/login">
                                        {currentText.login}
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/register">
                                        {currentText.register}
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <button
                                onClick={() => setContextLang(contextLang === "En" ? "Ar" : "En")}
                                className="btn btn-outline-warning"
                            >
                                {contextLang}
                            </button>
                        </li>
                        <li className="nav-item ps-3">
                            <button
                                className="btn btn-outline-warning"
                                onClick={() => setThemeContext(themeContext === "dark" ? "light" : "dark")}
                            >
                                {themeContext === "dark" ? "🌞 Light" : "🌙 Dark"}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
