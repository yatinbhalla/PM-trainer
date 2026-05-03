import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { ArrowLeft, BookOpen } from 'lucide-react';

const FRAMEWORKS = [
  {
    name: 'RICE',
    category: 'Prioritization',
    description: 'Reach, Impact, Confidence, and Effort. A classic scoring system for feature prioritization.',
    steps: ['Reach: How many users will this affect?', 'Impact: How much does it affect them? (3=massive, 0.25=minimal)', 'Confidence: How sure are we? (100%=high, 50%=low)', 'Effort: How many person-months will this take?']
  },
  {
    name: 'HEART',
    category: 'Metrics',
    description: 'Happiness, Engagement, Adoption, Retention, Task Success. Google\'s framework for measuring user experience quality.',
    steps: ['Happiness: User satisfaction levels (surveys, NPS)', 'Engagement: Frequency and depth of usage', 'Adoption: New users starting to use the feature', 'Retention: Users returning to the feature over time', 'Task Success: Efficiency, effectiveness, and error rate']
  },
  {
    name: 'Jobs-to-be-Done (JTBD)',
    category: 'User Research',
    description: 'Focuses on the "job" a user is hiring a product to do, rather than demographics or feature lists.',
    steps: ['Identify the core job (e.g. "I want to get a hole in the wall", not "I want a drill")', 'Understand the emotional and social components', 'Identify current workarounds', 'Find the pain points in the current workflow']
  },
  {
    name: 'MoSCoW',
    category: 'Execution / Scoping',
    description: 'Must have, Should have, Could have, Won\'t have. Great for strict time-boxed release planning.',
    steps: ['Must: Non-negotiable, product fails without it', 'Should: Important but not vital, might need a workaround', 'Could: Nice to have, if time permits', 'Won\'t: Explicitly excluded from this scope']
  }
];

export function FrameworksList({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
       <Button variant="ghost" onClick={onBack} className="mb-2 -ml-4">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
        </Button>
        
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">PM Frameworks Library</h1>
          <p className="text-slate-400">The core mental models used by top Product Managers. Mastery comes from knowing when to use which.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {FRAMEWORKS.map((fw) => (
            <Card key={fw.name} className="flex flex-col">
              <CardHeader>
                <div className="inline-flex items-center px-2.5 py-1 rounded text-[11px] font-mono bg-slate-900 border border-slate-700 text-slate-300 uppercase tracking-wider w-fit mb-4">
                  {fw.category}
                </div>
                <CardTitle className="text-xl flex items-center text-white">
                  <BookOpen className="w-4 h-4 mr-2 text-cyan-400" /> {fw.name}
                </CardTitle>
                <CardDescription className="text-sm mt-2 text-slate-300">
                  {fw.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <ol className="list-decimal pl-4 space-y-1 text-sm text-slate-400">
                  {fw.steps.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          ))}
        </div>
    </div>
  );
}
