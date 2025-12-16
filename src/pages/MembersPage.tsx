import type { FC } from 'hono/jsx'

interface Member {
  id: string
  name: string
  phone: string
  gender: '남' | '여'
  birthDate: string
  status: '유효' | '만료' | '예비' | '미입력'
  membershipType: string
  expiryDate: string
  registeredDate: string
  visitCount: number
  remainingSessions: number
  totalSessions: number
}

const mockMembers: Member[] = [
  {
    id: '1',
    name: '홍서현',
    phone: '010-1234-8727',
    gender: '여',
    birthDate: '1990.05.15',
    status: '유효',
    membershipType: '비디스타 회원권 12개월',
    expiryDate: '2025.11.30',
    registeredDate: '2025.11.29',
    visitCount: 45,
    remainingSessions: 8,
    totalSessions: 12,
  },
  {
    id: '2',
    name: '안지수',
    phone: '010-5678-5090',
    gender: '여',
    birthDate: '1985.03.22',
    status: '유효',
    membershipType: '비디스타 회원권 6개월',
    expiryDate: '2025.11.30',
    registeredDate: '2025.05.30',
    visitCount: 78,
    remainingSessions: 0,
    totalSessions: 0,
  },
  {
    id: '3',
    name: '조정범',
    phone: '010-9012-8331',
    gender: '남',
    birthDate: '1981.01.25',
    status: '만료',
    membershipType: '비디스타 회원권 12개월',
    expiryDate: '2024.08.15',
    registeredDate: '2023.08.15',
    visitCount: 32,
    remainingSessions: 0,
    totalSessions: 0,
  },
  {
    id: '4',
    name: '김지후',
    phone: '010-3456-7648',
    gender: '남',
    birthDate: '1981.02.27',
    status: '예비',
    membershipType: '1회 이용권',
    expiryDate: '-',
    registeredDate: '2025.08.15',
    visitCount: 3,
    remainingSessions: 0,
    totalSessions: 0,
  },
  {
    id: '5',
    name: '이시아',
    phone: '010-7890-9406',
    gender: '여',
    birthDate: '1986.12.18',
    status: '유효',
    membershipType: '비디스타 회원권 6개월',
    expiryDate: '2026.05.31',
    registeredDate: '2024.11.30',
    visitCount: 89,
    remainingSessions: 0,
    totalSessions: 0,
  },
  {
    id: '6',
    name: '전준호',
    phone: '010-2345-6280',
    gender: '남',
    birthDate: '1992.08.10',
    status: '만료',
    membershipType: '비디스타 회원권 12개월',
    expiryDate: '2024.06.30',
    registeredDate: '2023.06.30',
    visitCount: 102,
    remainingSessions: 0,
    totalSessions: 0,
  },
  {
    id: '7',
    name: '최순자',
    phone: '010-6789-9927',
    gender: '여',
    birthDate: '1975.06.03',
    status: '유효',
    membershipType: '비디스타 회원권 6개월',
    expiryDate: '2025.11.30',
    registeredDate: '2025.05.30',
    visitCount: 67,
    remainingSessions: 0,
    totalSessions: 0,
  },
  {
    id: '8',
    name: '송시우',
    phone: '010-1357-9560',
    gender: '남',
    birthDate: '1988.09.14',
    status: '미입력',
    membershipType: '-',
    expiryDate: '-',
    registeredDate: '2025.11.28',
    visitCount: 0,
    remainingSessions: 0,
    totalSessions: 0,
  },
  {
    id: '9',
    name: '로다영',
    phone: '010-2468-1806',
    gender: '여',
    birthDate: '1986.03.10',
    status: '예비',
    membershipType: '1회 이용권',
    expiryDate: '-',
    registeredDate: '2025.05.30',
    visitCount: 2,
    remainingSessions: 0,
    totalSessions: 0,
  },
  {
    id: '10',
    name: '박다영',
    phone: '010-9753-0846',
    gender: '여',
    birthDate: '1986.03.10',
    status: '유효',
    membershipType: '비디스타 회원권 6개월',
    expiryDate: '2025.11.30',
    registeredDate: '2025.05.30',
    visitCount: 52,
    remainingSessions: 0,
    totalSessions: 0,
  },
]

