# Project Overview

![buffy!](https://media.giphy.com/media/ymBQi6ePLEDiU/giphy.gif)

## Project Links

- [github repo link](https://github.com/scwdev/motw_char_gen)
- [deployment link](https://motw-char-gen.vercel.app/)

## Project Description
Using the [D&DBeyond](https://www.dndbeyond.com) character generator as a template for a Monster of the Week character generator. User will be able to move through the steps of choosing character options and then seeing their newly made character as a (printable?) one-sheet.

## API

Found a fanmade API for MotW [here](https://motwapi.com/).

```
{
  "index": "chosen",
  "name": "The Chosen",
  "luck_special": "When you spend a point of Luck, the Keeper will bring your fate into play.",
  "moves": {
    "required_move_slots": 2,
    "required_moves": [
      {
        "name": "Destiny’s Plaything",
        "description": "At the beginning of each mystery, roll +Weird to see what is revealed about your immediate future. On a 10+, the Keeper will reveal a useful detail about the coming mystery. On a 7-9 you get a vague hint about it. On a miss, something bad is going to happen to you."
      },
      {
        "name": "I’m Here For A Reason",
        "description": "There’s something you are destined to do. Work out the details with the Keeper, based on your fate. You cannot die until it comes to pass. If you die in play, then you must spend a Luck point. You will then, somehow, recover or be returned to life. Once your task is done (or you use up all your Luck), all bets are off."
      }
    ],
```
etc.

## Wireframe/Architecture

- [wireframe](https://res.cloudinary.com/scwd/image/upload/v1627915434/motw_char_gen/wireframe_bu9ukk.jpg)
- [architecture](https://res.cloudinary.com/scwd/image/upload/v1627915993/motw_char_gen/architecture_zryky5.jpg)

### MVP/PostMVP - 5min

#### MVP EXAMPLE
- Allow user to move through choices with a fully built character state at completion
- Finished character interface
- Prompt text to move user through pages

#### PostMVP EXAMPLE

- Add storage for multiple characters
- Add login functionality
- Add basic moves
- Sass

## Components

| Component | Description | 
| --- | :---: |  
| App | Stateful. Stores the apiCalls and the character as it is built| 
| Header | responsive nav and information on progress | 
| Footer | attribution |
| Button | basic selection method for form. text and functionality handed down through props |


| Component | Priority | Estimated Time | Time Invetsted | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| Creating file structure | H | 2hrs| 3hrs | 3hrs |
| Creating states | H | 2hrs | 2.5hrs | 2.5hrs |
| each gen page | H | 2hrs (total 14hrs) | 6hrs | ?? |
| contentful data | M | 2hrs | ?? | ?? |
| finished char page | H | 3hrs | ?? | ?? |
| Styling | L | 3hrs | ?? | ?? |
| Total | H | 26hrs| ?? | ?? |

## Additional Libraries
Probably Sass.

## Code Snippet

Use this section to include a brief code snippet of functionality that you are proud of an a brief description.  Code snippet should not be greater than 10 lines of code. 

```
function reverse(string) {
	// here is the code to reverse a string of text
}
```