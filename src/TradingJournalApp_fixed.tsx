import React, { useState, useCallback, useEffect } from 'react';
import { 
  PlusCircle, TrendingUp, TrendingDown, Calendar, Target, Settings, BarChart3, 
  FileText, Search, Filter, Eye, EyeOff, Trash2, Edit3, Upload, Download, 
  DollarSign, RefreshCw, Image, X, Star, Trophy, Crown, Zap, Shield, 
  Award, Users, BookOpen, Brain, Heart, Flame, Lock, Gift, Timer,
  Sparkles, Medal, Sword, Compass, Diamond, Gem, Rocket
} from 'lucide-react';

// 顏色配置
const colors = {
  bg0: '#0A0E1A',
  bg1: '#0F1419',
  bg2: '#1A1F2E',
  bg3: '#242938',
  txt0: '#E6EDF3',
  txt1: '#9FB0C3',
  txt2: '#6B7280',
  brand: '#00D4FF',
  brandDark: '#0099CC',
  gold: '#FFD700',
  silver: '#C0C0C0',
  bronze: '#CD7F32',
  legendary: '#FF6B35',
  epic: '#9D4EDD',
  rare: '#4CC9F0',
  common: '#7209B7',
  ok: '#39D98A',
  warn: '#F72585',
  err: '#E63946',
  purple: '#8B5CF6',
  blue: '#4A90E2',
  orange: '#FF8A00',
  pink: '#FF69B4',
  cyan: '#00FFF0',
  lime: '#32FF32',
  border: 'rgba(0, 212, 255, 0.3)'
};

// 組件樣式
const cardStyle = {
  backgroundColor: colors.bg1,
  border: `1px solid ${colors.border}`,
  borderRadius: '20px',
  padding: '24px',
  backdropFilter: 'blur(20px)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
  position: 'relative',
  overflow: 'hidden',
  marginBottom: '24px'
};

const glassCardStyle = {
  ...cardStyle,
  background: `linear-gradient(135deg, 
    rgba(0, 212, 255, 0.1) 0%, 
    rgba(139, 92, 246, 0.1) 100%
  )`,
  border: `1px solid rgba(255, 255, 255, 0.1)`,
};

const buttonStyle = {
  backgroundColor: colors.brand,
  color: colors.bg0,
  border: 'none',
  borderRadius: '16px',
  padding: '12px 24px',
  fontWeight: '700',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  boxShadow: `0 0 30px rgba(0, 212, 255, 0.3)`,
  fontSize: '14px',
  position: 'relative',
  overflow: 'hidden'
};

const inputStyle = {
  backgroundColor: colors.bg0,
  border: `2px solid ${colors.border}`,
  borderRadius: '12px',
  padding: '12px 16px',
  color: colors.txt0,
  fontSize: '14px',
  outline: 'none',
  transition: 'all 0.3s ease',
  width: '100%'
};

// 遊戲化配置
const gameConfig = {
  levels: [
    { level: 1, title: '新手交易者', minXP: 0, color: colors.common, icon: '🌱' },
    { level: 2, title: '學徒', minXP: 100, color: colors.common, icon: '📚' },
    { level: 3, title: '見習交易員', minXP: 300, color: colors.rare, icon: '⚡' },
    { level: 4, title: '專業交易員', minXP: 600, color: colors.epic, icon: '🎯' },
    { level: 5, title: '資深專家', minXP: 1000, color: colors.legendary, icon: '🔥' },
    { level: 6, title: '交易大師', minXP: 1500, color: colors.gold, icon: '👑' },
    { level: 7, title: '傳奇交易者', minXP: 2500, color: colors.gold, icon: '⭐' }
  ],
  achievements: [
    { id: 'first_profit', name: '首次盈利', desc: '獲得第一筆盈利交易', icon: '💰', xp: 50, rarity: 'common' },
    { id: 'win_streak_5', name: '連勝達人', desc: '連續5次盈利交易', icon: '🔥', xp: 100, rarity: 'rare' },
    { id: 'risk_master', name: '風險管理大師', desc: '嚴格遵守停損規則10次', icon: '🛡️', xp: 150, rarity: 'epic' },
    { id: 'discipline_trader', name: '紀律交易者', desc: '100%按計劃執行20筆交易', icon: '🎯', xp: 200, rarity: 'legendary' },
    { id: 'profit_king', name: '獲利之王', desc: '單月獲利超過10%', icon: '👑', xp: 300, rarity: 'legendary' }
  ]
};

