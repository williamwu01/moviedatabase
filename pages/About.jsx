import { useEffect } from 'react';
import { appTitles } from '../globals/globals';
import '../styles/about.css';
import Tmdblogo from '../components/Tmdblogo';
import { Link } from 'react-router-dom';

const PageAbout = () => {

    useEffect(() => {
        document.title = `About`;
    }, []);

    return (
        <main className='aboutsec'>
            <section>
                <h1 className='heading'>About Page</h1>
								<div className='about-us-bg'>
									<div className='about-img-container'>
										<img className="about-us-bg-img" src="../src/assets/aboutusimage.jpg" alt="" />
									</div>
								</div>
                <article>
                    <p>Welcome to Movie Data Base, where cinephiles and casual viewers alike can immerse themselves in a vast cinematic universe. Our platform is dedicated to celebrating the art of filmmaking and the magic of storytelling that captivates audiences worldwide. With a meticulously curated collection of movies spanning various genres, eras, and cultures, we aim to provide a comprehensive and enriching experience for movie enthusiasts of all tastes and backgrounds. Whether you're seeking classic masterpieces that have stood the test of time, the latest blockbusters that ignite the silver screen, or hidden gems waiting to be discovered, our database offers something for everyone. Beyond merely cataloging films, we strive to foster a sense of community among our users, encouraging lively discussions, sharing recommendations, and fostering a deeper appreciation for the cinematic arts. Our mission is to serve as a trusted companion on your cinematic journey, guiding you through the vast landscape of movies while sparking inspiration, igniting passions, and creating memorable moments along the way. Join us in exploring the magic of cinema, where every frame tells a story and every viewing experience is an adventure waiting to unfold.</p>
                </article>
                <article className='tmdb-container'>
								<h1><Link to="https://www.themoviedb.org/"><Tmdblogo /></Link></h1>
								<p>This product uses the TMDb API but is not endorsed or certified by TMDb.</p>
                </article>
            </section>
        </main>
    );
    
};

export default PageAbout;