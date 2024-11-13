# Propeller Front End Coding Exercise


## The exercise

As the team loves to pair on some tasks from time to time, this interview will be a pair programming exercise with two of our engineers. One thing to keep in mind is there is no final solution to this exercise which we need to reach.
The goal of this challenge is to see how you would collaborate with us on a day-to-day basis.

Things you should consider while going through the exercise:
- Consider how your app is built.
- Consider coding style (e.g. robustness and maintainability).
- Write some simple tests.

Also keep in mind the interviewers are always there to help and we don't mind if you want to quickly google for the description of a NodeJS function or similar types of questions during the interview.

### Background

Commonly large datasets like maps (2D or 3D) are broken down into chunks with varying levels of detail. You will already be familiar with this concept in e.g. Google Maps, where you can zoom out to see the whole world in low detail. Zoom in and you can see your house. This blog post (https://macwright.org/2012/05/15/how-web-maps-work.html) provides a good overview.

We've tiled a high resolution image into a set of tiles in the 'tiled' folder found in `public/tile-assets` (un-tiled.jpg is just for reference). The task is to create a front-end application that displays the tiles in the style of a 2D map view. We have bootstrapped the application for you (with create-react-app) which provides some basic functionality such as zooming on scroll and basic panning.

## Initial setup

1. Install [Node 23](https://nodejs.org/en/download)
2. Run `corepack enable`
3. Run `yarn set version stable`
4. Run `yarn install`

## Preparation

In preparation for the interview, please pick the IDE you are feeling most comfortable with. Make sure that you can edit the code provide and that you are able to run the commands:

- `yarn start` and
- `yarn test`

So that we are ready to write some code and test it.

If you have any questions prior to the date of the interview, please feel free to reach out to a member of our team. Good luck!