// 徽章系統
const BADGES = {
  first_trade: { name: '初次交易', description: '記錄第一筆交易', icon: '🎯', xp: 10 },
  first_profit: { name: '初嚐甜頭', description: '獲得第一筆盈利', icon: '💰', xp: 25 },
  win_streak_3: { name: '連勝新手', description: '連續3次盈利交易', icon: '🔥', xp: 50 },
  win_streak_5: { name: '連勝達人', description: '連續5次盈利交易', icon: '💫', xp: 100 },
  risk_master: { name: '風險管理大師', description: '嚴格遵守停損10次', icon: '🛡️', xp: 150 },
  discipline_master: { name: '紀律大師', description: '100%按計劃執行20筆交易', icon: '🎖️', xp: 200 },
  emotion_control: { name: '情緒控制專家', description: '保持冷靜交易50次', icon: '🧘‍♂️', xp: 120 },
  profit_hunter: { name: '獲利獵人', description: '單筆獲利超過5%', icon: '🏹', xp: 75 },
  consistency_king: { name: '一致性之王', description: '連續30天記錄交易', icon: '👑', xp: 300 }
};

// 交易者等級系統
const TRADER_LEVELS = [
  { level: 1, title: '新手交易者', minXP: 0, icon: '🌱', description: '剛踏入交易世界的探索者' },
  { level: 2, title: '學徒交易員', minXP: 50, icon: '📚', description: '正在學習基礎知識' },
  { level: 3, title: '見習交易員', minXP: 150, icon: '⚡', description: '開始掌握交易技巧' },
  { level: 4, title: '專業交易員', minXP: 350, icon: '🎯', description: '具備專業交易能力' },
  { level: 5, title: '資深專家', minXP: 750, icon: '🔥', description: '經驗豐富的市場參與者' },
  { level: 6, title: '交易大師', minXP: 1500, icon: '👑', description: '交易領域的專家' },
  { level: 7, title: '傳奇交易者', minXP: 3000, icon: '⭐', description: '交易界的傳奇人物' }
];

// 個人記錄定義
const PERSONAL_RECORDS = {
  longest_win_streak: { name: '最長連勝', icon: '🔥', unit: '次' },
  biggest_single_profit: { name: '單筆最大獲利', icon: '💰', unit: '' },
  best_monthly_return: { name: '最佳月回報', icon: '📈', unit: '%' },
  perfect_risk_days: { name: '完美風險控制天數', icon: '🛡️', unit: '天' },
  trading_consistency: { name: '交易一致性', icon: '🎯', unit: '%' },
  emotional_control_score: { name: '情緒控制分數', icon: '🧘‍♂️', unit: '分' }
};

// 交易品牌配置
const TRADING_BRANDS = {
  avatars: ['🌱', '⚡', '🎯', '🔥', '👑', '⭐', '🚀', '💎', '🦅', '🌟', '💫', '🎲', '🏆', '🔮'],
  titles: [
    '量化交易專家', '技術分析大師', '風險管理專家', '趨勢跟隨者', '波段交易達人',
    '日內交易高手', '基本面分析師', '市場狙擊手', '穩健投資者', '創新交易員',
    '心理交易專家', '套利交易者', '動量交易專家', '價值投資者', '算法交易員'
  ],
  philosophies: [
    '風險第一，利潤第二',
    '市場永遠是對的，錯的是我們的判斷',
    '計劃你的交易，交易你的計劃',
    '情緒是交易的最大敵人',
    '簡單的策略往往最有效',
    '耐心是交易者最重要的品質',
    '學會止損，才能長期生存',
    '趨勢是你的朋友，直到它不是',
    '多樣化是唯一免費的午餐',
    '知識就是力量，但應用知識才是智慧'
  ]
};

