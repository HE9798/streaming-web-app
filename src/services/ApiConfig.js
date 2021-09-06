import axios from "axios";

const apiKey = "dbd67e65d3366adca1e3341f81d72f54"

const URL = "https://api.themoviedb.org/3"
const imageURL = "https://image.tmdb.org/t/p/"

const nowPlaying = `${URL}/movie/now_playing`
const topRated = `${URL}/movie/top_rated`
const upcoming = `${URL}/movie/upcoming`
const movie = `${URL}/movie`
const discover = `${URL}/discover/movie`
const genre = `${URL}/genre/movie/list`
const person = `${URL}/trending/person/week`
const serie = `${URL}/tv`
const tvAiringToday = `${URL}/tv/airing_today`
const seriesGenre = `${URL}/genre/tv/list`
const discoverTV = `${URL}/discover/tv`
const popularTV = `${URL}/tv/popular`
const topRatedTV = `${URL}/tv/top_rated`

export const fetchMovies = async() => {
    try {
        const { data } = await axios.get(nowPlaying, {
            params: {
                api_key: apiKey,
                language: 'en-US',
                page: 1
            }
        })

        const posterURL = imageURL + 'original/'

        const modifiedData = data['results'].map((movie) => ({
            id: movie['id'],
            title: movie['title'],
            overview: movie['overview'],
            popularity: movie['popularity'],
            date: movie['release_date'],
            liked: movie['vote_count'],
            rating: movie['vote_average'],
            poster: posterURL + movie['poster_path'],
            backPoster: posterURL + movie['backdrop_path']
        }))

        return modifiedData

    } catch(error) {
        console.log(error.message)
    }
}

export const fetchGenre = async() => {
    try {
        const { data } = await axios.get(genre, {
            params: {
                api_key: apiKey,
                language: 'en-US',
                page: 1
            }
        })

        const modifiedData = data['genres'].map((genre) => ({
            id: genre['id'],
            name: genre['name']
        }))

        return modifiedData

    } catch (error) {
        console.log(error.message)
    }
}

export const fetchMovieByGenre = async(genre_id) => {
    try {
        const { data } = await axios.get(discover, {
            params: {
                api_key: apiKey,
                language: 'en-US',
                page: 1,
                with_genres: genre_id
            }
        })

        const posterURL = imageURL + 'original/'

        const modifiedData = data['results'].map((movie) => ({
            id: movie['id'],
            title: movie['title'],
            overview: movie['overview'],
            popularity: movie['popularity'],
            date: movie['release_date'],
            liked: movie['vote_count'],
            rating: movie['vote_average'],
            poster: posterURL + movie['poster_path'],
            backPoster: posterURL + movie['backdrop_path']
        }))

        return modifiedData

    } catch(error) {
        console.log(error.message)
    }
}

export const fetchPeople = async() => {
    try {
        const { data } = await axios.get(person, {
            params: {
                api_key: apiKey
            }
        })

        const modifiedData = data['results'].map((person) => ({
            id: person['id'],
            name: person['name'],
            popularity: person['popularity'],
            known: person['known_for_department'],
            profile_img: imageURL + 'w200/' + person['profile_path']
        }))

        return modifiedData

    } catch(error) {
        console.log(error.message)
    }
}

export const fetchTopRated = async() => {
    try {
        const { data } = await axios.get(topRated, {
            params: {
                api_key: apiKey,
                language: 'en-US',
                page: 1
            }
        })

        const posterURL = imageURL + 'original/'

        const modifiedData = data['results'].map((movie) => ({
            id: movie['id'],
            title: movie['title'],
            overview: movie['overview'],
            popularity: movie['popularity'],
            date: movie['release_date'],
            liked: movie['vote_count'],
            rating: movie['vote_average'],
            poster: posterURL + movie['poster_path'],
            backPoster: posterURL + movie['backdrop_path']
        }))

        return modifiedData

    } catch(error) {
        console.log(error.message)
    }
}

export const fetchMovieDetail = async(id) => {
    try {
        const { data } = await axios.get(`${movie}/${id}`, {
            params: {
                api_key: apiKey,
                language: 'en-US'
            }
        })

        return data

    } catch(error) {
        console.log(error.message)
    }
}

export const fetchMovieVideos = async(id) => {
    try {
        const { data } = await axios.get(`${movie}/${id}/videos`, {
            params: {
                api_key: apiKey
            }
        })

        return data['results'][0]
    } catch(error) {
        console.log(error.message)
    }
}

export const fetchCasts = async(id) => {
    try {
        const { data } = await axios.get(`${movie}/${id}/credits`, {
            params: {
                api_key: apiKey
            }
        })

        const modifiedData = data['cast'].map((cast) => ({
            id: cast['id'],
            name: cast['name'],
            character: cast['character'],
            image: imageURL + 'w200/' + cast['profile_path']
        }))

        return modifiedData
    
    } catch(error) {
        console.log(error.message)
    }
}

export const fetchSimilarMovies = async(id) => {
    try {
        const { data } = await axios.get(`${movie}/${id}/similar`, {
            params: {
                api_key: apiKey,
                language: 'en-US'
            }
        })

        const posterURL = imageURL + 'original/'

        const modifiedData = data['results'].map((movie) => ({
            id: movie['id'],
            title: movie['title'],
            overview: movie['overview'],
            popularity: movie['popularity'],
            date: movie['release_date'],
            rating: movie['vote_average'],
            liked: movie['vote_count'],
            poster: posterURL + movie['poster_path'],
            backPoster: posterURL + movie['backdrop_path']
        }))


        return modifiedData

    } catch(error) {
        console.log(error.message)
    }
}

