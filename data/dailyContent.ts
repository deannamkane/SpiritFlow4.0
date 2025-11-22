export interface AudioContent {
  title: string;
  prompt: string;
  duration: string;
}

export interface DailyContent {
  riseQuote: { quote: string; author: string; };
  restQuote: { quote: string; author: string; };
  riseAudio: AudioContent;
  restAudio: AudioContent;
}

export const dailyContent: DailyContent[] = [
  // Sunday (Index 0)
  { 
    riseQuote: { quote: "A Sunday well spent brings a week of content.", author: "Proverb" },
    restQuote: { quote: "The soul feels refreshed when it is near tranquil waters.", author: "Unknown" },
    riseAudio: {
      title: "Sunday Renewal",
      prompt: "Sunday Renewal. Breathe in the stillness of this morning. Today is a blank page, a soft reset for your soul. Visualize a gentle white light clearing away any lingering stress from the past. You are fresh, you are open, and you are ready to simply be.",
      duration: "2:15"
    },
    restAudio: {
      title: "Weekly Release",
      prompt: "Weekly Release. As Sunday closes, prepare your spirit for the week ahead not with worry, but with trust. Visualize the coming week as a landscape you will walk through with grace. Release the need to control every outcome. Trust your ability to handle what comes. Rest now in that trust.",
      duration: "3:10"
    }
  },
  // Monday (Index 1)
  { 
    riseQuote: { quote: "This is your Monday morning reminder that you can handle whatever this week throws at you.", author: "Unknown" },
    restQuote: { quote: "Let go of the day's battles. Peace is your natural state.", author: "Lao Tzu" },
    riseAudio: {
      title: "Monday Momentum",
      prompt: "Monday Momentum. Feel the fresh energy of a new week. Like the sun rising, you have the power to illuminate your path today. Set a clear intention to move with purpose. You are capable, you are prepared, and you are supported. Breathe in energy, breathe out doubt.",
      duration: "2:05"
    },
    restAudio: {
      title: "Unwinding the Mind",
      prompt: "Unwinding the Mind. You have navigated the first day of the week. Now, release the activity. Let your shoulders drop. Imagine unspooling a tight thread, letting it go slack and soft. The day is done. You have done enough. Return to your center.",
      duration: "3:30"
    }
  },
  // Tuesday (Index 2)
  { 
    riseQuote: { quote: "The secret of getting ahead is getting started.", author: "Mark Twain" },
    restQuote: { quote: "The best bridge between despair and hope is a good night's sleep.", author: "E. Joseph Cossman" },
    riseAudio: {
      title: "Steady Flow",
      prompt: "Steady Flow. Connect with the rhythm of your breath. Consistency is your superpower today. You do not need to sprint; you only need to take the next step. Feel the ground solid beneath you. You are steady, grounded, and moving forward with grace.",
      duration: "2:10"
    },
    restAudio: {
      title: "Grounding Peace",
      prompt: "Grounding Peace. Feel the earth beneath you, supporting you. Tuesday is done. Find a sense of stability in your body. Whatever happened today, let it settle like dust returning to the earth. You are safe. You are held. Drift into a heavy, peaceful sleep.",
      duration: "3:15"
    }
  },
  // Wednesday (Index 3)
  { 
    riseQuote: { quote: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    restQuote: { quote: "Each night, when I go to sleep, I die. And the next morning, when I wake up, I am reborn.", author: "Mahatma Gandhi" },
    riseAudio: {
      title: "Midweek Balance",
      prompt: "Midweek Balance. You are in the center of the week. Find your equilibrium. Imagine a scale coming to a perfect rest. Breathing in balance, breathing out chaotic energy. Realign with your purpose. You are exactly where you need to be.",
      duration: "2:20"
    },
    restAudio: {
      title: "Gentle Reflection",
      prompt: "Gentle Reflection. Pause and look back at the days passed so far. Acknowledge your efforts without judgment. Be kind to yourself for what remains unfinished. You are a work in progress, and that is beautiful. Offer yourself compassion tonight.",
      duration: "3:25"
    }
  },
  // Thursday (Index 4)
  { 
    riseQuote: { quote: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
    restQuote: { quote: "Rest is not idleness, and to lie sometimes on the grass under trees on a summer's day is by no means a waste of time.", author: "John Lubbock" },
    riseAudio: {
      title: "Resilient Spirit",
      prompt: "Resilient Spirit. Call upon your inner strength this morning. You are capable and resilient. Whatever challenges arise, know that you have the tools within you to meet them. Breathe in confidence. Breathe out fear. Stand tall in your power.",
      duration: "2:15"
    },
    restAudio: {
      title: "Softening Down",
      prompt: "Softening Down. The week is maturing. It is safe to soften now. Release any armor you have worn to get through the days. Let your face relax, let your jaw loosen. Invite a softness into your heart. Rest is the fuel for your resilience.",
      duration: "3:20"
    }
  },
  // Friday (Index 5)
  { 
    riseQuote: { quote: "Make each day your masterpiece.", author: "John Wooden" },
    restQuote: { quote: "Finish each day and be done with it. You have done what you could.", author: "Ralph Waldo Emerson" },
    riseAudio: {
      title: "Friday Vibrance",
      prompt: "Friday Vibrance. Welcome the joy of today. Let anticipation lift your spirit. Feel a lightness in your step. Today is a day to finish strong and open your heart to the weekend's possibilities. Shine your light brightly.",
      duration: "2:00"
    },
    restAudio: {
      title: "Gratitude & Celebration",
      prompt: "Gratitude and Celebration. The work week is behind you. Celebrate your journey. Give thanks for your energy, your effort, and your endurance. You made it. Now, the time for rest and play begins. Let a smile touch your lips as you drift off.",
      duration: "3:40"
    }
  },
  // Saturday (Index 6)
  { 
    riseQuote: { quote: "The key to a productive weekend is a positive mindset.", author: "Unknown" },
    restQuote: { quote: "Even a soul submerged in sleep is hard at work and helps make something of the world.", author: "Heraclitus" },
    riseAudio: {
      title: "Weekend Presence",
      prompt: "Weekend Presence. Wake up to the freedom of today. Be fully present in this moment. Not doing, just being. Notice the sunlight, the sounds, the feeling of waking up without a deadline. Embrace the luxury of time. Today is yours.",
      duration: "2:25"
    },
    restAudio: {
      title: "Deep Restoration",
      prompt: "Deep Restoration. Sink into deep, restorative rest. Let your body recharge completely, like a battery refilling its energy. There is nowhere to go, nothing to do. Your only task is to rest. surrender to the quiet. Sleep deep.",
      duration: "3:45"
    }
  },
];