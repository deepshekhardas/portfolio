
import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '../data/config';

const SkillCategory: React.FC<{ title: string; skills: { name: string; level: string }[], index: number }> = ({ title, skills, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="mb-10"
    >
        <h3 className="text-2xl font-serif font-semibold text-amber-50 mb-6 flex items-center gap-3">
            <span className="w-8 h-1 bg-gradient-to-r from-amber-500 to-transparent rounded-full"></span>
            {title}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {skills.map((skill, idx) => (
                <motion.div
                    key={skill.name}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="bg-slate-900/40 backdrop-blur-sm p-5 rounded-xl border border-indigo-500/10 hover:border-amber-500/30 transition-all duration-300 group hover:shadow-lg hover:shadow-amber-900/10"
                >
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-slate-200 font-medium group-hover:text-amber-100 transition-colors">{skill.name}</span>
                    </div>
                    <div className="w-full bg-slate-950 h-1.5 rounded-full mt-2 overflow-hidden border border-white/5">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{
                                width: skill.level === 'Comfortable' ? '90%' :
                                    skill.level === 'Intermediate' ? '70%' : '40%'
                            }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: 0.5 + (idx * 0.05), ease: "easeOut" }}
                            className={`h-full rounded-full ${skill.level === 'Comfortable' ? 'bg-gradient-to-r from-amber-400 to-amber-600' :
                                    skill.level === 'Intermediate' ? 'bg-gradient-to-r from-indigo-400 to-purple-500' :
                                        'bg-slate-600'
                                }`}
                        ></motion.div>
                    </div>
                </motion.div>
            ))}
        </div>
    </motion.div>
);

const Skills: React.FC = () => {
    return (
        <section id="skills" className="py-24 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-bold font-serif text-white mb-6">Technical Stack</h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-500 mx-auto rounded-full"></div>
                    <p className="text-slate-400 mt-8 max-w-2xl mx-auto text-lg font-light">
                        My arsenal of tools and technologies for building high-quality software.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                    <div>
                        <SkillCategory title="Backend & Architecture" skills={SKILLS.backend} index={0} />
                        <SkillCategory title="Databases" skills={SKILLS.database} index={1} />
                    </div>
                    <div>
                        <SkillCategory title="Frontend Development" skills={SKILLS.frontend} index={2} />
                        <SkillCategory title="Tools & DevOps" skills={SKILLS.tools} index={3} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