export const fetchComingSoon = async() => {
    try {
        const { data } = await axios.get(upcoming, {
            params: {
                api_key: apiKey,
                language: 'en-US',
                page: 1
            }
        })

        const posterURL = imageURL + 'original/'

        const modifiedData = data['results'].map((movie) => ({
            id: movie['id'],
            title: movie['title'],
            overview: movie['overview'],
            popularity: movie['popularity'],
            date: movie['release_date'],
            liked: movie['vote_count'],
            rating: movie['vote_average'],
            poster: posterURL + movie['poster_path'],
            backPoster: posterURL + movie['backdrop_path']
        }))

        return modifiedData

    } catch(error) {
        console.log(error.message)
    }
}

export const fetchSerieDetail = async(id) => {
    try {
        const { data } = await axios.get(`${serie}/${id}`, {
            params: {
                api_key: apiKey,
                language: 'en-US'
            }
        })

        return data

    } catch(error) {
        console.log(error.message)
    }
}

export const fetchSerieVideos = async(id) => {
    try {
        const { data } = await axios.get(`${serie}/${id}/videos`, {
            params: {
                api_key: apiKey
            }
        })

        return data['results'][0]
    } catch(error) {
        console.log(error.message)
    }
}

export const fetchSerieCasts = async(id) => {
    try {
        const { data } = await axios.get(`${serie}/${id}/credits`, {
            params: {
                api_key: apiKey
            }
        })

        const modifiedData = data['cast'].map((cast) => ({
            id: cast['id'],
            name: cast['name'],
            character: cast['character'],
            image: imageURL + 'w200/' + cast['profile_path']
        }))

        return modifiedData
    
    } catch(error) {
        console.log(error.message)
    }
}

export const fetchAiringTodaySeries = async() => {
    try {
        const { data } = await axios.get(tvAiringToday, {
            params: {
                api_key: apiKey,
                language: 'en-US',
                page: 1
            }
        })

        const posterURL = imageURL + 'original/'

        const modifiedData = data['results'].map((serie) => ({
            id: serie['id'],
            title: serie['name'],
            overview: serie['overview'],
            popularity: serie['popularity'],
            date: serie['first_air_date'],
            liked: serie['vote_count'],
            rating: serie['vote_average'],
            poster: posterURL + serie['poster_path'],
            backPoster: posterURL + serie['backdrop_path']
        }))

        return modifiedData

    } catch(error) {
        console.log(error.message)
    }
}

export const fetchSeriesGenres = async() => {
    try {
        const { data } = await axios.get(seriesGenre, {
            params: {
                api_key: apiKey,
                language: 'en-US',
                page: 1
            }
        })

        const modifiedData = data['genres'].map((genre) => ({
            id: genre['id'],
            name: genre['name']
        }))

        return modifiedData

    } catch (error) {
        console.log(error.message)
    }
}

export const fetchSerieByGenre = async(genre_id) => {
    try {
        const { data } = await axios.get(discoverTV, {
            params: {
                api_key: apiKey,
                language: 'en-US',
                page: 1,
                with_genres: genre_id
            }
        })

        const posterURL = imageURL + 'original/'

        const modifiedData = data['results'].map((serie) => ({
            id: serie['id'],
            title: serie['name'],
            overview: serie['overview'],
            popularity: serie['popularity'],
            date: serie['first_air_date'],
            liked: serie['vote_count'],
            rating: serie['vote_average'],
            poster: posterURL + serie['poster_path'],
            backPoster: posterURL + serie['backdrop_path']
        }))

        return modifiedData

    } catch(error) {
        console.log(error.message)
    }
}

export const fetchSimilarSeries = async(id) => {
    try {
        const { data } = await axios.get(`${serie}/${id}/similar`, {
            params: {
                api_key: apiKey,
                language: 'en-US'
            }
        })

        const posterURL = imageURL + 'original/'

        const modifiedData = data['results'].map((serie) => ({
            id: serie['id'],
            title: serie['name'],
            overview: serie['overview'],
            popularity: serie['popularity'],
            date: serie['first_air_date'],
            rating: serie['vote_average'],
            liked: serie['vote_count'],
            poster: posterURL + serie['poster_path'],
            backPoster: posterURL + serie['backdrop_path']
        }))


        return modifiedData

    } catch(error) {
        console.log(error.message)
    }
}

export const fetchPopularTV = async() => {
    try {
        const { data } = await axios.get(popularTV, {
            params: {
                api_key: apiKey,
                language: 'en-US',
                page: 1
            }
        })

        const posterURL = imageURL + 'original/'

        const modifiedData = data['results'].map((serie) => ({
            id: serie['id'],
            title: serie['name'],
            overview: serie['overview'],
            popularity: serie['popularity'],
            date: serie['first_air_date'],
            liked: serie['vote_count'],
            rating: serie['vote_average'],
            poster: posterURL + serie['poster_path'],
            backPoster: posterURL + serie['backdrop_path']
        }))

        return modifiedData

    } catch(error) {
        console.log(error.message)
    }
}

export const fetchTopRatedTV = async() => {
    try {
        const { data } = await axios.get(topRatedTV, {
            params: {
                api_key: apiKey,
                language: 'en-US',
                page: 1
            }
        })

        const posterURL = imageURL + 'original/'

        const modifiedData = data['results'].map((serie) => ({
            id: serie['id'],
            title: serie['name'],
            overview: serie['overview'],
            popularity: serie['popularity'],
            date: serie['first_air_date'],
            liked: serie['vote_count'],
            rating: serie['vote_average'],
            poster: posterURL + serie['poster_path'],
            backPoster: posterURL + serie['backdrop_path']
        }))

        return modifiedData

    } catch(error) {
        console.log(error.message)
    }
}
