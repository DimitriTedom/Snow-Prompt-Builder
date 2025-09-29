# 🌨️ Snow Prompt Builder

> Discover, generate, and share AI‑powered prompts with community‑suggested tags.

[![Next.js](https://img.shields.io/badge/Next.js-15.3.2-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green)](https://mongodb.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.16.2-purple)](https://prisma.io/)
[![Docker](https://img.shields.io/badge/Docker-Supported-blue)](https://docker.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

An open‑source AI prompting tool to discover, create and share creative prompts. Snow Prompt Builder leverages Next.js, NextAuth, MongoDB with Prisma ORM and the Groq LLM API (llama-3.3-70b-versatile) to let users auto‑generate and save AI prompts with tags.

<p align="center">
  <img src="./public/assets/images/preview.png" alt="Snow Prompt Builder preview" />
</p>

---

## 🛠️ Features

- **User Authentication** via NextAuth (Google)
- **Generate Prompts** by describing what you want—AI returns a fully‑crafted prompt + suggested tags
- **Create & Save** prompts to your personal profile
- **Browse & Search** community‑shared prompts
- **Responsive**, dark‑mode‑inspired UI built with Tailwind CSS
- **Type-safe database** operations with Prisma ORM and MongoDB
- **🐳 Docker Support** - Easy deployment with Docker and Docker Compose

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.0.0 or higher
- **npm** or **bun** package manager
- **MongoDB** database (local or cloud)
- **Google OAuth** credentials
- **Groq API** key

### Installation Options

#### Option 1: Docker (Recommended) 🐳

1. **Clone the repository**
```bash
git clone https://github.com/DimitriTedom/Snow-Prompt-Builder.git
cd Snow-Prompt-Builder
```

2. **Install Docker & Docker Compose**

**On Ubuntu/Debian:**
```bash
# Update package index
sudo apt update

# Install Docker
sudo apt install docker.io docker-compose

# Add your user to docker group
sudo usermod -aG docker $USER

# Start Docker service
sudo systemctl start docker
sudo systemctl enable docker

# Verify installation
docker --version
docker-compose --version
```

**On macOS:**
```bash
# Using Homebrew
brew install --cask docker

# Or download Docker Desktop from https://docker.com/products/docker-desktop
```

**On Windows:**
```bash
# Download Docker Desktop from https://docker.com/products/docker-desktop
# Or use Chocolatey
choco install docker-desktop
```

**Or use the setup script:**
```bash
# Make script executable and run
chmod +x setup-docker.sh
./setup-docker.sh
```

3. **Set up environment variables**
```bash
# Copy the environment template
cp .env.template .env.local

# Edit the file with your credentials
nano .env.local
```

4. **Configure your `.env.local`**
```env
# Google OAuth (Get from https://console.developers.google.com)
GOOGLE_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# MongoDB (automatically configured for Docker)
DATABASE_URL=mongodb://admin:password123@mongodb:27017/snow_prompt_builder?authSource=admin&retryWrites=true&w=majority

# NextAuth Configuration
NEXTAUTH_SECRET=your_super_secret_nextauth_key_here
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_URL_INTERNAL=http://localhost:3000

# Groq API (Get from https://console.groq.com)
GROQ_API_KEY=your_groq_api_key_here
```

5. **Run with Docker Compose**
```bash
# Build and start all services
npm run docker:compose:build

# Or manually
docker-compose up --build -d

# View logs
npm run docker:compose:logs
```

6. **Access the application**
   - Open http://localhost:3000 in your browser
   - MongoDB will be available at localhost:27017

#### Option 2: Local Development 💻

1. **Clone and install dependencies**

```bash
git clone https://github.com/DimitriTedom/Snow-Prompt-Builder.git
cd Snow-Prompt-Builder
```

2. **Install dependencies**

Use your favorite package manager:

```bash
# npm
npm install

# Yarn
yarn install

# pnpm
pnpm install

# bun
bun install
```

3. **Set up environment variables**
```bash
cp .env.template .env.local
# Edit .env.local with your credentials
```

4. **Set up the database**
```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Optional: Open Prisma Studio
npm run db:studio
```

5. **Run the development server**
```bash
npm run dev
```

## 🐳 Docker Commands

### Development
```bash
# Build Docker image
npm run docker:build

# Run container
npm run docker:run

# Build and start with Docker Compose
npm run docker:compose:build

# Start services
npm run docker:compose:up

# Stop services
npm run docker:compose:down

# View logs
npm run docker:compose:logs

# Clean up Docker resources
npm run docker:clean
```

### Production Deployment
```bash
# Build for production
docker build -t snow-prompt-builder:prod .

# Run production container
docker run -d \
  -p 3000:3000 \
  --name snow-prompt-app \
  --env-file .env.local \
  snow-prompt-builder:prod
```

## 🛠️ Database Management

### Prisma Commands
```bash
# Generate Prisma client
npm run db:generate

# Push schema changes to database
npm run db:push

# Create and apply migrations
npm run db:migrate

# Open Prisma Studio (Database GUI)
npm run db:studio

# Reset database (⚠️ Destructive)
npx prisma db push --force-reset
```

### MongoDB with Docker
```bash
# Connect to MongoDB container
docker exec -it snow-prompt-mongodb mongosh

# Backup database
docker exec snow-prompt-mongodb mongodump --out /backup

# Restore database
docker exec snow-prompt-mongodb mongorestore /backup
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `GOOGLE_ID` | Google OAuth Client ID | ✅ | - |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret | ✅ | - |
| `DATABASE_URL` | MongoDB connection string | ✅ | - |
| `NEXTAUTH_SECRET` | NextAuth.js secret key | ✅ | - |
| `NEXTAUTH_URL` | Application URL | ✅ | `http://localhost:3000` |
| `GROQ_API_KEY` | Groq LLM API key | ✅ | - |

### Getting API Keys

1. **Google OAuth Setup:**
   - Go to [Google Cloud Console](https://console.developers.google.com)
   - Create a new project or select existing one
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`

2. **Groq API Setup:**
   - Visit [Groq Console](https://console.groq.com)
   - Sign up for an account
   - Generate an API key
   - Copy the key to your `.env.local`

3. **MongoDB Setup:**
   - **Local:** Install MongoDB locally or use Docker
   - **Cloud:** Use [MongoDB Atlas](https://mongodb.com/atlas) for free cloud database

```bash
# npm
npm run build
npm start

# Yarn
yarn build
yarn start

# pnpm
pnpm build
pnpm start

# bun
bun build
bun start
```

---

---

## 📁 Project Structure

```
Snow-Prompt-Builder/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── auth/                 # NextAuth.js configuration
│   │   ├── prompt/               # Prompt CRUD operations
│   │   ├── users/                # User-related endpoints
│   │   └── generate-prompt/      # AI prompt generation
│   ├── create-prompt/            # Create prompt page
│   ├── generate-prompt/          # AI generation page
│   ├── profile/                  # User profile page
│   ├── update-prompt/            # Edit prompt page
│   ├── layout.jsx                # Root layout
│   └── page.jsx                  # Home page
├── components/                   # Reusable components
│   ├── Nav.jsx                   # Navigation bar
│   ├── Feed.jsx                  # Prompt feed
│   ├── Form.jsx                  # Prompt form
│   ├── Profile.jsx               # Profile component
│   ├── PromptCard.jsx            # Individual prompt card
│   └── Provider.jsx              # NextAuth provider
├── lib/                          # Utility libraries
│   └── prisma.js                 # Prisma client configuration
├── prisma/                       # Database schema and migrations
│   └── schema.prisma             # Database schema
├── public/                       # Static assets
├── styles/                       # CSS styles
│   └── globals.css               # Global styles with Tailwind
├── docker-compose.yml            # Docker Compose configuration
├── Dockerfile                    # Docker image configuration
├── mongo-init.js                 # MongoDB initialization script
├── setup-docker.sh               # Docker setup automation
├── next.config.mjs               # Next.js configuration
├── package.json                  # Dependencies and scripts
├── tailwind.config.js            # Tailwind CSS configuration
└── README.md                     # Project documentation
```

---

## 🚀 Deployment

### Docker Production Deployment

1. **Build production image**
```bash
docker build -t snow-prompt-builder:latest .
```

2. **Deploy with Docker Compose**
```bash
# Start production services
docker-compose up -d
```

3. **Deploy to cloud platforms**
   - **AWS:** Use ECS or EC2 with Docker
   - **DigitalOcean:** Use App Platform or Droplets
   - **Google Cloud:** Use Cloud Run or GKE
   - **Azure:** Use Container Instances or AKS

### Vercel Deployment (Alternative)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

---

## 🔍 Troubleshooting

### Common Docker Issues

1. **Permission denied accessing Docker**
```bash
sudo usermod -aG docker $USER
newgrp docker
```

2. **Port already in use**
```bash
# Check what's using port 3000
sudo lsof -i :3000

# Kill the process
sudo kill -9 <PID>
```

3. **Database connection issues**
```bash
# Check if MongoDB container is running
docker ps

# View MongoDB logs
docker logs snow-prompt-mongodb

# Restart containers
docker-compose restart
```

### Database Issues

1. **Prisma client not generated**
```bash
npm run db:generate
```

2. **Schema not synced**
```bash
npm run db:push
```

3. **Clear database and restart**
```bash
docker-compose down -v
docker-compose up -d
```

---

## 🔧 Tech Stack

- **Frontend:** Next.js 15, React 19, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** MongoDB with Prisma ORM
- **Authentication:** NextAuth.js (Google OAuth)
- **AI Integration:** Groq API (Llama 3.3-70B)
- **Deployment:** Docker, Vercel-ready
- **Containerization:** Docker & Docker Compose

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please follow the [conventional commits](https://www.conventionalcommits.org/) style.

---

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/DimitriTedom/Snow-Prompt-Builder/issues) page
2. Create a new issue with detailed information
3. Review the troubleshooting section above

---

## 📜 License

This project is open source under the [MIT License](./LICENSE).

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Prisma](https://prisma.io/) for the excellent database toolkit
- [Groq](https://groq.com/) for lightning-fast LLM inference
- [MongoDB](https://mongodb.com/) for the flexible database
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

---

<div align="center">
  <p>Built with ❤️ by <a href="https://github.com/DimitriTedom">Dimitri Tedom</a></p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
