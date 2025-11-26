# Cube Hell - Cloud Deployment Guide

This guide explains how to deploy your cloud-based multiplayer Cube Hell game to various platforms.

## 🚀 Quick Start (Local Development)

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Server**
   ```bash
   npm start
   ```

3. **Open Your Browser**
   Navigate to `http://localhost:3000`

4. **Play the Game**
   - Open the game in two browser tabs/windows
   - One player clicks "host" and selects a color
   - Other player clicks "join" and selects the **same color**
   - Start shooting!

## ☁️ Cloud Deployment Options

### Option 1: Railway (Recommended)

Railway provides free hosting with automatic deployments.

1. **Create Account**: Visit [railway.app](https://railway.app)

2. **Deploy from GitHub**:
   ```bash
   # Push your code to GitHub first
   git push origin main
   ```

3. **Connect Repository**:
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Railway will auto-detect the `railway.json` configuration

4. **Access Your Game**:
   - Railway will provide a URL like `https://your-app.railway.app`
   - Share this URL with friends to play!

### Option 2: Render

1. **Create Account**: Visit [render.com](https://render.com)

2. **New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Render will use the `render.yaml` configuration

3. **Deploy**:
   - Click "Create Web Service"
   - Wait for deployment to complete

### Option 3: Heroku

1. **Install Heroku CLI**:
   ```bash
   npm install -g heroku
   ```

2. **Login and Create App**:
   ```bash
   heroku login
   heroku create your-cube-hell-game
   ```

3. **Deploy**:
   ```bash
   git push heroku main
   ```

4. **Open**:
   ```bash
   heroku open
   ```

### Option 4: Docker (Any Platform)

#### Using Docker Compose:
```bash
docker-compose up -d
```

#### Using Docker CLI:
```bash
# Build
docker build -t cube-hell .

# Run
docker run -p 3000:3000 cube-hell
```

#### Deploy to Cloud with Docker:
- **Google Cloud Run**: `gcloud run deploy`
- **AWS ECS/Fargate**: Upload to ECR and create service
- **Azure Container Instances**: `az container create`
- **DigitalOcean App Platform**: Connect GitHub repository

### Option 5: Vercel / Netlify (Static + Serverless)

For Vercel/Netlify, you'll need to use their serverless functions for the Socket.io server:

1. **Convert `server.js` to Serverless Function** (requires additional setup)
2. **Or** use a separate backend service (Railway/Render) for Socket.io
3. Deploy static files to Vercel/Netlify
4. Update `network-adapter.js` to point to your backend URL

## 🔧 Configuration

### Environment Variables

Set these in your deployment platform:

- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment (production/development)
- `CUBE_HELL_SERVER`: (Optional) Custom server URL for client

### Custom Server URL

If deploying the game client separately from the server:

1. Set environment variable:
   ```bash
   export CUBE_HELL_SERVER=https://your-server.com
   ```

2. Or add to your HTML before loading `network-adapter.js`:
   ```html
   <script>
     window.CUBE_HELL_SERVER = 'https://your-server.com';
   </script>
   ```

## 📊 Monitoring

### Health Check Endpoint

The server includes a built-in health check at `/` (root path).

```bash
curl https://your-app.railway.app/
```

### Server Logs

Check your platform's logging:
- **Railway**: Project → Deployments → Logs
- **Render**: Dashboard → Logs
- **Heroku**: `heroku logs --tail`
- **Docker**: `docker logs <container-id>`

## 🎮 Multiplayer Setup

### How Room Codes Work

The game uses color combinations as room codes:
- Players select checkboxes for colors (r, o, y, g, b, v)
- Selected colors create a unique room code (e.g., "rb" = red + blue)
- Both players must select **identical colors** to join the same room

### Scaling for Multiple Games

The Socket.io server supports unlimited simultaneous rooms. Each color combination is a separate game instance.

Possible room combinations: **63 unique rooms**
- Single colors: 6 rooms
- Two-color combos: 15 rooms
- Three-color combos: 20 rooms
- etc.

## 🔒 Security Considerations

1. **Rate Limiting**: Consider adding rate limiting for production
   ```bash
   npm install express-rate-limit
   ```

2. **CORS**: Adjust CORS settings in `server.js` for production:
   ```javascript
   cors: {
     origin: "https://yourdomain.com",
     methods: ["GET", "POST"]
   }
   ```

3. **HTTPS**: Most cloud platforms provide automatic HTTPS
   - Railway: ✅ Automatic
   - Render: ✅ Automatic
   - Heroku: ✅ Automatic

## 🐛 Troubleshooting

### Connection Issues

If players can't connect:

1. **Check Server Logs**: Look for Socket.io connection messages
2. **Verify Room Code**: Both players must use exact same colors
3. **Check CORS**: Browser console will show CORS errors
4. **Test Health**: Visit server URL to ensure it's running

### Game Performance

For better performance:
- Deploy server close to your players geographically
- Use a CDN for static assets
- Enable compression in `server.js`

### WebSocket Issues

If WebSockets are blocked:
- Socket.io automatically falls back to long-polling
- Ensure your hosting platform supports WebSockets
- Check firewall/proxy settings

## 📈 Next Steps

- **Add Authentication**: Integrate user accounts
- **Leaderboard**: Track scores across games
- **Chat System**: Add in-game chat
- **More Maps**: Create different arena configurations
- **Power-ups**: Add special abilities
- **Mobile Optimization**: Improve touch controls

## 🆘 Support

If you encounter issues:
1. Check server logs
2. Verify all environment variables
3. Test locally with `npm start`
4. Check GitHub Actions build status
5. Review Socket.io connection in browser DevTools

---

**Happy Gaming! 🎮**
