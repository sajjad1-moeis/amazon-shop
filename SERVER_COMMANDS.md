# دستورات سرور لینوکس - به ترتیب

## مرحله 1: نصب Docker

```bash
sudo apt update
sudo apt install -y ca-certificates curl gnupg lsb-release
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo usermod -aG docker $USER
newgrp docker
docker --version
docker compose version
```

## مرحله 2: نصب Git

```bash
sudo apt install -y git
git --version
```

## مرحله 3: Clone پروژه

```bash
mkdir -p /root/amazon-shop-frontend
cd /root/amazon-shop-frontend
git clone https://github.com/sajjad1-moeis/amazon-shop.git .
```

## مرحله 4: Build و Run

```bash
cd /root/amazon-shop-frontend
docker compose build --no-cache
docker compose up -d
```

## مرحله 5: بررسی وضعیت

```bash
docker compose ps
docker compose logs -f app
```

## دستورات مفید

```bash
# Restart
docker compose restart app

# توقف
docker compose down

# مشاهده لاگ
docker compose logs -f app

# Rebuild بعد از تغییرات
cd /root/amazon-shop-frontend
git pull origin master
docker compose build --no-cache
docker compose up -d
```
