# prayer-book-template

Created by [Cendy](https://www.upwork.com/freelancers/~01b3ada479ef818cc7)

Modified by Krysztof

<details><summary>Description</summary>
<p>

The draft of the SaintMaker PWA. Will eventually include a prayerbook, confession guide, habit tracker, Lectio Divina guide, and more.

</p>
</details>
<details><summary>Coding Standards</summary>
<p>

1. Minimum supported screen size in the SaintMaker is 360px width. As per this article https://worship.agency/mobile-screen-sizes-for-2022-based-on-data-from-2021 that will cover approximately 73% of 2021 mobile users (and I assume an even higher percentage of 2022 mobile users).
2. We use the react-icons library within this app: https://react-icons.github.io/react-icons/search
3. We use folderslint to enforce a folder structure: https://github.com/denisraslov/folderslint
4. We use husky to run eslint, folderslint, and prettier before you commit your code
5. We mostly modeled out coding standards after this guide by JonDJones: https://www.jondjones.com/frontend/react/react-tutorials/react-coding-standards-and-practices-to-level-up-your-code/
6. Loading, please wait...

</p>
</details>
<details><summary>Development Log</summary>
<p>

12/10/22

- make the header and drawer reusable between pages
- start work on the habit tracker

12/17/22

- wrap up draft of habit tracker
- move habit data into indexdb
- fix editing behavior of habits
- add prayer book and habits to hamburger

1/3/23

- store at least 4 weeks worth of data per habit
- explore more readable way to push out old weeks
- add unit testing for utils via vitest

1/8/23

- convert individual habit blocks into a component
- store 4 weeks of habit data by default

1/9/23

- set up import/export prayerbook functionality
- filter prayer html when implementing import/export prayerbook functionality
- simplify alert modal component

1/28/23

- setup prettier
- setup most of the eslint rules
- implement husky

1/29/23

- set up additional eslint rules

1/30/23

- setup custom rules (credit for 99% of the prefer-alias-imports rule goes to [Jeff Chen](https://jeffchen.dev/posts/Automatically-Fixing-Relative-Imports-with-ESLint/))
- decide on and implement coding standards

Backlog
- figure out why prettier isn't applying singlequotes
- ensure that past habit data (when a habit is made) is not marked in red
- figure out text truncation for habit titles
- handle habit editing locally instead of in state
- fix eslint linebreak system to work regardless of windows or linux
- determine PR standards and create github PR template
- Move in-depth coding standard breakdown into this readme
</p>
</details>
