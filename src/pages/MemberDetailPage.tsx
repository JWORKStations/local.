import type { FC } from 'hono/jsx'
import { getPaymentsByMember } from '../data/salesData'

// Mock member data
const memberDetail = {
  id: '1',
  name: '김현조',
  status: '유효',
  phone: '010-5403-0032',
  birthDate: '2006.05.02',
  gender: '남',
  address: '(38+) 서��� 은천동 160 (능+등, 한마루아파트)',
  registeredDate: '2023.03.17',
  expiryDate: '2025.05.17',
  membership: '일반회원 +- 172',
  grade: '2378',
  points: 'O',
  
  // 추가 정보
  manager: '이돈',
  exerciseGoal: '체중 감량, 근력 증가',
  availableTime: '평일 오후 6-9시',
  
  // 출석 정보
  totalVisits: '3회',
  lastVisit: '2025.11.28',
  
  // 결제 정보
  totalPayment: '248,000원',
  paymentDate: '2026.02.26',
  
  // 잔여 횟수
  remainingSessions: '88일',
  
  // 등록 상품
  products: [
    {
      id: '1',
      name: '회원권',
      type: '12개월',
      status: '진행중',
      remainingDays: 88,
      startDate: '2025.01.27',
      expiryDate: '2026.01.27'
    },
    {
      id: '2',
      name: '개인락커',
      type: '3개월, 대여',
      status: '진행중',
      remainingDays: 45,
      startDate: '2025.01.22',
      expiryDate: '2025.04.22',
      lockerZone: 'A구역',
      lockerNumber: '12'
    }
  ],
  
  // 출석 기록
  visitHistory: [
    { date: '2025.11.28 (금)', time: '23:13', action: 'delete' },
    { date: '2025.11.27 (목)', time: '22:40', action: 'delete' },
    { date: '2025.11.27 (일)', time: '00:14', action: 'delete' }
  ],
  
  // 결제 내역
  paymentHistory: [
    {
      id: '1b044ec2',
      product: '개인레커 2개월',
      method: '카드',
      amount: '33,000원',
      cumulative: '33,000원',
      date: '2025.11.27 22:40',
      receipt: true
    },
    {
      id: 'a3f3c808',
      product: '비디스타일 회원권 3개월',
      method: '카드',
      amount: '108,000원',
      cumulative: '108,000원',
      date: '2025.11.27 22:40',
      receipt: true
    },
    {
      id: '877bfab4',
      product: '1회이용권 소4인',
      method: '카드',
      amount: '17,000원',
      cumulative: '17,000원',
      date: '2025.11.27 00:13',
      receipt: true
    }
  ],
  
  // 수업 예약 기록
  reservations: [
    { date: '오늘', count: '예약 없음' }
  ],
  
  // 노트
  notes: '작성된 노트가 없어요.'
}

export const MemberDetailPageActions: FC = () => {
  return (
    <div class="page-actions">
      <button type="button" class="btn btn-secondary">
        계약서 관리
      </button>
      <button type="button" class="btn btn-secondary">
        출입 관리
      </button>
    </div>
  )
}

