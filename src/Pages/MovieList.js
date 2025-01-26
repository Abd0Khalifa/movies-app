import { useEffect, useState, useContext } from "react";
import Card from "../Componants/Card";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { axiosInstance } from "../Network/axiosInstace";
import { LanguageContext } from "../Context/LanguageContext";

function MovieList() {
    const { contextLang } = useContext(LanguageContext);
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const myUrl = contextLang === "Ar" 
            ? `/movie/popular?language=ar&page=${page}`
            : `/movie/popular?page=${page}`;

        const url = search.trim()
            ? `/search/movie?query=${search}&page=${page}&language=${contextLang === "Ar" ? "ar" : "en"}`
            : myUrl;

        setLoading(true);
        axiosInstance
            .get(url)
            .then((res) => {
                setMovies(res.data.results);
                setTotalPages(res.data.total_pages);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }, [page, search, contextLang]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    const handleSearch = () => {
        if (search.trim() !== "") {
            const url = `/search/movie?query=${search}&page=${page}&language=${contextLang === "Ar" ? "ar" : "en"}`;
            axiosInstance
                .get(url)
                .then((res) => {
                    setMovies(res.data.results);
                    setTotalPages(res.data.total_pages);
                })
                .catch((error) => console.log(error));
        }
    };

    return (
        <>
            <div className="container">
                <h1 className="text-center text-warning"> {contextLang === "Ar" ? "الأفلام" : "MOVIES"} </h1>
                <br />
                <form className="d-flex mb-4" onSubmit={(e) => e.preventDefault()}>
                    <input
                        className="form-control me-2"
                        type="search"
                        placeholder={contextLang === "Ar" ? "ابحث عن فيلم..." : "Search for movie..."}
                        aria-label="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Link
                        className="btn btn-outline-warning"
                        onClick={handleSearch}
                        to="#"
                    >
                        {contextLang === "Ar" ? "بحث" : "Search"}
                    </Link>
                </form>

                <br />

                <ul>
                    <div className="row">
                        {loading ? (
                            <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : movies.map((movie) => (
                            <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={movie.id}>
                                <Card
                                    id={movie.id}
                                    moname={movie.title}
                                    img={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    path={`/show/${movie.id}`}
                                />
                            </div>
                        ))}
                    </div>
                </ul>

                <div className="d-flex align-items-center justify-content-center">
                    <div className="pagination text-center">
                        <button
                            className="btn btn-warning mx-2"
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page === 1}
                        >
                            {contextLang === "Ar" ? "السابق" : "Previous"}
                        </button>
                        <span className="mx-3">
                            {contextLang === "Ar" 
                                ? `صفحة ${page} من ${totalPages}` 
                                : `Page ${page} of ${totalPages}`}
                        </span>
                        <button
                            className="btn btn-warning mx-2"
                            onClick={() => handlePageChange(page + 1)}
                            disabled={page === totalPages}
                        >
                            {contextLang === "Ar" ? "التالي" : "Next"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MovieList;