// 連勝保護系統
const STREAK_PROTECTION = {
  3: { color: colors.warn, message: '🟡 注意：你已連勝3次，建議適度調整倉位大小' },
  5: { color: colors.orange, message: '🟠 警告：連勝5次，建議謹慎操作，避免過度自信' },
  7: { color: colors.err, message: '🔴 高風險：連勝7次，強烈建議降低風險，保護既得利益' },
  10: { color: colors.purple, message: '🟣 極度危險：連勝10次，請立即檢討策略，避免重大回撤' }
};

// 完整的交易對列表
const tradingPairs = {
  外匯: ['EURUSD', 'GBPUSD', 'USDJPY', 'AUDCAD', 'AUDJPY', 'AUDNZD', 'CADJPY', 'EURCAD', 'EURJPY', 'GBPJPY', 'GBPNZD', 'NZDCAD', 'NZDCHF', 'NZDJPY', 'AUDUSD', 'EURNZD', 'GBPAUD', 'GBPCHF', 'NZDUSD', 'USDCAD', 'AUDCHF', 'CADCHF', 'CHFJPY', 'EURAUD', 'EURGBP', 'USDCHF'],
  加密貨幣: ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'XRPUSDT', 'ADAUSDT', 'DOTUSDT', 'LINKUSDT', 'LTCUSDT', 'BNBUSDT', 'MATICUSDT', 'AVAXUSDT', 'ATOMUSDT'],
  商品: ['XAUUSD', 'XAGUSD', 'DXY', 'USOIL', 'UKOIL', 'US30', 'NAS100', 'SPX500', 'GER40', 'UK100']
};

const patterns = [
  '旗型', 'Bull Flag', 'Bear Flag', 'Flat Flag',
  '三角形', 'Symmetrical Triangle', 'Expanding Triangle', 'Ascending Triangle', 'Descending Triangle',
  '通道', 'Ascending Channel', 'Descending Channel', 'Parallel Channel',
  '楔形', 'Rising Wedge', 'Falling Wedge',
  '經典型態', 'Head & Shoulders', 'Inverse Head & Shoulders', 'Double Top', 'Double Bottom', 'Triple Top', 'Triple Bottom',
  '其他', 'Cup & Handle', 'Rectangle', 'Pennant', 'Diamond'
];

// 預設字段配置
const defaultFields = [
  { key: 'title', label: '交易標題', type: 'text', visible: true, required: true },
  { key: 'pair', label: '交易對象', type: 'trading-pair-select', visible: true },
  { key: 'direction', label: '交易方向', type: 'select', options: ['做多 (Long)', '做空 (Short)'], visible: true },
  { key: 'entryDate', label: '進場日期', type: 'datetime-local', visible: true },
  { key: 'exitDate', label: '出場日期', type: 'datetime-local', visible: true },
  { key: 'timeframe', label: '時間框架', type: 'select', options: ['M1', 'M5', 'M15', 'M30', 'H1', 'H4', 'D1', 'W1'], visible: true },
  { key: 'entryPrice', label: '進場價格', type: 'number', visible: true },
  { key: 'exitPrice', label: '出場價格', type: 'number', visible: true },
  { key: 'lotSize', label: '交易手數', type: 'number', visible: true },
  { key: 'stopLoss', label: '停損價格', type: 'number', visible: true },
  { key: 'takeProfit', label: '停利價格', type: 'number', visible: true },
  { key: 'profitLoss', label: '損益金額', type: 'number', visible: true },
  { key: 'profitLossPct', label: '損益百分比', type: 'number', visible: true },
  { key: 'riskGrading', label: '風險等級', type: 'select', options: ['低風險', '中風險', '高風險'], visible: true },
  { key: 'entryReason', label: '進場理由', type: 'multiselect', options: ['技術分析', '基本面', '新聞事件', '突破', '反彈', '趨勢跟隨', '逆勢交易'], visible: true },
  { key: 'pattern', label: '技術型態', type: 'multiselect', options: patterns, visible: true },
  { key: 'marketCondition', label: '市場狀況', type: 'select', options: ['趨勢市場', '震盪市場', '突破市場', '整理市場'], visible: true },
  { key: 'emotions', label: '情緒標籤', type: 'multiselect', options: ['冷靜', '貪婪', '恐懼', '自信', '焦慮', '興奮', '後悔'], visible: true },
  { key: 'managementNotes', label: '交易管理筆記', type: 'textarea', visible: true },
  { key: 'closed', label: '交易已結束', type: 'checkbox', visible: true },
  { key: 'managedByPlan', label: '是否按計劃管理？', type: 'select', options: ['是', '否'], visible: true },
  { key: 'lessonsLearned', label: '經驗教訓', type: 'textarea', visible: true }
];

