import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../Network/axiosInstace";
import { LanguageContext } from "../Context/LanguageContext";

function MovieShow() {
    const { id } = useParams(); 
    const { contextLang } = useContext(LanguageContext); 
    const [movie, setMovie] = useState({}); 

    useEffect(() => {
        axiosInstance
            .get(`/movie/${id}?language=${contextLang === "En" ? "en-US" : "ar"}`)
            .then((res) => {
                setMovie(res.data); 
            })
            .catch((errors) => {
                console.log(errors);
            });
    }, [id, contextLang]);

    return (
        <div className="container my-5">
            <h1 className="text-center text-warning mb-4">{movie.original_title}</h1>
            <div className="row align-items-center">
                <div className="col-lg-5 col-md-6 col-sm-12 mb-4">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.original_title}
                        className="img-fluid rounded border border-warning"
                        style={{maxWidth:"400px", objectFit: "cover" }}
                    />
                </div>

                <div className="col-lg-7 col-md-6 col-sm-12">
                    <h2 className="text-white">{movie.title}</h2>
                    <p className="text-light">{movie.overview}</p>
                    <p className="text-warning">
                        <strong>Popularity:</strong> {movie.popularity}
                    </p>
                    <p className="text-warning">
                        <strong>Vote:</strong> {(movie.vote_average||0).toFixed(1)}
                    </p>
                    {movie.homepage && (
                        <a 
                            href={movie.homepage} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="btn btn-outline-warning mt-3"
                        >
                            {contextLang === "En" ? "Go to Movie Page" : "انتقل إلى صفحة الفيلم"}
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MovieShow;