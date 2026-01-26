import { useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import OSSContributions from '../components/OSSContributions';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ThreeBackground from '../components/ThreeBackground';
import ChatBot from '../components/ChatBot';
import 'lenis/dist/lenis.css';

const Home = () => {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            touchMultiplier: 2,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Handle anchor links with Event Delegation (for dynamic mobile menu)
        const handleAnchorClick = (e: MouseEvent) => {
            const target = (e.target as HTMLElement).closest('a');
            if (!target) return;

            const href = target.getAttribute('href');
            if (href && href.startsWith('#') && href !== ('#')) {
                e.preventDefault();
                const targetEl = document.querySelector(href) as HTMLElement;
                if (targetEl) {
                    lenis.scrollTo(targetEl);
                }
            }
        };

        document.addEventListener('click', handleAnchorClick);

        return () => {
            lenis.destroy();
            document.removeEventListener('click', handleAnchorClick);
        };
    }, []);

    return (
        <div className="bg-slate-950 min-h-screen relative text-slate-100 selection:bg-amber-500/30 selection:text-amber-100 font-sans">
            <ThreeBackground />
            <ChatBot />
            <Navbar />
            <main className="relative z-10">
                <Hero />
                <About />
                <Skills />
                <Projects />
                <OSSContributions />
                <Contact />
            </main>
            <Footer />
        </div>
    );
};

export default Home;
