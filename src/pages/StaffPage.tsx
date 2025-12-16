interface StaffData {
  name: string;
  phone: string;
  department: string;
  role: string;
  email: string;
  status: string;
  activityCount: number;
}

export function StaffPage() {
  // 샘플 데이터
  const staffData: StaffData[] = [
    {
      name: '세나',
      phone: '010-9131-6365',
      department: '이즈미_트레이너',
      role: '-',
      email: 'lsmy973@naver.com',
      status: '직원',
      activityCount: 0
    },
    {
      name: '리키',
      phone: '010-5746-6165',
      department: '김성진_트레이너',
      role: '-',
      email: 'gskgs5746@naver.com',
      status: '직원',
      activityCount: 0
    },
    {
      name: '우디',
      phone: '010-9942-1447',
      department: '명미희_FC',
      role: '-',
      email: 'dusal9210@naver.com',
      status: '직원',
      activityCount: 0
    },
    {
      name: '책스',
      phone: '010-9996-4592',
      department: '한민진_FC',
      role: '-',
      email: 'hmj9886@naver.com',
      status: '직원',
      activityCount: 0
    },
    {
      name: '세나',
      phone: '010-9432-6873',
      department: '지궁니_FC',
      role: '-',
      email: 'rbq57118@naver.com',
      status: '직원',
      activityCount: 0
    },
    {
      name: '코피',
      phone: '010-5736-7177',
      department: '통결리_트레이너_블...',
      role: '-',
      email: 'rshyyy910@naver.com',
      status: '직원',
      activityCount: 0
    },
    {
      name: '가든',
      phone: '010-3976-2490',
      department: '사가운_트레이너',
      role: '-',
      email: 'guslr2255@naver.com',
      status: '직원',
      activityCount: 0
    },
    {
      name: '야옹',
      phone: '010-9086-7132',
      department: '백나_볼잉기자봅',
      role: '-',
      email: 'ptsoo1@naver.com',
      status: '직원',
      activityCount: 0
    },
    {
      name: '케이',
      phone: '010-9274-1739',
      department: '김알로_트레이너',
      role: '-',
      email: 'dhckstn12345@naver.com',
      status: '직원',
      activityCount: 0
    },
    {
      name: '김은제',
      phone: '',
      department: '오전 링스에드_김사',
      role: '-',
      email: 'hollywood12@naver.com',
      status: '직원',
      activityCount: 0
    }
  ];

  return (
    <div class="staff-page">
      {/* 헤더: 검색 및 버튼 */}
      <div class="staff-header">
        <div class="staff-search-box">
          <i class="fas fa-search"></i>
          <input type="text" placeholder="구성원 검색" />
        </div>
        <button class="staff-add-btn">
          <i class="fas fa-plus"></i> 신규 구성원 등록
        </button>
      </div>

      {/* 필터 섹션 */}
      <div class="staff-filters">
        <select class="staff-filter-select">
          <option>직책</option>
          <option>관리자</option>
          <option>강사</option>
          <option>직원</option>
        </select>

        <select class="staff-filter-select">
          <option>근무형태</option>
          <option>정규직</option>
          <option>계약직</option>
          <option>프리랜서</option>
        </select>

        <select class="staff-filter-select">
          <option>권한</option>
          <option>전체 권한</option>
          <option>읽기 권한</option>
          <option>쓰기 권한</option>
        </select>

        <select class="staff-filter-select">
          <option>퇴사자 제외</option>
          <option>퇴사자 포함</option>
        </select>

        <select class="staff-filter-select">
          <option>다양한 문류별 여부</option>
        </select>

        <div class="staff-filter-actions">
          <button class="filter-action-btn">필터 초기화</button>
          <button class="filter-action-btn">엑셀 다운로드</button>
        </div>
      </div>

      {/* 구성원 수 표시 */}
      <div class="staff-count">
        구성원 수 {staffData.length}
      </div>

      {/* 데이터 테이블 */}
      <div class="staff-table-container">
        <table class="staff-table">
          <thead>
            <tr>
              <th width="15%">
                <div class="th-content">
                  직책
                  <i class="fas fa-sort"></i>
                </div>
              </th>
              <th width="20%">
                <div class="th-content">
                  근무형태
                  <i class="fas fa-sort"></i>
                </div>
              </th>
              <th width="5%">
                <div class="th-content">
                  아이디(이메일)
                </div>
              </th>
              <th width="15%">
                <div class="th-content">
                  권한
                  <i class="fas fa-sort"></i>
                </div>
              </th>
              <th width="15%">
                <div class="th-content">
                  활동정보
                  <i class="fas fa-question-circle info-icon"></i>
                </div>
              </th>
              <th width="5%">
                <div class="th-content">
                  더보기 옵션
                  <i class="fas fa-question-circle info-icon"></i>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {staffData.map((staff, index) => {
              return (
                <tr key={index}>
                  <td>
                    <div class="staff-basic-info">
                      <div class="staff-avatar">
                        <i class="fas fa-user"></i>
                      </div>
                      <div class="staff-details">
                        <div class="staff-name">{staff.name}</div>
                        <div class="staff-phone">{staff.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="staff-department">{staff.department}</div>
                  </td>
                  <td>
                    <div class="staff-role">{staff.role}</div>
                  </td>
                  <td>
                    <div class="staff-email">{staff.email}</div>
                  </td>
                  <td>
                    <div class="staff-status">{staff.status}</div>
                  </td>
                  <td>
                    <div class="staff-activity">{staff.activityCount}</div>
                  </td>
                  <td>
                    <input type="checkbox" class="staff-checkbox" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function StaffPageActions() {
  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <button class="ghost-button">
        <i class="fas fa-cog"></i> 설정
      </button>
    </div>
  );
}
