# NEON VECTORS: Anti-Gravity Runner (10-SECTOR HELL PROTOCOL)

An unforgiving, ultra-fast twitch-reflex arcade physics game built in React 18, HTML5 Canvas, Tailwind CSS, and a procedural Web Audio API synthesizer.

![NEON VECTORS Banner](https://img.shields.io/badge/Difficulty-EXTREME%20DEMON-ff003c?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-00f3ff?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-6-a855f7?style=for-the-badge&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=for-the-badge&logo=tailwindcss)

---

## 🕹️ Controls & Survival Kit

| Keybind | Action | Description |
| :--- | :--- | :--- |
| **`Spacebar` / `W` / `Up` / `Left-Click`** | **Violent Gravity Inversion** | Instant polarity swap between Floor and Ceiling rails with high gravity (5400 px/s²) and terminal velocity (1440 px/s). |
| **Airborne Inversion** | **Chained Mid-Air Flip** | 1 orbital flip charge in mid-air. Resets upon touching rails OR collecting Jump/Data Orbs OR hitting Yellow Jump Pads. |
| **`Shift` Key** | **Ghost Phase Dash** | 0.25-second intangible phase dash on a 6-second cooldown to ghost through solid crushers or laser walls. |
| **`E` Key / `Right-Click`** | **EMP Supernova** | Charged by Orbs and Near-Misses (0% to 100%). Unleashes an expanding shockwave that vaporizes all on-screen traps for +350 pts each. |
| **`R` Key** | **Instant Respawn (0ms)** | Instant zero-delay restart like *Celeste* or *Hotline Miami*. Increments the live `ATTEMPT #` counter. |
| **`P` / `Esc`** | **Pause Simulation** | Opens tactical pause overlay. |

---

## ⚡ 12 Lethal Traps (Pattern Gauntlets)

Every single screen is packed with 8 to 14 active hazards simultaneously:
1. **Sawtooth Spike Slaloms:** 6 tightly spaced alternating floor and ceiling spikes (145px gap).
2. **The Pinch Gate (Needle Thread):** Simultaneous top and bottom giant laser spires leaving a 110px mid-air window.
3. **Spinning Plasma Buzzsaws:** High-RPM rotating sawblades moving on horizontal, vertical, and center patrol tracks.
4. **Hydraulic Crusher Pistons:** Industrial stamping blocks that telegraph with a red `!` warning laser line and slam shut violently.
5. **Shifting "Fake-Out" Spikes:** Spikes starting on the floor that rocket to the ceiling as the player approaches.
6. **Gravity-Inverter Laser Curtains:** Vertical neon beams that involuntarily force a gravity flip (`gravityDir *= -1`) right before spike hazards.
7. **Zero-G Vacuum Anomalies:** Translucent purple space rifts (0.04G) causing inertia drift toward obstacles.
8. **Black Hole Singularity Wells:** Dark pulsing singularity cores exerting radial gravity pull ($F = G/r^2$).
9. **Strobe Pulse Gates:** Full corridor-height energetic barriers cycling lethal/safe every 0.55s.
10. **Homing Seeker Mines:** Proximity tracking mines that lock onto the player's vertical $Y$ coordinate and thrust to intercept.
11. **Oscillating Drone Squadrons:** 3-drone V-formations flying in high-frequency sine waves with horizontal laser sights.
12. **Corridor Squeeze / Moving Walls:** Dynamic narrowing where ceiling and floor squeeze inward by 40% for 5 seconds.

---

## 🗺️ 10-Sector Campaign + Endless Mode

- **Sector 01: Boot Camp Hell** (800m | Speed: 11 | Cyan `#00f3ff`)
- **Sector 02: Buzzsaw Foundry** (1200m | Speed: 12.5 | Lime `#84cc16`)
- **Sector 03: Zero-G Guillotine** (1600m | Speed: 14 | Purple `#a855f7`)
- **Sector 04: Hydraulic Crush** (2000m | Speed: 15.5 | Amber `#f59e0b`)
- **Sector 05: Drone Hive** (2500m | Speed: 17 | Emerald `#10b981`)
- **Sector 06: Mind Scrambler** (3000m | Speed: 18.5 | Magenta `#ec4899`)
- **Sector 07: Claustrophobia** (3600m | Speed: 20 | Orange `#f97316`)
- **Sector 08: Event Horizon** (4200m | Speed: 21.5 | Indigo `#6366f1`)
- **Sector 09: Cyber Psychosis** (5000m | Speed: 23 | Rose `#f43f5e`)
- **Sector 10: OMEGA DEATHCORE** (6000m | Speed: 25 | Crimson `#ff003c`)
- **Endless Overdrive Mode:** Infinite distance with continuous acceleration into infinity.

---

## 🚀 Getting Started

### Local Setup
```bash
# Clone the repository
git clone https://github.com/KrishP69/neon-vectors-anti-gravity-runner.git
cd neon-vectors-anti-gravity-runner

# Install dependencies
npm install

# Run the local development server
npm run dev
```

### Build for Production
```bash
npm run build
npm run preview
```
Deployable directly on **Vercel** with zero configuration.
