import React from 'react';
import { useStore } from '@/src/store/useStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { Brain, Flame, Target, Trophy, BookOpen } from 'lucide-react';
import { isSameDay, startOfDay } from 'date-fns';

export function Dashboard({ onCompleteAction }: { onCompleteAction: (action: any) => void }) {
  const { streak, xp, completedChallenges, lastCompletedDate } = useStore();
  const hasCompletedToday = lastCompletedDate ? isSameDay(new Date(lastCompletedDate), startOfDay(new Date())) : false;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Welcome Back, PM</h1>
          <p className="text-slate-400 mt-1 text-lg">PM thinking is a muscle. Let's get to the gym.</p>
        </div>
        
        <div className="flex items-center gap-4 bg-slate-900 p-3 rounded-xl border border-slate-800 shadow-sm">
          <div className="flex items-center gap-2 px-3">
            <Flame className="w-5 h-5 text-orange-400" />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white leading-none">{streak}</span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Day Streak</span>
            </div>
          </div>
          <div className="w-px h-8 bg-slate-800"></div>
          <div className="flex items-center gap-2 px-3">
            <Trophy className="w-5 h-5 text-purple-500" />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white leading-none">{xp}</span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Total XP</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 border-cyan-500/20 bg-gradient-to-br from-cyan-900/20 to-slate-900 relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-32 h-32 bg-cyan-500/10 rounded-bl-full z-0 transition-transform group-hover:scale-110"></div>
          <CardHeader className="relative z-10">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex justify-center items-center mb-2">
              <Target className="w-5 h-5 text-cyan-400" />
            </div>
            <CardTitle className="text-xl">Daily Challenge</CardTitle>
            <CardDescription>One product scenario a day</CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            {hasCompletedToday ? (
              <div className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-sm font-medium py-3 px-4 rounded-md flex items-center justify-center gap-2">
                <Brain className="w-4 h-4" /> Challenge Completed!
              </div>
            ) : (
              <Button className="w-full shadow-sm" size="lg" onClick={() => onCompleteAction('daily')}>
                Start Practice <Brain className="w-4 h-4 ml-2" />
              </Button>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex justify-center items-center mb-2">
              <BookOpen className="w-5 h-5 text-purple-400" />
            </div>
            <CardTitle className="text-xl">Frameworks</CardTitle>
            <CardDescription>Learn RICE, HEART, JTBD & more</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full" onClick={() => onCompleteAction('frameworks')}>
              Browse Frameworks
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex justify-center items-center mb-2">
              <Trophy className="w-5 h-5 text-emerald-400" />
            </div>
            <CardTitle className="text-xl">Your Stats</CardTitle>
            <CardDescription>Track your PM growth</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm border-b border-slate-800 pb-2">
                <span className="text-slate-400">Completed Exercises</span>
                <span className="font-bold text-white">{completedChallenges}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Current Rank</span>
                <span className="font-bold text-cyan-400">{xp < 200 ? 'Novice PM' : xp < 1000 ? 'Product Owner' : 'Senior PM'}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
