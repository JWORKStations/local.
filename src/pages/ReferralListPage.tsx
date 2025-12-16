import type { FC } from 'hono/jsx'

interface ReferralRecord {
  id: string
  // 추천받은 회원 (신규 가입자)
  newMemberId: string
  newMemberName: string
  newMemberPhone: string
  newMemberGender: '남' | '여'
  newMemberRegisteredDate: string
  
  // 추천한 회원 (기존 회원)
  referrerId: string
  referrerName: string
  referrerPhone: string
  referrerGender: '남' | '여'
  referrerMembershipType: string
  
  // 추천 정보
  referralDate: string
  benefitStatus: '지급 완료' | '지급 대기' | '처리중'
  benefitType: string
  memo: string
  
  // 누적 통계
  referrerTotalReferrals: number // 추천한 회원의 총 추천 횟수
  newMemberReferredCount: number // 추천받은 회원이 받은 총 추천 횟수
}

// Mock referral data (최신순)
const mockReferrals: ReferralRecord[] = [
  {
    id: '1',
    newMemberId: '1',
    newMemberName: '홍서현',
    newMemberPhone: '010-1234-8727',
    newMemberGender: '여',
    newMemberRegisteredDate: '2025.11.29',
    referrerId: '5',
    referrerName: '이시아',
    referrerPhone: '010-7890-9406',
    referrerGender: '여',
    referrerMembershipType: '비디스타 회원권 6개월',
    referralDate: '2025.11.29',
    benefitStatus: '지급 대기',
    benefitType: '1일 이용권',
    memo: '친구 추천으로 가입',
    referrerTotalReferrals: 3,
    newMemberReferredCount: 1,
  },
  {
    id: '2',
    newMemberId: '8',
    newMemberName: '송시우',
    newMemberPhone: '010-1357-9560',
    newMemberGender: '남',
    newMemberRegisteredDate: '2025.11.28',
    referrerId: '2',
    referrerName: '안지수',
    referrerPhone: '010-5678-5090',
    referrerGender: '여',
    referrerMembershipType: '비디스타 회원권 6개월',
    referralDate: '2025.11.28',
    benefitStatus: '지급 완료',
    benefitType: '1일 이용권',
    memo: '회사 동료 추천',
    referrerTotalReferrals: 5,
    newMemberReferredCount: 1,
  },
  {
    id: '3',
    newMemberId: '11',
    newMemberName: '박민준',
    newMemberPhone: '010-2222-3333',
    newMemberGender: '남',
    newMemberRegisteredDate: '2025.11.25',
    referrerId: '7',
    referrerName: '최순자',
    referrerPhone: '010-6789-9927',
    referrerGender: '여',
    referrerMembershipType: '비디스타 회원권 6개월',
    referralDate: '2025.11.25',
    benefitStatus: '지급 완료',
    benefitType: '1일 이용권',
    memo: '이웃 추천',
    referrerTotalReferrals: 2,
    newMemberReferredCount: 1,
  },
  {
    id: '4',
    newMemberId: '12',
    newMemberName: '이서연',
    newMemberPhone: '010-4444-5555',
    newMemberGender: '여',
    newMemberRegisteredDate: '2025.11.22',
    referrerId: '10',
    referrerName: '박다영',
    referrerPhone: '010-9753-0846',
    referrerGender: '여',
    referrerMembershipType: '비디스타 회원권 6개월',
    referralDate: '2025.11.22',
    benefitStatus: '지급 완료',
    benefitType: '1일 이용권',
    memo: '지인 추천',
    referrerTotalReferrals: 1,
    newMemberReferredCount: 1,
  },
  {
    id: '5',
    newMemberId: '13',
    newMemberName: '최유진',
    newMemberPhone: '010-6666-7777',
    newMemberGender: '여',
    newMemberRegisteredDate: '2025.11.20',
    referrerId: '5',
    referrerName: '이시아',
    referrerPhone: '010-7890-9406',
    referrerGender: '여',
    referrerMembershipType: '비디스타 회원권 6개월',
    referralDate: '2025.11.20',
    benefitStatus: '지급 완료',
    benefitType: '2일 이용권',
    memo: '가족 추천',
    referrerTotalReferrals: 3,
    newMemberReferredCount: 1,
  },
  {
    id: '6',
    newMemberId: '14',
    newMemberName: '김태현',
    newMemberPhone: '010-8888-9999',
    newMemberGender: '남',
    newMemberRegisteredDate: '2025.11.18',
    referrerId: '2',
    referrerName: '안지수',
    referrerPhone: '010-5678-5090',
    referrerGender: '여',
    referrerMembershipType: '비디스타 회원권 6개월',
    referralDate: '2025.11.18',
    benefitStatus: '지급 완료',
    benefitType: '1일 이용권',
    memo: '동문 추천',
    referrerTotalReferrals: 5,
    newMemberReferredCount: 1,
  },
]

