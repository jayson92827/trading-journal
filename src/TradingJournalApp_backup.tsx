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
  const closedTrades = trades.filter(trade => trade.closed && trade.profitLoss !== undefined && trade.profitLoss !== null);
  const winningTrades = closedTrades.filter(trade => trade.profitLoss > 0);
  const winRate = closedTrades.length > 0 ? (winningTrades.length / closedTrades.length * 100) : 0;
  const avgReturn = closedTrades.length > 0 ? closedTrades.reduce((sum, trade) => sum + trade.profitLoss, 0) / closedTrades.length : 0;
  const adherenceRate = closedTrades.length > 0 ? (closedTrades.filter(trade => trade.managedByPlan === '是').length / closedTrades.length * 100) : 0;
  const totalTrades = trades.length;
  
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
  const [gameData, setGameData] = useState(defaultGameData);
  const [showAchievementPopup, setShowAchievementPopup] = useState(null);

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
    console.log('處理交易數量:', tradesData.length);
    
    const newGameData = { ...gameData };
    
    // 更新統計
    const closedTrades = tradesData.filter(trade => trade.closed);
    const winningTrades = closedTrades.filter(trade => trade.profitLoss > 0);
    
    console.log('已結束交易:', closedTrades.length);
    console.log('盈利交易:', winningTrades.length);
    
    newGameData.stats = {
      total_trades: tradesData.length,
      winning_trades: winningTrades.length,
      plan_adherence: closedTrades.filter(trade => trade.managedByPlan === '是').length,
      risk_control_rate: closedTrades.filter(trade => trade.stopLoss && trade.managedByPlan === '是').length
    };
    
    // 計算連勝
    let currentWin = 0;
    let bestWin = 0;
    for (let i = closedTrades.length - 1; i >= 0; i--) {
      if (closedTrades[i].profitLoss > 0) {
        currentWin++;
        bestWin = Math.max(bestWin, currentWin);
      } else {
        currentWin = 0;
      }
    }
    
    newGameData.streaks = {
      ...newGameData.streaks,
      current_win: currentWin,
      best_win: Math.max(bestWin, newGameData.streaks.best_win)
    };
    
    // 檢查新成就
    const newAchievements = checkAchievements(newGameData, tradesData);
    if (newAchievements.length > 0) {
      newGameData.achievements = [...newGameData.achievements, ...newAchievements.map(a => a.id)];
      newGameData.xp += newAchievements.reduce((sum, a) => sum + a.xp, 0);
      
      // 顯示成就彈窗
      if (newAchievements.length > 0) {
        setShowAchievementPopup(newAchievements[0]);
        setTimeout(() => setShowAchievementPopup(null), 4000);
      }
    }
    
    // 動態XP系統 - 根據交易表現調整XP
    let totalXP = 0;
    closedTrades.forEach(trade => {
      if (!trade.xpAwarded) {
        let xp = 10; // 基礎XP
        
        // 盈利獎勵 - 根據盈利幅度給予不同XP
        if (trade.profitLoss > 0) {
          if (trade.profitLossPct > 5) xp += 50; // 大幅盈利
          else if (trade.profitLossPct > 2) xp += 30; // 中等盈利
          else xp += 20; // 小幅盈利
        } else if (trade.profitLoss < 0) {
          // 虧損但有控制風險的獎勵
          if (trade.managedByPlan === '是' && Math.abs(trade.profitLossPct) < 2) {
            xp += 10; // 控制虧損獎勵
          }
        }
        
        // 計劃執行獎勵
        if (trade.managedByPlan === '是') xp += 15;
        
        // 情緒控制獎勵
        if (trade.emotions?.includes('冷靜')) xp += 10;
        
        // 風險管理獎勵
        if (trade.stopLoss && trade.takeProfit) xp += 5;
        
        // 連勝獎勵
        if (currentWin >= 3) xp *= 1.5;
        if (currentWin >= 5) xp *= 2;
        
        totalXP += Math.floor(xp);
        trade.xpAwarded = true;
      }
    });
    
    newGameData.xp += totalXP;
    
    // 根據總損益調整XP加成
    const totalPL = closedTrades.reduce((sum, trade) => sum + (trade.profitLoss || 0), 0);
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
      }
      if (savedGameData) {
        setGameData(JSON.parse(savedGameData));
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
    
    const baseAccount = 10000;
    const newBalance = baseAccount + newTotalPL;
    setAccountBalance(newBalance);
    localStorage.setItem('tradingJournalBalance', newBalance.toString());
    
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
  const filteredTrades = trades.filter(trade => 
    trade.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trade.pair?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trade.direction?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px'
            }}>
              {gameConfig.achievements.map(achievement => (
                <AchievementBadge
                  key={achievement.id}
                  achievement={achievement}
                  earned={gameData.achievements.includes(achievement.id)}
                />
              ))}
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
        const visibleFields = fields.filter(field => field.visible);
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
                    value={10000}
                    disabled
                    style={{...inputStyle, opacity: 0.6}}
                    placeholder="基礎帳戶金額（固定）"
                  />
                  <div style={{color: colors.txt2, fontSize: '12px', marginTop: '4px'}}>
                    目前帳戶餘額會根據交易損益自動計算
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

