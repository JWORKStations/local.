export function NoticesPage() {
  // Sample notices data
  const notices = [
    {
      id: 4,
      title: '오전연습 정기휴강 공지',
      pinned: 'X',
      author: '재이슨',
      date: '2025.09.24',
      views: 167
    },
    {
      id: 3,
      title: '📢 비디소투 뉴스~ 협상장도 소득공제가 된다?!',
      pinned: 'X',
      author: '재이슨',
      date: '2025.06.25',
      views: 192
    },
    {
      id: 2,
      title: '오늘의 운세',
      pinned: 'X',
      author: '재이슨',
      date: '2025.03.19',
      views: 254
    },
    {
      id: 1,
      title: '🎁 Gift Card 증정 이벤트🎁',
      pinned: 'X',
      author: '재이슨',
      date: '2024.01.19',
      views: 522
    }
  ];

  return (
    <div className="notices-page">
      {/* Main Navigation Tabs */}
      <div className="guide-main-tabs">
        <a href="/guide/notices" className="guide-main-tab active">공지사항</a>
        <a href="/guide/consult" className="guide-main-tab">상담관리</a>
        <a href="/guide/community" className="guide-main-tab">커뮤니티</a>
      </div>

      {/* Sub Tabs */}
      <div className="notices-tabs">
        <button className="notices-tab active">공지사항</button>
        <button className="notices-tab">추가관리</button>
      </div>

      {/* Search and Action Bar */}
      <div className="notices-header">
        <div className="notices-search">
          <span className="search-icon">🔍</span>
          <input
            type="search"
            placeholder="공지사항 검색"
            className="search-input"
          />
        </div>
        <button className="btn-register-notice">
          <span className="btn-icon">+</span>
          <span>공지사항 등록</span>
        </button>
      </div>

      {/* Notices Table */}
      <div className="notices-table-container">
        <table className="notices-table">
          <thead>
            <tr>
              <th className="col-checkbox">
                <input type="checkbox" />
              </th>
              <th className="col-number">번호</th>
              <th className="col-title">제목</th>
              <th className="col-pinned">타겟앱 최상단에 공지</th>
              <th className="col-author">작성자</th>
              <th className="col-date">등록일 ↕</th>
              <th className="col-views">조회수 ↕</th>
            </tr>
          </thead>
          <tbody>
            {notices.map((notice) => (
              <tr key={notice.id} className="notice-row">
                <td className="col-checkbox">
                  <input type="checkbox" />
                </td>
                <td className="col-number">{notice.id}</td>
                <td className="col-title">
                  <a href={`/guide/notices/${notice.id}`} className="notice-title-link">
                    {notice.title}
                  </a>
                </td>
                <td className="col-pinned">{notice.pinned}</td>
                <td className="col-author">{notice.author}</td>
                <td className="col-date">{notice.date}</td>
                <td className="col-views">{notice.views}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="notices-pagination">
        <button className="pagination-btn active">1</button>
      </div>

      {/* Items per page selector */}
      <div className="items-per-page">
        <select className="items-select">
          <option>행 최소 50</option>
          <option>행 최소 100</option>
          <option>행 최소 200</option>
        </select>
      </div>
    </div>
  );
}

export function NoticesPageActions() {
  return null;
}