export const MemberDetailPage: FC<{ memberId?: string }> = ({ memberId }) => {
  return (
    <div class="member-detail-page">
      {/* Profile Header */}
      <section class="member-profile-header">
        <div class="member-profile-main">
          <div class="member-avatar-large">
            {memberDetail.name.charAt(0)}
          </div>
          <div class="member-profile-info">
            <div class="member-profile-name-row">
              <h2 class="member-profile-name">{memberDetail.name}</h2>
              <span class={`status-badge ${
                memberDetail.status === '유효' ? 'status-badge--valid' :
                memberDetail.status === '만료' ? 'status-badge--expired' :
                memberDetail.status === '예비' ? 'status-badge--prospect' :
                'status-badge--none'
              }`}>
                {memberDetail.status}
              </span>
            </div>
            <p class="member-profile-phone">{memberDetail.phone}</p>
            <div class="member-profile-actions">
              <button type="button" class="btn btn-outline btn-sm">
                계약서 관리
              </button>
              <button type="button" class="btn btn-outline btn-sm">
                출입 관리
              </button>
            </div>
          </div>
          
          {/* Basic Info Grid - moved to right side */}
          <div class="member-info-grid" onclick="openMemberEditModal()" style="cursor: pointer;">
          <div class="member-info-item">
            <span class="member-info-label">생년월일</span>
            <span class="member-info-value">{memberDetail.birthDate}</span>
          </div>
          <div class="member-info-item">
            <span class="member-info-label">성별</span>
            <span class="member-info-value">{memberDetail.gender}</span>
          </div>
          <div class="member-info-item">
            <span class="member-info-label">연락처</span>
            <span class="member-info-value">{memberDetail.phone}</span>
          </div>
          <div class="member-info-item">
            <span class="member-info-label">주소</span>
            <span class="member-info-value">{memberDetail.address}</span>
          </div>
          <div class="member-info-item">
            <span class="member-info-label">담당자</span>
            <span class="member-info-value">{memberDetail.manager}</span>
          </div>
          <div class="member-info-item">
            <span class="member-info-label">운동목적</span>
            <span class="member-info-value">{memberDetail.exerciseGoal}</span>
          </div>
          <div class="member-info-item">
            <span class="member-info-label">운동가능시간대</span>
            <span class="member-info-value">{memberDetail.availableTime}</span>
          </div>
        </div>
        </div>
      </section>

      {/* 4-COLUMN GRID LAYOUT */}
      <div class="member-grid-4col">
        {/* 1. 이용중인 상품 */}
        <section class="detail-panel products-section">
          <div class="detail-panel-header">
            <div class="tabs-header">
              <button class="tab-btn active" onclick="filterProducts(this, 'current')">이용중인 상품</button>
              <button class="tab-btn" onclick="filterProducts(this, 'past')">지난 상품</button>
            </div>
            <button type="button" class="btn-icon-sm" onclick="openProductModal()">+</button>
          </div>
          <div class="detail-panel-body products-list">
            {memberDetail.products.map((product) => (
              <div class="product-list-item" data-status={product.status} key={product.id}>
                <div class="product-list-icon">●</div>
                <div class="product-list-content">
                  <div class="product-list-header">
                    <strong class="product-list-name">{product.name}</strong>
                    <span class="product-list-badge">{product.type}</span>
                  </div>
                  <div class="product-list-period">
                    {product.lockerZone && product.lockerNumber && (
                      <span>{product.lockerZone}-{product.lockerNumber} / </span>
                    )}
                    잔여 {product.remainingDays}일 ({product.startDate} ~ {product.expiryDate})
                  </div>
                </div>
                <button type="button" class="btn-icon-sm product-menu-btn">⋯</button>
              </div>
            ))}
          </div>
        </section>

        {/* 2. 출석 기록 */}
        <section class="detail-panel attendance-section">
          <div class="detail-panel-header">
            <h3>출석 기록 <span class="count-badge">최근 30일 ›</span></h3>
            <div class="attendance-view-toggle">
              <button type="button" class="view-toggle-btn active" data-view="list" onclick="toggleAttendanceView('list')">
                <span class="toggle-icon">☰</span>
              </button>
              <button type="button" class="view-toggle-btn" data-view="calendar" onclick="toggleAttendanceView('calendar')">
                <span class="toggle-icon">📅</span>
              </button>
            </div>
          </div>
          
          {/* 리스트 뷰 */}
          <div class="detail-panel-body attendance-list" id="attendanceListView">
            {memberDetail.visitHistory.map((visit, idx) => (
              <div class="attendance-list-item" key={idx}>
                <div class="attendance-list-icon">●</div>
                <div class="attendance-list-content">
                  <span class="attendance-list-date">{visit.date}</span>
                  <span class="attendance-list-time">{visit.time}</span>
                </div>
                <button type="button" class="btn-icon-xs text-error">×</button>
              </div>
            ))}
          </div>
          
          {/* 캘린더 뷰 */}
          <div class="detail-panel-body attendance-calendar" id="attendanceCalendarView" style="display: none;">
            <div class="calendar-header">
              <button type="button" class="calendar-nav-btn" onclick="changeMonth(-1)">‹</button>
              <span class="calendar-title" id="calendarTitle">2025년 12월</span>
              <button type="button" class="calendar-nav-btn" onclick="changeMonth(1)">›</button>
            </div>
            <div class="calendar-grid" id="calendarGrid">
              <div class="calendar-weekday">일</div>
              <div class="calendar-weekday">월</div>
              <div class="calendar-weekday">화</div>
              <div class="calendar-weekday">수</div>
              <div class="calendar-weekday">목</div>
              <div class="calendar-weekday">금</div>
              <div class="calendar-weekday">토</div>
              {/* 캘린더 날짜들은 JavaScript로 동적 생성되어 여기에 추가됨 */}
            </div>
          </div>
        </section>

        {/* 3. 수업 예약기록 */}
        <section class="detail-panel reservation-section">
          <div class="detail-panel-header">
            <h3>수업 예약기록 <span class="count-badge">최근 30회 ›</span></h3>
          </div>
          <div class="detail-panel-body">
            <div class="empty-state">
              <p>수업 예약기록이 없어요.</p>
            </div>
          </div>
        </section>

        {/* 4. 2x2 통계 카드 그리드 (Row 1 맨 오른쪽) */}
        <div class="stat-cards-wrapper">
          <div class="stat-cards-grid-2x2">
            {/* 최근 출석 */}
            <div class="stat-card-compact">
              <div class="stat-card-header">
                <span class="stat-icon">📅</span>
                <h4>최근 출석</h4>
              </div>
              <div class="stat-card-body">
                <div class="stat-value-row">
                  <span class="stat-label">오늘 출석</span>
                </div>
                <div class="stat-date">2회</div>
                <div class="stat-date">최종 출석일: 0 출석</div>
              </div>
            </div>

            {/* 누적출석횟수 */}
            <div class="stat-card-compact">
              <div class="stat-card-header">
                <span class="stat-icon">🏃‍♂️</span>
                <h4>누적출석횟수</h4>
              </div>
              <div class="stat-card-body">
                <div class="stat-value-row">
                  <span class="stat-label">69회</span>
                </div>
                <div class="stat-date">최종 출석일: 2025.05.27</div>
              </div>
            </div>

            {/* 인바디 */}
            <div class="stat-card-compact">
              <div class="stat-card-header">
                <span class="stat-icon">⚖️</span>
                <h4>인바디</h4>
              </div>
              <div class="stat-card-body">
                <div class="stat-value-row">
                  <span class="stat-label">6일</span>
                </div>
                <div class="stat-date">측정일: 2025.12.16</div>
              </div>
            </div>

            {/* 누적결제금액 */}
            <div class="stat-card-compact">
              <div class="stat-card-header">
                <span class="stat-icon">💎</span>
                <h4>누적결제금액</h4>
              </div>
              <div class="stat-card-body">
                <div class="stat-value-row">
                  <span class="stat-label">352,000원</span>
                </div>
                <div class="stat-date">결제 건수: 2회</div>
              </div>
            </div>
          </div>
        </div>

        {/* ROW 2: 결제 내역 (2칸) | 수업일지 (1칸) | 노트 (1칸) */}

        {/* 5. 결제 내역 - spans 2 columns */}
        <section class="detail-panel payment-section">
            <div class="detail-panel-header">
              <h3>결제 내역</h3>
            </div>
            <div class="detail-panel-body">
              <div class="payment-table-wrapper">
                <table class="payment-table">
                  <thead>
                    <tr>
                      <th>결제번호</th>
                      <th>상품 이름</th>
                      <th>결제수단</th>
                      <th>결제금액</th>
                      <th>누적금액</th>
                      <th>결제일시</th>
                      <th>영수증</th>
                    </tr>
                  </thead>
                  <tbody>
                    {memberDetail.paymentHistory.map((payment) => (
                      <tr key={payment.id} style="cursor: pointer;" onclick={`window.location.href='/sales?payment=${payment.id}'`}>
                        <td>
                          <code class="payment-id" style="color: var(--accent-purple); text-decoration: underline;">{payment.id} ›</code>
                        </td>
                        <td class="payment-product">{payment.product}</td>
                        <td>
                          <span class="payment-method-badge">{payment.method}</span>
                        </td>
                        <td class="text-right">{payment.amount}</td>
                        <td class="text-right">{payment.cumulative}</td>
                        <td class="text-secondary">{payment.date}</td>
                        <td class="text-center">
                          {payment.receipt && (
                            <button type="button" class="btn-icon-sm" onclick="event.stopPropagation()">📄</button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
        </section>

        {/* 6. 수업일지 */}
        <section class="detail-panel class-log-section">
          <div class="detail-panel-header">
            <h3>수업일지</h3>
            <button type="button" class="btn-icon-sm">+</button>
          </div>
          <div class="detail-panel-body">
            <div class="empty-state">
              <p>작성된 수업일지가 없어요.</p>
            </div>
          </div>
        </section>

        {/* 7. 노트 */}
        <section class="detail-panel notes-section">
          <div class="detail-panel-header">
            <h3>노트</h3>
            <button type="button" class="btn-icon-sm">+</button>
          </div>
          <div class="detail-panel-body">
            <div class="empty-state">
              <p>{memberDetail.notes}</p>
            </div>
          </div>
        </section>
      </div>

      {/* 상품 배정 모달 */}
      <div id="productModal" class="modal-overlay" style="display: none;" onclick="closeProductModal(event)">
        <div class="modal-container-split" onclick="event.stopPropagation()">
          <div class="modal-header">
            <h2 class="modal-title">상품 배정하기</h2>
            <button class="modal-close" onclick="closeProductModal()">✕</button>
          </div>
          
          <div class="modal-body-split">
            {/* 왼쪽: 상품 선택 + 설정 */}
            <div class="modal-left-panel">
              <p class="modal-description">최적순번에게 상품을 배정합니다.</p>
              
              {/* 파란색 영역: 상품 선택 탭 */}
              <div class="product-selection-tabs">
                <div class="tabs-header">
                  <button class="tab-btn active" onclick="switchTab(this, 'all')">전체상품</button>
                  <button class="tab-btn" onclick="switchTab(this, 'membership')">회원권</button>
                  <button class="tab-btn" onclick="switchTab(this, 'lesson')">개인레슨</button>
                  <button class="tab-btn" onclick="switchTab(this, 'rental')">대여상품</button>
                </div>
                
                <div class="product-tags-grid">
                  <button class="product-tag-btn" onclick="selectProduct(this)">PT제품군 / 개인PT</button>
                  <button class="product-tag-btn" onclick="selectProduct(this)">기존속성 / 최근군</button>
                  <button class="product-tag-btn" onclick="selectProduct(this)">알이민패키지 / 99-OK 예약 업데이터</button>
                  <button class="product-tag-btn" onclick="selectProduct(this)">알이민패키지 / 비타민신상품 업데이터</button>
                  <button class="product-tag-btn" onclick="selectProduct(this)">알이민패키지 / 수강 업데이트</button>
                  <button class="product-tag-btn" onclick="selectProduct(this)">알이민패키지 / 고급수신 사전예약</button>
                  <button class="product-tag-btn" onclick="selectProduct(this)">알이민패키지 / OT</button>
                  <button class="product-tag-btn" onclick="selectProduct(this)">일반 · 회원권 / 알임비의 핵심</button>
                  <button class="product-tag-btn" onclick="selectProduct(this)">알이민패키지 / 업데이터종류</button>
                  <button class="product-tag-btn" onclick="selectProduct(this)">알이민패키지 / 비쥬얼핵심</button>
                </div>
              </div>

              {/* 빨간색 영역: 상품 설정 폼 */}
              <div class="product-config-form" id="productConfigForm" style="display: none;">
                <div class="form-section-title">
                  <span class="selected-product-name">선택한 상품 정보</span>
                  <button class="btn-remove" onclick="clearProductSelection()">✕</button>
                </div>

                <div class="config-field-row">
                  <div class="config-field config-field-half">
                    <label>기간 선택</label>
                    <select class="config-select" id="periodSelect" onchange="updateDateRange()">
                      <option value="1">1개월</option>
                      <option value="3">3개월</option>
                      <option value="6">6개월</option>
                      <option value="12" selected>12개월</option>
                      <option value="24">24개월</option>
                    </select>
                  </div>
                  <div class="config-field config-field-half">
                    <label>결제 담당자</label>
                    <select class="config-select">
                      <option>담당자 선택</option>
                      <option>김철수</option>
                      <option>이영희</option>
                      <option>박민수</option>
                    </select>
                  </div>
                </div>

                <div class="config-field-row">
                  <div class="config-field config-field-two-thirds">
                    <label>사용 기간</label>
                    <div class="date-range">
                      <input type="date" class="date-input-field" id="startDate" onchange="updateEndDate()" />
                      <span>~</span>
                      <input type="date" class="date-input-field" id="endDate" readonly />
                    </div>
                  </div>
                  <div class="config-field config-field-one-third">
                    <label>서비스 기간 추가</label>
                    <select class="config-select" id="servicePeriodAdd" onchange="updateEndDate()">
                      <option value="0">추가 없음</option>
                      <option value="7">+7일</option>
                      <option value="14">+14일</option>
                      <option value="30">+1개월</option>
                      <option value="60">+2개월</option>
                    </select>
                  </div>
                </div>

                <div class="config-field config-field-half-width">
                  <label>결제일시</label>
                  <input type="datetime-local" class="date-input-field" id="paymentDateTime" />
                </div>

                {/* 금액 정보 (4열 그리드) */}
                <div class="amount-grid-section">
                  <div class="amount-grid-column">
                    <div class="amount-grid-label">상품 가격</div>
                    <div class="amount-grid-value" id="productPrice">264,000 원</div>
                  </div>
                  <div class="amount-grid-column amount-grid-column-discount" id="discountColumn">
                    <div class="amount-grid-label" id="discountLabel">할인</div>
                    <div class="amount-grid-discount" id="discountAmount">0 원</div>
                  </div>
                  <div class="amount-grid-column">
                    <div class="amount-grid-label">판매금액</div>
                    <div class="amount-grid-value" id="salePrice">264,000 원</div>
                  </div>
                  <div class="amount-grid-column">
                    <div class="amount-grid-label">받은금액</div>
                    <div class="amount-grid-value" id="receivedAmount">264,000 원</div>
                    <div class="amount-grid-unpaid" id="unpaidAmountDisplay">미수금 0원</div>
                  </div>
                </div>

                {/* 결제수단 섹션 */}
                <div class="payment-method-section">
                  <div class="payment-header-row">
                    <span class="payment-header-label">결제수단</span>
                    <span class="payment-header-label">판매금액</span>
                    <span class="payment-header-label">받은금액</span>
                    <span class="payment-header-spacer"></span>
                  </div>
                  <div class="payment-method-list" id="paymentMethodList">
                    <div class="payment-method-item payment-method-item-first">
                      <select class="payment-method-select">
                        <option>카드</option>
                        <option>현금</option>
                        <option>계좌이체</option>
                      </select>
                      <input type="text" class="payment-sale-input" placeholder="판매금액" value="264,000" oninput="syncSaleToReceived(this); calculatePaymentTotal()" />
                      <input type="text" class="payment-received-input" placeholder="받은금액" value="264,000" oninput="calculatePaymentTotal()" />
                      <button class="btn-remove-payment" onclick="removePaymentMethod(this)" style="visibility: hidden;">✕</button>
                    </div>
                  </div>
                  <button class="btn-add-payment" onclick="addPaymentMethod()">+ 결제수단 추가</button>
                </div>

                <div class="form-actions">
                  <button class="btn-add-product" onclick="addProductToList()">선택하기 ▼</button>
                </div>
              </div>
            </div>

            {/* 오른쪽: 초록색 영역 - 선택된 상품 목록 */}
            <div class="modal-right-panel">
              <div class="selected-products-title">선택한 상품</div>
              <div class="selected-products-list" id="selectedProductsList">
                <div class="empty-state-selection">
                  상품을 선택하세요.
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button class="modal-btn modal-btn-cancel" onclick="closeProductModal()">취소</button>
            <button class="modal-btn modal-btn-purple">배정하기</button>
          </div>
        </div>
      </div>

      {/* 회원 정보 수정 모달 */}
      <div id="memberEditModal" class="modal-overlay" style="display: none;">
        <div class="modal-container-edit">
          <div class="modal-header">
            <h3 class="modal-title">회원 정보</h3>
            <button class="modal-close" onclick="closeMemberEditModal()">✕</button>
          </div>

          <div class="modal-body-edit">
            {/* 프로필 사진 */}
            <div class="edit-profile-section">
              <div class="edit-profile-avatar">
                <div class="member-avatar-large">{memberDetail.name.charAt(0)}</div>
              </div>
            </div>

            {/* 이름 */}
            <div class="edit-field">
              <label class="edit-label">이름</label>
              <input type="text" id="memberName" class="edit-input" value={memberDetail.name} />
            </div>

            {/* 연락처 */}
            <div class="edit-field">
              <label class="edit-label">연락처</label>
              <input type="text" id="memberPhone" class="edit-input" value={memberDetail.phone} />
            </div>

            {/* 성별 */}
            <div class="edit-field">
              <label class="edit-label">성별</label>
              <div class="edit-radio-group">
                <label class="edit-radio-label">
                  <input type="radio" name="gender" value="남자" checked={memberDetail.gender === '남'} />
                  <span>남자</span>
                </label>
                <label class="edit-radio-label">
                  <input type="radio" name="gender" value="여자" checked={memberDetail.gender === '여'} />
                  <span>여자</span>
                </label>
              </div>
            </div>

            {/* 생년월일 */}
            <div class="edit-field">
              <label class="edit-label">생년월일(선택)</label>
              <div class="edit-date-group">
                <input type="text" id="birthYear" class="edit-input-small" placeholder="2010" value="2006" />
                <span>년</span>
                <input type="text" id="birthMonth" class="edit-input-small" placeholder="11" value="5" />
                <span>월</span>
                <input type="text" id="birthDay" class="edit-input-small" placeholder="23" value="2" />
                <span>일</span>
              </div>
            </div>

            {/* 주소 */}
            <div class="edit-field">
              <label class="edit-label">주소(선택)</label>
              <div class="edit-address-group">
                <input type="text" id="memberAddress" class="edit-input" placeholder="주소 검색" readonly onclick="openAddressSearch()" style="cursor: pointer;" />
                <button type="button" class="btn-address-search" onclick="openAddressSearch()">
                  <i class="fas fa-search"></i>
                </button>
              </div>
            </div>

            {/* 상세주소 */}
            <div class="edit-field">
              <label class="edit-label">상세주소(선택)</label>
              <input type="text" id="memberDetailAddress" class="edit-input" placeholder="상세주소를 입력해 주세요." />
            </div>

            {/* 담당자 */}
            <div class="edit-field">
              <label class="edit-label">담당자(선택)</label>
              <select id="memberManager" class="edit-input">
                <option>이돈</option>
                <option>김철수</option>
                <option>이영희</option>
              </select>
            </div>

            {/* 수퍼관리자 */}
            <div class="edit-field">
              <label class="edit-label">수퍼관리자(선택)</label>
              <input type="text" class="edit-input" placeholder="수퍼관리자를 입력해주세요" />
            </div>

            {/* 운동목적 */}
            <div class="edit-field">
              <label class="edit-label">운동목적(선택)</label>
              <input type="text" class="edit-input" id="exerciseGoal" placeholder="예: 체중 감량, 근력 증가" value={memberDetail.exerciseGoal} />
            </div>

            {/* 운동가능시간대 */}
            <div class="edit-field">
              <label class="edit-label">운동가능시간대(선택)</label>
              <input type="text" class="edit-input" id="exerciseTime" placeholder="예: 평일 오후 6-9시" value={memberDetail.availableTime} />
            </div>

            {/* 등록사유 */}
            <div class="edit-field">
              <label class="edit-label">등록사유(선택)</label>
              <textarea class="edit-textarea" id="registrationReason" rows="3" placeholder="등록 사유를 입력해 주세요."></textarea>
            </div>
          </div>

          <div class="modal-footer">
            <button class="modal-btn modal-btn-cancel" onclick="closeMemberEditModal()">취소</button>
            <button class="modal-btn modal-btn-primary" onclick="saveMemberInfo()">저장</button>
          </div>
        </div>
      </div>

      {/* Daum Postcode API */}
      <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>

    </div>
  )
}
