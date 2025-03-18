# Setting up the Project

This guide provides instructions for setting up and running the project on your local machine

Make sure you have the following prerequisites installed on your system:

- **npm** 

## Setting Up the Project

1. Clone the repository:
   ```bash
   git clone https://github.com/SudiptaPaul-31/ShadowChat.git
   cd ShadowChat
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create and switch into you own branch:
    ```bash
   git branch <your-branch>
   git checkout <your-branch>
   ```

## Running the Entire Project

To run the entire project, including both smart contracts and the frontend:

1. Build commands:
   ```bash
   npm run dev-c
   ```

The frontend should now be running at `http://localhost:3000`


## Notes for Contributors

- Follow our contributor's guide given [here](./CONTRIBUTING.md).
- Make sure to follow the respective commands for working on either the smart contracts or the frontend.
- Run `npm install` in the `/client` directory before running the frontend for the first time.
- Ensure the code is properly building, passing tests and formatted using `npm run check` at the root directory before making a pull request.
 