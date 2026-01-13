import { describe, it, expect } from 'vitest';
import { PERSONAL_DETAILS, SKILLS, PROJECTS } from './data/config';

describe('Config Data', () => {
    it('has valid personal details', () => {
        expect(PERSONAL_DETAILS.name).toBe('Deepshekhar Das');
        expect(PERSONAL_DETAILS.role).toBe('Full Stack Developer');
    });

    it('has skills defined', () => {
        expect(SKILLS.frontend.length).toBeGreaterThan(0);
        expect(SKILLS.backend.length).toBeGreaterThan(0);
    });

    it('has projects defined', () => {
        expect(PROJECTS.length).toBe(4);
    });
});
