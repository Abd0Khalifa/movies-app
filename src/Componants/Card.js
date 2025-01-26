import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Card.css";
import { addFavorite, removeFavorite } from "../Redux/Actions";

function Card({ id, img, moname, about, popularity, path }) {
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.movies);
    const isFavorite = favorites.some((movie) => movie.id === id);

    const handleFavoriteToggle = () => {
        if (isFavorite) {
            dispatch(removeFavorite(id));
        } else {
            dispatch(addFavorite({ id, img, moname, about, popularity }));
        }
    };

    return (
        <div className="card movie-card">
            <img src={img} className="card-img-top" alt={moname} />
            <div className="card-body">
                <h5 className="card-title">{moname}</h5>
                <p className="card-text">{about}</p>
                {popularity && (
                    <p className="card-text">
                        <strong>Popularity:</strong> {popularity}
                    </p>
                )}
                <div className="d-flex gap-2">
                    {path && (
                        <Link to={path} className="btn btn-outline-warning w-50">
                            Show Movie
                        </Link>
                    )}
                    <button
                        className={`btn ${isFavorite ? "btn-danger" : "btn-outline-success"} w-50`}
                        onClick={handleFavoriteToggle}
                    >
                        {isFavorite ? <i className="bi bi-balloon-heart-fill"></i> : <i className="bi bi-balloon-heart"></i>}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Card;
