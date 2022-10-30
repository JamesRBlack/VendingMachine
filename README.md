# vending machine

Code was leveraged from https://github.com/tuanbs/angular-vending-machine but adapted for this solution.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.8.

## Build
1. Please make sure you have installed the latest version of nodejs before running this application

2. Inside the root project folder where package.json is located, run npm install to install dependencies.
Core Dependencies include Angular 8.3.6 and PrimeNG Angular component library.

3. Once all dependencies are installed in the same folder run npm start to build and launch the Angular application.

4. The Single Page Application should be served on the default port of 4200 at http://localhost:4200/  

## Design Choices

## Design Patterns
Dependency Injection and Inversion of Control were used


## Business Logic
Business logic was implemented in Angular 8. This framework was chosen as it allows the separation of concerns with UI, Business Logic and Data. This is achieved by implementing Angular components.

## How to use the App
The app consists of two pages

Pay by either cash or credit. the user can select form up to 10 different drinks and choose to restock the machine at any time

## Assumptions

Credit payments are made using paywave technology. No credit card details are required to be input. 
Vending machine can stock up to 50 cans


