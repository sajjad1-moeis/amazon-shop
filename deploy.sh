#!/bin/bash

# ============================================
# Amazon Shop Next.js Frontend - Deployment Script
# ============================================

set -e  # Exit on error

echo "🚀 Starting Amazon Shop Frontend Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if .env file exists
if [ ! -f .env ]; then
    echo -e "${YELLOW}⚠️  .env file not found!${NC}"
    echo "Creating .env from ENV_EXAMPLE.txt..."
    if [ -f ENV_EXAMPLE.txt ]; then
        cp ENV_EXAMPLE.txt .env
        echo -e "${GREEN}✅ .env file created. Please edit it with your configuration.${NC}"
    else
        echo -e "${RED}❌ ENV_EXAMPLE.txt not found!${NC}"
        exit 1
    fi
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed!${NC}"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo -e "${RED}❌ Docker Compose is not installed!${NC}"
    exit 1
fi

# Function to check if container is running
check_container() {
    if docker ps | grep -q "amazon-shop-app"; then
        return 0
    else
        return 1
    fi
}

# Function to stop existing container
stop_container() {
    echo -e "${YELLOW}🛑 Stopping existing container...${NC}"
    docker-compose down 2>/dev/null || true
}

# Function to build and start
build_and_start() {
    echo -e "${GREEN}🔨 Building Docker image...${NC}"
    docker-compose build --no-cache

    echo -e "${GREEN}🚀 Starting container...${NC}"
    docker-compose up -d

    echo -e "${GREEN}⏳ Waiting for container to be healthy...${NC}"
    sleep 10

    # Check if container is running
    if check_container; then
        echo -e "${GREEN}✅ Container is running!${NC}"
        echo ""
        echo "📊 Container Status:"
        docker-compose ps
        echo ""
        echo "📝 Recent Logs:"
        docker-compose logs --tail=20 app
        echo ""
        echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
        echo ""
        echo "🌐 Your application should be available at:"
        echo "   http://localhost:3000"
        echo ""
        echo "📋 Useful commands:"
        echo "   View logs:    docker-compose logs -f app"
        echo "   Stop:         docker-compose down"
        echo "   Restart:       docker-compose restart app"
    else
        echo -e "${RED}❌ Container failed to start!${NC}"
        echo "📝 Checking logs..."
        docker-compose logs app
        exit 1
    fi
}

# Main deployment flow
echo ""
echo "=========================================="
echo "  Amazon Shop Frontend Deployment"
echo "=========================================="
echo ""

# Ask user what to do
if check_container; then
    echo -e "${YELLOW}⚠️  Container is already running!${NC}"
    read -p "Do you want to rebuild and restart? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        stop_container
        build_and_start
    else
        echo "Keeping existing container running."
        docker-compose ps
    fi
else
    build_and_start
fi

echo ""
echo "=========================================="
echo "  Deployment Complete!"
echo "=========================================="
