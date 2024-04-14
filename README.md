# Entech Test Assignment

## Prerequisites

`.NET 8` and `Node 18.x`.

## Run instructions:

### Console App

Navigate to `MatrixConsoleApp` folder and run `dotnet run --project MatrixConsoleApp -c Release` command. It will build and run the application. Then enter the input string and get the result.

### Farm Web App

It consists of two parts - backend and frontend.

To run backend part, navigate to `FarmWebApp` folder and run `dotnet run --project FarmWebApp -c Release --urls http://localhost:5000`. It will build and run the backend app using a production environment on the specified url. Then you can open `http://localhost:5000/swagger` url to check all endpoints.

To run frontend part, navigate to `FarmWebAppClient` folder, open `src/environments/environment.prod.ts` file and replace `{{api_url}}` placeholder by `http://localhost:5000` value. Generally it would be done using a CI/CD pipeline, but not now. Then go back to `FarmWebAppClient` folder and run `npm run start` command. It will build and run the frontend app using a production environment. Then open `http://localhost:4200` url and start using it.
