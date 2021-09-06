import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './components/Home'
import MovieDetail from './components/MovieDetail'
import SerieDetail from './components/SerieDetail'
import NowPlaying from './components/NowPlaying'
import TopRated from './components/TopRated'
import ComingSoon from './components/ComingSoon'
import TVAiringToday from './components/TVAiringToday'
import PopularTV from './components/PopularTV'
import TopRatedTV from './components/TopRatedTV'

export default function App() {
  return (
    <main>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route path="/movie/:id" component={ MovieDetail } />
          <Route path="/tv/:id" component={ SerieDetail } />
          <Route path="/now-playing" component={ NowPlaying } />
          <Route path="/top-rated" component={ TopRated } />
          <Route path="/coming-soon" component={ ComingSoon } />
          <Route path="/airing-today" component={ TVAiringToday } />
          <Route path="/popular-series" component={ PopularTV } />
          <Route path="/top-rated-series" component={ TopRatedTV } />
        </Switch>
    </main>
  )
}