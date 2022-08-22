import React from 'react';
import history from '../routes/history'
import {
    unstable_HistoryRouter as HistoryRouter,
    Routes,
    Route
  } from "react-router-dom";
// import RoutePrivate from "./RoutePrivate";
// import RoutePublic from "./RoutePublic";

// Pages
import Home from './Home'
import About from './About'
import Contact from './Contact'

const AppRoutes = () => {
  return (
    <HistoryRouter history={history}>
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="about" element={<About />}/>
            <Route path="contact" element={<Contact />}/>
        </Routes>
    </HistoryRouter>
  )
}

export default AppRoutes