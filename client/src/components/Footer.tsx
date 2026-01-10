
import React from 'react';
import { Github, Linkedin } from 'lucide-react';
import { PERSONAL_DETAILS, SOCIAL_LINKS } from '../data/config';

const Footer: React.FC = () => {
    return (
        <footer className="bg-slate-900 border-t border-slate-800 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <span className="text-xl font-bold text-white tracking-wider">Deepshekhar</span>
                        <p className="text-slate-400 text-sm mt-1">{PERSONAL_DETAILS.tagline}</p>
                    </div>

                    <div className="flex flex-col items-center md:items-end">
                        <div className="flex space-x-6 mb-4">
                            <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-sky-400 transition-colors">
                                <Github size={20} />
                            </a>
                            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-sky-400 transition-colors">
                                <Linkedin size={20} />
                            </a>
                            {/* Optional: Add more social links here */}
                        </div>
                        <p className="text-slate-500 text-sm">
                            &copy; {new Date().getFullYear()} {PERSONAL_DETAILS.name}. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
