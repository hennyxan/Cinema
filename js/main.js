const movies = [
    { name: "Звездные Войны", time: "17:30", price: 12, seats: 150, date: "2024-03-01" },
    { name: "Форсаж", time: "18:45", price: 10, seats: 160, date: "2024-03-01" },
    { name: "Титаник", time: "20:00", price: 8, seats: 200, date: "2024-03-01" },
    { name: "Властелин колец", time: "12:00", price: 11, seats: 120, date: "2024-03-01" },
    { name: "Гарри Поттер", time: "14:30", price: 9, seats: 180, date: "2024-03-01" },
    { name: "Матрица", time: "15:00", price: 10, seats: 100, date: "2024-03-02" },
    { name: "Игры разума", time: "17:15", price: 13, seats: 120, date: "2024-03-02" },
    { name: "Шерлок Холмс", time: "19:30", price: 11, seats: 150, date: "2024-03-02" },
    { name: "Пираты Карибского моря", time: "10:00", price: 12, seats: 180, date: "2024-03-02" },
    { name: "Побег из Шоушенка", time: "14:00", price: 9, seats: 200, date: "2024-03-03" },
    { name: "Аватар", time: "16:30", price: 11, seats: 160, date: "2024-03-03" },
    { name: "Зеленая миля", time: "19:00", price: 10, seats: 150, date: "2024-03-03" },
    { name: "Интерстеллар", time: "11:45", price: 12, seats: 140, date: "2024-03-03" },
    { name: "Гладиатор", time: "14:15", price: 8, seats: 180, date: "2024-03-04" },
    { name: "Терминатор", time: "17:00", price: 10, seats: 170, date: "2024-03-04" },
    { name: "Криминальное чтиво", time: "20:15", price: 9, seats: 160, date: "2024-03-04" }
];

function isMovieStarted(movieTime, selectedDate) {
    const now = new Date();
    const [hours, minutes] = movieTime.split(":");
    const movieDate = new Date(selectedDate);
    const movieStart = new Date(movieDate.getFullYear(), movieDate.getMonth(), movieDate.getDate(), hours, minutes);
    return now > movieStart;
}

function buyTicket(movieIndex) {
    const selectedMovie = movies[movieIndex];
    if (selectedMovie.seats <= 0) {
        console.log(`Извините, на фильм "${selectedMovie.name}" нет свободных мест.`);
    } else if (isMovieStarted(selectedMovie.time, selectedMovie.date)) {
        console.log(`Извините, ${selectedMovie.name} уже начался.`);
    } else {
        const selectedTicketsDiv = document.getElementById("selectedTickets");
        const ticketParagraph = document.createElement("p");
        ticketParagraph.textContent = `Вы купили билет на ${selectedMovie.name} в ${selectedMovie.time} за ${selectedMovie.price}$.`;
        selectedTicketsDiv.appendChild(ticketParagraph);
        selectedMovie.seats--; // уменьшаем количество доступных мест
        console.log(`Осталось мест на фильм "${selectedMovie.name}": ${selectedMovie.seats}`);
    }
}

function buyTickets() {
    const selectedDate = document.getElementById("date").value;
    const selectedMovies = movies.filter(movie => movie.date === selectedDate);

    const selectedMoviesDiv = document.getElementById("movies");
    selectedMoviesDiv.innerHTML = ""; // Очищаем предыдущее содержимое

    selectedMovies.forEach(movie => {
        const movieDiv = document.createElement("div");
        movieDiv.classList.add("movie");
        const movieButton = document.createElement("button");

        movieButton.textContent = `Купить билет на ${movie.name} (${movie.time}) за ${movie.price}$. Осталось мест: ${movie.seats}`;

        movieButton.addEventListener("click", function() {
            buyTicket(movies.indexOf(movie));
        });

        movieDiv.appendChild(movieButton);
        selectedMoviesDiv.appendChild(movieDiv);
    });
}

document.getElementById("buyButton").addEventListener("click", buyTickets);
