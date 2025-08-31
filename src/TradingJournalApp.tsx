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

// 工具函數
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

// 表單字段組件
const FormField = ({ field, value, onChange }) => {
  const handleChange = (newValue) => {
    onChange(field.key, newValue);
  };

  switch (field.type) {
    case 'text':
    case 'number':
    case 'date':
    case 'datetime-local':
      return (
        <input
          type={field.type}
          value={value || ''}
          onChange={(e) => handleChange(field.type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value)}
          style={inputStyle}
          placeholder={field.label}
        />
      );
    
    case 'textarea':
      return (
        <textarea
          value={value || ''}
          onChange={(e) => handleChange(e.target.value)}
          style={{...inputStyle, minHeight: '100px', resize: 'vertical'}}
          placeholder={field.label}
        />
      );
    
    case 'select':
      return (
        <select
          value={value || ''}
          onChange={(e) => handleChange(e.target.value)}
          style={inputStyle}
        >
          <option value="">請選擇 {field.label}</option>
          {field.options?.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      );
    
    case 'trading-pair-select':
      return (
        <TradingPairSelect
          value={value}
          onChange={handleChange}
        />
      );
    
    case 'checkbox':
      return (
        <label style={{display: 'flex', alignItems: 'center', gap: '12px', color: colors.txt0, cursor: 'pointer'}}>
          <input
            type="checkbox"
            checked={value || false}
            onChange={(e) => handleChange(e.target.checked)}
            style={{
              accentColor: colors.brand,
              width: '18px',
              height: '18px',
              cursor: 'pointer'
            }}
          />
          <span style={{ fontSize: '14px' }}>{field.label}</span>
        </label>
      );
    
    case 'multiselect':
      const selectedValues = value || [];
      return (
        <div>
          <div style={{marginBottom: '12px', fontSize: '14px', color: colors.txt1, fontWeight: '600'}}>{field.label}</div>
          <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px', maxHeight: '200px', overflowY: 'auto'}}>
            {field.options?.map(option => {
              const isSelected = selectedValues.includes(option);
              return (
                <button
                  key={option}
                  onClick={() => {
                    const newValues = isSelected 
                      ? selectedValues.filter(v => v !== option)
                      : [...selectedValues, option];
                    handleChange(newValues);
                  }}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '20px',
                    border: 'none',
                    fontSize: '12px',
                    cursor: 'pointer',
                    backgroundColor: isSelected ? colors.brand : colors.bg2,
                    color: isSelected ? colors.bg0 : colors.txt0,
                    transition: 'all 0.2s ease',
                    fontWeight: '600'
                  }}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      );
    
    case 'image':
      return (
        <ImageUpload
          value={value}
          onChange={handleChange}
          label={field.label}
        />
      );
    
    default:
      return null;
  }
};

// 統計儀表板組件
const StatsDashboard = ({ trades, accountBalance, totalPL, gameData }) => {
  // 確保 trades 是數組
  const validTrades = Array.isArray(trades) ? trades : [];
  const closedTrades = validTrades.filter(trade => trade?.closed && trade?.profitLoss !== undefined && trade?.profitLoss !== null);
  const winningTrades = closedTrades.filter(trade => trade?.profitLoss > 0);
  const winRate = closedTrades.length > 0 ? (winningTrades.length / closedTrades.length * 100) : 0;
  const avgReturn = closedTrades.length > 0 ? closedTrades.reduce((sum, trade) => sum + (trade?.profitLoss || 0), 0) / closedTrades.length : 0;
  const adherenceRate = closedTrades.length > 0 ? (closedTrades.filter(trade => trade?.managedByPlan === '是').length / closedTrades.length * 100) : 0;
  const totalTrades = validTrades.length;
  
  const stats = [
    { label: '帳戶餘額', value: `${accountBalance.toFixed(2)}`, color: colors.brand, icon: <DollarSign size={20} /> },
    { label: '總損益', value: `${totalPL >= 0 ? '+' : ''}${totalPL.toFixed(2)}`, color: totalPL >= 0 ? colors.ok : colors.err, icon: <TrendingUp size={20} /> },
    { label: '總交易數', value: `${totalTrades}`, color: colors.purple, icon: <FileText size={20} /> },
    { label: '勝率', value: `${winRate.toFixed(1)}%`, color: colors.ok, icon: <Target size={20} /> },
    { label: '平均回報', value: `${avgReturn >= 0 ? '+' : ''}${avgReturn.toFixed(2)}`, color: avgReturn >= 0 ? colors.ok : colors.err, icon: <BarChart3 size={20} /> },
    { label: '計劃遵守率', value: `${adherenceRate.toFixed(1)}%`, color: colors.brand, icon: <Calendar size={20} /> }
  ];

  return (
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '32px'}}>
      {stats.map(stat => (
        <div key={stat.label} style={{...glassCardStyle, textAlign: 'center'}}>
          <div style={{display: 'flex', justifyContent: 'center', marginBottom: '12px', color: stat.color}}>
            {stat.icon}
          </div>
          <div style={{color: colors.txt2, fontSize: '14px', marginBottom: '8px', fontWeight: '600'}}>{stat.label}</div>
          <div style={{color: stat.color, fontSize: '28px', fontWeight: '700'}}>{stat.value}</div>
        </div>
      ))}
    </div>
  );
};

// 主應用組件
const TradingJournalApp = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [trades, setTrades] = useState([]);
  const [editingTrade, setEditingTrade] = useState(null);
  const [formData, setFormData] = useState({});
  const [fields, setFields] = useState(defaultFields);
  const [searchTerm, setSearchTerm] = useState('');
  const [accountBalance, setAccountBalance] = useState(10000);
  const [gameData, setGameData] = useState(() => {
    // 確保 gameData 有正確的結構
    return {
      ...defaultGameData,
      personalBrand: defaultGameData.personalBrand || {
        customTitle: '',
        selectedAvatar: '🌱',
        tradingPhilosophy: '',
        marketContribution: 0,
        helpedNewbies: 0,
        sharedStrategies: 0
      },
      personalRecords: defaultGameData.personalRecords || {
        longest_win_streak: 0,
        biggest_single_profit: 0,
        best_monthly_return: 0,
        perfect_risk_days: 0,
        trading_consistency: 0,
        emotional_control_score: 50
      },
      unlockedFeatures: defaultGameData.unlockedFeatures || ['basic_trading'],
      milestones: defaultGameData.milestones || {}
    };
  });
  const [showAchievementPopup, setShowAchievementPopup] = useState(null);
  const [strategyTemplates, setStrategyTemplates] = useState([]);

  // 計算總損益 - 從當前狀態或傳入參數計算
  const calculateTotalPL = (tradesData = trades) => {
    return tradesData.reduce((sum, trade) => {
      if (trade.closed && trade.profitLoss) {
        return sum + trade.profitLoss;
      }
      return sum;
    }, 0);
  };

  // 當前總損益
  const totalPL = calculateTotalPL();

  // 更新遊戲數據 - 根據交易表現動態調整
  const updateGameData = useCallback((tradesData) => {
    console.log('=== updateGameData 開始 ===');
    console.log('處理交易數量:', tradesData?.length || 0);
    
    // 確保 tradesData 是數組
    const validTradesData = Array.isArray(tradesData) ? tradesData : [];
    
    const newGameData = { ...gameData };
    
    // 更新統計
    const closedTrades = validTradesData.filter(trade => trade?.closed);
    const winningTrades = closedTrades.filter(trade => trade?.profitLoss > 0);
    
    console.log('已結束交易:', closedTrades.length);
    console.log('盈利交易:', winningTrades.length);
    
    newGameData.stats = {
      total_trades: validTradesData.length,
      winning_trades: winningTrades.length,
      plan_adherence: closedTrades.filter(trade => trade?.managedByPlan === '是').length,
      risk_control_rate: closedTrades.filter(trade => trade?.stopLoss && trade?.managedByPlan === '是').length
    };
    
    // 計算連勝
    let currentWin = 0;
    let bestWin = 0;
    for (let i = closedTrades.length - 1; i >= 0; i--) {
      if (closedTrades[i]?.profitLoss > 0) {
        currentWin++;
        bestWin = Math.max(bestWin, currentWin);
      } else {
        currentWin = 0;
      }
    }
    
    newGameData.streaks = {
      ...newGameData.streaks,
      current_win: currentWin,
      best_win: Math.max(bestWin, newGameData.streaks?.best_win || 0)
    };

    // 更新個人記錄
    if (!newGameData.personalRecords) {
      newGameData.personalRecords = defaultGameData.personalRecords;
    }

    // 更新最長連勝紀錄
    newGameData.personalRecords.longest_win_streak = Math.max(
      newGameData.personalRecords.longest_win_streak || 0,
      bestWin
    );

    // 更新單筆最大獲利
    const maxProfit = closedTrades.reduce((max, trade) => 
      Math.max(max, trade?.profitLoss || 0), 0);
    newGameData.personalRecords.biggest_single_profit = Math.max(
      newGameData.personalRecords.biggest_single_profit || 0,
      maxProfit
    );

    // 計算情緒控制分數 - 基於冷靜交易的比例
    const calmTrades = closedTrades.filter(trade => 
      trade?.emotions?.includes && trade.emotions.includes('冷靜')).length;
    const emotionalControlScore = closedTrades.length > 0 ? 
      Math.round((calmTrades / closedTrades.length) * 100) : 50;
    newGameData.personalRecords.emotional_control_score = emotionalControlScore;

    // 計算交易一致性 - 基於按計劃執行的比例
    const consistencyScore = closedTrades.length > 0 ? 
      Math.round((newGameData.stats.plan_adherence / closedTrades.length) * 100) : 0;
    newGameData.personalRecords.trading_consistency = consistencyScore;
    
    // 檢查新成就
    const newAchievements = checkAchievements(newGameData, validTradesData);
    if (Array.isArray(newAchievements) && newAchievements.length > 0) {
      newGameData.achievements = [...(newGameData.achievements || []), ...newAchievements.map(a => a.id)];
      newGameData.xp += newAchievements.reduce((sum, a) => sum + (a.xp || 0), 0);
      
      // 顯示成就彈窗
      if (newAchievements.length > 0) {
        setShowAchievementPopup(newAchievements[0]);
        setTimeout(() => setShowAchievementPopup(null), 4000);
      }
    }
    
    // 動態XP系統 - 根據交易表現調整XP
    let totalXP = 0;
    closedTrades.forEach(trade => {
      if (trade && !trade.xpAwarded) {
        let xp = 10; // 基礎XP
        
        // 盈利獎勵 - 根據盈利幅度給予不同XP
        if (trade.profitLoss > 0) {
          if (trade.profitLossPct > 5) xp += 50; // 大幅盈利
          else if (trade.profitLossPct > 2) xp += 30; // 中等盈利
          else xp += 20; // 小幅盈利
        } else if (trade.profitLoss < 0) {
          // 虧損但有控制風險的獎勵
          if (trade.managedByPlan === '是' && Math.abs(trade.profitLossPct || 0) < 2) {
            xp += 10; // 控制虧損獎勵
          }
        }
        
        // 計劃執行獎勵
        if (trade.managedByPlan === '是') xp += 15;
        
        // 情緒控制獎勵
        if (trade.emotions?.includes && trade.emotions.includes('冷靜')) xp += 10;
        
        // 風險管理獎勵
        if (trade.stopLoss && trade.takeProfit) xp += 5;
        
        // 連勝獎勵
        if (currentWin >= 3) xp *= 1.5;
        if (currentWin >= 5) xp *= 2;
        
        totalXP += Math.floor(xp);
        trade.xpAwarded = true;
      }
    });
    
    newGameData.xp = (newGameData.xp || 0) + totalXP;
    
    // 根據總損益調整XP加成
    const totalPL = closedTrades.reduce((sum, trade) => sum + (trade?.profitLoss || 0), 0);
    if (totalPL > 1000) newGameData.xp += 100; // 大額盈利獎勵
    else if (totalPL > 500) newGameData.xp += 50;
    else if (totalPL > 100) newGameData.xp += 25;
    
    // 勝率獎勵
    const winRate = closedTrades.length > 0 ? (winningTrades.length / closedTrades.length) : 0;
    if (winRate >= 0.8 && closedTrades.length >= 10) newGameData.xp += 200; // 高勝率獎勵
    else if (winRate >= 0.6 && closedTrades.length >= 5) newGameData.xp += 100;
    
    console.log('更新後的遊戲數據:', newGameData);
    setGameData(newGameData);
    localStorage.setItem('tradingJournalGameData', JSON.stringify(newGameData));
    
    console.log('=== updateGameData 完成 ===');
  }, [gameData]);

  // 保存字段配置
  const saveFields = (newFields) => {
    setFields(newFields);
    localStorage.setItem('tradingJournalFields', JSON.stringify(newFields));
  };

  // 從記憶體載入數據
  useEffect(() => {
    try {
      const savedTrades = localStorage.getItem('tradingJournalTrades');
      const savedFields = localStorage.getItem('tradingJournalFields');
      const savedBalance = localStorage.getItem('tradingJournalBalance');
      const savedGameData = localStorage.getItem('tradingJournalGameData');
      const savedBaseAccount = localStorage.getItem('tradingJournalBaseAccount');
      
      if (savedTrades) {
        const tradesData = JSON.parse(savedTrades);
        setTrades(tradesData);
        setTimeout(() => updateGameData(tradesData), 100);
      }
      if (savedFields) {
        setFields(JSON.parse(savedFields));
      }
      if (savedBalance) {
        setAccountBalance(parseFloat(savedBalance));
      } else if (savedBaseAccount) {
        // 如果沒有保存的餘額但有基礎帳戶，則設定為基礎帳戶金額
        const baseAccount = parseFloat(savedBaseAccount);
        setAccountBalance(baseAccount);
        localStorage.setItem('tradingJournalBalance', baseAccount.toString());
      }
      if (savedGameData) {
        const loadedGameData = JSON.parse(savedGameData);
        // 確保載入的數據包含新的屬性
        const completeGameData = {
          ...defaultGameData,
          ...loadedGameData,
          personalBrand: {
            ...defaultGameData.personalBrand,
            ...(loadedGameData.personalBrand || {})
          },
          personalRecords: {
            ...defaultGameData.personalRecords,
            ...(loadedGameData.personalRecords || {})
          },
          unlockedFeatures: loadedGameData.unlockedFeatures || defaultGameData.unlockedFeatures,
          milestones: loadedGameData.milestones || defaultGameData.milestones
        };
        setGameData(completeGameData);
      }
      
      // 載入策略模板
      const savedTemplates = localStorage.getItem('strategyTemplates');
      if (savedTemplates) {
        setStrategyTemplates(JSON.parse(savedTemplates));
      }
    } catch (error) {
      console.error('載入數據失敗:', error);
    }
  }, []);

  // 保存到記憶體
  const saveTrades = (newTrades) => {
    console.log('=== saveTrades 開始 ===');
    console.log('新交易數量:', newTrades.length);
    
    // 立即更新交易狀態
    setTrades(newTrades);
    localStorage.setItem('tradingJournalTrades', JSON.stringify(newTrades));
    
    // 重新計算總損益並更新帳戶餘額
    const newTotalPL = calculateTotalPL(newTrades);
    console.log('新的總損益:', newTotalPL);
    
    // 使用動態基礎帳戶金額
    const baseAccount = parseFloat(localStorage.getItem('tradingJournalBaseAccount')) || 10000;
    const newBalance = baseAccount + newTotalPL;
    setAccountBalance(newBalance);
    localStorage.setItem('tradingJournalBalance', newBalance.toString());
    
    console.log('基礎帳戶:', baseAccount);
    console.log('新的帳戶餘額:', newBalance);
    
    // 強制重新計算並更新遊戲數據
    setTimeout(() => {
      console.log('更新遊戲數據中...');
      updateGameData(newTrades);
    }, 100);
    
    console.log('=== saveTrades 完成 ===');
  };

  const saveGameData = (newGameData) => {
    setGameData(newGameData);
    localStorage.setItem('tradingJournalGameData', JSON.stringify(newGameData));
  };

  // 技能升級
  const handleSkillUpgrade = (skillId, level) => {
    const skill = gameConfig.skills.find(s => s.id === skillId);
    const levelInfo = skill.levels[level - 1];
    
    if (gameData.xp >= levelInfo.xpCost) {
      const newGameData = {
        ...gameData,
        xp: gameData.xp - levelInfo.xpCost,
        skills: {
          ...gameData.skills,
          [skillId]: level
        }
      };
      saveGameData(newGameData);
    }
  };

  // 新增或編輯交易
  const handleSaveTrade = () => {
    console.log('=== handleSaveTrade 開始 ===');
    console.log('表單資料:', formData);
    
    const tradeData = { 
      ...formData, 
      id: editingTrade?.id || Date.now(),
      lastUpdated: new Date().toISOString()
    };
    
    let newTrades;
    if (editingTrade) {
      console.log('編輯現有交易:', editingTrade.id);
      newTrades = trades.map(trade => trade.id === editingTrade.id ? tradeData : trade);
    } else {
      console.log('新增交易');
      newTrades = [...trades, tradeData];
    }
    
    // 保存交易並觸發更新
    saveTrades(newTrades);
    
    setEditingTrade(null);
    setFormData({});
    setCurrentView('dashboard'); // 修改：回到儀表板查看更新
    
    console.log('=== handleSaveTrade 完成 ===');
  };

  // 刪除交易 - 測試成功版本
  const handleDeleteTrade = (tradeId) => {
    console.log('=== 開始刪除交易 ===');
    console.log('交易ID:', tradeId);
    console.log('當前交易列表長度:', trades.length);
    
    // 找到要刪除的交易
    const tradeIndex = trades.findIndex(trade => trade.id === tradeId);
    console.log('找到交易索引:', tradeIndex);
    
    if (tradeIndex === -1) {
      console.error('找不到要刪除的交易');
      alert('錯誤：找不到要刪除的交易記錄');
      return;
    }
    
    const tradeToDelete = trades[tradeIndex];
    console.log('要刪除的交易:', tradeToDelete);
    
    try {
      // 創建新的交易列表（移除指定交易）
      const newTrades = [...trades];
      newTrades.splice(tradeIndex, 1);
      
      console.log('新交易列表長度:', newTrades.length);
      
      // 立即更新狀態
      setTrades(newTrades);
      
      // 更新localStorage
      localStorage.setItem('tradingJournalTrades', JSON.stringify(newTrades));
      
      // 重新計算帳戶餘額
      const totalPL = newTrades.reduce((sum, trade) => {
        if (trade.closed && trade.profitLoss) {
          return sum + trade.profitLoss;
        }
        return sum;
      }, 0);
      
      const newBalance = 10000 + totalPL;
      setAccountBalance(newBalance);
      localStorage.setItem('tradingJournalBalance', newBalance.toString());
      
      // 更新遊戲數據
      setTimeout(() => updateGameData(newTrades), 100);
      
      console.log('=== 刪除成功 ===');
      
    } catch (error) {
      console.error('刪除失敗:', error);
      alert('刪除失敗，請重試');
    }
  };

  // 編輯交易
  const handleEditTrade = (trade) => {
    setEditingTrade(trade);
    setFormData(trade);
    setCurrentView('edit');
  };

  // 過濾交易
  const filteredTrades = Array.isArray(trades) ? trades.filter(trade => 
    trade && (
      trade.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trade.pair?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trade.direction?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  ) : [];

  // 渲染導航
  const renderNavigation = () => (
    <div style={{
      backgroundColor: colors.bg1,
      padding: '20px',
      borderRadius: '20px',
      marginBottom: '32px',
      display: 'flex',
      gap: '16px',
      flexWrap: 'wrap',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
    }}>
      {[
        { key: 'dashboard', label: '儀表板', icon: <BarChart3 size={18} /> },
        { key: 'trades', label: '交易記錄', icon: <FileText size={18} /> },
        { key: 'achievements', label: '成就系統', icon: <Trophy size={18} /> },
        { key: 'skills', label: '技能樹', icon: <Brain size={18} /> },
        { key: 'brand', label: '個人品牌', icon: <Crown size={18} /> },
        { key: 'quests', label: '每日任務', icon: <Target size={18} /> },
        { key: 'settings', label: '設置', icon: <Settings size={18} /> }
      ].map(nav => (
        <button
          key={nav.key}
          onClick={() => setCurrentView(nav.key)}
          style={{
            ...buttonStyle,
            backgroundColor: currentView === nav.key ? colors.brand : 'transparent',
            color: currentView === nav.key ? colors.bg0 : colors.txt0,
            boxShadow: currentView === nav.key ? `0 0 20px rgba(0, 212, 255, 0.4)` : 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 20px'
          }}
        >
          {nav.icon}
          {nav.label}
        </button>
      ))}
    </div>
  );

  // 成就彈窗組件
  const AchievementPopup = ({ achievement }) => {
    if (!achievement) return null;

    const rarityColors = {
      common: colors.common,
      rare: colors.rare,
      epic: colors.epic,
      legendary: colors.legendary
    };

    return (
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000,
        backgroundColor: colors.bg1,
        border: `2px solid ${rarityColors[achievement.rarity]}`,
        borderRadius: '16px',
        padding: '20px',
        boxShadow: `0 8px 32px rgba(0, 0, 0, 0.6)`,
        animation: 'slideInRight 0.5s ease'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '8px'
        }}>
          <div style={{ fontSize: '32px' }}>{achievement.icon}</div>
          <div>
            <div style={{
              color: colors.gold,
              fontSize: '16px',
              fontWeight: '700'
            }}>
              🎉 成就解鎖！
            </div>
            <div style={{
              color: rarityColors[achievement.rarity],
              fontSize: '18px',
              fontWeight: '700'
            }}>
              {achievement.name}
            </div>
          </div>
        </div>
        <div style={{
          color: colors.txt1,
          fontSize: '14px',
          marginBottom: '8px'
        }}>
          {achievement.desc}
        </div>
        <div style={{
          color: colors.gold,
          fontSize: '14px',
          fontWeight: '700'
        }}>
          +{achievement.xp} XP 獲得！
        </div>
      </div>
    );
  };

  // 渲染內容
  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px'}}>
              <h2 style={{color: colors.txt0, margin: 0, fontSize: '32px', fontWeight: '700'}}>交易儀表板</h2>
              <button
                onClick={() => {
                  setEditingTrade(null);
                  setFormData({});
                  setCurrentView('edit');
                }}
                style={{...buttonStyle, display: 'flex', alignItems: 'center', gap: '8px'}}
              >
                <PlusCircle size={18} />
                新增交易
              </button>
            </div>

            {/* 個人交易品牌展示區 */}
            <div style={{
              ...cardStyle,
              marginBottom: '20px',
              background: `linear-gradient(135deg, ${colors.legendary}20, ${colors.bg1})`,
              border: `2px solid ${colors.legendary}30`
            }}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px'}}>
                <h3 style={{color: colors.txt0, margin: 0, fontSize: '20px', fontWeight: '700'}}>
                  個人交易品牌
                </h3>
                <button
                  onClick={() => setCurrentView('brand')}
                  style={{
                    ...buttonStyle,
                    backgroundColor: colors.legendary,
                    padding: '6px 12px',
                    fontSize: '12px'
                  }}
                >
                  自訂品牌
                </button>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                <div style={{fontSize: '48px'}}>{gameData.personalBrand?.selectedAvatar || '🌱'}</div>
                <div style={{flex: 1}}>
                  <div style={{color: colors.legendary, fontSize: '18px', fontWeight: '700', marginBottom: '4px'}}>
                    {gameData.personalBrand?.customTitle || '點擊自訂你的交易稱號'}
                  </div>
                  <div style={{color: colors.txt2, fontSize: '14px', fontStyle: 'italic'}}>
                    "{gameData.personalBrand?.tradingPhilosophy || '建立你的交易哲學...'}"
                  </div>
                  <div style={{display: 'flex', gap: '16px', marginTop: '8px'}}>
                    <span style={{color: colors.txt2, fontSize: '12px'}}>
                      貢獻度: {gameData.personalBrand?.marketContribution || 0}
                    </span>
                    <span style={{color: colors.txt2, fontSize: '12px'}}>
                      幫助新手: {gameData.personalBrand?.helpedNewbies || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 個人記錄展示區 */}
            <div style={{
              ...cardStyle,
              marginBottom: '20px',
              background: `linear-gradient(135deg, ${colors.gold}20, ${colors.bg1})`,
              border: `2px solid ${colors.gold}30`
            }}>
              <h3 style={{color: colors.txt0, marginBottom: '16px', fontSize: '20px', fontWeight: '700'}}>
                🏆 個人最佳記錄
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '12px'
              }}>
                {Object.entries(PERSONAL_RECORDS).map(([key, record]) => (
                  <div key={key} style={{
                    textAlign: 'center',
                    padding: '12px',
                    backgroundColor: colors.bg0,
                    borderRadius: '12px',
                    border: `1px solid ${colors.gold}30`
                  }}>
                    <div style={{fontSize: '24px', marginBottom: '4px'}}>{record.icon}</div>
                    <div style={{color: colors.gold, fontSize: '18px', fontWeight: '700'}}>
                      {gameData.personalRecords?.[key] || 0}{record.unit}
                    </div>
                    <div style={{color: colors.txt2, fontSize: '11px', lineHeight: '1.2'}}>
                      {record.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 交易者等級顯示 */}
            <div style={{
              ...cardStyle,
              marginBottom: '20px',
              background: `linear-gradient(135deg, ${colors.brand}20, ${colors.brand}05)`,
              border: `2px solid ${colors.brand}30`
            }}>
              <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                <div style={{fontSize: '48px'}}>
                  {(() => {
                    const currentLevel = TRADER_LEVELS.find(level => gameData.xp >= level.minXP && (TRADER_LEVELS.find(l => l.level === level.level + 1)?.minXP > gameData.xp || level.level === 50));
                    return currentLevel?.icon || '🌱';
                  })()}
                </div>
                <div style={{flex: 1}}>
                  <div style={{color: colors.txt0, fontSize: '24px', fontWeight: '700', marginBottom: '4px'}}>
                    {(() => {
                      const currentLevel = TRADER_LEVELS.find(level => gameData.xp >= level.minXP && (TRADER_LEVELS.find(l => l.level === level.level + 1)?.minXP > gameData.xp || level.level === 50));
                      return currentLevel?.title || '新手交易者';
                    })()}
                  </div>
                  <div style={{color: colors.txt2, fontSize: '14px', marginBottom: '8px'}}>
                    {(() => {
                      const currentLevel = TRADER_LEVELS.find(level => gameData.xp >= level.minXP && (TRADER_LEVELS.find(l => l.level === level.level + 1)?.minXP > gameData.xp || level.level === 50));
                      return currentLevel?.description || '剛踏入交易世界的探索者';
                    })()}
                  </div>
                  <div style={{color: colors.txt2, fontSize: '14px'}}>
                    等級 {(() => {
                      const currentLevel = TRADER_LEVELS.find(level => gameData.xp >= level.minXP && (TRADER_LEVELS.find(l => l.level === level.level + 1)?.minXP > gameData.xp || level.level === 50));
                      return currentLevel?.level || 1;
                    })()} • {gameData.xp} XP
                  </div>
                </div>
                <div style={{textAlign: 'right'}}>
                  <div style={{color: colors.brand, fontSize: '14px', fontWeight: '600'}}>
                    已獲得 {gameData.achievements.length} 個徽章
                  </div>
                </div>
              </div>
            </div>

            {/* 連勝保護警告 */}
            {gameData.streaks.current_win >= 3 && (
              <div style={{
                ...cardStyle,
                marginBottom: '20px',
                backgroundColor: STREAK_PROTECTION[gameData.streaks.current_win]?.color + '20',
                border: `2px solid ${STREAK_PROTECTION[gameData.streaks.current_win]?.color}50`
              }}>
                <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                  <div style={{fontSize: '24px'}}>⚠️</div>
                  <div>
                    <div style={{color: colors.txt0, fontSize: '16px', fontWeight: '600', marginBottom: '4px'}}>
                      連勝保護提醒
                    </div>
                    <div style={{color: STREAK_PROTECTION[gameData.streaks.current_win]?.color, fontSize: '14px'}}>
                      {STREAK_PROTECTION[gameData.streaks.current_win]?.message}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <PlayerProfile gameData={gameData} onUpdate={saveGameData} />
            <StatsDashboard trades={trades} accountBalance={accountBalance} totalPL={totalPL} gameData={gameData} />
            
            <div style={cardStyle}>
              <h3 style={{color: colors.txt0, marginBottom: '20px', fontSize: '20px'}}>最近交易</h3>
              {trades.length === 0 ? (
                <div style={{textAlign: 'center', color: colors.txt2, padding: '40px'}}>
                  還沒有交易記錄，開始添加第一筆交易吧！
                </div>
              ) : (
                trades.slice(-3).reverse().map(trade => (
                  <TradeCard key={trade.id} trade={trade} onEdit={handleEditTrade} onDelete={handleDeleteTrade} gameData={gameData} />
                ))
              )}
            </div>
          </div>
        );

      case 'trades':
        return (
          <div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', gap: '16px', flexWrap: 'wrap'}}>
              <h2 style={{color: colors.txt0, margin: 0, fontSize: '32px', fontWeight: '700'}}>交易記錄</h2>
              <div style={{display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap'}}>
                <div style={{position: 'relative'}}>
                  <Search size={18} style={{position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: colors.txt2}} />
                  <input
                    type="text"
                    placeholder="搜尋交易..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{...inputStyle, paddingLeft: '48px', width: '250px'}}
                  />
                </div>
                <button
                  onClick={() => {
                    setEditingTrade(null);
                    setFormData({});
                    setCurrentView('edit');
                  }}
                  style={{...buttonStyle, display: 'flex', alignItems: 'center', gap: '8px'}}
                >
                  <PlusCircle size={18} />
                  新增交易
                </button>
              </div>
            </div>
            <div>
              {filteredTrades.length === 0 ? (
                <div style={cardStyle}>
                  <div style={{textAlign: 'center', color: colors.txt2, padding: '60px'}}>
                    {searchTerm ? '沒有找到匹配的交易記錄' : '還沒有交易記錄，開始添加第一筆交易吧！'}
                  </div>
                </div>
              ) : (
                filteredTrades.reverse().map(trade => (
                  <TradeCard key={trade.id} trade={trade} onEdit={handleEditTrade} onDelete={handleDeleteTrade} gameData={gameData} />
                ))
              )}
            </div>
          </div>
        );

      case 'achievements':
        return (
          <div>
            <h2 style={{color: colors.txt0, marginBottom: '32px', fontSize: '32px', fontWeight: '700'}}>成就系統</h2>
            
            {/* 已獲得徽章區域 */}
            <div style={{...cardStyle, marginBottom: '32px'}}>
              <h3 style={{color: colors.txt0, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px'}}>
                <Trophy size={20} />
                已獲得徽章 ({gameData.achievements.length})
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px'
              }}>
                {gameData.achievements.length === 0 ? (
                  <div style={{
                    textAlign: 'center',
                    color: colors.txt2,
                    padding: '40px',
                    gridColumn: '1 / -1'
                  }}>
                    還沒有獲得任何徽章，開始交易來解鎖成就吧！
                  </div>
                ) : (
                  gameData.achievements.map(badgeId => {
                    const badge = BADGES[badgeId];
                    if (!badge) return null;
                    return (
                      <div key={badgeId} style={{
                        padding: '16px',
                        backgroundColor: colors.bg2,
                        borderRadius: '12px',
                        border: `2px solid ${colors.ok}`,
                        textAlign: 'center',
                        transition: 'transform 0.2s ease'
                      }}>
                        <div style={{fontSize: '32px', marginBottom: '8px'}}>{badge.icon}</div>
                        <div style={{color: colors.txt0, fontSize: '16px', fontWeight: '600', marginBottom: '4px'}}>
                          {badge.name}
                        </div>
                        <div style={{color: colors.txt2, fontSize: '12px', marginBottom: '8px'}}>
                          {badge.description}
                        </div>
                        <div style={{color: colors.ok, fontSize: '14px', fontWeight: '600'}}>
                          +{badge.xp} XP
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* 可解鎖徽章區域 */}
            <div style={cardStyle}>
              <h3 style={{color: colors.txt0, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px'}}>
                <Lock size={20} />
                待解鎖徽章
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px'
              }}>
                {Object.entries(BADGES).map(([badgeId, badge]) => {
                  if (gameData.achievements.includes(badgeId)) return null;
                  return (
                    <div key={badgeId} style={{
                      padding: '16px',
                      backgroundColor: colors.bg2,
                      borderRadius: '12px',
                      border: `2px solid ${colors.border}`,
                      textAlign: 'center',
                      opacity: 0.6,
                      transition: 'transform 0.2s ease'
                    }}>
                      <div style={{fontSize: '32px', marginBottom: '8px', filter: 'grayscale(100%)'}}>{badge.icon}</div>
                      <div style={{color: colors.txt1, fontSize: '16px', fontWeight: '600', marginBottom: '4px'}}>
                        {badge.name}
                      </div>
                      <div style={{color: colors.txt2, fontSize: '12px', marginBottom: '8px'}}>
                        {badge.description}
                      </div>
                      <div style={{color: colors.txt2, fontSize: '14px', fontWeight: '600'}}>
                        +{badge.xp} XP
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 'skills':
        return (
          <div>
            <h2 style={{color: colors.txt0, marginBottom: '32px', fontSize: '32px', fontWeight: '700'}}>技能樹</h2>
            <SkillTree gameData={gameData} onUpgrade={handleSkillUpgrade} />
          </div>
        );

      case 'quests':
        return (
          <div>
            <h2 style={{color: colors.txt0, marginBottom: '32px', fontSize: '32px', fontWeight: '700'}}>每日任務</h2>
            <DailyQuests onComplete={() => {}} />
          </div>
        );

      case 'edit':
        const visibleFields = Array.isArray(fields) ? fields.filter(field => field && field.visible) : [];
        return (
          <div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px'}}>
              <h2 style={{color: colors.txt0, margin: 0, fontSize: '32px', fontWeight: '700'}}>
                {editingTrade ? '編輯交易' : '新增交易'}
              </h2>
              <div style={{display: 'flex', gap: '12px'}}>
                <button
                  onClick={() => setCurrentView('trades')}
                  style={{...buttonStyle, backgroundColor: colors.bg2, color: colors.txt0, boxShadow: 'none'}}
                >
                  取消
                </button>
                <button onClick={handleSaveTrade} style={buttonStyle}>
                  儲存交易
                </button>
              </div>
            </div>
            <div style={cardStyle}>
              <div style={{display: 'grid', gap: '24px'}}>
                {visibleFields.map(field => (
                  <div key={field.key}>
                    <label style={{display: 'block', color: colors.txt0, marginBottom: '12px', fontSize: '16px', fontWeight: '600'}}>
                      {field.label} {field.required && <span style={{color: colors.err}}>*</span>}
                    </label>
                    <FormField
                      field={field}
                      value={formData[field.key]}
                      onChange={(key, value) => setFormData({...formData, [key]: value})}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'brand':
        return (
          <div>
            <h2 style={{color: colors.txt0, marginBottom: '32px', fontSize: '32px', fontWeight: '700'}}>個人交易品牌</h2>
            
            {/* 自訂交易稱號 */}
            <div style={{...cardStyle, marginBottom: '32px'}}>
              <h3 style={{color: colors.txt0, marginBottom: '20px', fontSize: '20px', fontWeight: '700'}}>
                ✨ 交易稱號
              </h3>
              <div style={{marginBottom: '20px'}}>
                <label style={{color: colors.txt0, display: 'block', marginBottom: '8px'}}>
                  自訂稱號
                </label>
                <input
                  type="text"
                  value={gameData.personalBrand?.customTitle || ''}
                  onChange={(e) => {
                    const newGameData = {
                      ...gameData,
                      personalBrand: {
                        ...gameData.personalBrand,
                        customTitle: e.target.value
                      }
                    };
                    saveGameData(newGameData);
                  }}
                  placeholder="例如：量化交易專家、技術分析大師"
                  style={inputStyle}
                />
              </div>
              
              <div style={{marginBottom: '20px'}}>
                <label style={{color: colors.txt0, display: 'block', marginBottom: '12px'}}>
                  選擇頭像
                </label>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(60px, 1fr))',
                  gap: '12px'
                }}>
                  {TRADING_BRANDS.avatars.map(avatar => (
                    <button
                      key={avatar}
                      onClick={() => {
                        const newGameData = {
                          ...gameData,
                          personalBrand: {
                            ...gameData.personalBrand,
                            selectedAvatar: avatar
                          }
                        };
                        saveGameData(newGameData);
                      }}
                      style={{
                        padding: '12px',
                        fontSize: '32px',
                        backgroundColor: gameData.personalBrand?.selectedAvatar === avatar ? colors.brand : colors.bg2,
                        border: `2px solid ${gameData.personalBrand?.selectedAvatar === avatar ? colors.brand : colors.border}`,
                        borderRadius: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {avatar}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label style={{color: colors.txt0, display: 'block', marginBottom: '12px'}}>
                  推薦稱號
                </label>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                  gap: '8px'
                }}>
                  {TRADING_BRANDS.titles.map(title => (
                    <button
                      key={title}
                      onClick={() => {
                        const newGameData = {
                          ...gameData,
                          personalBrand: {
                            ...gameData.personalBrand,
                            customTitle: title
                          }
                        };
                        saveGameData(newGameData);
                      }}
                      style={{
                        padding: '8px 12px',
                        backgroundColor: colors.bg2,
                        border: `1px solid ${colors.border}`,
                        borderRadius: '20px',
                        color: colors.txt0,
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: '600',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {title}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 交易哲學 */}
            <div style={{...cardStyle, marginBottom: '32px'}}>
              <h3 style={{color: colors.txt0, marginBottom: '20px', fontSize: '20px', fontWeight: '700'}}>
                🧠 交易哲學
              </h3>
              <div style={{marginBottom: '20px'}}>
                <label style={{color: colors.txt0, display: 'block', marginBottom: '8px'}}>
                  你的交易理念
                </label>
                <textarea
                  value={gameData.personalBrand?.tradingPhilosophy || ''}
                  onChange={(e) => {
                    const newGameData = {
                      ...gameData,
                      personalBrand: {
                        ...gameData.personalBrand,
                        tradingPhilosophy: e.target.value
                      }
                    };
                    saveGameData(newGameData);
                  }}
                  placeholder="用一句話描述你的交易哲學..."
                  style={{
                    ...inputStyle,
                    minHeight: '100px',
                    resize: 'vertical',
                    fontStyle: 'italic'
                  }}
                />
              </div>
              
              <div>
                <label style={{color: colors.txt0, display: 'block', marginBottom: '12px'}}>
                  經典交易哲學
                </label>
                <div style={{display: 'grid', gap: '8px'}}>
                  {TRADING_BRANDS.philosophies.map((philosophy, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        const newGameData = {
                          ...gameData,
                          personalBrand: {
                            ...gameData.personalBrand,
                            tradingPhilosophy: philosophy
                          }
                        };
                        saveGameData(newGameData);
                      }}
                      style={{
                        padding: '12px 16px',
                        backgroundColor: colors.bg2,
                        border: `1px solid ${colors.border}`,
                        borderRadius: '8px',
                        color: colors.txt0,
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontStyle: 'italic',
                        textAlign: 'left',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      "{philosophy}"
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 市場貢獻度 */}
            <div style={cardStyle}>
              <h3 style={{color: colors.txt0, marginBottom: '20px', fontSize: '20px', fontWeight: '700'}}>
                🤝 市場貢獻度
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px'
              }}>
                <div style={{
                  textAlign: 'center',
                  padding: '16px',
                  backgroundColor: colors.bg0,
                  borderRadius: '12px',
                  border: `1px solid ${colors.border}`
                }}>
                  <div style={{fontSize: '32px', marginBottom: '8px'}}>📈</div>
                  <div style={{color: colors.brand, fontSize: '24px', fontWeight: '700'}}>
                    {gameData.personalBrand?.marketContribution || 0}
                  </div>
                  <div style={{color: colors.txt2, fontSize: '12px'}}>市場分析貢獻</div>
                </div>
                <div style={{
                  textAlign: 'center',
                  padding: '16px',
                  backgroundColor: colors.bg0,
                  borderRadius: '12px',
                  border: `1px solid ${colors.border}`
                }}>
                  <div style={{fontSize: '32px', marginBottom: '8px'}}>🙋‍♂️</div>
                  <div style={{color: colors.ok, fontSize: '24px', fontWeight: '700'}}>
                    {gameData.personalBrand?.helpedNewbies || 0}
                  </div>
                  <div style={{color: colors.txt2, fontSize: '12px'}}>幫助新手數量</div>
                </div>
                <div style={{
                  textAlign: 'center',
                  padding: '16px',
                  backgroundColor: colors.bg0,
                  borderRadius: '12px',
                  border: `1px solid ${colors.border}`
                }}>
                  <div style={{fontSize: '32px', marginBottom: '8px'}}>📝</div>
                  <div style={{color: colors.purple, fontSize: '24px', fontWeight: '700'}}>
                    {gameData.personalBrand?.sharedStrategies || 0}
                  </div>
                  <div style={{color: colors.txt2, fontSize: '12px'}}>分享策略數量</div>
                </div>
              </div>
              <div style={{
                marginTop: '20px',
                padding: '16px',
                backgroundColor: colors.bg0,
                borderRadius: '12px',
                border: `2px dashed ${colors.brand}`
              }}>
                <div style={{textAlign: 'center', color: colors.txt2}}>
                  💡 提示：透過分享交易策略、幫助新手、貢獻市場分析來提升你的市場影響力！
                </div>
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div>
            <h2 style={{color: colors.txt0, marginBottom: '32px', fontSize: '32px', fontWeight: '700'}}>設置</h2>
            
            {/* 帳戶設置 */}
            <div style={{...cardStyle, marginBottom: '32px'}}>
              <h3 style={{color: colors.txt0, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px'}}>
                <DollarSign size={20} />
                帳戶設置
              </h3>
              <div style={{display: 'grid', gap: '16px'}}>
                <div>
                  <label style={{color: colors.txt0, display: 'block', marginBottom: '8px'}}>初始帳戶餘額</label>
                  <input
                    type="number"
                    value={(() => {
                      // 從localStorage讀取基礎帳戶金額，如果沒有則使用10000
                      const savedBaseAccount = localStorage.getItem('tradingJournalBaseAccount');
                      return savedBaseAccount ? parseFloat(savedBaseAccount) : 10000;
                    })()}
                    onChange={(e) => {
                      const newBase = parseFloat(e.target.value) || 10000;
                      // 重新計算帳戶餘額
                      const currentTotalPL = calculateTotalPL();
                      const newBalance = newBase + currentTotalPL;
                      setAccountBalance(newBalance);
                      localStorage.setItem('tradingJournalBalance', newBalance.toString());
                      localStorage.setItem('tradingJournalBaseAccount', newBase.toString());
                    }}
                    style={{
                      padding: '12px 16px',
                      backgroundColor: colors.bg2,
                      border: `1px solid ${colors.border}`,
                      borderRadius: '8px',
                      color: colors.txt0,
                      fontSize: '16px',
                      width: '200px'
                    }}
                    placeholder="10000"
                  />
                  <div style={{color: colors.txt2, fontSize: '12px', marginTop: '4px'}}>
                    設定你的初始交易資金
                  </div>
                </div>
                <div>
                  <label style={{color: colors.txt0, display: 'block', marginBottom: '8px'}}>目前帳戶餘額</label>
                  <div style={{
                    ...inputStyle,
                    backgroundColor: colors.bg2,
                    color: totalPL >= 0 ? colors.ok : colors.err,
                    fontWeight: '700',
                    fontSize: '18px'
                  }}>
                    {accountBalance.toFixed(2)} ({totalPL >= 0 ? '+' : ''}{totalPL.toFixed(2)})
                  </div>
                </div>
                <div style={{display: 'flex', gap: '12px', flexWrap: 'wrap'}}>
                  <button
                    onClick={() => {
                      if (window.confirm('確定要重置所有遊戲進度嗎？')) {
                        setGameData(defaultGameData);
                        localStorage.removeItem('tradingJournalGameData');
                      }
                    }}
                    style={{...buttonStyle, backgroundColor: colors.err}}
                  >
                    重置遊戲進度
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm('確定要重置所有交易記錄和帳戶餘額嗎？')) {
                        setTrades([]);
                        setAccountBalance(10000);
                        localStorage.removeItem('tradingJournalTrades');
                        localStorage.setItem('tradingJournalBalance', '10000');
                      }
                    }}
                    style={{...buttonStyle, backgroundColor: colors.warn}}
                  >
                    重置交易記錄
                  </button>
                </div>
              </div>
            </div>

            {/* 策略實驗室 - 增強版 */}
            <div style={{...cardStyle, marginBottom: '32px'}}>
              <h3 style={{color: colors.txt0, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px'}}>
                <Brain size={20} />
                策略實驗室 - 創意授權與反饋
                <span style={{
                  backgroundColor: colors.legendary,
                  color: colors.bg0,
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: '700'
                }}>
                  八角框架
                </span>
              </h3>
              
              {/* 預設進階策略模板 */}
              <div style={{marginBottom: '24px'}}>
                <h4 style={{color: colors.txt0, marginBottom: '16px', fontSize: '16px'}}>
                  🎯 專業策略模板
                </h4>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px'}}>
                  {[
                    {
                      name: '突破交易策略',
                      description: '基於技術分析的突破點交易，適合趨勢市場',
                      category: '趨勢跟隨',
                      risk: '中風險',
                      timeframe: 'H1-H4',
                      winRate: '65%',
                      riskReward: '1:2'
                    },
                    {
                      name: '均線回歸策略',
                      description: '利用價格回歸均線進行反轉交易',
                      category: '均線回歸',
                      risk: '低風險',
                      timeframe: 'H4-D1',
                      winRate: '72%',
                      riskReward: '1:1.5'
                    },
                    {
                      name: '新聞事件交易',
                      description: '基於重要經濟數據發佈進行短期交易',
                      category: '基本面',
                      risk: '高風險',
                      timeframe: 'M15-H1',
                      winRate: '58%',
                      riskReward: '1:3'
                    },
                    {
                      name: '波段震盪策略',
                      description: '在支撐阻力區間進行高頻交易',
                      category: '區間交易',
                      risk: '中風險',
                      timeframe: 'M30-H1',
                      winRate: '68%',
                      riskReward: '1:1.8'
                    }
                  ].map((template, index) => (
                    <div key={index} style={{
                      padding: '18px',
                      backgroundColor: colors.bg0,
                      borderRadius: '12px',
                      border: `2px solid ${colors.brand}30`,
                      transition: 'all 0.3s ease'
                    }}>
                      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px'}}>
                        <h5 style={{color: colors.brand, fontSize: '16px', fontWeight: '700', margin: 0}}>
                          {template.name}
                        </h5>
                        <span style={{
                          backgroundColor: template.risk === '高風險' ? colors.err : template.risk === '低風險' ? colors.ok : colors.warn,
                          color: colors.bg0,
                          padding: '2px 8px',
                          borderRadius: '10px',
                          fontSize: '10px',
                          fontWeight: '700'
                        }}>
                          {template.risk}
                        </span>
                      </div>
                      <p style={{color: colors.txt2, fontSize: '13px', marginBottom: '12px', lineHeight: '1.4'}}>
                        {template.description}
                      </p>
                      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px'}}>
                        <div style={{fontSize: '11px'}}>
                          <span style={{color: colors.txt2}}>類型: </span>
                          <span style={{color: colors.txt0}}>{template.category}</span>
                        </div>
                        <div style={{fontSize: '11px'}}>
                          <span style={{color: colors.txt2}}>時間框架: </span>
                          <span style={{color: colors.txt0}}>{template.timeframe}</span>
                        </div>
                        <div style={{fontSize: '11px'}}>
                          <span style={{color: colors.txt2}}>勝率: </span>
                          <span style={{color: colors.ok}}>{template.winRate}</span>
                        </div>
                        <div style={{fontSize: '11px'}}>
                          <span style={{color: colors.txt2}}>風險回報: </span>
                          <span style={{color: colors.brand}}>{template.riskReward}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          const newTemplate = {
                            id: Date.now() + index,
                            name: template.name,
                            description: template.description,
                            category: template.category,
                            riskLevel: template.risk,
                            timeframe: template.timeframe,
                            expectedWinRate: template.winRate,
                            riskRewardRatio: template.riskReward,
                            createdAt: new Date().toISOString(),
                            isProfessional: true
                          };
                          const newTemplates = [...strategyTemplates, newTemplate];
                          setStrategyTemplates(newTemplates);
                          localStorage.setItem('strategyTemplates', JSON.stringify(newTemplates));
                        }}
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          backgroundColor: colors.brand + '20',
                          border: `1px solid ${colors.brand}`,
                          borderRadius: '8px',
                          color: colors.brand,
                          fontSize: '12px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        📋 加入我的策略庫
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* 用戶自訂策略 */}
              <div style={{marginBottom: '20px'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px'}}>
                  <h4 style={{color: colors.txt0, margin: 0, fontSize: '16px'}}>
                    ✨ 我的策略庫
                  </h4>
                  <span style={{
                    backgroundColor: colors.purple,
                    color: colors.txt0,
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '700'
                  }}>
                    {strategyTemplates.length} 個策略
                  </span>
                </div>
                <p style={{color: colors.txt2, marginBottom: '16px', fontSize: '14px'}}>
                  創建和管理你的交易策略模板，每個成功的策略都會成為你交易智慧的積累
                </p>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px'}}>
                  {strategyTemplates.map(template => (
                    <div key={template.id} style={{
                      padding: '16px',
                      backgroundColor: colors.bg2,
                      borderRadius: '12px',
                      border: `2px solid ${template.isProfessional ? colors.legendary : colors.border}`
                    }}>
                      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px'}}>
                        <div style={{color: colors.txt0, fontSize: '16px', fontWeight: '600'}}>
                          {template.isProfessional && '👑 '}{template.name}
                        </div>
                        {template.isProfessional && (
                          <span style={{
                            backgroundColor: colors.legendary,
                            color: colors.bg0,
                            padding: '2px 6px',
                            borderRadius: '8px',
                            fontSize: '10px',
                            fontWeight: '700'
                          }}>
                            專業
                          </span>
                        )}
                      </div>
                      <div style={{color: colors.txt2, fontSize: '13px', marginBottom: '12px', lineHeight: '1.4'}}>
                        {template.description}
                      </div>
                      {template.category && (
                        <div style={{marginBottom: '12px'}}>
                          <span style={{
                            backgroundColor: colors.brand + '20',
                            color: colors.brand,
                            padding: '4px 8px',
                            borderRadius: '12px',
                            fontSize: '11px',
                            fontWeight: '600'
                          }}>
                            {template.category}
                          </span>
                        </div>
                      )}
                      <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
                        <button
                          onClick={() => {
                            setFormData({...formData, strategy: template.name});
                            setCurrentView('edit');
                          }}
                          style={{
                            padding: '6px 12px',
                            backgroundColor: colors.brand + '20',
                            border: `1px solid ${colors.brand}`,
                            borderRadius: '6px',
                            color: colors.brand,
                            fontSize: '12px',
                            cursor: 'pointer',
                            fontWeight: '600'
                          }}
                        >
                          📊 使用策略
                        </button>
                        <button
                          onClick={() => {
                            if (confirm('確定要刪除這個策略模板嗎？')) {
                              const newTemplates = Array.isArray(strategyTemplates) ? strategyTemplates.filter(t => t && t.id !== template.id) : [];
                              setStrategyTemplates(newTemplates);
                              localStorage.setItem('strategyTemplates', JSON.stringify(newTemplates));
                            }
                          }}
                          style={{
                            padding: '6px 12px',
                            backgroundColor: colors.err + '20',
                            border: `1px solid ${colors.err}`,
                            borderRadius: '6px',
                            color: colors.err,
                            fontSize: '12px',
                            cursor: 'pointer',
                            fontWeight: '600'
                          }}
                        >
                          🗑️ 刪除
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  {/* 創建新策略按鈕 */}
                  <div
                    onClick={() => {
                      const name = prompt('策略名稱：');
                      if (!name) return;
                      const description = prompt('策略描述：');
                      if (!description) return;
                      const category = prompt('策略類型（例如：趨勢跟隨、區間交易）：') || '自訂策略';
                      
                      const newTemplate = {
                        id: Date.now(),
                        name,
                        description,
                        category,
                        createdAt: new Date().toISOString(),
                        isProfessional: false
                      };
                      
                      const newTemplates = [...strategyTemplates, newTemplate];
                      setStrategyTemplates(newTemplates);
                      localStorage.setItem('strategyTemplates', JSON.stringify(newTemplates));
                    }}
                    style={{
                      padding: '24px',
                      backgroundColor: colors.bg2,
                      borderRadius: '12px',
                      border: `2px dashed ${colors.brand}`,
                      textAlign: 'center',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: '160px',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <PlusCircle size={48} color={colors.brand} style={{marginBottom: '12px'}} />
                    <div style={{color: colors.brand, fontSize: '16px', fontWeight: '700', marginBottom: '4px'}}>
                      創建新策略
                    </div>
                    <div style={{color: colors.txt2, fontSize: '12px'}}>
                      建立屬於你的交易策略模板
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 選項管理 */}
            <OptionManager fields={fields} onFieldsUpdate={saveFields} />

            {/* 自訂字段創建 */}
            <CustomFieldCreator fields={fields} onFieldsUpdate={saveFields} />

            {/* 字段顯示控制 */}
            <FieldVisibilityManager fields={fields} onFieldsUpdate={saveFields} />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{
      backgroundColor: colors.bg0,
      minHeight: '100vh',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans", "Helvetica Neue", sans-serif',
      backgroundImage: `
        radial-gradient(circle at 20% 80%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(57, 217, 138, 0.05) 0%, transparent 50%)
      `,
      position: 'relative'
    }}>
      <div style={{maxWidth: '1400px', margin: '0 auto'}}>
        <header style={{marginBottom: '40px', textAlign: 'center'}}>
          <h1 style={{
            color: colors.brand,
            fontSize: '48px',
            fontWeight: '800',
            margin: '0 0 12px 0',
            textShadow: `0 0 30px rgba(0, 212, 255, 0.6)`,
            background: `linear-gradient(135deg, ${colors.brand}, ${colors.purple})`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            🎮 遊戲化交易日記
          </h1>
          <p style={{color: colors.txt1, margin: 0, fontSize: '18px', fontWeight: '500'}}>
            基於八角框架的完整交易記錄、分析與成長平台
          </p>
        </header>
        
        {renderNavigation()}
        {renderContent()}
      </div>
      
      <AchievementPopup achievement={showAchievementPopup} />
      
      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default TradingJournalApp;
