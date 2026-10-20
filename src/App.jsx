import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Volume2,
  VolumeX,
  Play,
  RotateCcw,
  Zap,
  Shield,
  Clock,
  Magnet,
  Trophy,
  ChevronRight,
  Pause,
  Tv,
  Award,
  Sparkles,
  Flame,
  Ghost,
  Skull,
  Unlock,
  Lock,
  AlertTriangle
} from 'lucide-react';

/* =========================================================================
   10-SECTOR HELL PROTOCOL CAMPAIGN CONFIGURATION
   ========================================================================= */
const SECTORS = [
  {
    id: 1,
    code: 'SEC-01',
    name: 'Boot Camp Hell',
    subtitle: 'Rhythm Calibrator',
    targetDistance: 800,
    baseSpeed: 11, // 660 px/s
    themeColor: '#00f3ff', // Cyan
    accentGlow: 'rgba(0, 243, 255, 0.5)',
    bgGradient: ['#020814', '#041226', '#010610'],
    description: 'Sawtooth spike slaloms, dual spike clusters, and sub-second rhythm flips.',
  },
  {
    id: 2,
    code: 'SEC-02',
    name: 'Buzzsaw Foundry',
    subtitle: 'Plasma Shredder',
    targetDistance: 1200,
    baseSpeed: 12.5, // 750 px/s
    themeColor: '#84cc16', // Lime
    accentGlow: 'rgba(132, 204, 22, 0.5)',
    bgGradient: ['#051203', '#0e2608', '#030d02'],
    description: 'High-RPM rotating plasma buzzsaws moving on vertical and horizontal rails.',
  },
  {
    id: 3,
    code: 'SEC-03',
    name: 'Zero-G Guillotine',
    subtitle: 'Vacuum Abyss',
    targetDistance: 1600,
    baseSpeed: 14, // 840 px/s
    themeColor: '#a855f7', // Purple
    accentGlow: 'rgba(168, 85, 247, 0.5)',
    bgGradient: ['#0d031c', '#1e073d', '#080112'],
    description: 'Zero-G vacuum distortion fields (0.04G) paired with tight center Pinch Gates.',
  },
  {
    id: 4,
    code: 'SEC-04',
    name: 'Hydraulic Crush',
    subtitle: 'Piston Guillotine',
    targetDistance: 2000,
    baseSpeed: 15.5, // 930 px/s
    themeColor: '#f59e0b', // Amber
    accentGlow: 'rgba(245, 158, 11, 0.5)',
    bgGradient: ['#170c02', '#2e1805', '#100701'],
    description: 'Violently slamming hydraulic crusher pistons and cycling Strobe Pulse gates.',
  },
  {
    id: 5,
    code: 'SEC-05',
    name: 'Drone Hive',
    subtitle: 'Predator Skies',
    targetDistance: 2500,
    baseSpeed: 17, // 1020 px/s
    themeColor: '#10b981', // Emerald
    accentGlow: 'rgba(16, 185, 129, 0.5)',
    bgGradient: ['#02140d', '#052b1b', '#010f09'],
    description: '3-Drone oscillating squadrons and aggressive vertical-tracking Homing Mines.',
  },
  {
    id: 6,
    code: 'SEC-06',
    name: 'Mind Scrambler',
    subtitle: 'Inversion Shock',
    targetDistance: 3000,
    baseSpeed: 18.5, // 1110 px/s
    themeColor: '#ec4899', // Magenta
    accentGlow: 'rgba(236, 72, 153, 0.5)',
    bgGradient: ['#1a0312', '#360624', '#12010c'],
    description: 'Forced Gravity-Inverter Laser Curtains right before fake-out shifting spikes.',
  },
  {
    id: 7,
    code: 'SEC-07',
    name: 'Claustrophobia',
    subtitle: 'Pinch Protocol',
    targetDistance: 3600,
    baseSpeed: 20, // 1200 px/s
    themeColor: '#f97316', // Orange
    accentGlow: 'rgba(249, 115, 22, 0.5)',
    bgGradient: ['#1a0a02', '#361505', '#120601'],
    description: 'Corridor walls squeeze 40% narrower while navigating needle Pinch Gates.',
  },
  {
    id: 8,
    code: 'SEC-08',
    name: 'Event Horizon',
    subtitle: 'Singularity Well',
    targetDistance: 4200,
    baseSpeed: 21.5, // 1290 px/s
    themeColor: '#6366f1', // Indigo
    accentGlow: 'rgba(99, 102, 241, 0.5)',
    bgGradient: ['#06081c', '#0f143d', '#030412'],
    description: 'Dark Black Hole singularity cores exerting heavy gravitational pull on rails.',
  },
  {
    id: 9,
    code: 'SEC-09',
    name: 'Cyber Psychosis',
    subtitle: 'Total Sensory Warp',
    targetDistance: 5000,
    baseSpeed: 23, // 1380 px/s
    themeColor: '#f43f5e', // Rose
    accentGlow: 'rgba(244, 63, 94, 0.5)',
    bgGradient: ['#1c0309', '#3b0614', '#120105'],
    description: 'Maximum density gauntlets chaining Inverter Curtains, Crushers, and Fake-Outs.',
  },
  {
    id: 10,
    code: 'SEC-10',
    name: 'OMEGA DEATHCORE',
    subtitle: 'Relentless Bullet-Hell',
    targetDistance: 6000,
    baseSpeed: 25, // 1500 px/s
    themeColor: '#ff003c', // Blood Crimson
    accentGlow: 'rgba(255, 0, 60, 0.6)',
    bgGradient: ['#1c0006', '#3b000d', '#120004'],
    description: 'All 12 lethal traps chained in seamless extreme demon gauntlets. Pure twitch reflex.',
  },
  {
    id: 11,
    code: 'ENDLESS',
    name: 'Endless Overdrive',
    subtitle: 'Infinite Hell',
    targetDistance: Infinity,
    baseSpeed: 18,
    themeColor: '#e0e7ff',
    accentGlow: 'rgba(224, 231, 255, 0.5)',
    bgGradient: ['#050510', '#111827', '#020208'],
    description: 'Infinite distance. Speed accelerates continuously. All 12 traps active.',
  }
];

/* =========================================================================
   DYNAMIC DIFFICULTY SELECTOR CONFIGURATION (4 TIERS)
   ========================================================================= */
export const DIFFICULTY_CONFIG = {
  EASY: {
    key: 'EASY',
    name: 'EASY',
    label: 'Chill / Casual',
    speedMultiplier: 0.65,
    minGap: 420,
    maxGap: 580,
    maxMidAirCharges: 2,
    startShieldTime: 15,
    color: '#10b981', // Emerald
    badgeClass: 'border-emerald-500/60 bg-emerald-500/15 text-emerald-400',
    glowClass: 'shadow-[0_0_15px_rgba(16,185,129,0.35)]',
    description: 'Casual speed, generous 450px+ gaps, 2 mid-air flips, free starting shield & simple traps.',
    tag: '2 Mid-Air Flips + Shield',
  },
  NORMAL: {
    key: 'NORMAL',
    name: 'NORMAL',
    label: 'Balanced Arcade',
    speedMultiplier: 0.85,
    minGap: 300,
    maxGap: 440,
    maxMidAirCharges: 1,
    startShieldTime: 0,
    color: '#00f3ff', // Cyan
    badgeClass: 'border-cyan-500/60 bg-cyan-500/15 text-cyan-400',
    glowClass: 'shadow-[0_0_15px_rgba(0,243,255,0.35)]',
    description: 'Fun & rhythmic challenge with progressive sector trap unlocks and fair reaction windows.',
    tag: 'Progressive Traps (Default)',
  },
  HARD: {
    key: 'HARD',
    name: 'HARD',
    label: 'Veteran Reflex',
    speedMultiplier: 1.05,
    minGap: 220,
    maxGap: 330,
    maxMidAirCharges: 1,
    startShieldTime: 0,
    color: '#f59e0b', // Amber
    badgeClass: 'border-amber-500/60 bg-amber-500/15 text-amber-400',
    glowClass: 'shadow-[0_0_15px_rgba(245,158,11,0.35)]',
    description: 'Chained gauntlets and faster drones with 0.5s telegraph warnings before moving traps.',
    tag: '0.5s Telegraph Warnings',
  },
  HELL: {
    key: 'HELL',
    name: 'HELL',
    label: 'Nightmare Protocol',
    speedMultiplier: 1.30,
    minGap: 150,
    maxGap: 230,
    maxMidAirCharges: 1,
    startShieldTime: 0,
    color: '#ff003c', // Blood Crimson
    badgeClass: 'border-rose-500/70 bg-rose-500/20 text-rose-400',
    glowClass: 'shadow-[0_0_18px_rgba(255,0,60,0.45)]',
    description: 'All 12 lethal traps active from Sector 01 at extreme demon density. Pure twitch reflex.',
    tag: 'Extreme Demon Gauntlet',
  },
};

/* =========================================================================
   PROCEDURAL WEB AUDIO SYNTHESIZER
   ========================================================================= */
class HellAudioEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setMuted(muted) {
    this.muted = muted;
  }

  playFlip(isUp) {
    if (this.muted || !this.ctx) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    if (isUp) {
      osc.frequency.setValueAtTime(280, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
    } else {
      osc.frequency.setValueAtTime(820, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.12);
    }

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.15);
  }

  playMidAirFlip() {
    if (this.muted || !this.ctx) return;
    this.init();
    const now = this.ctx.currentTime;
    [600, 1100].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.03);
      gain.gain.setValueAtTime(0.18, now + idx * 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.03 + 0.1);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.03);
      osc.stop(now + idx * 0.03 + 0.11);
    });
  }

  playJumpPad() {
    if (this.muted || !this.ctx) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(1280, now + 0.18);
    gain.gain.setValueAtTime(0.28, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.22);
  }

  playLand() {
    if (this.muted || !this.ctx) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.07);
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.09);
  }

  playNearMiss() {
    if (this.muted || !this.ctx) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(350, now + 0.15);
    gain.gain.setValueAtTime(0.22, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.17);
  }

  playGhostDash() {
    if (this.muted || !this.ctx) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.linearRampToValueAtTime(900, now + 0.2);
    gain.gain.setValueAtTime(0.16, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.23);
  }

  playInverterZap() {
    if (this.muted || !this.ctx) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(1400, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.18);
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.22);
  }

  playPistonSlam() {
    if (this.muted || !this.ctx) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(90, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.25);
    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.3);
  }

  playEMP() {
    if (this.muted || !this.ctx) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(130, now);
    osc.frequency.exponentialRampToValueAtTime(26, now + 0.7);
    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.75);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.78);
  }

  playCrash() {
    if (this.muted || !this.ctx) return;
    this.init();
    const now = this.ctx.currentTime;
    const bufferSize = Math.floor(this.ctx.sampleRate * 0.45);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.12));
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
    noise.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start(now);
    noise.stop(now + 0.46);
  }

  playOrbCollect(comboCount = 1) {
    if (this.muted || !this.ctx) return;
    this.init();
    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 987.77, 1046.5, 1318.5];
    const freq = notes[(comboCount - 1) % notes.length];
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.4, now + 0.12);
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.19);
  }

  playVictory() {
    if (this.muted || !this.ctx) return;
    this.init();
    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5];
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now + idx * 0.07);
      gain.gain.setValueAtTime(0.2, now + idx * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.07);
      osc.stop(now + idx * 0.07 + 0.38);
    });
  }

  playDifficultySwitch() {
    if (this.muted || !this.ctx) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(1040, now + 0.1);
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.13);
  }
}

const audio = new HellAudioEngine();

/* =========================================================================
   MAIN APP COMPONENT
   ========================================================================= */
