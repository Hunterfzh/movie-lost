import { useState, useEffect } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editGenre, setEditGenre] = useState("");
  const [filter, setFilter] = useState("All");

  // fetching movies from the mock API
  useEffect(() => {
    fetch("https://65jpaeea85c3dd7e3b4be7aff.mockapi.io/api/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch(() => {
        setMovies([
          //hardcoding the moveies
          { id: 1, title: "Inception", genre: "Sci-Fi", watched: false },
          { id: 2, title: "The Dark Knight", genre: "Action", watched: true },
          { id: 3, title: "Interstellar", genre: "Sci-Fi", watched: false },
          {
            id: 4,
            title: "SpiderMan: HomeComing",
            genre: "Action",
            watched: false,
          },
          { id: 5, title: "Sinners", genre: "Action", watched: true },
        ]);
      });
  }, []);

  // Adding a movie
  function handleAdd(e) {
    e.preventDefault();
    if (!title || !genre) return;
    const newMovie = { id: Date.now(), title, genre, watched: false };
    setMovies([...movies, newMovie]);
    setTitle("");
    setGenre("");
  }

  // Part 3: delete a movie
  function handleDelete(id) {
    setMovies(movies.filter((m) => m.id !== id));
  }

  // Part 3: toggle watched
  function handleToggleWatched(id) {
    setMovies(
      movies.map((m) => (m.id === id ? { ...m, watched: !m.watched } : m))
    );
  }

  // Part 3: save edit
  function handleEditSubmit(e) {
    e.preventDefault();
    setMovies(
      movies.map((m) =>
        m.id === editId ? { ...m, title: editTitle, genre: editGenre } : m
      )
    );
    setEditId(null);
    setEditTitle("");
    setEditGenre("");
  }

  // Part 5: build genre list for filter buttons
  const genres = ["All", ...new Set(movies.map((m) => m.genre))];

  //filtering movies based on selected genre the user selcts
  const filtered =
    filter === "All" ? movies : movies.filter((m) => m.genre === filter);

  return (
    <div className="container">
      <h1>Movie Watchlist</h1>

      {/*Adding new movies with the form funciton */}
      <form onSubmit={handleAdd} className="add-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <button type="submit">Add Movie</button>
      </form>

      {/* Filter buttons */}
      <div className="filters">
        {genres.map((g) => (
          <button
            key={g}
            onClick={() => setFilter(g)}
            className={filter === g ? "active" : ""}
          >
            {g}
          </button>
        ))}
      </div>

      {/* movie list with .map() and unique key */}
      <ul className="movie-list">
        {filtered.map((movie) => (
          <li key={movie.id} className="movie-item">
            {editId === movie.id ? (
              <form onSubmit={handleEditSubmit} className="input-form">
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <input
                  value={editGenre}
                  onChange={(e) => setEditGenre(e.target.value)}
                />
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditId(null)}>
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <div className="movie-info">
                  <strong>{movie.title}</strong>
                  <span>Genre: {movie.genre}</span>
                  <span>Watched: {movie.watched ? "Yes" : "No"}</span>
                </div>
                <div className="movie-actions">
                  <button onClick={() => handleToggleWatched(movie.id)}>
                    {movie.watched ? "Unwatch" : "Watch"}
                  </button>
                  <button
                    onClick={() => {
                      setEditId(movie.id);
                      setEditTitle(movie.title);
                      setEditGenre(movie.genre);
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDelete(movie.id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
