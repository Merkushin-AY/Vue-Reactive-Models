# Vue reactive models

This repo is not about design, it is about an MVC (or MVVM, u can call it whatever you want) approach that vue 3 and reactive API allow us to implement.  
Models are classes which work with data and implement any logic of an app.  
`<template>` tags are view of app.  
And `<script>` tags in `.vue` files are controllers which create model instances and connect them with templates. 

### PROS:
- Logic and templates are divided. All logic is totally reusable.
- All logic is extendable.
- Models can be shared with backend.
- Data always comes with methods.
- Much less ts interfaces are needed. All types are in classes.
- Easy to pass data into child component. Only one prop needed.
- You can be sure that objects have same interfaces inside different components.
- "End-to-end" reactivity through all components. Passing same model instance to many components makes its state reactive through all these components without any excess props or stores. Changing model state in any of these components will trigger changes in others (siblings, parents, children - no matter).

### CONS:
- Code in models should work as reactive and non-reactive at same time. Schrödinger's code. Computed variables are not available in models.*
- Tree of classes can become too big.
- Sometimes models will have excess logic and data that component doesn't need.

*It is possible to make all models reactive by default and use computed properties, but I don't recommend it


## Project Setup

```sh
npm install
npm run server
npm run dev
```
