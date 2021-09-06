import React, { useState, useEffect } from 'react'
import ReactPlayer from 'react-player'
import ReactStars from 'react-rating-stars-component'
import { Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css'
import {
    fetchMovieDetail,
    fetchSimilarMovies,
    fetchCasts,
    fetchMovieVideos
} from '../services/ApiConfig'

export default function MovieDetail({ match }) {

    let params = match.params
    let genres = []

    const [isOpen, setIsOpen] = useState(false)
    const [detail, setDetail] = useState([])
    const [video, setVideo] = useState([])
    const [cast, setCast] = useState([])
    const [similarMovies, setSimilarMovies] = useState([])

    useEffect(() => {
        const fetchAPI = async() => {
            setDetail(await fetchMovieDetail(params.id))
            setVideo(await fetchMovieVideos(params.id))
            setCast(await fetchCasts(params.id))
            setSimilarMovies(await fetchSimilarMovies(params.id))
        }

        fetchAPI()

    }, [params.id])


    genres = detail.genres

    const MoviePlayerModal = (props) => {
        const YoutubeURL = "https://www.youtube.com/watch?v="
        return (
            <Modal {...props} size='lg' centered aria-labelledby='contained-modal-title-vcenter'>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" style={{ color: '#000', fontWeight: 'bolder' }}>
                        {detail.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#000'}}>
                    <ReactPlayer url={YoutubeURL + video.key} playing width="100%" className="container-fluid"></ReactPlayer>
                </Modal.Body>
            </Modal>
        )
    }

    let genresList
    if(genres) {
        genresList = genres.map((genre, index) => {
            return (
                <li key={index} className="list-inline-item">
                    <button type="button" className="btn btn-outline-info">
                        {genre.name}
                    </button>
                </li>
            )
        })
    }

    const castList = cast.slice(0, 4).map((actor, index) => {
        return (
            <div key={index} className="col-md-3 text-center">
                <img src={actor.image} alt={actor.name} className="img-fluid rounded-circle mx-auto d-block" />
                <p className="text-center mt-3" style={{ fontWeight: 'bold' }}>{actor.name}</p>
                <p className="text-center" style={{ color: "#5a606b", marginTop: -10 }}>{actor.character}</p>
            </div>
        )
    })

    const similarMoviesList = similarMovies.slice(0, 4).map((item, index) => {
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
                        <p>| <i className="fas fa-thumbs-up" style={{ marginLeft: 10}}></i> {item.liked}</p>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div className="container">

            <Link to="/" className="link">
                <p className="mt-3"><i className="fas fa-chevron-left" style={{ marginRight: '10px' }}></i>Back to Home</p>
            </Link>

            <div className="row mt-2">
                <MoviePlayerModal show={isOpen} onHide={() => setIsOpen(false)}></MoviePlayerModal>
                <div className="col text-center" style={{ width: '100%' }}>
                    <img src={`http://image.tmdb.org/t/p/original/${detail.backdrop_path}`} alt={detail.title} className="img-fluid" />
                    <div className="carousel-center">
                        <i onClick={() => setIsOpen(true)} className="far fa-play-circle" style={{ fontSize: 95, color: "#f4c10f", cursor: "pointer", textShadow: '2px 2px #000' }}></i>
                    </div>
                    <h1 className="carousel-caption" style={{ textAlign: "center", fontWeight: 'bold', textShadow: '2px 2px #000' }}>
                        {detail.title}
                    </h1>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col">
                    <h5 style={{ color: "#5a606b", fontWeight: "bold" }}>Genre</h5>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col">
                    <ul className="list-inline">
                        {genresList}
                    </ul>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col">
                    <div className="text-center">
                        <ReactStars count={5} size={20} color={'#f4c10f'}></ReactStars>
                    </div>
                    <div className="mt-3">
                        <p style={{ color: "#5a606b", fontWeight: "bolder" }}>Overview</p>
                        {detail.overview}
                    </div>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col-md-3">
                    <p style={{ color: "#5a606b", fontWeight: "bolder" }}>Release Date</p>
                    <p style={{ color: "#f4c10f" }}>{detail.release_date}</p>
                </div>
                <div className="col-md-3">
                    <p style={{ color: "#5a606b", fontWeight: "bolder" }}>Runtime</p>
                    <p style={{ color: "#f4c10f" }}>{detail.runtime} min</p>
                </div>
                <div className="col-md-3">
                    <p style={{ color: "#5a606b", fontWeight: "bolder" }}>Rating</p>
                    <p style={{ color: "#f4c10f" }}>{detail.vote_average} / 10</p>
                </div>
                <div className="col-md-3">
                    <p style={{ color: "#5a606b", fontWeight: "bolder" }}>Budget</p>
                    <p style={{ color: "#f4c10f" }}>${detail.budget}</p>
                </div>
            </div>

            <div className="row mt-5">
                <div className="col">
                    <h5 style={{ color: "#5a606b", fontWeight: "bold" }}>Cast</h5>
                </div>
            </div>

            <div className="row mt-3">{castList}</div>

            <div className="row mt-5">
                <div className="col">
                    <h5 style={{ color: "#5a606b", fontWeight: "bold" }}>Similar Movies</h5>
                </div>
            </div>

            <div className="row mt-3">{similarMoviesList}</div>


        </div>
    )
}