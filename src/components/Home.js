import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import RBCarousel from 'react-bootstrap-carousel'
import './Main.css'

import {
    fetchMovies,
    fetchGenre,
    fetchMovieByGenre,
    fetchPeople,
    fetchTopRated,
    fetchComingSoon,
    fetchAiringTodaySeries,
    fetchSeriesGenres,
    fetchSerieByGenre,
    fetchPopularTV,
    fetchTopRatedTV,
} from '../services/ApiConfig'

export default function Home() {

    const [nowPlaying, setNowPlaying] = useState([])
    const [genres, setGenres] = useState([])
    const [movieByGenre, setMovieByGenre] = useState([])
    const [people, setPeople] = useState([])
    const [topRated, setTopRated] = useState([])
    const [comingSoon, setComingSoon] = useState([])
    const [airingToday, setAiringToday] = useState([])
    const [seriesGenres, setSeriesGenres] = useState([])
    const [serieByGenre, setSerieByGenre] = useState([])
    const [popularTV, setPopularTV] = useState([])
    const [topRatedTV, setTopRatedTV] = useState([])

    useEffect(() => {
        const fetchAPI = async() => {
            setNowPlaying(await fetchMovies())
            setGenres(await fetchGenre())
            setMovieByGenre(await fetchMovieByGenre())
            setPeople(await fetchPeople())
            setTopRated(await fetchTopRated())
            setComingSoon(await fetchComingSoon())
            setAiringToday(await fetchAiringTodaySeries())
            setSeriesGenres(await fetchSeriesGenres())
            setSerieByGenre(await fetchSerieByGenre())
            setPopularTV(await fetchPopularTV())
            setTopRatedTV(await fetchTopRatedTV())
        }

        fetchAPI()

    }, [])

    const handleGenreClick = async(genre_id) => {
        setMovieByGenre(await fetchMovieByGenre(genre_id))
    }

    const movies = nowPlaying.slice(0, 10).map((item, index) => {
        return (
            <div className="row">
                <div className="col-md-12" style={{ width: '100%', height: 500 }} key={index}>
                    <div className='carousel-center'>
                        <img src={item.backPoster} alt={item.title} style={{ height: 600 }} />
                    </div>
                    <div className="carousel-center">
                        <i className="far fa-play-circle" style={{ fontSize: 95, color: "#f4c10f", textShadow: '2px 2px #000'}}></i>
                    </div>
                    <h1 className='carousel-caption' style={{ textAlign: 'center', fontWeight: 'bold', textShadow: '2px 2px #000' }}>
                        {item.title}
                    </h1>
                </div>
            </div>
            
        )
    })

    const genreList = genres.map((item, index) => {
        return (
            <li key={index} className="list-inline-item m-2">
                <button type="button" onClick={() => handleGenreClick(item.id)} className="btn btn-outline-info">
                    {item.name}
                </button>
            </li>
        )
    })

    const movieList = movieByGenre.slice(0, 4).map((item, index) => {
        return (
            <div key={index} className="col-md-3 col-sm-6">
                <div className="card">
                    <Link to={`/movie/${item.id}`}>
                        <img src={item.poster} alt={item.title} className="img-fluid" />
                    </Link>
                </div>
                <div className="mt-3">
                    <p style={{ fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</p>
                    <p style={{ color: "#5a606b", marginTop: -10 }}>{item.date}</p>
                    <div className="d-flex">
                        <p style={{ marginRight: 10}}><i className="fas fa-star" style={{ color: '#f4c10f'}}></i> {item.rating}</p>
                        <p>| <i className="fas fa-thumbs-up" style={{ marginLeft: 10 }}></i> {item.liked}</p>
                    </div>
                </div>
            </div>
        )
    })

    const trendingPeople = people.slice(0, 4).map((person, index) =>{
        return (
            <div key={index} className="col-md-3 text-center">
                <img src={person.profile_img} alt={person.name} className="img-fluid rounded-circle mx-auto d-block" />
                <p className="text-center mt-3" style={{ fontWeight: 'bold' }}>{person.name}</p>
                <p className="text-center" style={{ color: "#5a606b", marginTop: -10 }}>{person.known}</p>
            </div>
        )
    })

    const topRatedList = topRated.slice(0, 4).map((item, index) => {
        return (
            <div key={index} className="col-md-3">
                <div className="card">
                    <Link to={`/movie/${item.id}`}>
                        <img src={item.poster} alt={item.title} className="img-fluid" />
                    </Link>
                </div>
                <div className='mt-3'>
                    <p style={{ fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</p>
                    <p style={{ color: "#5a606b", marginTop: -10 }}>{item.date}</p>
                    <div className="d-flex">
                        <p style={{ marginRight: 10}}><i className="fas fa-star" style={{ color: '#f4c10f'}}></i> {item.rating}</p>
                        <p>| <i className="fas fa-thumbs-up" style={{ marginLeft: 10}}></i> {item.liked}</p>
                    </div>
                </div>
            </div>
        )
    })

    const comingSoonList = comingSoon.slice(0, 4).map((item, index) => {
        return (
            <div key={index} className="col-md-3">
                <div className="card">
                    <Link to={`/movie/${item.id}`}>
                        <img src={item.poster} alt={item.title} className="img-fluid" />
                    </Link>
                </div>
                <div className='mt-3'>
                    <p style={{ fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</p>
                    <p style={{ color: "#5a606b", marginTop: -10 }}>{item.date}</p>
                    <div className="d-flex">
                        <p style={{ marginRight: 10}}><i className="fas fa-star" style={{ color: '#f4c10f'}}></i> {item.rating}</p>
                        <p>| <i className="fas fa-thumbs-up" style={{ marginLeft: 10}}></i> {item.liked}</p>
                    </div>
                </div>
            </div>
        )
    })

    const handleSeriesGenreClick = async(genre_id) => {
        setSerieByGenre(await fetchSerieByGenre(genre_id))
    }

    const series = airingToday.slice(0, 10).map((item, index) => {
        return (
            <div style={{ width: '100%', height: 500 }} key={index}>
                <div className='carousel-center'>
                    <img src={item.backPoster} alt={item.title} style={{ height: 600 }} />
                </div>
                <div className="carousel-center">
                    <i className="far fa-play-circle" style={{ fontSize: 95, color: "#f4c10f", textShadow: '2px 2px #000'}}></i>
                </div>
                <h1 className='carousel-caption' style={{ textAlign: 'center', fontWeight: 'bold', textShadow: '2px 2px #000' }}>
                    {item.title}
                </h1>
            </div>
        )
    })

    const seriesGenreList = seriesGenres.map((item, index) => {
        return (
            <li key={index} className="list-inline-item m-2">
                <button type="button" onClick={() => handleSeriesGenreClick(item.id)} className="btn btn-outline-info">
                    {item.name}
                </button>
            </li>
        )
    })

    const serieList = serieByGenre.slice(0, 4).map((item, index) => {
        return (
            <div key={index} className="col-md-3 col-sm-6">
                <div className="card">
                    <Link to={`/tv/${item.id}`}>
                        <img src={item.poster} alt={item.title} className="img-fluid" />
                    </Link>
                </div>
                <div className="mt-3">
                    <p style={{ fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</p>
                    <p style={{ color: "#5a606b", marginTop: -10 }}>{item.date}</p>
                    <div className="d-flex">
                        <p style={{ marginRight: 10}}><i className="fas fa-star" style={{ color: '#f4c10f'}}></i> {item.rating}</p>
                        <p>| <i className="fas fa-thumbs-up" style={{ marginLeft: 10 }}></i> {item.liked}</p>
                    </div>
                </div>
            </div>
        )
    })

    const popularTVList = popularTV.slice(0, 4).map((item, index) => {
        return (
            <div key={index} className="col-md-3">
                <div className="card">
                    <Link to={`/tv/${item.id}`}>
                        <img src={item.poster} alt={item.title} className="img-fluid" />
                    </Link>
                </div>
                <div className="mt-3">
                    <p style={{ fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</p>
                    <p style={{ color: "#5a606b", marginTop: -10 }}>{item.date}</p>
                    <div className="d-flex">
                        <p style={{ marginRight: 10}}><i className="fas fa-star" style={{ color: '#f4c10f'}}></i> {item.rating}</p>
                        <p>| <i className="fas fa-thumbs-up" style={{ marginLeft: 10}}></i> {item.liked}</p>
                    </div>
                </div>
            </div>
        )
    })

    const topRatedTVList = topRatedTV.slice(0, 4).map((item, index) => {
        return (
            <div key={index} className="col-md-3">
                <div className="card">
                    <Link to={`/tv/${item.id}`}>
                        <img src={item.poster} alt={item.title} className="img-fluid" />
                    </Link>
                </div>
                <div className="mt-3">
                    <p style={{ fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</p>
                    <p style={{ color: "#5a606b", marginTop: -10 }}>{item.date}</p>
                    <div className="d-flex">
                        <p style={{ marginRight: 10}}><i className="fas fa-star" style={{ color: '#f4c10f'}}></i> {item.rating}</p>
                        <p>| <i className="fas fa-thumbs-up" style={{ marginLeft: 10}}></i> {item.liked}</p>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div className="container">

            <div className="mt-3" style={{ marginBottom: '40px'}}>
                <h2 style={{ fontWeight: 'bold' }}>Movies</h2>
                <hr className="col-md-3 col-sm-6" style={{ height: '3px' }} />
            </div>            
            
            <div className="row mt-2">
                <div className="col">
                    <RBCarousel
                        autoplay={true}
                        pauseOnVisibility={true}
                        slideshowSpeed={5000}
                        version={4}
                        >
                        {movies}
                    </RBCarousel>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col">
                    <ul className="list-inline">
                        {genreList}
                    </ul>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col">
                    <div className="d-flex justify-content-end">
                        <Link to="/now-playing">
                            <i className="far fa-arrow-alt-circle-right arrow"></i>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="row mt-5">{movieList}</div>

            <div className="row mt-5">
                <div className="col">
                    <h5 style={{ color: "#5a606b", fontWeight: 'bold' }}>Trending Actors</h5>
                </div>
            </div>

            <div className="row mt-5">{trendingPeople}</div>

            <div className="row mt-5">
                <div className="col">
                    <h5 style={{ color: "#5a606b", fontWeight: 'bold' }}>Top Rated</h5>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col">
                    <div className="d-flex justify-content-end">
                        <Link to="/top-rated">
                            <i className="far fa-arrow-alt-circle-right arrow"></i>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="row mt-3">{topRatedList}</div>

            <div className="row mt-5">
                <div className="col">
                    <h5 style={{ color: "#5a606b", fontWeight: 'bold' }}>Coming Soon</h5>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col">
                <div className="d-flex justify-content-end">
                        <Link to="/coming-soon">
                            <i className="far fa-arrow-alt-circle-right arrow"></i>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="row mt-3">{comingSoonList}</div>

            <div className="mt-5">
                <h2 style={{ fontWeight: 'bold' }}>Series</h2>
                <hr className="col-md-3 col-sm-6" style={{ height: '3px' }} />
            </div>
                
            <div className="row mt-5">
                <div className="col">
                    <RBCarousel
                        autoplay={true}
                        pauseOnVisibility={true}
                        slideshowSpeed={5000}
                        version={4}
                        >
                        {series}
                    </RBCarousel>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col">
                    <ul className="list-inline">
                        {seriesGenreList}
                    </ul>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col">
                    <div className="d-flex justify-content-end">
                        <Link to="/airing-today">
                            <i className="far fa-arrow-alt-circle-right arrow"></i>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="row mt-5">{serieList}</div>

            <div className="row mt-5">
                <div className="col">
                    <h5 style={{ color: "#5a606b", fontWeight: 'bold' }}>Popular Series</h5>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col">
                    <div className="d-flex justify-content-end">
                        <Link to="/popular-series">
                            <i className="far fa-arrow-alt-circle-right arrow"></i>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="row mt-3">{popularTVList}</div>

            <div className="row mt-5">
                <div className="col">
                    <h5 style={{ color: "#5a606b", fontWeight: 'bold' }}>Top Rated Series</h5>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col">
                    <div className="d-flex justify-content-end">
                        <Link to="/top-rated-series">
                            <i className="far fa-arrow-alt-circle-right arrow"></i>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="row mt-3">{topRatedTVList}</div>
        </div>
    )
}