# My Phaser Game
This is my first time working with phaser, all done within an internship period of ~2.5 weeks.
Feel free to download it, as of the 10th of February, this may be one of the last days this will ever get an update as my internship is over in exactly 4 hours.
Maybe I will add some more polish such as player and NPC sprites, hopefully I'll get to do a victory screen, a soundtrack and sprites with animations.
I won't get it done by today for sure, but if I feel like it I might just work on it a little bit more at home. This is supposed to be implemented as an easter egg
on a website, so it's more of an arcade -ish gameplay, basically similar to pacman.

All the tools that I used: 
Organisation: Github (duh) and Git: https://git-scm.com/

IDE: Visual Studio Code: https://code.visualstudio.com/

Engine: Phaser 3.55.2: https://phaser.io/

Art: GIMP 2.10.32: https://www.gimp.org/

Mapping: Tiled: https://www.mapeditor.org/

Sound: Bosca Ceoil: https://boscaceoil.net/

# How to play
Since Phaser is a web based engine, you will need to clone the repo and download the "live-server" plugin from the Visual Studio code extension market.
It's free an probably the simplest way, atleast for me. Alternatively, you can use any http server that the Phaser introduction tutorial tells you, such as
http-server from npm. Install it by typing the following comman into your console:
npm i http-server

I still highly recommend the live-server extension though, as I do not know how to launch the game on any other server.
If you do use the extension, open the index.html in visual studio code and press LALT + L + O to start the server. This should automatically
open your browser with the localhost tab open and the game ready to go. I recommend playing on a screen with WQHD (2560 * 1440, or 2K) resolution with fullscreen
mode (F11) enabled.

# Controls
The controls are really easy. WASD to move, R to restart. Boom.

# Objective
Just like in pacman, you simply need to collect all coins before the time runs out (3 Minutes) or the npc (as of right now just a red square) catches you. Have fun!
