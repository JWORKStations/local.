import type { FC } from 'hono/jsx'

// Mock prospect members data
const mockProspects = [
  {
    id: '1',
    name: '박기영',
    phone: '010-****-2796',
    gender: '남',
    status: '방문',
    entryDate: '-',
    entrySource: '-',
    memo: '이말수 회 > 수 운동을 오후6시1 이후 방문무 잘해주고 이용일고일을'
  },
  {
    id: '2',
    name: '김은선',
    phone: '010-****-1335',
    gender: '여',
    status: '방문',
    entryDate: '취고미',
    entrySource: '-',
    memo: '유튜영향 오후산성관 취고미 임양일은 지금은 말미 방문 필스 무 주명인 임고앙6 먹실모 태스월모 마규가운 움직 동래 등릉 먹싱번리점 임생복시점 등릉 기륙소스 전동목 먹사성재점으 등등부에마운디 디상일관점구만[1년 이용일가일구만]'
  },
  {
    id: '3',
    name: '윤지운',
    phone: '010-****-7927',
    gender: '남',
    status: '전화',
    entryDate: '네이버에약',
    entrySource: '-',
    memo: '2도천 3월 래비1 노스, 7월 래비1 노스'
  },
  {
    id: '4',
    name: '신클리샤',
    phone: '010-****-9324',
    gender: '남',
    status: '전화',
    entryDate: 'N전화약',
    entrySource: '-',
    memo: 'PT상담, 6개월 래비약 바람요'
  },
  {
    id: '5',
    name: '이예안',
    phone: '010-****-5444',
    gender: '여',
    status: '방문',
    entryDate: '-',
    entrySource: '-',
    memo: '3만원일 24시간 운영, 타이다는 무거운 운마 뭄타 등 항목 관심 있음, 타게 먹싱일 관심, TM1 6월 10일 ~ 오후도 일생래이더 금오로스 나기가 가찾이하와 가블저다 이용하고 있고도 반영 또 먹싱래미가 발고 미리 FC영향6 먹싱래기로 릉'
  },
  {
    id: '6',
    name: '김종운',
    phone: '010-****-7837',
    gender: '남',
    status: '방문',
    entryDate: '취고미',
    entrySource: '-',
    memo: '웰스토이링 다나노토 기간은 가점릉산들 만권, 션구앙미 릉'
  }
]

export const ProspectMembersPageActions: FC = () => {
  return (
    <div class="page-actions">
      <button type="button" class="btn btn-primary">
        + 신규 예비회원 등록
      </button>
    </div>
  )
}

export const ProspectMembersPage: FC = () => {
  return (
    <section class="members-page">
      {/* Tabs */}
      <div class="members-tabs" role="tablist">
        <a href="/members" role="tab" class="members-tab">
          회원
        </a>
        <a href="/members/prospects" role="tab" class="members-tab is-active" aria-selected="true">
          예비회원
        </a>
        <a href="/members/orientation" role="tab" class="members-tab">
          OT 리스트
        </a>
        <a href="/members/referrals" role="tab" class="members-tab">
          추천리스트
        </a>
        <a href="/members/contracts" role="tab" class="members-tab">
          전자계약 설정
        </a>
      </div>

      {/* Search Bar */}
      <div class="prospect-search-section">
        <div class="search-input-wrapper">
          <span class="search-icon">🔍</span>
          <input 
            type="search" 
            placeholder="예비 회원 검색" 
            class="search-input-large"
          />
        </div>
      </div>

      {/* Filters and Actions */}
      <div class="members-filters">
        <div class="filters-container">
          <div class="filter-row">
            <button type="button" class="filter-dropdown">
              <span>상태</span>
              <span class="filter-dropdown__icon">▾</span>
            </button>
            <button type="button" class="filter-dropdown">
              <span>등록일자</span>
              <span class="filter-dropdown__icon">▾</span>
            </button>
            <button type="button" class="filter-dropdown">
              <span>유입경로</span>
              <span class="filter-dropdown__icon">▾</span>
            </button>
          </div>
          <div class="filter-actions">
            <button type="button" class="btn btn-ghost btn-sm">필터 초기화</button>
            <button type="button" class="btn btn-ghost btn-sm">엑셀 다운로드</button>
            <button type="button" class="btn btn-ghost btn-sm">예약 다운로드</button>
          </div>
        </div>
      </div>

      {/* Total Count */}
      <div class="table-header-info">
        <h3 class="total-count">전체 <strong>{mockProspects.length}명</strong></h3>
      </div>

      {/* Prospects Table */}
      <div class="members-table-wrapper">
        <table class="members-table prospects-table">
          <thead>
            <tr>
              <th>예비회원명</th>
              <th>성별</th>
              <th>유입일자</th>
              <th>유입경로</th>
              <th class="memo-column">메모</th>
            </tr>
          </thead>
          <tbody>
            {mockProspects.map((prospect) => (
              <tr key={prospect.id}>
                <td>
                  <div class="prospect-name-cell">
                    <strong class="prospect-name">{prospect.name}</strong>
                    <span class="prospect-phone">{prospect.phone}</span>
                  </div>
                </td>
                <td>
                  <span class="gender-badge">{prospect.gender}</span>
                </td>
                <td class="text-secondary">{prospect.status}</td>
                <td class="text-secondary">{prospect.entryDate}</td>
                <td class="memo-cell">
                  <p class="memo-text">{prospect.memo}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div class="pagination">
        <button type="button" class="pagination-btn" aria-label="이전 페이지">
          ‹
        </button>
        <button type="button" class="pagination-btn is-active">
          1
        </button>
        <button type="button" class="pagination-btn">
          2
        </button>
        <button type="button" class="pagination-btn">
          3
        </button>
        <button type="button" class="pagination-btn">
          4
        </button>
        <button type="button" class="pagination-btn">
          5
        </button>
        <span class="pagination-ellipsis">...</span>
        <button type="button" class="pagination-btn">
          20
        </button>
        <button type="button" class="pagination-btn" aria-label="다음 페이지">
          ›
        </button>
      </div>
    </section>
  )
}
