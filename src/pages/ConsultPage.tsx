export function ConsultPage() {
  // Sample consultation data
  const consultations = [
    {
      id: 5,
      name: '김민수',
      phone: '010-1234-5678',
      status: '상담완료',
      type: 'PT',
      consultant: '재이슨',
      date: '2025.09.20',
      nextDate: '2025.09.27',
      memo: '헬스 + PT 관심'
    },
    {
      id: 4,
      name: '이서연',
      phone: '010-2345-6789',
      status: '상담예정',
      type: 'GX',
      consultant: '케이',
      date: '2025.09.19',
      nextDate: '2025.09.25',
      memo: '필라테스 문의'
    },
    {
      id: 3,
      name: '박지훈',
      phone: '010-3456-7890',
      status: '상담완료',
      type: '회원권',
      consultant: '재이슨',
      date: '2025.09.18',
      nextDate: '-',
      memo: '3개월 회원권'
    },
    {
      id: 2,
      name: '최유진',
      phone: '010-4567-8901',
      status: '등록완료',
      type: 'PT',
      consultant: '케이',
      date: '2025.09.15',
      nextDate: '-',
      memo: '등록 완료'
    },
    {
      id: 1,
      name: '정태양',
      phone: '010-5678-9012',
      status: '상담취소',
      type: 'GX',
      consultant: '재이슨',
      date: '2025.09.10',
      nextDate: '-',
      memo: '일정 불가'
    }
  ];

  return (
    <div className="consult-page">
      {/* Main Navigation Tabs */}
      <div className="guide-main-tabs">
        <a href="/guide/notices" className="guide-main-tab">공지사항</a>
        <a href="/guide/consult" className="guide-main-tab active">상담관리</a>
        <a href="/guide/community" className="guide-main-tab">커뮤니티</a>
      </div>

      {/* Sub Tabs */}
      <div className="consult-tabs">
        <button className="consult-tab active">상담관리</button>
        <button className="consult-tab">상담통계</button>
      </div>

      {/* Header */}
      <div className="consult-header">
        <div className="consult-filters">
          <select className="filter-select">
            <option>전체 상태</option>
            <option>상담예정</option>
            <option>상담완료</option>
            <option>등록완료</option>
            <option>상담취소</option>
          </select>
          <select className="filter-select">
            <option>전체 유형</option>
            <option>PT</option>
            <option>GX</option>
            <option>회원권</option>
          </select>
          <input
            type="search"
            placeholder="이름, 연락처 검색"
            className="search-input"
          />
        </div>
        <button className="btn-register-consult">
          <span className="btn-icon">+</span>
          <span>상담 등록</span>
        </button>
      </div>

      {/* Consultations Table */}
      <div className="consult-table-container">
        <table className="consult-table">
          <thead>
            <tr>
              <th className="col-checkbox">
                <input type="checkbox" />
              </th>
              <th className="col-number">번호</th>
              <th className="col-name">이름</th>
              <th className="col-phone">연락처</th>
              <th className="col-status">상태</th>
              <th className="col-type">상담유형</th>
              <th className="col-consultant">상담사</th>
              <th className="col-date">상담일</th>
              <th className="col-next-date">차기 상담일</th>
              <th className="col-memo">메모</th>
            </tr>
          </thead>
          <tbody>
            {consultations.map((consult) => (
              <tr key={consult.id} className="consult-row">
                <td className="col-checkbox">
                  <input type="checkbox" />
                </td>
                <td className="col-number">{consult.id}</td>
                <td className="col-name">
                  <a href={`/guide/consult/${consult.id}`} className="name-link">
                    {consult.name}
                  </a>
                </td>
                <td className="col-phone">{consult.phone}</td>
                <td className="col-status">
                  <span className={`status-badge status-${consult.status}`}>
                    {consult.status}
                  </span>
                </td>
                <td className="col-type">{consult.type}</td>
                <td className="col-consultant">{consult.consultant}</td>
                <td className="col-date">{consult.date}</td>
                <td className="col-next-date">{consult.nextDate}</td>
                <td className="col-memo">{consult.memo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="consult-pagination">
        <button className="pagination-btn active">1</button>
      </div>
    </div>
  );
}

export function ConsultPageActions() {
  return null;
}
