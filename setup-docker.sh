#!/bin/bash

echo "🐳 Setting up Docker for Snow Prompt Builder..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "📦 Installing Docker..."
    
    # Detect OS
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Ubuntu/Debian
        sudo apt update
        sudo apt install -y docker.io docker-compose
        sudo usermod -aG docker $USER
        sudo systemctl start docker
        sudo systemctl enable docker
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        if command -v brew &> /dev/null; then
            brew install --cask docker
        else
            echo "❌ Please install Homebrew first or download Docker Desktop manually"
            exit 1
        fi
    else
        echo "❌ Unsupported OS. Please install Docker manually"
        exit 1
    fi
else
    echo "✅ Docker is already installed"
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "📦 Installing Docker Compose..."
    sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
else
    echo "✅ Docker Compose is already installed"
fi

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local file..."
    cp .env.template .env.local
    echo "⚠️  Please edit .env.local with your API keys before running the app"
fi

echo ""
echo "🎉 Docker setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env.local with your API keys"
echo "2. Run: npm run docker:compose:build"
echo "3. Open: http://localhost:3000"
echo ""
echo "Available Docker commands:"
echo "  npm run docker:compose:up    - Start services"
echo "  npm run docker:compose:down  - Stop services"
echo "  npm run docker:compose:logs  - View logs"
echo "  npm run docker:clean         - Clean up resources"