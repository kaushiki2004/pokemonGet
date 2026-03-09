Pokémon Search App (React Native + Expo)
Overview

This project is a Pokémon Search mobile app built using React Native with Expo.
The app allows users to search for any Pokémon by name, view details from the PokéAPI, favorite Pokémon, and save favorites so they persist after restarting the app.

The project is structured using a clean architecture pattern with separate layers for:

View (UI)

Controller (state + logic)

Services (API + storage)

Models (data shape)

Builder Pattern (object construction)

This separation makes the app easier to maintain, test, and extend.

Final Features

The completed app allows the user to:

Enter a Pokémon name (example: pikachu)

Fetch data from the PokéAPI

Display:

Pokémon name

Sprite image

Types

Abilities

First 5 moves

Favorite / Unfavorite a Pokémon

View a list of favorites

Tap a favorite to reload it

Persist favorites after app restart using AsyncStorage

Animate the Pokémon result:

Fade in

Spin (2 full rotations)

Project Architecture
src/
  app/
    index.tsx                 // Wiring only (Controller → View)
  components/
    PokemonView.tsx           // UI only
  controllers/
    usePokemonController.ts   // Orchestration + state
  services/
    pokemonApi.ts             // API call + parsing + model creation
    favoritesStorage.ts       // AsyncStorage read/write
  models/
    Pokemon.ts                // Model type
    PokemonBuilder.ts         // Builder pattern

Each file has a single responsibility.

API Used

PokéAPI endpoint:

https://pokeapi.co/api/v2/pokemon/{name}

Example:

https://pokeapi.co/api/v2/pokemon/pikachu

Fields used:

name

sprites.front_default

types[].type.name

abilities[].ability.name

moves[].move.name (first 5 only)

Part 0 — Starter Code
Questions

What file is acting as your “main screen” right now?
src/app/index.tsx is the main screen because it is the component rendered by Expo.

What is state here, and what does it control?
State is stored using useState.
It controls the value inside the TextInput (pokemonName) and updates whenever the user types.

Part 1 — Single File Functional App
Step 1 Questions

What happens when fetch receives a non-200 response?
fetch() still resolves successfully, but response.ok will be false.
We must check response.ok manually and handle errors.

Why shouldn’t we assume the response JSON always has the fields we want?
APIs can change or fail.
Some Pokémon might not have certain fields.
If we assume data exists and it doesn’t, the app can crash.

Step 2 Questions

Where does “app truth” live right now?
In the React state inside index.tsx.
This includes:

pokemonName

loading

error

pokemon

What bug happens if you forget to set loading=false on failure?
The loading indicator will stay forever, making the app look frozen.

Step 3 Questions

What is the difference between rendering raw JSON vs. rendering a shaped object?
Raw JSON is messy and contains unnecessary data.
A shaped object is clean and only contains fields the UI needs.

Which part of the file is UI responsibility vs. logic responsibility?
UI responsibility:

JSX layout

Styling
Logic responsibility:

Fetching data

Handling errors

Managing state

Step 4 Reflection Questions

List 3 different responsibilities currently inside index.tsx.

Rendering UI

Calling the API

Managing state and validation

If you wanted to reuse the Pokémon API logic in another screen, what would you do?
Move the API call into a separate service file and import it wherever needed.

If you wanted to test the API parsing logic, how would you do it right now?
It would be hard because parsing is mixed with UI code.
I would need to run the app manually.

Part 2 — Service Layer
Step 5 Questions

Why is it a win that the service doesn’t import React?
Because the service becomes reusable, testable, and independent of the UI.

What is the contract of the service function?

Input: Pokémon name (string)

Output: Pokémon data model

Errors: Throws error if not found or network fails

Part 3 — Models + Builder Pattern
Step 7 Questions

What does a builder pattern buy you here?
It ensures the Pokémon object is built step-by-step with valid data.
It prevents incomplete objects.

In what way is a model safer than raw API JSON?
A model guarantees structure and types.
The UI only receives clean, predictable data.

Part 4 — Controller Layer
Step 8 Questions

What responsibilities does the controller own?

Input validation

Loading and error state

Calling services

Storing Pokémon model

Managing favorites

Why is the controller a better place for input validation than the view?
Because validation is business logic, not UI.
Keeping it in the controller allows reuse and prevents UI duplication.

Part 5 — View Component
Step 9 Questions

What props does the view need?

pokemonName

onChangeName

onSearch

loading

error

pokemon

favorites

isFavorite

onToggleFavorite

onLoadFavorite

What would break if the view tried to call the API directly?
The separation of concerns would break.
The view would become too complex and harder to maintain.

Part 6 — Favorites + Persistence
Step 10 Questions

Why should favorites live in the controller and not the view?
Favorites are application state and logic, not presentation.
The controller manages data and behavior, while the view only displays it.

What does “derived state” mean for isFavorite?
Derived state means it is calculated from existing state rather than stored separately.
isFavorite is derived from:

Current Pokémon name

Favorites list

Step 11 Questions

Why is persistence implemented as a service?
Because persistence is an external side effect.
A service isolates storage logic and keeps the controller clean.

What is the difference between “state” and “persisted state”?
State:

Stored in memory

Lost when app closes

Persisted state:

Stored on disk (AsyncStorage)

Remains after app restarts

Part 7 — Animation
Step 12 Questions

Why does this animation belong in the view layer?
Animation is purely visual and part of UI behavior.
The controller should not handle presentation logic.

What triggers the animation and why?
The animation is triggered when pokemon changes from null to a real object.
useEffect detects this change and runs the fade + spin animation.

What I Learned

From this project, I learned:

How to fetch and parse API data in React Native

The importance of separating concerns

How to structure apps using MVC-like architecture

How to persist data with AsyncStorage

How to implement animations with React Native Animated

Why clean architecture makes code easier to understand and maintain

How to Run the App

Install dependencies:

npm install

Start Expo:

npx expo start

Scan QR code with Expo Go on your phone.

Conclusion

This project helped me understand how to build a real mobile application using professional architecture practices.
By separating the View, Controller, Services, and Models, the code became easier to manage and extend.
Adding persistence and animations improved the user experience and made the app feel complete.