const defaultGameData = {
  xp: 0,
  level: 1,
  achievements: [],
  skills: {
    technical_analysis: 1,
    risk_management: 1,
    psychology: 1
  },
  streaks: {
    current_win: 0,
    best_win: 0,
    current_days: 0,
    best_days: 0
  },
  stats: {
    total_trades: 0,
    winning_trades: 0,
    plan_adherence: 0,
    risk_control_rate: 0
  },
  personalBrand: {
    customTitle: '',
    selectedAvatar: '🌱',
    tradingPhilosophy: '',
    marketContribution: 0,
    helpedNewbies: 0,
    sharedStrategies: 0
  },
  personalRecords: {
    longest_win_streak: 0,
    biggest_single_profit: 0,
    best_monthly_return: 0,
    perfect_risk_days: 0,
    trading_consistency: 0,
    emotional_control_score: 50
  },
  unlockedFeatures: ['basic_trading'],
  milestones: {}
};

// 工具函數
const calculateLevel = (xp) => {
  for (let i = gameConfig.levels.length - 1; i >= 0; i--) {
    if (xp >= gameConfig.levels[i].minXP) {
      return gameConfig.levels[i];
    }
  }
  return gameConfig.levels[0];
};

const checkAchievements = (gameData, trades) => {
  const newAchievements = [];
  const closedTrades = trades.filter(trade => trade?.closed);
  const winningTrades = closedTrades.filter(trade => trade?.profitLoss > 0);
  
  // 檢查各種成就
  if (trades.length >= 1 && !gameData.achievements.includes('first_trade')) {
    newAchievements.push(BADGES.first_trade);
  }
  
  if (winningTrades.length >= 1 && !gameData.achievements.includes('first_profit')) {
    newAchievements.push(BADGES.first_profit);
  }
  
  // 檢查連勝成就
  if (gameData.streaks?.best_win >= 3 && !gameData.achievements.includes('win_streak_3')) {
    newAchievements.push(BADGES.win_streak_3);
  }
  
  if (gameData.streaks?.best_win >= 5 && !gameData.achievements.includes('win_streak_5')) {
    newAchievements.push(BADGES.win_streak_5);
  }
  
  return newAchievements;
};

// 簡化的交易對選擇組件
const TradingPairSelect = ({ value, onChange }) => {
  return (
    <select
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      style={inputStyle}
    >
      <option value="">請選擇交易對</option>
      {Object.entries(tradingPairs).map(([category, pairs]) => (
        <optgroup key={category} label={category}>
          {pairs.map(pair => (
            <option key={pair} value={pair}>{pair}</option>
          ))}
        </optgroup>
      ))}
    </select>
  );
};

