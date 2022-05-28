# Blogger (LPDWI S4 PHP TP3)
You can try it [here][url].

## Challenge [ Google Translate ][FR]
For the management of a blog, we use a database called `blog`.
The database can be retrieved in the file `./backend/dataBase.sql`
it is requested to use PDO and the MVC pattern to create a blog

  - Create a home page containing a small menu whose elements are (list of tickets and add a post by an author.)

  - The home page contains the list of articles with modification and deletion.
  ```
   - Editing allows you to edit a ticket.
   - deletion allows you to delete a post with its comments
  ```

  - A page to add a ticket allowing to insert a ticket (article)
  ```
   - It contains: post and post date
   - To insert a comment the user needs his name and his comment.
   - The insertion of comments will be done using AJAX`
  ```

  -  Layout using CSS, Bootstrap, JS and AJAX
## Dependencies
- NodeJS v16.15.0
- NPM v8.5.5
- PHP v7.4
- Composer v2.3.5
- Apache & MySQL ...

## Development Guide

  - Clone the project
  
    ```bash
    git clone https://github.com/rouanis5/blogger
    ```
    ```bash
    git clone git@github.com:rouanis5/blogger.git
    ```
    ### Database configuration
    - use `PhpMyAdmin` , `MySQL CLI` , `MySQL Workbench` or any MySQL compiler
    - Create database `blog`
    - import the file `./backend/dataBase.sql` or run its queries one by one

    ### Backend configuration
    - go to backend folder `cd backend/`
    - Install dev dependencies: `composer install`
  
    - copy .env file `cp .env.sample .env`

    - open .env file `vi .env`

    - set your environment configuration 
    ```
    MYSQL_HOST = localhost
    MYSQL_PORT = PORT
    MYSQL_DB = database_name
    MYSQL_USER = username
    MYSQL_PASSWORD = password
    ```

    ### Frontend configuration
    - Go back to the main folder `cd ..`
    - Install dev dependencies:
      `npm install`

    - copy env.js file `cp frontend/js/config/env.sample.js frontend/js/config/env.js`
    
    - open env.js file `vi frontend/js/config/env.js`
    - set your environment configuration 
    ```
    /* eg, http://localhost:8080/ */
    const API_URL = "YOUR_API_URL";
    export default API_URL;
    ```
    ---
  - Start Backend server:
    `cd backend/` then ` php -S localhost:8080` or any url as you configured in `env.js`
  
  - Start Frontend development server:
    `npm run dev`

  - Build static files:
    `npm run build`

  - Preview built files:
    `npm run preview`


Bugs Tracking
----

Feel free to report bugs and issues or request new features on the [Issues tab][issues].


Contribute
----

Feel free to fork the project and open pull requests.


License
----

MIT License

[url]: <#>
[issues]: <https://github.com/rouanis5/blogger/issues>