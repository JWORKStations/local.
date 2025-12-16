export const CostManagementPageActions = () => {
  return (
    <div class="page-actions">
      <button class="btn-secondary">
        <i class="fas fa-cog"></i>
        카드/계좌 등록
      </button>
      <button class="btn-primary">
        <i class="fas fa-download"></i>
        엑셀 다운로드
      </button>
    </div>
  )
}

interface MonthlyData {
  month: string
  revenue: number
  expenses: number
}

interface RevenueCategory {
  name: string
  amount: number
  percentage: number
  color: string
}

interface ExpenseCategory {
  name: string
  amount: number
  percentage: number
  color: string
}

interface AccountBalance {
  name: string
  balance: number
  type: string
}

export const CostManagementPage = () => {
  // 샘플 데이터
  const summaryStats = {
    totalAssets: 85000000,
    monthlyRevenue: 38500000,
    monthlyExpenses: 35000000,
    netProfit: 3500000,
    operationMonths: 24.3,
  }

  const accounts: AccountBalance[] = [
    { name: '신한은행 체크 (입금용)', balance: 45000000, type: 'bank' },
    { name: 'KB국민카드 (비용결제용)', balance: 25000000, type: 'card' },
    { name: '하나은행 저축 (비상금)', balance: 15000000, type: 'savings' },
  ]

  const revenueCategories: RevenueCategory[] = [
    { name: '회원권', amount: 22500000, percentage: 58.4, color: '#3b82f6' },
    { name: '프리패스', amount: 8800000, percentage: 22.9, color: '#22c55e' },
    { name: '보조금', amount: 5000000, percentage: 13.0, color: '#f59e0b' },
    { name: '인수수수', amount: 1200000, percentage: 3.1, color: '#a855f7' },
    { name: '옷대여', amount: 1000000, percentage: 2.6, color: '#ec4899' },
  ]

  const expenseCategories: ExpenseCategory[] = [
    { name: '인건비', amount: 12000000, percentage: 34.3, color: '#ef4444' },
    { name: '임대료', amount: 8200000, percentage: 23.4, color: '#f97316' },
    { name: '기타운영비', amount: 4800000, percentage: 13.7, color: '#f59e0b' },
    { name: '광고비', amount: 4200000, percentage: 12.0, color: '#ec4899' },
    { name: '공과금', amount: 3000000, percentage: 8.6, color: '#8b5cf6' },
    { name: '잡비', amount: 2800000, percentage: 8.0, color: '#6366f1' },
  ]

  const monthlyData: MonthlyData[] = [
    { month: '4월', revenue: 37500000, expenses: 30000000 },
    { month: '5월', revenue: 42000000, expenses: 32000000 },
    { month: '6월', revenue: 37500000, expenses: 34500000 },
    { month: '7월', revenue: 38000000, expenses: 38000000 },
    { month: '8월', revenue: 40500000, expenses: 36000000 },
    { month: '9월', revenue: 38500000, expenses: 35000000 },
  ]

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('ko-KR') + '원'
  }

  const formatLargeCurrency = (amount: number) => {
    if (amount >= 100000000) {
      return (amount / 100000000).toFixed(1) + '억원'
    } else if (amount >= 10000000) {
      return Math.floor(amount / 10000000) + ',' + 
             String(Math.floor((amount % 10000000) / 10000)).padStart(3, '0') + '만원'
    } else if (amount >= 10000) {
      return (amount / 10000).toFixed(0) + '만원'
    }
    return formatCurrency(amount)
  }

  return (
    <div class="cost-management-page">
      {/* 탭 메뉴 */}
      <div class="page-tabs">
        <a href="/finance" class="page-tab active">
          <i class="fas fa-chart-pie"></i>
          애널리틱스
        </a>
        <a href="/finance/accounts" class="page-tab">
          <i class="fas fa-list-alt"></i>
          계정과목 리뷰
        </a>
        <a href="/finance/cards" class="page-tab">
          <i class="fas fa-credit-card"></i>
          계좌/카드 관리
        </a>
      </div>

      {/* 운영 기간 표시 */}
      <div class="operation-period">
        <div class="period-header">
          <span class="period-icon">🔥</span>
          <span class="period-title">
            현재 "평균 운영 수익률"은 <strong>3,500,000원</strong>으로 현재 운영 비용을 기준으로 약 <strong>24.3개월</strong> 분량 가동되었습니다.
          </span>
        </div>
        <div class="period-bar">
          <div class="period-progress" style="width: 85%"></div>
        </div>
        <div class="period-labels">
          <span>* 평균 순수익 = 총 자산 ÷ 총 누적 월 평균 가동 이익 = 평균 가동 가능 월 수 * 평균 운영 수익률</span>
        </div>
      </div>

      {/* 3개의 주요 카드 */}
      <div class="finance-main-cards">
        {/* 총 자산 카드 */}
        <div class="finance-card assets-card">
          <div class="finance-card-header">
            <h3>총 자산</h3>
            <button class="btn-text">
              지난 주기/계좌 가기 →
            </button>
          </div>
          <div class="finance-card-value">{formatLargeCurrency(summaryStats.totalAssets)}</div>
          <div class="finance-card-change positive">
            전월 대비 <strong>8.3%</strong> 증가
          </div>
          
          <div class="account-list">
            <h4>보유 계좌</h4>
            {accounts.map((account) => (
              <div class="account-item">
                <div class="account-info">
                  <span class="account-icon">
                    {account.type === 'bank' ? '🏦' : account.type === 'card' ? '💳' : '💰'}
                  </span>
                  <span class="account-name">{account.name}</span>
                </div>
                <div class="account-balance">{formatLargeCurrency(account.balance)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 이번 달 수입 카드 */}
        <div class="finance-card revenue-card">
          <div class="finance-card-header">
            <h3>이번 달 수입 (매출)</h3>
            <div class="card-tabs">
              <button class="tab-btn active">월별</button>
              <button class="tab-btn">주별</button>
              <button class="tab-btn">일별</button>
            </div>
          </div>
          <div class="finance-card-value">{formatLargeCurrency(summaryStats.monthlyRevenue)}</div>
          <div class="finance-card-change positive">
            전월 대비 <strong>10.0%</strong> 증가
          </div>
          
          <div class="category-breakdown">
            {revenueCategories.map((category) => (
              <div class="category-item">
                <div class="category-header">
                  <span class="category-badge" style={`background: ${category.color}`}>
                    {category.name}
                  </span>
                  <span class="category-amount">{formatLargeCurrency(category.amount)}</span>
                </div>
                <div class="category-bar">
                  <div 
                    class="category-progress" 
                    style={`width: ${category.percentage}%; background: ${category.color}`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 이번 달 지출 카드 */}
        <div class="finance-card expenses-card">
          <div class="finance-card-header">
            <h3>이번 달 지출 (매입)</h3>
            <div class="card-tabs">
              <button class="tab-btn active">월별</button>
              <button class="tab-btn">주별</button>
              <button class="tab-btn">일별</button>
            </div>
          </div>
          <div class="finance-card-value">{formatLargeCurrency(summaryStats.monthlyExpenses)}</div>
          <div class="finance-card-change negative">
            전월 대비 <strong>9.4%</strong> 증가
          </div>
          
          <div class="category-breakdown">
            {expenseCategories.map((category) => (
              <div class="category-item">
                <div class="category-header">
                  <span class="category-badge expense" style={`background: ${category.color}`}>
                    {category.name}
                  </span>
                  <span class="category-amount">{formatLargeCurrency(category.amount)}</span>
                </div>
                <div class="category-bar">
                  <div 
                    class="category-progress" 
                    style={`width: ${category.percentage}%; background: ${category.color}`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 월별 수입/지출 추이 */}
      <div class="finance-section">
        <div class="finance-section-header">
          <h3 class="finance-section-title">
            <i class="fas fa-chart-line"></i>
            월별 매출 평균 38,000,000원 수익
          </h3>
        </div>
        
        <div class="monthly-trend-chart">
          <div class="chart-y-axis">
            <span>50,000,000원</span>
            <span>40,000,000원</span>
            <span>30,000,000원</span>
            <span>20,000,000원</span>
            <span>10,000,000원</span>
            <span>0원</span>
          </div>
          
          <div class="chart-bars">
            {monthlyData.map((data) => {
              const maxValue = 50000000
              const revenueHeight = (data.revenue / maxValue) * 100
              const expensesHeight = (data.expenses / maxValue) * 100
              
              return (
                <div class="month-bar-group">
                  <div class="bar-container">
                    <div 
                      class="bar revenue-bar" 
                      style={`height: ${revenueHeight}%`}
                      title={`수입: ${formatLargeCurrency(data.revenue)}`}
                    >
                      <span class="bar-value">{formatLargeCurrency(data.revenue)}</span>
                    </div>
                    <div 
                      class="bar expense-bar" 
                      style={`height: ${expensesHeight}%`}
                      title={`지출: ${formatLargeCurrency(data.expenses)}`}
                    >
                      <span class="bar-value">{formatLargeCurrency(data.expenses)}</span>
                    </div>
                  </div>
                  <div class="month-label">{data.month}</div>
                </div>
              )
            })}
          </div>
        </div>
        
        <div class="chart-legend-horizontal">
          <div class="legend-item">
            <span class="legend-dot revenue"></span>
            <span>수입</span>
          </div>
          <div class="legend-item">
            <span class="legend-dot expense"></span>
            <span>지출</span>
          </div>
        </div>
      </div>

      {/* 상세 내역 테이블 */}
      <div class="finance-section">
        <div class="finance-section-header">
          <h3 class="finance-section-title">
            <i class="fas fa-table"></i>
            월별 상세 내역
          </h3>
        </div>
        
        <div class="finance-detail-table">
          <table class="data-table">
            <thead>
              <tr>
                <th>월</th>
                <th class="text-right">수입 (매출)</th>
                <th class="text-right">지출 (매입)</th>
                <th class="text-right">순수익</th>
                <th class="text-right">수익률</th>
              </tr>
            </thead>
            <tbody>
              {monthlyData.map((data) => {
                const profit = data.revenue - data.expenses
                const profitRate = ((profit / data.revenue) * 100).toFixed(1)
                
                return (
                  <tr>
                    <td>{data.month}</td>
                    <td class="text-right amount-cell revenue">{formatCurrency(data.revenue)}</td>
                    <td class="text-right amount-cell expense">{formatCurrency(data.expenses)}</td>
                    <td class="text-right amount-cell profit">
                      <strong>{formatCurrency(profit)}</strong>
                    </td>
                    <td class="text-right">
                      <span class={profit > 0 ? 'badge-success' : 'badge-danger'}>
                        {profitRate}%
                      </span>
                    </td>
                  </tr>
                )
              })}
              <tr class="total-row">
                <td><strong>합계</strong></td>
                <td class="text-right amount-cell revenue">
                  <strong>{formatCurrency(monthlyData.reduce((sum, d) => sum + d.revenue, 0))}</strong>
                </td>
                <td class="text-right amount-cell expense">
                  <strong>{formatCurrency(monthlyData.reduce((sum, d) => sum + d.expenses, 0))}</strong>
                </td>
                <td class="text-right amount-cell profit">
                  <strong>{formatCurrency(monthlyData.reduce((sum, d) => sum + (d.revenue - d.expenses), 0))}</strong>
                </td>
                <td class="text-right">
                  <strong>
                    {((monthlyData.reduce((sum, d) => sum + (d.revenue - d.expenses), 0) / 
                       monthlyData.reduce((sum, d) => sum + d.revenue, 0)) * 100).toFixed(1)}%
                  </strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