export const ReferralListPage: FC = () => {
  // 기본값: 추천받은 회원 기준 (최신순)
  const viewMode = '추천받은 회원'
  
  return (
    <section class="referral-page">
      {/* Tabs Navigation */}
      <div class="members-tabs" role="tablist">
        <a href="/members" role="tab" class="members-tab">
          회원
        </a>
        <a href="/members/prospects" role="tab" class="members-tab">
          예비회원
        </a>
        <a href="/members/orientation" role="tab" class="members-tab">
          OT 리스트
        </a>
        <a href="/members/referrals" role="tab" class="members-tab is-active" aria-selected="true">
          추천리스트
        </a>
        <a href="/members/contracts" role="tab" class="members-tab">
          전자계약 설정
        </a>
      </div>

      {/* Header with View Mode Toggle */}
      <div class="referral-header">
        <div class="referral-stats">
          <span class="stat-label">전체 추천 건수</span>
          <strong class="stat-value stat-value--primary">{mockReferrals.length}건</strong>
        </div>
        <div class="referral-controls">
          <div class="view-mode-toggle">
            <button type="button" class="toggle-btn is-active">
              추천받은 회원 기준
            </button>
            <button type="button" class="toggle-btn">
              추천한 회원 기준
            </button>
          </div>
          <div class="referral-actions">
            <button type="button" class="btn btn-ghost btn-sm">
              필터 초기화
            </button>
            <button type="button" class="btn btn-ghost btn-sm">
              엑셀 다운로드
            </button>
          </div>
        </div>
      </div>

      {/* Referral List Table */}
      <div class="referral-table-wrapper">
        <table class="referral-table">
          <thead>
            <tr>
              <th class="th-date" rowspan="2">추천일</th>
              <th colspan="3" class="th-section-header">추천받은 회원 (신규 가입)</th>
              <th colspan="3" class="th-section-header">추천한 회원 (기존 회원)</th>
              <th colspan="3" class="th-section-header">혜택 정보</th>
            </tr>
            <tr>
              <th class="th-sub">회원정보</th>
              <th class="th-sub">등록일</th>
              <th class="th-sub">추천받은 횟수</th>
              <th class="th-sub">회원정보</th>
              <th class="th-sub">회원권</th>
              <th class="th-sub">누적 추천</th>
              <th class="th-sub">혜택 내용</th>
              <th class="th-sub">지급 상태</th>
              <th class="th-sub">메모</th>
            </tr>
          </thead>
          <tbody>
            {mockReferrals.map((referral) => (
              <tr key={referral.id} class="referral-row">
                <td class="td-date">
                  <span class="referral-date">{referral.referralDate}</span>
                </td>
                
                {/* 추천받은 회원 */}
                <td class="td-member">
                  <a href={`/members/${referral.newMemberId}`} class="member-cell member-cell-link">
                    <div class="member-avatar">{referral.newMemberName.charAt(0)}</div>
                    <div class="member-info">
                      <strong class="member-name">{referral.newMemberName}</strong>
                      <span class="member-phone">{referral.newMemberPhone}</span>
                      <span class="member-gender">{referral.newMemberGender}</span>
                    </div>
                  </a>
                </td>
                <td class="td-registered">
                  <span class="registered-date">{referral.newMemberRegisteredDate}</span>
                </td>
                <td class="td-count">
                  <div class="count-badge-wrapper">
                    <span class="count-badge count-badge--new">{referral.newMemberReferredCount}회</span>
                    {referral.newMemberReferredCount === 1 && (
                      <span class="first-badge">첫 추천</span>
                    )}
                  </div>
                </td>
                
                {/* 추천한 회원 */}
                <td class="td-member">
                  <a href={`/members/${referral.referrerId}`} class="member-cell member-cell-link">
                    <div class="member-avatar">{referral.referrerName.charAt(0)}</div>
                    <div class="member-info">
                      <strong class="member-name">{referral.referrerName}</strong>
                      <span class="member-phone">{referral.referrerPhone}</span>
                      <span class="member-gender">{referral.referrerGender}</span>
                    </div>
                  </a>
                </td>
                <td class="td-membership">
                  <span class="membership-badge">{referral.referrerMembershipType}</span>
                </td>
                <td class="td-count">
                  <span class={`count-badge ${referral.referrerTotalReferrals >= 5 ? 'count-badge--high' : referral.referrerTotalReferrals >= 3 ? 'count-badge--medium' : 'count-badge--low'}`}>
                    {referral.referrerTotalReferrals}회
                  </span>
                </td>
                
                {/* 혜택 정보 */}
                <td class="td-benefit">
                  <span class="benefit-type">{referral.benefitType}</span>
                </td>
                <td class="td-status">
                  <span class={`status-badge ${
                    referral.benefitStatus === '지급 완료' ? 'status-badge--complete' :
                    referral.benefitStatus === '지급 대기' ? 'status-badge--pending' :
                    'status-badge--processing'
                  }`}>
                    {referral.benefitStatus}
                  </span>
                </td>
                <td class="td-memo">
                  <span class="memo-text">{referral.memo}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {mockReferrals.length === 0 && (
        <div class="empty-state">
          <i class="fas fa-user-friends" style="font-size: 3rem; color: #94a3b8; margin-bottom: 1rem;"></i>
          <p class="empty-state-text">추천 기록이 없습니다.</p>
        </div>
      )}

      {/* Summary Stats */}
      <div class="referral-summary">
        <div class="summary-card">
          <div class="summary-icon">🎁</div>
          <div class="summary-content">
            <span class="summary-label">지급 대기</span>
            <strong class="summary-value">
              {mockReferrals.filter(r => r.benefitStatus === '지급 대기').length}건
            </strong>
          </div>
        </div>
        <div class="summary-card">
          <div class="summary-icon">✅</div>
          <div class="summary-content">
            <span class="summary-label">지급 완료</span>
            <strong class="summary-value">
              {mockReferrals.filter(r => r.benefitStatus === '지급 완료').length}건
            </strong>
          </div>
        </div>
        <div class="summary-card">
          <div class="summary-icon">👥</div>
          <div class="summary-content">
            <span class="summary-label">추천 회원 수</span>
            <strong class="summary-value">
              {new Set(mockReferrals.map(r => r.referrerId)).size}명
            </strong>
          </div>
        </div>
      </div>
    </section>
  )
}
