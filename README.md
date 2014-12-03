react-console
=============

Another infinite scrolling module, made specifically for fixed width text

## The Problem
React has often been used for UITableView like element culling. By only rendering elements on screen, we keep the number of 
DOM elements in check, and that gives us performance improvements.

My other project React-Infinity is made for doing that for most cases where you would have a grid or a list of content.

The limitation of React-Infinity is that it relies on pre-defined sizes for elements. The only other way would be to Query size from the DOM and then do the placement. That approach ends up having a huge cost in performance anyway, and we lose much of the benefits of node culling.

## The Idea
This project solves the problem for a very small subset of cases. jlongster was wondering on Twitter if there was a way to do node culling of a simple list, where the items in the list would have to fluid. This seemed like a pretty huge task where you would need to recalculate the size of DOM elements all the time.

The problem in particular was for rendering logs in a console.

Consoles have some very interesting properties:

- They are only text based, (or primarily text based)
- They use fixed-width fonts, which as the name suggest are fixed-width!

Using the size of the fixed width fonts and the length of the strings, it becomes some simple Math to calculate the size of elements in the console.

Hence this project.

## TODO:
- account of line-breaks in text while calculating the height of items.
- change the format to provide per item padding/size etc. 
