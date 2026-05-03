import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { addDays, isSameDay, startOfDay } from 'date-fns';

interface PMStore {
  streak: number;
  lastCompletedDate: string | null;
  completedChallenges: number;
  xp: number;
  completeDailyChallenge: () => void;
}

export const useStore = create<PMStore>()(
  persist(
    (set, get) => ({
      streak: 0,
      lastCompletedDate: null,
      completedChallenges: 0,
      xp: 0,
      completeDailyChallenge: () => {
        const now = startOfDay(new Date());
        const { lastCompletedDate, streak, completedChallenges, xp } = get();

        let newStreak = streak;
        if (!lastCompletedDate) {
          newStreak = 1;
        } else {
          const lastDate = new Date(lastCompletedDate);
          if (isSameDay(now, addDays(lastDate, 1))) {
            newStreak += 1;
          } else if (!isSameDay(now, lastDate)) {
            newStreak = 1;
          }
        }

        set({
          streak: newStreak,
          lastCompletedDate: now.toISOString(),
          completedChallenges: completedChallenges + 1,
          xp: xp + 50,
        });
      },
    }),
    {
      name: 'pm-trainer-storage',
    }
  )
);
