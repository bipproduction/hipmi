# HIPMI Project - QWEN.md

## Project Overview

HIPMI (Himpunan Pengusaha Muya Indonesia) is a comprehensive Next.js-based web application built for the Indonesian Young Entrepreneurs Association. The project is a sophisticated platform that provides multiple business functionalities including investment management, donations, events, job listings, forums, voting systems, and collaborative projects.

### Key Technologies
- **Framework**: Next.js 13+ (with App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS with Mantine UI components
- **Authentication**: JWT-based with custom middleware
- **Runtime**: Bun (instead of Node.js)
- **Deployment**: Standalone output configuration

### Team Structure
- **bagas**: Frontend, DevOps
- **lukman**: Frontend, UI
- **lia**: Backend, Frontend, QC
- **malik**: Leader

## Architecture & Features

### Core Modules
The application is organized into several major functional areas:

1. **Authentication System** (`/auth`) - Login, registration, validation
2. **Investment Platform** (`/investasi`) - Investment creation, trading, portfolio management
3. **Donation System** (`/donasi`) - Fundraising campaigns, donation processing
4. **Event Management** (`/event`) - Event creation, participation, management
5. **Voting System** (`/vote`) - Voting creation and participation
6. **Job Board** (`/job`) - Job posting and application system
7. **Forum** (`/forum`) - Discussion platform with reporting features
8. **Collaboration Platform** (`/colab`) - Project collaboration tools
9. **User Profiles** (`/profile`) - User profile management
10. **Business Maps** (`/maps`) - Business location mapping

### Admin Panel
The application includes a comprehensive admin panel (`/admin`) with modules for managing:
- Investment approvals and transfers
- Donation campaign reviews
- Event management
- Forum moderation
- Job posting reviews
- User access management
- Voting oversight

### Technical Architecture

#### Routing & Authentication
- Custom middleware handles authentication and authorization
- Public routes are defined in the middleware configuration
- JWT tokens are stored in cookies with secure options
- Role-based access control (MasterUserRole model)

#### Database Schema
The Prisma schema defines a comprehensive data model with:
- User management with roles and profiles
- Investment and financial systems
- Donation and crowdfunding features
- Event management
- Forum and discussion systems
- Collaboration platforms
- Notification systems
- Business mapping features

#### Environment Configuration
The application uses multiple environment files for different deployment stages:
- Development: `run.env.dev`, `run.env.local.dev`
- Build: `run.env.build.dev`, `run.env.build.local`
- Runtime: `run.env.start.dev`, `run.env.start.local`

## Building and Running

### Prerequisites
- Bun runtime installed
- PostgreSQL database
- Required environment variables configured

### Setup Commands
```bash
# Install dependencies
bun install

# Setup database (Prisma)
bun prisma generate
bun prisma db push
bun prisma db seed

# Development server
bun run dev

# Build for production
bun run build

# Start production server
bun run start
```

### Development Scripts
- `dev`: Starts development server with HTTPS
- `build`: Builds the application for production
- `start`: Starts the production server
- `lint`: Runs Next.js linting
- `ver`: Creates version tags

## Development Conventions

### Git Workflow
The team follows a structured Git workflow:
1. Check status with `git status`
2. Add specific files with `git add <file>` (avoid `git add -A`)
3. Commit with structured messages following conventional commits:
   - `feat`: New features
   - `fix`: Bug fixes
   - `docs`: Documentation updates
   - `chore`: Routine tasks
   - `refactor`: Code restructuring
   - `test`: Testing additions
   - `style`: Styling changes
   - `perf`: Performance improvements

### Code Standards
- TypeScript with strict mode enabled
- Component header comments with file description, creator, date
- Function comments with parameter and return value descriptions
- Custom type interface comments
- Error handling comments
- Complex logic comments

### Commit Message Format
```
type: Short description

Body:
- Detailed description of changes
- Motivation for changes
- Breaking changes if any

References: #issue-number
```

## Project Structure

### Main Directories
- `src/app`: Next.js App Router pages and layouts
- `src/app_modules`: Reusable application modules
- `src/lib`: Shared libraries and utilities
- `src/util`: Utility functions
- `prisma`: Database schema and migrations
- `public`: Static assets
- `certificates`, `logs`: Application data directories

### Key Files
- `package.json`: Dependencies and scripts
- `next.config.js`: Next.js configuration
- `middleware.tsx`: Authentication and routing middleware
- `tsconfig.json`: TypeScript configuration
- `tailwind.config.js`: Styling configuration
- `gen_page.tsx`: Generated page routing utility
- `prisma/schema.prisma`: Database schema definition

## Special Features

### Real-time Capabilities
- WebSocket integration for real-time updates
- MQTT support for messaging
- Live notifications system

### Payment Integration
- Midtrans payment gateway for investments
- Multiple payment methods
- Invoice generation and tracking

### File Handling
- PDF generation and viewing
- Image processing and storage
- Document management for investments

### Mobile Support
- Responsive design
- Mobile-specific features
- Device token management

## Security Measures

### Authentication
- JWT-based authentication
- Session management
- Role-based access control
- Secure token storage in cookies

### Input Validation
- Prisma schema validations
- Server-side validation
- Sanitization of user inputs

### Data Protection
- Encrypted tokens
- Secure API routes
- Proper CORS configuration