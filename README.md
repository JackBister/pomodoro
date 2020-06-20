# Pomodoro
This is a small [pomodoro](https://en.wikipedia.org/wiki/Pomodoro_Technique) timer I put together in TypeScript.

You can try it out [here](https://jackbister.github.io/pomodoro).

The timer has one experimental/"weird" feature where it pauses on visibilitychange events and then tries to catch up when the page becomes visible again. I added this feature to support phones, since the timer would normally pause when the phone becomes locked after being inactive, but it's not a great solution since it requires you to unlock the phone from time to time to see what the status is...

