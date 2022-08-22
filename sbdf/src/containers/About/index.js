import React from 'react'
import { Button } from 'react-bootstrap'
import { FaBitcoin } from "react-icons/fa";


import Header from '../../components/Header';
import Footer from '../../components/Footer';
import history from '../../routes/history';

import './styles.scss'

// assets
import arrowDown from '../../assets/arrow-down.svg'
import founderImage from '../../assets/founder-img.jpg'

const About = () => {
  return (
    <>
        <Header/>
        <div className="container-fluid content-page-bg">
            <div className="row page-cover">
                <div className="cover-content d-flex justify-content-center align-items-center flex-column">
                    <h3>About Us</h3>
                    <h2>REAL PROBLEMS · REAL PEOPLE · REAL IMPACT</h2>
                    <p>You can make a lasting difference in someone's life today.</p>
                </div>
                <img className="section-arrow" src={arrowDown} alt="arrow down" />
            </div> 
            <div className="container content-section">
                <div className="row h-100">
                <div className="col-md-6">
                    <h2>Our History and Founder</h2>
                    <div className="about-founder">
                        <div className="founder-image">
                            <img src={founderImage} alt="founder" />
                        </div>
                        <div className="founder-details">
                            <p>Founded over 100 years ago, Save the Children was the first global organization devoted solely to serving children’s needs and securing their rights.</p>
                            <p>Our founder Eglantyne Jebb saw children dying of starvation and wracked with disease after the end of the First World War. So, in 1919, she launched the Save the Children Fund to raise much-needed funds to end children’s suffering across war-torn Europe.</p>
                        </div>
                    </div>
                    <p>The UN Convention on the Rights of the Child, based on our founder’s declaration, is the most universally accepted human rights treaty in history.</p> 
                    <p>Since our founding over 100 years ago, we’ve changed the lives of over one billion children.</p>
                    
                    <Button variant="success" onClick={() => history.push('/')} className="main-btn"><FaBitcoin className="SvgIcon noColor"/>Donate Now</Button>
                </div>
                <div className="col-md-6">
                    <h2>Our Mission</h2>
                    <p>Save the Children believes every child deserves a future.</p>
                    <p>In the United States and around the world, we work every day to give children a healthy start in life, the opportunity to learn and protection from harm. When crisis strikes and children are most vulnerable, we are always among the first to respond and the last to leave. We do whatever it takes for children - every day and in times of crisis – transforming their lives and the future we share.</p>
                    <h2>Our Values</h2>
                    <p>At Save the Children, we live by five Core Values:</p>
                    <ul>
                        <li>Accountability</li>
                        <li>Integrity</li>
                        <li>Ambition</li>
                        <li>Collaboration</li>
                        <li>Creativity</li>
                    </ul>
                </div>
                </div>
            </div>
        <Footer/>
        </div>
    </>
  )
}

export default About