
import React, { useRef, useState } from 'react';
import { ExternalLink, Github, Code2 } from 'lucide-react';

interface ProjectProps {
    title: string;
    description: string;
    techStack: string[];
    features: string[];
    links: {
        code: string;
        demo: string;
    };
}

const ProjectCard: React.FC<{ project: ProjectProps }> = ({ project }) => {
    const divRef = useRef<HTMLDivElement>(null);
    // const [isFocused, setIsFocused] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;

        const div = divRef.current;
        const rect = div.getBoundingClientRect();

        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleFocus = () => {
        // setIsFocused(true);
        setOpacity(1);
    };

    const handleBlur = () => {
        // setIsFocused(false);
        setOpacity(0);
    };

    const handleMouseEnter = () => {
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="group h-full bg-slate-900/50 backdrop-blur-xl rounded-2xl overflow-hidden border border-slate-800 relative z-0 transition-all duration-500 hover:border-amber-500/30 hover:scale-[1.02]"
        >
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(245, 158, 11, 0.1), transparent 40%)`,
                    opacity: opacity,
                }}
            />

            <div className="p-8 flex-grow flex flex-col relative z-10 h-full">
                <div className="flex justify-between items-start mb-8">
                    <div className="p-3 bg-slate-950 rounded-xl text-amber-500 border border-slate-800 group-hover:border-amber-500/50 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] transition-all duration-500">
                        <Code2 size={28} />
                    </div>
                    <div className="flex gap-3">
                        <a
                            href={project.links.code}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition-colors border border-transparent hover:border-slate-700"
                            title="View Code"
                        >
                            <Github size={20} />
                        </a>
                        {project.links.demo && (
                            <a
                                href={project.links.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2.5 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition-colors border border-transparent hover:border-slate-700"
                                title="View Live Demo"
                            >
                                <ExternalLink size={20} />
                            </a>
                        )}
                    </div>
                </div>

                <h3 className="text-2xl font-serif font-bold text-white mb-4 group-hover:text-amber-400 transition-colors duration-300">{project.title}</h3>
                <p className="text-slate-400 text-base mb-8 flex-grow leading-relaxed font-light">
                    {project.description}
                </p>

                <div className="mb-8">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Key Features</h4>
                    <ul className="space-y-2.5">
                        {project.features.slice(0, 3).map((feature, idx) => (
                            <li key={idx} className="flex items-center text-sm text-slate-300/80">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-3 shadow-[0_0_10px_rgba(245,158,11,0.5)]"></span>
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-slate-800/50">
                    {project.techStack.map((tech) => (
                        <span key={tech} className="px-3 py-1.5 text-xs font-medium text-amber-200/80 bg-slate-800/50 rounded-full border border-slate-700/50">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
