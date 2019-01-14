# Isaac's Memory Match Game Project

Udacity Front-End Web Developer Nanodegree Part 2 Project: Memory Game.

## Table of Contents

* Project Overview
* Game Instructions
* Build Considerations
* Memory Game Logic
* Styling
* Usability
* Comments
* Acknowledgements
* [Contributing](#contributing)

## Project Overview

This is a web browser version of the classic card game, Concentration. This project aims to demonstrate the skills I have learned so far in HTML, CSS and JavaScript. 

The project is available on GitHub, titled [MemoryMatchGame](https://github.com/icmoore1/MemoryMatchGame).

## Game Instructions

The game board consists of sixteen cards arranged in a grid. The deck is made up of eight different pairs of cards, each with different symbols on one side. 
The cards are arranged randomly on the grid with the symbol face down. The gameplay rules are very simple: flip over two hidden cards at a time to locate 
the ones that match.

Each turn:
The player flips one card over to reveal its underlying symbol.
The player then turns over a second card, trying to find the corresponding card with the same symbol.
If the cards match, both cards stay flipped over and are counted.
If the cards do not match, both cards are flipped face down.
The game ends once all cards have been correctly matched.

--The key is to find all the matches in the shortest amount of time, in the fewest possible moves.

## Build Considerations

In the real-life game, players flip over cards to locate the pairs that match. The goal is to recreate this effect in this project. There are a couple of interactions that need to be considered:

- Flipping cards
- What happens when cards match
- What happens when cards do not match
- When the game finishes
- Resetting the game

**Memory Game Logic**

-The game randomly shuffles the cards. A user wins once all cards have successfully been matched.
-When a user wins the game, a modal appears to congratulate the player and ask if they want to play again. Also tells the user how much time it took to win the game, 
and what the star rating was.
-A restart button allows the player to reset the game board, the timer, and the star rating.
-The game displays a star rating from 3(highest) that reflects the player's performance. After 16 then 24 moves, it will change to a lower star rating eventually down to 1.
-When the player starts a game, a displayed timer is started. Once the player wins the game, the timer stops.
-Game displays the current number of moves a user has made.

**Styling**

Application uses CSS to style components for the game.

**Usability**

All application components are usable across modern desktop, tablet, and phone browsers.

**Comments**

Comments are present and effectively explain longer code procedure when necessary.

## Acknowledgements

* [Udacity](https://www.udacity.com/), for creating this degree program, and providing me with education and endless support
* [Mozilla Developer Network](https://developer.mozilla.org/en-US/), for so many resources and instructions
* [Matthew Cranford](https://matthewcranford.com/memory-game-walkthrough-part-1-setup/), for detailed walkthrough to make navigating this project easier.

## Contributing

This repository is a project for the Udacity Front-End Web Developer Nanodegree. Therefore, will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
