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
3. Loading, please wait...

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

Backlog

- ensure that past habit data (when a habit is made) is not marked in red
- figure out text truncation for habit titles
- handle habit editing locally instead of in state
- fix eslint linebreak system to work regardless of windows or linux
- decide on and implement coding standards
- determine PR standards and create github PR template
</p>
</details>
