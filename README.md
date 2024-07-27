# Bookstore App

## Setup
To execute this app, you need to have _git_ and _Docker_ installed on your machine. Make sure to have them installed. Then, execute the following steps:
1. Clone this repository by executing command
` git clone https://github.com/pierclgr/Bookstore-Challenge.git `
2. Move in the repository directory, in the folder `frontend`
3. Create a file `.env` and put `REACT_APP_OPENAI_API_KEY=<your-openai-apikey>` into it
4. Replace `<your-openai-apikey>` with your OpenAI APIKey, generated from OpenAI website, by heading to [this link](https://platform.openai.com/api-keys) and clicking on "Create new secret key" at the top of the page. Make sure to grant 'all' permissions. **This is necessary in order to enable AI functions**.
5. Move to the repository directory and run `docker-compose up --build`; this will take a while
6. When the build finishes, open [localhost:3000](localhost:3000) on your browser to access the page.

## Quick guide
You have the access to three pages:
1. The home page contains the list of books in the library; you can filter/order books by many criterias. The list will be empty at the beginning. By clicking on the book, you can also access its infos.
2. The "Add book" page allows you to add a book to the library.
3. The "Magic suggestion" page uses OpenAI's ChatGPT to suggest a book based on a natural language query. Just write whatever you like and you want to read in natural language in the box and the app will suggest the best book for you.
    