export default TradingJournalApp;import { useState, useEffect, useCallback } from 'react';
import { 
  PlusCircle, TrendingUp, TrendingDown, Calendar, Target, Settings, BarChart3, 
  FileText, Search, Filter, Eye, EyeOff, Trash2, Edit3, Upload, Download, 
  DollarSign, RefreshCw, Image, X, Star, Trophy, Crown, Zap, Shield, 
  Award, Users, BookOpen, Brain, Heart, Flame, Lock, Gift, Timer,
  Sparkles, Medal, Sword, Compass, Diamond, Gem, Rocket
} from 'lucide-react';

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

// 用戶遊戲化數據結構
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
  }
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
  { key: 'ruleOfThree', label: 'Rule of Three', type: 'select', options: ['Impulse Wave', 'Corrective Wave', 'Structural Wave'], visible: true },
  { key: 'pattern', label: '技術型態', type: 'multiselect', options: patterns, visible: true },
  { key: 'marketCondition', label: '市場狀況', type: 'select', options: ['趨勢市場', '震盪市場', '突破市場', '整理市場'], visible: true },
  { key: 'followPlan', label: '是否依交易計畫', type: 'checkbox', visible: true },
  { key: 'emotions', label: '情緒標籤', type: 'multiselect', options: ['冷靜', '貪婪', '恐懼', '自信', '焦慮', '興奮', '後悔'], visible: true },
  { key: 'managementNotes', label: '交易管理筆記', type: 'textarea', visible: true },
  { key: 'screenshot', label: '交易截圖', type: 'image', visible: true },
  { key: 'closed', label: '交易已結束', type: 'checkbox', visible: true },
  { key: 'willTradeAgain', label: '會再次進行這筆交易嗎？', type: 'select', options: ['是', '否'], visible: true },
  { key: 'managedByPlan', label: '是否按計劃管理？', type: 'select', options: ['是', '否'], visible: true },
  { key: 'lessonsLearned', label: '經驗教訓', type: 'textarea', visible: true }
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

