# Tic-Tac-Toe

## Development
Start the project using `npm start`
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

# Test
Run `npm test`

# Production
Run `npm run build`
Builds the app for production to the `build` folder

# Architecture
I've used a few patterns worth mentioning:
- State-Reducer - To keep the state in a central place and allow different components to communicate using fetch commands
- Context - Mainly to share fetch so child components would be able to communicate with different parts of the system

# TODO
Given more time I would add more unit tests
