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
- Check for word breaks (`.split('')`), and get the size right for extremely long words in strings.


## Console methods: (as seen on MDN)



- console.log
Print either fixed-width text
OR prints multiline fixed-width text which can be similarly calculated for actual size

Always has fixed amount of padding-left which may or may not include an arrow to expand

HTML is also printed in fixed-width

- console.count, console.warn, console.time, console.trace
Similar to console.log in terms of printing. Just adds to the text. Sometime, there might be an extra line of content which has more padding and a border. The sizing still works the same way, and it can still be calculated in JS.

- console.dir
Prints a fixed width out-put PLUS a large container with a deep level of detail
This large container has pre-defined height, and so this can be used trivially

- console.assert
Prints a colour coded alert.
Can be expanded to a console.dir like view. Possibly difficult to calculate height without DOM APIs

- console.error
color coded console.log

- console.group
Add an indentation level to all console output till console.groupEnd() is called. For the rendering, this just changes the value of padding-left and otherwise doesn't affect the calculations

- console.table
Embeds an actual HTML template into the console. The table itself contains fixed-width fonts. As we can know the table structure and it's content at render time, it is possible to calculate it's render size, purely in Javascript with DOM. 

This is the only case that may require a non-trivial amount of code to support

- CSS in console.logs
logs in the console can be styled with CSS, like so:

```
console.log("%cred text", "color:red");
```

It's possible to change the font-family property and use a font that's not fixed width. Since variable width fonts are very complex and not predictable in size, there is no obvious way to calculate the size of these logs without using the DOM API.
