# XSFL Broadcast Engine Simulator

A premium, fully autonomous 0-player web-based football simulation engine with real-time 3D broadcast rendering and comprehensive scoring logic.

## 🎮 Features

### Module I: Pre-Game Configuration Dashboard
- **Glassmorphic Dark Theme**: Premium dark interface with cyber-neon accents
- **Dual Team Configuration**:
  - Location Name, Team Name, 3-Letter Abbreviation
  - W-L-T Record tracking
  - Custom color picker (Primary & Secondary hex colors)
  - Dynamic logo upload with drag-and-drop
- **League Logo Management**: Global branding asset with watermark override
- **AI Weight Profiles**: Discrete sliders (1-99) for:
  - **Offense**: Passing aggression vs. conservative running
  - **Defense**: Coverage style and blitz frequency calibration
  - **Special Teams**: Field goal accuracy and blocking precision

### Module II: Stadium Broadcast Interface (HUD)
- **Jumbotron Scoreboard Panel**: 5x vertical-scaled scoreboard spanning bottom viewport
- **Play-by-Play Ticker**: Top-anchored obsidian-black panel
- **Control Suite**: PAUSE/PLAY, NEW GAME, STATS VIEW
- **Statistics Modal**: Track all game metrics

### Module III: 3D Field Physics & Camera System
- **Field Canvas**: Flat matte-black turf with yard lines
- **Player Models**: 22 on-field spheres (11v11) with color coding
- **Camera System**: Sideline broadcast angle with ball tracking

### Module IV: Mathematical Scoring Engine
- Touchdowns (7pts), Conversions (1-5pts), Field Goals (2-5pts)
- Upright Doink Rule, Defensive Scoring, Late-Game Comebacks
- Overtime Logic with modified point values

## 🚀 Quick Start

```bash
git clone https://github.com/commissionerxsfl-creator/xsflbroadcastenginesimulator.git
cd xsflbroadcastenginesimulator
npm install
npm run dev
```

Open `http://localhost:3000`

## 🛠️ Tech Stack
- React 18.2.0
- Three.js + @react-three/fiber
- Tailwind CSS 3.3.0
- Zustand 4.4.0
- Vite 4.4.0
