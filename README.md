# Task Management Dashboard - Frontend

This repository contains the frontend of the Task Management Dashboard, built with React and Material UI.

## Features
- 🏗 **Modern UI/UX**: Uses Material UI for an elegant and responsive design.
- 📊 **Task Overview**: Displays total, completed, pending, and overdue tasks.
- 📅 **Calendar Integration**: View tasks based on due dates.
- ✅ **Task Management**: Add, edit, and view tasks.
- 🎨 **Dark/Light Mode**: Theme switching available.

## Technologies Used
- **React** - Frontend framework
- **Material UI** - UI component library
- **React Big Calendar** - Calendar view for tasks
- **React Router** - Navigation
- **Moment.js** - Date manipulation
- **Axios** - API calls to backend

## Getting Started
### Prerequisites
Make sure you have Node.js and npm installed.

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/husseinbouik/task-manager-app-frontend.git
   cd task-manager-app-frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

### Running the Project
To start the development server, run:
```sh
npm start
```
This will start the app at `http://localhost:3000/`.

### Build for Production
To create a production build, use:
```sh
npm run build
```

## Project Structure
```
📂 src
 ┣ 📂 components
 ┃ ┣ 📂 Task
 ┃ ┃ ┗ 📜 TaskList.js
 ┃ ┣ 📂 layout
 ┃ ┃ ┗ 📜 Navbar.js
 ┃ ┣ 📂 shared-theme
 ┃ ┃ ┣ 📜 AppTheme.js
 ┃ ┃ ┗ 📜 ColorModeSelect.js
 ┣ 📂 services
 ┃ ┗ 📜 taskService.js
 ┣ 📂 pages
 ┃ ┗ 📜 Dashboard.js
 ┣ 📜 App.js
 ┗ 📜 index.js
```

## API Integration
The application fetches tasks from a backend API. Modify `taskService.js` to connect to your API.

## Contributing
1. Fork the repository.
2. Create a new branch (`feature-new-feature`).
3. Commit your changes.
4. Push to the branch.
5. Open a Pull Request.

## License
This project is licensed under the MIT License.

---
🚀 **Happy Coding!**