const filterOptions = {
  status: ['전체', '활동', '휴면', '만료'],
  gender: ['전체', '남', '여'],
  ageGroup: ['전체', '20대', '30대', '40대', '50대', '60대 이상'],
  membershipType: ['전체', '6개월', '12개월', 'PT', '필라테스'],
  visitFrequency: ['전체', '주 1회', '주 2-3회', '주 4회 이상'],
}

export const MembersPageActions: FC = () => (
  <div class="action-group">
    <button type="button" class="btn btn-ghost">
      회원 내보내기
    </button>
    <button type="button" class="btn btn-primary">
      + 신규 회원 등록
    </button>
  </div>
)

export const MembersPage: FC = () => {
  const totalMembers = 1037
  const activeMembers = 3585
  const dormantMembers = 1393
  const expiredMembers = 1165

  return (
    <section class="members-page">
      {/* Tabs Navigation */}
      <div class="members-tabs" role="tablist">
        <a href="/members" role="tab" class="members-tab is-active" aria-selected="true">
          회원
        </a>
        <a href="/members/prospects" role="tab" class="members-tab">
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

      {/* Filters */}
      <div class="members-filters">
        <div class="filters-container">
          <div class="filter-row">
          
          <div class="filter-dropdown-wrapper">
            <button type="button" class="filter-dropdown" onclick="toggleFilterDropdown(this)">
              <span>상태</span>
              <span class="filter-dropdown__icon">▾</span>
            </button>
            <div class="filter-options" data-filter-type="status">
              <label>
                <input type="checkbox" value="유효" onchange="selectFilterOption(this, 'status')" />
                <span>유효</span>
              </label>
              <label>
                <input type="checkbox" value="만료" onchange="selectFilterOption(this, 'status')" />
                <span>만료</span>
              </label>
              <label>
                <input type="checkbox" value="미입력" onchange="selectFilterOption(this, 'status')" />
                <span>미입력</span>
              </label>
            </div>
          </div>
          
          <div class="filter-dropdown-wrapper">
            <button type="button" class="filter-dropdown" onclick="toggleFilterDropdown(this)">
              <span>성별</span>
              <span class="filter-dropdown__icon">▾</span>
            </button>
            <div class="filter-options" data-filter-type="gender">
              <label>
                <input type="checkbox" value="남" onchange="selectFilterOption(this, 'gender')" />
                <span>남</span>
              </label>
              <label>
                <input type="checkbox" value="여" onchange="selectFilterOption(this, 'gender')" />
                <span>여</span>
              </label>
            </div>
          </div>
          
          <div class="filter-dropdown-wrapper">
            <button type="button" class="filter-dropdown" onclick="toggleFilterDropdown(this)">
              <span>생일</span>
              <span class="filter-dropdown__icon">▾</span>
            </button>
            <div class="filter-options filter-options-birthday" data-filter-type="birthday">
              <div class="filter-section">
                <div class="filter-section-title">월별</div>
                <div class="filter-grid">
                  <label><input type="checkbox" value="1" onchange="selectFilterOption(this, 'birthday')" /><span>1월</span></label>
                  <label><input type="checkbox" value="2" onchange="selectFilterOption(this, 'birthday')" /><span>2월</span></label>
                  <label><input type="checkbox" value="3" onchange="selectFilterOption(this, 'birthday')" /><span>3월</span></label>
                  <label><input type="checkbox" value="4" onchange="selectFilterOption(this, 'birthday')" /><span>4월</span></label>
                  <label><input type="checkbox" value="5" onchange="selectFilterOption(this, 'birthday')" /><span>5월</span></label>
                  <label><input type="checkbox" value="6" onchange="selectFilterOption(this, 'birthday')" /><span>6월</span></label>
                  <label><input type="checkbox" value="7" onchange="selectFilterOption(this, 'birthday')" /><span>7월</span></label>
                  <label><input type="checkbox" value="8" onchange="selectFilterOption(this, 'birthday')" /><span>8월</span></label>
                  <label><input type="checkbox" value="9" onchange="selectFilterOption(this, 'birthday')" /><span>9월</span></label>
                  <label><input type="checkbox" value="10" onchange="selectFilterOption(this, 'birthday')" /><span>10월</span></label>
                  <label><input type="checkbox" value="11" onchange="selectFilterOption(this, 'birthday')" /><span>11월</span></label>
                  <label><input type="checkbox" value="12" onchange="selectFilterOption(this, 'birthday')" /><span>12월</span></label>
                </div>
              </div>
              <div class="filter-section">
                <div class="filter-section-title">연령대별</div>
                <div class="filter-grid">
                  <label><input type="checkbox" value="10대" onchange="selectFilterOption(this, 'birthday')" /><span>10대</span></label>
                  <label><input type="checkbox" value="20대" onchange="selectFilterOption(this, 'birthday')" /><span>20대</span></label>
                  <label><input type="checkbox" value="30대" onchange="selectFilterOption(this, 'birthday')" /><span>30대</span></label>
                  <label><input type="checkbox" value="40대" onchange="selectFilterOption(this, 'birthday')" /><span>40대</span></label>
                  <label><input type="checkbox" value="50대" onchange="selectFilterOption(this, 'birthday')" /><span>50대</span></label>
                  <label><input type="checkbox" value="60대" onchange="selectFilterOption(this, 'birthday')" /><span>60대</span></label>
                  <label><input type="checkbox" value="70대" onchange="selectFilterOption(this, 'birthday')" /><span>70대</span></label>
                  <label><input type="checkbox" value="80대" onchange="selectFilterOption(this, 'birthday')" /><span>80대</span></label>
                </div>
              </div>
            </div>
          </div>
          
          <div class="filter-dropdown-wrapper">
            <button type="button" class="filter-dropdown" onclick="toggleFilterDropdown(this)">
              <span>회원권</span>
              <span class="filter-dropdown__icon">▾</span>
            </button>
            <div class="filter-options" data-filter-type="membershipType">
              <label>
                <input type="checkbox" value="비디스타 회원권 6개월" onchange="selectFilterOption(this, 'membershipType')" />
                <span>비디스타 회원권 6개월</span>
              </label>
              <label>
                <input type="checkbox" value="비디스타 회원권 12개월" onchange="selectFilterOption(this, 'membershipType')" />
                <span>비디스타 회원권 12개월</span>
              </label>
              <label>
                <input type="checkbox" value="1회 이용권" onchange="selectFilterOption(this, 'membershipType')" />
                <span>1회 이용권</span>
              </label>
              <label>
                <input type="checkbox" value="-" onchange="selectFilterOption(this, 'membershipType')" />
                <span>미등록</span>
              </label>
            </div>
          </div>
          
          <div class="filter-dropdown-wrapper">
            <button type="button" class="filter-dropdown" onclick="toggleFilterDropdown(this)">
              <span>등록 기간</span>
              <span class="filter-dropdown__icon">▾</span>
            </button>
            <div class="filter-options" data-filter-type="registrationPeriod">
              <label>
                <input type="checkbox" value="3개월" onchange="selectFilterOption(this, 'registrationPeriod')" />
                <span>3개월</span>
              </label>
              <label>
                <input type="checkbox" value="6개월" onchange="selectFilterOption(this, 'registrationPeriod')" />
                <span>6개월</span>
              </label>
              <label>
                <input type="checkbox" value="12개월" onchange="selectFilterOption(this, 'registrationPeriod')" />
                <span>12개월</span>
              </label>
            </div>
          </div>
          
          <div class="filter-dropdown-wrapper">
            <button type="button" class="filter-dropdown" onclick="toggleFilterDropdown(this)">
              <span>만료 기간</span>
              <span class="filter-dropdown__icon">▾</span>
            </button>
            <div class="filter-options filter-options-date" data-filter-type="expiryDate">
              <div class="date-filter-placeholder">
                캘린더 날짜 선택 (구현 예정)
              </div>
            </div>
          </div>
          
          <div class="filter-dropdown-wrapper">
            <button type="button" class="filter-dropdown" onclick="toggleFilterDropdown(this)">
              <span>락커</span>
              <span class="filter-dropdown__icon">▾</span>
            </button>
            <div class="filter-options" data-filter-type="locker">
              <label>
                <input type="checkbox" value="유효" onchange="selectFilterOption(this, 'locker')" />
                <span>유효</span>
              </label>
              <label>
                <input type="checkbox" value="만료" onchange="selectFilterOption(this, 'locker')" />
                <span>만료</span>
              </label>
              <label>
                <input type="checkbox" value="번호 미지정" onchange="selectFilterOption(this, 'locker')" />
                <span>번호 미지정</span>
              </label>
              <label>
                <input type="checkbox" value="없음" onchange="selectFilterOption(this, 'locker')" />
                <span>없음</span>
              </label>
            </div>
          </div>
          
          <div class="filter-dropdown-wrapper">
            <button type="button" class="filter-dropdown" onclick="toggleFilterDropdown(this)">
              <span>운동복</span>
              <span class="filter-dropdown__icon">▾</span>
            </button>
            <div class="filter-options" data-filter-type="uniform">
              <label>
                <input type="checkbox" value="유효" onchange="selectFilterOption(this, 'uniform')" />
                <span>유효</span>
              </label>
              <label>
                <input type="checkbox" value="만료" onchange="selectFilterOption(this, 'uniform')" />
                <span>만료</span>
              </label>
              <label>
                <input type="checkbox" value="없음" onchange="selectFilterOption(this, 'uniform')" />
                <span>없음</span>
              </label>
            </div>
          </div>
          
          <div class="filter-dropdown-wrapper">
            <button type="button" class="filter-dropdown" onclick="toggleFilterDropdown(this)">
              <span>재등록 여부</span>
              <span class="filter-dropdown__icon">▾</span>
            </button>
            <div class="filter-options" data-filter-type="reRegistration">
              <label>
                <input type="checkbox" value="O" onchange="selectFilterOption(this, 'reRegistration')" />
                <span>O</span>
              </label>
              <label>
                <input type="checkbox" value="X" onchange="selectFilterOption(this, 'reRegistration')" />
                <span>X</span>
              </label>
            </div>
          </div>
          
          <div class="filter-dropdown-wrapper">
            <button type="button" class="filter-dropdown" onclick="toggleFilterDropdown(this)">
              <span>담당자</span>
              <span class="filter-dropdown__icon">▾</span>
            </button>
            <div class="filter-options" data-filter-type="manager">
              <label>
                <input type="checkbox" value="제이슨 매니저" onchange="selectFilterOption(this, 'manager')" />
                <span>제이슨 매니저</span>
              </label>
              <label>
                <input type="checkbox" value="김트레이너" onchange="selectFilterOption(this, 'manager')" />
                <span>김트레이너</span>
              </label>
              <label>
                <input type="checkbox" value="이코치" onchange="selectFilterOption(this, 'manager')" />
                <span>이코치</span>
              </label>
              <label>
                <input type="checkbox" value="미지정" onchange="selectFilterOption(this, 'manager')" />
                <span>미지정</span>
              </label>
            </div>
          </div>
          
          <div class="filter-dropdown-wrapper">
            <button type="button" class="filter-dropdown" onclick="toggleFilterDropdown(this)">
              <span>홀딩</span>
              <span class="filter-dropdown__icon">▾</span>
            </button>
            <div class="filter-options" data-filter-type="holding">
              <label>
                <input type="checkbox" value="O" onchange="selectFilterOption(this, 'holding')" />
                <span>O</span>
              </label>
              <label>
                <input type="checkbox" value="X" onchange="selectFilterOption(this, 'holding')" />
                <span>X</span>
              </label>
            </div>
          </div>
          
          <div class="filter-dropdown-wrapper">
            <button type="button" class="filter-dropdown" onclick="toggleFilterDropdown(this)">
              <span>잔여 일수</span>
              <span class="filter-dropdown__icon">▾</span>
            </button>
            <div class="filter-options filter-options-range" data-filter-type="remainingDays">
              <div class="range-filter">
                <input type="number" placeholder="0" min="0" class="range-input" id="remainingDaysMin" />
                <span>일 ~ </span>
                <input type="number" placeholder="0" min="0" class="range-input" id="remainingDaysMax" />
                <span>일</span>
                <button type="button" class="btn btn-sm btn-primary" onclick="applyRangeFilter('remainingDays')">
                  초기화
                </button>
              </div>
            </div>
          </div>
          
          <div class="filter-dropdown-wrapper">
            <button type="button" class="filter-dropdown" onclick="toggleFilterDropdown(this)">
              <span>잔여 횟수</span>
              <span class="filter-dropdown__icon">▾</span>
            </button>
            <div class="filter-options filter-options-range" data-filter-type="remainingSessions">
              <div class="range-filter">
                <input type="number" placeholder="0" min="0" class="range-input" id="remainingSessionsMin" />
                <span>회 ~ </span>
                <input type="number" placeholder="0" min="0" class="range-input" id="remainingSessionsMax" />
                <span>회</span>
                <button type="button" class="btn btn-sm btn-primary" onclick="applyRangeFilter('remainingSessions')">
                  초기화
                </button>
              </div>
            </div>
          </div>
          
          <div class="filter-dropdown-wrapper">
            <button type="button" class="filter-dropdown" onclick="toggleFilterDropdown(this)">
              <span>미출석 기간</span>
              <span class="filter-dropdown__icon">▾</span>
            </button>
            <div class="filter-options filter-options-range" data-filter-type="noAttendanceDays">
              <div class="range-filter">
                <input type="number" placeholder="0" min="0" class="range-input" id="noAttendanceDaysMin" />
                <span>일 ~ </span>
                <input type="number" placeholder="0" min="0" class="range-input" id="noAttendanceDaysMax" />
                <span>일</span>
                <button type="button" class="btn btn-sm btn-primary" onclick="applyRangeFilter('noAttendanceDays')">
                  초기화
                </button>
              </div>
            </div>
          </div>
          
          <div class="filter-dropdown-wrapper">
            <button type="button" class="filter-dropdown" onclick="toggleFilterDropdown(this)">
              <span>출입정보</span>
              <span class="filter-dropdown__icon">▾</span>
            </button>
            <div class="filter-options" data-filter-type="accessInfo">
              <label>
                <input type="checkbox" value="O" onchange="selectFilterOption(this, 'accessInfo')" />
                <span>O</span>
              </label>
              <label>
                <input type="checkbox" value="X" onchange="selectFilterOption(this, 'accessInfo')" />
                <span>X</span>
              </label>
            </div>
          </div>
        </div>
        <div class="filter-actions">
          <button type="button" class="btn btn-ghost btn-sm" onclick="resetFilters()">
            필터 초기화
          </button>
          <button type="button" class="btn btn-ghost btn-sm">
            엑셀 다운로드
          </button>
        </div>
      </div>
      </div>

      {/* Stats Summary */}
      <div class="members-stats">
        <div class="stat-item">
          <span class="stat-label">유효</span>
          <strong class="stat-value stat-value--primary">{totalMembers.toLocaleString()}명</strong>
        </div>
        <div class="stat-item">
          <span class="stat-label">전체</span>
          <strong class="stat-value">{activeMembers.toLocaleString()}명</strong>
        </div>
        <div class="stat-item">
          <span class="stat-label">휴면</span>
          <strong class="stat-value">{dormantMembers.toLocaleString()}명</strong>
        </div>
        <div class="stat-item">
          <span class="stat-label">만료예정</span>
          <strong class="stat-value">{expiredMembers.toLocaleString()}명</strong>
        </div>
      </div>

      {/* Members Table */}
      <div class="members-table-wrapper">
        <table class="members-table">
          <thead>
            <tr>
              <th class="th-checkbox">
                <input type="checkbox" aria-label="전체 선택" />
              </th>
              <th class="th-sortable">
                회원
                <button class="sort-btn" aria-label="정렬">↕</button>
              </th>
              <th class="th-sortable">
                성별
                <button class="sort-btn" aria-label="정렬">↕</button>
              </th>
              <th class="th-sortable">
                생년월일
                <button class="sort-btn" aria-label="정렬">↕</button>
              </th>
              <th>상태</th>
              <th class="th-sortable">
                최근 출석일
                <button class="sort-btn" aria-label="정렬">↕</button>
              </th>
              <th>회원권</th>
              <th class="th-sortable">
                만료일
                <button class="sort-btn" aria-label="정렬">↕</button>
              </th>
              <th class="th-sortable">
                등록일
                <button class="sort-btn" aria-label="정렬">↕</button>
              </th>
              <th class="th-sortable">
                잔여 횟수
                <button class="sort-btn" aria-label="정렬">↕</button>
              </th>
            </tr>
          </thead>
          <tbody>
            {mockMembers.map((member) => {
              const birthMonth = member.birthDate ? member.birthDate.split('.')[1] : '';
              
              const ageGroup = (() => {
                if (!member.birthDate || member.birthDate === '-') return '';
                const year = parseInt(member.birthDate.split('.')[0]);
                const age = new Date().getFullYear() - year;
                if (age < 20) return '10대';
                if (age < 30) return '20대';
                if (age < 40) return '30대';
                if (age < 50) return '40대';
                if (age < 60) return '50대';
                if (age < 70) return '60대';
                if (age < 80) return '70대';
                return '80대';
              })();
              
              // Calculate no-attendance days (mock: random 0-30)
              const noAttendanceDays = Math.floor(Math.random() * 31);
              
              // Calculate access info (mock: based on visitCount)
              const accessInfo = member.visitCount > 0 ? 'O' : 'X';
              
              return (
              <tr 
                key={member.id} 
                data-status={member.status}
                data-gender={member.gender}
                data-birth-month={birthMonth}
                data-age-group={ageGroup}
                data-membership-type={member.membershipType}
                data-no-attendance-days={noAttendanceDays}
                data-access-info={accessInfo}
              >
                <td>
                  <input type="checkbox" aria-label={`${member.name} 선택`} />
                </td>
                <td>
                  <a href={`/members/${member.id}`} class="member-cell member-cell-link">
                    <div class="member-avatar">{member.name.charAt(0)}</div>
                    <div class="member-info">
                      <strong class="member-name">{member.name}</strong>
                      <span class="member-phone">{member.phone}</span>
                    </div>
                  </a>
                </td>
                <td>
                  <span class="gender-badge">{member.gender}</span>
                </td>
                <td class="text-secondary">{member.birthDate}</td>
                <td>
                  <span
                    class={`status-badge ${
                      member.status === '유효' ? 'status-badge--valid' :
                      member.status === '만료' ? 'status-badge--expired' :
                      member.status === '예비' ? 'status-badge--prospect' :
                      'status-badge--none'
                    }`}
                  >
                    {member.status}
                  </span>
                </td>
                <td class="text-secondary">{member.registeredDate}</td>
                <td class="text-secondary membership-cell">
                  <span class="membership-badge">{member.membershipType}</span>
                </td>
                <td class="text-secondary">{member.expiryDate}</td>
                <td class="text-secondary">{member.registeredDate}</td>
                <td class="text-secondary">
                  {member.remainingSessions > 0 ? (
                    <span class="session-count">
                      {member.remainingSessions}/{member.totalSessions}
                    </span>
                  ) : (
                    <span class="text-muted">-</span>
                  )}
                </td>
              </tr>
              );
            })}
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
          369
        </button>
        <button type="button" class="pagination-btn" aria-label="다음 페이지">
          ›
        </button>
      </div>
    </section>
  )
}
