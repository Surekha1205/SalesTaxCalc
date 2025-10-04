# Sales Tax Calculator

A full-stack application that parses email/text blocks, extracts data, and calculates sales tax and total.

## Features

- Accepts email/text input blocks.
- Extracts xml, <cost_centre> and <total> values.
- Calculates sales tax and total excluding tax.
- Handles validation errors:
  - Rejects input with missing <total> or unclosed tags.
  - Defaults <cost_centre> to "UNKNOWN" if value is missing.
- React frontend with REST API integration.
- Display results in JSON format.

## Tech Stack

- **Frontend:** React, Axios, Vite, Cypress (for E2E testing)
- **Backend:** ASP.NET Core Web API

## Getting Started

### Prerequisites

- Node.js >= 18.x
- .NET 7 SDK
- Visual Studio 2022 (recommended)

## Testing

### End-to-End (E2E) Tests with Cypress

This project uses **Cypress** for full UI flow testing.

#### Prerequisites

- Node.js installed
- Cypress installed
- Add "cypress:open": "cypress open" in package.json under scripts

### End-to-End (E2E) Tests with Cypress

This project uses **Cypress** for full UI flow testing.

#### Prerequisites

- Node.js installed
- Cypress installed (or via `npm install`)

#### Install dependencies

From the `frontend` folder:

### In Cmd

cd taxcalculationfrontend
npm install

### To run frontend
npm run dev

### To run the e2e UI test
npm run cypress:open

