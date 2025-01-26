import { useContext } from "react";
import { LanguageContext } from "../Context/LanguageContext";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Home() {
    const { contextLang } = useContext(LanguageContext);

    const text = {
        En: {
            title: "Welcome to the Home Page",
            description:
                "Discover the latest movies, explore your favorites, and enjoy the best collection curated just for you. Dive in and enjoy the magic of cinema!",
            buttonText1: "Explore Movies",
            buttonText2: "Go to Favorites",
            buttonText3: "Log In",
        },
        Ar: {
            title: "مرحبًا بك في الصفحة الرئيسية",
            description:
                "اكتشف أحدث الأفلام، استعرض مفضلاتك، واستمتع بأفضل مجموعة مختارة خصيصًا لك. استمتع بسحر السينما!",
            buttonText1: "استكشف الأفلام",
            buttonText2: "انتقل إلى المفضلة",
            buttonText3: "تسجيل الدخول",
        },
    };

    const currentText = text[contextLang] || text.En;

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                height: "100vh",
                textAlign: "center",
            }}
        >
            <h1
                style={{
                    fontSize: "4rem",
                    fontWeight: "bold",
                    color: "#f39c12",
                    textShadow: "2px 2px 8px rgba(0, 0, 0, 0.5)",
                    marginBottom: "20px",
                }}
            >
                {currentText.title}
            </h1>
            <p
                style={{
                    fontSize: "1.5rem",
                    maxWidth: "600px",
                    lineHeight: "1.8",
                }}
            >
                {currentText.description}
            </p>
            <div
                style={{
                    display: "flex",
                    gap: "20px", 
                }}
            >
                <Link
                    to="/movies"
                    className="btn btn-outline-warning"
                >
                    {currentText.buttonText1}
                </Link>
                <Link
                    to="/Fav"
                    className="btn btn-outline-warning"
                >
                    {currentText.buttonText2}
                </Link>
                <Link
                    to="/login"
                    className="btn btn-outline-warning"
                >
                    {currentText.buttonText3}
                </Link>
            </div>
        </div>
    );
}

export default Home;