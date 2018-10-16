FACE GAME
=========

fork of https://github.com/marikka/weighted-face-game

see: https://discourse.reaktor.com/t/kk-weighted-face-name-memory-game/2618

How to play?
------------

Following these instructions will result in a list of Reaktor employee names/ids stored in your browser local storage. Please understand and take responsibility of the security implications before proceeding.

1. Log in to rex: [hrex.reaktor.com/](https://rex.reaktor.com/) 
2. Go to https://rex.reaktor.com/api/people and save the data to a file (people.json)
3. Go to https://witty-harbor.glitch.me/
4. Drag and drop your data file into the box
5. Play!

Gitch Project
-------------

On the front-end,
- drag in `assets`, like images or music, to add them to your project

On the back-end,
- your app starts at `server.js`
- add frameworks and packages in `package.json`
- safely store app secrets in `.env` (nobody can see this but you and people you invite)
