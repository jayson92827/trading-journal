import React, { useState, useCallback, useEffect } from 'react';
import { 
  PlusCircle, TrendingUp, TrendingDown, Calendar, Target, Settings, BarChart3, 
  FileText, Search, Filter, Eye, EyeOff, Trash2, Edit3, Upload, Download, 
  DollarSign, RefreshCw, Image, X, Star, Trophy, Crown, Zap, Shield, 
  Award, Users, BookOpen, Brain, Heart, Flame, Lock, Gift, Timer,
  Sparkles, Medal, Sword, Compass, Diamond, Gem, Rocket, Mail, LogIn, LogOut
} from 'lucide-react';

// 登入組件
const LoginSystem = ({ onLogin }) => {
  const [loginMode, setLoginMode] = useState('email'); // 'email' 或 'register'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // 模擬登入延遲
    setTimeout(() => {
      const userData = {
        name: formData.name || formData.email.split('@')[0],
        email: formData.email,
        id: Date.now(),
        loginTime: new Date().toISOString()
      };
      
      // 儲存用戶資料
      localStorage.setItem('trading-journal-user', JSON.stringify(userData));
      onLogin(userData);
      setLoading(false);
    }, 1000);
  };

  const handleGoogleLogin = () => {
    // 模擬Google登入
    setLoading(true);
    setTimeout(() => {
      const userData = {
        name: 'Google 用戶',
        email: 'user@gmail.com',
        id: Date.now(),
        loginTime: new Date().toISOString(),
        provider: 'google'
      };
      
      localStorage.setItem('trading-journal-user', JSON.stringify(userData));
      onLogin(userData);
      setLoading(false);
    }, 1500);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f1419 0%, #1a2332 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: colors.bg1,
        borderRadius: '20px',
        padding: '40px',
        border: `2px solid ${colors.brand}30`,
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        maxWidth: '400px',
        width: '100%',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* 背景裝飾 */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(64, 224, 208, 0.1) 0%, transparent 70%)',
          animation: 'rotate 20s linear infinite'
        }} />
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Logo區域 */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{
              fontSize: '48px',
              marginBottom: '12px',
              background: 'linear-gradient(45deg, #40E0D0, #FF6B6B)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              fontWeight: 'bold'
            }}>
              🎮
            </div>
            <h1 style={{
              color: colors.txt0,
              fontSize: '24px',
              fontWeight: '700',
              margin: '0 0 8px 0',
              background: 'linear-gradient(45deg, #40E0D0, #FF6B6B)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent'
            }}>
              遊戲化交易日記
            </h1>
            <p style={{
              color: colors.txt2,
              fontSize: '14px',
              margin: 0
            }}>
              基於八角框架的完整交易記錄與分析平台
            </p>
          </div>

          {/* 登入表單 */}
          <form onSubmit={handleSubmit}>
            {loginMode === 'register' && (
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  color: colors.txt0,
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '8px'
                }}>
                  姓名
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  style={{
                    ...inputStyle,
                    border: `2px solid ${colors.brand}30`
                  }}
                  placeholder="請輸入姓名"
                />
              </div>
            )}

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                color: colors.txt0,
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '8px'
              }}>
                電子郵件
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
                style={{
                  ...inputStyle,
                  border: `2px solid ${colors.brand}30`
                }}
                placeholder="請輸入電子郵件"
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                color: colors.txt0,
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '8px'
              }}>
                密碼
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
                style={{
                  ...inputStyle,
                  border: `2px solid ${colors.brand}30`
                }}
                placeholder="請輸入密碼"
              />
            </div>

            {loginMode === 'register' && (
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  color: colors.txt0,
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '8px'
                }}>
                  確認密碼
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  required
                  style={{
                    ...inputStyle,
                    border: `2px solid ${colors.brand}30`
                  }}
                  placeholder="請再次輸入密碼"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                ...buttonStyle,
                width: '100%',
                padding: '16px',
                fontSize: '16px',
                marginBottom: '16px',
                opacity: loading ? 0.7 : 1,
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              {loading ? <RefreshCw size={18} style={{ animation: 'spin 1s linear infinite' }} /> : <LogIn size={18} />}
              {loading ? '處理中...' : (loginMode === 'register' ? '註冊' : '登入')}
            </button>

            {/* Google登入按鈕 */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              style={{
                ...buttonStyle,
                backgroundColor: '#DB4437',
                width: '100%',
                padding: '16px',
                fontSize: '16px',
                marginBottom: '20px',
                opacity: loading ? 0.7 : 1,
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <Mail size={18} />
              使用 Google 登入
            </button>

            {/* 切換模式 */}
            <div style={{ textAlign: 'center' }}>
              <button
                type="button"
                onClick={() => setLoginMode(loginMode === 'register' ? 'email' : 'register')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: colors.brand,
                  fontSize: '14px',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                {loginMode === 'register' ? '已有帳號？立即登入' : '沒有帳號？立即註冊'}
              </button>
            </div>
          </form>
        </div>

        <style>
          {`
            @keyframes rotate {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    </div>
  );
};
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

// 統計儀表板組件 - 修正：非交易日不計入總交易數量
const StatsDashboard = ({ trades, accountBalance, totalPL, gameData }) => {
  // 確保 trades 是數組，並分離交易日和非交易日
  const validTrades = Array.isArray(trades) ? trades : [];
  const tradingDayTrades = validTrades.filter(trade => trade?.type === 'trading' || !trade?.type); // 兼容舊數據
  const nonTradingDayTrades = validTrades.filter(trade => trade?.type === 'non-trading');
  
  const closedTrades = tradingDayTrades.filter(trade => trade?.closed && trade?.profitLoss !== undefined && trade?.profitLoss !== null);
  const winningTrades = closedTrades.filter(trade => trade?.profitLoss > 0);
  const winRate = closedTrades.length > 0 ? (winningTrades.length / closedTrades.length * 100) : 0;
  const avgReturn = closedTrades.length > 0 ? closedTrades.reduce((sum, trade) => sum + (trade?.profitLoss || 0), 0) / closedTrades.length : 0;
  const adherenceRate = closedTrades.length > 0 ? (closedTrades.filter(trade => trade?.managedByPlan === '是').length / closedTrades.length * 100) : 0;
  const totalTradingDays = tradingDayTrades.length; // 只計算交易日數量
  
  const stats = [
    { label: '帳戶餘額', value: `${accountBalance.toFixed(2)}`, color: colors.brand, icon: <DollarSign size={20} /> },
    { label: '總損益', value: `${totalPL >= 0 ? '+' : ''}${totalPL.toFixed(2)}`, color: totalPL >= 0 ? colors.ok : colors.err, icon: <TrendingUp size={20} /> },
    { label: '交易日記錄', value: `${totalTradingDays}`, color: colors.purple, icon: <FileText size={20} /> },
    { label: '非交易日記錄', value: `${nonTradingDayTrades.length}`, color: colors.cyan, icon: <Calendar size={20} /> },
    { label: '勝率', value: `${winRate.toFixed(1)}%`, color: colors.ok, icon: <Target size={20} /> },
    { label: '計劃遵守率', value: `${adherenceRate.toFixed(1)}%`, color: colors.brand, icon: <Shield size={20} /> }
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
  // User authentication state
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('trading-journal-user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
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

  // Authentication handlers
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('trading-journal-user', JSON.stringify(userData));
    
    // Load user-specific data
    const userKey = userData.email || userData.id;
    const savedTrades = localStorage.getItem(`tradingJournalTrades_${userKey}`);
    const savedGameData = localStorage.getItem(`tradingJournalGameData_${userKey}`);
    const savedBalance = localStorage.getItem(`tradingJournalBalance_${userKey}`);
    
    if (savedTrades) {
      const tradesData = JSON.parse(savedTrades);
      setTrades(tradesData);
      setTimeout(() => updateGameDataWithNotifications(tradesData), 100);
    }
    if (savedGameData) {
      setGameData({...defaultGameData, ...JSON.parse(savedGameData)});
    }
    if (savedBalance) {
      setAccountBalance(parseFloat(savedBalance));
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('trading-journal-user');
    // Reset to default state
    setTrades([]);
    setGameData(defaultGameData);
    setAccountBalance(10000);
    setCurrentView('dashboard');
  };

  // Get user-specific storage keys
  const getUserStorageKey = (baseKey) => {
    if (!user) return baseKey;
    const userKey = user.email || user.id;
    return `${baseKey}_${userKey}`;
  };

  // 從記憶體載入數據
  useEffect(() => {
    // Only load data if user is logged in
    if (!user) return;
    
    try {
      const userKey = user.email || user.id;
      const savedTrades = localStorage.getItem(`tradingJournalTrades_${userKey}`);
      const savedFields = localStorage.getItem('tradingJournalFields'); // Fields are shared across users
      const savedBalance = localStorage.getItem(`tradingJournalBalance_${userKey}`);
      const savedGameData = localStorage.getItem(`tradingJournalGameData_${userKey}`);
      const savedBaseAccount = localStorage.getItem(`tradingJournalBaseAccount_${userKey}`);
      
      if (savedTrades) {
        const tradesData = JSON.parse(savedTrades);
        setTrades(tradesData);
        setTimeout(() => updateGameDataWithNotifications(tradesData), 100);
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
        localStorage.setItem(`tradingJournalBalance_${userKey}`, baseAccount.toString());
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
  }, [user]);

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
      updateGameDataWithNotifications(newTrades);
    }, 100);
    
    console.log('=== saveTrades 完成 ===');
  };

  const saveGameData = (newGameData) => {
    setGameData(newGameData);
    localStorage.setItem('tradingJournalGameData', JSON.stringify(newGameData));
    
    // 保存用戶專用數據
    if (user) {
      const userKey = user.email || user.id;
      localStorage.setItem(`tradingJournalGameData_${userKey}`, JSON.stringify(newGameData));
    }
  };

  // 技能升級
  const handleSkillUpgrade = (skillId, level) => {
    console.log('Skill upgrade requested:', skillId, level);
    
    // 找到對應的技能分支
    const skillBranches = [
      {
        id: 'risk',
        name: '🛡️ 風控技能',
        levels: [
          { name: '基礎風控', xpCost: 100 },
          { name: '資金管理', xpCost: 200 },
          { name: '風險專家', xpCost: 300 }
        ]
      },
      {
        id: 'technical',
        name: '📊 技術分析',
        levels: [
          { name: '基礎圖表', xpCost: 100 },
          { name: '型態識別', xpCost: 200 },
          { name: '進階分析', xpCost: 300 }
        ]
      },
      {
        id: 'psychology',
        name: '🧠 心理控制',
        levels: [
          { name: '情緒認知', xpCost: 100 },
          { name: '心理控制', xpCost: 200 },
          { name: '禪定交易', xpCost: 300 }
        ]
      }
    ];
    
    const skill = skillBranches.find(s => s.id === skillId);
    if (!skill) {
      console.error('技能不存在:', skillId);
      return;
    }
    
    const currentLevel = gameData.skills?.[skillId] || 1;
    const targetLevel = level;
    const levelIndex = targetLevel - 1;
    
    if (levelIndex >= skill.levels.length) {
      console.error('等級超出範圍');
      return;
    }
    
    const levelInfo = skill.levels[levelIndex];
    const requiredXP = levelInfo.xpCost;
    
    // 檢查是否可以升級
    if (targetLevel > currentLevel && gameData.xp >= requiredXP) {
      const newGameData = {
        ...gameData,
        xp: gameData.xp - requiredXP,
        skills: {
          ...gameData.skills,
          [skillId]: targetLevel
        }
      };
      
      setGameData(newGameData);
      localStorage.setItem('tradingJournalGameData', JSON.stringify(newGameData));
      
      // 顯示升級成功消息
      setTimeout(() => {
        alert(`🎉 技能升級成功！\n\n「${skill.name}」升級到 ${levelInfo.name}\n消耗 ${requiredXP} XP\n剩餘 XP: ${newGameData.xp}`);
      }, 100);
    } else {
      console.log('無法升級:', { targetLevel, currentLevel, xp: gameData.xp, requiredXP });
    }
  };

  // 新增或編輯交易
  const handleSaveTrade = () => {
    console.log('=== handleSaveTrade 開始 ===');
    console.log('表單資料:', formData);
    
    const tradeData = { 
      ...formData, 
      id: editingTrade?.id || Date.now(),
      lastUpdated: new Date().toISOString(),
      profitLoss: parseFloat(formData.profitLoss) || 0,
      closed: formData.closed || false,
      date: formData.entryDate || formData.date
    };
    
    let newTrades;
    if (editingTrade) {
      console.log('編輯現有交易:', editingTrade.id);
      newTrades = trades.map(trade => trade.id === editingTrade.id ? tradeData : trade);
    } else {
      console.log('新增交易');
      newTrades = [...trades, tradeData];
    }
    
    // 立即更新 trades 狀態
    setTrades(newTrades);
    
    // 保存到 localStorage
    saveTrades(newTrades);
    
    // 立即計算並更新遊戲數據
    updateGameDataWithNotifications(newTrades, !editingTrade);
    
    // 重置表單
    setEditingTrade(null);
    setFormData({});
    setCurrentView('dashboard');
    
    console.log('=== handleSaveTrade 完成 ===');
  };
  
  // 更新遊戲數據並顯示提醒
  const updateGameDataWithNotifications = (newTrades, isNewRecord = false) => {
    if (!Array.isArray(newTrades)) return;
    
    const tradingTrades = newTrades.filter(trade => trade.type === 'trading' || !trade.type);
    const nonTradingTrades = newTrades.filter(trade => trade.type === 'non-trading');
    
    // 計算經驗值
    let totalXP = 0;
    
    // 基礎XP計算
    totalXP += tradingTrades.length * 10; // 每筆交易記錄10XP
    totalXP += nonTradingTrades.length * 5; // 每筆非交易日記錄5XP
    
    // 獎勵XP
    tradingTrades.forEach(trade => {
      if (trade.closed) totalXP += 15; // 完成交易
      if (trade.strategyCompliant === '是 ✅') totalXP += 10; // 策略遵守
      if (trade.riskControl === '是') totalXP += 15; // 風控紀律
      if (trade.dailyReflection && trade.dailyReflection.length > 10) totalXP += 5; // 心得反思
    });
    
    nonTradingTrades.forEach(trade => {
      if (trade.dailyReflection && trade.dailyReflection.length > 10) totalXP += 5;
      if (trade.learningActivity && trade.learningActivity.length > 0) totalXP += 8;
    });
    
    // 計算連續記錄天數 - 簡化邏輯
    const recordDates = [...new Set(newTrades.map(trade => {
      const date = trade.date || trade.entryDate;
      return date ? new Date(date).toDateString() : null;
    }))].filter(Boolean).sort((a, b) => new Date(b) - new Date(a));
    
    const today = new Date().toDateString();
    let recordStreak = 0;
    
    if (recordDates.length > 0) {
      // 檢查最近的記錄日期
      const latestRecordDate = recordDates[0];
      const latestDate = new Date(latestRecordDate);
      const todayDate = new Date(today);
      
      // 計算天數差距
      const daysDiff = Math.floor((todayDate - latestDate) / (1000 * 60 * 60 * 24));
      
      if (daysDiff <= 1) { // 今天或昨天有記錄
        recordStreak = 1;
        
        // 計算連續記錄天數
        for (let i = 1; i < recordDates.length; i++) {
          const currentDate = new Date(recordDates[i - 1]);
          const prevDate = new Date(recordDates[i]);
          const daysBetween = Math.floor((currentDate - prevDate) / (1000 * 60 * 60 * 24));
          
          // 如果間隔不超過3天（考慮周末），視為連續
          if (daysBetween <= 3) {
            recordStreak++;
          } else {
            break;
          }
        }
      }
    }
    
    const prevRecordStreak = gameData.streaks?.current_days || 0;
    
    // 計算交易連勝記錄
    const closedTrades = tradingTrades.filter(trade => trade.closed).sort((a, b) => {
      const dateA = new Date(a.exitDate || a.entryDate);
      const dateB = new Date(b.exitDate || b.entryDate);
      return dateA - dateB;
    });
    
    let currentWinStreak = 0;
    let bestWinStreak = gameData.streaks?.best_win || 0;
    
    // 從最新交易開始計算連勝
    for (let i = closedTrades.length - 1; i >= 0; i--) {
      if (closedTrades[i].profitLoss > 0) {
        currentWinStreak++;
      } else {
        break;
      }
    }
    
    bestWinStreak = Math.max(bestWinStreak, currentWinStreak);
    
    // 計算個人最佳記錄
    const personalRecords = gameData.personalRecords || {};
    const newPersonalRecords = { ...personalRecords };
    
    // 重新計算勝利交易（確保所有盈利交易都算）
    const winTrades = tradingTrades.filter(trade => trade.closed && (trade.profitLoss || 0) > 0);
    
    // 最長連勝紀錄
    newPersonalRecords.longest_win_streak = Math.max(
      newPersonalRecords.longest_win_streak || 0,
      bestWinStreak
    );
    
    // 單筆最大獲利
    const allProfits = tradingTrades.map(t => parseFloat(t.profitLoss) || 0).filter(p => p > 0);
    const maxProfit = allProfits.length > 0 ? Math.max(...allProfits) : 0;
    newPersonalRecords.biggest_single_profit = Math.max(
      newPersonalRecords.biggest_single_profit || 0,
      maxProfit
    );
    
    // 計算總獲利和勝率
    const totalProfit = tradingTrades.reduce((sum, trade) => sum + (parseFloat(trade.profitLoss) || 0), 0);
    const winRate = closedTrades.length > 0 ? (winTrades.length / closedTrades.length) * 100 : 0;
    
    // 最佳月度回報 (總回報率)
    const returnRate = totalProfit > 0 ? (totalProfit / 10000) * 100 : 0;
    newPersonalRecords.best_monthly_return = Math.max(
      newPersonalRecords.best_monthly_return || 0,
      returnRate
    );
    
    // 完美風控天數（所有交易都有風控）
    const riskControlDays = recordDates.length > 0 ? 
      recordDates.filter(date => {
        const dayTrades = tradingTrades.filter(trade => 
          new Date(trade.date || trade.entryDate).toDateString() === date
        );
        return dayTrades.length > 0 && dayTrades.every(trade => trade.riskControl === '是');
      }).length : 0;
    
    newPersonalRecords.perfect_risk_days = Math.max(
      newPersonalRecords.perfect_risk_days || 0,
      riskControlDays
    );
    
    // 交易一致性（策略遵守率）
    const strategyCompliantTrades = tradingTrades.filter(trade => 
      trade.strategyCompliant === '是 ✅'
    ).length;
    const consistencyRate = tradingTrades.length > 0 ? 
      (strategyCompliantTrades / tradingTrades.length) * 100 : 0;
    
    newPersonalRecords.trading_consistency = Math.max(
      newPersonalRecords.trading_consistency || 0,
      consistencyRate
    );
    
    // 情緒控制分數（冷靜交易比例）
    const calmTrades = tradingTrades.filter(trade => 
      trade.emotionalState === '冷靜'
    ).length;
    const emotionalScore = tradingTrades.length > 0 ? 
      (calmTrades / tradingTrades.length) * 100 : 0;
    
    newPersonalRecords.emotional_control_score = Math.max(
      newPersonalRecords.emotional_control_score || 0,
      emotionalScore
    );
    
    // 檢查並解鎖成就
    const currentAchievements = gameData.achievements || [];
    let newAchievements = [...currentAchievements];
    let newlyUnlockedAchievements = [];
    
    // 首次盈利 - 修正：所有盈利交易都算，不管是否按計劃
    if (winTrades.length >= 1 && !newAchievements.includes('first_profit')) {
      newAchievements.push('first_profit');
      newlyUnlockedAchievements.push('first_profit');
      totalXP += BADGES['first_profit'].xp;
    }
    
    // 三連勝
    if (currentWinStreak >= 3 && !newAchievements.includes('win_streak_3')) {
      newAchievements.push('win_streak_3');
      newlyUnlockedAchievements.push('win_streak_3');
      totalXP += BADGES['win_streak_3'].xp;
    }
    
    // 五連勝
    if (currentWinStreak >= 5 && !newAchievements.includes('win_streak_5')) {
      newAchievements.push('win_streak_5');
      newlyUnlockedAchievements.push('win_streak_5');
      totalXP += BADGES['win_streak_5'].xp;
    }
    
    // 十連勝
    if (currentWinStreak >= 10 && !newAchievements.includes('win_streak_10')) {
      newAchievements.push('win_streak_10');
      newlyUnlockedAchievements.push('win_streak_10');
      totalXP += BADGES['win_streak_10'].xp;
    }
    
    const updatedGameData = {
      ...gameData,
      xp: totalXP,
      achievements: newAchievements,
      personalRecords: newPersonalRecords,
      streaks: {
        current_win: currentWinStreak,
        best_win: bestWinStreak,
        current_days: recordStreak,
        best_days: Math.max(gameData.streaks?.best_days || 0, recordStreak)
      },
      level: Math.floor(totalXP / 100) + 1
    };
    
    setGameData(updatedGameData);
    localStorage.setItem('tradingJournalGameData', JSON.stringify(updatedGameData));
    
    // 保存用戶專用的遊戲數據
    if (user) {
      const userKey = user.email || user.id;
      localStorage.setItem(`tradingJournalGameData_${userKey}`, JSON.stringify(updatedGameData));
    }
    
    // 顯示提醒（僅限新記錄）
    if (isNewRecord) {
      setTimeout(() => {
        let notifications = [];
        
        // 連續記錄天數提醒
        if (recordStreak > prevRecordStreak && recordStreak > 1) {
          const streakMessages = [
            `🎉 太棒了！連續記錄 ${recordStreak} 天！`,
            `🔥 火焰越燒越旺！你已經連續記錄 ${recordStreak} 天了！`,
            `💪 堅持就是勝利！${recordStreak} 天連續記錄達成！`,
            `🌟 專業交易者的紀律！${recordStreak} 天不間斷記錄！`,
            `⚡ 驚人的毅力！連續 ${recordStreak} 天記錄交易日記！`,
            `🚀 交易之路上的里程碑！${recordStreak} 天連續記錄！`
          ];
          
          const randomMessage = streakMessages[Math.floor(Math.random() * streakMessages.length)];
          
          let additionalMessage = '';
          let bonusXP = 0;
          
          if (recordStreak === 7) {
            additionalMessage = '\n🎁 解鎖成就：一週達人！';
            bonusXP = 50;
          } else if (recordStreak === 14) {
            additionalMessage = '\n🏆 解鎖成就：半月之星！';
            bonusXP = 100;
          } else if (recordStreak === 30) {
            additionalMessage = '\n👑 解鎖成就：月度傳奇！';
            bonusXP = 200;
          }
          
          // 加入獎勵XP
          if (bonusXP > 0) {
            updatedGameData.xp += bonusXP;
            setGameData(updatedGameData);
            localStorage.setItem('tradingJournalGameData', JSON.stringify(updatedGameData));
          }
          
          notifications.push({
            message: randomMessage + additionalMessage + 
              `\n\n🎯 當前狀態：\n• 總經驗值：${updatedGameData.xp} XP\n• 交易等級：Lv.${Math.floor(updatedGameData.xp / 100) + 1}\n• 最佳連續記錄：${Math.max(gameData.streaks?.best_days || 0, recordStreak)} 天` +
              (bonusXP > 0 ? `\n• 獎勵 XP：+${bonusXP}` : ''),
            delay: 500,
            type: 'streak'
          });
        }
        
        // 交易連勝提醒
        const prevWinStreak = gameData.streaks?.current_win || 0;
        if (currentWinStreak > prevWinStreak && currentWinStreak >= 3) {
          const winStreakMessages = [
            `🎊 交易連勝！你已經連續獲利 ${currentWinStreak} 次！`,
            `💎 完美執行！${currentWinStreak} 連勝的表現令人驚艷！`,
            `⚡ 市場征服者！連續 ${currentWinStreak} 次盈利交易！`,
            `🔥 熱血沸騰！${currentWinStreak} 連勝勢不可擋！`
          ];
          
          const randomWinMessage = winStreakMessages[Math.floor(Math.random() * winStreakMessages.length)];
          
          let warningMessage = '';
          if (currentWinStreak >= 5) {
            warningMessage = '\n\n⚠️ 提醒：連勝時請保持冷靜，不要過度自信！';
          } else if (currentWinStreak >= 7) {
            warningMessage = '\n\n🚨 警告：極長連勝可能預示著風險，請謹慎交易！';
          }
          
          notifications.push({
            message: randomWinMessage + '\n\n保持良好的交易紀律，繼續加油！' + warningMessage,
            delay: 1000,
            type: 'win_streak'
          });
        }
        
        // 新成就解鎖提醒
        newlyUnlockedAchievements.forEach(achievementId => {
          const achievement = BADGES[achievementId];
          if (achievement) {
            notifications.push({
              message: `🏆 新成就解鎖！\n\n${achievement.icon} ${achievement.name}\n${achievement.description}\n\n🎁 獲得 ${achievement.xp} XP！`,
              delay: 800 + newlyUnlockedAchievements.indexOf(achievementId) * 500,
              type: 'achievement'
            });
          }
        });
        
        // 經驗值升級提醒
        const prevLevel = Math.floor((gameData.xp || 0) / 100) + 1;
        const newLevel = Math.floor(totalXP / 100) + 1;
        if (newLevel > prevLevel) {
          notifications.push({
            message: `🎈 等級提升！\n恭喜達到 Lv.${newLevel}！\n\n• 新的技能點可用於升級技能樹\n• 解鎖更多進階功能\n• 交易者聲望持續提升`,
            delay: 1500,
            type: 'level_up'
          });
        }
        
        // 特殊成就提醒
        if (recordStreak === 100) {
          notifications.push({
            message: '🌟 傳奇成就解鎖！\n\n百日記錄大師\n你已經連續記錄了100天的交易日記！\n這種毅力和紀律足以成為市場傳奇！\n\n🎁 特殊獎勵：500 XP',
            delay: 2000,
            type: 'legendary'
          });
        }
        
        // 顯示通知
        notifications.forEach(notification => {
          setTimeout(() => {
            // 創建美化的彈窗
            const isStreakNotification = notification.type === 'streak';
            const isWinStreak = notification.type === 'win_streak';
            const isLevelUp = notification.type === 'level_up';
            const isAchievement = notification.type === 'achievement';
            
            let bgColor, borderColor, icon;
            
            if (isStreakNotification) {
              bgColor = 'linear-gradient(135deg, #FF6B35, #F7931E)';
              borderColor = '#FF6B35';
              icon = '🔥';
            } else if (isWinStreak) {
              bgColor = 'linear-gradient(135deg, #4ECDC4, #44A08D)';
              borderColor = '#4ECDC4';
              icon = '🎊';
            } else if (isLevelUp) {
              bgColor = 'linear-gradient(135deg, #FFD700, #FFA500)';
              borderColor = '#FFD700';
              icon = '🎈';
            } else if (isAchievement) {
              bgColor = 'linear-gradient(135deg, #9333EA, #C084FC)';
              borderColor = '#9333EA';
              icon = '🏆';
            } else {
              bgColor = 'linear-gradient(135deg, #8B5CF6, #A855F7)';
              borderColor = '#8B5CF6';
              icon = '🌟';
            }
            
            // 使用更優雅的提醒方式
            const modal = document.createElement('div');
            modal.style.cssText = `
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: rgba(0, 0, 0, 0.7);
              display: flex;
              align-items: center;
              justify-content: center;
              z-index: 9999;
              animation: fadeIn 0.3s ease;
            `;
            
            const popup = document.createElement('div');
            popup.style.cssText = `
              background: ${bgColor};
              border: 3px solid ${borderColor};
              border-radius: 20px;
              padding: 30px;
              max-width: 400px;
              text-align: center;
              color: white;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
              box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
              animation: popIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            `;
            
            popup.innerHTML = `
              <div style="font-size: 48px; margin-bottom: 16px;">${icon}</div>
              <div style="white-space: pre-line; font-size: 16px; line-height: 1.5; font-weight: 600;">
                ${notification.message}
              </div>
              <button onclick="this.closest('div[style*=\"position: fixed\"]').remove()" 
                style="margin-top: 20px; padding: 12px 24px; background: rgba(255,255,255,0.2); 
                border: 2px solid rgba(255,255,255,0.3); border-radius: 12px; color: white; 
                font-weight: 700; cursor: pointer; font-size: 14px;">
                太棒了！
              </button>
            `;
            
            modal.appendChild(popup);
            document.body.appendChild(modal);
            
            // 添加動畫樣式
            const style = document.createElement('style');
            style.textContent = `
              @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
              }
              @keyframes popIn {
                from { transform: scale(0.5) rotate(-10deg); opacity: 0; }
                to { transform: scale(1) rotate(0deg); opacity: 1; }
              }
            `;
            document.head.appendChild(style);
            
            // 點擊背景關閉
            modal.onclick = (e) => {
              if (e.target === modal) {
                modal.remove();
              }
            };
            
            // 5秒後自動關閉
            setTimeout(() => {
              if (modal.parentNode) {
                modal.remove();
              }
            }, 5000);
            
          }, notification.delay);
        });
      }, 200);
    }
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
      setTimeout(() => updateGameDataWithNotifications(newTrades), 100);
      
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
        { key: 'brand', label: '交易者檔案', icon: <Crown size={18} /> },
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

  const renderContent = () => {
    // 如果沒有登錄用戶，顯示登錄界面
    if (!user) {
      return <LoginSystem onLogin={handleLogin} />;
    }
    
    switch (currentView) {
      case 'dashboard':
        return (
          <div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px'}}>
              <h2 style={{color: colors.txt0, margin: 0, fontSize: '32px', fontWeight: '700'}}>交易儀表板</h2>
              <div style={{display: 'flex', gap: '12px'}}>
                <button
                  onClick={() => {
                    setEditingTrade(null);
                    setFormData({type: 'trading'});
                    setCurrentView('edit');
                  }}
                  style={{...buttonStyle, display: 'flex', alignItems: 'center', gap: '8px'}}
                >
                  <PlusCircle size={18} />
                  新增交易日
                </button>
                <button
                  onClick={() => {
                    setEditingTrade(null);
                    setFormData({type: 'non-trading'});
                    setCurrentView('edit');
                  }}
                  style={{...buttonStyle, backgroundColor: colors.purple, display: 'flex', alignItems: 'center', gap: '8px'}}
                >
                  <Calendar size={18} />
                  新增非交易日
                </button>
              </div>
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
            
            {/* 錯誤模式分析 */}
            <ErrorPatternAnalysis trades={trades} />
            
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
                已獲得徽章 ({gameData.achievements?.length || 0})
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px'
              }}>
                {(gameData.achievements?.length || 0) === 0 ? (
                  <div style={{
                    textAlign: 'center',
                    color: colors.txt2,
                    padding: '40px',
                    gridColumn: '1 / -1'
                  }}>
                    還沒有獲得任何徽章，開始交易來解鎖成就吧！
                  </div>
                ) : (
                  (gameData.achievements || []).map(badgeId => {
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
                  if ((gameData.achievements || []).includes(badgeId)) return null;
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
            <DailyQuests trades={trades} gameData={gameData} onComplete={(xp, title) => {
              // 任務完成處理
              const newGameData = {
                ...gameData,
                xp: (gameData.xp || 0) + xp
              };
              setGameData(newGameData);
              localStorage.setItem('tradingJournalGameData', JSON.stringify(newGameData));
              
              // 顯示完成提醒
              setTimeout(() => {
                alert(`🎉 任務完成！\n\n「${title}」\n獲得 ${xp} XP\n總 XP: ${newGameData.xp}`);
              }, 100);
            }} />
          </div>
        );

      case 'edit':
        const recordType = formData.type || 'trading';
        const visibleFields = Array.isArray(fields) ? fields.filter(field => {
          if (!field || !field.visible) return false;
          if (field.category === 'common') return true;
          return field.category === recordType;
        }) : [];
        
        return (
          <div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px'}}>
              <h2 style={{color: colors.txt0, margin: 0, fontSize: '32px', fontWeight: '700'}}>
                {editingTrade ? '編輯記錄' : (recordType === 'trading' ? '新增交易日記錄' : '新增非交易日記錄')}
              </h2>
              <div style={{display: 'flex', gap: '12px'}}>
                <button
                  onClick={() => setCurrentView('dashboard')}
                  style={{...buttonStyle, backgroundColor: colors.bg2, color: colors.txt0, boxShadow: 'none'}}
                >
                  取消
                </button>
                <button onClick={handleSaveTrade} style={buttonStyle}>
                  儲存記錄
                </button>
              </div>
            </div>
            
            {/* 火焰條顯示 */}
            <FlameStreak gameData={gameData} trades={trades} onUpdate={saveGameData} currentFormData={formData} />
            
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
                        // 創建全新的默認數據副本
                        const freshGameData = {
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
                          personalRecords: {
                            longest_win_streak: 0,
                            biggest_single_profit: 0,
                            best_monthly_return: 0,
                            perfect_risk_days: 0,
                            trading_consistency: 0,
                            emotional_control_score: 0
                          }
                        };
                        
                        setGameData(freshGameData);
                        localStorage.removeItem('tradingJournalGameData');
                        localStorage.setItem('tradingJournalGameData', JSON.stringify(freshGameData));
                        
                        // 重置用戶專用的遊戲數據
                        if (user) {
                          const userKey = user.email || user.id;
                          localStorage.removeItem(`tradingJournalGameData_${userKey}`);
                          localStorage.setItem(`tradingJournalGameData_${userKey}`, JSON.stringify(freshGameData));
                        }
                        
                        alert('遊戲進度已完全重置！');
                        
                        // 強制頁面刷新以確保所有組件重新渲染
                        window.location.reload();
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
                        
                        // 重置用戶專用的數據
                        if (user) {
                          const userKey = user.email || user.id;
                          localStorage.removeItem(`tradingJournalTrades_${userKey}`);
                          localStorage.setItem(`tradingJournalBalance_${userKey}`, '10000');
                        }
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

            {/* 匯出功能 */}
            <div style={{...cardStyle, marginBottom: '32px'}}>
              <h3 style={{color: colors.txt0, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px'}}>
                <Download size={20} />
                資料匯出
                <span style={{
                  backgroundColor: colors.ok,
                  color: colors.bg0,
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: '700'
                }}>
                  社交影響
                </span>
              </h3>
              
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px'}}>
                <div style={{
                  padding: '20px',
                  backgroundColor: colors.bg0,
                  borderRadius: '12px',
                  border: `2px solid ${colors.brand}30`
                }}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px'}}>
                    <div style={{fontSize: '24px'}}>📄</div>
                    <div>
                      <h4 style={{color: colors.txt0, fontSize: '16px', fontWeight: '700', margin: 0}}>
                        交易記錄匯出
                      </h4>
                      <p style={{color: colors.txt2, fontSize: '12px', margin: '4px 0'}}>
                        匯出所有交易記錄為 CSV 格式
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const csvData = exportTradesToCSV(trades);
                      downloadCSV(csvData, 'trading-records.csv');
                    }}
                    style={{
                      ...buttonStyle,
                      width: '100%',
                      padding: '12px',
                      fontSize: '14px'
                    }}
                  >
                    <Download size={16} style={{marginRight: '8px'}} />
                    匯出交易記錄
                  </button>
                </div>
                
                <div style={{
                  padding: '20px',
                  backgroundColor: colors.bg0,
                  borderRadius: '12px',
                  border: `2px solid ${colors.gold}30`
                }}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px'}}>
                    <div style={{fontSize: '24px'}}>📊</div>
                    <div>
                      <h4 style={{color: colors.txt0, fontSize: '16px', fontWeight: '700', margin: 0}}>
                        週報匯出
                      </h4>
                      <p style={{color: colors.txt2, fontSize: '12px', margin: '4px 0'}}>
                        匯出本週交易分析報告
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const weeklyReport = generateWeeklyReport(trades, gameData);
                      downloadJSON(weeklyReport, 'weekly-report.json');
                    }}
                    style={{
                      ...buttonStyle,
                      backgroundColor: colors.gold,
                      width: '100%',
                      padding: '12px',
                      fontSize: '14px'
                    }}
                  >
                    <BarChart3 size={16} style={{marginRight: '8px'}} />
                    生成週報
                  </button>
                </div>
                
                <div style={{
                  padding: '20px',
                  backgroundColor: colors.bg0,
                  borderRadius: '12px',
                  border: `2px solid ${colors.legendary}30`
                }}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px'}}>
                    <div style={{fontSize: '24px'}}>🏆</div>
                    <div>
                      <h4 style={{color: colors.txt0, fontSize: '16px', fontWeight: '700', margin: 0}}>
                        成就分享
                      </h4>
                      <p style={{color: colors.txt2, fontSize: '12px', margin: '4px 0'}}>
                        分享個人交易成就給夥伴或教練
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const achievementSummary = generateAchievementSummary(gameData, trades);
                      downloadJSON(achievementSummary, 'achievement-summary.json');
                    }}
                    style={{
                      ...buttonStyle,
                      backgroundColor: colors.legendary,
                      width: '100%',
                      padding: '12px',
                      fontSize: '14px'
                    }}
                  >
                    <Trophy size={16} style={{marginRight: '8px'}} />
                    分享成就
                  </button>
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
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <div>
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
            </div>
            
            {/* 用戶信息和登出 */}
            {user && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                backgroundColor: colors.bg1,
                padding: '12px 20px',
                borderRadius: '16px',
                border: `2px solid ${colors.brand}30`
              }}>
                <div style={{textAlign: 'right'}}>
                  <div style={{
                    color: colors.txt0,
                    fontSize: '16px',
                    fontWeight: '700'
                  }}>
                    歡迎回來，{user.name}
                  </div>
                  <div style={{
                    color: colors.txt2,
                    fontSize: '12px'
                  }}>
                    {user.email}
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  style={{
                    ...buttonStyle,
                    backgroundColor: colors.err,
                    padding: '8px 16px',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <LogOut size={16} />
                  登出
                </button>
              </div>
            )}
          </div>
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

// 匯出功能輔助函數
const exportTradesToCSV = (trades) => {
  const headers = [
    '日期', '記錄類型', '交易標題', '交易對象', '交易方向', '進場價格', '出場價格',
    '損益金額', '損益百分比', 'R倍數', '策略名稱', '符合策略', '風控遵守',
    '情緒狀態', '心態評分', '自訂標籤', '按計劃管理', '當日心得'
  ];
  
  const csvContent = [
    headers.join(','),
    ...trades.map(trade => [
      trade.date || trade.entryDate || '',
      trade.type === 'trading' ? '交易日' : '非交易日',
      trade.title || '',
      trade.pair || '',
      trade.direction || '',
      trade.entryPrice || '',
      trade.exitPrice || '',
      trade.profitLoss || '',
      trade.profitLossPct || '',
      trade.rMultiple || '',
      trade.strategy || '',
      trade.strategyCompliant || '',
      trade.riskControl || '',
      Array.isArray(trade.emotions) ? trade.emotions.join(';') : '',
      trade.mentalScore || '',
      Array.isArray(trade.customTags) ? trade.customTags.join(';') : '',
      trade.managedByPlan || '',
      trade.dailyReflection || ''
    ].map(field => `"${field}"`).join(','))
  ].join('\\n');
  
  return csvContent;
};

const generateWeeklyReport = (trades, gameData) => {
  const now = new Date();
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - now.getDay());
  weekStart.setHours(0, 0, 0, 0);
  
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  weekEnd.setHours(23, 59, 59, 999);
  
  const weekTrades = trades.filter(trade => {
    const tradeDate = new Date(trade.date || trade.entryDate);
    return tradeDate >= weekStart && tradeDate <= weekEnd;
  });
  
  const tradingDays = weekTrades.filter(trade => trade.type === 'trading' && trade.closed);
  const winningTrades = tradingDays.filter(trade => trade.profitLoss > 0);
  const totalPL = tradingDays.reduce((sum, trade) => sum + (trade.profitLoss || 0), 0);
  
  return {
    reportDate: now.toISOString(),
    weekPeriod: {
      start: weekStart.toDateString(),
      end: weekEnd.toDateString()
    },
    summary: {
      totalTrades: tradingDays.length,
      winningTrades: winningTrades.length,
      winRate: tradingDays.length > 0 ? ((winningTrades.length / tradingDays.length) * 100).toFixed(1) + '%' : '0%',
      totalPL: totalPL.toFixed(2),
      averageReturn: tradingDays.length > 0 ? (totalPL / tradingDays.length).toFixed(2) : '0',
      planAdherence: tradingDays.filter(t => t.managedByPlan === '是').length,
      riskControlRate: tradingDays.filter(t => t.riskControl === '是').length
    },
    achievements: gameData.achievements || [],
    currentLevel: gameData.xp || 0,
    streaks: gameData.streaks || {},
    topStrategies: getTopStrategies(tradingDays),
    emotionalState: getEmotionalAnalysis(tradingDays),
    improvements: getImprovementSuggestions(tradingDays)
  };
};

const generateAchievementSummary = (gameData, trades) => {
  const closedTrades = trades.filter(trade => trade.closed && trade.type === 'trading');
  const totalPL = closedTrades.reduce((sum, trade) => sum + (trade.profitLoss || 0), 0);
  
  return {
    exportDate: new Date().toISOString(),
    traderProfile: {
      level: gameData.xp || 0,
      title: gameData.personalBrand?.customTitle || '交易者',
      avatar: gameData.personalBrand?.selectedAvatar || '🌱',
      philosophy: gameData.personalBrand?.tradingPhilosophy || ''
    },
    achievements: (gameData.achievements || []).map(badgeId => ({
      id: badgeId,
      name: BADGES[badgeId]?.name || badgeId,
      description: BADGES[badgeId]?.description || '',
      icon: BADGES[badgeId]?.icon || '🏆'
    })),
    personalRecords: gameData.personalRecords || {},
    tradingStats: {
      totalTrades: closedTrades.length,
      totalPL: totalPL.toFixed(2),
      winRate: closedTrades.length > 0 ? ((closedTrades.filter(t => t.profitLoss > 0).length / closedTrades.length) * 100).toFixed(1) + '%' : '0%',
      bestStreak: gameData.streaks?.best_win || 0,
      currentStreak: gameData.streaks?.current_win || 0
    },
    socialContribution: {
      marketContribution: gameData.personalBrand?.marketContribution || 0,
      helpedNewbies: gameData.personalBrand?.helpedNewbies || 0,
      sharedStrategies: gameData.personalBrand?.sharedStrategies || 0
    }
  };
};

const getTopStrategies = (trades) => {
  const strategyStats = {};
  trades.forEach(trade => {
    if (trade.strategy) {
      if (!strategyStats[trade.strategy]) {
        strategyStats[trade.strategy] = { count: 0, totalPL: 0 };
      }
      strategyStats[trade.strategy].count++;
      strategyStats[trade.strategy].totalPL += trade.profitLoss || 0;
    }
  });
  
  return Object.entries(strategyStats)
    .map(([strategy, stats]) => ({
      strategy,
      count: stats.count,
      totalPL: stats.totalPL.toFixed(2),
      avgPL: (stats.totalPL / stats.count).toFixed(2)
    }))
    .sort((a, b) => b.totalPL - a.totalPL)
    .slice(0, 3);
};

const getEmotionalAnalysis = (trades) => {
  const emotions = {};
  trades.forEach(trade => {
    if (trade.emotions && Array.isArray(trade.emotions)) {
      trade.emotions.forEach(emotion => {
        emotions[emotion] = (emotions[emotion] || 0) + 1;
      });
    }
  });
  
  const total = Object.values(emotions).reduce((sum, count) => sum + count, 0);
  return Object.entries(emotions).map(([emotion, count]) => ({
    emotion,
    count,
    percentage: total > 0 ? ((count / total) * 100).toFixed(1) + '%' : '0%'
  }));
};

const getImprovementSuggestions = (trades) => {
  const suggestions = [];
  const losingTrades = trades.filter(t => t.profitLoss < 0);
  const emotionalTrades = trades.filter(t => t.emotions?.includes('恐懼') || t.emotions?.includes('貪婪'));
  const nonPlanTrades = trades.filter(t => t.managedByPlan === '否');
  
  if (losingTrades.length > trades.length * 0.6) {
    suggestions.push('勝率偏低，建議重新檢視交易策略或進場時機');
  }
  
  if (emotionalTrades.length > trades.length * 0.3) {
    suggestions.push('情緒化交易比例較高，建議加強心理控制訓練');
  }
  
  if (nonPlanTrades.length > trades.length * 0.2) {
    suggestions.push('未按計劃執行的交易較多，建議加強紀律性');
  }
  
  if (suggestions.length === 0) {
    suggestions.push('交易表現良好，繼續保持當前的交易紀律');
  }
  
  return suggestions;
};

const downloadCSV = (csvContent, filename) => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const downloadJSON = (data, filename) => {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// 火焰條組件 - 連續記錄天數追蹤 - 增強版
const FlameStreak = ({ gameData, trades, onUpdate, currentFormData = null }) => {
  const today = new Date().toDateString();
  
  // 檢查今天是否有記錄（交易日或非交易日都算）
  let hasRecordToday = trades.some(trade => {
    const tradeDate = trade.date || trade.entryDate;
    return tradeDate && new Date(tradeDate).toDateString() === today;
  });
  
  // 如果正在編輯，且當前表單日期是今天，也算有記錄
  if (currentFormData && currentFormData.entryDate) {
    const formDate = new Date(currentFormData.entryDate).toDateString();
    if (formDate === today) {
      hasRecordToday = true;
    }
  }
  
  // 動態計算連續記錄天數
  const calculateDynamicStreak = () => {
    // 創建包含當前表單數據的模擬交易列表
    let allTrades = [...trades];
    if (currentFormData && currentFormData.entryDate) {
      const mockTrade = {
        id: 'temp',
        date: currentFormData.entryDate,
        entryDate: currentFormData.entryDate
      };
      allTrades = [...allTrades, mockTrade];
    }
    
    const recordDates = [...new Set(allTrades.map(trade => {
      const date = trade.date || trade.entryDate;
      return date ? new Date(date).toDateString() : null;
    }))].filter(Boolean).sort((a, b) => new Date(b) - new Date(a));
    
    let recordStreak = 0;
    
    if (recordDates.length > 0) {
      const latestRecordDate = recordDates[0];
      const latestDate = new Date(latestRecordDate);
      const todayDate = new Date(today);
      
      const daysDiff = Math.floor((todayDate - latestDate) / (1000 * 60 * 60 * 24));
      
      if (daysDiff <= 1) {
        recordStreak = 1;
        
        for (let i = 1; i < recordDates.length; i++) {
          const currentDate = new Date(recordDates[i - 1]);
          const prevDate = new Date(recordDates[i]);
          const daysBetween = Math.floor((currentDate - prevDate) / (1000 * 60 * 60 * 24));
          
          if (daysBetween <= 3) {
            recordStreak++;
          } else {
            break;
          }
        }
      }
    }
    
    return recordStreak;
  };
  
  // 使用動態計算的連勝天數，如果沒有表單數據則使用 gameData 中的數據
  const currentStreak = currentFormData ? calculateDynamicStreak() : (gameData?.streaks?.current_days || 0);
  const maxStreak = 30;
  
  const getFlameEmoji = (days) => {
    if (days === 0) return '💀';
    if (days < 3) return '🔥';
    if (days < 7) return '🔥🔥';
    if (days < 14) return '🔥🔥🔥';
    if (days < 21) return '🔥🔥🔥🔥';
    return '🔥🔥🔥🔥⚡';
  };
  
  const getFlameColor = (days, hasRecord) => {
    if (!hasRecord && days === 0) return colors.err;
    if (days === 0) return colors.txt2;
    if (days < 3) return colors.warn;
    if (days < 7) return colors.brand;
    if (days < 14) return colors.gold;
    if (days < 21) return colors.legendary;
    return colors.diamond;
  };
  
  const getMotivationMessage = (days, hasRecord) => {
    if (!hasRecord && days === 0) return '💀 今日尚未記錄 - 火焰已熄滅！';
    if (!hasRecord && days > 0) return '⚠️ 今日尚未記錄 - 火焰即將熄滅！';
    if (days === 1) return '🌱 記錄習慣開始萌芽';
    if (days < 3) return '🔥 不錯！繼續保持';
    if (days < 7) return '🔥🔥 習慣正在形成中';
    if (days < 14) return '🔥🔥🔥 優秀！交易紀律很棒';
    if (days < 21) return '🔥🔥🔥🔥 專業交易者水準！';
    return '🔥🔥🔥🔥⚡ 傳奇級交易者！';
  };
  
  return (
    <div style={{
      ...cardStyle,
      marginBottom: '24px',
      background: `linear-gradient(135deg, ${getFlameColor(currentStreak, hasRecordToday)}30, ${colors.bg1}10)`,
      border: `2px solid ${getFlameColor(currentStreak, hasRecordToday)}50`,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* 背景動畫效果 */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: currentStreak > 7 ? `
          radial-gradient(circle at 20% 20%, ${getFlameColor(currentStreak, hasRecordToday)}20 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, ${getFlameColor(currentStreak, hasRecordToday)}15 0%, transparent 50%)
        ` : 'none',
        opacity: 0.3
      }} />
      
      <div style={{position: 'relative', zIndex: 1}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
            <div style={{
              fontSize: '52px',
              filter: currentStreak > 14 ? 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.6))' : 'none',
              animation: !hasRecordToday && currentStreak > 0 ? 'pulse 2s infinite' : 'none'
            }}>
              {getFlameEmoji(currentStreak)}
            </div>
            <div>
              <div style={{
                color: getFlameColor(currentStreak, hasRecordToday), 
                fontSize: '24px', 
                fontWeight: '800',
                marginBottom: '4px',
                textShadow: currentStreak > 14 ? '0 0 10px rgba(255, 215, 0, 0.4)' : 'none'
              }}>
                {currentStreak > 0 ? `🔥 火焰連擊：${currentStreak} 天` : '💀 火焰已熄滅'}
              </div>
              <div style={{color: colors.txt2, fontSize: '14px', lineHeight: '1.4'}}>
                {getMotivationMessage(currentStreak, hasRecordToday)}
              </div>
            </div>
          </div>
          
          <div style={{textAlign: 'right'}}>
            <div style={{
              color: getFlameColor(currentStreak, hasRecordToday), 
              fontSize: '32px', 
              fontWeight: '800',
              textShadow: currentStreak > 14 ? '0 0 8px rgba(255, 215, 0, 0.4)' : 'none'
            }}>
              {currentStreak}
            </div>
            <div style={{color: colors.txt2, fontSize: '12px'}}>連續天數</div>
            {gameData?.streaks?.best_days > 0 && (
              <div style={{
                color: colors.gold, 
                fontSize: '10px', 
                marginTop: '4px'
              }}>
                最佳: {gameData.streaks.best_days}天
              </div>
            )}
          </div>
        </div>
        
        {/* 進度條 */}
        <div style={{marginBottom: '16px'}}>
          <div style={{
            backgroundColor: colors.bg0,
            borderRadius: '12px',
            padding: '4px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              background: `linear-gradient(90deg, ${getFlameColor(currentStreak, hasRecordToday)}, ${colors.gold})`,
              height: '12px',
              borderRadius: '8px',
              width: `${Math.min((currentStreak / maxStreak) * 100, 100)}%`,
              transition: 'width 1s ease-out',
              boxShadow: currentStreak > 7 ? `0 0 10px ${getFlameColor(currentStreak, hasRecordToday)}60` : 'none'
            }} />
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '11px',
            color: colors.txt2,
            marginTop: '6px'
          }}>
            <span>目標：連續 {maxStreak} 天記錄</span>
            <span>{Math.round((currentStreak / maxStreak) * 100)}% 完成</span>
          </div>
        </div>
        
        {/* 里程碑提示 */}
        {currentStreak > 0 && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            flexWrap: 'wrap'
          }}>
            {[3, 7, 14, 21, 30].map(milestone => (
              <div key={milestone} style={{
                padding: '4px 8px',
                borderRadius: '12px',
                fontSize: '10px',
                fontWeight: '600',
                backgroundColor: currentStreak >= milestone ? getFlameColor(milestone, true) + '30' : colors.bg0,
                color: currentStreak >= milestone ? getFlameColor(milestone, true) : colors.txt2,
                border: `1px solid ${currentStreak >= milestone ? getFlameColor(milestone, true) : colors.txt2}30`
              }}>
                {milestone}天 {currentStreak >= milestone ? '✓' : ''}
              </div>
            ))}
          </div>
        )}
        
        {/* 緊急提醒 */}
        {!hasRecordToday && currentStreak > 0 && (
          <div style={{
            marginTop: '16px',
            padding: '12px',
            backgroundColor: colors.err + '20',
            borderRadius: '12px',
            border: `2px solid ${colors.err}`,
            textAlign: 'center'
          }}>
            <div style={{color: colors.err, fontSize: '14px', fontWeight: '700'}}>
              ⚠️ 緊急提醒：{currentStreak} 天連擊即將中斷！
            </div>
            <div style={{color: colors.txt2, fontSize: '12px', marginTop: '4px'}}>
              趕快記錄今天的交易活動以維持火焰不滅
            </div>
          </div>
        )}
      </div>
      
      <style>
        {`
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.05); opacity: 0.8; }
          }
        `}
      </style>
    </div>
  );
};

// 錯誤模式分析組件 - 增強版，包含更多錯誤類型
const ErrorPatternAnalysis = ({ trades }) => {
  const closedTrades = Array.isArray(trades) ? trades.filter(trade => trade?.closed && trade.type === 'trading') : [];
  
  // 分析常見錯誤 - 擴展更多錯誤類型
  const analyzeErrors = () => {
    const errors = {
      '過早出場': 0,
      '情緒化交易': 0,
      '不符策略': 0,
      '風控失誤': 0,
      '過度交易': 0,
      '追單': 0,
      '過早停損': 0,
      '拖延進場': 0,
      '部位過大': 0,
      '無視止損': 0,
      '逆勢加倉': 0,
      '恐慌出場': 0,
      '貪婪持倉': 0,
      '計劃外交易': 0,
      '技術分析錯誤': 0
    };
    
    closedTrades.forEach(trade => {
      // 檢查自訂標籤中的錯誤
      if (Array.isArray(trade.customTags)) {
        trade.customTags.forEach(tag => {
          if (errors.hasOwnProperty(tag)) {
            errors[tag]++;
          }
        });
      }
      
      // 基於其他字段推導錯誤
      if (trade.strategyCompliant === '否 ❌') errors['不符策略']++;
      if (trade.riskControl === '否') errors['風控失誤']++;
      if (trade.overTrading === '是') errors['過度交易']++;
      
      // 基於情緒推導錯誤
      if (Array.isArray(trade.emotions)) {
        if (trade.emotions.includes('恐懼')) errors['恐慌出場']++;
        if (trade.emotions.includes('貪婪')) errors['貪婪持倉']++;
        if (trade.emotions.includes('焦躁')) errors['情緒化交易']++;
      }
    });
    
    return Object.entries(errors)
      .map(([error, count]) => ({
        error,
        count,
        percentage: closedTrades.length > 0 ? Math.round((count / closedTrades.length) * 100) : 0
      }))
      .filter(item => item.count > 0) // 只顯示有發生的錯誤
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // 顯示前5個錯誤
  };
  
  // 獲得改進建議
  const getImprovementSuggestions = (topErrors) => {
    if (topErrors.length === 0) {
      return ['交易紀律良好，繼續保持！', '建議定期檢視交易計劃', '持續學習新的交易技能'];
    }
    
    const suggestions = [];
    const topError = topErrors[0];
    
    switch (topError.error) {
      case '過早出場':
        suggestions.push('制定明確的出場規則，避免情緒決策');
        suggestions.push('使用部分獲利了結，讓趨勢繼續走');
        break;
      case '追單':
        suggestions.push('設定嚴格的進場條件，避免FOMO心態');
        suggestions.push('錯過就錯過，等待下一個機會');
        break;
      case '不符策略':
        suggestions.push('每次進場前檢查是否符合策略條件');
        suggestions.push('設定策略檢查清單');
        break;
      case '風控失誤':
        suggestions.push('嚴格執行1%風險規則');
        suggestions.push('每筆交易必須設定停損');
        break;
      case '情緒化交易':
        suggestions.push('建立交易前的情緒檢查機制');
        suggestions.push('情緒不穩時避免交易');
        break;
      default:
        suggestions.push(`重點改善「${topError.error}」問題`);
        suggestions.push('建議記錄更多細節以找出根本原因');
    }
    
    return suggestions;
  };
  
  const topErrors = analyzeErrors();
  const improvements = getImprovementSuggestions(topErrors);
  
  return (
    <div style={{
      ...cardStyle,
      marginBottom: '20px',
      background: `linear-gradient(135deg, ${colors.warn}20, ${colors.bg1})`,
      border: `2px solid ${colors.warn}30`
    }}>
      <h3 style={{color: colors.txt0, marginBottom: '16px', fontSize: '18px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px'}}>
        📊 錯誤模式分析 
        <span style={{
          backgroundColor: colors.warn,
          color: colors.bg0,
          padding: '4px 8px',
          borderRadius: '12px',
          fontSize: '11px',
          fontWeight: '700'
        }}>
          智能分析
        </span>
      </h3>
      
      {topErrors.length === 0 ? (
        <div style={{textAlign: 'center', color: colors.txt2, padding: '20px'}}>
          <div style={{fontSize: '48px', marginBottom: '12px'}}>🎉</div>
          <div style={{color: colors.ok, fontSize: '16px', fontWeight: '600'}}>
            優秀！暫無明顯錯誤模式
          </div>
          <div style={{fontSize: '14px', marginTop: '8px'}}>
            繼續保持良好的交易紀律
          </div>
        </div>
      ) : (
        <>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '12px',
            marginBottom: '16px'
          }}>
            {topErrors.map((errorData, index) => (
              <div key={errorData.error} style={{
                textAlign: 'center',
                padding: '12px',
                backgroundColor: colors.bg0,
                borderRadius: '8px',
                border: `2px solid ${
                  index === 0 ? colors.err : 
                  index === 1 ? colors.warn : 
                  colors.txt2
                }`,
                position: 'relative'
              }}>
                {index === 0 && (
                  <div style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-6px',
                    backgroundColor: colors.err,
                    color: colors.txt0,
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: '700'
                  }}>
                    !
                  </div>
                )}
                <div style={{
                  color: index === 0 ? colors.err : index === 1 ? colors.warn : colors.txt1, 
                  fontSize: '20px', 
                  fontWeight: '700'
                }}>
                  {errorData.percentage}%
                </div>
                <div style={{color: colors.txt2, fontSize: '11px', lineHeight: '1.2'}}>
                  {errorData.error}
                </div>
                <div style={{color: colors.txt2, fontSize: '10px', marginTop: '4px'}}>
                  {errorData.count}次
                </div>
              </div>
            ))}
          </div>
          
          <div style={{
            padding: '16px',
            backgroundColor: colors.brand + '20',
            borderRadius: '12px',
            border: `2px solid ${colors.brand}30`
          }}>
            <div style={{color: colors.brand, fontSize: '16px', fontWeight: '700', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px'}}>
              💡 個人化改進建議
            </div>
            {improvements.map((suggestion, index) => (
              <div key={index} style={{
                color: colors.txt1, 
                fontSize: '14px',
                marginBottom: '6px',
                paddingLeft: '16px',
                position: 'relative'
              }}>
                <span style={{
                  position: 'absolute',
                  left: '0',
                  color: colors.brand,
                  fontWeight: '700'
                }}>
                  {index + 1}.
                </span>
                {suggestion}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TradingJournalApp;
import { 
  PlusCircle, TrendingUp, TrendingDown, Calendar, Target, Settings, BarChart3, 
  FileText, Search, Filter, Eye, EyeOff, Trash2, Edit3, Upload, Download, 
  DollarSign, RefreshCw, Image, X, Star, Trophy, Crown, Zap, Shield, 
  Award, Users, BookOpen, Brain, Heart, Flame, Lock, Gift, Timer,
  Sparkles, Medal, Sword, Compass, Diamond, Gem, Rocket
} from 'lucide-react';

// 交易者等級系統 - 基於八角框架的史詩意義與使命感
const TRADER_LEVELS = [
  { level: 1, title: '新手交易者', minXP: 0, icon: '🌱', color: '#10B981', description: '剛踏入交易世界的探索者' },
  { level: 5, title: '學徒交易者', minXP: 200, icon: '📚', color: '#3B82F6', description: '開始學習市場規律的學生' },
  { level: 10, title: '專業交易者', minXP: 1000, icon: '💼', color: '#8B5CF6', description: '掌握基本交易技巧的實踐者' },
  { level: 20, title: '大師交易者', minXP: 3000, icon: '🎯', color: '#F59E0B', description: '具有豐富經驗的市場專家' },
  { level: 30, title: '傳奇交易者', minXP: 7000, icon: '👑', color: '#EF4444', description: '在市場中創造傳奇的智者' },
  { level: 50, title: '市場之神', minXP: 15000, icon: '⚡', color: '#FBBF24', description: '達到交易藝術巔峰的至高存在' }
];

// 個人交易品牌系統 - 八角框架：創意授權與反饋
const TRADING_BRANDS = {
  titles: [
    '量化分析師', '技術專家', '基本面研究員', '風險管理大師', 
    '心理戰士', '市場獵人', '趨勢騎士', '套利專家',
    '波段舞者', '日內刺客', '長線投資家', '價值發現者'
  ],
  avatars: [
    '🚀', '⚡', '🎯', '🔥', '💎', '👑', '🛡️', '⭐', 
    '🌟', '💫', '✨', '🏆', '🎪', '🎭', '🎨', '🎯'
  ],
  philosophies: [
    '趨勢是我的朋友，我跟隨市場的步伐',
    '風險控制是成功的基石，每筆交易都要設停損',
    '耐心等待最佳時機，寧可錯過也不犯錯',
    '情緒是交易的敵人，冷靜分析才能獲勝',
    '持續學習和改進，每天都要進步一點點',
    '紀律執行交易計劃，不被貪婪和恐懼左右'
  ]
};

// 里程碑獎勵系統 - 八角框架：進步與成就感
const MILESTONE_REWARDS = {
  first_week: {
    name: '首週勇士',
    desc: '堅持記錄交易一週',
    icon: '🗓️',
    xp: 100,
    unlockFeature: 'advanced_charts'
  },
  profit_milestone_100: {
    name: '百元獲利',
    desc: '累計獲利達到100元',
    icon: '💰',
    xp: 150,
    unlockFeature: 'risk_calculator'
  },
  profit_milestone_1000: {
    name: '千元富翁',
    desc: '累計獲利達到1000元',
    icon: '💎',
    xp: 500,
    unlockFeature: 'advanced_analytics'
  },
  streak_master: {
    name: '連勝大師',
    desc: '達成10連勝',
    icon: '🔥',
    xp: 1000,
    unlockFeature: 'expert_mode'
  },
  discipline_legend: {
    name: '紀律傳說',
    desc: '100%按計劃執行50筆交易',
    icon: '⚖️',
    xp: 800,
    unlockFeature: 'strategy_templates'
  }
};

// 個人記錄系統 - 八角框架：進步與成就感
const PERSONAL_RECORDS = {
  longest_win_streak: { name: '最長連勝紀錄', icon: '🔥', unit: '筆' },
  biggest_single_profit: { name: '單筆最大獲利', icon: '💰', unit: '$' },
  best_monthly_return: { name: '最佳月度回報', icon: '📈', unit: '%' },
  perfect_risk_days: { name: '完美風控天數', icon: '🛡️', unit: '天' },
  trading_consistency: { name: '交易一致性', icon: '⚖️', unit: '%' },
  emotional_control_score: { name: '情緒控制分數', icon: '🧘', unit: '分' }
};

// 徽章系統
const BADGES = {
  'first_profit': { name: '首戰告捷', icon: '🎉', description: '完成首筆盈利交易', xp: 50 },
  'win_streak_3': { name: '三連勝', icon: '🔥', description: '連續3筆盈利交易', xp: 100 },
  'win_streak_5': { name: '五連勝', icon: '⚡', description: '連續5筆盈利交易', xp: 200 },
  'win_streak_10': { name: '十連勝', icon: '💫', description: '連續10筆盈利交易', xp: 500 },
  'risk_master': { name: '風控大師', icon: '🛡️', description: '95%以上交易設置停損', xp: 300 },
  'discipline_trader': { name: '紀律交易者', icon: '⚖️', description: '90%以上交易按計劃執行', xp: 400 },
  'monthly_profit': { name: '月度盈利王', icon: '👑', description: '單月盈利超過10%', xp: 600 },
  'big_winner': { name: '大贏家', icon: '💰', description: '單筆交易盈利超過5%', xp: 250 },
  'analyst': { name: '技術分析師', icon: '📊', description: '完成50次技術分析', xp: 200 },
  'strategist': { name: '策略大師', icon: '🎲', description: '使用5種不同交易策略', xp: 300 },
  'trader_100': { name: '百戰老兵', icon: '🏆', description: '完成100筆交易', xp: 500 },
  'profit_10k': { name: '萬元富翁', icon: '💎', description: '累計盈利達到10,000', xp: 1000 }
};

// 連勝保護系統
const STREAK_PROTECTION = {
  3: { message: '三連勝！保持冷靜，不要貪婪 💪', color: '#F59E0B' },
  5: { message: '五連勝！考慮減少倉位規模 ⚠️', color: '#EF4444' },
  7: { message: '七連勝！市場可能即將轉向 🚨', color: '#DC2626' },
  10: { message: '十連勝！極度危險，建議停止交易 ☠️', color: '#991B1B' }
};

// 顏色系統 - 增強遊戲化配色
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
  lime: '#32FF32'
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
    { id: 'profit_king', name: '獲利之王', desc: '單月獲利超過10%', icon: '👑', xp: 300, rarity: 'legendary' },
    { id: 'marathon_trader', name: '交易馬拉松', desc: '連續30天記錄交易', icon: '🏃‍♂️', xp: 100, rarity: 'rare' },
    { id: 'perfect_month', name: '完美月份', desc: '一個月內無虧損交易', icon: '✨', xp: 500, rarity: 'legendary' },
    { id: 'emotion_control', name: '情緒控制專家', desc: '標記為冷靜的交易達到50筆', icon: '🧘‍♂️', xp: 150, rarity: 'epic' }
  ],
  skills: [
    { 
      id: 'technical_analysis', 
      name: '技術分析', 
      icon: '📈', 
      levels: [
        { level: 1, name: '基礎圖表', xpCost: 0, benefit: '解鎖基本技術指標' },
        { level: 2, name: '型態識別', xpCost: 100, benefit: '提升型態分析能力' },
        { level: 3, name: '進階分析', xpCost: 200, benefit: '複雜指標組合運用' }
      ]
    },
    {
      id: 'risk_management',
      name: '風險管理',
      icon: '🛡️',
      levels: [
        { level: 1, name: '基礎風控', xpCost: 0, benefit: '學會設置停損' },
        { level: 2, name: '資金管理', xpCost: 150, benefit: '最適倉位計算' },
        { level: 3, name: '風險專家', xpCost: 300, benefit: '動態風險調整' }
      ]
    },
    {
      id: 'psychology',
      name: '交易心理',
      icon: '🧠',
      levels: [
        { level: 1, name: '情緒認知', xpCost: 0, benefit: '識別交易情緒' },
        { level: 2, name: '心理控制', xpCost: 120, benefit: '提升心理韌性' },
        { level: 3, name: '禪定交易', xpCost: 250, benefit: '達到心流狀態' }
      ]
    }
  ]
};

// 用戶遊戲化數據結構 - 增強版
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
  // 新增：個人交易品牌
  personalBrand: {
    customTitle: '',
    selectedAvatar: '🌱',
    tradingPhilosophy: '',
    marketContribution: 0,
    helpedNewbies: 0,
    sharedStrategies: 0
  },
  // 新增：個人記錄
  personalRecords: {
    longest_win_streak: 0,
    biggest_single_profit: 0,
    best_monthly_return: 0,
    perfect_risk_days: 0,
    trading_consistency: 0,
    emotional_control_score: 50
  },
  // 新增：解鎖的功能
  unlockedFeatures: ['basic_trading'],
  // 新增：里程碑進度
  milestones: {}
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

// 預設字段配置 - 調整版本，支援交易日和非交易日，加入圖片中的技術型態
const defaultFields = [
  // 通用字段
  { key: 'type', label: '記錄類型', type: 'select', options: ['trading', 'non-trading'], visible: true, required: true, category: 'common' },
  { key: 'date', label: '日期', type: 'date', visible: true, required: true, category: 'common' },
  { key: 'dailyReflection', label: '當日心得', type: 'textarea', visible: true, category: 'common' },
  
  // 交易日專用字段
  { key: 'title', label: '交易標題', type: 'text', visible: true, required: true, category: 'trading' },
  { key: 'pair', label: '交易對象', type: 'trading-pair-select', visible: true, category: 'trading' },
  { key: 'direction', label: '交易方向', type: 'select', options: ['做多 (Long)', '做空 (Short)'], visible: true, category: 'trading' },
  { key: 'entryDate', label: '進場日期時間', type: 'datetime-local', visible: true, category: 'trading' },
  { key: 'exitDate', label: '出場日期時間', type: 'datetime-local', visible: true, category: 'trading' },
  { key: 'timeframe', label: '時間框架', type: 'select', options: ['M1', 'M5', 'M15', 'M30', 'H1', 'H4', 'D1', 'W1'], visible: true, category: 'trading' },
  { key: 'entryPrice', label: '進場價格', type: 'number', visible: true, category: 'trading' },
  { key: 'exitPrice', label: '出場價格', type: 'number', visible: true, category: 'trading' },
  { key: 'lotSize', label: '交易手數', type: 'number', visible: true, category: 'trading' },
  { key: 'stopLoss', label: '停損價格', type: 'number', visible: true, category: 'trading' },
  { key: 'takeProfit', label: '停利價格', type: 'number', visible: true, category: 'trading' },
  { key: 'profitLoss', label: '損益金額', type: 'number', visible: true, category: 'trading' },
  { key: 'profitLossPct', label: '損益百分比 (%)', type: 'number', visible: true, category: 'trading' },
  { key: 'rMultiple', label: 'R 倍數', type: 'number', visible: true, category: 'trading' },
  { key: 'strategy', label: '策略名稱', type: 'text', visible: true, category: 'trading' },
  
  // Rule of Three 和技術型態 - 根據圖片內容
  { key: 'ruleOfThree', label: 'Rule of Three', type: 'select', options: ['Impulse Wave', 'Corrective Wave', 'Structural Wave'], visible: true, category: 'trading' },
  { key: 'technicalPattern', label: '技術型態', type: 'multiselect', options: [
    // 旗型
    'Bull Flag', 'Bear Flag', 'Flat Flag',
    // 三角形
    'Symmetrical Triangle', 'Expanding Triangle', 'Ascending Triangle', 'Descending Triangle',
    // 通道
    'Ascending Channel', 'Descending Channel', 'Parallel Channel',
    // 楔形
    'Rising Wedge', 'Falling Wedge',
    // 經典型態
    'Head & Shoulders', 'Inverse Head & Shoulders', 'Double Top', 'Double Bottom'
  ], visible: true, category: 'trading' },
  
  { key: 'entryReason', label: '進場依據', type: 'multiselect', options: ['技術分析', '基本面', '新聞事件', '突破', '反彈', '趨勢跟隨', '逆勢交易', '型態交易'], visible: true, category: 'trading' },
  { key: 'strategyCompliant', label: '符合策略清單', type: 'select', options: ['是 ✅', '否 ❌'], visible: true, category: 'trading' },
  { key: 'riskControl', label: '嚴守風控 (0.5%/1%)', type: 'select', options: ['是', '否'], visible: true, category: 'trading' },
  { key: 'overTrading', label: '是否過度交易', type: 'select', options: ['否', '是'], visible: true, category: 'trading' },
  { key: 'emotions', label: '情緒狀態', type: 'multiselect', options: ['冷靜', '貪婪', '恐懼', '焦躁'], visible: true, category: 'trading' },
  { key: 'mentalScore', label: '心態打分 (1-5)', type: 'select', options: ['1', '2', '3', '4', '5'], visible: true, category: 'trading' },
  
  // 增強的錯誤分析標籤
  { key: 'customTags', label: '自訂標籤', type: 'multiselect', options: [
    '過早出場', '不符策略', '情緒化交易', '完美執行', '資金管理佳', 
    '追單', '過早停損', '拖延進場', '部位過大', '無視止損',
    '逆勢加倉', '恐慌出場', '貪婪持倉', '計劃外交易', '技術分析錯誤'
  ], visible: true, category: 'trading' },
  
  { key: 'screenshot', label: '交易截圖', type: 'image', visible: true, category: 'trading' },
  { key: 'closed', label: '交易已結束', type: 'checkbox', visible: true, category: 'trading' },
  { key: 'managedByPlan', label: '按計劃管理', type: 'select', options: ['是', '否'], visible: true, category: 'trading' },
  
  // 非交易日專用字段
  { key: 'nonTradingReason', label: '未交易原因', type: 'select', options: ['市場不符合策略', '主動休息', '技術問題', '個人事務', '市場假期'], visible: true, category: 'non-trading' },
  { key: 'marketAnalysis', label: '市場觀察', type: 'textarea', visible: true, category: 'non-trading' },
  { key: 'learningActivity', label: '學習活動', type: 'multiselect', options: ['閱讀交易書籍', '觀看教學影片', '分析歷史數據', '練習策略', '市場研究'], visible: true, category: 'non-trading' },
  { key: 'strategyImprovement', label: '策略改進想法', type: 'textarea', visible: true, category: 'non-trading' }
];

// 組件樣式
const cardStyle = {
  backgroundColor: colors.bg1,
  border: `1px solid rgba(0, 212, 255, 0.2)`,
  borderRadius: '20px',
  padding: '24px',
  backdropFilter: 'blur(20px)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
  position: 'relative',
  overflow: 'hidden'
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
  border: `2px solid rgba(0, 212, 255, 0.3)`,
  borderRadius: '12px',
  padding: '12px 16px',
  color: colors.txt0,
  fontSize: '14px',
  outline: 'none',
  transition: 'all 0.3s ease',
  width: '100%'
};

// 經驗值和等級計算函數
const calculateLevel = (xp) => {
  for (let i = gameConfig.levels.length - 1; i >= 0; i--) {
    if (xp >= gameConfig.levels[i].minXP) {
      return gameConfig.levels[i];
    }
  }
  return gameConfig.levels[0];
};

const getProgressToNextLevel = (xp) => {
  const currentLevel = calculateLevel(xp);
  const currentIndex = gameConfig.levels.findIndex(l => l.level === currentLevel.level);
  
  if (currentIndex === gameConfig.levels.length - 1) {
    return { progress: 100, nextLevel: null, needed: 0 };
  }
  
  const nextLevel = gameConfig.levels[currentIndex + 1];
  const progress = ((xp - currentLevel.minXP) / (nextLevel.minXP - currentLevel.minXP)) * 100;
  
  return {
    progress: Math.min(progress, 100),
    nextLevel,
    needed: nextLevel.minXP - xp
  };
};

// 成就檢查函數 - 基於新的徽章系統
const checkAchievements = (gameData, trades) => {
  const newAchievements = [];
  // 確保 trades 是數組
  const validTrades = Array.isArray(trades) ? trades : [];
  const closedTrades = validTrades.filter(trade => trade?.closed);
  const winningTrades = closedTrades.filter(trade => trade?.profitLoss > 0);
  
  // 檢查每個徽章
  Object.entries(BADGES).forEach(([badgeId, badge]) => {
    if (Array.isArray(gameData.achievements) && gameData.achievements.includes(badgeId)) return;
    
    let earned = false;
    
    switch (badgeId) {
      case 'first_profit':
        earned = winningTrades.length > 0;
        break;
      case 'win_streak_3':
        earned = gameData.streaks.best_win >= 3;
        break;
      case 'win_streak_5':
        earned = gameData.streaks.best_win >= 5;
        break;
      case 'win_streak_10':
        earned = gameData.streaks.best_win >= 10;
        break;
      case 'risk_master':
        const stopLossRate = closedTrades.length > 0 ? 
          closedTrades.filter(t => t?.stopLoss).length / closedTrades.length : 0;
        earned = stopLossRate >= 0.95 && closedTrades.length >= 20;
        break;
      case 'discipline_trader':
        const planRate = closedTrades.length > 0 ? 
          closedTrades.filter(t => t?.managedByPlan === '是').length / closedTrades.length : 0;
        earned = planRate >= 0.9 && closedTrades.length >= 20;
        break;
      case 'monthly_profit':
        // 檢查當月回報率
        const thisMonth = new Date();
        const monthTrades = closedTrades.filter(trade => {
          if (!trade?.exitDate) return false;
          const tradeDate = new Date(trade.exitDate);
          return tradeDate.getMonth() === thisMonth.getMonth() && 
                 tradeDate.getFullYear() === thisMonth.getFullYear();
        });
        const monthlyReturn = monthTrades.reduce((sum, trade) => sum + (trade?.profitLossPct || 0), 0);
        earned = monthlyReturn > 10;
        break;
      case 'big_winner':
        earned = closedTrades.some(trade => (trade?.profitLossPct || 0) > 5);
        break;
      case 'analyst':
        // 簡化處理 - 基於交易記錄中的分析數量
        earned = closedTrades.filter(t => t?.analysis && t.analysis.length > 10).length >= 50;
        break;
      case 'strategist':
        // 檢查使用的不同策略數量
        const strategies = new Set(closedTrades.map(t => t?.strategy).filter(Boolean));
        earned = strategies.size >= 5;
        break;
      case 'trader_100':
        earned = closedTrades.length >= 100;
        break;
      case 'profit_10k':
        const totalProfit = closedTrades.reduce((sum, trade) => sum + (trade.profitLoss || 0), 0);
        earned = totalProfit >= 10000;
        break;
    }
    
    if (earned) {
      newAchievements.push({
        id: badgeId,
        name: badge.name,
        icon: badge.icon,
        description: badge.description,
        xp: badge.xp
      });
    }
  });
  
  return newAchievements;
};

// 選項管理組件
const OptionManager = ({ fields, onFieldsUpdate }) => {
  const [editingField, setEditingField] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [newOption, setNewOption] = useState('');

  // 可自訂選項的字段
  const customizableFields = Array.isArray(fields) ? fields.filter(field => 
    field && field.options && (field.type === 'select' || field.type === 'multiselect')
  ) : [];

  const handleEditOption = (fieldKey, optionIndex) => {
    const field = fields.find(f => f.key === fieldKey);
    setEditingField(fieldKey);
    setEditingIndex(optionIndex);
    setEditValue(field.options[optionIndex]);
  };

  const handleSaveEdit = () => {
    const newFields = fields.map(field => {
      if (field.key === editingField) {
        const newOptions = [...field.options];
        newOptions[editingIndex] = editValue;
        return { ...field, options: newOptions };
      }
      return field;
    });
    
    onFieldsUpdate(newFields);
    localStorage.setItem('tradingJournalFields', JSON.stringify(newFields));
    setEditingField(null);
    setEditingIndex(null);
    setEditValue('');
  };

  const handleDeleteOption = (fieldKey, optionIndex) => {
    console.log('=== 開始刪除選項 ===');
    console.log('字段Key:', fieldKey);
    console.log('選項索引:', optionIndex);
    
    if (window.confirm('確定要刪除這個選項嗎？')) {
      try {
        const newFields = fields.map(field => {
          if (field.key === fieldKey) {
            const newOptions = Array.isArray(field.options) ? field.options.filter((_, index) => index !== optionIndex) : [];
            console.log('新選項列表:', newOptions);
            return { ...field, options: newOptions };
          }
          return field;
        });
        
        console.log('更新字段配置...');
        onFieldsUpdate(newFields);
        localStorage.setItem('tradingJournalFields', JSON.stringify(newFields));
        console.log('=== 選項刪除成功 ===');
        
      } catch (error) {
        console.error('刪除選項失敗:', error);
        alert('刪除失敗，請重試');
      }
    }
  };

  const handleAddOption = (fieldKey) => {
    if (!newOption.trim()) return;
    
    const newFields = fields.map(field => {
      if (field.key === fieldKey) {
        return { ...field, options: [...field.options, newOption.trim()] };
      }
      return field;
    });
    
    onFieldsUpdate(newFields);
    localStorage.setItem('tradingJournalFields', JSON.stringify(newFields));
    setNewOption('');
  };

  return (
    <div style={{...cardStyle, marginBottom: '32px'}}>
      <h3 style={{color: colors.txt0, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px'}}>
        <Settings size={20} />
        選項管理
        <span style={{
          backgroundColor: colors.brand,
          color: colors.bg0,
          padding: '4px 8px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: '700'
        }}>
          {customizableFields.length} 個可自訂字段
        </span>
      </h3>
      
      {customizableFields.length === 0 ? (
        <div style={{
          textAlign: 'center',
          color: colors.txt2,
          padding: '40px',
          backgroundColor: colors.bg0,
          borderRadius: '12px',
          border: `2px dashed ${colors.txt2}`
        }}>
          沒有可自訂的選項字段
        </div>
      ) : (
        customizableFields.map(field => (
          <div key={field.key} style={{
            backgroundColor: colors.bg0,
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '20px',
            border: `2px solid ${colors.brand}30`
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px'
            }}>
              <div>
                <h4 style={{
                  color: colors.txt0,
                  margin: '0 0 4px 0',
                  fontSize: '18px',
                  fontWeight: '700'
                }}>
                  {field.label}
                </h4>
                <div style={{
                  color: colors.txt2,
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{
                    backgroundColor: field.type === 'multiselect' ? colors.purple : colors.blue,
                    color: colors.txt0,
                    padding: '2px 8px',
                    borderRadius: '8px',
                    fontSize: '11px',
                    fontWeight: '600'
                  }}>
                    {field.type === 'multiselect' ? '多選' : '單選'}
                  </span>
                  {field.options.length} 個選項
                </div>
              </div>
              
              {/* 新增選項區域 */}
              <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                <input
                  type="text"
                  placeholder="新增選項..."
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAddOption(field.key);
                    }
                  }}
                  style={{
                    ...inputStyle,
                    width: '150px',
                    padding: '8px 12px',
                    fontSize: '13px'
                  }}
                />
                <button
                  onClick={() => handleAddOption(field.key)}
                  disabled={!newOption.trim()}
                  style={{
                    ...buttonStyle,
                    padding: '8px 12px',
                    fontSize: '12px',
                    opacity: newOption.trim() ? 1 : 0.5,
                    cursor: newOption.trim() ? 'pointer' : 'not-allowed'
                  }}
                >
                  <PlusCircle size={14} />
                </button>
              </div>
            </div>
            
            {/* 選項列表 */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '12px',
              maxHeight: '300px',
              overflowY: 'auto'
            }}>
              {field.options.map((option, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 12px',
                  backgroundColor: colors.bg2,
                  borderRadius: '8px',
                  border: `1px solid ${colors.brand}20`
                }}>
                  {editingField === field.key && editingIndex === index ? (
                    <>
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') handleSaveEdit();
                          if (e.key === 'Escape') {
                            setEditingField(null);
                            setEditingIndex(null);
                          }
                        }}
                        style={{
                          ...inputStyle,
                          flex: 1,
                          padding: '6px 8px',
                          fontSize: '13px',
                          backgroundColor: colors.bg0
                        }}
                        autoFocus
                      />
                      <button
                        onClick={handleSaveEdit}
                        style={{
                          padding: '4px',
                          backgroundColor: colors.ok,
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          color: colors.txt0
                        }}
                      >
                        ✓
                      </button>
                      <button
                        onClick={() => {
                          setEditingField(null);
                          setEditingIndex(null);
                        }}
                        style={{
                          padding: '4px',
                          backgroundColor: colors.err,
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          color: colors.txt0
                        }}
                      >
                        ✕
                      </button>
                    </>
                  ) : (
                    <>
                      <span style={{
                        flex: 1,
                        color: colors.txt0,
                        fontSize: '13px',
                        fontWeight: '500'
                      }}>
                        {option}
                      </span>
                      <button
                        onClick={() => handleEditOption(field.key, index)}
                        style={{
                          padding: '4px',
                          backgroundColor: 'transparent',
                          border: `1px solid ${colors.brand}`,
                          borderRadius: '4px',
                          cursor: 'pointer',
                          color: colors.brand,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Edit3 size={12} />
                      </button>
                      <button
                        onClick={() => handleDeleteOption(field.key, index)}
                        style={{
                          padding: '4px',
                          backgroundColor: 'transparent',
                          border: `1px solid ${colors.err}`,
                          borderRadius: '4px',
                          cursor: 'pointer',
                          color: colors.err,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Trash2 size={12} />
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

// 自訂字段創建組件
const CustomFieldCreator = ({ fields, onFieldsUpdate }) => {
  const [fieldData, setFieldData] = useState({
    key: '',
    label: '',
    type: 'text',
    options: [],
    visible: true,
    required: false
  });
  const [newOption, setNewOption] = useState('');
  const [showCreator, setShowCreator] = useState(false);

  const fieldTypes = [
    { value: 'text', label: '文本', needsOptions: false },
    { value: 'number', label: '數字', needsOptions: false },
    { value: 'textarea', label: '多行文本', needsOptions: false },
    { value: 'select', label: '單選下拉', needsOptions: true },
    { value: 'multiselect', label: '多選標籤', needsOptions: true },
    { value: 'checkbox', label: '複選框', needsOptions: false },
    { value: 'date', label: '日期', needsOptions: false },
    { value: 'datetime-local', label: '日期時間', needsOptions: false }
  ];

  const selectedFieldType = fieldTypes.find(type => type.value === fieldData.type);

  const handleAddOption = () => {
    if (!newOption.trim()) return;
    setFieldData({
      ...fieldData,
      options: [...fieldData.options, newOption.trim()]
    });
    setNewOption('');
  };

  const handleRemoveOption = (index) => {
    setFieldData({
      ...fieldData,
      options: Array.isArray(fieldData.options) ? fieldData.options.filter((_, i) => i !== index) : []
    });
  };

  const handleCreateField = () => {
    if (!fieldData.key.trim() || !fieldData.label.trim()) {
      alert('請填入字段標識符和標籤');
      return;
    }

    // 檢查字段標識符是否已存在
    if (fields.some(field => field.key === fieldData.key)) {
      alert('字段標識符已存在，請使用其他名稱');
      return;
    }

    // 如果是選擇類型，檢查是否有選項
    if (selectedFieldType.needsOptions && fieldData.options.length === 0) {
      alert('選擇類型字段需要至少一個選項');
      return;
    }

    const newField = {
      ...fieldData,
      key: fieldData.key.toLowerCase().replace(/[^a-z0-9]/g, '_')
    };

    const newFields = [...fields, newField];
    onFieldsUpdate(newFields);
    localStorage.setItem('tradingJournalFields', JSON.stringify(newFields));

    // 重置表單
    setFieldData({
      key: '',
      label: '',
      type: 'text',
      options: [],
      visible: true,
      required: false
    });
    setNewOption('');
    setShowCreator(false);
  };

  return (
    <div style={{...cardStyle, marginBottom: '32px'}}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <h3 style={{color: colors.txt0, margin: 0, display: 'flex', alignItems: 'center', gap: '8px'}}>
          <PlusCircle size={20} />
          自訂字段創建
        </h3>
        <button
          onClick={() => setShowCreator(!showCreator)}
          style={{
            ...buttonStyle,
            backgroundColor: showCreator ? colors.warn : colors.brand,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            fontSize: '14px'
          }}
        >
          {showCreator ? '取消創建' : '創建新字段'}
        </button>
      </div>

      {showCreator && (
        <div style={{
          backgroundColor: colors.bg0,
          borderRadius: '16px',
          padding: '24px',
          border: `2px solid ${colors.brand}30`
        }}>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px'}}>
            {/* 基本設置 */}
            <div>
              <label style={{color: colors.txt0, display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600'}}>
                字段標識符 <span style={{color: colors.err}}>*</span>
              </label>
              <input
                type="text"
                value={fieldData.key}
                onChange={(e) => setFieldData({...fieldData, key: e.target.value})}
                placeholder="例如: my_custom_field"
                style={inputStyle}
              />
              <div style={{color: colors.txt2, fontSize: '12px', marginTop: '4px'}}>
                用於內部識別，只能包含字母、數字和底線
              </div>
            </div>

            <div>
              <label style={{color: colors.txt0, display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600'}}>
                字段標籤 <span style={{color: colors.err}}>*</span>
              </label>
              <input
                type="text"
                value={fieldData.label}
                onChange={(e) => setFieldData({...fieldData, label: e.target.value})}
                placeholder="例如: 我的自訂字段"
                style={inputStyle}
              />
              <div style={{color: colors.txt2, fontSize: '12px', marginTop: '4px'}}>
                顯示在表單中的字段名稱
              </div>
            </div>

            <div>
              <label style={{color: colors.txt0, display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600'}}>
                字段類型
              </label>
              <select
                value={fieldData.type}
                onChange={(e) => setFieldData({...fieldData, type: e.target.value, options: []})}
                style={inputStyle}
              >
                {fieldTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            {/* 設置選項 */}
            <div>
              <label style={{color: colors.txt0, display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600'}}>
                設置
              </label>
              <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                <label style={{display: 'flex', alignItems: 'center', gap: '8px', color: colors.txt0, cursor: 'pointer'}}>
                  <input
                    type="checkbox"
                    checked={fieldData.visible}
                    onChange={(e) => setFieldData({...fieldData, visible: e.target.checked})}
                    style={{accentColor: colors.brand}}
                  />
                  <span style={{fontSize: '14px'}}>在表單中顯示</span>
                </label>
                <label style={{display: 'flex', alignItems: 'center', gap: '8px', color: colors.txt0, cursor: 'pointer'}}>
                  <input
                    type="checkbox"
                    checked={fieldData.required}
                    onChange={(e) => setFieldData({...fieldData, required: e.target.checked})}
                    style={{accentColor: colors.brand}}
                  />
                  <span style={{fontSize: '14px'}}>必填字段</span>
                </label>
              </div>
            </div>
          </div>

          {/* 選項配置 */}
          {selectedFieldType && selectedFieldType.needsOptions && (
            <div style={{marginTop: '24px'}}>
              <h4 style={{color: colors.txt0, marginBottom: '16px', fontSize: '16px', fontWeight: '600'}}>
                配置選項 <span style={{color: colors.err}}>*</span>
              </h4>
              
              <div style={{display: 'flex', gap: '12px', marginBottom: '16px', alignItems: 'center'}}>
                <input
                  type="text"
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') handleAddOption();
                  }}
                  placeholder="輸入新選項..."
                  style={{...inputStyle, flex: 1}}
                />
                <button
                  onClick={handleAddOption}
                  disabled={!newOption.trim()}
                  style={{
                    ...buttonStyle,
                    padding: '12px 16px',
                    opacity: newOption.trim() ? 1 : 0.5,
                    cursor: newOption.trim() ? 'pointer' : 'not-allowed'
                  }}
                >
                  新增選項
                </button>
              </div>

              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                minHeight: '40px',
                padding: '12px',
                backgroundColor: colors.bg2,
                borderRadius: '8px',
                border: `2px dashed ${fieldData.options.length > 0 ? colors.ok : colors.txt2}`
              }}>
                {fieldData.options.length === 0 ? (
                  <span style={{color: colors.txt2, fontSize: '14px'}}>
                    還沒有選項，請新增至少一個選項
                  </span>
                ) : (
                  fieldData.options.map((option, index) => (
                    <span key={index} style={{
                      backgroundColor: colors.brand,
                      color: colors.bg0,
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '13px',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      {option}
                      <button
                        onClick={() => handleRemoveOption(index)}
                        style={{
                          backgroundColor: 'transparent',
                          border: 'none',
                          color: colors.bg0,
                          cursor: 'pointer',
                          padding: '2px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))
                )}
              </div>
            </div>
          )}

          {/* 創建按鈕 */}
          <div style={{display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px'}}>
            <button
              onClick={() => setShowCreator(false)}
              style={{
                ...buttonStyle,
                backgroundColor: colors.bg2,
                color: colors.txt0,
                boxShadow: 'none'
              }}
            >
              取消
            </button>
            <button
              onClick={handleCreateField}
              style={{
                ...buttonStyle,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <PlusCircle size={16} />
              創建字段
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// 字段顯示控制組件
const FieldVisibilityManager = ({ fields, onFieldsUpdate }) => {
  const handleToggleVisibility = (fieldKey) => {
    const newFields = fields.map(field => {
      if (field.key === fieldKey) {
        return { ...field, visible: !field.visible };
      }
      return field;
    });
    
    onFieldsUpdate(newFields);
    localStorage.setItem('tradingJournalFields', JSON.stringify(newFields));
  };

  const handleDeleteCustomField = (fieldKey) => {
    // 只允許刪除自訂字段（不在預設字段列表中的）
    const isCustomField = !defaultFields.some(field => field.key === fieldKey);
    
    if (!isCustomField) {
      alert('無法刪除系統預設字段');
      return;
    }

    if (window.confirm('確定要刪除這個自訂字段嗎？相關的交易數據也會被移除。')) {
      const newFields = Array.isArray(fields) ? fields.filter(field => field && field.key !== fieldKey) : [];
      onFieldsUpdate(newFields);
      localStorage.setItem('tradingJournalFields', JSON.stringify(newFields));
    }
  };

  // 分類字段
  const systemFields = Array.isArray(fields) ? fields.filter(field => 
    field && Array.isArray(defaultFields) && defaultFields.some(defaultField => defaultField && defaultField.key === field.key)
  ) : [];
  const customFields = Array.isArray(fields) ? fields.filter(field => 
    field && Array.isArray(defaultFields) && !defaultFields.some(defaultField => defaultField && defaultField.key === field.key)
  ) : [];

  return (
    <div style={cardStyle}>
      <h3 style={{color: colors.txt0, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px'}}>
        <Eye size={20} />
        字段顯示控制
        <span style={{
          backgroundColor: colors.ok,
          color: colors.bg0,
          padding: '4px 8px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: '700'
        }}>
          {Array.isArray(fields) ? fields.filter(f => f && f.visible).length : 0}/{Array.isArray(fields) ? fields.length : 0} 顯示中
        </span>
      </h3>

      {/* 系統字段 */}
      {systemFields.length > 0 && (
        <div style={{marginBottom: '32px'}}>
          <h4 style={{
            color: colors.txt0,
            marginBottom: '16px',
            fontSize: '16px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Shield size={16} />
            系統字段
            <span style={{
              backgroundColor: colors.blue,
              color: colors.txt0,
              padding: '2px 8px',
              borderRadius: '8px',
              fontSize: '11px'
            }}>
              {systemFields.length}
            </span>
          </h4>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '12px'
          }}>
            {systemFields.map(field => (
              <div key={field.key} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                backgroundColor: field.visible ? colors.bg0 : colors.bg2,
                borderRadius: '12px',
                border: `2px solid ${field.visible ? colors.ok : colors.txt2}30`,
                transition: 'all 0.3s ease'
              }}>
                <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                  <button
                    onClick={() => handleToggleVisibility(field.key)}
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: field.visible ? colors.ok : colors.txt2,
                      cursor: 'pointer',
                      padding: '4px',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {field.visible ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                  <div>
                    <div style={{
                      color: field.visible ? colors.txt0 : colors.txt2,
                      fontSize: '14px',
                      fontWeight: '600'
                    }}>
                      {field.label}
                    </div>
                    <div style={{
                      color: colors.txt2,
                      fontSize: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <span style={{
                        backgroundColor: field.type === 'multiselect' ? colors.purple : 
                                       field.type === 'select' ? colors.blue :
                                       field.type === 'textarea' ? colors.orange : colors.cyan,
                        color: colors.txt0,
                        padding: '2px 6px',
                        borderRadius: '6px',
                        fontSize: '10px',
                        fontWeight: '600'
                      }}>
                        {field.type}
                      </span>
                      {field.required && (
                        <span style={{
                          backgroundColor: colors.err,
                          color: colors.txt0,
                          padding: '2px 6px',
                          borderRadius: '6px',
                          fontSize: '10px',
                          fontWeight: '600'
                        }}>
                          必填
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div style={{
                  color: field.visible ? colors.ok : colors.txt2,
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  {field.visible ? '顯示中' : '已隱藏'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 自訂字段 */}
      {customFields.length > 0 && (
        <div>
          <h4 style={{
            color: colors.txt0,
            marginBottom: '16px',
            fontSize: '16px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Star size={16} />
            自訂字段
            <span style={{
              backgroundColor: colors.legendary,
              color: colors.txt0,
              padding: '2px 8px',
              borderRadius: '8px',
              fontSize: '11px'
            }}>
              {customFields.length}
            </span>
          </h4>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '12px'
          }}>
            {customFields.map(field => (
              <div key={field.key} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                backgroundColor: field.visible ? colors.bg0 : colors.bg2,
                borderRadius: '12px',
                border: `2px solid ${field.visible ? colors.legendary : colors.txt2}30`,
                transition: 'all 0.3s ease'
              }}>
                <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                  <button
                    onClick={() => handleToggleVisibility(field.key)}
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: field.visible ? colors.ok : colors.txt2,
                      cursor: 'pointer',
                      padding: '4px',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {field.visible ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                  <div>
                    <div style={{
                      color: field.visible ? colors.txt0 : colors.txt2,
                      fontSize: '14px',
                      fontWeight: '600'
                    }}>
                      {field.label}
                    </div>
                    <div style={{
                      color: colors.txt2,
                      fontSize: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <span style={{
                        backgroundColor: colors.legendary,
                        color: colors.txt0,
                        padding: '2px 6px',
                        borderRadius: '6px',
                        fontSize: '10px',
                        fontWeight: '600'
                      }}>
                        自訂
                      </span>
                      <span style={{
                        backgroundColor: field.type === 'multiselect' ? colors.purple : 
                                       field.type === 'select' ? colors.blue :
                                       field.type === 'textarea' ? colors.orange : colors.cyan,
                        color: colors.txt0,
                        padding: '2px 6px',
                        borderRadius: '6px',
                        fontSize: '10px',
                        fontWeight: '600'
                      }}>
                        {field.type}
                      </span>
                      {field.required && (
                        <span style={{
                          backgroundColor: colors.err,
                          color: colors.txt0,
                          padding: '2px 6px',
                          borderRadius: '6px',
                          fontSize: '10px',
                          fontWeight: '600'
                        }}>
                          必填
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <div style={{
                    color: field.visible ? colors.ok : colors.txt2,
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    {field.visible ? '顯示中' : '已隱藏'}
                  </div>
                  <button
                    onClick={() => handleDeleteCustomField(field.key)}
                    style={{
                      backgroundColor: 'transparent',
                      border: `1px solid ${colors.err}`,
                      borderRadius: '6px',
                      color: colors.err,
                      cursor: 'pointer',
                      padding: '4px 6px',
                      fontSize: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Trash2 size={12} />
                    刪除
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {customFields.length === 0 && (
        <div style={{
          textAlign: 'center',
          color: colors.txt2,
          padding: '40px',
          backgroundColor: colors.bg0,
          borderRadius: '12px',
          border: `2px dashed ${colors.txt2}`
        }}>
          還沒有自訂字段，前往「自訂字段創建」新增專屬字段
        </div>
      )}
    </div>
  );
};

// 玩家資料卡組件
const PlayerProfile = ({ gameData, onUpdate }) => {
  const currentLevel = calculateLevel(gameData.xp);
  const levelProgress = getProgressToNextLevel(gameData.xp);
  
  return (
    <div style={{
      ...glassCardStyle,
      background: `linear-gradient(135deg, ${currentLevel.color}20, ${colors.bg1})`,
      marginBottom: '24px'
    }}>
      <div style={{display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px'}}>
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${currentLevel.color}, ${colors.brand})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '32px',
          boxShadow: `0 0 30px ${currentLevel.color}50`
        }}>
          {currentLevel.icon}
        </div>
        
        <div style={{ flex: 1 }}>
          <div style={{
            color: currentLevel.color,
            fontSize: '14px',
            fontWeight: '600',
            marginBottom: '4px'
          }}>
            等級 {currentLevel.level}
          </div>
          <h2 style={{
            color: colors.txt0,
            margin: '0 0 8px 0',
            fontSize: '24px',
            fontWeight: '700'
          }}>
            {currentLevel.title}
          </h2>
          
          <div style={{ marginBottom: '8px' }}>
            <div style={{
              backgroundColor: colors.bg0,
              borderRadius: '12px',
              padding: '4px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                background: `linear-gradient(90deg, ${currentLevel.color}, ${colors.brand})`,
                height: '8px',
                borderRadius: '8px',
                width: `${levelProgress.progress}%`,
                transition: 'width 0.8s ease',
                boxShadow: `0 0 10px ${currentLevel.color}80`
              }} />
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '12px',
              color: colors.txt2,
              marginTop: '4px'
            }}>
              <span>XP: {gameData.xp}</span>
              {levelProgress.nextLevel && (
                <span>下一級還需 {levelProgress.needed} XP</span>
              )}
            </div>
          </div>
        </div>

        <div style={{
          display: 'flex',
          gap: '16px',
          alignItems: 'center'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: colors.gold, fontSize: '24px', fontWeight: '700' }}>
              {gameData.achievements.length}
            </div>
            <div style={{ color: colors.txt2, fontSize: '12px' }}>成就</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: colors.brand, fontSize: '24px', fontWeight: '700' }}>
              {gameData.streaks.best_win}
            </div>
            <div style={{ color: colors.txt2, fontSize: '12px' }}>最佳連勝</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 成就系統組件
const AchievementBadge = ({ achievement, earned = false, progress = 0 }) => {
  const rarityColors = {
    common: colors.common,
    rare: colors.rare,
    epic: colors.epic,
    legendary: colors.legendary
  };

  return (
    <div style={{
      ...cardStyle,
      padding: '16px',
      opacity: earned ? 1 : 0.6,
      transform: earned ? 'scale(1.05)' : 'scale(1)',
      transition: 'all 0.3s ease',
      border: `2px solid ${rarityColors[achievement.rarity]}`,
      background: earned 
        ? `linear-gradient(135deg, ${rarityColors[achievement.rarity]}20, ${colors.bg1})`
        : colors.bg2
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '8px'
      }}>
        <div style={{
          fontSize: '24px',
          filter: earned ? 'none' : 'grayscale(100%)'
        }}>
          {achievement.icon}
        </div>
        <div>
          <div style={{
            color: earned ? rarityColors[achievement.rarity] : colors.txt2,
            fontSize: '14px',
            fontWeight: '700'
          }}>
            {achievement.name}
          </div>
          <div style={{
            color: colors.txt2,
            fontSize: '12px'
          }}>
            +{achievement.xp} XP
          </div>
        </div>
      </div>
      <div style={{
        color: colors.txt1,
        fontSize: '12px',
        lineHeight: '1.4'
      }}>
        {achievement.desc}
      </div>
      
      {!earned && progress > 0 && (
        <div style={{
          marginTop: '8px',
          backgroundColor: colors.bg0,
          borderRadius: '8px',
          padding: '2px',
          position: 'relative'
        }}>
          <div style={{
            background: `linear-gradient(90deg, ${rarityColors[achievement.rarity]}, ${colors.brand})`,
            height: '4px',
            borderRadius: '4px',
            width: `${progress}%`,
            transition: 'width 0.3s ease'
          }} />
        </div>
      )}
    </div>
  );
};

// 技能樹組件 - 修正版本，移除對不存在gameConfig的依賴
const SkillTree = ({ gameData, onUpgrade }) => {
  // 直接在組件內定義技能配置
  const skillBranches = [
    {
      id: 'risk',
      name: '🛡️ 風控技能',
      icon: '🛡️',
      description: '資金管理與風險控制能力',
      levels: [
        { name: '基礎風控', description: '學會設定停損', cost: 1, benefits: ['停損設定提醒', '風險計算器'], xpCost: 100 },
        { name: '資金管理', description: '掌握倉位控制', cost: 2, benefits: ['倉位計算器', '資金分配建議'], xpCost: 200 },
        { name: '風險專家', description: '進階風控策略', cost: 3, benefits: ['多策略組合', '動態風控'], xpCost: 300 }
      ]
    },
    {
      id: 'technical',
      name: '📊 技術分析',
      icon: '📊',
      description: '圖表分析與型態識別能力',
      levels: [
        { name: '基礎圖表', description: '認識K線與趨勢', cost: 1, benefits: ['型態識別提示', '趨勢分析'], xpCost: 100 },
        { name: '型態識別', description: '掌握技術型態', cost: 2, benefits: ['進階型態庫', '自動識別'], xpCost: 200 },
        { name: '進階分析', description: '綜合技術指標', cost: 3, benefits: ['多指標組合', '量價分析'], xpCost: 300 }
      ]
    },
    {
      id: 'psychology',
      name: '🧠 心理控制',
      icon: '🧠',
      description: '情緒管理與交易心理',
      levels: [
        { name: '情緒認知', description: '了解交易情緒', cost: 1, benefits: ['情緒追蹤', '心態提醒'], xpCost: 100 },
        { name: '心理控制', description: '管理交易情緒', cost: 2, benefits: ['冥想提醒', '情緒分析'], xpCost: 200 },
        { name: '禪定交易', description: '達到心流狀態', cost: 3, benefits: ['完美心態', '無情緒交易'], xpCost: 300 }
      ]
    }
  ];
  
  const currentXP = gameData?.xp || 0;
  
  const handleSkillUpgrade = (skillId, levelIndex) => {
    const skill = skillBranches.find(s => s.id === skillId);
    const level = skill.levels[levelIndex];
    const currentSkillLevel = gameData.skills?.[skillId] || 1;
    
    // 檢查是否可以升級
    if (levelIndex !== (currentSkillLevel - 1) || currentXP < level.xpCost) {
      return;
    }
    
    // 升級技能
    const updatedGameData = {
      ...gameData,
      skills: {
        ...gameData.skills,
        [skillId]: currentSkillLevel + 1
      },
      xp: currentXP - level.xpCost
    };
    
    onUpgrade?.(updatedGameData);
    
    // 顯示升級通知
    setTimeout(() => {
      alert(`🎉 技能升級成功！\n「${skill.name}」達到 ${level.name} 等級\n\n解鎖效果：\n${level.benefits.map(b => `• ${b}`).join('\n')}`);
    }, 100);
  };
  
  return (
    <div style={{
      ...cardStyle,
      background: `linear-gradient(135deg, ${colors.brand}15, ${colors.bg1})`,
      border: `2px solid ${colors.brand}30`
    }}>
      {/* 頭部信息 */}
      <div style={{marginBottom: '24px'}}>
        <h3 style={{
          color: colors.txt0,
          marginBottom: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '20px',
          fontWeight: '700'
        }}>
          <Brain size={20} />
          技能樹
          <span style={{
            backgroundColor: colors.brand,
            color: colors.bg0,
            padding: '4px 8px',
            borderRadius: '12px',
            fontSize: '11px',
            fontWeight: '700'
          }}>
            可升級
          </span>
        </h3>
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 16px',
          backgroundColor: colors.bg0,
          borderRadius: '12px',
          border: `2px solid ${colors.gold}30`
        }}>
          <div>
            <div style={{color: colors.txt0, fontSize: '14px', fontWeight: '600'}}>
              總經驗值：{currentXP} XP
            </div>
            <div style={{color: colors.txt2, fontSize: '12px'}}>
              通過完成交易記錄、遵守策略獲得XP
            </div>
          </div>
          <div style={{
            color: colors.gold,
            fontSize: '24px',
            fontWeight: '700'
          }}>
            ⚡ {currentXP}
          </div>
        </div>
      </div>
      
      {/* 技能分支 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px'
      }}>
        {skillBranches.map(branch => {
          const currentLevel = gameData.skills?.[branch.id] || 1;
          
          return (
            <div key={branch.id} style={{
              padding: '20px',
              backgroundColor: colors.bg0,
              borderRadius: '16px',
              border: `2px solid ${colors.brand}40`,
              position: 'relative'
            }}>
              {/* 分支標題 */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '16px'
              }}>
                <div style={{ fontSize: '32px' }}>{branch.icon}</div>
                <div>
                  <h4 style={{
                    color: colors.txt0,
                    margin: '0 0 4px 0',
                    fontSize: '16px',
                    fontWeight: '700'
                  }}>
                    {branch.name}
                  </h4>
                  <div style={{
                    color: colors.txt2,
                    fontSize: '12px',
                    lineHeight: '1.3'
                  }}>
                    {branch.description}
                  </div>
                  <div style={{
                    color: colors.brand,
                    fontSize: '11px',
                    fontWeight: '600',
                    marginTop: '2px'
                  }}>
                    等級 {currentLevel}/{branch.levels.length}
                  </div>
                </div>
              </div>
              
              {/* 技能等級 */}
              <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                {branch.levels.map((level, index) => {
                  const levelNumber = index + 1;
                  const isUnlocked = levelNumber <= currentLevel;
                  const canUpgrade = levelNumber === currentLevel + 1 && currentXP >= level.xpCost;
                  const isLocked = levelNumber > currentLevel + 1;
                  
                  return (
                    <div key={index} style={{
                      padding: '16px',
                      borderRadius: '12px',
                      border: `2px solid ${
                        isUnlocked ? colors.ok + '50' : 
                        canUpgrade ? colors.gold + '70' : 
                        colors.txt2 + '30'
                      }`,
                      backgroundColor: isUnlocked ? colors.ok + '10' : canUpgrade ? colors.gold + '10' : colors.bg2,
                      cursor: canUpgrade ? 'pointer' : 'default',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      opacity: isLocked ? 0.5 : 1
                    }}
                    onClick={() => canUpgrade && handleSkillUpgrade(branch.id, index)}
                    onMouseEnter={(e) => {
                      if (canUpgrade) {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = `0 4px 12px ${colors.gold}40`;
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                    >
                      {/* 等級標識 */}
                      <div style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: isUnlocked ? colors.ok : canUpgrade ? colors.gold : colors.txt2,
                        color: colors.bg0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        fontWeight: '700'
                      }}>
                        {isUnlocked ? '✓' : levelNumber}
                      </div>
                      
                      <div style={{marginBottom: '8px'}}>
                        <div style={{
                          color: isUnlocked ? colors.ok : canUpgrade ? colors.gold : colors.txt1,
                          fontSize: '14px',
                          fontWeight: '700',
                          marginBottom: '4px'
                        }}>
                          {level.name}
                        </div>
                        <div style={{
                          color: colors.txt2,
                          fontSize: '12px',
                          lineHeight: '1.3',
                          marginBottom: '8px'
                        }}>
                          {level.description}
                        </div>
                      </div>
                      
                      {/* 效果列表 */}
                      <div style={{marginBottom: '12px'}}>
                        <div style={{
                          color: colors.txt2,
                          fontSize: '11px',
                          fontWeight: '600',
                          marginBottom: '4px'
                        }}>
                          解鎖效果：
                        </div>
                        {level.benefits.map((benefit, idx) => (
                          <div key={idx} style={{
                            color: isUnlocked ? colors.ok : colors.txt2,
                            fontSize: '10px',
                            lineHeight: '1.2',
                            marginLeft: '8px',
                            opacity: isUnlocked ? 1 : 0.7
                          }}>
                            • {benefit}
                          </div>
                        ))}
                      </div>
                      
                      {/* 升級按鈕/成本 */}
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <div style={{
                          color: colors.gold,
                          fontSize: '12px',
                          fontWeight: '700'
                        }}>
                          需要：{level.xpCost} XP
                        </div>
                        
                        {canUpgrade && (
                          <div style={{
                            backgroundColor: colors.gold,
                            color: colors.bg0,
                            padding: '6px 12px',
                            borderRadius: '20px',
                            fontSize: '11px',
                            fontWeight: '700',
                            cursor: 'pointer'
                          }}>
                            升級 ⚡
                          </div>
                        )}
                        
                        {isUnlocked && (
                          <div style={{
                            color: colors.ok,
                            fontSize: '11px',
                            fontWeight: '700'
                          }}>
                            已解鎖 ✓
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* 提示信息 */}
      {currentXP < 100 && (
        <div style={{
          marginTop: '20px',
          padding: '16px',
          backgroundColor: colors.brand + '20',
          borderRadius: '12px',
          border: `2px solid ${colors.brand}30`,
          textAlign: 'center'
        }}>
          <div style={{color: colors.brand, fontSize: '14px', fontWeight: '700', marginBottom: '4px'}}>
            💡 如何獲得經驗值？
          </div>
          <div style={{color: colors.txt2, fontSize: '12px'}}>
            完成交易記錄 (+10 XP)、遵守策略 (+10 XP)、執行風控 (+15 XP)、撰寫反思 (+5 XP)
          </div>
        </div>
      )}
    </div>
  );
};

// 每日任務組件
const DailyQuests = ({ trades, gameData, onComplete }) => {
  const today = new Date().toDateString();
  
  // 計算今日任務進度
  const todayTrades = Array.isArray(trades) ? trades.filter(trade => {
    const tradeDate = new Date(trade.date || trade.entryDate).toDateString();
    return tradeDate === today;
  }) : [];
  
  const todayClosedTrades = todayTrades.filter(trade => trade.closed);
  const todayReflections = todayTrades.filter(trade => 
    trade.dailyReflection && trade.dailyReflection.length > 10
  );
  
  // 檢查任務是否已完成（防止重複完成）
  const completedToday = gameData.dailyQuestsCompleted?.includes(today) || false;
  
  const quests = [
    {
      id: 'daily_record',
      title: '記錄一筆交易',
      desc: '今天記錄至少一筆交易（交易日或非交易日）',
      reward: 20,
      progress: todayTrades.length,
      target: 1,
      icon: '📝',
      completed: todayTrades.length >= 1
    },
    {
      id: 'complete_trade',
      title: '完成一筆交易',
      desc: '今天完成至少一筆交易（設定為已結束）',
      reward: 25,
      progress: todayClosedTrades.length,
      target: 1,
      icon: '✅',
      completed: todayClosedTrades.length >= 1
    },
    {
      id: 'daily_reflection',
      title: '撰寫交易反思',
      desc: '為今天的記錄撰寫詳細心得（至少10字）',
      reward: 15,
      progress: todayReflections.length,
      target: 1,
      icon: '🤔',
      completed: todayReflections.length >= 1
    },
    {
      id: 'streak_maintain',
      title: '維持記錄連擊',
      desc: '保持連續記錄的火焰不滅',
      reward: 10,
      progress: gameData.streaks?.current_days >= 1 ? 1 : 0,
      target: 1,
      icon: '🔥',
      completed: gameData.streaks?.current_days >= 1
    }
  ];
  
  // 處理任務完成
  const handleCompleteQuest = (quest) => {
    if (quest.completed && !completedToday && onComplete) {
      onComplete(quest.reward, quest.title);
      
      // 標記今日任務已完成
      const newCompletedList = [...(gameData.dailyQuestsCompleted || []), today];
      const newGameData = {
        ...gameData,
        dailyQuestsCompleted: newCompletedList
      };
      
      // 保存任務完成狀態
      setTimeout(() => {
        localStorage.setItem('tradingJournalGameData', JSON.stringify(newGameData));
        if (window.user) {
          const userKey = window.user.email || window.user.id;
          localStorage.setItem(`tradingJournalGameData_${userKey}`, JSON.stringify(newGameData));
        }
      }, 100);
    }
  };
  
  const totalCompleted = quests.filter(q => q.completed).length;
  const allCompleted = totalCompleted === quests.length;

  return (
    <div style={cardStyle}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h3 style={{
          color: colors.txt0,
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '20px',
          fontWeight: '700'
        }}>
          <Target size={20} />
          每日任務
          {allCompleted && (
            <span style={{
              backgroundColor: colors.gold,
              color: colors.bg0,
              padding: '4px 8px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: '700'
            }}>
              全部完成！
            </span>
          )}
        </h3>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            color: colors.brand,
            fontSize: '14px',
            fontWeight: '600'
          }}>
            進度: {totalCompleted}/{quests.length}
          </div>
          <div style={{
            backgroundColor: colors.warn,
            color: colors.txt0,
            padding: '4px 8px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: '700'
          }}>
            {new Date().toLocaleDateString('zh-TW')}
          </div>
        </div>
      </div>
      
      <div style={{display: 'grid', gap: '16px'}}>
        {quests.map(quest => {
          const progressPercent = Math.min((quest.progress / quest.target) * 100, 100);
          
          return (
            <div key={quest.id} style={{
              padding: '16px',
              backgroundColor: colors.bg0,
              borderRadius: '12px',
              border: `2px solid ${quest.completed ? colors.ok : colors.brand}40`,
              opacity: quest.completed ? 0.9 : 1,
              position: 'relative',
              cursor: quest.completed && !completedToday ? 'pointer' : 'default'
            }}
            onClick={() => handleCompleteQuest(quest)}
            >
              {quest.completed && (
                <div style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  backgroundColor: colors.ok,
                  color: colors.txt0,
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: '700'
                }}>
                  ✓
                </div>
              )}
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '12px'
              }}>
                <div style={{ fontSize: '24px' }}>{quest.icon}</div>
                <div style={{ flex: 1 }}>
                  <h4 style={{
                    color: colors.txt0,
                    margin: '0 0 4px 0',
                    fontSize: '16px',
                    fontWeight: '700'
                  }}>
                    {quest.title}
                  </h4>
                  <p style={{
                    color: colors.txt2,
                    margin: 0,
                    fontSize: '14px',
                    lineHeight: '1.4'
                  }}>
                    {quest.desc}
                  </p>
                </div>
                <div style={{
                  backgroundColor: quest.completed ? colors.ok : colors.gold,
                  color: colors.bg0,
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <Star size={14} />
                  +{quest.reward}
                </div>
              </div>
              
              <div style={{
                backgroundColor: colors.bg2,
                borderRadius: '8px',
                padding: '4px',
                position: 'relative',
                overflow: 'hidden',
                marginBottom: '8px'
              }}>
                <div style={{
                  background: quest.completed 
                    ? `linear-gradient(90deg, ${colors.ok}, ${colors.lime})` 
                    : `linear-gradient(90deg, ${colors.brand}, ${colors.cyan})`,
                  height: '8px',
                  borderRadius: '6px',
                  width: `${progressPercent}%`,
                  transition: 'width 0.5s ease'
                }} />
              </div>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{
                  color: colors.txt2,
                  fontSize: '12px'
                }}>
                  進度: {quest.progress}/{quest.target}
                </span>
                {quest.completed && (
                  <span style={{
                    color: colors.ok,
                    fontSize: '12px',
                    fontWeight: '700'
                  }}>
                    {!completedToday ? '點擊領取獎勵' : '✅ 已完成'}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* 每日總結 */}
      {allCompleted && (
        <div style={{
          marginTop: '20px',
          padding: '16px',
          backgroundColor: colors.gold + '20',
          borderRadius: '12px',
          border: `2px solid ${colors.gold}50`,
          textAlign: 'center'
        }}>
          <div style={{color: colors.gold, fontSize: '16px', fontWeight: '700', marginBottom: '4px'}}>
            🎉 今日任務全部完成！
          </div>
          <div style={{color: colors.txt2, fontSize: '14px'}}>
            總獲得 {quests.reduce((sum, q) => sum + q.reward, 0)} XP • 繼續保持這種優秀的交易紀律！
          </div>
        </div>
      )}
      
      {!allCompleted && todayTrades.length === 0 && (
        <div style={{
          marginTop: '20px',
          padding: '16px',
          backgroundColor: colors.brand + '20',
          borderRadius: '12px',
          border: `2px solid ${colors.brand}30`,
          textAlign: 'center'
        }}>
          <div style={{color: colors.brand, fontSize: '14px', fontWeight: '700', marginBottom: '4px'}}>
            💡 開始今天的交易記錄
          </div>
          <div style={{color: colors.txt2, fontSize: '12px'}}>
            記錄一筆交易或非交易日來開始完成今天的任務
          </div>
        </div>
      )}
    </div>
  );
};

// 交易對選擇器組件
const TradingPairSelect = ({ value, onChange }) => {
  const [category, setCategory] = useState('外匯');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPairs = tradingPairs[category].filter(pair =>
    pair.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
        {Object.keys(tradingPairs).map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            style={{
              ...buttonStyle,
              backgroundColor: category === cat ? colors.brand : colors.bg2,
              color: category === cat ? colors.bg0 : colors.txt0,
              boxShadow: category === cat ? `0 0 20px rgba(0, 212, 255, 0.3)` : 'none',
              padding: '8px 16px',
              fontSize: '12px'
            }}
          >
            {cat}
          </button>
        ))}
      </div>
      <input
        type="text"
        placeholder="搜尋交易對..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ ...inputStyle, marginBottom: '12px' }}
      />
      <select
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        style={inputStyle}
      >
        <option value="">請選擇交易對象</option>
        {filteredPairs.map(pair => (
          <option key={pair} value={pair}>{pair}</option>
        ))}
      </select>
    </div>
  );
};

// 圖片上傳組件 - 支援上傳最多5張圖片
const ImageUpload = ({ value, onChange, label }) => {
  const [previews, setPreviews] = useState(value || []);
  const maxImages = 5;

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const remainingSlots = maxImages - previews.length;
    const filesToProcess = files.slice(0, remainingSlots);

    filesToProcess.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target.result;
        const newPreviews = [...previews, imageData];
        setPreviews(newPreviews);
        onChange(newPreviews);
      };
      reader.readAsDataURL(file);
    });

    // 重置input值以允許重複選擇同一文件
    e.target.value = '';
  };

  const removeImage = (indexToRemove) => {
    const newPreviews = previews.filter((_, index) => index !== indexToRemove);
    setPreviews(newPreviews);
    onChange(newPreviews.length > 0 ? newPreviews : null);
  };

  return (
    <div>
      <div style={{
        marginBottom: '16px',
        color: colors.txt1,
        fontSize: '14px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span>{label}</span>
        <span style={{
          backgroundColor: colors.brand,
          color: colors.bg0,
          padding: '4px 8px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: '700'
        }}>
          {previews.length}/{maxImages}
        </span>
      </div>
      
      {/* 圖片預覽區域 */}
      {previews.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '12px',
          marginBottom: '16px'
        }}>
          {previews.map((preview, index) => (
            <div key={index} style={{ 
              position: 'relative', 
              display: 'inline-block',
              borderRadius: '12px',
              overflow: 'hidden'
            }}>
              <img
                src={preview}
                alt={`交易截圖 ${index + 1}`}
                style={{
                  width: '100%',
                  height: '120px',
                  objectFit: 'cover',
                  border: `2px solid ${colors.brand}`,
                  borderRadius: '12px'
                }}
              />
              <button
                onClick={() => removeImage(index)}
                style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  backgroundColor: colors.err,
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
                }}
              >
                <X size={12} />
              </button>
              <div style={{
                position: 'absolute',
                bottom: '8px',
                left: '8px',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: '600'
              }}>
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 上傳按鈕 */}
      {previews.length < maxImages && (
        <label style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: `2px dashed ${colors.brand}`,
          borderRadius: '12px',
          padding: '40px',
          cursor: 'pointer',
          backgroundColor: `rgba(0, 212, 255, 0.05)`,
          transition: 'all 0.3s ease'
        }}>
          <Upload size={32} color={colors.brand} />
          <span style={{ color: colors.brand, marginTop: '8px', fontSize: '14px' }}>
            點擊上傳交易截圖 ({maxImages - previews.length} 個剩餘)
          </span>
          <span style={{ color: colors.txt2, marginTop: '4px', fontSize: '12px' }}>
            支援多張圖片選擇
          </span>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </label>
      )}
    </div>
  );
};

// 交易記錄卡片組件
const TradeCard = ({ trade, onEdit, onDelete, gameData }) => {
  const profitLoss = trade.profitLoss || 0;
  const resultColor = profitLoss > 0 ? colors.ok : profitLoss < 0 ? colors.err : colors.warn;
  const directionIcon = trade.direction?.includes('Long') || trade.direction?.includes('多') ? 
    <TrendingUp size={16} /> : <TrendingDown size={16} />;
  
  // 計算這筆交易獲得的XP
  const getTradeXP = (trade) => {
    let xp = 10; // 基礎XP
    if (trade.profitLoss > 0) xp += 20; // 盈利獎勵
    if (trade.managedByPlan === '是') xp += 15; // 計劃執行獎勵
    if (trade.emotions?.includes('冷靜')) xp += 10; // 情緒控制獎勵
    return xp;
  };

  const tradeXP = getTradeXP(trade);

  // 緊急刪除按鈕 - 直接刪除
  const handleEmergencyDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('緊急刪除按鈕被點擊！');
    console.log('交易ID:', trade.id);
    if (typeof onDelete === 'function') {
      onDelete(trade.id);
    } else {
      alert('onDelete 函數不存在！');
    }
  };

  // 處理編輯按鈕點擊
  const handleEditClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit(trade);
  };
  
  return (
    <div style={{
      ...cardStyle, 
      marginBottom: '20px',
      background: `linear-gradient(135deg, 
        ${profitLoss > 0 ? 'rgba(57, 217, 138, 0.1)' : 'rgba(233, 57, 70, 0.1)'} 0%, 
        ${colors.bg1} 100%
      )`,
      position: 'relative',
      zIndex: 1
    }}>
      {/* XP 獲得提示 */}
      {trade.closed && (
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          backgroundColor: colors.gold,
          color: colors.bg0,
          padding: '4px 8px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: '700',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          zIndex: 5
        }}>
          <Star size={12} />
          +{tradeXP} XP
        </div>
      )}

      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px'}}>
        <div style={{ flex: 1 }}>
          <h3 style={{color: colors.txt0, margin: '0 0 12px 0', fontSize: '20px', fontWeight: '700'}}>
            {trade.title || '未命名交易'}
          </h3>
          <div style={{display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap'}}>
            <span style={{
              backgroundColor: colors.blue,
              color: colors.txt0,
              padding: '6px 16px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              {directionIcon}
              {trade.pair} {trade.direction}
            </span>
            {trade.riskGrading && (
              <span style={{
                backgroundColor: trade.riskGrading === '低風險' ? colors.ok : 
                               trade.riskGrading === '高風險' ? colors.err : colors.warn,
                color: colors.bg0,
                padding: '6px 16px',
                borderRadius: '20px',
                fontSize: '13px',
                fontWeight: '600'
              }}>
                {trade.riskGrading}
              </span>
            )}
            {trade.closed && (
              <span style={{
                backgroundColor: colors.purple,
                color: colors.txt0,
                padding: '6px 16px',
                borderRadius: '20px',
                fontSize: '13px',
                fontWeight: '600'
              }}>
                已結束
              </span>
            )}
          </div>
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
          <div style={{ textAlign: 'right' }}>
            <div style={{color: resultColor, fontSize: '24px', fontWeight: '700'}}>
              {profitLoss > 0 ? '+' : ''}{profitLoss.toFixed(2)}
            </div>
            {trade.profitLossPct && (
              <div style={{color: resultColor, fontSize: '14px'}}>
                ({trade.profitLossPct > 0 ? '+' : ''}{trade.profitLossPct.toFixed(2)}%)
              </div>
            )}
          </div>
          <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
            <button 
              onClick={handleEditClick}
              style={{
                padding: '8px 12px',
                backgroundColor: colors.brand + '20',
                border: `1px solid ${colors.brand}`,
                borderRadius: '8px',
                cursor: 'pointer',
                color: colors.brand,
                fontSize: '12px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                whiteSpace: 'nowrap'
              }}
            >
              <Edit3 size={14} />
              編輯
            </button>
            <button 
              onClick={handleEmergencyDelete}
              style={{
                padding: '8px 12px',
                backgroundColor: colors.err + '20',
                border: `1px solid ${colors.err}`,
                borderRadius: '8px',
                cursor: 'pointer',
                color: colors.err,
                fontSize: '12px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                whiteSpace: 'nowrap'
              }}
            >
              <Trash2 size={14} />
              刪除
            </button>
          </div>
        </div>
      </div>
      
      {/* 交易截圖 - 支援多張圖片 */}
      {trade.screenshot && (
        <div style={{ marginBottom: '16px' }}>
          {Array.isArray(trade.screenshot) ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: trade.screenshot.length === 1 ? '1fr' : 
                                 trade.screenshot.length === 2 ? 'repeat(2, 1fr)' :
                                 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '12px'
            }}>
              {trade.screenshot.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`交易截圖 ${index + 1}`}
                  style={{
                    width: '100%',
                    height: trade.screenshot.length === 1 ? '200px' : '120px',
                    objectFit: 'cover',
                    borderRadius: '12px',
                    border: `2px solid rgba(0, 212, 255, 0.2)`,
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease'
                  }}
                  onClick={() => {
                    // 簡單的圖片放大效果
                    const modal = document.createElement('div');
                    modal.style.cssText = `
                      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                      background: rgba(0,0,0,0.9); display: flex; align-items: center;
                      justify-content: center; z-index: 9999; cursor: pointer;
                    `;
                    const img = document.createElement('img');
                    img.src = image;
                    img.style.cssText = 'max-width: 90%; max-height: 90%; border-radius: 12px;';
                    modal.appendChild(img);
                    document.body.appendChild(modal);
                    modal.onclick = () => document.body.removeChild(modal);
                  }}
                />
              ))}
            </div>
          ) : (
            <img
              src={trade.screenshot}
              alt="交易截圖"
              style={{
                width: '100%',
                maxHeight: '200px',
                objectFit: 'cover',
                borderRadius: '12px',
                border: `2px solid rgba(0, 212, 255, 0.2)`,
                cursor: 'pointer'
              }}
              onClick={() => {
                // 簡單的圖片放大效果
                const modal = document.createElement('div');
                modal.style.cssText = `
                  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                  background: rgba(0,0,0,0.9); display: flex; align-items: center;
                  justify-content: center; z-index: 9999; cursor: pointer;
                `;
                const img = document.createElement('img');
                img.src = trade.screenshot;
                img.style.cssText = 'max-width: 90%; max-height: 90%; border-radius: 12px;';
                modal.appendChild(img);
                document.body.appendChild(modal);
                modal.onclick = () => document.body.removeChild(modal);
              }}
            />
          )}
        </div>
      )}
      
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px'}}>
        <div>
          <span style={{color: colors.txt2, fontSize: '12px', fontWeight: '600'}}>進場時間</span>
          <div style={{color: colors.txt0, fontSize: '14px', marginTop: '4px'}}>
            {trade.entryDate ? new Date(trade.entryDate).toLocaleString('zh-TW') : 'N/A'}
          </div>
        </div>
        <div>
          <span style={{color: colors.txt2, fontSize: '12px', fontWeight: '600'}}>進場價格</span>
          <div style={{color: colors.txt0, fontSize: '14px', marginTop: '4px'}}>
            {trade.entryPrice || 'N/A'}
          </div>
        </div>
        <div>
          <span style={{color: colors.txt2, fontSize: '12px', fontWeight: '600'}}>交易手數</span>
          <div style={{color: colors.txt0, fontSize: '14px', marginTop: '4px'}}>
            {trade.lotSize || 'N/A'}
          </div>
        </div>
        <div>
          <span style={{color: colors.txt2, fontSize: '12px', fontWeight: '600'}}>按計劃管理</span>
          <div style={{color: trade.managedByPlan === '是' ? colors.ok : colors.err, fontSize: '14px', marginTop: '4px'}}>
            {trade.managedByPlan || 'N/A'}
          </div>
        </div>
      </div>
    </div>
  );
};