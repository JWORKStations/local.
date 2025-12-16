interface SettlementData {
  settlementDate: string;
  period: string;
  settlementType: string;
  settlementCount: number;
  paymentMethod: string;
  paymentAmount: number;
  vatAmount: number;
  totalPaymentAmount: number;
  totalVatAmount: number;
  totalSettlementAmount: number;
  note: string;
}

export function SettlementPage() {
  // 샘플 데이터
  const settlementData: SettlementData[] = [
    {
      settlementDate: '2025.12.10',
      period: '2025.11.01~2025.11.30',
      settlementType: '청산예정',
      settlementCount: 1,
      paymentMethod: '다음 플랫폼결제',
      paymentAmount: 5700,
      vatAmount: 0,
      totalPaymentAmount: 5700,
      totalVatAmount: 0,
      totalSettlementAmount: 5700,
      note: '-'
    },
    {
      settlementDate: '2025.12.10',
      period: '2025.09.01~2025.09.30',
      settlementType: '청산예정',
      settlementCount: 6,
      paymentMethod: '다음 플랫폼결제',
      paymentAmount: 34200,
      vatAmount: 0,
      totalPaymentAmount: 34200,
      totalVatAmount: 0,
      totalSettlementAmount: 34200,
      note: '-'
    },
    {
      settlementDate: '2025.12.10',
      period: '2025.08.01~2025.08.31',
      settlementType: '청산예정',
      settlementCount: 17,
      paymentMethod: '다음 플랫폼결제',
      paymentAmount: 91200,
      vatAmount: 0,
      totalPaymentAmount: 91200,
      totalVatAmount: 0,
      totalSettlementAmount: 91200,
      note: '-'
    },
    {
      settlementDate: '2025.12.10',
      period: '2025.07.01~2025.07.31',
      settlementType: '청산예정',
      settlementCount: 17,
      paymentMethod: '다음 플랫폼결제',
      paymentAmount: 91200,
      vatAmount: 0,
      totalPaymentAmount: 91200,
      totalVatAmount: 0,
      totalSettlementAmount: 91200,
      note: '-'
    },
    {
      settlementDate: '2025.12.10',
      period: '2025.08.01~2025.08.30',
      settlementType: '청산예정',
      settlementCount: 9,
      paymentMethod: '다음 플랫폼결제',
      paymentAmount: 34200,
      vatAmount: 0,
      totalPaymentAmount: 34200,
      totalVatAmount: 0,
      totalSettlementAmount: 34200,
      note: '-'
    },
    {
      settlementDate: '2025.12.10',
      period: '2025.05.01~2025.05.31',
      settlementType: '청산예정',
      settlementCount: 6,
      paymentMethod: '다음 플랫폼결제',
      paymentAmount: 22800,
      vatAmount: 0,
      totalPaymentAmount: 22800,
      totalVatAmount: 0,
      totalSettlementAmount: 22800,
      note: '-'
    },
    {
      settlementDate: '2025.12.09',
      period: '2025.11.30',
      settlementType: '청산예정',
      settlementCount: 10,
      paymentMethod: '다음 카드스크',
      paymentAmount: 220000,
      vatAmount: 7260,
      totalPaymentAmount: 212740,
      totalVatAmount: 0,
      totalSettlementAmount: 212740,
      note: '-'
    },
    {
      settlementDate: '2025.12.09',
      period: '2025.11.29',
      settlementType: '청산예정',
      settlementCount: 4,
      paymentMethod: '다음 카드스크',
      paymentAmount: 88000,
      vatAmount: 2904,
      totalPaymentAmount: 85096,
      totalVatAmount: 0,
      totalSettlementAmount: 85096,
      note: '-'
    }
  ];

  // 통계 계산
  const totalSettlement = settlementData.reduce((sum, s) => sum + s.totalSettlementAmount, 0);
  const totalVat = settlementData.reduce((sum, s) => sum + s.vatAmount, 0);
  const totalCount = settlementData.reduce((sum, s) => sum + s.settlementCount, 0);
  const avgDeposit = settlementData.length > 0 ? Math.round(totalSettlement / settlementData.length) : 0;

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('ko-KR') + '원';
  };

  return (
    <div class="settlement-page">
      {/* 헤더: 탭 */}
      <div class="settlement-header">
        <div class="settlement-tabs">
          <button class="settlement-tab">매출</button>
          <button class="settlement-tab active">정산</button>
        </div>
      </div>

      {/* 필터 섹션 */}
      <div class="settlement-filters">
        <div class="filter-top-row">
          {/* 정산 타입 라디오 버튼 */}
          <div class="settlement-type-radio">
            <label class="radio-label">
              <input type="radio" name="settlementType" checked />
              <span class="radio-text">청산예 입금일</span>
            </label>
            <label class="radio-label">
              <input type="radio" name="settlementType" />
              <span class="radio-text">매출일</span>
              <i class="fas fa-question-circle info-icon"></i>
            </label>
          </div>

          {/* 날짜 범위 선택 */}
          <div class="filter-group date-range">
            <i class="fas fa-calendar calendar-icon"></i>
            <input type="date" value="2025-12-01" />
            <span class="date-separator">~</span>
            <input type="date" value="2025-12-17" />
          </div>

          {/* 빠른 날짜 선택 버튼 */}
          <div class="filter-group quick-dates">
            <button class="quick-date-btn">이번 달</button>
            <button class="quick-date-btn">지난 달</button>
            <button class="quick-date-btn">오늘</button>
            <button class="quick-date-btn">이번 주</button>
            <button class="quick-date-btn">지난 주</button>
          </div>
        </div>

        <div class="filter-bottom-row">
          {/* 필터 드롭다운 */}
          <select class="filter-select">
            <option>정산상태</option>
            <option>청산예정</option>
            <option>입금완료</option>
            <option>입금대기</option>
          </select>

          <select class="filter-select">
            <option>결제수단</option>
            <option>카드</option>
            <option>현금</option>
            <option>계좌이체</option>
            <option>플랫폼결제</option>
          </select>

          {/* 액션 버튼 */}
          <div class="filter-actions-right">
            <button class="action-btn reset-btn">
              필터 초기화
            </button>
            <button class="action-btn download-btn">
              엑셀 다운로드
            </button>
          </div>
        </div>
      </div>

      {/* 통계 요약 섹션 */}
      <div class="settlement-summary">
        <div class="summary-item">
          <span class="summary-label">정산(매출)액</span>
          <span class="summary-value primary">{formatCurrency(totalSettlement)}</span>
        </div>
        <div class="summary-item">
          <span class="summary-label">차공</span>
          <span class="summary-value">{formatCurrency(totalVat)}</span>
        </div>
        <div class="summary-item">
          <span class="summary-label">수수료(VAT 포함)</span>
          <span class="summary-value warning">{totalCount}건</span>
        </div>
        <div class="summary-item">
          <span class="summary-label">결제/환불 건수</span>
          <span class="summary-value">{totalCount}건</span>
        </div>
        <div class="summary-item">
          <span class="summary-label">입금 예정액</span>
          <span class="summary-value highlight">{formatCurrency(avgDeposit)}</span>
        </div>
      </div>

      {/* 데이터 테이블 */}
      <div class="settlement-table-container">
        <table class="settlement-table">
          <thead>
            <tr>
              <th width="8%">청산예 입금일</th>
              <th width="15%">기간별</th>
              <th width="8%">정산상태</th>
              <th width="8%">결제/환불 건수</th>
              <th width="12%">결제수단</th>
              <th width="10%">매출액(A)</th>
              <th width="10%">플랫폼(C)~(A-B)</th>
              <th width="10%">플랫폼 입금일액(C)</th>
              <th width="10%">입금 정산입금액(D)</th>
              <th width="10%">입금 정산일액(E)~(C+D)</th>
              <th width="4%">비고</th>
            </tr>
          </thead>
          <tbody>
            {settlementData.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.settlementDate}</td>
                  <td>{item.period}</td>
                  <td>
                    <span class="settlement-status pending">{item.settlementType}</span>
                  </td>
                  <td class="text-center">{item.settlementCount}</td>
                  <td>
                    {item.paymentMethod.includes('플랫폼') ? (
                      <span class="payment-badge platform">{item.paymentMethod}</span>
                    ) : (
                      <span class="payment-badge card">{item.paymentMethod}</span>
                    )}
                  </td>
                  <td class="text-right amount-cell">{formatCurrency(item.paymentAmount)}</td>
                  <td class="text-right amount-cell">{formatCurrency(item.vatAmount)}</td>
                  <td class="text-right amount-cell">{formatCurrency(item.totalPaymentAmount)}</td>
                  <td class="text-right amount-cell">{formatCurrency(item.totalVatAmount)}</td>
                  <td class="text-right amount-cell strong">{formatCurrency(item.totalSettlementAmount)}</td>
                  <td class="text-center">{item.note}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      <div class="pagination">
        <button class="page-btn"><i class="fas fa-chevron-left"></i></button>
        <button class="page-btn active">1</button>
        <button class="page-btn">2</button>
        <button class="page-btn">3</button>
        <button class="page-btn"><i class="fas fa-chevron-right"></i></button>
      </div>
    </div>
  );
}
