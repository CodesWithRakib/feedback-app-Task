# Feedback App

A modern web application for collecting and managing user feedback, built with **Next.js, React, and SQLite**.

## ✨ Features

- **Feedback Collection**: Users can submit feedback with their name, email, and message
- **Feedback Management**: View, update, and delete feedback entries
- **Persistent Storage**: Uses SQLite database for reliable data storage
- **Modern UI**: Clean and responsive interface built with Tailwind CSS
- **Real-time Notifications**: Toast notifications using Sonner
- **Confirmation Dialogs**: SweetAlert2 for user confirmations

## 🛠 Technologies Used

- **Frontend**: Next.js 15.5.3, React 19.1.0, React DOM 19.1.0
- **Styling**: Tailwind CSS 4
- **Database**: SQLite 5.1.1 with sqlite3 5.1.7
- **Notifications**: Sonner 2.0.7
- **Dialogs**: SweetAlert2 11.23.0
- **Development**: TypeScript 5, ESLint 9

## 🚀 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/CodesWithRakib/feedback-app-Task.git
   ```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open http://localhost:3000
   in your browser.

## 📖 Usage

**Running the Application**

1. Development with Turbopack:

```bash
npm run dev
```

2. Build for production:

```bash
npm run build
```

3. Start production server:

```bash
npm start
```

4. Run linting:

```bash
npm run init
```

## API Endpoints

**Feedback Collection**

- GET /api/feedback - Get all feedback entries

- POST /api/feedback - Create a new feedback entry

**Individual Feedback**

- GET /api/feedback/[id] - Get a specific feedback entry

- PUT /api/feedback/[id] - Update a feedback entry

- DELETE /api/feedback/[id] - Delete a feedback entry

## 📂 Project Structure

```bash
feedback-app/
├── app/
│ ├── api/
│ │ ├── feedback/
│ │ │ ├── route.ts # GET all feedback, POST new feedback
│ │ │ └── [id]/
│ │ │ └── route.ts # GET, PUT, DELETE specific feedback
│ ├── components/ # React components
│ ├── lib/
│ │ ├── database.ts # SQLite database setup
│ └── ...
├── public/ # Static assets
├── feedbacks.db # SQLite database file (created after first run)
├── next.config.ts # Next.js configuration
├── package.json # Project dependencies
└── README.md # Project documentation
```

## 🗄 Database

The app uses SQLite for persistence. The database file (feedbacks.db) is automatically created in the project root.

Schema:

- id (TEXT, PRIMARY KEY)

- name (TEXT, NOT NULL)

- email (TEXT, NOT NULL)

- feedback (TEXT, NOT NULL)

- createdAt (TEXT, NOT NULL)

- updatedAt (TEXT, NOT NULL)

## 🤝 Contributing

1. Fork the repository

2. Create a feature branch (git checkout -b feature/amazing-feature)

3. Commit changes (git commit -m 'Add amazing feature')

4. Push to branch (git push origin feature/amazing-feature)

5. Open a Pull Request

## 📬 Contact

For any questions or issues, please open an issue in the repository.
