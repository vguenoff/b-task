-   TASK DESCRIPTION:
-   Build a simple TV show search results screen using HTML, SCSS and
    JavaScript.
-   The screen should display data from the TVMaze database when typing a name
    in the search box.
-   Fields: Name, Image, Rating, Description and Genres. (They should be
    properly validated).
-
-   UI Mockup:
    https://www.dropbox.com/s/5qbqvjshkb2con0/sample-frontend.jpg?dl=0
-   Data Source: GET https://api.tvmaze.com/search/shows?q=$NAME (where $NAME is
    the show name)
-
-   REQUIREMENTS:
-   1 - Use JavaScript, HTML and CSS/SASS
-           (no external libraries or frameworks).
-   2 - UI must match the mockup linked above.
-   3 - Filter out all results with the word "show" in the title (ignoring case)
-   4 - Uppercase the word "robot" in title and descriptions when present.
-   5 - Use a placeholder or solid color when show image is not available
-   6 - Error handling must be implemented
-   7 - When no results are returned display the no results message container.
-   8 - Use async/await when possible
-
-   NICE TO HAVE (extra points):
-   a - Responsive design
-   b - Throttled API requests (less than one per keystroke)
