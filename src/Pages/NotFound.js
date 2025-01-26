import { Link } from "react-router-dom";
import { useContext } from "react";
import { LanguageContext } from "../Context/LanguageContext";

function NotFound() {
    const { contextLang } = useContext(LanguageContext);

    const text = {
        En: {
            title: "404",
            subtitle: "Oops! Page Not Found",
            description: "The page you are looking for does not exist or has been moved.",
            buttonText: "Back to Home",
        },
        Ar: {
            title: "٤٠٤",
            subtitle: "عذرًا! الصفحة غير موجودة",
            description: "الصفحة التي تبحث عنها غير موجودة أو تم نقلها.",
            buttonText: "العودة إلى الصفحة الرئيسية",
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
                    fontSize: "5rem",
                    fontWeight: "bold",
                    color: "#ff4d4d",
                    marginBottom: "20px",
                }}
            >
                {currentText.title}
            </h1>
            <h2 style={{ fontSize: "2rem", marginBottom: "20px" }}>
                {currentText.subtitle}
            </h2>
            <p style={{ fontSize: "1.2rem", marginBottom: "30px" }}>
                {currentText.description}
            </p>
            <Link
                to="/"
                style={{
                    textDecoration: "none",
                    color: "#fff",
                    backgroundColor: "#ff4d4d",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    fontSize: "1rem",
                    fontWeight: "bold",
                    transition: "background-color 0.3s",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#e60000")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#ff4d4d")}
            >
                {currentText.buttonText}
            </Link>
        </div>
    );
}

export default NotFound;
