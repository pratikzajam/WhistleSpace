# WhistleSpace - Anonymous Feedback Platform

WhistleSpace is a secure, anonymous feedback platform that enables organizations to foster transparency and trust through confidential communication channels.

## 🚀 Features

- **Anonymous Messaging**: Users can submit feedback without revealing their identity
- **Secure Authentication**: Separate portals for users and administrators
- **Real-time Updates**: Instant message delivery and notifications
- **Responsive Design**: Works seamlessly across all devices
- **Admin Dashboard**: Comprehensive tools for message management and analytics

## 🛠️ Tech Stack

- **Frontend**: React + Vite
- **UI Components**: TailwindCSS + Lucide React Icons
- **State Management**: React Context API
- **Authentication**: JWT
- **HTTP Client**: Axios
- **Notifications**: React Toastify

## 📦 Installation

1. Clone the repository:
```sh
git clone https://github.com/pratikzajam/WhistleSpace
cd whistleBlowerFrontend/vite-project
```

2. Install dependencies:
```sh
npm install
```

3. Start the development server:
```sh
npm run dev
```

## 🔑 Environment Variables

Create a `.env` file in the root directory:
```env
VITE_API_URL=https://whistlespace-backend.vercel.app
```

## 👥 User Types

### Admin
- Access the admin dashboard
- Monitor messages
- Generate secret codes
- View analytics

### Users
- Submit anonymous feedback
- View organization messages
- Manage personal settings

## 🔐 Authentication Flow

1. **Admin Authentication**:
   - Login with email and password
   - Access admin dashboard features

2. **User Authentication**:
   - Enter organization's secret code
   - Access user dashboard features

## 📱 Available Routes

- `/` - Landing page
- `/login` - Admin login
- `/userlogin` - User login
- `/signup` - Admin registration
- `/dashboard` - User dashboard
- `/adminDashboard` - Admin dashboard

## 🚀 Deployment

Build the project for production:
```sh
npm run build
```

The built files will be in the `dist` directory.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## 📄 License

[MIT License](LICENSE)

## 👏 Credits

Built with [React](https://react.dev/) and [Vite](https://vitejs.dev/)
