import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { ArrowLeft, PlayCircle } from 'lucide-react';

const CASE_STUDIES = [
  {
    company: 'Spotify',
    title: 'The Discover Weekly Launch',
    difficulty: 'Intermediate',
    description: 'How would you measure the success of a new algorithmic playlist? Work through the exact metrics and risks they faced before launch.',
  },
  {
    company: 'Airbnb',
    title: 'Post-Pandemic Pivot',
    difficulty: 'Advanced',
    description: 'Travel stopped overnight. Walk through how you would prioritize features for a local-first travel experience under extreme pressure.',
  },
  {
    company: 'Slack',
    title: 'Introducing Threads',
    difficulty: 'Beginner',
    description: 'How do you structure user research and JTBD mapping for a feature that fundamentally changes how people read messages?',
  }
];

export function CaseStudiesList({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
       <Button variant="ghost" onClick={onBack} className="mb-2 -ml-4">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
        </Button>
        
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Case Study Sandbox</h1>
          <p className="text-slate-400">Step into the shoes of PMs at top tech companies. These scenarios test your ability to apply frameworks practically.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {CASE_STUDIES.map((study) => (
            <Card key={study.title} className="flex flex-col group hover:border-cyan-500/50 transition-colors cursor-pointer relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                    {study.company}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">{study.difficulty}</span>
                </div>
                
                <CardTitle className="text-lg text-white">
                  {study.title}
                </CardTitle>
                <CardDescription className="text-sm mt-2 text-slate-400 line-clamp-3">
                  {study.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                 <Button variant="secondary" className="w-full mt-4 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                    Start Case Study <PlayCircle className="w-4 h-4 ml-2" />
                 </Button>
              </CardContent>
            </Card>
          ))}
        </div>
    </div>
  );
}
