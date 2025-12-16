interface PayrollData {
  id: string;
  memberName: string;
  memberAvatar?: string;
  position: string;
  resignationDate: string | null;
  scheduleCount: number;
  attendanceCount: number;
  leaveCount: number;
  dutyCount: number;
  baseSalary: number;
  allowance: number;
  bonus: number;
  deduction: number;
  adjustment: number;
  totalSalary: number;
  hasSalaryInfo: boolean;
}

export function PayrollPage() {
  // 샘플 데이터 (급여정보가 아직 설정되지 않은 상태)
  const payrollData: PayrollData[] = [
    {
      id: '1',
      memberName: '센요',
      position: '일등잔_트레이너',
      resignationDate: null,
      scheduleCount: 0,
      attendanceCount: 0,
      leaveCount: 0,
      dutyCount: 0,
      baseSalary: 0,
      allowance: 0,
      bonus: 0,
      deduction: 0,
      adjustment: 0,
      totalSalary: 0,
      hasSalaryInfo: false
    },
    {
      id: '2',
      memberName: '게니',
      position: '석관라_FC',
      resignationDate: null,
      scheduleCount: 0,
      attendanceCount: 0,
      leaveCount: 0,
      dutyCount: 0,
      baseSalary: 0,
      allowance: 0,
      bonus: 0,
      deduction: 0,
      adjustment: 0,
      totalSalary: 0,
      hasSalaryInfo: false
    },
    {
      id: '3',
      memberName: '체미',
      position: '경월수_트레이너',
      resignationDate: null,
      scheduleCount: 0,
      attendanceCount: 0,
      leaveCount: 0,
      dutyCount: 0,
      baseSalary: 0,
      allowance: 0,
      bonus: 0,
      deduction: 0,
      adjustment: 0,
      totalSalary: 0,
      hasSalaryInfo: false
    },
    {
      id: '4',
      memberName: '고명리',
      position: '모선 라가니자',
      resignationDate: null,
      scheduleCount: 0,
      attendanceCount: 0,
      leaveCount: 0,
      dutyCount: 0,
      baseSalary: 0,
      allowance: 0,
      bonus: 0,
      deduction: 0,
      adjustment: 0,
      totalSalary: 0,
      hasSalaryInfo: false
    },
    {
      id: '5',
      memberName: '단티',
      position: '집산산_트레이너',
      resignationDate: null,
      scheduleCount: 0,
      attendanceCount: 0,
      leaveCount: 0,
      dutyCount: 0,
      baseSalary: 0,
      allowance: 0,
      bonus: 0,
      deduction: 0,
      adjustment: 0,
      totalSalary: 0,
      hasSalaryInfo: false
    },
    {
      id: '6',
      memberName: '티크',
      position: '임은라_FC',
      resignationDate: null,
      scheduleCount: 0,
      attendanceCount: 0,
      leaveCount: 0,
      dutyCount: 0,
      baseSalary: 0,
      allowance: 0,
      bonus: 0,
      deduction: 0,
      adjustment: 0,
      totalSalary: 0,
      hasSalaryInfo: false
    },
    {
      id: '7',
      memberName: '기은',
      position: '사가운_트레이너',
      resignationDate: null,
      scheduleCount: 0,
      attendanceCount: 0,
      leaveCount: 0,
      dutyCount: 0,
      baseSalary: 0,
      allowance: 0,
      bonus: 0,
      deduction: 0,
      adjustment: 0,
      totalSalary: 0,
      hasSalaryInfo: false
    },
    {
      id: '8',
      memberName: '승헤란나',
      position: '오투 GX김사',
      resignationDate: null,
      scheduleCount: 0,
      attendanceCount: 0,
      leaveCount: 0,
      dutyCount: 0,
      baseSalary: 0,
      allowance: 0,
      bonus: 0,
      deduction: 0,
      adjustment: 0,
      totalSalary: 0,
      hasSalaryInfo: false
    }
  ];

  // 통계 계산
  const totalSalary = payrollData.reduce((sum, item) => sum + item.totalSalary, 0);
  const totalDeductedAmount = payrollData.reduce((sum, item) => sum + item.deduction + item.adjustment, 0);
  const targetCount = payrollData.filter(item => item.hasSalaryInfo).length;
  const completedCount = payrollData.filter(item => item.hasSalaryInfo && item.totalSalary > 0).length;

  return (
    <div class="payroll-page">
      {/* 헤더: 급여정산 / 급여설정 탭 */}
      <div class="payroll-tabs">
        <button class="payroll-tab active">급여정산</button>
        <button class="payroll-tab">급여설정</button>
      </div>

      {/* 급여일 및 근무기간 표시 */}
      <div class="payroll-header">
        <div class="payroll-date">
          <h2>급여일: 2025.12.10</h2>
          <p>근무 기간: 2025.11.01 - 2025.11.30</p>
        </div>
        <button class="payroll-settings-btn">
          <i class="fas fa-cog"></i> 정산일정
        </button>
      </div>

      {/* 통계 요약 */}
      <div class="payroll-summary">
        <div class="payroll-summary-main">
          <div class="payroll-stat-card primary">
            <div class="stat-label">총 급여액</div>
            <div class="stat-value">{totalSalary.toLocaleString()}원</div>
            <div class="stat-sublabel">(전년 대비 {targetCount}명)</div>
          </div>
          <div class="payroll-stat-card secondary">
            <div class="stat-label">총 차인지급액</div>
            <div class="stat-value">{totalDeductedAmount.toLocaleString()}원</div>
            <div class="stat-sublabel">(전년 대비 0명)</div>
          </div>
        </div>

        <div class="payroll-summary-grid">
          <div class="stat-item">
            <span class="stat-label">급여 대상</span>
            <span class="stat-value">{targetCount}명</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">정산완료</span>
            <span class="stat-value">{completedCount}명</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">발금</span>
            <span class="stat-value">0명</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">비파관</span>
            <span class="stat-value">0명</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">기본급</span>
            <span class="stat-value">0명</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">수당</span>
            <span class="stat-value">0명</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">상여금</span>
            <span class="stat-value">0명</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">공제금액</span>
            <span class="stat-value">0명</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">조정금액</span>
            <span class="stat-value">0명</span>
          </div>
        </div>
      </div>

      {/* 필터 섹션 */}
      <div class="payroll-filters">
        <div class="payroll-filter-group">
          <select class="payroll-filter-select">
            <option>직책</option>
            <option>트레이너</option>
            <option>FC</option>
            <option>GX강사</option>
            <option>오가나이저</option>
          </select>

          <select class="payroll-filter-select">
            <option>근무형태</option>
            <option>정규직</option>
            <option>계약직</option>
            <option>프리랜서</option>
          </select>

          <select class="payroll-filter-select">
            <option>기타급</option>
            <option>전체</option>
            <option>기본급만</option>
            <option>수당 포함</option>
          </select>

          <select class="payroll-filter-select">
            <option>총 급여</option>
            <option>전체</option>
            <option>100만원 이상</option>
            <option>200만원 이상</option>
          </select>

          <select class="payroll-filter-select">
            <option>상태</option>
            <option>전체</option>
            <option>정산완료</option>
            <option>정산대기</option>
          </select>
        </div>

        <div class="payroll-filter-actions">
          <button class="payroll-action-btn">
            <i class="fas fa-redo"></i> 필터 초기화
          </button>
          <button class="payroll-action-btn primary">
            <i class="fas fa-file-excel"></i> 엑셀 다운로드
          </button>
        </div>
      </div>

      {/* 데이터 테이블 */}
      <div class="payroll-table-container">
        <table class="payroll-table">
          <thead>
            <tr>
              <th width="8%">
                <div class="th-content">
                  구성원 이름 ↕
                </div>
              </th>
              <th width="10%">
                <div class="th-content">
                  직책
                </div>
              </th>
              <th width="8%">
                <div class="th-content">
                  전출 일자
                </div>
              </th>
              <th width="6%">
                <div class="th-content">
                  급여수 ↕
                </div>
              </th>
              <th width="8%">
                <div class="th-content">
                  차인지급택수 ↕
                </div>
              </th>
              <th width="8%">
                <div class="th-content">
                  기본급 ↕
                </div>
              </th>
              <th width="6%">
                <div class="th-content">
                  수당 ↕
                </div>
              </th>
              <th width="8%">
                <div class="th-content">
                  상여금액 ↕
                </div>
              </th>
              <th width="8%">
                <div class="th-content">
                  일제척택 ↕
                </div>
              </th>
              <th width="8%">
                <div class="th-content">
                  조정금액 ↕
                </div>
              </th>
              <th width="10%">
                <div class="th-content">
                  급여정보 추가
                </div>
              </th>
              <th width="5%">
                <div class="th-content">
                  계약탤보
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {payrollData.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td>
                    <div class="payroll-member-info">
                      <div class="payroll-member-avatar">
                        <i class="fas fa-user"></i>
                      </div>
                      <span class="payroll-member-name">{item.memberName}</span>
                    </div>
                  </td>
                  <td>
                    <span class="payroll-position">{item.position}</span>
                  </td>
                  <td>
                    <span class="payroll-resignation-date">
                      {item.resignationDate || '-'}
                    </span>
                  </td>
                  <td>
                    <span class="payroll-schedule-count">
                      {item.scheduleCount}
                    </span>
                  </td>
                  <td>
                    <span class="payroll-attendance-count">
                      {item.attendanceCount}
                    </span>
                  </td>
                  <td>
                    <span class="payroll-base-salary">
                      {item.baseSalary > 0 ? item.baseSalary.toLocaleString() + '원' : '-'}
                    </span>
                  </td>
                  <td>
                    <span class="payroll-allowance">
                      {item.allowance > 0 ? item.allowance.toLocaleString() + '원' : '-'}
                    </span>
                  </td>
                  <td>
                    <span class="payroll-bonus">
                      {item.bonus > 0 ? item.bonus.toLocaleString() + '원' : '-'}
                    </span>
                  </td>
                  <td>
                    <span class="payroll-deduction">
                      {item.deduction > 0 ? item.deduction.toLocaleString() + '원' : '-'}
                    </span>
                  </td>
                  <td>
                    <span class="payroll-adjustment">
                      {item.adjustment > 0 ? item.adjustment.toLocaleString() + '원' : '-'}
                    </span>
                  </td>
                  <td>
                    <button class="payroll-add-info-btn">
                      {item.hasSalaryInfo ? '급여정보 수정' : '급여정보 추가'}
                    </button>
                  </td>
                  <td>
                    <button class="payroll-more-btn">
                      <i class="fas fa-ellipsis-v"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      <div class="payroll-pagination">
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
    </div>
  );
}

export function PayrollPageActions() {
  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <button class="ghost-button">
        <i class="fas fa-download"></i> 엑셀 다운로드
      </button>
      <button class="primary-button">
        <i class="fas fa-plus"></i> 급여 일괄 등록
      </button>
    </div>
  );
}
