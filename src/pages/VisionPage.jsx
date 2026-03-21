import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Heart, Sparkles, Target, Users } from 'lucide-react';
import './VisionPage.css';

const VisionPage = () => {
    const navigate = useNavigate();

    return (
        <div className="vision-page">
            {/* Hero Section */}
            <header className="vision-hero">
                <div className="container hero-content text-center">
                    <span className="vision-badge">OUR PURPOSE</span>
                    <h1 className="brand-font display-1">The Story of Apna Swad</h1>
                    <p className="lead-text">From a Simple Curiosity to a Nationwide Mission</p>
                </div>
            </header>

            {/* Section 1: A Dream Takes Root */}
            <section className="vision-section section container">
                <div className="vision-grid">
                    <div className="vision-text-block fade-in-left">
                        <div className="section-intro">
                            <Target className="vision-icon" />
                            <h2 className="brand-font">A Dream Takes Root</h2>
                        </div>
                        <p>
                            Apna Swad isn’t just about snacks—it’s about a vision to transform India’s relationship with its traditional foods. 
                            At the heart of this vision was a 16-year-old dreamer, <strong>Jayanta</strong>, who believed that every young Indian should 
                            dare to dream big and create their own legacy.
                        </p>
                        <p>
                            He wasn’t backed by wealth or investors—what he had was curiosity, love for food, and the courage to solve a problem many ignored. 
                            He wanted to prove that passion and purpose are the most powerful fuels for innovation.
                        </p>
                    </div>
                    <div className="vision-image-block fade-in-right">
                        <div className="premium-frame">
                            <img src="/images/vision_founder.png" alt="Young founder dreaming" className="vision-img" />
                            <div className="vision-caption">A young founder dreaming big</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2: The Spark of Curiosity */}
            <section className="vision-section alternate bg-soft section">
                <div className="container">
                    <div className="vision-grid reverse">
                        <div className="vision-text-block fade-in-right">
                            <div className="section-intro">
                                <Sparkles className="vision-icon" />
                                <h2 className="brand-font">The Spark of Curiosity</h2>
                            </div>
                            <p>
                                One day, Jayanta saw a child eating thekua at a street stall. Curious, he asked his father: 
                                <em>“Papa, yeh kya hai? Mujhe bhi chahiye.”</em> His father warned him: <em>“Beta, yeh hygienic nahin hota, khaya toh tabiyat kharab ho jaayegi.”</em>
                            </p>
                            <p>
                                Like any stubborn child, Jayanta insisted until his father gave in. The next day, he fell sick—just as his father had predicted. 
                                That illness was a turning point. It made Jayanta realize how dangerous unhygienic food could be, and how badly India needed clean, safe traditional snacks.
                            </p>
                        </div>
                        <div className="vision-image-block fade-in-left">
                            <div className="premium-frame">
                                <img src="/images/vision_street.png" alt="Street snack moment" className="vision-img" />
                                <div className="vision-caption">The catalyst for change</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 3: A Widespread Problem */}
            <section className="vision-section section container">
                <div className="vision-grid">
                    <div className="vision-text-block fade-in-left">
                        <div className="section-intro">
                            <Users className="vision-icon" />
                            <h2 className="brand-font">A Widespread Problem</h2>
                        </div>
                        <p>
                            A year later, during Chhath Puja, Jayanta’s best friend and co-founder <strong>Kailash</strong> offered him a purchased packet of thekua. 
                            The taste was heavenly—but the price was too high, and it was available only during the festival.
                        </p>
                        <p>
                            Soon, they noticed the same issues with other favorites like besan laddoo, makhana, banana chips. These snacks were unhygienic on the streets, 
                            overpriced in shops, or limited to specific states and seasons. Together, Jayanta and Kailash realized this wasn’t just one problem—it was 
                            a nationwide challenge that needed a solution.
                        </p>
                    </div>
                    <div className="vision-image-block fade-in-right">
                        <div className="premium-frame">
                            <img src="/images/vision_festival.png" alt="Festival food sharing" className="vision-img" />
                            <div className="vision-caption">Sharing traditions with Kailash</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 4: The Birth of a Movement */}
            <section className="vision-section alternate bg-brand section">
                <div className="container">
                    <div className="vision-grid reverse">
                        <div className="vision-text-block fade-in-right light-text">
                            <div className="section-intro">
                                <Heart className="vision-icon light" />
                                <h2 className="brand-font">The Birth of a Movement</h2>
                            </div>
                            <p>
                                That’s how Apna Swad was born—not in a corporate office, but through conversations between two friends. They chose 
                                <strong> Instagram</strong> as their launchpad—not just a platform, but a community of over 500 million Indians.
                            </p>
                            <p>
                                Their vision was clear: deliver premium quality, hygienic snacks at fair prices, available all year, across India. 
                                Apna Swad became more than a brand—it became a movement to bring back India’s traditional flavors in a modern, healthy way.
                            </p>
                        </div>
                        <div className="vision-image-block fade-in-left">
                            <div className="premium-frame border-light">
                                <img src="/images/vision_products.png" alt="Apna Swad Products" className="vision-img" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="vision-cta section container text-center">
                <h2 className="brand-font display-4">Join Our Journey</h2>
                <p className="cta-text max-width-centered">
                    Apna Swad is more than a brand—it is a movement to empower young India to dream big. 
                    This journey is fueled by your love and support. Together, let’s bring back the joy of traditional snacks—safe, hygienic, affordable, and available anytime, anywhere.
                </p>
                <div className="cta-buttons">
                    <button onClick={() => navigate('/#shop')} className="btn btn-primary luxury-btn">
                        Explore Our Snacks <ArrowRight size={20} />
                    </button>
                    <button onClick={() => navigate('/#shop')} className="btn btn-outline luxury-btn-outline">
                        Experience the Taste
                    </button>
                </div>
            </section>
        </div>
    );
};

export default VisionPage;
