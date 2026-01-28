
import React, { useState } from 'react';
import { Menu, X, Code2, Github, Linkedin, Mail, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PERSONAL_DETAILS, SOCIAL_LINKS } from '../data/config';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    const handleLinkClick = () => {
        setIsOpen(false);
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed w-full z-50 bg-slate-950/80 backdrop-blur-xl border-b border-indigo-500/10"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo(0, 0)}>
                        <div className="p-2 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl border border-indigo-500/30 group-hover:border-amber-500/50 transition-all duration-300">
                            <Code2 className="h-6 w-6 text-indigo-400 group-hover:text-amber-400 transition-colors" />
                        </div>
                        <span className="text-white font-serif font-bold text-2xl tracking-tight group-hover:text-amber-200 transition-colors">Deepshekhar</span>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-slate-400 hover:text-amber-400 font-sans px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:tracking-wide"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="hidden md:block">
                        <div className="flex items-center space-x-4">
                            <motion.a
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                href={SOCIAL_LINKS.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-400 hover:text-white transition-colors"
                            >
                                <Github size={20} />
                            </motion.a>
                            <motion.a
                                whileHover={{ scale: 1.1, rotate: -5 }}
                                href={SOCIAL_LINKS.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-400 hover:text-white transition-colors"
                            >
                                <Linkedin size={20} />
                            </motion.a>
                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href={SOCIAL_LINKS.resume}
                                download
                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-lg transition-all duration-300 shadow-lg shadow-amber-500/20 text-sm"
                            >
                                <Download size={16} />
                                Resume
                            </motion.a>
                        </div>
                    </div>

                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
                        >
                            {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-slate-950 border-b border-indigo-500/10 overflow-hidden"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={handleLinkClick}
                                    className="text-slate-300 hover:text-amber-400 hover:bg-white/5 block px-3 py-3 rounded-md text-base font-serif font-medium transition-colors"
                                >
                                    {link.name}
                                </a>
                            ))}
                            <div className="flex space-x-6 px-3 py-5 mt-2 border-t border-indigo-500/10">
                                <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white">
                                    <Github size={24} />
                                </a>
                                <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white">
                                    <Linkedin size={24} />
                                </a>
                                <a href={`mailto:${PERSONAL_DETAILS.email}`} className="text-slate-400 hover:text-white">
                                    <Mail size={24} />
                                </a>
                            </div>
                            <a
                                href={SOCIAL_LINKS.resume}
                                download
                                onClick={handleLinkClick}
                                className="mx-3 mt-2 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold rounded-lg text-base"
                            >
                                <Download size={18} />
                                Download Resume
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
