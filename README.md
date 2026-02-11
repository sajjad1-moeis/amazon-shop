# Amazon Shop Frontend

فروشگاه آنلاین آمازون - فرانت‌اند Next.js با Docker و CI/CD

## 🚀 ویژگی‌ها

- **Next.js 16** با React 19
- **Docker** برای containerization
- **CI/CD** با GitHub Actions
- **TypeScript** پشتیبانی کامل
- **Tailwind CSS** برای استایل‌دهی
- **Responsive Design** برای همه دستگاه‌ها
- **SEO Optimized** بهینه‌سازی برای موتورهای جستجو

## 📋 پیش‌نیازها

- **Docker** و **Docker Compose**
- **Node.js** 20+ (برای توسعه محلی)
- **Git**

## 🛠️ راه‌اندازی سریع با Docker

### 1. کلون کردن پروژه

```bash
git clone <repository-url>
cd amazon-shop
```

### 2. تنظیم متغیرهای محیطی

```bash
# کپی کردن فایل مثال environment
cp ENV_EXAMPLE.txt .env

# ویرایش متغیرهای محیطی
nano .env
```

### 3. اجرای برنامه با Docker

```bash
# اجرای production version
docker-compose up -d

# یا برای development
docker-compose --profile dev up -d
```

### 4. دسترسی به برنامه

- **Production**: http://localhost:3000
- **Development**: http://localhost:3000

## 🏗️ ساخت و اجرای دستی

### نصب وابستگی‌ها

```bash
npm install
```

### اجرای development server

```bash
npm run dev
```

### ساخت برای production

```bash
npm run build
npm start
```

## 🐳 Docker Commands

### Production

```bash
# ساخت و اجرای container
docker-compose up -d

# مشاهده logs
docker-compose logs -f app

# متوقف کردن container
docker-compose down

# rebuild با cache پاک
docker-compose build --no-cache
```

### Development

```bash
# اجرای development environment
docker-compose --profile dev up -d

# متوقف کردن development
docker-compose --profile dev down
```

## 🚀 Deployment Script

برای سهولت deployment، از script آماده استفاده کنید:

```bash
# اجرای deployment script
./deploy.sh

# یا روی Windows
bash deploy.sh
```

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_BASE_URL` | آدرس API Backend | `https://amazon-shop.com` |
| `NODE_ENV` | محیط اجرا | `production` |
| `PORT` | پورت برنامه | `3000` |
| `HOSTNAME` | hostname برنامه | `0.0.0.0` |
| `NEXT_TELEMETRY_DISABLED` | غیرفعال کردن telemetry Next.js | `1` |

## 📦 CI/CD Pipeline

پروژه دارای GitHub Actions pipeline کامل است:

### Jobs موجود:

1. **Test & Lint**
   - بررسی syntax
   - اجرای تست‌ها
   - ساخت برنامه

2. **Build & Push**
   - ساخت Docker image
   - Push به GitHub Container Registry

3. **Deploy**
   - استقرار روی سرور production

4. **Security Scan**
   - بررسی آسیب‌پذیری‌ها با Trivy
   - Audit npm packages

### تنظیم Secrets برای CI/CD

در GitHub repository settings، موارد زیر را اضافه کنید:

```
DEPLOY_HOST=your-server-ip
DEPLOY_USER=your-server-user
DEPLOY_KEY=your-ssh-private-key
```

## 🏗️ ساختار پروژه

```
amazon-shop/
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # کامپوننت‌های reusable
│   ├── contexts/         # React Contexts
│   ├── hooks/           # Custom hooks
│   ├── lib/             # Utility libraries
│   ├── services/        # API services
│   └── styles/          # Global styles
├── public/              # Static assets
├── .github/
│   └── workflows/       # CI/CD workflows
├── docker-compose.yml   # Docker Compose config
├── Dockerfile          # Production Docker image
├── Dockerfile.dev      # Development Docker image
├── deploy.sh           # Deployment script
└── ENV_EXAMPLE.txt     # Environment variables template
```

## 🔒 امنیت

- **Non-root user** در Docker containers
- **Security headers** در Next.js config
- **Health checks** برای monitoring
- **Vulnerability scanning** در CI/CD

## 📊 Monitoring

### Health Check

```bash
# بررسی وضعیت container
docker-compose ps

# مشاهده logs
docker-compose logs -f app

# Health check endpoint
curl http://localhost:3000/api/health
```

## 🐛 Troubleshooting

### مشکلات رایج

1. **Port already in use**
   ```bash
   # تغییر پورت در docker-compose.yml
   ports:
     - "3001:3000"
   ```

2. **Permission denied on Windows**
   ```bash
   # اجرای با administrator privileges
   # یا استفاده از WSL
   ```

3. **Build fails**
   ```bash
   # پاک کردن cache
   docker system prune -a
   docker-compose build --no-cache
   ```

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

اگر سؤالی دارید یا مشکلی پیش آمد، لطفاً issue باز کنید یا با تیم توسعه تماس بگیرید.
