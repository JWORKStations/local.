import { allSalesData, type SalesData } from '../data/salesData'

export function SalesPage() {

  // 날짜 파싱 함수 (YYYY.MM.DD HH:MM -> Date)
  const parseDate = (dateStr: string): Date => {
    const [datePart] = dateStr.split(' ');
    const [year, month, day] = datePart.split('.').map(Number);
    return new Date(year, month - 1, day);
  };

  // 날짜 필터링 함수
  const filterByDateRange = (data: SalesData[], startDate: string, endDate: string): SalesData[] => {
    if (!startDate || !endDate) return data;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999); // 종료일 끝까지 포함
    
    return data.filter(sale => {
      const saleDate = parseDate(sale.paymentDate);
      return saleDate >= start && saleDate <= end;
    });
  };

  // 통계 계산 함수
  const calculateStats = (data: SalesData[]) => {
    const totalRevenue = data.reduce((sum, sale) => sum + sale.amount, 0);
    const approvedAmount = totalRevenue;
    const refundAmount = 0;
    const totalPaymentCount = data.length;
    const membershipCount = data.filter(s => s.salesItem.includes('회원권')).length;
    const rentalCount = data.filter(s => s.salesItem.includes('대여')).length;
    const etcCount = data.filter(s => !s.salesItem.includes('회원권') && !s.salesItem.includes('대여')).length;
    const unpaidAmount = data.reduce((sum, sale) => sum + (sale.unpaidAmount || 0), 0);
    
    return {
      totalRevenue,
      approvedAmount,
      refundAmount,
      totalPaymentCount,
      membershipCount,
      rentalCount,
      etcCount,
      unpaidAmount
    };
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('ko-KR') + '원';
  };

  // 오늘 날짜 구하기
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  
  // 이번 달 시작일, 종료일
  const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const thisMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const thisMonthStartStr = thisMonthStart.toISOString().split('T')[0];
  const thisMonthEndStr = thisMonthEnd.toISOString().split('T')[0];

  // 초기 필터: 이번 달 (12월)
  const initialStartDate = '2025-12-01';
  const initialEndDate = '2025-12-31';
  
  // 날짜 필터링 후 결제일시 기준 내림차순 정렬 (최신순)
  const filteredData = filterByDateRange(allSalesData, initialStartDate, initialEndDate)
    .sort((a, b) => {
      const dateA = parseDate(a.paymentDate);
      const dateB = parseDate(b.paymentDate);
      return dateB.getTime() - dateA.getTime(); // 내림차순 (최신이 위로)
    });
  
  const stats = calculateStats(filteredData);

  return (
    <div class="sales-page">
      {/* 헤더: 탭 및 검색 */}
      <div class="sales-header">
        <div class="sales-tabs">
          <button class="sales-tab active">매출</button>
          <button class="sales-tab">정산</button>
        </div>
        <div class="sales-search">
          <i class="fas fa-search"></i>
          <input type="text" placeholder="매출 검색" />
        </div>
      </div>

      {/* 필터 섹션 */}
      <div class="sales-filters">
        <div class="filter-row">
          {/* 날짜 범위 선택 */}
          <div class="filter-group date-range">
            <div class="date-input-group">
              <input type="date" id="start-date" value={initialStartDate} />
              <span class="date-separator">~</span>
              <input type="date" id="end-date" value={initialEndDate} />
            </div>
          </div>

          {/* 빠른 날짜 선택 버튼 */}
          <div class="filter-group quick-dates">
            <button class="quick-date-btn active" data-range="this-month">이번 달</button>
            <button class="quick-date-btn" data-range="today">오늘</button>
            <button class="quick-date-btn" data-range="yesterday">어제</button>
            <button class="quick-date-btn" data-range="last-7">최근 7일</button>
            <button class="quick-date-btn" data-range="last-30">최근 30일</button>
            <button class="quick-date-btn" data-range="last-3m">최근 3개월</button>
            <button class="quick-date-btn" data-range="last-6m">최근 6개월</button>
          </div>
        </div>

        <div class="filter-row">
          {/* 필터 드롭다운 */}
          <select class="filter-select">
            <option>전체 매출 유형</option>
            <option>상품</option>
            <option>서비스</option>
            <option>기타</option>
          </select>

          <select class="filter-select">
            <option>전체 결제수단</option>
            <option>카드</option>
            <option>현금</option>
            <option>계좌이체</option>
            <option>미납</option>
          </select>

          <select class="filter-select">
            <option>마수수 여부</option>
            <option>마수수</option>
            <option>일반</option>
          </select>

          <select class="filter-select">
            <option>전체 제품유형</option>
            <option>PT</option>
            <option>GX</option>
            <option>필라테스</option>
            <option>헬스</option>
          </select>

          <select class="filter-select">
            <option>전체 결제담당자</option>
            <option>박현진</option>
            <option>강사윤</option>
            <option>로이</option>
            <option>수</option>
            <option>리키</option>
            <option>세나</option>
            <option>송예빛나</option>
            <option>예지</option>
          </select>

          <div class="filter-actions">
            <button class="action-btn reset-btn">
              <i class="fas fa-redo"></i> 필터 초기화
            </button>
            <button class="action-btn download-btn">
              <i class="fas fa-download"></i> 엑셀 다운로드
            </button>
          </div>
        </div>
      </div>

      {/* 통계 요약 카드 */}
      <div class="sales-summary">
        <div class="summary-card">
          <div class="summary-label">매출</div>
          <div class="summary-value revenue">{formatCurrency(stats.totalRevenue)}</div>
        </div>
        <div class="summary-card">
          <div class="summary-label">승인금액</div>
          <div class="summary-value approved">{formatCurrency(stats.approvedAmount)}</div>
        </div>
        <div class="summary-card">
          <div class="summary-label">환불</div>
          <div class="summary-value refund">{formatCurrency(stats.refundAmount)}</div>
        </div>
        <div class="summary-card">
          <div class="summary-label">총 결제</div>
          <div class="summary-value payment-count">{stats.totalPaymentCount}건</div>
        </div>
        <div class="summary-card">
          <div class="summary-label">회원권</div>
          <div class="summary-value membership-count">{stats.membershipCount}건</div>
        </div>
        <div class="summary-card">
          <div class="summary-label">대여</div>
          <div class="summary-value rental-count">{stats.rentalCount}건</div>
        </div>
        <div class="summary-card">
          <div class="summary-label">기타</div>
          <div class="summary-value etc-count">{stats.etcCount}건</div>
        </div>
        <div class="summary-card highlight">
          <div class="summary-label">누적 미수금</div>
          <div class="summary-value unpaid">{formatCurrency(stats.unpaidAmount)}</div>
        </div>
      </div>

      {/* 매출 테이블 */}
      <div class="sales-table-container">
        <table class="sales-table">
          <thead>
            <tr>
              <th width="3%"><input type="checkbox" /></th>
              <th width="13%">결제번호</th>
              <th width="9%">이름 / 연락처</th>
              <th width="6%">매출 유형</th>
              <th width="12%">매출 항목</th>
              <th width="8%">상품 금액</th>
              <th width="8%">매출 금액</th>
              <th width="7%">결제수단</th>
              <th width="13%">결제일 / 취소 일자</th>
              <th width="6%">결제담당자</th>
              <th width="15%" style="text-align: center;">영수증</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((sale) => {
              const isUnpaid = sale.paymentMethod === '미납';
              const rowClass = isUnpaid ? 'unpaid-row' : '';
              const isInstallment = sale.installment && sale.totalInstallments && sale.totalInstallments > 1;

              return (
                <tr class={`${rowClass} table-row-clickable`} data-sale-id={sale.id} onclick="handleRowClick(event)">
                  <td onclick="event.stopPropagation()">
                    <input type="checkbox" />
                  </td>
                  <td>
                    <div class="payment-id-container">
                      <span class="payment-id">{sale.id}</span>
                      {isInstallment && (
                        <span class="installment-badge">{sale.installment}/{sale.totalInstallments}차</span>
                      )}
                    </div>
                  </td>
                  <td>
                    <div class="member-info-compact">
                      <span class="member-name">{sale.memberName}</span>
                      <span class="member-phone-short">{sale.memberPhone.slice(-4)}</span>
                    </div>
                  </td>
                  <td>
                    <span class="type-badge">{sale.salesType}</span>
                  </td>
                  <td>
                    <span class="sales-item">{sale.salesItem}</span>
                  </td>
                  <td>
                    <span class="product-amount">{formatCurrency(sale.productAmount)}</span>
                  </td>
                  <td>
                    <div style="display: flex; flex-direction: column; gap: 2px;">
                      <span class={`amount ${isUnpaid ? 'unpaid-amount' : ''}`}>
                        {formatCurrency(sale.amount)}
                      </span>
                      {sale.unpaidAmount && sale.unpaidAmount > 0 && (
                        <span class="unpaid-notice">미납 {formatCurrency(sale.unpaidAmount)}</span>
                      )}
                    </div>
                  </td>
                  <td>
                    <span class={`payment-method ${
                      sale.paymentMethod === '카드' ? 'card' : 
                      sale.paymentMethod === '현금' ? 'cash' : 
                      'unpaid'
                    }`}>
                      {sale.paymentMethod}
                    </span>
                  </td>
                  <td>
                    <span class={`payment-date ${isUnpaid ? 'unpaid-date' : ''}`}>
                      {sale.paymentDate}
                    </span>
                  </td>
                  <td>{sale.salesperson}</td>
                  <td>
                    <div class="receipt-cell">
                      {sale.receiptAvailable ? (
                        <button class="receipt-btn view" title="영수증 보기">
                          <i class="fas fa-file-image"></i>
                        </button>
                      ) : (
                        <button class="receipt-btn upload" title="영수증 업로드">
                          <i class="fas fa-upload"></i>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      <div class="pagination">
        <button class="page-btn">
          <i class="fas fa-chevron-left"></i>
        </button>
        <button class="page-btn active">1</button>
        <button class="page-btn">2</button>
        <button class="page-btn">3</button>
        <button class="page-btn">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>

      {/* 결제 상세 모달 컨테이너 */}
      <div id="payment-modal-container" style="display: none;"></div>

      {/* 날짜 필터링 JavaScript */}
      <script dangerouslySetInnerHTML={{__html: `
          // 날짜 파싱 함수
          function parseDate(dateStr) {
            const [datePart] = dateStr.split(' ');
            const [year, month, day] = datePart.split('.').map(Number);
            return new Date(year, month - 1, day);
          }
          
          // 초기 데이터를 결제일시 기준 내림차순 정렬 (최신순)
          let allData = ${JSON.stringify(allSalesData)};
          allData.sort((a, b) => {
            const dateA = parseDate(a.paymentDate);
            const dateB = parseDate(b.paymentDate);
            return dateB.getTime() - dateA.getTime();
          });
          
          let currentSaleData = allData;
          let currentStartDate = '${initialStartDate}';
          let currentEndDate = '${initialEndDate}';
          
          // URL 파라미터에서 결제 ID 가져오기 (회원 상세에서 클릭한 경우)
          const urlParams = new URLSearchParams(window.location.search);
          const highlightPaymentId = urlParams.get('payment');
          
          // 페이지 로드 후 해당 결제를 하이라이트하고 스크롤
          if (highlightPaymentId) {
            setTimeout(() => {
              const targetRow = document.querySelector('[data-sale-id="' + highlightPaymentId + '"]');
              if (targetRow) {
                targetRow.style.backgroundColor = '#fef3c7';
                targetRow.style.border = '2px solid #f59e0b';
                targetRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // 3초 후 하이라이트 제거
                setTimeout(() => {
                  targetRow.style.backgroundColor = '';
                  targetRow.style.border = '';
                }, 3000);
              }
            }, 500);
          }
          
          // 날짜 필터링 및 페이지 새로고침
          function applyDateFilter() {
            const startDate = document.getElementById('start-date').value;
            const endDate = document.getElementById('end-date').value;
            
            if (startDate && endDate) {
              // URL 파라미터로 날짜 전달하여 페이지 새로고침
              window.location.href = '/sales?start=' + startDate + '&end=' + endDate;
            }
          }
          
          // 날짜 입력 이벤트 리스너
          document.getElementById('start-date').addEventListener('change', applyDateFilter);
          document.getElementById('end-date').addEventListener('change', applyDateFilter);
          
          // 빠른 날짜 버튼 클릭
          document.querySelectorAll('.quick-date-btn').forEach(btn => {
            btn.addEventListener('click', function() {
              // 활성화 상태 변경
              document.querySelectorAll('.quick-date-btn').forEach(b => b.classList.remove('active'));
              this.classList.add('active');
              
              const range = this.getAttribute('data-range');
              const today = new Date();
              let startDate, endDate;
              
              switch(range) {
                case 'today':
                  startDate = endDate = today;
                  break;
                case 'yesterday':
                  const yesterday = new Date(today);
                  yesterday.setDate(yesterday.getDate() - 1);
                  startDate = endDate = yesterday;
                  break;
                case 'last-7':
                  endDate = today;
                  startDate = new Date(today);
                  startDate.setDate(startDate.getDate() - 6);
                  break;
                case 'last-30':
                  endDate = today;
                  startDate = new Date(today);
                  startDate.setDate(startDate.getDate() - 29);
                  break;
                case 'last-3m':
                  endDate = today;
                  startDate = new Date(today);
                  startDate.setMonth(startDate.getMonth() - 3);
                  break;
                case 'last-6m':
                  endDate = today;
                  startDate = new Date(today);
                  startDate.setMonth(startDate.getMonth() - 6);
                  break;
                case 'this-month':
                default:
                  startDate = new Date(today.getFullYear(), today.getMonth(), 1);
                  endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
              }
              
              // 날짜를 YYYY-MM-DD 형식으로 변환
              const formatDate = (date) => {
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                return year + '-' + month + '-' + day;
              };
              
              document.getElementById('start-date').value = formatDate(startDate);
              document.getElementById('end-date').value = formatDate(endDate);
              
              applyDateFilter();
            });
          });
          
          // 행 클릭 핸들러
          function handleRowClick(event) {
            const row = event.currentTarget;
            const saleId = row.getAttribute('data-sale-id');
            const sale = currentSaleData.find(s => s.id === saleId);
            if (sale) {
              openPaymentModal(sale);
            }
          }
          
          // 결제 상세 모달 열기
          function openPaymentModal(sale) {
            const isUnpaid = sale.paymentMethod === '미납';
            const isInstallment = sale.installment && sale.totalInstallments && sale.totalInstallments > 1;
            
            const modalHTML = \`
              <div class="modal-overlay" onclick="if(event.target === this) closePaymentModal()">
                <div class="modal-content">
                  <div class="modal-header">
                    <div>
                      <div class="modal-title">결제 상세정보</div>
                      <div class="modal-subtitle">판매번호: \${sale.id}</div>
                    </div>
                    <button class="modal-close" onclick="closePaymentModal()">&times;</button>
                  </div>
                  
                  <div class="modal-body">
                    \${isInstallment ? \`
                      <div class="installment-info">
                        <span class="installment-icon">💳</span>
                        <span class="installment-text">\${sale.installment}/\${sale.totalInstallments}차 분할결제</span>
                      </div>
                    \` : ''}
                    
                    <div class="detail-row">
                      <span class="detail-label">결제 번호</span>
                      <span class="detail-value">\${sale.id}</span>
                    </div>
                    
                    <div class="detail-row">
                      <span class="detail-label">회원 이름</span>
                      <span class="detail-value">\${sale.memberName}</span>
                    </div>
                    
                    <div class="detail-row">
                      <span class="detail-label">연락처</span>
                      <span class="detail-value">\${sale.memberPhone}</span>
                    </div>
                    
                    <div class="detail-row">
                      <span class="detail-label">매출 유형</span>
                      <span class="detail-value">\${sale.salesType}</span>
                    </div>
                    
                    <div class="detail-row">
                      <span class="detail-label">매출 항목</span>
                      <span class="detail-value">\${sale.salesItem}</span>
                    </div>
                    
                    <div class="detail-row">
                      <span class="detail-label">상품 금액</span>
                      <span class="detail-value">\${sale.productAmount.toLocaleString('ko-KR')}원</span>
                    </div>
                    
                    <div class="detail-row">
                      <span class="detail-label">결제 금액</span>
                      <span class="detail-value highlight">\${sale.amount.toLocaleString('ko-KR')}원</span>
                    </div>
                    
                    \${sale.unpaidAmount ? \`
                      <div class="detail-row">
                        <span class="detail-label">미납 금액</span>
                        <span class="detail-value unpaid-text">\${sale.unpaidAmount.toLocaleString('ko-KR')}원</span>
                      </div>
                    \` : ''}
                    
                    <div class="detail-row">
                      <span class="detail-label">결제 수단</span>
                      <span class="detail-value">\${sale.paymentMethod}</span>
                    </div>
                    
                    <div class="detail-row">
                      <span class="detail-label">결제 일시</span>
                      <span class="detail-value">\${sale.paymentDate}</span>
                    </div>
                    
                    <div class="detail-row">
                      <span class="detail-label">결제 담당자</span>
                      <span class="detail-value">\${sale.salesperson}</span>
                    </div>
                    
                    <div class="detail-row">
                      <span class="detail-label">영수증</span>
                      <span class="detail-value">\${sale.receiptAvailable ? '보유' : '미보유'}</span>
                    </div>
                  </div>
                  
                  <div class="modal-footer">
                    \${isUnpaid ? \`
                      <button class="modal-btn primary">결제 처리</button>
                    \` : ''}
                    <button class="modal-btn" onclick="closePaymentModal()">닫기</button>
                  </div>
                </div>
              </div>
            \`;
            
            const container = document.getElementById('payment-modal-container');
            container.innerHTML = modalHTML;
            container.style.display = 'block';
            document.body.style.overflow = 'hidden';
          }
          
          // 모달 닫기
          function closePaymentModal() {
            const container = document.getElementById('payment-modal-container');
            container.style.display = 'none';
            container.innerHTML = '';
            document.body.style.overflow = '';
          }
        `}} />
    </div>
  );
}
