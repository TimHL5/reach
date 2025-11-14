import { useState, useEffect } from 'react';

export type TimeOfDay = 'late-night' | 'early-morning' | 'late-morning' | 'afternoon' | 'evening' | 'night';

export function useCurrentTime() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    // Set initial time
    setTime(new Date());

    // Update every minute for real-time updates
    const interval = setInterval(() => {
      setTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return time;
}

export function getTimeOfDay(date: Date): TimeOfDay {
  const hour = date.getHours();

  if (hour >= 0 && hour < 5) return 'late-night';
  if (hour >= 5 && hour < 9) return 'early-morning';
  if (hour >= 9 && hour < 12) return 'late-morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 22) return 'evening';
  return 'night';
}

export function getTimeBasedMessage(date: Date): { time: string; message: string } {
  const hour = date.getHours();
  const timeOfDay = getTimeOfDay(date);

  // Convert to 12-hour format
  const displayHour = hour % 12 || 12;
  const ampm = hour >= 12 ? 'pm' : 'am';
  const timeString = `${displayHour}${ampm}`;

  const messages: Record<TimeOfDay, { time: string; message: string }> = {
    'late-night': {
      time: timeString,
      message: "still staring at your essay wondering if it's good enough?",
    },
    'early-morning': {
      time: timeString,
      message: 'already stressing about your applications before school?',
    },
    'late-morning': {
      time: timeString,
      message: 'procrastinating on your essays between classes?',
    },
    'afternoon': {
      time: timeString,
      message: 'stressing about your college list instead of focusing in class?',
    },
    'evening': {
      time: timeString,
      message: "staring at your Common App essay wondering if it's good enough?",
    },
    'night': {
      time: timeString,
      message: 'still working on college apps instead of sleeping?',
    },
  };

  return messages[timeOfDay];
}
