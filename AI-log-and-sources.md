# AI log and References

## AI HELP

### Date: 16.09.28

Engine: claude haiku 4.5
Q:
I have an element with class "commentsection", i want to target all the buttons inside of that element, no matter how far down, so that when they are clicked they will go to another function than the buttons outside of the comment section.

A:
commentSection?.addEventListener("click", (e) => {
const target = e.target as HTMLElement;

if (target.classList.contains("trash-btn")) { }

### Date: 17.08.26

Engine: claude haiku 4.5
Q: I have a post that is an anchortag that takes me to that specific profile page, my problem now is that i have a button inside that anchortag that i want to use to follow that profile, but when i click it it takes me to the specific profile page, is there a way to fix this?

Outcome:
Made the post into a div and made all the content of the body into the ancortag, except the header.

### Date: 18.09.26

Engine: claude haiku 4.5
Q: I have an input field that you can write tags in.
I want to take the input and make it into individual hashtags, both if the user has made a string with spaces, but I also want to cater for when the user has put their own "#" before their words, how can i do this?

A: Explains how I could split the string and use mat to add the hashtags

### Date: 24.09.26

Engine: claude haiku 4.5
Q: I have a component in my ts file that I use in two different pages, the href to those pages have to be different, how can i make it change regarding to which page im on?

Outcome: Added link as a parameter to use in the function

## Source and links

Source used for how to make an easy hamburger menu:
https://medium.com/@davidrodrigueznolimit/the-ultimate-tutorial-for-the-worlds-simplest-hamburger-bar-e2dcc4ad86e3

SvgS are from:
https://tabler.io/icons
