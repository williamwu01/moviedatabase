import { useEffect } from 'react';
import { appTitles } from '../globals/globals';
import '../styles/about.css';

const PageAbout = () => {

    useEffect(() => {
        document.title = `${appTitles} - About`;
    }, []);

    return (
        <main className='aboutsec'>
            <section>
                <h2>About Page</h2>
								{/* <div className='about-us-bg'>
									<div>
										<img className="about-us-bg-img" src="../src/assets/aboutusimage.jpg" alt="" />
									</div>
								</div> */}
                <article>
                    <h2>Article 01</h2>
                    <p>https://www.themoviedb.org/about/logos-attribution Welcome to Movie Data Base, where cinephiles and casual viewers alike can immerse themselves in a vast cinematic universe. Our platform is dedicated to celebrating the art of filmmaking and the magic of storytelling that captivates audiences worldwide. With a meticulously curated collection of movies spanning various genres, eras, and cultures, we aim to provide a comprehensive and enriching experience for movie enthusiasts of all tastes and backgrounds. Whether you're seeking classic masterpieces that have stood the test of time, the latest blockbusters that ignite the silver screen, or hidden gems waiting to be discovered, our database offers something for everyone. Beyond merely cataloging films, we strive to foster a sense of community among our users, encouraging lively discussions, sharing recommendations, and fostering a deeper appreciation for the cinematic arts. Our mission is to serve as a trusted companion on your cinematic journey, guiding you through the vast landscape of movies while sparking inspiration, igniting passions, and creating memorable moments along the way. Join us in exploring the magic of cinema, where every frame tells a story and every viewing experience is an adventure waiting to unfold.</p>
                </article>
                <article>
                    <h2>Article 02</h2>
                    <p>Accusamus tempora assumenda laborum aliquam totam, perferendis optio delectus porro molestias odio, nostrum quidem maiores, illo impedit quod dignissimos ut eligendi. Veritatis quis ea est nisi ad accusamus et ullam.</p>
                </article>
            </section>
        </main>
    );
    
};

export default PageAbout;