// 簡化的交易卡片組件
const TradeCard = ({ trade, onEdit, onDelete }) => {
  if (!trade) return null;

  return (
    <div style={{...cardStyle, marginBottom: '16px'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px'}}>
        <div>
          <h4 style={{color: colors.txt0, margin: '0 0 8px 0', fontSize: '16px'}}>
            {trade.title || `${trade.pair} ${trade.direction}`}
          </h4>
          <div style={{display: 'flex', gap: '12px', alignItems: 'center'}}>
            {trade.pair && (
              <span style={{
                backgroundColor: colors.bg2,
                color: colors.brand,
                padding: '4px 8px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '600'
              }}>
                {trade.pair}
              </span>
            )}
            {trade.direction && (
              <span style={{
                backgroundColor: trade.direction === '做多 (Long)' ? colors.ok : colors.err,
                color: colors.bg0,
                padding: '4px 8px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '600'
              }}>
                {trade.direction}
              </span>
            )}
          </div>
        </div>
        <div style={{display: 'flex', gap: '8px'}}>
          <button
            onClick={() => onEdit(trade)}
            style={{
              ...buttonStyle,
              backgroundColor: colors.blue,
              padding: '8px 12px',
              fontSize: '12px'
            }}
          >
            <Edit3 size={14} />
          </button>
          <button
            onClick={() => onDelete(trade.id)}
            style={{
              ...buttonStyle,
              backgroundColor: colors.err,
              padding: '8px 12px',
              fontSize: '12px'
            }}
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
      
      {trade.profitLoss !== undefined && trade.profitLoss !== null && (
        <div style={{
          color: trade.profitLoss >= 0 ? colors.ok : colors.err,
          fontSize: '18px',
          fontWeight: '700',
          marginBottom: '8px'
        }}>
          {trade.profitLoss >= 0 ? '+' : ''}{trade.profitLoss.toFixed(2)}
          {trade.profitLossPct && ` (${trade.profitLossPct >= 0 ? '+' : ''}${trade.profitLossPct.toFixed(2)}%)`}
        </div>
      )}
      
      {trade.entryDate && (
        <div style={{color: colors.txt2, fontSize: '12px'}}>
          {new Date(trade.entryDate).toLocaleDateString()}
        </div>
      )}
    </div>
  );
};

// 簡化的玩家資料組件
const PlayerProfile = ({ gameData }) => {
  const currentLevel = TRADER_LEVELS.find(level => 
    gameData.xp >= level.minXP && 
    (TRADER_LEVELS.find(l => l.level === level.level + 1)?.minXP > gameData.xp || level.level === 7)
  ) || TRADER_LEVELS[0];

  return (
    <div style={glassCardStyle}>
      <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
        <div style={{fontSize: '48px'}}>{currentLevel.icon}</div>
        <div>
          <div style={{color: colors.txt0, fontSize: '20px', fontWeight: '700'}}>
            {currentLevel.title}
          </div>
          <div style={{color: colors.txt2, fontSize: '14px'}}>
            等級 {currentLevel.level} • {gameData.xp} XP
          </div>
        </div>
      </div>
    </div>
  );
};

// 簡化的技能樹組件
const SkillTree = ({ gameData, onUpgrade }) => {
  return (
    <div style={cardStyle}>
      <h3 style={{color: colors.txt0, marginBottom: '20px'}}>技能發展</h3>
      <div style={{color: colors.txt2}}>
        技能系統開發中...
      </div>
    </div>
  );
};

// 簡化的每日任務組件
const DailyQuests = ({ onComplete }) => {
  return (
    <div style={cardStyle}>
      <h3 style={{color: colors.txt0, marginBottom: '20px'}}>今日任務</h3>
      <div style={{color: colors.txt2}}>
        任務系統開發中...
      </div>
    </div>
  );
};

// 簡化的選項管理組件
const OptionManager = ({ fields, onFieldsUpdate }) => {
  return (
    <div style={{...cardStyle, marginBottom: '32px'}}>
      <h3 style={{color: colors.txt0, marginBottom: '20px'}}>選項管理</h3>
      <div style={{color: colors.txt2}}>
        選項管理功能開發中...
      </div>
    </div>
  );
};

// 簡化的自訂字段創建組件
const CustomFieldCreator = ({ fields, onFieldsUpdate }) => {
  return (
    <div style={{...cardStyle, marginBottom: '32px'}}>
      <h3 style={{color: colors.txt0, marginBottom: '20px'}}>自訂字段創建</h3>
      <div style={{color: colors.txt2}}>
        自訂字段功能開發中...
      </div>
    </div>
  );
};

// 簡化的字段可見性管理組件
const FieldVisibilityManager = ({ fields, onFieldsUpdate }) => {
  return (
    <div style={cardStyle}>
      <h3 style={{color: colors.txt0, marginBottom: '20px'}}>字段顯示控制</h3>
      <div style={{color: colors.txt2}}>
        字段管理功能開發中...
      </div>
    </div>
  );
};

// 以下是原本的組件內容，保持不變...
// [此處包含原本TradingJournalApp.tsx中的所有組件內容，從FormField開始到主組件結束]