interface LockerData {
  id: number;
  lockerNumber: number;
  zone: string;
  status: 'occupied' | 'available';
  memberName?: string;
  memberAvatar?: string;
  startDate?: string;
  endDate?: string;
  remainingDays?: number;
}

export function LockerPage() {
  // 샘플 데이터 (77개 락커, 일부는 사용중, 일부는 빈 락커)
  const lockerData: LockerData[] = [
    // 첫 번째 행
    { id: 1, lockerNumber: 71, zone: '여자락커실 앞', status: 'occupied', memberName: '김인숙', endDate: '2025.02.15', remainingDays: 45 },
    { id: 2, lockerNumber: 64, zone: '여자락커실 앞', status: 'occupied', memberName: '윤여진', endDate: '2025.03.20', remainingDays: 78 },
    { id: 3, lockerNumber: 57, zone: '여자락커실 앞', status: 'occupied', memberName: '유정애', endDate: '2025.01.30', remainingDays: 29 },
    { id: 4, lockerNumber: 50, zone: '여자락커실 앞', status: 'occupied', memberName: '금은복', endDate: '2025.04.10', remainingDays: 99 },
    { id: 5, lockerNumber: 43, zone: '여자락커실 앞', status: 'occupied', memberName: '박지현', endDate: '2025.01.25', remainingDays: 24 },
    { id: 6, lockerNumber: 36, zone: '여자락커실 앞', status: 'occupied', memberName: '이영근', endDate: '2025.02.28', remainingDays: 58 },
    { id: 7, lockerNumber: 29, zone: '여자락커실 앞', status: 'occupied', memberName: '황경희', endDate: '2025.03.15', remainingDays: 73 },
    { id: 8, lockerNumber: 22, zone: '여자락커실 앞', status: 'occupied', memberName: '정철숙', endDate: '2025.01.20', remainingDays: 19 },
    { id: 9, lockerNumber: 15, zone: '여자락커실 앞', status: 'occupied', memberName: '김산영', endDate: '2025.05.01', remainingDays: 120 },
    { id: 10, lockerNumber: 8, zone: '여자락커실 앞', status: 'available' },
    { id: 11, lockerNumber: 1, zone: '여자락커실 앞', status: 'available' },
    
    // 두 번째 행
    { id: 12, lockerNumber: 72, zone: '여자락커실 앞', status: 'occupied', memberName: '배은경', endDate: '2025.02.10', remainingDays: 40 },
    { id: 13, lockerNumber: 65, zone: '여자락커실 앞', status: 'occupied', memberName: '임지운', endDate: '2025.03.05', remainingDays: 63 },
    { id: 14, lockerNumber: 58, zone: '여자락커실 앞', status: 'occupied', memberName: '이미대', endDate: '2025.01.28', remainingDays: 27 },
    { id: 15, lockerNumber: 51, zone: '여자락커실 앞', status: 'occupied', memberName: '조하경', endDate: '2025.04.15', remainingDays: 104 },
    { id: 16, lockerNumber: 44, zone: '여자락커실 앞', status: 'occupied', memberName: '공정자', endDate: '2025.02.20', remainingDays: 50 },
    { id: 17, lockerNumber: 37, zone: '여자락커실 앞', status: 'occupied', memberName: '황인영', endDate: '2025.03.10', remainingDays: 68 },
    { id: 18, lockerNumber: 30, zone: '여자락커실 앞', status: 'occupied', memberName: '김슬기', endDate: '2025.01.22', remainingDays: 21 },
    { id: 19, lockerNumber: 23, zone: '여자락커실 앞', status: 'occupied', memberName: '차재은', endDate: '2025.05.10', remainingDays: 129 },
    { id: 20, lockerNumber: 16, zone: '여자락커실 앞', status: 'occupied', memberName: '이미옥', endDate: '2025.02.25', remainingDays: 55 },
    { id: 21, lockerNumber: 9, zone: '여자락커실 앞', status: 'occupied', memberName: '이예슬', endDate: '2025.03.18', remainingDays: 76 },
    { id: 22, lockerNumber: 2, zone: '여자락커실 앞', status: 'occupied', memberName: '김예림', endDate: '2025.01.18', remainingDays: 17 },
    
    // 세 번째 행
    { id: 23, lockerNumber: 73, zone: '여자락커실 앞', status: 'occupied', memberName: '홍은숙', endDate: '2025.02.08', remainingDays: 38 },
    { id: 24, lockerNumber: 66, zone: '여자락커실 앞', status: 'occupied', memberName: '이은영', endDate: '2025.03.22', remainingDays: 80 },
    { id: 25, lockerNumber: 59, zone: '여자락커실 앞', status: 'occupied', memberName: '차민지', endDate: '2025.01.26', remainingDays: 25 },
    { id: 26, lockerNumber: 52, zone: '여자락커실 앞', status: 'occupied', memberName: '고경란', endDate: '2025.04.20', remainingDays: 109 },
    { id: 27, lockerNumber: 45, zone: '여자락커실 앞', status: 'occupied', memberName: '박미정', endDate: '2025.02.18', remainingDays: 48 },
    { id: 28, lockerNumber: 38, zone: '여자락커실 앞', status: 'occupied', memberName: '정성선', endDate: '2025.03.08', remainingDays: 66 },
    { id: 29, lockerNumber: 31, zone: '여자락커실 앞', status: 'occupied', memberName: '이재은', endDate: '2025.01.24', remainingDays: 23 },
    { id: 30, lockerNumber: 24, zone: '여자락커실 앞', status: 'occupied', memberName: '이승희', endDate: '2025.05.15', remainingDays: 134 },
    { id: 31, lockerNumber: 17, zone: '여자락커실 앞', status: 'occupied', memberName: '정영섭', endDate: '2025.03.15', remainingDays: 73 },
    { id: 32, lockerNumber: 10, zone: '여자락커실 앞', status: 'occupied', memberName: '오한민', endDate: '2025.03.15', remainingDays: 73 },
    { id: 33, lockerNumber: 3, zone: '여자락커실 앞', status: 'occupied', memberName: '이하연', endDate: '2025.03.15', remainingDays: 73 },
    
    // 네 번째 행
    { id: 34, lockerNumber: 74, zone: '여자락커실 앞', status: 'occupied', memberName: '노규정', endDate: '2025.03.15', remainingDays: 73 },
    { id: 35, lockerNumber: 67, zone: '여자락커실 앞', status: 'occupied', memberName: '유영은', endDate: '2025.03.15', remainingDays: 73 },
    { id: 36, lockerNumber: 60, zone: '여자락커실 앞', status: 'occupied', memberName: '노단비', endDate: '2025.03.15', remainingDays: 73 },
    { id: 37, lockerNumber: 53, zone: '여자락커실 앞', status: 'occupied', memberName: '정의숙', endDate: '2025.03.15', remainingDays: 73 },
    { id: 38, lockerNumber: 46, zone: '여자락커실 앞', status: 'occupied', memberName: '박영례', endDate: '2025.03.15', remainingDays: 73 },
    { id: 39, lockerNumber: 39, zone: '여자락커실 앞', status: 'occupied', memberName: '경희선', endDate: '2025.03.15', remainingDays: 73 },
    { id: 40, lockerNumber: 32, zone: '여자락커실 앞', status: 'occupied', memberName: '김진숙', endDate: '2025.03.15', remainingDays: 73 },
    { id: 41, lockerNumber: 25, zone: '여자락커실 앞', status: 'occupied', memberName: '곽현금', endDate: '2025.03.15', remainingDays: 73 },
    { id: 42, lockerNumber: 18, zone: '여자락커실 앞', status: 'occupied', memberName: '류재영', endDate: '2025.03.15', remainingDays: 73 },
    { id: 43, lockerNumber: 11, zone: '여자락커실 앞', status: 'occupied', memberName: '허미수', endDate: '2025.03.15', remainingDays: 73 },
    { id: 44, lockerNumber: 4, zone: '여자락커실 앞', status: 'occupied', memberName: '최수귀', endDate: '2025.03.15', remainingDays: 73 },
    
    // 다섯 번째 행
    { id: 45, lockerNumber: 75, zone: '여자락커실 앞', status: 'occupied', memberName: '신서아', endDate: '2025.03.15', remainingDays: 73 },
    { id: 46, lockerNumber: 68, zone: '여자락커실 앞', status: 'occupied', memberName: '김진선', endDate: '2025.03.15', remainingDays: 73 },
    { id: 47, lockerNumber: 61, zone: '여자락커실 앞', status: 'occupied', memberName: '김경은', endDate: '2025.03.15', remainingDays: 73 },
    { id: 48, lockerNumber: 54, zone: '여자락커실 앞', status: 'occupied', memberName: '김은아', endDate: '2025.03.15', remainingDays: 73 },
    { id: 49, lockerNumber: 47, zone: '여자락커실 앞', status: 'occupied', memberName: '임영숙', endDate: '2025.03.15', remainingDays: 73 },
    { id: 50, lockerNumber: 40, zone: '여자락커실 앞', status: 'occupied', memberName: '박영희', endDate: '2025.03.15', remainingDays: 73 },
    { id: 51, lockerNumber: 33, zone: '여자락커실 앞', status: 'occupied', memberName: '조아영', endDate: '2025.03.15', remainingDays: 73 },
    { id: 52, lockerNumber: 26, zone: '여자락커실 앞', status: 'occupied', memberName: '이현정', endDate: '2025.03.15', remainingDays: 73 },
    { id: 53, lockerNumber: 19, zone: '여자락커실 앞', status: 'occupied', memberName: '정윤정', endDate: '2025.03.15', remainingDays: 73 },
    { id: 54, lockerNumber: 12, zone: '여자락커실 앞', status: 'occupied', memberName: '백패숙', endDate: '2025.03.15', remainingDays: 73 },
    { id: 55, lockerNumber: 5, zone: '여자락커실 앞', status: 'occupied', memberName: '김희경', endDate: '2025.03.15', remainingDays: 73 },
    
    // 여섯 번째 행
    { id: 56, lockerNumber: 76, zone: '여자락커실 앞', status: 'occupied', memberName: '김차현', endDate: '2025.03.15', remainingDays: 73 },
    { id: 57, lockerNumber: 69, zone: '여자락커실 앞', status: 'occupied', memberName: '김신숙', endDate: '2025.03.15', remainingDays: 73 },
    { id: 58, lockerNumber: 62, zone: '여자락커실 앞', status: 'occupied', memberName: '이예진', endDate: '2025.03.15', remainingDays: 73 },
    { id: 59, lockerNumber: 55, zone: '여자락커실 앞', status: 'occupied', memberName: '황해란', endDate: '2025.03.15', remainingDays: 73 },
    { id: 60, lockerNumber: 48, zone: '여자락커실 앞', status: 'occupied', memberName: '송애나', endDate: '2025.03.15', remainingDays: 73 },
    { id: 61, lockerNumber: 41, zone: '여자락커실 앞', status: 'occupied', memberName: '이선호', endDate: '2025.03.15', remainingDays: 73 },
    { id: 62, lockerNumber: 34, zone: '여자락커실 앞', status: 'occupied', memberName: '김재은', endDate: '2025.03.15', remainingDays: 73 },
    { id: 63, lockerNumber: 27, zone: '여자락커실 앞', status: 'occupied', memberName: '김혹희', endDate: '2025.03.15', remainingDays: 73 },
    { id: 64, lockerNumber: 20, zone: '여자락커실 앞', status: 'occupied', memberName: '김미선', endDate: '2025.03.15', remainingDays: 73 },
    { id: 65, lockerNumber: 13, zone: '여자락커실 앞', status: 'occupied', memberName: '최해란', endDate: '2025.03.15', remainingDays: 73 },
    { id: 66, lockerNumber: 6, zone: '여자락커실 앞', status: 'occupied', memberName: '박은아', endDate: '2025.03.15', remainingDays: 73 },
    
    // 일곱 번째 행
    { id: 67, lockerNumber: 77, zone: '여자락커실 앞', status: 'occupied', memberName: '이현서', endDate: '2025.03.15', remainingDays: 73 },
    { id: 68, lockerNumber: 70, zone: '여자락커실 앞', status: 'occupied', memberName: '심유미', endDate: '2025.03.15', remainingDays: 73 },
    { id: 69, lockerNumber: 63, zone: '여자락커실 앞', status: 'occupied', memberName: '정성희', endDate: '2025.03.15', remainingDays: 73 },
    { id: 70, lockerNumber: 56, zone: '여자락커실 앞', status: 'occupied', memberName: '황소영', endDate: '2025.03.15', remainingDays: 73 },
    { id: 71, lockerNumber: 49, zone: '여자락커실 앞', status: 'occupied', memberName: '이예선', endDate: '2025.03.15', remainingDays: 73 },
    { id: 72, lockerNumber: 42, zone: '여자락커실 앞', status: 'occupied', memberName: '진희구', endDate: '2025.03.15', remainingDays: 73 },
    { id: 73, lockerNumber: 35, zone: '여자락커실 앞', status: 'occupied', memberName: '최여진', endDate: '2025.03.15', remainingDays: 73 },
    { id: 74, lockerNumber: 28, zone: '여자락커실 앞', status: 'occupied', memberName: '곽해리', endDate: '2025.03.15', remainingDays: 73 },
    { id: 75, lockerNumber: 21, zone: '여자락커실 앞', status: 'occupied', memberName: '김민진', endDate: '2025.03.15', remainingDays: 73 },
    { id: 76, lockerNumber: 14, zone: '여자락커실 앞', status: 'occupied', memberName: '정영애', endDate: '2025.03.15', remainingDays: 73 },
    { id: 77, lockerNumber: 7, zone: '여자락커실 앞', status: 'occupied', memberName: '김소운', endDate: '2025.03.15', remainingDays: 73 },
  ];

  // 구역별로 그룹화
  const zones = Array.from(new Set(lockerData.map(locker => locker.zone)));
  const selectedZone = '여자락커실 앞'; // 현재 선택된 구역

  // 필터링된 락커 데이터
  const filteredLockers = lockerData.filter(locker => locker.zone === selectedZone);

  // 통계
  const totalLockers = filteredLockers.length;
  const occupiedLockers = filteredLockers.filter(l => l.status === 'occupied').length;
  const availableLockers = filteredLockers.filter(l => l.status === 'available').length;

  return (
    <div class="locker-page">
      {/* 헤더: 버튼 */}
      <div class="locker-header">
        <button class="locker-add-btn">
          <i class="fas fa-plus"></i> 신규 락커 등록
        </button>
      </div>

      {/* 필터 및 액션 */}
      <div class="locker-controls">
        <div class="locker-zone-selector">
          <select class="locker-zone-select">
            <option selected>{selectedZone}</option>
            <option>남자락커실</option>
            <option>여자락커실 안쪽</option>
            <option>공용락커실</option>
          </select>
        </div>

        {/* 통계 정보 */}
        <div class="locker-stats">
          <div class="locker-stat-item">
            <span class="stat-label">전체 락커</span>
            <span class="stat-value">{totalLockers}개</span>
          </div>
          <div class="locker-stat-item">
            <span class="stat-label">사용중</span>
            <span class="stat-value occupied">{occupiedLockers}개</span>
          </div>
          <div class="locker-stat-item">
            <span class="stat-label">빈 락커</span>
            <span class="stat-value available">{availableLockers}개</span>
          </div>
        </div>

        <div class="locker-actions">
          <button class="locker-action-btn">
            <i class="fas fa-layer-group"></i> 구역별로 분류하기
          </button>
          <button class="locker-action-btn">
            <i class="fas fa-trash"></i> 구역 삭제하기
          </button>
          <button class="locker-action-btn">
            <i class="fas fa-eye"></i> 전체보기
          </button>
        </div>
      </div>

      {/* 락커 그리드 */}
      <div class="locker-grid">
        {filteredLockers.map((locker) => {
          return (
            <div key={locker.id} class={`locker-card ${locker.status}`}>
              <div class="locker-card-header">
                <div class="locker-number">{locker.lockerNumber}</div>
                {locker.status === 'occupied' && locker.remainingDays !== undefined && (
                  <span class={`locker-status-badge ${locker.remainingDays > 0 ? 'valid' : 'expired'}`}>
                    {locker.remainingDays > 0 ? '유효' : '만료'}
                  </span>
                )}
              </div>

              {locker.status === 'occupied' ? (
                <div class="locker-card-content">
                  <div class="locker-member-info">
                    <div class="locker-member-avatar">
                      <i class="fas fa-user"></i>
                    </div>
                    <div class="locker-member-name">{locker.memberName}</div>
                  </div>
                  <div class="locker-date-info">
                    {locker.endDate}<br/>
                    ({locker.remainingDays}일 남음)
                  </div>
                </div>
              ) : (
                <div class="locker-card-content empty">
                  <div class="locker-empty-message">
                    <i class="fas fa-lock-open"></i>
                    <span>빈 락커</span>
                  </div>
                </div>
              )}

              <div class="locker-card-actions">
                <button class="locker-card-action-btn">
                  <i class="fas fa-ellipsis-h"></i>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function LockerPageActions() {
  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <button class="ghost-button">
        <i class="fas fa-cog"></i> 설정
      </button>
      <button class="primary-button">
        <i class="fas fa-plus"></i> 신규 락커 등록
      </button>
    </div>
  );
}
