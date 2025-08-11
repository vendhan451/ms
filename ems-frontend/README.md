# Employee Management System (EMS) Frontend

This is the frontend for the Employee Management System (EMS) built with Next.js, TypeScript, Ant Design, and Redux Toolkit.

## Project Structure

```
ems-frontend
├── public
│   └── favicon.ico
├── src
│   ├── pages
│   │   ├── _app.tsx
│   │   ├── _document.tsx
│   │   ├── index.tsx
│   │   └── employees
│   │       └── index.tsx
│   ├── components
│   │   ├── EmployeeList.tsx
│   │   └── Layout.tsx
│   ├── features
│   │   └── employees
│   │       ├── employeesSlice.ts
│   │       └── employeesAPI.ts
│   ├── store
│   │   └── index.ts
│   ├── styles
│   │   └── globals.css
│   ├── types
│   │   └── employee.ts
│   └── utils
│       └── fetcher.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Getting Started

To get started with the EMS frontend, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd ems-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser and navigate to:**
   ```
   http://localhost:3000
   ```

## Features

- **Employee Management:** View and manage employee records.
- **Responsive Design:** Built with Ant Design for a modern UI.
- **State Management:** Utilizes Redux Toolkit for efficient state management.
- **Type Safety:** TypeScript ensures type safety throughout the application.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.