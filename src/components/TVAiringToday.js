import React, { useState, useEffect } from 'react'
import { fetchAiringTodaySeries } from '../services/ApiConfig'
import { Link } from 'react-router-dom'

export default function NowPlaying() {

    const [airingToday, setAiringToday] = useState([])

    useEffect(() => {
        const fetchAPI = async() => {
            setAiringToday(await fetchAiringTodaySeries())
        }

        fetchAPI()

    }, [])

    const airingTodayList = airingToday.map((item, index) => {
        return (
            <div key={index} className="col-md-3">
                <div className="card">
                    <Link to={`/tv/${item.id}`}>
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

    return (
        <div className="container">

            <Link to="/" className="link">
                <p className="mt-3"><i className="fas fa-chevron-left" style={{ marginRight: '10px' }}></i>Back to Home</p>
            </Link>

            <div className="row mt-5">
                <div className="col">
                    <h2 style={{ fontWeight: 'bold' }}>Airing Today</h2>
                    <hr className="col-md-3 col-sm-6" style={{ color: 'white', height: '3px' }} /> 
                </div>
            </div>

            <div className="row mt-5">{airingTodayList}</div>
        </div>
    )
}