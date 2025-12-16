export function CommunityPage() {
  // Sample community posts data
  const posts = [
    {
      id: 8,
      category: '자유게시판',
      title: '오늘 운동 정말 힘들었어요! 💪',
      author: '김민수',
      date: '2025.09.24',
      views: 156,
      likes: 23,
      comments: 12
    },
    {
      id: 7,
      category: '운동후기',
      title: 'PT 10회 완료 후기 - 체지방 5kg 감량 성공!',
      author: '이서연',
      date: '2025.09.23',
      views: 342,
      likes: 67,
      comments: 28
    },
    {
      id: 6,
      category: '질문/답변',
      title: '필라테스 수업 시간 변경 가능한가요?',
      author: '박지훈',
      date: '2025.09.22',
      views: 89,
      likes: 5,
      comments: 8
    },
    {
      id: 5,
      category: '이벤트',
      title: '🎉 9월 출석 이벤트 당첨자 발표!',
      author: '관리자',
      date: '2025.09.20',
      views: 523,
      likes: 145,
      comments: 52
    },
    {
      id: 4,
      category: '자유게시판',
      title: '운동 친구 구해요~',
      author: '최유진',
      date: '2025.09.18',
      views: 234,
      likes: 34,
      comments: 19
    },
    {
      id: 3,
      category: '운동후기',
      title: 'GX 수업 한 달 다녀본 솔직 후기',
      author: '정태양',
      date: '2025.09.15',
      views: 412,
      likes: 89,
      comments: 31
    },
    {
      id: 2,
      category: '공지사항',
      title: '센터 운영시간 변경 안내',
      author: '관리자',
      date: '2025.09.10',
      views: 678,
      likes: 23,
      comments: 15
    },
    {
      id: 1,
      category: '질문/답변',
      title: '락커 이용 방법 문의드립니다',
      author: '송민지',
      date: '2025.09.05',
      views: 167,
      likes: 12,
      comments: 6
    }
  ];

  return (
    <div className="community-page">
      {/* Main Navigation Tabs */}
      <div className="guide-main-tabs">
        <a href="/guide/notices" className="guide-main-tab">공지사항</a>
        <a href="/guide/consult" className="guide-main-tab">상담관리</a>
        <a href="/guide/community" className="guide-main-tab active">커뮤니티</a>
      </div>

      {/* Sub Tabs */}
      <div className="community-tabs">
        <button className="community-tab active">전체</button>
        <button className="community-tab">자유게시판</button>
        <button className="community-tab">운동후기</button>
        <button className="community-tab">질문/답변</button>
        <button className="community-tab">이벤트</button>
        <button className="community-tab">공지사항</button>
      </div>

      {/* Header */}
      <div className="community-header">
        <div className="community-search">
          <span className="search-icon">🔍</span>
          <input
            type="search"
            placeholder="게시글 검색"
            className="search-input"
          />
        </div>
        <button className="btn-register-post">
          <span className="btn-icon">+</span>
          <span>게시글 작성</span>
        </button>
      </div>

      {/* Posts Table */}
      <div className="community-table-container">
        <table className="community-table">
          <thead>
            <tr>
              <th className="col-checkbox">
                <input type="checkbox" />
              </th>
              <th className="col-number">번호</th>
              <th className="col-category">카테고리</th>
              <th className="col-title">제목</th>
              <th className="col-author">작성자</th>
              <th className="col-date">작성일 ↕</th>
              <th className="col-views">조회 ↕</th>
              <th className="col-likes">좋아요 ↕</th>
              <th className="col-comments">댓글</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="community-row">
                <td className="col-checkbox">
                  <input type="checkbox" />
                </td>
                <td className="col-number">{post.id}</td>
                <td className="col-category">
                  <span className={`category-badge category-${post.category}`}>
                    {post.category}
                  </span>
                </td>
                <td className="col-title">
                  <a href={`/guide/community/${post.id}`} className="post-title-link">
                    {post.title}
                  </a>
                </td>
                <td className="col-author">{post.author}</td>
                <td className="col-date">{post.date}</td>
                <td className="col-views">{post.views}</td>
                <td className="col-likes">❤️ {post.likes}</td>
                <td className="col-comments">💬 {post.comments}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="community-pagination">
        <button className="pagination-btn">«</button>
        <button className="pagination-btn active">1</button>
        <button className="pagination-btn">2</button>
        <button className="pagination-btn">3</button>
        <button className="pagination-btn">»</button>
      </div>
    </div>
  );
}

export function CommunityPageActions() {
  return null;
}
