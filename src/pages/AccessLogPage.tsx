interface AccessLogData {
  id: number;
  timestamp: string;
  date: string;
  time: string;
  doorStatus: string;
  device: string;
  memberType: 'member' | 'staff';
  memberName: string;
  memberPhone: string;
  status: string;
  timeOfDay: 'morning' | 'lunch' | 'afternoon' | 'evening' | 'anytime';
  isRevisit: boolean;
}

export function AccessLogPage() {
  // 샘플 데이터
  const accessLogs: AccessLogData[] = [
    { id: 1, timestamp: '2025.12.05 17:14', date: '2025.12.05', time: '17:14', doorStatus: '입문', device: '위치', memberType: 'member', memberName: '신재은', memberPhone: '010-****-6244', status: '출입', timeOfDay: 'evening', isRevisit: false },
    { id: 2, timestamp: '2025.12.06 17:13', date: '2025.12.06', time: '17:13', doorStatus: '입문', device: '위치', memberType: 'member', memberName: '김수석', memberPhone: '010-****-4533', status: '출입', timeOfDay: 'evening', isRevisit: false },
    { id: 3, timestamp: '2025.12.05 17:12', date: '2025.12.05', time: '17:12', doorStatus: '입문', device: '위치', memberType: 'member', memberName: '윤가은', memberPhone: '010-****-4865', status: '출입', timeOfDay: 'evening', isRevisit: false },
    { id: 4, timestamp: '2025.12.06 17:09', date: '2025.12.06', time: '17:09', doorStatus: '입문', device: '위치', memberType: 'member', memberName: '조재원', memberPhone: '010-****-7316', status: '출입', timeOfDay: 'evening', isRevisit: false },
    { id: 5, timestamp: '2025.12.06 17:08', date: '2025.12.06', time: '17:08', doorStatus: '입문', device: '구성원', memberType: 'staff', memberName: '로이 중앙비트레이너', memberPhone: '', status: '출입', timeOfDay: 'evening', isRevisit: false },
    { id: 6, timestamp: '2025.12.06 17:04', date: '2025.12.06', time: '17:04', doorStatus: '입문', device: '위치', memberType: 'member', memberName: '박주후', memberPhone: '010-****-9218', status: '출입', timeOfDay: 'evening', isRevisit: false },
    { id: 7, timestamp: '2025.12.06 16:58', date: '2025.12.06', time: '16:58', doorStatus: '입문', device: '위치', memberType: 'member', memberName: '박수정', memberPhone: '010-****-9218', status: '출입', timeOfDay: 'afternoon', isRevisit: false },
    { id: 8, timestamp: '2025.12.06 16:58', date: '2025.12.06', time: '16:58', doorStatus: '입문', device: '구성원', memberType: 'staff', memberName: '로이 중앙비트레이너', memberPhone: '', status: '출입', timeOfDay: 'afternoon', isRevisit: false },
    { id: 9, timestamp: '2025.12.06 16:57', date: '2025.12.06', time: '16:57', doorStatus: '입문', device: '위치', memberType: 'member', memberName: '선미애', memberPhone: '010-****-9844', status: '출입', timeOfDay: 'afternoon', isRevisit: false },
  ];

  const selectedDate = '2025.12.05';
  const selectedFilter = '오늘';

  return (
    <div class="access-log-page">
      {/* 탭 메뉴 */}
      <div class="page-tabs">
        <a href="/access" class="page-tab active">출입 기록</a>
        <a href="/access/settings" class="page-tab">출입 관리</a>
      </div>

      {/* 필터 영역 */}
      <div class="access-filters">
        <div class="access-date-filter">
          <button class="access-date-btn">
            <i class="fas fa-calendar"></i>
            <span>{selectedDate}</span>
          </button>
        </div>

        <div class="access-time-filters">
          <button class="access-filter-btn">아침</button>
          <button class="access-filter-btn">점심</button>
          <button class="access-filter-btn active">오늘</button>
          <button class="access-filter-btn">야간</button>
          <button class="access-filter-btn">아무때</button>
          <button class="access-filter-btn">재방문</button>
          <button class="access-filter-btn">출퇴</button>
          <button class="access-filter-btn">퇴근</button>
        </div>
      </div>

      {/* 검색 및 정렬 */}
      <div class="access-controls">
        <div class="access-search">
          <i class="fas fa-search"></i>
          <input type="text" placeholder="회원/구성원 이름 검색" />
        </div>

        <div class="access-sort">
          <select class="access-sort-select">
            <option>오늘</option>
            <option>어제</option>
            <option>최근 7일</option>
            <option>최근 30일</option>
          </select>
          <select class="access-sort-select">
            <option>상태</option>
            <option>전체</option>
            <option>출입</option>
          </select>
        </div>

        <div class="access-count">
          <span>전체 {accessLogs.length}개</span>
        </div>
      </div>

      {/* 출입 기록 테이블 */}
      <div class="access-table-container">
        <table class="access-table">
          <thead>
            <tr>
              <th>출입시각</th>
              <th>출입문 여부</th>
              <th>장비</th>
              <th>회원/구성원 이름</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            {accessLogs.map((log) => (
              <tr key={log.id}>
                <td>
                  <div class="access-timestamp">
                    <div class="access-date">{log.date}</div>
                    <div class="access-time">{log.time}</div>
                  </div>
                </td>
                <td>{log.doorStatus}</td>
                <td>{log.device}</td>
                <td>
                  <div class="access-member-info">
                    {log.memberType === 'staff' ? (
                      <div class="access-staff-badge">
                        <i class="fas fa-user-tie"></i>
                        <span>{log.memberName}</span>
                      </div>
                    ) : (
                      <>
                        <div class="access-member-avatar">
                          <i class="fas fa-user"></i>
                        </div>
                        <div class="access-member-details">
                          <div class="access-member-name">{log.memberName}</div>
                          {log.memberPhone && (
                            <div class="access-member-phone">{log.memberPhone}</div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </td>
                <td>
                  <span class="access-status-badge">{log.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function AccessLogPageActions() {
  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <button class="ghost-button">
        <i class="fas fa-cog"></i> 설정
      </button>
      <button class="primary-button">
        <i class="fas fa-download"></i> 엑셀 다운로드
      </button>
    </div>
  );
}
