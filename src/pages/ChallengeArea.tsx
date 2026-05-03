import React, { useState, useEffect } from 'react';
import { Button } from '@/src/components/ui/button';
import { Card, CardContent, CardTitle, CardHeader } from '@/src/components/ui/card';
import { generateDailyChallenge, evaluateChallengeResponse } from '@/src/lib/gemini';
import { useStore } from '@/src/store/useStore';
import { Loader2, ArrowLeft, Lightbulb, CheckCircle2, Brain } from 'lucide-react';
import Markdown from 'react-markdown';

type Step = 'loading' | 'challenge' | 'evaluating' | 'feedback';

export function ChallengeArea({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState<Step>('loading');
  const [challenge, setChallenge] = useState<any>(null);
  const [response, setResponse] = useState('');
  const [feedback, setFeedback] = useState<any>(null);
  const { completeDailyChallenge } = useStore();

  useEffect(() => {
    async function loadChallenge() {
      try {
        const c = await generateDailyChallenge();
        setChallenge(c);
        setStep('challenge');
      } catch (err) {
        console.error(err);
      }
    }
    loadChallenge();
  }, []);

  const handleSubmit = async () => {
    if (!response.trim()) return;
    setStep('evaluating');
    try {
      const fb = await evaluateChallengeResponse(challenge, response);
      setFeedback(fb);
      completeDailyChallenge(); // Add XP and track streak
      setStep('feedback');
    } catch (err) {
      console.error(err);
      setStep('challenge');
    }
  };

  if (step === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center p-24 text-center space-y-4">
        <Loader2 className="w-10 h-10 text-cyan-500 animate-spin" />
        <h2 className="text-xl font-medium text-white">Generating today's scenario...</h2>
        <p className="text-slate-400 text-sm">Consulting our Senior PM AI directly from the board room.</p>
      </div>
    );
  }

  if (step === 'challenge' && challenge) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <Button variant="ghost" onClick={onBack} className="mb-2 -ml-4">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
        </Button>
        
        <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 shadow-sm space-y-6">
          <div>
            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-900/30 border border-cyan-800 text-cyan-400 mb-4 tracking-wider uppercase">
              {challenge.topic}
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white mb-2">{challenge.title}</h1>
            <p className="text-slate-300 leading-relaxed text-lg">{challenge.scenario}</p>
          </div>

          <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl">
            <h3 className="font-semibold text-white mb-2 flex items-center">
              <span className="bg-slate-700 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2 border border-slate-600">!</span>
              Your Task
            </h3>
            <p className="text-slate-300">{challenge.task}</p>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-400 uppercase tracking-widest">Thinking Workspace</label>
            <textarea 
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              className="w-full h-48 p-4 bg-slate-950 border border-slate-800 text-slate-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all resize-none shadow-inner"
              placeholder="Start outlining your hypothesis here..."
            />
          </div>

          <div className="flex justify-between items-center bg-slate-950 p-4 border border-slate-800 rounded-xl">
            <div className="flex items-center text-sm text-slate-400 gap-2">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>Hint: Consider using {challenge.hint}</span>
            </div>
            <Button onClick={handleSubmit} disabled={!response.trim()}>
              Submit for Feedback
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'evaluating') {
    return (
      <div className="flex flex-col items-center justify-center p-24 text-center space-y-4">
        <Loader2 className="w-10 h-10 text-cyan-500 animate-spin" />
        <h2 className="text-xl font-medium text-white">Evaluating your solution...</h2>
        <p className="text-slate-400 text-sm">Grading against RICE, HEART, and basic logic.</p>
      </div>
    );
  }

  if (step === 'feedback' && feedback) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Button variant="ghost" onClick={onBack} className="mb-2 -ml-4">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
        </Button>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 shadow-sm">
              <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 mr-2" /> 
                  Feedback Review
                </h2>
                <div className="bg-cyan-900/50 border border-cyan-500/20 text-cyan-400 font-bold px-4 py-2 rounded-full text-sm">
                  +{feedback.score} XP
                </div>
              </div>
              
              <div className="prose prose-invert prose-cyan max-w-none text-slate-300">
                <Markdown>{feedback.feedback}</Markdown>
              </div>
            </div>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-amber-400 flex items-center text-lg">
                  <Brain className="w-5 h-5 mr-2" />
                  Reflection Prompt
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-300">
                {feedback.reflectionPrompt}
              </CardContent>
            </Card>
          </div>

          <div className="col-span-1 space-y-6">
             <Card className="border-slate-800 bg-slate-900/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-2 h-full bg-emerald-500"></div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-emerald-400 text-base">Strengths</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feedback.strengths.map((s: string, i: number) => (
                      <li key={i} className="text-sm text-slate-300 flex items-start">
                        <span className="mr-2 text-emerald-500 font-bold">•</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-slate-800 bg-slate-900/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-2 h-full bg-rose-500"></div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-rose-400 text-base">Areas to Improve</CardTitle>
                </CardHeader>
                <CardContent>
                   <ul className="space-y-2">
                    {feedback.improvements.map((s: string, i: number) => (
                      <li key={i} className="text-sm text-slate-300 flex items-start">
                        <span className="mr-2 text-rose-500 font-bold">•</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
