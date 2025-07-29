# Users Dashboard

A modern Vue 3 + Nuxt 3 application with Server Side Rendering (SSR), featuring user authentication, role-based access control, and a comprehensive user management system.

## Features

### 🔐 Authentication System
- Login with any user from the `users.json` file
- Persistent authentication using localStorage
- Role-based access control (Admin/User)
- Protected routes with middleware

### 📊 Dashboard
- Overview statistics (total users, admins, regular users)
- Quick action cards
- Responsive design with accessibility features

### 👥 Users Management (Admin Only)
- Comprehensive user table with all details (except passwords)
- Search functionality (by name or email)
- Country-based filtering
- Pagination (10 users per page)
- Responsive table design

### 🎨 UI/UX Features
- Modern, accessible design using Tailwind CSS
- Fully responsive layout
- Keyboard navigation support
- Screen reader friendly
- Mobile-first approach

### 🛠 Technical Features
- TypeScript for type safety
- Pinia for state management
- Server Side Rendering (SSR)
- Component-based architecture
- Middleware for route protection

### 🧪 Testing
- **Vitest** for unit testing
- Test coverage reporting
- Component testing with Vue Test Utils
- Store testing with Pinia
- API endpoint testing

### 🚀 API Endpoints
- **GET /api/users** - Fetch users with filtering and pagination
- **POST /api/auth/login** - User authentication
- **GET /api/stats** - Dashboard statistics

## Prerequisites

- Node.js 18+ 
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd users-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run generate` - Generate static site
- `npm run preview` - Preview production build
- `npm run test` - Run unit tests
- `npm run test:coverage` - Run tests with coverage report

## API Endpoints

### Authentication
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Users
```http
GET /api/users?search=john&country=United States&page=1&limit=10
```

### Statistics
```http
GET /api/stats
```

## Testing

### Running Tests
```bash
# Run all tests
npm run test

# Run tests with coverage
npm run test:coverage
```

## Sample Login Credentials

### Admin Users
- **Email:** john.doe@example.com
- **Password:** password123

- **Email:** mike.johnson@example.com
- **Password:** password123

- **Email:** lisa.garcia@example.com
- **Password:** password123

### Regular Users
- **Email:** jane.smith@example.com
- **Password:** password123

- **Email:** sarah.wilson@example.com
- **Password:** password123

## Key Components

### Authentication Store (`stores/auth.ts`)
- Manages user authentication state
- Handles login/logout functionality
- Provides role-based access control

### Users Store (`stores/users.ts`)
- Manages user data and filtering
- Handles pagination and search
- Provides country-based filtering

### API Endpoints (`server/api/`)
- RESTful API design
- Proper error handling
- Type-safe responses
- Query parameter support

### Middleware
- `auth.ts` - Protects routes requiring authentication
- `admin.ts` - Protects routes requiring admin privileges

### Pages
- `login.vue` - Authentication page
- `index.vue` - Dashboard with statistics
- `users.vue` - User management (admin only)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

### Adding New Users
Edit the `users.json` file to add new users:

```json
{
  "id": 13,
  "name": "New User",
  "email": "newuser@example.com",
  "password": "password123",
  "role": "user",
  "country": "United States",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

## Deployment

### Static Site Generation
```bash
npm run generate
```

### Server Deployment
```bash
npm run build
npm run preview
```

## License

This project is licensed under the MIT License.