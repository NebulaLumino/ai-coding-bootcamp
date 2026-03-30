'use client';

import { useState } from 'react';

export default function CodingBootcampPage() {
  const [language, setLanguage] = useState('JavaScript');
  const [track, setTrack] = useState('Full-Stack Web Development');
  const [duration, setDuration] = useState('12 weeks');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  async function generate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setOutput('');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            {
              role: 'user',
              content: `You are an expert coding bootcamp instructor and curriculum designer. Generate a comprehensive bootcamp curriculum.

**Programming Language:** ${language}
**Career Track:** ${track}
**Duration:** ${duration}

Generate a week-by-week bootcamp curriculum including:

## Coding Bootcamp: ${language} — ${track}

### Program Overview
- Total Duration: ${duration}
- Prerequisites
- Learning Outcomes (5-7 measurable outcomes)
- Required Tools and Environment Setup

### Week-by-Week Curriculum
**Week 1:** [Focus Area]
- Topics: [list]
- Daily Exercises: [3 exercises]
- Mini Project: [project name]
[Repeat for all weeks]

### Daily Structure Template
- Morning: [Concept lecture/video]
- Afternoon: [Lab exercises]
- Evening: [Code review + challenge]

### Project Portfolio
List 5-8 substantial projects the student will build, from simple to complex.

### Assessment Criteria
- Weekly coding challenges (30%)
- Project submissions (50%)
- Final exam (20%)

### Resources
- Official documentation links
- Supplementary learning materials
- Practice platforms (LeetCode, freeCodeCamp, etc.)

### Career Preparation
- Portfolio building guide
- Interview prep milestones
- Networking and job search tips

Format everything in clean markdown.`
            }
          ],
          max_tokens: 3000,
          temperature: 0.7,
        }),
      });
      const data = await res.json();
      setOutput(data.content || data.error || 'Generation failed.');
    } catch (err: unknown) {
      setOutput('Error: ' + String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="inline-block text-5xl mb-4">💻</div>
          <h1 className="text-4xl font-bold text-cyan-400 mb-2">Coding Bootcamp Curriculum</h1>
          <p className="text-gray-400">Generate a comprehensive bootcamp curriculum with daily exercises</p>
        </div>

        <form onSubmit={generate} className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Programming Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/60 focus:border-cyan-500 transition"
              >
                {['JavaScript', 'Python', 'TypeScript', 'Java', 'C#', 'Go', 'Rust', 'Swift', 'Kotlin', 'Ruby'].map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Career Track</label>
              <select
                value={track}
                onChange={(e) => setTrack(e.target.value)}
                className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/60 focus:border-cyan-500 transition"
              >
                <option value="Full-Stack Web Development">Full-Stack Web Dev</option>
                <option value="Frontend Development">Frontend Development</option>
                <option value="Backend Development">Backend Development</option>
                <option value="Data Science">Data Science</option>
                <option value="Mobile Development">Mobile Development</option>
                <option value="DevOps & Cloud">DevOps & Cloud</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Bootcamp Duration</label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/60 focus:border-cyan-500 transition"
            >
              <option value="8 weeks">8 weeks</option>
              <option value="12 weeks">12 weeks</option>
              <option value="16 weeks">16 weeks</option>
              <option value="24 weeks">24 weeks</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-600 hover:bg-cyan-500 disabled:bg-cyan-800 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl transition duration-200"
          >
            {loading ? 'Generating Curriculum...' : 'Generate Bootcamp Curriculum'}
          </button>
        </form>

        {output && (
          <div className="mt-8 bg-gray-900/60 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-cyan-400 mb-4">Bootcamp Curriculum</h2>
            <pre className="whitespace-pre-wrap text-gray-300 text-sm font-mono leading-relaxed bg-gray-950/50 rounded-xl p-4 overflow-x-auto">{output}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
