# 🚀 Beholder Trading Bot v3.0

**Advanced Cryptocurrency Trading Bot with Risk Management, Backtesting & Paper Trading**

A professional-grade automated trading system for cryptocurrency markets with advanced risk management, comprehensive backtesting capabilities, and real-time market analysis.

[![Deploy Backend to Railway](https://img.shields.io/badge/Deploy%20Backend-Railway-blue)](https://railway.app)
[![Deploy Frontend to Vercel](https://img.shields.io/badge/Deploy%20Frontend-Vercel-black)](https://vercel.com)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-green)](https://nodejs.org)
[![PostgreSQL](https://img.shields.io/badge/database-PostgreSQL-blue)](https://postgresql.org)

## ✨ Features

### 🎯 Core Trading
- **Real-time Trading**: Execute trades on Binance with real-time market data
- **Paper Trading**: Risk-free simulation mode for testing strategies
- **Advanced Order Types**: Market, Limit, Stop-Loss, OCO orders
- **Multiple Strategies**: Technical indicators, custom automations, webhooks

### 📊 Risk Management
- **Portfolio Risk Analysis**: Real-time risk metrics and concentration analysis
- **Position Sizing**: Automatic position sizing based on risk parameters
- **Drawdown Control**: Maximum drawdown monitoring and alerts
- **Value at Risk (VaR)**: Statistical risk assessment tools
- **Risk Limits**: Configurable risk thresholds and safeguards

### 🔬 Backtesting
- **Visual Backtesting**: Historical strategy performance analysis
- **Multiple Strategies**: Test SMA crossover, RSI, Bollinger Bands, and custom strategies
- **Performance Metrics**: Sharpe ratio, profit factor, win rate calculations
- **Chart Analysis**: Visual trade execution and equity curves
- **Strategy Comparison**: Compare multiple backtest results

### 🛡️ Security & Performance
- **Rate Limiting**: API protection with configurable limits
- **Data Encryption**: AES encryption for sensitive data
- **Dark Mode**: Modern UI with dark/light theme toggle
- **Real-time Updates**: WebSocket connections for live data
- **Responsive Design**: Mobile-friendly interface

### 🔗 Integrations
- **TradingView Webhooks**: Execute trades from TradingView alerts
- **Telegram Notifications**: Real-time alerts and updates
- **Email Alerts**: Important event notifications
- **REST API**: Full API access for custom integrations

## 🚀 Quick Deploy

### Railway (Backend + Database)

1. **Fork this repository** to your GitHub account

2. **Create Railway Account** at [railway.app](https://railway.app)

3. **Deploy Backend:**
   ```bash
   # Connect your GitHub repo to Railway
   # Railway will auto-detect the backend and deploy
   ```

4. **Add PostgreSQL Database:**
   - Add PostgreSQL service in Railway
   - Railway automatically sets `DATABASE_URL`

5. **Set Environment Variables in Railway:**
   ```env
   NODE_ENV=production
   JWT_SECRET=your-super-secret-jwt-key-minimum-32-chars
   AES_KEY=your-32-character-aes-encryption-key
   DEFAULT_SETTINGS_ACCESS_KEY=your-binance-api-key
   DEFAULT_SETTINGS_SECRET_KEY=your-binance-secret-key
   DEFAULT_SETTINGS_EMAIL=your-email@example.com
   DEFAULT_SETTINGS_PWD=your-admin-password
   CORS_ORIGIN=https://your-vercel-domain.vercel.app
   ```

### Vercel (Frontend)

1. **Create Vercel Account** at [vercel.com](https://vercel.com)

2. **Import your GitHub repo** in Vercel

3. **Configure Build Settings:**
   - Framework Preset: `Create React App`
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `build`

4. **Set Environment Variables in Vercel:**
   ```env
   REACT_APP_API_URL=https://your-railway-domain.railway.app/api
   REACT_APP_WS_URL=wss://your-railway-domain.railway.app
   REACT_APP_VERSION=3.0.0
   REACT_APP_ENABLE_DARK_MODE=true
   REACT_APP_ENABLE_PAPER_TRADING=true
   REACT_APP_ENABLE_RISK_MANAGEMENT=true
   REACT_APP_ENABLE_BACKTESTING=true
   ```

5. **Deploy**: Vercel will automatically deploy on push to main branch

## 🔧 Local Development

### Prerequisites
- Node.js ≥ 18.0.0
- PostgreSQL 12+
- Binance API Keys

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your configuration
npm start
```

### Database Setup
```bash
cd backend
npm run createdb
npm run migratedb
npm run seeddb
```

## 📁 Project Structure

```
beholder/
├── backend/                 # Node.js API Server
│   ├── src/
│   │   ├── controllers/     # API Controllers
│   │   ├── models/         # Database Models
│   │   ├── services/       # Business Logic
│   │   ├── utils/          # Utilities
│   │   └── routers/        # API Routes
│   ├── migrations/         # Database Migrations
│   └── config/            # Configuration
│
├── frontend/               # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable Components
│   │   ├── private/        # Protected Pages
│   │   ├── services/       # API Services
│   │   └── public/         # Public Pages
│   └── public/            # Static Assets
│
└── .github/workflows/      # CI/CD Pipelines
```

## ⚠️ Disclaimer

**IMPORTANT**: This software is for educational and research purposes only. Cryptocurrency trading involves substantial risk of loss. The authors and contributors are not responsible for any financial losses incurred through the use of this software.

- Always test strategies in paper trading mode first
- Never invest more than you can afford to lose
- Past performance does not guarantee future results
- Use proper risk management techniques

---

**Built with ❤️ for the crypto trading community**