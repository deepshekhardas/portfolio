
import React from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { PERSONAL_DETAILS } from '../data/config';

const Hero: React.FC = () => {
    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-amber-600/10 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="inline-block mb-6 px-6 py-2 rounded-full bg-slate-800/40 border border-slate-700/50 backdrop-blur-md shadow-lg"
                >
                    <span className="text-amber-400 font-medium text-sm tracking-widest uppercase">Available for Freelance Projects</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-6xl md:text-8xl lg:text-9xl font-bold font-serif text-white mb-6 tracking-tight leading-tight"
                >
                    Hi, I'm <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-amber-200 animate-gradient-x">
                        {PERSONAL_DETAILS.name.split(' ')[0]}
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="text-2xl md:text-4xl text-slate-300 font-light mb-8 max-w-3xl font-sans"
                >
                    {PERSONAL_DETAILS.role} <span className="text-slate-600 mx-4">|</span> <span className="text-amber-400 font-medium">{PERSONAL_DETAILS.focus}</span>
                </motion.p>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                    className="text-slate-400 text-lg md:text-xl mb-12 max-w-2xl leading-relaxed font-light"
                >
                    Crafting robust, scalable backend systems and immersive web experiences.
                    Disciplined engineering meets premium design.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row gap-6"
                >
                    <a
                        href="#projects"
                        className="group relative px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-lg rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_40px_rgba(245,158,11,0.6)] flex items-center justify-center gap-2 overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            View Projects
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                    </a>

                    <a
                        href="#contact"
                        className="px-8 py-4 bg-slate-900/50 hover:bg-slate-800 text-white font-bold text-lg rounded-full transition-all duration-300 border border-slate-700 hover:border-amber-500/50 backdrop-blur-md flex items-center justify-center gap-2"
                    >
                        Contact Me
                        <Mail size={20} />
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