// 成就檢查函數
const checkAchievements = (gameData, trades) => {
  const newAchievements = [];
  
  gameConfig.achievements.forEach(achievement => {
    if (gameData.achievements.includes(achievement.id)) return;
    
    let earned = false;
    
    switch (achievement.id) {
      case 'first_profit':
        earned = trades.some(trade => trade.closed && trade.profitLoss > 0);
        break;
      case 'win_streak_5':
        earned = gameData.streaks.best_win >= 5;
        break;
      case 'risk_master':
        const riskControlTrades = trades.filter(trade => 
          trade.closed && trade.stopLoss && trade.managedByPlan === '是'
        );
        earned = riskControlTrades.length >= 10;
        break;
      case 'discipline_trader':
        const planTrades = trades.filter(trade => 
          trade.closed && trade.managedByPlan === '是'
        );
        earned = planTrades.length >= 20;
        break;
      case 'profit_king':
        // 這裡需要月度統計邏輯
        const thisMonth = new Date();
        const monthTrades = trades.filter(trade => {
          if (!trade.exitDate || !trade.closed) return false;
          const tradeDate = new Date(trade.exitDate);
          return tradeDate.getMonth() === thisMonth.getMonth() && 
                 tradeDate.getFullYear() === thisMonth.getFullYear();
        });
        const monthlyReturn = monthTrades.reduce((sum, trade) => sum + (trade.profitLossPct || 0), 0);
        earned = monthlyReturn > 10;
        break;
      case 'marathon_trader':
        earned = gameData.streaks.best_days >= 30;
        break;
      case 'perfect_month':
        // 需要檢查特定月份無虧損
        earned = false; // 簡化處理
        break;
      case 'emotion_control':
        const calmTrades = trades.filter(trade => 
          trade.emotions && trade.emotions.includes('冷靜')
        );
        earned = calmTrades.length >= 50;
        break;
    }
    
    if (earned) {
      newAchievements.push(achievement);
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
  const customizableFields = fields.filter(field => 
    field.options && (field.type === 'select' || field.type === 'multiselect')
  );

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
            const newOptions = field.options.filter((_, index) => index !== optionIndex);
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
      options: fieldData.options.filter((_, i) => i !== index)
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
      const newFields = fields.filter(field => field.key !== fieldKey);
      onFieldsUpdate(newFields);
      localStorage.setItem('tradingJournalFields', JSON.stringify(newFields));
    }
  };

  // 分類字段
  const systemFields = fields.filter(field => 
    defaultFields.some(defaultField => defaultField.key === field.key)
  );
  const customFields = fields.filter(field => 
    !defaultFields.some(defaultField => defaultField.key === field.key)
  );

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
          {fields.filter(f => f.visible).length}/{fields.length} 顯示中
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

// 技能樹組件
const SkillTree = ({ gameData, onUpgrade }) => {
  return (
    <div style={cardStyle}>
      <h3 style={{
        color: colors.txt0,
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '20px'
      }}>
        <Brain size={20} />
        技能樹
      </h3>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px'
      }}>
        {gameConfig.skills.map(skill => {
          const currentLevel = gameData.skills[skill.id] || 1;
          const maxLevel = skill.levels.length;
          
          return (
            <div key={skill.id} style={{
              padding: '20px',
              backgroundColor: colors.bg0,
              borderRadius: '16px',
              border: `2px solid ${colors.brand}40`
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '16px'
              }}>
                <div style={{ fontSize: '24px' }}>{skill.icon}</div>
                <div>
                  <h4 style={{
                    color: colors.txt0,
                    margin: 0,
                    fontSize: '16px',
                    fontWeight: '700'
                  }}>
                    {skill.name}
                  </h4>
                  <div style={{
                    color: colors.txt2,
                    fontSize: '12px'
                  }}>
                    等級 {currentLevel}/{maxLevel}
                  </div>
                </div>
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                {skill.levels.map((levelInfo, index) => {
                  const level = index + 1;
                  const isUnlocked = level <= currentLevel;
                  const canUpgrade = level === currentLevel + 1 && gameData.xp >= levelInfo.xpCost;
                  
                  return (
                    <div key={level} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '8px',
                      borderRadius: '8px',
                      backgroundColor: isUnlocked ? colors.bg2 : 'transparent',
                      border: `1px solid ${isUnlocked ? colors.brand : colors.txt2}40`,
                      marginBottom: '8px',
                      opacity: isUnlocked ? 1 : 0.6
                    }}>
                      <div style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: isUnlocked ? colors.brand : colors.txt2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        color: colors.bg0,
                        fontWeight: '700'
                      }}>
                        {level}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{
                          color: isUnlocked ? colors.txt0 : colors.txt2,
                          fontSize: '14px',
                          fontWeight: '600'
                        }}>
                          {levelInfo.name}
                        </div>
                        <div style={{
                          color: colors.txt2,
                          fontSize: '12px'
                        }}>
                          {levelInfo.benefit}
                        </div>
                      </div>
                      {canUpgrade && (
                        <button
                          onClick={() => onUpgrade(skill.id, level)}
                          style={{
                            ...buttonStyle,
                            padding: '6px 12px',
                            fontSize: '12px'
                          }}
                        >
                          升級 ({levelInfo.xpCost} XP)
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// 每日任務組件
const DailyQuests = ({ onComplete }) => {
  const [quests] = useState([
    {
      id: 'daily_record',
      title: '記錄一筆交易',
      desc: '今天記錄至少一筆交易',
      reward: 20,
      progress: 0,
      target: 1,
      icon: '📝'
    },
    {
      id: 'review_trades',
      title: '檢視交易記錄',
      desc: '檢視並分析過去的交易',
      reward: 15,
      progress: 0,
      target: 1,
      icon: '🔍'
    },
    {
      id: 'plan_tomorrow',
      title: '制定明日計劃',
      desc: '為明天的交易制定計劃',
      reward: 25,
      progress: 0,
      target: 1,
      icon: '📋'
    }
  ]);

  return (
    <div style={cardStyle}>
      <h3 style={{
        color: colors.txt0,
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <Target size={20} />
        每日任務
        <div style={{
          backgroundColor: colors.warn,
          color: colors.txt0,
          padding: '4px 8px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: '700'
        }}>
          23:59
        </div>
      </h3>
      
      <div style={{display: 'grid', gap: '16px'}}>
        {quests.map(quest => {
          const isCompleted = quest.progress >= quest.target;
          const progressPercent = (quest.progress / quest.target) * 100;
          
          return (
            <div key={quest.id} style={{
              padding: '16px',
              backgroundColor: colors.bg0,
              borderRadius: '12px',
              border: `2px solid ${isCompleted ? colors.ok : colors.brand}40`,
              opacity: isCompleted ? 0.7 : 1
            }}>
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
                    fontSize: '14px'
                  }}>
                    {quest.desc}
                  </p>
                </div>
                <div style={{
                  backgroundColor: colors.gold,
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
                overflow: 'hidden'
              }}>
                <div style={{
                  background: isCompleted 
                    ? `linear-gradient(90deg, ${colors.ok}, ${colors.lime})` 
                    : `linear-gradient(90deg, ${colors.brand}, ${colors.cyan})`,
                  height: '8px',
                  borderRadius: '6px',
                  width: `${Math.min(progressPercent, 100)}%`,
                  transition: 'width 0.5s ease'
                }} />
              </div>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '8px'
              }}>
                <span style={{
                  color: colors.txt2,
                  fontSize: '12px'
                }}>
                  進度: {quest.progress}/{quest.target}
                </span>
                {isCompleted && (
                  <span style={{
                    color: colors.ok,
                    fontSize: '12px',
                    fontWeight: '700'
                  }}>
                    ✅ 已完成
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
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