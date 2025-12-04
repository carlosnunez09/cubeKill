# Cube Hell 🎮

**Cloud-Based Multiplayer Bullet Hell Game**

Cube Hell is an intense multiplayer shooting game built with p5.js. Battle against friends in physics-based arenas where boxes fly and bullets rain! Now powered by cloud infrastructure for seamless online multiplayer.

![image](https://github.com/carlosnunez09/cubeKill/assets/80909466/b7b7c60e-7414-4784-a5a9-350c7404c187)
![image](https://github.com/carlosnunez09/cubeKill/assets/80909466/5584ea3f-ff0d-44ae-a88d-e8f6b6dc576b)

## ✨ Features

- 🌐 **Cloud-Based Multiplayer**: Play with anyone, anywhere
- 📱 **Mobile & Desktop Support**: Touch controls for mobile, keyboard/mouse for desktop
- ⚡ **Real-Time Physics**: Dynamic box interactions and bullet physics
- 🎯 **Competitive Scoring**: Track kills across rounds
- 🔒 **Private Rooms**: Use color codes to create private game sessions
- 🚀 **Fast & Responsive**: Optimized Socket.io networking

## 🚀 Quick Start

### Run Locally

```bash
# Install dependencies
npm install

# Start the server
npm start

# Open http://localhost:3000 in your browser
```

### Play Online

1. Open the game in two browser windows
2. **Player 1**: Click "host" and select color(s)
3. **Player 2**: Click "join" and select the **same color(s)**
4. Battle begins! Shoot the moving cubes to score points

## 🎮 How to Play

**Desktop Controls:**
- Arrow keys: Move
- Mouse: Aim
- Click: Shoot

**Mobile Controls:**
- Left joystick: Move
- Right joystick: Aim
- Button: Shoot

**Objective:**
- Shoot your opponent when they're hit by flying boxes
- Avoid getting hit yourself
- First to score wins!

## ☁️ Deploy to Cloud

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

**Quick Deploy Options:**
- Render
- Heroku
- Docker
- Google Cloud Run
- AWS, Azure, DigitalOcean

## 🛠️ Tech Stack

- **Frontend**: p5.js, p5.play
- **Networking**: Socket.io (WebSocket)
- **Backend**: Node.js, Express
- **Physics**: Planck.js
- **Mobile**: p5.touchgui
- **PWA**: Service Worker support

## 📦 Project Structure

```
cube-hell/
├── server.js              # Socket.io server
├── network-adapter.js     # Cloud networking layer
├── sketch.js              # Game logic (p5.js)
├── index.html             # Game client
├── package.json           # Dependencies
├── Dockerfile             # Container config
├── docker-compose.yml     # Docker orchestration
├── .github/workflows/     # CI/CD pipelines
│   └── ci.yml            # Automated testing & deployment
└── DEPLOYMENT.md          # Deployment guide
```

## 🔧 Development

```bash
# Install dependencies
npm install

# Run in development mode with auto-reload
npm run dev

# Lint code
npm run lint

# Run tests
npm test
```

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📄 License

MIT License - feel free to use this project for learning or your own games!

## 🎯 Future Enhancements

- [ ] User authentication
- [ ] Global leaderboard
- [ ] Multiple arena maps
- [ ] Power-ups and special abilities
- [ ] In-game chat
- [ ] Spectator mode
- [ ] Tournament system

---

**Built with ❤️ using p5.js and Socket.io**