export default function App() {
  const [gameState, setGameState] = useState('menu'); // 'menu' | 'playing' | 'paused' | 'cleared' | 'gameover'
  const [currentSectorIndex, setCurrentSectorIndex] = useState(0);
  const [unlockedSectorMax, setUnlockedSectorMax] = useState(1);
  const [allSectorsUnlocked, setAllSectorsUnlocked] = useState(false);
  const [highScores, setHighScores] = useState({});
  const [attemptCount, setAttemptCount] = useState(1);
  const [soundMuted, setSoundMuted] = useState(false);
  const [scanlinesActive, setScanlinesActive] = useState(true);

  // Difficulty Protocol State (EASY | NORMAL | HARD | HELL)
  const [difficulty, setDifficulty] = useState(() => {
    try {
      const savedDiff = localStorage.getItem('neon_vectors_difficulty');
      if (savedDiff && DIFFICULTY_CONFIG[savedDiff]) return savedDiff;
      const savedState = localStorage.getItem('neon_vectors_hell_protocol_v3');
      if (savedState) {
        const parsed = JSON.parse(savedState);
        if (parsed.difficulty && DIFFICULTY_CONFIG[parsed.difficulty]) return parsed.difficulty;
      }
    } catch (e) {
      console.warn('LocalStorage difficulty error:', e);
    }
    return 'NORMAL';
  });

  // Live HUD States
  const [hudDistance, setHudDistance] = useState(0);
  const [hudScore, setHudScore] = useState(0);
  const [hudMultiplier, setHudMultiplier] = useState(1);
  const [hudEmpPercent, setHudEmpPercent] = useState(0);
  const [hudDashCooldown, setHudDashCooldown] = useState(0);
  const [hudShieldTime, setHudShieldTime] = useState(0);
  const [hudSlowMoTime, setHudSlowMoTime] = useState(0);
  const [hudMagnetTime, setHudMagnetTime] = useState(0);
  const [hudMidAirCharges, setHudMidAirCharges] = useState(1);
  const [hudGravityDir, setHudGravityDir] = useState(1);

  // Modal Summary Stats
  const [runStats, setRunStats] = useState({
    distance: 0,
    score: 0,
    orbs: 0,
    nearMisses: 0,
    causeOfDeath: 'Lethal Hazard Collision',
    isNewHighScore: false,
    rank: 'A'
  });

  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const lastTimeRef = useRef(0);

  // Mutable Physics State Ref
  const gameRef = useRef({
    active: false,
    sector: SECTORS[0],
    difficulty: 'NORMAL',
    width: 1200,
    height: 600,
    corridorTop: 70,
    corridorBottom: 530,
    squeezeFactor: 0,

    player: {
      x: 180,
      y: 498,
      width: 40,
      height: 32,
      vy: 0,
      gravityDir: 1,
      baseGravity: 5400,
      maxVy: 1440,
      grounded: true,
      midAirCharges: 1,
      maxMidAirCharges: 1,
      scaleX: 1,
      scaleY: 1,
      tilt: 0,
      trail: [],
      inZeroG: false,
      isPhasing: false,
      invulnerableTimer: 0,
    },

    dashCooldown: 0,
    dashDuration: 0,
    nearMissesCount: 0,
    hitstopTimer: 0,

    camera: {
      shakeX: 0,
      shakeY: 0,
      shakeIntensity: 0,
    },

    distance: 0,
    targetDistance: 800,
    baseScrollSpeed: 660,
    score: 0,
    orbsCollected: 0,
    comboMultiplier: 1,
    comboTimer: 0,
    maxCombo: 1,

    empEnergy: 0,
    empShockwave: null,

    shieldTime: 0,
    slowMoTime: 0,
    magnetTime: 0,

    obstacles: [],
    orbs: [],
    jumpPads: [],
    zeroGZones: [],
    blackHoles: [],
    warpGate: null,
    particles: [],
    combatTexts: [],

    starsFar: [],
    starsMid: [],
    starsNear: [],
    gridOffset: 0,
  });

  /* =========================================================================
     LOCAL STORAGE PERSISTENCE
     ========================================================================= */
  useEffect(() => {
    try {
      const saved = localStorage.getItem('neon_vectors_hell_protocol_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.unlockedSectorMax) setUnlockedSectorMax(parsed.unlockedSectorMax);
        if (parsed.highScores) setHighScores(parsed.highScores);
        if (parsed.attemptCount) setAttemptCount(parsed.attemptCount);
        if (parsed.difficulty && DIFFICULTY_CONFIG[parsed.difficulty]) {
          setDifficulty(parsed.difficulty);
          if (gameRef.current) gameRef.current.difficulty = parsed.difficulty;
        }
        if (parsed.soundMuted !== undefined) {
          setSoundMuted(parsed.soundMuted);
          audio.setMuted(parsed.soundMuted);
        }
        if (parsed.scanlinesActive !== undefined) setScanlinesActive(parsed.scanlinesActive);
      }
      const savedDiff = localStorage.getItem('neon_vectors_difficulty');
      if (savedDiff && DIFFICULTY_CONFIG[savedDiff]) {
        setDifficulty(savedDiff);
        if (gameRef.current) gameRef.current.difficulty = savedDiff;
      }
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, []);

  const saveProgression = (newUnlockedMax, newScores, newAttempts, targetDiff = difficulty) => {
    try {
      const payload = {
        unlockedSectorMax: newUnlockedMax !== undefined ? newUnlockedMax : unlockedSectorMax,
        highScores: newScores !== undefined ? newScores : highScores,
        attemptCount: newAttempts !== undefined ? newAttempts : attemptCount,
        difficulty: targetDiff,
        soundMuted,
        scanlinesActive,
      };
      localStorage.setItem('neon_vectors_hell_protocol_v3', JSON.stringify(payload));
      localStorage.setItem('neon_vectors_difficulty', targetDiff);
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  };

  const handleSetDifficulty = (newDiff) => {
    if (!DIFFICULTY_CONFIG[newDiff]) return;
    setDifficulty(newDiff);
    audio.playDifficultySwitch();
    saveProgression(unlockedSectorMax, highScores, attemptCount, newDiff);
    const g = gameRef.current;
    if (g) {
      g.difficulty = newDiff;
      const conf = DIFFICULTY_CONFIG[newDiff];
      if (g.player) {
        g.player.maxMidAirCharges = conf.maxMidAirCharges;
        if (g.player.grounded) {
          g.player.midAirCharges = conf.maxMidAirCharges;
        } else {
          g.player.midAirCharges = Math.min(g.player.midAirCharges, conf.maxMidAirCharges);
        }
        setHudMidAirCharges(g.player.midAirCharges);
        addCombatText(`PROTOCOL: ${newDiff}`, g.player.x + 20, g.player.y - 25, conf.color, 18);
      }
    }
  };

  const cycleDifficulty = () => {
    const tiers = ['EASY', 'NORMAL', 'HARD', 'HELL'];
    const curIdx = tiers.indexOf(difficulty);
    const nextDiff = tiers[(curIdx + 1) % tiers.length];
    handleSetDifficulty(nextDiff);
  };

  /* =========================================================================
     STARFIELD INITIALIZATION
     ========================================================================= */
  const initStarfield = (w, h) => {
    const g = gameRef.current;
    const width = w || 1200;
    const height = h || 600;
    g.starsFar = Array.from({ length: 60 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.5,
      speed: 0.15,
      alpha: Math.random() * 0.5 + 0.3,
    }));
    g.starsMid = Array.from({ length: 40 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 1,
      speed: 0.5,
      alpha: Math.random() * 0.7 + 0.3,
      color: '#00f3ff',
    }));
    g.starsNear = Array.from({ length: 25 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 3 + 1.5,
      speed: 1.1,
      alpha: 0.8,
      color: '#ffffff',
    }));
  };

  const triggerShake = (intensity = 15) => {
    const g = gameRef.current;
    g.camera.shakeIntensity = Math.min(35, g.camera.shakeIntensity + intensity);
  };

  const spawnSparkBurst = (x, y, count = 20, color = '#00f3ff') => {
    const g = gameRef.current;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 450 + 90;
      g.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 3.5 + 1.5,
        color,
        life: 1.0,
        decay: Math.random() * 2.8 + 1.8,
      });
    }
  };

  const spawnExplosion = (x, y, count = 50, color = '#ff003c') => {
    const g = gameRef.current;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 550 + 80;
      g.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 4.5 + 1.5,
        color: Math.random() > 0.4 ? color : '#ffffff',
        life: 1.0,
        decay: Math.random() * 2.0 + 1.2,
      });
    }
  };

  const addCombatText = (text, x, y, color = '#00f3ff', size = 18) => {
    const g = gameRef.current;
    g.combatTexts.push({
      text,
      x,
      y,
      color,
      size,
      alpha: 1.0,
      vy: -110,
      life: 0.85,
    });
  };

  /* =========================================================================
     TRAP GAUNTLET PATTERN GENERATOR (ALL 12 TRAPS UNLOCKED FROM SEC-01)
     Returns the rightmost X coordinate of the newly spawned gauntlet.
     ========================================================================= */
  const spawnPatternAt = (startX) => {
    const g = gameRef.current;
    const diff = g.difficulty || 'NORMAL';
    const sectorId = (g.sector && g.sector.id) || 1;
    const topRail = g.corridorTop + (g.corridorBottom - g.corridorTop) * (g.squeezeFactor * 0.5);
    const bottomRail = g.corridorBottom - (g.corridorBottom - g.corridorTop) * (g.squeezeFactor * 0.5);
    const corridorH = bottomRail - topRail;
    const sectorColor = (g.sector && g.sector.themeColor) || '#00f3ff';

    // Patterns filtered by difficulty and progressive sector unlocks
    let availablePatterns = [];

    if (diff === 'EASY') {
      // EASY (Chill / Casual): Simple spikes, slow drones, and Zero-G zones only
      // NO Fake-Out Shifting Spikes, NO Forced Inverter Beams, NO crushing pistons!
      availablePatterns = ['easy_spikes', 'easy_drone', 'easy_zerog'];
    } else if (diff === 'NORMAL') {
      // NORMAL (Balanced Arcade - Default): Progressive unlocks by sector
      // Sector 1 = Spikes & Orbs
      // Sector 2 = Buzzsaws
      // Sector 3 = Zero-G & Pinch Gates
      // Sector 4+ = Pistons, Drones, Inverter Beams, Singularity
      if (sectorId === 1) {
        availablePatterns = ['sawtooth_gauntlet', 'single_spike_hurdle'];
      } else if (sectorId === 2) {
        availablePatterns = ['sawtooth_gauntlet', 'buzzsaw_corridor', 'single_saw_jump'];
      } else if (sectorId === 3) {
        availablePatterns = ['sawtooth_gauntlet', 'buzzsaw_corridor', 'zerog_vacuum_hazard', 'pinch_and_saw'];
      } else {
        availablePatterns = [
          'sawtooth_gauntlet',
          'pinch_and_saw',
          'crusher_slalom',
          'buzzsaw_corridor',
          'inverter_spike_gate',
          'drone_pincer',
          'zerog_vacuum_hazard',
          'singularity_crush'
        ];
      }
    } else if (diff === 'HARD') {
      // HARD: Multi-trap combos with 0.5s telegraph warnings
      availablePatterns = [
        'sawtooth_gauntlet',
        'pinch_and_saw',
        'crusher_slalom',
        'buzzsaw_corridor',
        'inverter_spike_gate',
        'drone_pincer',
        'zerog_vacuum_hazard',
        'singularity_crush'
      ];
    } else {
      // HELL: All 12 traps from Sector 1 at extreme demon density
      availablePatterns = [
        'sawtooth_gauntlet',
        'pinch_and_saw',
        'crusher_slalom',
        'buzzsaw_corridor',
        'inverter_spike_gate',
        'drone_pincer',
        'zerog_vacuum_hazard',
        'singularity_crush'
      ];
    }

    const pattern = availablePatterns[Math.floor(Math.random() * availablePatterns.length)];
    let endX = startX;

    switch (pattern) {
      // EASY 1: Gentle spikes with wide breathing room (260px gap) and guide orbs
      case 'easy_spikes': {
        const spikeCount = 3;
        const spacing = 260;
        for (let i = 0; i < spikeCount; i++) {
          const isCeil = i % 2 === 1;
          const sH = 55;
          g.obstacles.push({
            type: 'sawtooth_spike',
            x: startX + i * spacing,
            y: isCeil ? topRail : bottomRail - sH,
            width: 36,
            height: sH,
            isCeiling: isCeil,
            color: '#10b981',
          });

          // Helpful Data Orb in flight arcs
          g.orbs.push({
            x: startX + i * spacing + spacing * 0.5,
            y: isCeil ? bottomRail - 60 : topRail + 60,
            radius: 12,
          });
        }
        endX = startX + spikeCount * spacing;
        break;
      }

      // EASY 2: Slow gentle drone with wide clearance
      case 'easy_drone': {
        const droneCenterY = topRail + corridorH * 0.5;
        g.obstacles.push({
          type: 'drone',
          x: startX + 60,
          y: droneCenterY,
          width: 36,
          height: 28,
          centerY: droneCenterY,
          amplitude: 25,
          freq: 1.8,
          phase: 0,
          time: 0,
          color: '#10b981',
        });
        g.orbs.push({
          x: startX + 60,
          y: topRail + 45,
          radius: 12,
        });
        g.orbs.push({
          x: startX + 60,
          y: bottomRail - 45,
          radius: 12,
        });
        endX = startX + 160;
        break;
      }

      // EASY 3: Translucent purple Zero-G zone with guide orbs (NO buzzsaw)
      case 'easy_zerog': {
        const zWidth = 360;
        g.zeroGZones.push({
          x: startX,
          y: topRail + 8,
          width: zWidth,
          height: corridorH - 16,
        });
        [0.25, 0.5, 0.75].forEach((pct, idx) => {
          g.orbs.push({
            x: startX + zWidth * pct,
            y: topRail + corridorH * (idx === 1 ? 0.35 : 0.65),
            radius: 12,
          });
        });
        endX = startX + zWidth;
        break;
      }

      // NORMAL SECTOR 1: Single spike hurdle with jump pad
      case 'single_spike_hurdle': {
        const isCeil = Math.random() > 0.5;
        const sH = 65;
        g.obstacles.push({
          type: 'sawtooth_spike',
          x: startX + 50,
          y: isCeil ? topRail : bottomRail - sH,
          width: 38,
          height: sH,
          isCeiling: isCeil,
          color: sectorColor,
        });
        g.orbs.push({
          x: startX + 50,
          y: isCeil ? bottomRail - 70 : topRail + 70,
          radius: 12,
        });
        // Jump Pad right behind it
        g.jumpPads.push({
          x: startX + 180,
          y: isCeil ? topRail : bottomRail - 14,
          width: 48,
          height: 14,
          isCeiling: isCeil,
        });
        endX = startX + 240;
        break;
      }

      // NORMAL SECTOR 2: Single rotating buzzsaw with safe flight path
      case 'single_saw_jump': {
        const sawRadius = 24;
        const isCeil = Math.random() > 0.5;
        g.obstacles.push({
          type: 'buzzsaw',
          x: startX + 60,
          y: isCeil ? topRail + sawRadius : bottomRail - sawRadius * 3,
          width: sawRadius * 2,
          height: sawRadius * 2,
          radius: sawRadius,
          rotation: 0,
          trackType: 'center',
          color: '#84cc16',
        });
        g.orbs.push({
          x: startX + 60,
          y: isCeil ? bottomRail - 60 : topRail + 60,
          radius: 12,
        });
        endX = startX + 180;
        break;
      }

      // 1. Sawtooth Spike Gauntlet (Scaled spacing by difficulty)
      case 'sawtooth_gauntlet': {
        const spikeCount = diff === 'NORMAL' ? 4 : 6;
        const spacing = diff === 'NORMAL' ? 200 : 145;
        for (let i = 0; i < spikeCount; i++) {
          const isCeil = i % 2 === 1;
          const sH = 68 + Math.random() * 15;
          g.obstacles.push({
            type: 'sawtooth_spike',
            x: startX + i * spacing,
            y: isCeil ? topRail : bottomRail - sH,
            width: 38,
            height: sH,
            isCeiling: isCeil,
            color: sectorColor,
          });

          // Mid-air Jump/Data Orb in flight arcs
          if (i % 2 === 0) {
            g.orbs.push({
              x: startX + i * spacing + spacing / 2,
              y: topRail + corridorH * 0.5,
              radius: 12,
            });
          }
        }
        endX = startX + spikeCount * spacing;
        break;
      }

      // 2. Pinch Gate: FAIR PATHFINDING GUARANTEE (>= 160px center gap + glowing Data Orb inside!)
      case 'pinch_and_saw': {
        const centerGap = Math.max(160, corridorH * 0.38);
        const spireH = Math.max(40, (corridorH - centerGap) / 2);

        // Top Spire
        g.obstacles.push({
          type: 'pinch_spire',
          x: startX,
          y: topRail,
          width: 42,
          height: spireH,
          isCeiling: true,
          color: '#ff003c',
        });
        // Bottom Spire
        g.obstacles.push({
          type: 'pinch_spire',
          x: startX,
          y: bottomRail - spireH,
          width: 42,
          height: spireH,
          isCeiling: false,
          color: '#ff003c',
        });
        // Mandatory Glowing Data Orb inside the needle eye to reset mid-air flip!
        g.orbs.push({
          x: startX + 21,
          y: topRail + corridorH * 0.5,
          radius: 13,
        });

        // Buzzsaw following with safe clearance
        const sawRadius = 25;
        g.obstacles.push({
          type: 'buzzsaw',
          x: startX + 185,
          y: topRail + corridorH * 0.5,
          width: sawRadius * 2,
          height: sawRadius * 2,
          radius: sawRadius,
          rotation: 0,
          trackType: 'vertical',
          topRail,
          bottomRail,
          vy: 320,
          color: '#84cc16',
        });

        endX = startX + 245;
        break;
      }

      // 3. Hydraulic Crusher Piston (with 0.5s telegraph warning) + Floor spike
      case 'crusher_slalom': {
        const isCeil = Math.random() > 0.5;
        g.obstacles.push({
          type: 'crusher',
          x: startX,
          y: isCeil ? topRail : bottomRail - 60,
          width: 60,
          height: 60,
          fullHeight: corridorH * 0.72,
          isCeiling: isCeil,
          topRail,
          bottomRail,
          state: 'idle',
          stateTimer: 0,
          color: '#f59e0b',
        });

        // Opposite spike spaced 180px away with an orb
        const oppH = 70;
        g.obstacles.push({
          type: 'sawtooth_spike',
          x: startX + 180,
          y: isCeil ? bottomRail - oppH : topRail,
          width: 38,
          height: oppH,
          isCeiling: !isCeil,
          color: sectorColor,
        });
        g.orbs.push({
          x: startX + 180,
          y: isCeil ? topRail + 60 : bottomRail - 60,
          radius: 12,
        });

        // Strobe gate
        g.obstacles.push({
          type: 'strobe_gate',
          x: startX + 330,
          y: topRail,
          width: 24,
          height: corridorH,
          activeTimer: 0,
          cycleDuration: 0.65,
          isLethal: true,
          color: '#f59e0b',
        });

        endX = startX + 370;
        break;
      }

      // 4. Buzzsaw Corridor (Top saw + Bottom saw + Center drone)
      case 'buzzsaw_corridor': {
        const rad = 24;
        g.obstacles.push({
          type: 'buzzsaw',
          x: startX,
          y: topRail + rad,
          width: rad * 2,
          height: rad * 2,
          radius: rad,
          rotation: 0,
          trackType: 'center',
          color: '#84cc16',
        });

        g.obstacles.push({
          type: 'buzzsaw',
          x: startX + 160,
          y: bottomRail - rad * 2.5,
          width: rad * 2,
          height: rad * 2,
          radius: rad,
          rotation: 0,
          trackType: 'center',
          color: '#84cc16',
        });

        g.obstacles.push({
          type: 'drone',
          x: startX + 310,
          y: topRail + corridorH * 0.5,
          width: 38,
          height: 30,
          centerY: topRail + corridorH * 0.5,
          amplitude: 40,
          freq: 3.0,
          phase: 0,
          time: 0,
          color: '#10b981',
        });

        g.orbs.push({
          x: startX + 80,
          y: bottomRail - 60,
          radius: 12,
        });
        g.orbs.push({
          x: startX + 235,
          y: topRail + 60,
          radius: 12,
        });

        endX = startX + 360;
        break;
      }

      // 5. Inverter Laser Curtain + Shifting Fake-Out Spike (with 0.5s telegraph warning)
      case 'inverter_spike_gate': {
        g.obstacles.push({
          type: 'inverter_curtain',
          x: startX,
          y: topRail,
          width: 24,
          height: corridorH,
          triggered: false,
          color: '#ec4899',
        });

        // Shifting fake-out spike right after forced flip
        g.obstacles.push({
          type: 'fakeout_spike',
          x: startX + 160,
          y: bottomRail - 70,
          width: 40,
          height: 70,
          isCeiling: false,
          topRail,
          bottomRail,
          triggered: false,
          isTelegraphing: false,
          telegraphTimer: 0,
          color: '#ec4899',
        });

        // Yellow Jump Pad right behind it
        g.jumpPads.push({
          x: startX + 320,
          y: bottomRail - 14,
          width: 50,
          height: 14,
          isCeiling: false,
        });

        endX = startX + 380;
        break;
      }

      // 6. Drone Pincer + Homing Mine
      case 'drone_pincer': {
        const droneCenterY = topRail + corridorH * 0.5;
        for (let d = 0; d < 2; d++) {
          g.obstacles.push({
            type: 'drone',
            x: startX + d * 95,
            y: droneCenterY + (d === 0 ? -45 : 45),
            width: 38,
            height: 30,
            centerY: droneCenterY + (d === 0 ? -45 : 45),
            amplitude: 38,
            freq: 3.0,
            phase: d * Math.PI,
            time: 0,
            color: '#10b981',
          });
        }

        g.obstacles.push({
          type: 'homing_mine',
          x: startX + 230,
          y: droneCenterY,
          width: 32,
          height: 32,
          vy: 0,
          topRail,
          bottomRail,
          color: '#ff003c',
        });

        g.orbs.push({
          x: startX + 140,
          y: droneCenterY,
          radius: 12,
        });

        endX = startX + 270;
        break;
      }

      // 7. Zero-G Vacuum Hazard Zone with Central Buzzsaw
      case 'zerog_vacuum_hazard': {
        const zWidth = 380;
        g.zeroGZones.push({
          x: startX,
          y: topRail + 8,
          width: zWidth,
          height: corridorH - 16,
        });

        const sawR = 25;
        g.obstacles.push({
          type: 'buzzsaw',
          x: startX + zWidth * 0.5,
          y: topRail + corridorH * 0.5,
          width: sawR * 2,
          height: sawR * 2,
          radius: sawR,
          rotation: 0,
          trackType: 'center',
          color: '#a855f7',
        });

        g.orbs.push({
          x: startX + zWidth * 0.25,
          y: topRail + corridorH * 0.35,
          radius: 12,
        });
        g.orbs.push({
          x: startX + zWidth * 0.75,
          y: topRail + corridorH * 0.65,
          radius: 12,
        });

        endX = startX + zWidth;
        break;
      }

      // 8. Singularity Well & Alternating Spikes (FAIR PATHFINDING GUARANTEE: horizontal clearance >= 160px + orb)
      case 'singularity_crush': {
        g.blackHoles.push({
          x: startX + 110,
          y: topRail + corridorH * 0.5,
          radius: 24,
          gravityRadius: 260,
          pullStrength: 3000,
          rotation: 0,
          color: '#6366f1',
        });

        const sH = 70;
        g.obstacles.push({
          type: 'sawtooth_spike',
          x: startX + 20,
          y: topRail,
          width: 38,
          height: sH,
          isCeiling: true,
          color: '#ff003c',
        });
        g.obstacles.push({
          type: 'sawtooth_spike',
          x: startX + 190,
          y: bottomRail - sH,
          width: 38,
          height: sH,
          isCeiling: false,
          color: '#ff003c',
        });

        // Orb in middle of singularity well
        g.orbs.push({
          x: startX + 105,
          y: topRail + corridorH * 0.5,
          radius: 12,
        });

        endX = startX + 240;
        break;
      }

      default: {
        endX = startX + 160;
        break;
      }
    }

    // Occasional Tactical Power-up
    if (Math.random() < 0.12) {
      const types = ['shield', 'slowmo', 'magnet'];
      const puType = types[Math.floor(Math.random() * types.length)];
      g.orbs.push({
        isPowerUp: true,
        powerType: puType,
        x: endX + 40,
        y: topRail + corridorH * (0.3 + Math.random() * 0.4),
        radius: 16,
      });
    }

    return endX;
  };

  /* =========================================================================
     START / INITIALIZE SECTOR RUN (WITH SPAWN SAFE ZONE & DYNAMIC DIFFICULTY)
     ========================================================================= */
  const startSectorRun = useCallback((sectorIndex) => {
    const sector = SECTORS[sectorIndex] || SECTORS[0];
    setCurrentSectorIndex(sectorIndex);
    const canvas = canvasRef.current;
    const w = canvas ? canvas.clientWidth || 1200 : 1200;
    const h = canvas ? canvas.clientHeight || 600 : 600;

    const corridorTop = 70;
    const corridorBottom = h - 70;

    const diffConfig = DIFFICULTY_CONFIG[difficulty || 'NORMAL'];
    const startShield = diffConfig.startShieldTime || 0;

    gameRef.current = {
      active: true,
      sector,
      difficulty,
      width: w,
      height: h,
      corridorTop,
      corridorBottom,
      squeezeFactor: 0,

      player: {
        x: 180,
        y: corridorBottom - 32,
        width: 40,
        height: 32,
        vy: 0,
        gravityDir: 1,
        baseGravity: 5400,
        maxVy: 1440,
        grounded: true,
        midAirCharges: diffConfig.maxMidAirCharges,
        maxMidAirCharges: diffConfig.maxMidAirCharges,
        scaleX: 1,
        scaleY: 1,
        tilt: 0,
        trail: [],
        inZeroG: false,
        isPhasing: false,
        invulnerableTimer: 0,
      },

      dashCooldown: 0,
      dashDuration: 0,
      nearMissesCount: 0,
      hitstopTimer: 0,

      camera: {
        shakeX: 0,
        shakeY: 0,
        shakeIntensity: 0,
      },

      distance: 0,
      targetDistance: sector.targetDistance,
      baseScrollSpeed: sector.baseSpeed * 60,
      score: 0,
      orbsCollected: 0,
      comboMultiplier: 1,
      comboTimer: 0,
      maxCombo: 1,

      empEnergy: 0,
      empShockwave: null,

      shieldTime: startShield,
      slowMoTime: 0,
      magnetTime: 0,

      obstacles: [],
      orbs: [],
      jumpPads: [],
      zeroGZones: [],
      blackHoles: [],
      warpGate: null,
      particles: [],
      combatTexts: [],

      starsFar: [],
      starsMid: [],
      starsNear: [],
      gridOffset: 0,
    };

    initStarfield(w, h);

    // RULE 2: MANDATORY SPAWN SAFE ZONE (NO DYING AT 9 METERS!)
    // When a level starts or restarts (0m), DO NOT spawn any traps before x = 950px!
    // Give the player a clean 1.5-second runway at the start of every attempt to get their bearings.
    // Pre-populate starting runway with introductory Data Orbs to calibrate rhythm
    [380, 560, 720, 860].forEach((ox, idx) => {
      const oY = idx % 2 === 0 ? corridorBottom - 55 : corridorTop + 55;
      gameRef.current.orbs.push({
        x: ox,
        y: oY,
        radius: 12,
      });
    });

    // Populate traps starting strictly at x = 950px!
    let currentX = 950;
    while (currentX < w + 800) {
      const gap = diffConfig.minGap + Math.random() * (diffConfig.maxGap - diffConfig.minGap);
      currentX = spawnPatternAt(currentX) + gap;
    }

    lastTimeRef.current = performance.now();
    setGameState('playing');
    setHudDistance(0);
    setHudScore(0);
    setHudMultiplier(1);
    setHudEmpPercent(0);
    setHudDashCooldown(0);
    setHudShieldTime(Math.ceil(startShield));
    setHudSlowMoTime(0);
    setHudMagnetTime(0);
    setHudMidAirCharges(diffConfig.maxMidAirCharges);
    setHudGravityDir(1);

    if (startShield > 0) {
      addCombatText('CASUAL PHASE SHIELD ACTIVE', 180, corridorBottom - 50, '#10b981', 18);
    }
  }, [difficulty]);

  /* =========================================================================
     GRAVITY INVERSION
     ========================================================================= */
  const flipGravity = useCallback(() => {
    const g = gameRef.current;
    if (!g.active || gameState !== 'playing') return;

    const p = g.player;

    if (p.grounded) {
      p.gravityDir *= -1;
      p.grounded = false;
      p.vy = p.gravityDir * 580;
      p.scaleX = 0.75;
      p.scaleY = 1.35;
      audio.playFlip(p.gravityDir < 0);
      spawnSparkBurst(p.x + p.width / 2, p.y + (p.gravityDir > 0 ? 0 : p.height), 12, '#00f3ff');
    } else if (p.midAirCharges > 0) {
      p.midAirCharges--;
      p.gravityDir *= -1;
      p.vy = p.gravityDir * 680;
      p.scaleX = 0.7;
      p.scaleY = 1.4;
      audio.playMidAirFlip();
      triggerShake(7);
      const remainingLabel = p.midAirCharges > 0 ? `MID-AIR FLIP (${p.midAirCharges} LEFT)` : 'MID-AIR FLIP!';
      addCombatText(remainingLabel, p.x + 20, p.y - 18, '#a855f7', 15);
      spawnSparkBurst(p.x + p.width / 2, p.y + p.height / 2, 20, '#a855f7');
      setHudMidAirCharges(p.midAirCharges);
    } else {
      addCombatText('DISCHARGED', p.x + 20, p.y - 18, '#ff003c', 13);
      return;
    }

    setHudGravityDir(p.gravityDir);
  }, [gameState]);

  /* =========================================================================
     GHOST PHASE DASH
     ========================================================================= */
  const triggerGhostDash = useCallback(() => {
    const g = gameRef.current;
    if (!g.active || gameState !== 'playing') return;
    if (g.dashCooldown > 0) return;

    g.dashDuration = 0.25;
    g.dashCooldown = 6.0;
    g.player.isPhasing = true;

    audio.playGhostDash();
    triggerShake(10);
    addCombatText('GHOST PHASE DASH!', g.player.x + 20, g.player.y - 25, '#00f3ff', 18);
    spawnSparkBurst(g.player.x + g.player.width / 2, g.player.y + g.player.height / 2, 28, '#00f3ff');
  }, [gameState]);

  /* =========================================================================
     EMP SUPERNOVA
     ========================================================================= */
  const triggerEmpBlast = useCallback(() => {
    const g = gameRef.current;
    if (!g.active || gameState !== 'playing') return;

    if (g.empEnergy < 100) {
      addCombatText('EMP CHARGING', g.player.x + 20, g.player.y - 20, '#f59e0b', 16);
      return;
    }

    g.empEnergy = 0;
    setHudEmpPercent(0);

    const centerX = g.player.x + g.player.width / 2;
    const centerY = g.player.y + g.player.height / 2;

    g.empShockwave = {
      x: centerX,
      y: centerY,
      radius: 20,
      maxRadius: Math.max(g.width, g.height) * 1.5,
      alpha: 1.0,
    };

    audio.playEMP();
    triggerShake(28);
    addCombatText('EMP SUPERNOVA WIPEOUT!', centerX, centerY - 30, '#00f3ff', 24);

    let destroyedCount = 0;
    g.obstacles.forEach((obs) => {
      spawnExplosion(obs.x + obs.width / 2, obs.y + obs.height / 2, 35, '#00f3ff');
      destroyedCount++;
      g.score += 350;
    });
    g.obstacles = [];

    if (destroyedCount > 0) {
      addCombatText(`+${destroyedCount * 350} EMP BONUS!`, centerX, centerY + 25, '#fbbf24', 20);
    }
  }, [gameState]);

  /* =========================================================================
     KEYBOARD & MOUSE CONTROLS
     ========================================================================= */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.code === 'KeyW' || e.code === 'ArrowUp') {
        e.preventDefault();
        flipGravity();
      } else if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
        e.preventDefault();
        triggerGhostDash();
      } else if (e.code === 'KeyE') {
        e.preventDefault();
        triggerEmpBlast();
      } else if (e.code === 'KeyP' || e.code === 'Escape') {
        e.preventDefault();
        if (gameState === 'playing') setGameState('paused');
        else if (gameState === 'paused') setGameState('playing');
      } else if (e.code === 'KeyR') {
        e.preventDefault();
        setAttemptCount((prev) => {
          const next = prev + 1;
          saveProgression(unlockedSectorMax, highScores, next);
          return next;
        });
        startSectorRun(currentSectorIndex);
      }
    };

    const handleContextMenu = (e) => {
      if (gameState === 'playing') {
        e.preventDefault();
        triggerEmpBlast();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('contextmenu', handleContextMenu);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [flipGravity, triggerGhostDash, triggerEmpBlast, gameState, currentSectorIndex, startSectorRun, unlockedSectorMax, highScores]);

  /* =========================================================================
     COLLISION & DEATH HANDLER
     ========================================================================= */
  const handlePlayerDeath = (cause = 'Lethal Hazard Collision') => {
    const g = gameRef.current;
    g.active = false;
    audio.playCrash();
    triggerShake(30);
    spawnExplosion(g.player.x + g.player.width / 2, g.player.y + g.player.height / 2, 75, '#ff003c');

    const finalDistance = Math.floor(g.distance);
    const finalScore = g.score;
    const sectorKey = `sec_${g.sector.id}`;
    const previousBest = highScores[sectorKey] || 0;
    const isNewHigh = finalScore > previousBest;

    const updatedHighScores = {
      ...highScores,
      [sectorKey]: Math.max(previousBest, finalScore)
    };
    setHighScores(updatedHighScores);

    const nextAttempts = attemptCount + 1;
    setAttemptCount(nextAttempts);
    saveProgression(unlockedSectorMax, updatedHighScores, nextAttempts);

    let rank = 'C';
    if (finalScore > 10000) rank = 'S';
    else if (finalScore > 5000) rank = 'A';
    else if (finalScore > 2500) rank = 'B';

    setRunStats({
      distance: finalDistance,
      score: finalScore,
      orbs: g.orbsCollected,
      nearMisses: g.nearMissesCount,
      causeOfDeath: cause,
      isNewHighScore: isNewHigh,
      rank
    });

    setGameState('gameover');
  };

  /* =========================================================================
     VICTORY HANDLER
     ========================================================================= */
  const handleSectorCleared = () => {
    const g = gameRef.current;
    g.active = false;
    audio.playVictory();
    triggerShake(18);

    const nextSectorId = g.sector.id + 1;
    const newUnlockedMax = Math.max(unlockedSectorMax, Math.min(11, nextSectorId));
    setUnlockedSectorMax(newUnlockedMax);

    const finalDistance = Math.floor(g.distance);
    const finalScore = g.score + 2500;
    const sectorKey = `sec_${g.sector.id}`;
    const previousBest = highScores[sectorKey] || 0;
    const isNewHigh = finalScore > previousBest;

    const updatedHighScores = {
      ...highScores,
      [sectorKey]: Math.max(previousBest, finalScore)
    };
    setHighScores(updatedHighScores);
    saveProgression(newUnlockedMax, updatedHighScores, attemptCount);

    let rank = 'A';
    if (g.maxCombo >= 5 && g.nearMissesCount >= 6) rank = 'S';

    setRunStats({
      distance: finalDistance,
      score: finalScore,
      orbs: g.orbsCollected,
      nearMisses: g.nearMissesCount,
      causeOfDeath: 'Warp Gate Secured',
      isNewHighScore: isNewHigh,
      rank
    });

    setGameState('cleared');
  };

  /* =========================================================================
     60 FPS ENGINE LOOP (requestAnimationFrame)
     ========================================================================= */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (!container) return;
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || (window.innerHeight - 56);
      if (width <= 0 || height <= 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      gameRef.current.width = width;
      gameRef.current.height = height;
      gameRef.current.corridorTop = 70;
      gameRef.current.corridorBottom = height - 70;

      if (!gameRef.current.starsFar.length) {
        initStarfield(width, height);
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let frameCount = 0;

    const gameLoop = (currentTime) => {
      if (!lastTimeRef.current) lastTimeRef.current = currentTime;
      const rawDt = Math.min((currentTime - lastTimeRef.current) / 1000, 0.08);
      lastTimeRef.current = currentTime;

      const g = gameRef.current;
      const p = g.player;

      let dt = rawDt;

      if (g.active && gameState === 'playing') {
        frameCount++;

        if (g.hitstopTimer > 0) {
          g.hitstopTimer = Math.max(0, g.hitstopTimer - rawDt);
          dt *= 0.15;
        }

        const diffConfig = DIFFICULTY_CONFIG[g.difficulty || 'NORMAL'];
        let currentSpeed = g.baseScrollSpeed * diffConfig.speedMultiplier;
        if (g.sector && g.sector.id === 11) {
          currentSpeed *= 1 + (g.distance / 2000) * 0.85;
        }
        if (g.slowMoTime > 0) {
          currentSpeed *= 0.55;
          g.slowMoTime = Math.max(0, g.slowMoTime - dt);
        }
        if (g.shieldTime > 0) g.shieldTime = Math.max(0, g.shieldTime - dt);
        if (g.magnetTime > 0) g.magnetTime = Math.max(0, g.magnetTime - dt);

        if (g.dashDuration > 0) {
          g.dashDuration = Math.max(0, g.dashDuration - dt);
          if (g.dashDuration <= 0) p.isPhasing = false;
        }
        if (g.dashCooldown > 0) {
          g.dashCooldown = Math.max(0, g.dashCooldown - dt);
        }
        if (p.invulnerableTimer > 0) {
          p.invulnerableTimer = Math.max(0, p.invulnerableTimer - dt);
        }

        if (g.comboTimer > 0) {
          g.comboTimer = Math.max(0, g.comboTimer - dt);
          if (g.comboTimer <= 0) g.comboMultiplier = 1;
        }

        // Distance Scaling calibrated by speed
        const distanceDelta = (currentSpeed * dt) * 0.028;
        g.distance += distanceDelta;

        const topRail = g.corridorTop + (g.corridorBottom - g.corridorTop) * (g.squeezeFactor * 0.5);
        const bottomRail = g.corridorBottom - (g.corridorBottom - g.corridorTop) * (g.squeezeFactor * 0.5);

        // Check Warp Gate spawn
        const isEndless = g.sector && g.sector.id === 11;
        if (!isEndless && g.distance >= g.targetDistance && !g.warpGate) {
          g.warpGate = {
            x: g.width + 150,
            y: g.corridorTop,
            width: 80,
            height: g.corridorBottom - g.corridorTop,
            rings: 6,
            rotation: 0,
          };
        }

        // DYNAMIC OBSTACLE SPAWNER (SCALED BY DIFFICULTY GAPS)
        if (!g.warpGate) {
          let maxRightX = g.obstacles.reduce(
            (max, ob) => Math.max(max, ob.x + (ob.width || 45)),
            p.x + 220
          );

          while (maxRightX < g.width + 600) {
            const gap = diffConfig.minGap + Math.random() * (diffConfig.maxGap - diffConfig.minGap);
            const spawnAtX = maxRightX + gap;
            maxRightX = spawnPatternAt(spawnAtX);
          }
        }

        let inZeroG = false;
        g.zeroGZones.forEach((z) => {
          if (p.x + p.width > z.x && p.x < z.x + z.width && p.y + p.height > z.y && p.y < z.y + z.height) {
            inZeroG = true;
          }
        });
        p.inZeroG = inZeroG;

        g.blackHoles.forEach((bh) => {
          const dx = bh.x - (p.x + p.width / 2);
          const dy = bh.y - (p.y + p.height / 2);
          const dist = Math.hypot(dx, dy);
          if (dist < bh.gravityRadius) {
            const pullForce = (bh.pullStrength / Math.max(60, dist)) * 40 * dt;
            p.vy += (dy / dist) * pullForce;
          }
          if (dist < bh.radius && !p.isPhasing && p.invulnerableTimer <= 0) {
            handlePlayerDeath('Black Hole Event Horizon Singularity');
            return;
          }
        });

        const effectiveGravity = inZeroG ? p.baseGravity * 0.04 : p.baseGravity;
        p.vy += p.gravityDir * effectiveGravity * dt;
        p.vy = Math.max(-p.maxVy, Math.min(p.maxVy, p.vy));

        if (inZeroG) p.vy *= 0.988;

        p.y += p.vy * dt;

        if (p.y <= topRail) {
          p.y = topRail;
          if (p.vy < 0) {
            if (Math.abs(p.vy) > 350) {
              p.scaleY = 0.65;
              p.scaleX = 1.35;
              triggerShake(Math.min(10, Math.abs(p.vy) * 0.012));
              spawnSparkBurst(p.x + p.width / 2, topRail, 14, '#ff003c');
              audio.playLand();
            }
            p.vy = 0;
          }
          if (p.gravityDir === -1) {
            p.grounded = true;
            if (p.midAirCharges < p.maxMidAirCharges) {
              p.midAirCharges = p.maxMidAirCharges;
              setHudMidAirCharges(p.midAirCharges);
              spawnSparkBurst(p.x + p.width / 2, topRail + 8, 8, '#00f3ff');
            }
          }
        } else if (p.y + p.height >= bottomRail) {
          p.y = bottomRail - p.height;
          if (p.vy > 0) {
            if (Math.abs(p.vy) > 350) {
              p.scaleY = 0.65;
              p.scaleX = 1.35;
              triggerShake(Math.min(10, Math.abs(p.vy) * 0.012));
              spawnSparkBurst(p.x + p.width / 2, bottomRail, 14, '#00f3ff');
              audio.playLand();
            }
            p.vy = 0;
          }
          if (p.gravityDir === 1) {
            p.grounded = true;
            if (p.midAirCharges < p.maxMidAirCharges) {
              p.midAirCharges = p.maxMidAirCharges;
              setHudMidAirCharges(p.midAirCharges);
              spawnSparkBurst(p.x + p.width / 2, bottomRail - 8, 8, '#00f3ff');
            }
          }
        } else {
          p.grounded = false;
        }

        p.scaleX += (1 - p.scaleX) * 0.18;
        p.scaleY += (1 - p.scaleY) * 0.18;

        const targetTilt = (p.vy / 1200) * 0.42;
        p.tilt += (targetTilt - p.tilt) * 0.25;

        if (frameCount % 2 === 0) {
          p.trail.unshift({
            x: p.x,
            y: p.y,
            scaleX: p.scaleX,
            scaleY: p.scaleY,
            tilt: p.tilt,
            isPhasing: p.isPhasing,
            color: p.isPhasing ? '#00f3ff' : p.gravityDir === 1 ? '#00f3ff' : '#ff003c',
          });
          if (p.trail.length > 16) p.trail.pop();
        }

        // Jump Pads
        for (let i = g.jumpPads.length - 1; i >= 0; i--) {
          const pad = g.jumpPads[i];
          pad.x -= currentSpeed * dt;

          if (
            p.x + p.width > pad.x &&
            p.x < pad.x + pad.width &&
            p.y + p.height > pad.y &&
            p.y < pad.y + pad.height
          ) {
            audio.playJumpPad();
            triggerShake(12);
            p.gravityDir *= -1;
            p.vy = p.gravityDir * 950;
            p.midAirCharges = p.maxMidAirCharges;
            setHudMidAirCharges(p.midAirCharges);
            setHudGravityDir(p.gravityDir);
            addCombatText('JUMP PAD BOOST!', pad.x, pad.y - 20, '#fbbf24', 18);
            spawnSparkBurst(pad.x + pad.width / 2, pad.y, 25, '#fbbf24');
          }

          if (pad.x + pad.width < -100) g.jumpPads.splice(i, 1);
        }

        // Obstacle updates and collisions
        const pBox = {
          x: p.x + 6,
          y: p.y + 6,
          w: p.width - 12,
          h: p.height - 12,
        };

        for (let i = g.obstacles.length - 1; i >= 0; i--) {
          const obs = g.obstacles[i];
          obs.x -= currentSpeed * dt;

          if (obs.type === 'buzzsaw') {
            obs.rotation += dt * 22;
            if (obs.trackType === 'vertical') {
              obs.y += obs.vy * dt;
              if (obs.y <= topRail + obs.radius) {
                obs.y = topRail + obs.radius;
                obs.vy = Math.abs(obs.vy);
              } else if (obs.y >= bottomRail - obs.radius) {
                obs.y = bottomRail - obs.radius;
                obs.vy = -Math.abs(obs.vy);
              }
            }
          } else if (obs.type === 'drone') {
            obs.time += dt * obs.freq;
            obs.y = obs.centerY + Math.sin(obs.time + obs.phase) * obs.amplitude;
          } else if (obs.type === 'homing_mine') {
            const dy = p.y + p.height / 2 - (obs.y + obs.height / 2);
            obs.vy += (dy > 0 ? 1 : -1) * 780 * dt;
            obs.vy = Math.max(-500, Math.min(500, obs.vy));
            obs.y += obs.vy * dt;
          } else if (obs.type === 'strobe_gate') {
            obs.activeTimer = (obs.activeTimer + dt) % obs.cycleDuration;
            obs.isLethal = obs.activeTimer < obs.cycleDuration * 0.55;
          } else if (obs.type === 'crusher') {
            const playerDist = obs.x - p.x;
            if (playerDist < 380 && obs.state === 'idle') {
              obs.state = 'telegraph';
              obs.stateTimer = 0.5; // 0.5s telegraph warning
              audio.playPistonSlam();
            } else if (obs.state === 'telegraph') {
              obs.stateTimer -= dt;
              if (obs.stateTimer <= 0) {
                obs.state = 'slam';
                obs.height = obs.fullHeight;
                triggerShake(16);
                spawnSparkBurst(obs.x + obs.width / 2, obs.isCeiling ? topRail + obs.height : bottomRail - obs.height, 25, '#f59e0b');
              }
            } else if (obs.state === 'slam') {
              obs.stateTimer += dt;
              if (obs.stateTimer > 0.45) {
                obs.state = 'retract';
              }
            } else if (obs.state === 'retract') {
              obs.height = Math.max(60, obs.height - 450 * dt);
            }
            if (!obs.isCeiling) {
              obs.y = bottomRail - obs.height;
            }
          } else if (obs.type === 'fakeout_spike') {
            const playerDist = obs.x - p.x;
            if (!obs.triggered && playerDist < 360 && !obs.isTelegraphing) {
              obs.isTelegraphing = true;
              obs.telegraphTimer = 0.5; // 0.5s telegraph warning
            } else if (obs.isTelegraphing && !obs.triggered) {
              obs.telegraphTimer -= dt;
              if (obs.telegraphTimer <= 0) {
                obs.triggered = true;
                obs.isTelegraphing = false;
                obs.isCeiling = true;
                obs.y = topRail;
                triggerShake(8);
                audio.playInverterZap();
                addCombatText('FAKE-OUT SHIFT!', obs.x, obs.y + 40, '#ec4899', 14);
                spawnSparkBurst(obs.x + obs.width / 2, obs.y, 18, '#ec4899');
              }
            }
          } else if (obs.type === 'inverter_curtain') {
            if (!obs.triggered && p.x + p.width > obs.x && p.x < obs.x + obs.width) {
              obs.triggered = true;
              p.gravityDir *= -1;
              p.vy = p.gravityDir * 580;
              setHudGravityDir(p.gravityDir);
              audio.playInverterZap();
              triggerShake(12);
              addCombatText('GRAVITY INVERTED!', obs.x, topRail + 30, '#ec4899', 16);
              spawnSparkBurst(obs.x, p.y + p.height / 2, 25, '#ec4899');
            }
          }

          const isLethalActive = obs.type === 'strobe_gate' ? obs.isLethal : true;
          const isColliding =
            isLethalActive &&
            pBox.x < obs.x + obs.width &&
            pBox.x + pBox.w > obs.x &&
            pBox.y < obs.y + obs.height &&
            pBox.y + pBox.h > obs.y;

          if (isColliding) {
            if (p.isPhasing || p.invulnerableTimer > 0) {
              // Intangible during Ghost Dash
            } else if (g.shieldTime > 0) {
              g.shieldTime = 0;
              p.invulnerableTimer = 0.6;
              audio.playCrash();
              triggerShake(16);
              spawnExplosion(obs.x + obs.width / 2, obs.y + obs.height / 2, 40, '#00f3ff');
              addCombatText('DEFLECTOR SHATTER!', p.x + 20, p.y - 20, '#00f3ff', 20);
              g.obstacles.splice(i, 1);
              continue;
            } else {
              handlePlayerDeath(
                obs.type === 'buzzsaw'
                  ? 'Plasma Buzzsaw Disintegration'
                  : obs.type === 'crusher'
                  ? 'Hydraulic Crusher Decapitation'
                  : obs.type === 'homing_mine'
                  ? 'Homing Proximity Mine Detonation'
                  : 'Lethal Hazard Siphon Vaporization'
              );
              return;
            }
          }

          if (!obs.nearMissAwarded && isLethalActive && !p.isPhasing) {
            const dx = Math.max(obs.x - (pBox.x + pBox.w), 0, pBox.x - (obs.x + obs.width));
            const dy = Math.max(obs.y - (pBox.y + pBox.h), 0, pBox.y - (obs.y + obs.height));
            const grazeDist = Math.hypot(dx, dy);

            if (grazeDist > 0 && grazeDist < 24) {
              obs.nearMissAwarded = true;
              g.nearMissesCount++;
              g.hitstopTimer = 0.08;
              g.empEnergy = Math.min(100, g.empEnergy + 15);
              const pts = 300 * g.comboMultiplier;
              g.score += pts;
              audio.playNearMiss();
              addCombatText(`+${pts} NEAR MISS!`, p.x + 20, p.y - 22, '#00f3ff', 16);
              spawnSparkBurst(p.x + p.width / 2, p.y + p.height / 2, 14, '#00f3ff');
            }
          }

          if (obs.x + obs.width < -100) {
            g.obstacles.splice(i, 1);
            g.score += 25;
          }
        }

        // Orbs & powerups
        for (let i = g.orbs.length - 1; i >= 0; i--) {
          const orb = g.orbs[i];
          orb.x -= currentSpeed * dt;

          if (g.magnetTime > 0) {
            const dx = p.x + p.width / 2 - orb.x;
            const dy = p.y + p.height / 2 - orb.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 460) {
              orb.x += (dx / dist) * 850 * dt;
              orb.y += (dy / dist) * 850 * dt;
            }
          }

          const dist = Math.hypot(p.x + p.width / 2 - orb.x, p.y + p.height / 2 - orb.y);
          if (dist < 38) {
            if (orb.isPowerUp) {
              if (orb.powerType === 'shield') {
                g.shieldTime = 10;
                addCombatText('PHASE SHIELD ACTIVE!', p.x, p.y - 25, '#00f3ff', 18);
              } else if (orb.powerType === 'slowmo') {
                g.slowMoTime = 5;
                addCombatText('CHRONO OVERCLOCK!', p.x, p.y - 25, '#a855f7', 18);
              } else if (orb.powerType === 'magnet') {
                g.magnetTime = 8;
                addCombatText('HYPER-MAGNET ACTIVATED!', p.x, p.y - 25, '#fbbf24', 18);
              }
              audio.playNearMiss();
              spawnExplosion(orb.x, orb.y, 25, '#00f3ff');
            } else {
              audio.playOrbCollect(g.comboMultiplier);
              g.orbsCollected++;
              g.comboMultiplier = Math.min(5, g.comboMultiplier + 1);
              g.maxCombo = Math.max(g.maxCombo, g.comboMultiplier);
              g.comboTimer = 3.5;
              g.empEnergy = Math.min(100, g.empEnergy + 8);

              p.midAirCharges = p.maxMidAirCharges;
              setHudMidAirCharges(p.midAirCharges);

              const pts = 100 * g.comboMultiplier;
              g.score += pts;
              addCombatText(`+${pts} ORB RESET!`, orb.x, orb.y, '#00f3ff', 15);
              spawnSparkBurst(orb.x, orb.y, 14, '#00f3ff');
            }

            g.orbs.splice(i, 1);
            continue;
          }

          if (orb.x < -60) g.orbs.splice(i, 1);
        }

        for (let i = g.zeroGZones.length - 1; i >= 0; i--) {
          const z = g.zeroGZones[i];
          z.x -= currentSpeed * dt;
          if (z.x + z.width < -100) g.zeroGZones.splice(i, 1);
        }
        for (let i = g.blackHoles.length - 1; i >= 0; i--) {
          const bh = g.blackHoles[i];
          bh.x -= currentSpeed * dt;
          bh.rotation += dt * 5;
          if (bh.x + bh.gravityRadius < -100) g.blackHoles.splice(i, 1);
        }

        if (g.warpGate) {
          g.warpGate.x -= currentSpeed * dt;
          g.warpGate.rotation += dt * 3.5;
          if (p.x + p.width >= g.warpGate.x + 20) {
            handleSectorCleared();
            return;
          }
        }

        if (g.empShockwave) {
          g.empShockwave.radius += dt * 2800;
          g.empShockwave.alpha = Math.max(0, 1 - g.empShockwave.radius / g.empShockwave.maxRadius);
          if (g.empShockwave.radius >= g.empShockwave.maxRadius) g.empShockwave = null;
        }

        for (let i = g.particles.length - 1; i >= 0; i--) {
          const pt = g.particles[i];
          pt.x += pt.vx * dt;
          pt.y += pt.vy * dt;
          pt.life -= pt.decay * dt;
          if (pt.life <= 0) g.particles.splice(i, 1);
        }
        for (let i = g.combatTexts.length - 1; i >= 0; i--) {
          const txt = g.combatTexts[i];
          txt.y += txt.vy * dt;
          txt.life -= dt;
          txt.alpha = Math.max(0, txt.life / 0.85);
          if (txt.life <= 0) g.combatTexts.splice(i, 1);
        }

        if (g.camera.shakeIntensity > 0.1) {
          g.camera.shakeIntensity *= 0.86;
          g.camera.shakeX = (Math.random() - 0.5) * g.camera.shakeIntensity;
          g.camera.shakeY = (Math.random() - 0.5) * g.camera.shakeIntensity;
        } else {
          g.camera.shakeIntensity = 0;
          g.camera.shakeX = 0;
          g.camera.shakeY = 0;
        }

        if (frameCount % 4 === 0) {
          setHudDistance(Math.floor(g.distance));
          setHudScore(g.score);
          setHudMultiplier(g.comboMultiplier);
          setHudEmpPercent(Math.floor(g.empEnergy));
          setHudDashCooldown(Math.ceil(g.dashCooldown));
          setHudShieldTime(Math.ceil(g.shieldTime));
          setHudSlowMoTime(Math.ceil(g.slowMoTime));
          setHudMagnetTime(Math.ceil(g.magnetTime));
          setHudMidAirCharges(p.midAirCharges);
        }
      }

      // ===========================================================
      // RENDERING PIPELINE (Runs in all states)
      // ===========================================================
      ctx.save();
      ctx.translate(g.camera.shakeX, g.camera.shakeY);

      const topRail = g.corridorTop + (g.corridorBottom - g.corridorTop) * (g.squeezeFactor * 0.5);
      const bottomRail = g.corridorBottom - (g.corridorBottom - g.corridorTop) * (g.squeezeFactor * 0.5);

      const activeSec = g.sector || SECTORS[0];
      const bgGrad = ctx.createLinearGradient(0, 0, g.width, g.height);
      const bgColors = activeSec.bgGradient || ['#020814', '#041226', '#010610'];
      bgGrad.addColorStop(0, bgColors[0]);
      bgGrad.addColorStop(0.5, bgColors[1]);
      bgGrad.addColorStop(1, bgColors[2]);
      ctx.fillStyle = bgGrad;
      ctx.fillRect(-20, -20, g.width + 40, g.height + 40);

      // Starfield rendering
      const renderStars = (stars, factor) => {
        if (!stars || !stars.length) return;
        stars.forEach((st) => {
          st.x -= (g.baseScrollSpeed * 0.12 * factor) * dt;
          if (st.x < -10) st.x = g.width + Math.random() * 20;
          ctx.fillStyle = st.color || `rgba(255, 255, 255, ${st.alpha || 0.8})`;
          ctx.beginPath();
          ctx.arc(st.x, st.y, st.size || 2, 0, Math.PI * 2);
          ctx.fill();
        });
      };
      renderStars(g.starsFar, 0.2);
      renderStars(g.starsMid, 0.6);
      renderStars(g.starsNear, 1.2);

      // Perspective Grid
      g.gridOffset = (g.gridOffset + g.baseScrollSpeed * dt) % 50;
      ctx.lineWidth = 1;
      ctx.strokeStyle = `${activeSec.themeColor || '#00f3ff'}25`;

      for (let x = -g.gridOffset; x < g.width; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, bottomRail);
        ctx.lineTo(x - 60, g.height);
        ctx.stroke();
      }
      for (let x = -g.gridOffset; x < g.width; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, topRail);
        ctx.lineTo(x - 60, 0);
        ctx.stroke();
      }

      // Zero-G Anomaly Fields
      g.zeroGZones.forEach((z) => {
        ctx.fillStyle = 'rgba(168, 85, 247, 0.18)';
        ctx.fillRect(z.x, z.y, z.width, z.height);
        ctx.strokeStyle = '#c084fc';
        ctx.setLineDash([8, 8]);
        ctx.strokeRect(z.x, z.y, z.width, z.height);
        ctx.setLineDash([]);
        ctx.font = '700 12px Orbitron, monospace';
        ctx.fillStyle = '#c084fc';
        ctx.fillText('ZERO-G [0.04G]', z.x + 12, z.y + 20);
      });

      // Black Holes
      g.blackHoles.forEach((bh) => {
        ctx.save();
        ctx.translate(bh.x, bh.y);

        const grad = ctx.createRadialGradient(0, 0, bh.radius, 0, 0, bh.gravityRadius);
        grad.addColorStop(0, 'rgba(0, 0, 0, 0.85)');
        grad.addColorStop(0.5, 'rgba(99, 102, 241, 0.25)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, bh.gravityRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 3;
        ctx.shadowColor = '#6366f1';
        ctx.shadowBlur = 18;
        ctx.beginPath();
        ctx.arc(0, 0, bh.radius + 6, bh.rotation, bh.rotation + Math.PI * 1.6);
        ctx.stroke();

        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.arc(0, 0, bh.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      // Neon Corridor Rails
      const railColorFloor = p.gravityDir === 1 ? '#00f3ff' : 'rgba(0, 243, 255, 0.35)';
      const railColorCeiling = p.gravityDir === -1 ? '#ff003c' : 'rgba(255, 0, 60, 0.35)';

      ctx.shadowColor = railColorFloor;
      ctx.shadowBlur = 15;
      ctx.fillStyle = railColorFloor;
      ctx.fillRect(0, bottomRail, g.width, 4);

      ctx.shadowColor = railColorCeiling;
      ctx.shadowBlur = 15;
      ctx.fillStyle = railColorCeiling;
      ctx.fillRect(0, topRail - 4, g.width, 4);
      ctx.shadowBlur = 0;

      // Jump Pads
      g.jumpPads.forEach((pad) => {
        ctx.save();
        ctx.shadowColor = '#fbbf24';
        ctx.shadowBlur = 16;
        ctx.fillStyle = '#fbbf24';
        ctx.fillRect(pad.x, pad.y, pad.width, pad.height);

        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.moveTo(pad.x + 15, pad.y + (pad.isCeiling ? 3 : 11));
        ctx.lineTo(pad.x + pad.width / 2, pad.y + (pad.isCeiling ? 11 : 3));
        ctx.lineTo(pad.x + pad.width - 15, pad.y + (pad.isCeiling ? 3 : 11));
        ctx.fill();
        ctx.restore();
      });

      // Obstacles
      g.obstacles.forEach((obs) => {
        ctx.save();

        if (obs.type === 'sawtooth_spike' || obs.type === 'fakeout_spike' || obs.type === 'pinch_spire') {
          ctx.shadowColor = obs.color;
          ctx.shadowBlur = 14;
          ctx.fillStyle = obs.color;

          ctx.beginPath();
          if (obs.isCeiling) {
            ctx.moveTo(obs.x, obs.y);
            ctx.lineTo(obs.x + obs.width, obs.y);
            ctx.lineTo(obs.x + obs.width / 2, obs.y + obs.height);
          } else {
            ctx.moveTo(obs.x, obs.y + obs.height);
            ctx.lineTo(obs.x + obs.width, obs.y + obs.height);
            ctx.lineTo(obs.x + obs.width / 2, obs.y);
          }
          ctx.closePath();
          ctx.fill();

          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          if (obs.isCeiling) {
            ctx.moveTo(obs.x + obs.width * 0.35, obs.y);
            ctx.lineTo(obs.x + obs.width * 0.65, obs.y);
            ctx.lineTo(obs.x + obs.width / 2, obs.y + obs.height * 0.8);
          } else {
            ctx.moveTo(obs.x + obs.width * 0.35, obs.y + obs.height);
            ctx.lineTo(obs.x + obs.width * 0.65, obs.y + obs.height);
            ctx.lineTo(obs.x + obs.width / 2, obs.y + obs.height * 0.2);
          }
          ctx.closePath();
          ctx.fill();

          // Telegraph for Fake-Out Shifting Spike
          if (obs.type === 'fakeout_spike' && obs.isTelegraphing) {
            ctx.save();
            ctx.strokeStyle = 'rgba(236, 72, 153, 0.85)';
            ctx.setLineDash([4, 4]);
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(obs.x, topRail);
            ctx.lineTo(obs.x + obs.width, topRail);
            ctx.lineTo(obs.x + obs.width / 2, topRail + obs.height);
            ctx.closePath();
            ctx.stroke();
            ctx.setLineDash([]);

            ctx.strokeStyle = 'rgba(236, 72, 153, 0.45)';
            ctx.beginPath();
            ctx.moveTo(obs.x + obs.width / 2, obs.y);
            ctx.lineTo(obs.x + obs.width / 2, topRail + obs.height);
            ctx.stroke();

            ctx.font = '700 11px Orbitron, sans-serif';
            ctx.fillStyle = '#ec4899';
            ctx.textAlign = 'center';
            ctx.fillText('SHIFTING ⚠️', obs.x + obs.width / 2, topRail + obs.height + 15);
            ctx.restore();
          }
        } else if (obs.type === 'buzzsaw') {
          ctx.translate(obs.x + obs.radius, obs.y + obs.radius);
          ctx.rotate(obs.rotation);
          ctx.shadowColor = obs.color;
          ctx.shadowBlur = 16;
          ctx.strokeStyle = obs.color;
          ctx.lineWidth = 3;
          ctx.fillStyle = '#0f172a';

          ctx.beginPath();
          const teeth = 8;
          for (let t = 0; t < teeth; t++) {
            const a1 = (t / teeth) * Math.PI * 2;
            const a2 = ((t + 0.5) / teeth) * Math.PI * 2;
            ctx.lineTo(Math.cos(a1) * obs.radius, Math.sin(a1) * obs.radius);
            ctx.lineTo(Math.cos(a2) * (obs.radius * 0.65), Math.sin(a2) * (obs.radius * 0.65));
          }
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(0, 0, 5, 0, Math.PI * 2);
          ctx.fill();
        } else if (obs.type === 'crusher') {
          ctx.shadowColor = obs.color;
          ctx.shadowBlur = 15;
          ctx.fillStyle = '#1e1b4b';
          ctx.strokeStyle = obs.color;
          ctx.lineWidth = 2.5;

          ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
          ctx.strokeRect(obs.x, obs.y, obs.width, obs.height);

          if (obs.state === 'telegraph') {
            ctx.strokeStyle = 'rgba(245, 158, 11, 0.85)';
            ctx.setLineDash([4, 4]);
            ctx.beginPath();
            ctx.moveTo(obs.x + obs.width / 2, topRail);
            ctx.lineTo(obs.x + obs.width / 2, bottomRail);
            ctx.stroke();
            ctx.setLineDash([]);

            ctx.font = '900 18px Orbitron, sans-serif';
            ctx.fillStyle = '#f59e0b';
            ctx.textAlign = 'center';
            ctx.fillText('CRUSH ⚠️', obs.x + obs.width / 2, obs.isCeiling ? topRail + 40 : bottomRail - 30);
          }
        } else if (obs.type === 'inverter_curtain') {
          ctx.shadowColor = obs.color;
          ctx.shadowBlur = 18;
          ctx.fillStyle = 'rgba(236, 72, 153, 0.35)';
          ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
          ctx.strokeStyle = obs.color;
          ctx.lineWidth = 2;
          ctx.strokeRect(obs.x, obs.y, obs.width, obs.height);

          ctx.font = '800 12px Orbitron, sans-serif';
          ctx.fillStyle = '#ffffff';
          ctx.textAlign = 'center';
          ctx.fillText('FLIP', obs.x + obs.width / 2, obs.y + obs.height * 0.5);
        } else if (obs.type === 'strobe_gate') {
          if (obs.isLethal) {
            ctx.shadowColor = obs.color;
            ctx.shadowBlur = 20;
            ctx.fillStyle = 'rgba(245, 158, 11, 0.85)';
            ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
          } else {
            ctx.strokeStyle = 'rgba(245, 158, 11, 0.3)';
            ctx.setLineDash([6, 6]);
            ctx.strokeRect(obs.x, obs.y, obs.width, obs.height);
            ctx.setLineDash([]);
          }
        } else if (obs.type === 'homing_mine') {
          ctx.shadowColor = obs.color;
          ctx.shadowBlur = 16;
          ctx.fillStyle = obs.color;
          ctx.beginPath();
          ctx.arc(obs.x + obs.width / 2, obs.y + obs.height / 2, obs.width / 2, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(obs.x + obs.width / 2 - 4, obs.y + obs.height / 2, 4, 0, Math.PI * 2);
          ctx.fill();
        } else if (obs.type === 'drone') {
          ctx.translate(obs.x + obs.width / 2, obs.y + obs.height / 2);
          ctx.shadowColor = obs.color;
          ctx.shadowBlur = 14;
          ctx.fillStyle = '#064e3b';
          ctx.strokeStyle = obs.color;
          ctx.lineWidth = 2;

          ctx.beginPath();
          ctx.moveTo(-obs.width / 2, 0);
          ctx.lineTo(-obs.width * 0.2, -obs.height / 2);
          ctx.lineTo(obs.width * 0.2, -obs.height / 2);
          ctx.lineTo(obs.width / 2, 0);
          ctx.lineTo(obs.width * 0.2, obs.height / 2);
          ctx.lineTo(-obs.width * 0.2, obs.height / 2);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          ctx.strokeStyle = 'rgba(255, 0, 60, 0.5)';
          ctx.setLineDash([3, 3]);
          ctx.beginPath();
          ctx.moveTo(-obs.width / 2, 0);
          ctx.lineTo(-120, 0);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        ctx.restore();
      });

      // Data Orbs & Powerups
      g.orbs.forEach((orb) => {
        ctx.save();
        ctx.translate(orb.x, orb.y);

        if (orb.isPowerUp) {
          let pColor = '#00f3ff';
          if (orb.powerType === 'slowmo') pColor = '#a855f7';
          if (orb.powerType === 'magnet') pColor = '#fbbf24';

          ctx.shadowColor = pColor;
          ctx.shadowBlur = 18;
          ctx.strokeStyle = pColor;
          ctx.lineWidth = 2.5;
          ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';

          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i + frameCount * 0.03;
            const px = Math.cos(angle) * orb.radius;
            const py = Math.sin(angle) * orb.radius;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = '#ffffff';
          ctx.font = '700 12px Orbitron, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          const label = orb.powerType === 'shield' ? 'S' : orb.powerType === 'slowmo' ? 'T' : 'M';
          ctx.fillText(label, 0, 0);
        } else {
          ctx.shadowColor = '#00f3ff';
          ctx.shadowBlur = 16;
          ctx.rotate(frameCount * 0.06);

          ctx.fillStyle = '#00f3ff';
          ctx.fillRect(-orb.radius, -orb.radius, orb.radius * 2, orb.radius * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(-orb.radius * 0.5, -orb.radius * 0.5, orb.radius, orb.radius);
        }
        ctx.restore();
      });

      // Warp Gate
      if (g.warpGate) {
        ctx.save();
        ctx.translate(g.warpGate.x + g.warpGate.width / 2, g.warpGate.y + g.warpGate.height / 2);

        for (let r = 0; r < g.warpGate.rings; r++) {
          const rad = 30 + r * 28;
          ctx.strokeStyle = r % 2 === 0 ? '#00f3ff' : '#ff003c';
          ctx.shadowColor = ctx.strokeStyle;
          ctx.shadowBlur = 22;
          ctx.lineWidth = 3.5;

          ctx.beginPath();
          const rRot = g.warpGate.rotation * (r % 2 === 0 ? 1 : -1) + (r * Math.PI) / 4;
          for (let s = 0; s < 6; s++) {
            const angle = (Math.PI / 3) * s + rRot;
            const px = Math.cos(angle) * rad;
            const py = Math.sin(angle) * rad * 1.5;
            if (s === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.stroke();
        }

        ctx.font = '900 16px Orbitron, sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText('WARP PORTAL', 0, 0);
        ctx.restore();
      }

      // Player Motion Trails
      p.trail.forEach((tr, idx) => {
        ctx.save();
        ctx.translate(tr.x + p.width / 2, tr.y + p.height / 2);
        ctx.rotate(tr.tilt);
        ctx.scale(tr.scaleX, tr.scaleY);

        const trailAlpha = (1 - idx / p.trail.length) * (tr.isPhasing ? 0.75 : 0.45);
        ctx.fillStyle = tr.color;
        ctx.globalAlpha = trailAlpha;
        ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);

        ctx.restore();
      });
      ctx.globalAlpha = 1.0;

      // Player Craft
      ctx.save();
      ctx.translate(p.x + p.width / 2, p.y + p.height / 2);
      ctx.rotate(p.tilt);
      ctx.scale(p.scaleX, p.scaleY);

      const runnerColor = p.isPhasing ? '#00f3ff' : p.gravityDir === 1 ? '#00f3ff' : '#ff003c';
      ctx.shadowColor = runnerColor;
      ctx.shadowBlur = p.isPhasing ? 26 : 18;

      ctx.fillStyle = p.isPhasing ? 'rgba(15, 23, 42, 0.4)' : '#0f172a';
      ctx.strokeStyle = runnerColor;
      ctx.lineWidth = 2.5;

      ctx.beginPath();
      ctx.moveTo(p.width / 2, 0);
      ctx.lineTo(-p.width / 2, -p.height / 2);
      ctx.lineTo(-p.width * 0.2, 0);
      ctx.lineTo(-p.width / 2, p.height / 2);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(p.width * 0.35, 0);
      ctx.lineTo(p.width * 0.05, -p.height * 0.22);
      ctx.lineTo(p.width * 0.05, p.height * 0.22);
      ctx.closePath();
      ctx.fill();

      const flameLen = 22 + Math.random() * 12;
      const thGrad = ctx.createLinearGradient(-p.width * 0.2, 0, -p.width * 0.2 - flameLen, 0);
      thGrad.addColorStop(0, '#ffffff');
      thGrad.addColorStop(0.3, runnerColor);
      thGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = thGrad;
      ctx.beginPath();
      ctx.moveTo(-p.width * 0.2, -5);
      ctx.lineTo(-p.width * 0.2 - flameLen, 0);
      ctx.lineTo(-p.width * 0.2, 5);
      ctx.closePath();
      ctx.fill();

      if (p.midAirCharges > 0) {
        ctx.strokeStyle = p.midAirCharges >= 2 ? '#10b981' : '#00f3ff';
        ctx.lineWidth = 1.8;
        ctx.shadowColor = p.midAirCharges >= 2 ? '#10b981' : '#00f3ff';
        ctx.shadowBlur = 12;

        const ringAngle = frameCount * 0.08;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.width * 0.75, p.height * 0.75, ringAngle, 0, Math.PI * 2);
        ctx.stroke();

        if (p.midAirCharges >= 2) {
          ctx.strokeStyle = '#00f3ff';
          ctx.shadowColor = '#00f3ff';
          ctx.beginPath();
          ctx.ellipse(0, 0, p.width * 0.95, p.height * 0.95, -ringAngle * 1.2, 0, Math.PI * 2);
          ctx.stroke();
        }

        const satCount = p.midAirCharges >= 2 ? 4 : 2;
        for (let s = 0; s < satCount; s++) {
          const sAngle = ringAngle + (s * (Math.PI * 2 / satCount));
          const rW = s % 2 === 0 ? p.width * 0.75 : p.width * 0.95;
          const rH = s % 2 === 0 ? p.height * 0.75 : p.height * 0.95;
          const sx = Math.cos(sAngle) * rW;
          const sy = Math.sin(sAngle) * rH;
          ctx.fillStyle = s % 2 === 0 ? '#ffffff' : (p.midAirCharges >= 2 ? '#10b981' : '#00f3ff');
          ctx.beginPath();
          ctx.arc(sx, sy, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (g.shieldTime > 0) {
        ctx.strokeStyle = '#00f3ff';
        ctx.shadowColor = '#00f3ff';
        ctx.shadowBlur = 24;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(0, 0, p.width * 0.95, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = 'rgba(0, 243, 255, 0.12)';
        ctx.fill();
      }

      ctx.restore();

      // EMP Shockwave
      if (g.empShockwave) {
        ctx.save();
        ctx.strokeStyle = `rgba(0, 243, 255, ${g.empShockwave.alpha})`;
        ctx.lineWidth = 9;
        ctx.shadowColor = '#00f3ff';
        ctx.shadowBlur = 32;
        ctx.beginPath();
        ctx.arc(g.empShockwave.x, g.empShockwave.y, g.empShockwave.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // Particles
      g.particles.forEach((pt) => {
        ctx.save();
        ctx.fillStyle = pt.color;
        ctx.globalAlpha = Math.max(0, pt.life);
        ctx.shadowColor = pt.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Combat Texts
      g.combatTexts.forEach((txt) => {
        ctx.save();
        ctx.font = `700 ${txt.size}px Orbitron, sans-serif`;
        ctx.fillStyle = txt.color;
        ctx.globalAlpha = txt.alpha;
        ctx.shadowColor = txt.color;
        ctx.shadowBlur = 12;
        ctx.fillText(txt.text, txt.x, txt.y);
        ctx.restore();
      });

      ctx.restore();

      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animationFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [gameState, handlePlayerDeath, handleSectorCleared]);

  const activeSector = SECTORS[currentSectorIndex] || SECTORS[0];
  const diffConfig = DIFFICULTY_CONFIG[difficulty || 'NORMAL'];
  const warpPercent = Math.min(
    100,
    activeSector.targetDistance === Infinity
      ? 100
      : Math.floor((hudDistance / activeSector.targetDistance) * 100)
  );

  return (
    <div className="relative w-screen h-screen bg-[#050510] text-slate-100 overflow-hidden font-cyber flex flex-col select-none">
      {/* ===================================================================
          TOP RESPONSIVE HUD BAR
          =================================================================== */}
      <header className="relative z-20 flex items-center justify-between px-3 sm:px-4 py-2 bg-[#050510]/85 backdrop-blur-md border-b border-cyan-500/20">
        <div className="flex items-center space-x-2 sm:space-x-2.5">
          <div
            className="flex items-center space-x-1.5 px-2.5 py-0.5 rounded clip-cyber-tag font-orbitron text-xs font-bold tracking-wider"
            style={{
              backgroundColor: `${activeSector.themeColor}20`,
              border: `1px solid ${activeSector.themeColor}70`,
              color: activeSector.themeColor,
            }}
          >
            <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: activeSector.themeColor }} />
            <span>{activeSector.code}</span>
          </div>

          {/* Quick Difficulty Toggle Button in Top HUD */}
          <button
            onClick={cycleDifficulty}
            title="Click to Switch Difficulty (EASY / NORMAL / HARD / HELL)"
            className={`flex items-center space-x-1.5 px-2.5 py-0.5 rounded clip-cyber-tag font-orbitron text-xs font-bold transition-all cursor-pointer border ${diffConfig.badgeClass} hover:brightness-125 ${diffConfig.glowClass}`}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: diffConfig.color }} />
            <span>{diffConfig.name}</span>
            <span className="text-[10px] font-mono-code opacity-75">({diffConfig.speedMultiplier}x)</span>
          </button>

          <div className="hidden sm:flex items-center space-x-1 px-2 py-0.5 rounded bg-slate-900/70 border border-slate-700/60 text-xs">
            <span className="text-slate-400">POLARITY:</span>
            <span className={`font-orbitron font-bold ${hudGravityDir === 1 ? 'text-cyan-400' : 'text-rose-500'}`}>
              {hudGravityDir === 1 ? '▼ FLOOR' : '▲ CEILING'}
            </span>
          </div>

          <div className="flex items-center space-x-1 px-2.5 py-0.5 rounded bg-red-950/40 border border-red-500/40 text-red-300 text-xs font-mono-code font-bold">
            <Skull className="w-3.5 h-3.5 text-red-400" />
            <span>ATTEMPT #{attemptCount}</span>
          </div>

          {/* Mid-Air Flip Charges with Dynamic Dots */}
          <div
            className={`hidden md:flex items-center space-x-1 px-2 py-0.5 rounded border text-xs font-mono-code transition-colors ${
              hudMidAirCharges > 0
                ? 'bg-cyan-500/10 border-cyan-400/50 text-cyan-300'
                : 'bg-red-500/10 border-red-500/30 text-red-400'
            }`}
          >
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>
              FLIP:{' '}
              {hudMidAirCharges > 0 ? (
                <span className="font-bold text-cyan-300 tracking-wider">
                  {'●'.repeat(hudMidAirCharges)}
                  {'○'.repeat(Math.max(0, diffConfig.maxMidAirCharges - hudMidAirCharges))} READY
                </span>
              ) : (
                <span className="text-red-400">DISCHARGED (ORB RESET)</span>
              )}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center flex-1 max-w-sm sm:max-w-md mx-2 sm:mx-4">
          <div className="flex items-center justify-between w-full text-xs font-orbitron mb-1 px-1">
            <span className="text-cyan-400 font-bold tracking-wider">{hudDistance}m</span>
            <span className="text-slate-400">
              {activeSector.targetDistance === Infinity ? 'ENDLESS' : `WARP ${activeSector.targetDistance}m`}
            </span>
          </div>
          <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-cyan-500/30 p-[1px]">
            <div
              className="h-full rounded-full transition-all duration-150 ease-out"
              style={{
                width: `${warpPercent}%`,
                background: `linear-gradient(90deg, #00f3ff, ${activeSector.themeColor})`,
                boxShadow: `0 0 10px ${activeSector.themeColor}`,
              }}
            />
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-2.5">
          <button
            onClick={triggerGhostDash}
            disabled={hudDashCooldown > 0}
            title="Press 'Shift' to Ghost Phase Dash"
            className={`flex items-center space-x-1 px-2.5 py-1 rounded clip-cyber-tag font-orbitron text-xs font-bold transition-all ${
              hudDashCooldown <= 0
                ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_15px_#a855f7] cursor-pointer'
                : 'bg-slate-800/80 border border-slate-700/60 text-slate-500 cursor-not-allowed'
            }`}
          >
            <Ghost className="w-3.5 h-3.5" />
            <span>{hudDashCooldown <= 0 ? 'DASH' : `${hudDashCooldown}s`}</span>
            <span className="text-[9px] bg-black/40 px-1 rounded text-purple-200 ml-0.5">[SHIFT]</span>
          </button>

          <button
            onClick={triggerEmpBlast}
            disabled={hudEmpPercent < 100}
            title="Press 'E' or Right-Click to trigger EMP Supernova"
            className={`flex items-center space-x-1 px-2.5 py-1 rounded clip-cyber-tag font-orbitron text-xs font-bold transition-all ${
              hudEmpPercent >= 100
                ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_0_18px_#00f3ff] animate-pulse cursor-pointer'
                : 'bg-slate-800/80 border border-slate-700/60 text-slate-500 cursor-not-allowed'
            }`}
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>EMP {hudEmpPercent}%</span>
            <span className="text-[9px] bg-black/40 px-1 rounded text-cyan-200 ml-0.5">[E]</span>
          </button>

          <div
            className={`flex items-center space-x-0.5 px-2 py-0.5 rounded text-xs font-orbitron font-black ${
              hudMultiplier > 1 ? 'text-yellow-300 bg-yellow-500/20 border border-yellow-400/50' : 'text-slate-400 bg-slate-800/50'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>x{hudMultiplier}</span>
          </div>

          <div className="hidden sm:block text-right">
            <div className="text-[9px] text-slate-400 font-mono-code leading-none">SCORE</div>
            <div className="text-sm sm:text-base font-orbitron font-black text-white tracking-wider leading-tight">
              {hudScore.toLocaleString()}
            </div>
          </div>

          <button
            onClick={() => {
              const next = !soundMuted;
              setSoundMuted(next);
              audio.setMuted(next);
            }}
            className="p-1 rounded bg-slate-800/60 hover:bg-slate-700/60 text-slate-300 transition-colors"
            title="Toggle Audio"
          >
            {soundMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => setScanlinesActive(!scanlinesActive)}
            className={`p-1 rounded transition-colors ${
              scanlinesActive ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40' : 'bg-slate-800/60 text-slate-400'
            }`}
            title="Toggle Scanlines"
          >
            <Tv className="w-3.5 h-3.5" />
          </button>

          {gameState === 'playing' ? (
            <button
              onClick={() => setGameState('paused')}
              className="p-1 rounded bg-slate-800/60 hover:bg-slate-700/60 text-slate-300 transition-colors"
              title="Pause (P or Esc)"
            >
              <Pause className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={() => setGameState('menu')}
              className="px-2 py-0.5 rounded border border-cyan-500/50 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-orbitron font-bold"
              title="Open Sector Menu"
            >
              SECTORS
            </button>
          )}
        </div>
      </header>

      {/* Active Power-Up Timers Bar */}
      {(hudShieldTime > 0 || hudSlowMoTime > 0 || hudMagnetTime > 0) && (
        <div className="absolute top-14 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-3 pointer-events-none">
          {hudShieldTime > 0 && (
            <div className="flex items-center space-x-1 px-2.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-400/60 text-cyan-300 text-xs font-orbitron animate-pulse">
              <Shield className="w-3.5 h-3.5" />
              <span>DEFLECTOR: {hudShieldTime}s</span>
            </div>
          )}
          {hudSlowMoTime > 0 && (
            <div className="flex items-center space-x-1 px-2.5 py-0.5 rounded bg-purple-950/80 border border-purple-400/60 text-purple-300 text-xs font-orbitron animate-pulse">
              <Clock className="w-3.5 h-3.5" />
              <span>OVERCLOCK: {hudSlowMoTime}s</span>
            </div>
          )}
          {hudMagnetTime > 0 && (
            <div className="flex items-center space-x-1 px-2.5 py-0.5 rounded bg-amber-950/80 border border-amber-400/60 text-amber-300 text-xs font-orbitron animate-pulse">
              <Magnet className="w-3.5 h-3.5" />
              <span>MAGNET: {hudMagnetTime}s</span>
            </div>
          )}
        </div>
      )}

      {/* ===================================================================
          CANVAS STAGE
          =================================================================== */}
      <main
        className="relative flex-1 w-full h-full overflow-hidden cursor-crosshair"
        onClick={() => {
          if (gameState === 'playing') flipGravity();
        }}
      >
        <canvas ref={canvasRef} className="block w-full h-full" />
        {scanlinesActive && <div className="absolute inset-0 scanlines pointer-events-none z-10" />}

        {gameState === 'playing' && (
          <div className="absolute bottom-3 left-6 z-10 pointer-events-none text-slate-500/80 text-xs font-mono-code flex items-center space-x-2">
            <span>[SPACE / CLICK] FLIP</span>
            <span>•</span>
            <span>[SHIFT] GHOST PHASE</span>
            <span>•</span>
            <span>[E] EMP SUPERNOVA</span>
            <span>•</span>
            <span>[R] INSTANT RETRY</span>
          </div>
        )}
      </main>

      {/* ===================================================================
          10-SECTOR CAMPAIGN MODAL SELECTOR
          =================================================================== */}
      {gameState === 'menu' && (
        <div className="absolute inset-0 z-30 flex items-center justify-center p-3 sm:p-5 bg-black/90 backdrop-blur-md">
          <div className="w-full max-w-5xl max-h-[94vh] overflow-y-auto cyber-glass rounded-xl p-5 sm:p-7 flex flex-col clip-cyber-corner">
            <div className="flex flex-col sm:flex-row items-center justify-between pb-4 mb-4 border-b border-cyan-500/20 gap-3">
              <div>
                <div className="inline-flex items-center space-x-2 px-3 py-0.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-orbitron font-semibold tracking-widest mb-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>10-SECTOR HELL PROTOCOL // EXTREME DEMON ARCHITECTURE</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-orbitron font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-rose-500 to-pink-500 neon-text-cyan">
                  NEON VECTORS
                </h1>
                <p className="text-slate-400 text-xs sm:text-sm mt-0.5 font-cyber">
                  Unforgiving twitch reflex. 12 chained trap mechanics, moving crushers, fake-outs, and zero-G guillotines.
                </p>
              </div>

              <button
                onClick={() => setAllSectorsUnlocked(!allSectorsUnlocked)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded border text-xs font-mono-code transition-all cursor-pointer ${
                  allSectorsUnlocked
                    ? 'bg-amber-500/20 border-amber-400/80 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.4)]'
                    : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-white'
                }`}
                title="Toggle Instant Access to All 10 Sectors"
              >
                {allSectorsUnlocked ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                <span>{allSectorsUnlocked ? 'DEV UNLOCK: ACTIVE' : 'UNLOCK ALL SECTORS'}</span>
              </button>
            </div>

            {/* Difficulty Protocol Selector (4 Tiers) */}
            <div className="mb-5 p-3.5 sm:p-4 rounded-xl bg-slate-950/80 border border-cyan-500/30">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-1">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-orbitron font-bold text-slate-300 tracking-wider">
                    DIFFICULTY PROTOCOL:
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[11px] font-orbitron font-bold border ${diffConfig.badgeClass}`}>
                    {diffConfig.name} // {diffConfig.label}
                  </span>
                </div>
                <span className="text-[11px] font-mono-code text-slate-400">
                  Switch anytime in Start Menu or Top HUD
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                {Object.values(DIFFICULTY_CONFIG).map((tier) => {
                  const isSelected = difficulty === tier.key;
                  return (
                    <button
                      key={tier.key}
                      onClick={() => handleSetDifficulty(tier.key)}
                      className={`p-3 rounded-lg border text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                        isSelected
                          ? `${tier.badgeClass} ${tier.glowClass} scale-[1.02] bg-slate-900/90 ring-1 ring-white/20`
                          : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-orbitron font-black text-sm tracking-wider" style={{ color: tier.color }}>
                            {tier.name}
                          </span>
                          <span className="text-[10px] font-mono-code font-bold px-1.5 py-0.5 rounded bg-black/50 text-slate-300">
                            {tier.speedMultiplier}x SPEED
                          </span>
                        </div>
                        <div className="text-xs font-semibold text-slate-200">{tier.label}</div>
                        <div className="text-[11px] text-slate-400 mt-1 leading-snug">{tier.description}</div>
                      </div>
                      <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono-code">
                        <span className="text-slate-400">GAP: {tier.minGap}-{tier.maxGap}px</span>
                        <span style={{ color: tier.color }} className="font-bold">{tier.tag}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-5">
              {SECTORS.map((sec, idx) => {
                const isUnlocked = allSectorsUnlocked || idx === 0 || idx < unlockedSectorMax;
                const bestScore = highScores[`sec_${sec.id}`] || 0;

                return (
                  <div
                    key={sec.id}
                    onClick={() => {
                      if (isUnlocked) startSectorRun(idx);
                    }}
                    className={`relative p-3.5 rounded-lg border transition-all text-left flex flex-col justify-between ${
                      isUnlocked
                        ? 'cursor-pointer hover:scale-[1.02] bg-slate-900/70 border-slate-700/80 hover:border-cyan-400/80 hover:shadow-[0_0_18px_rgba(0,243,255,0.25)]'
                        : 'opacity-40 bg-slate-950/40 border-slate-800/40 cursor-not-allowed'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className="text-[11px] font-orbitron font-bold px-1.5 py-0.5 rounded"
                          style={{ backgroundColor: `${sec.themeColor}25`, color: sec.themeColor }}
                        >
                          {sec.code}
                        </span>
                        <span className="text-[10px] font-mono-code text-slate-400">
                          {sec.targetDistance === Infinity ? 'INFINITE' : `${sec.targetDistance}m`}
                        </span>
                      </div>
                      <h3 className="font-orbitron font-bold text-sm text-slate-100">{sec.name}</h3>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{sec.description}</p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-1 text-slate-400">
                        <Trophy className="w-3 h-3 text-yellow-500" />
                        <span className="font-mono-code text-[11px]">{bestScore > 0 ? bestScore.toLocaleString() : '---'}</span>
                      </div>
                      {isUnlocked ? (
                        <span className="text-cyan-400 font-orbitron font-bold flex items-center text-xs">
                          ENTER <ChevronRight className="w-3 h-3 ml-0.5" />
                        </span>
                      ) : (
                        <span className="text-slate-600 font-mono-code text-[10px]">LOCKED</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono-code text-slate-400">
                <span className="px-2 py-0.5 bg-slate-800 rounded border border-slate-700">Space / Tap: Invert</span>
                <span className="px-2 py-0.5 bg-slate-800 rounded border border-slate-700">Shift: Ghost Phase</span>
                <span className="px-2 py-0.5 bg-slate-800 rounded border border-slate-700">Orbs: Reset Mid-Air Flip</span>
                <span className="px-2 py-0.5 bg-slate-800 rounded border border-slate-700">R: Instant Respawn</span>
              </div>

              <button
                onClick={() => startSectorRun(0)}
                className="w-full sm:w-auto px-7 py-2.5 rounded clip-cyber-tag bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-orbitron font-black tracking-wider flex items-center justify-center space-x-2 shadow-[0_0_20px_#00f3ff] transition-transform hover:scale-105 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>START SECTOR 01</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================
          SECTOR CLEARED MODAL
          =================================================================== */}
      {gameState === 'cleared' && (
        <div className="absolute inset-0 z-30 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-md cyber-glass rounded-xl p-6 text-center clip-cyber-corner border-emerald-500/50 shadow-[0_0_35px_rgba(16,185,129,0.3)]">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-emerald-400 mb-2 shadow-[0_0_20px_#10b981]">
              <Award className="w-7 h-7" />
            </div>

            <h2 className="text-2xl font-orbitron font-black text-emerald-400 tracking-wider">
              SECTOR SECURED
            </h2>
            <p className="text-slate-400 text-xs font-mono-code mt-0.5">WARP GATE BREACHED // PURGE COMPLETE</p>

            <div className="my-4 p-4 rounded-lg bg-slate-900/80 border border-slate-800 grid grid-cols-2 gap-3 text-left">
              <div>
                <span className="text-[10px] text-slate-400 font-mono-code">SCORE</span>
                <div className="text-lg font-orbitron font-bold text-white">{runStats.score.toLocaleString()}</div>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-mono-code">RATING</span>
                <div className="text-lg font-orbitron font-black text-yellow-400">RANK {runStats.rank}</div>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-mono-code">NEAR MISSES</span>
                <div className="text-base font-orbitron font-bold text-cyan-400">{runStats.nearMisses}</div>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-mono-code">ORBS COLLECTED</span>
                <div className="text-base font-orbitron font-bold text-purple-400">{runStats.orbs}</div>
              </div>
            </div>

            <div className="flex gap-2">
              {currentSectorIndex < SECTORS.length - 1 ? (
                <button
                  onClick={() => startSectorRun(currentSectorIndex + 1)}
                  className="flex-1 py-2.5 px-4 rounded clip-cyber-tag bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-orbitron font-bold text-sm tracking-wider shadow-[0_0_20px_#10b981] cursor-pointer flex items-center justify-center space-x-1"
                >
                  <span>NEXT SECTOR</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => startSectorRun(10)}
                  className="flex-1 py-2.5 px-4 rounded clip-cyber-tag bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-orbitron font-bold text-sm tracking-wider shadow-[0_0_20px_#00f3ff] cursor-pointer flex items-center justify-center space-x-1"
                >
                  <span>PLAY ENDLESS</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={() => setGameState('menu')}
                className="py-2.5 px-4 rounded border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 font-orbitron font-bold text-xs cursor-pointer"
              >
                MENU
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================
          INSTANT-RETRY GAME OVER OVERLAY
          =================================================================== */}
      {gameState === 'gameover' && (
        <div className="absolute inset-0 z-30 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-md cyber-glass-red rounded-xl p-6 text-center clip-cyber-corner">
            <h2 className="text-2xl font-orbitron font-black text-rose-500 tracking-wider">
              RUN TERMINATED
            </h2>
            <p className="text-slate-400 text-xs font-mono-code mt-0.5">{runStats.causeOfDeath.toUpperCase()}</p>

            <div className="my-2 py-0.5 px-3 bg-red-950/60 border border-red-500/40 rounded-full inline-flex items-center space-x-1.5 text-red-300 text-xs font-mono-code">
              <Skull className="w-3.5 h-3.5 text-red-400" />
              <span>TOTAL DEATHS ON PROTOCOL: {attemptCount}</span>
            </div>

            <div className="my-1.5 flex items-center justify-center space-x-2">
              <span className="text-[10px] text-slate-400 font-mono-code">DIFFICULTY:</span>
              <button
                onClick={cycleDifficulty}
                className={`px-3 py-0.5 rounded-full border text-xs font-orbitron font-bold cursor-pointer transition-all ${diffConfig.badgeClass} ${diffConfig.glowClass} hover:brightness-125`}
                title="Click to Switch Difficulty (EASY / NORMAL / HARD / HELL)"
              >
                {diffConfig.name} ({diffConfig.speedMultiplier}x) ▾
              </button>
            </div>

            <div className="my-4 p-4 rounded-lg bg-slate-950/80 border border-red-900/40 grid grid-cols-2 gap-3 text-left">
              <div>
                <span className="text-[10px] text-slate-400 font-mono-code">DISTANCE</span>
                <div className="text-base font-orbitron font-bold text-white">{runStats.distance}m</div>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-mono-code">FINAL SCORE</span>
                <div className="text-base font-orbitron font-bold text-cyan-400">{runStats.score.toLocaleString()}</div>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-mono-code">NEAR MISSES</span>
                <div className="text-base font-orbitron font-bold text-yellow-400">{runStats.nearMisses}</div>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-mono-code">ORBS</span>
                <div className="text-base font-orbitron font-bold text-slate-300">{runStats.orbs}</div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setAttemptCount((prev) => prev + 1);
                  startSectorRun(currentSectorIndex);
                }}
                className="flex-1 py-2.5 px-4 rounded clip-cyber-tag bg-rose-600 hover:bg-rose-500 text-white font-orbitron font-bold tracking-wider text-sm shadow-[0_0_20px_#ff003c] cursor-pointer flex items-center justify-center space-x-1.5 transition-transform hover:scale-105"
              >
                <RotateCcw className="w-4 h-4" />
                <span>QUICK RETRY (R)</span>
              </button>

              <button
                onClick={() => setGameState('menu')}
                className="py-2.5 px-4 rounded border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 font-orbitron font-bold text-xs cursor-pointer"
              >
                SECTOR SELECT
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================
          PAUSE MODAL
          =================================================================== */}
      {gameState === 'paused' && (
        <div className="absolute inset-0 z-30 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className="w-full max-w-sm cyber-glass rounded-xl p-5 text-center clip-cyber-corner">
            <h2 className="text-xl font-orbitron font-black text-cyan-400 tracking-wider mb-1">
              SIMULATION PAUSED
            </h2>
            <p className="text-slate-400 text-xs font-mono-code mb-2">{activeSector.name}</p>

            <div className="mb-4 flex items-center justify-center space-x-2">
              <span className="text-[10px] text-slate-400 font-mono-code">DIFFICULTY:</span>
              <button
                onClick={cycleDifficulty}
                className={`px-3 py-0.5 rounded-full border text-xs font-orbitron font-bold cursor-pointer transition-all ${diffConfig.badgeClass} ${diffConfig.glowClass} hover:brightness-125`}
                title="Click to Switch Difficulty (EASY / NORMAL / HARD / HELL)"
              >
                {diffConfig.name} ({diffConfig.speedMultiplier}x) ▾
              </button>
            </div>

            <div className="flex flex-col space-y-2">
              <button
                onClick={() => setGameState('playing')}
                className="w-full py-2 px-4 rounded clip-cyber-tag bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-orbitron font-bold text-sm cursor-pointer"
              >
                RESUME RUN (P)
              </button>
              <button
                onClick={() => startSectorRun(currentSectorIndex)}
                className="w-full py-2 px-4 rounded border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 font-orbitron font-bold text-xs cursor-pointer"
              >
                RESTART SECTOR (R)
              </button>
              <button
                onClick={() => setGameState('menu')}
                className="w-full py-2 px-4 rounded border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-400 font-orbitron font-bold text-xs cursor-pointer"
              >
                SECTOR SELECT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
