import { useSelector } from "react-redux";
import { useContext, useEffect, useState } from "react";
import Card from "../Componants/Card";
import { LanguageContext } from "../Context/LanguageContext";
import { axiosInstance } from "../Network/axiosInstace";

function FavoritesPage() {
    const { contextLang } = useContext(LanguageContext);
    const [localizedFavorites, setLocalizedFavorites] = useState([]);
    const favorites = useSelector((state) => state.movies);

    useEffect(() => {
        if (favorites.length === 0) {
            setLocalizedFavorites([]);
            return;
        }

        const fetchLocalizedMovies = async () => {
            try {
                const updatedFavorites = await Promise.all(
                    favorites.map(async (movie) => {
                        const response = await axiosInstance.get(
                            `/movie/${movie.id}?language=${contextLang === "En" ? "en-US" : "ar"}`
                        );
                        return {
                            id: movie.id,
                            img: `https://image.tmdb.org/t/p/w500${response.data.poster_path}`,
                            moname: response.data.title,
                            about: response.data.overview,
                            popularity: response.data.popularity,
                        };
                    })
                );
                setLocalizedFavorites(updatedFavorites);
            } catch (error) {
                console.error("Error fetching localized movies:", error);
            }
        };

        fetchLocalizedMovies();
    }, [contextLang, favorites]); 

    return (
        <div className="favorites-page container">
            <h2 className="text-center text-warning my-4">
                {contextLang === "En" ? "My Favorites" : "مفضلتي"}
            </h2>
            {localizedFavorites.length === 0 ? (
                <h1
                    style={{
                        fontSize: "2.5rem",
                        fontWeight: "bold",
                        color: "#ff4d4d",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                    }}
                >
                    {contextLang === "En"
                        ? "You haven't added any movies to your favorites yet."
                        : "لم تقم بإضافة أي أفلام إلى قائمتك المفضلة بعد."}
                </h1>
            ) : (
                <div className="row">
                    {localizedFavorites.map((movie) => (
                        <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={movie.id}>
                            <Card
                                id={movie.id}
                                img={movie.img}
                                moname={movie.moname}
                                popularity={movie.popularity}
                                path={`/show/${movie.id}`}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default FavoritesPage;


