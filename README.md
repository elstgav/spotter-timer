# Spotter Timer

# Installation

> **Node version:**
> You will need the version specified in [`/.node-version`](/.node-version). I recommend using a node version manager like [`nodenv`](https://github.com/nodenv/nodenv)—if you don’t have the required node version you can install it with `nodenv install`.

1. **Install packages**

   ```sh
   npm install
   ```

2. **Run the app**

   ```sh
   npm run dev
   ```

# Local Development

## Available Scripts

In the project directory, you can run:

| command                            | description                      |
| ---------------------------------- | -------------------------------- |
| `npm run dev`                      | Start development server         |
| `npm run build && npm run preview` | Preview production server        |
| `npm run format`                   | Format files to match code style |
| `npm run lint`                     | Check code for errors            |
| `npm run test`                     | Run test suite                   |

# Project Notes

- At my past company we built on top of Create react app with Material UI and Sass modules—not a very modern codebase. For speed of development I kept with MUI as I’m familiar with it, but tried building on Vite for the first time. This took a bit getting used to but it was fun to use a much more modern build stack. As for MUI I’m eager to adopt a simpler framework; I’ve found it cumbersome to theme.

- While testing I unfortunately ran into the dreaded (and finicky) ["not wrapped in act(…) warning](https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning), that seems to trigger when I advance the mock timers to update the timer render in tests. With more time I would want to fix this properly, but suppressed the errors for now with a TODO comment.

- Design notes

  - I’d want to work with the designer to understand the font scale, color palette, etc to see how these work in a larger system. Took a stab at a systematic approach.
  - Made sure to enable `tabular-nums` for the timer display, to avoid horizontal jumping as the digits update
  - As noted in my wiki comments, I had some trepidations about making the timer display double as an input. One caveat I wanted to avoid was updating the input while the timer was running. Instead I provide an explicit "Set timer" button on hover/focus. Especially for keyboard users, I wanted to avoid pausing the timer/messing with input as they shift focus—adding an explicit button to toggle editing lets them be more intentional.
    - I also added input masking, though with more time I would prefer to change this so numbers are added from the right of the pattern and work their way left. (Input masking is tricky to get right though)

- Accessibility notes

  - I leveraged an existing CircularInput component for the slider, though I would prefer if it relied on an `input[type="range"]` to handle its events. For example this slider doesn’t currently support [the <kbd>home</kbd>, <kbd>end</kbd>, etc keys that are expected for the "slider" role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/slider_role#keyboard_interactions).

- …these notes are by no means comprehensive—I’m happy to share more of my thinking/rationale if you have questions!
