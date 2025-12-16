import type { FC } from 'hono/jsx'

interface OrientationMember {
  id: string
  name: string
  phone: string
  gender: '남' | '여'
  birthDate: string
  status: '유효' | '만료' | '예비' | '미입력'
  registeredDate: string
  daysFromRegistration: number
  
  // 운동 정보
  workoutGoal: string
  currentExercises: string[]
  fitnessLevel: '초급' | '중급' | '고급'
  healthNotes: string
  
  // 수업 스케줄
  totalOTSessions: number
  completedOTSessions: number
  nextSessionDate: string
  otProgress: number
  
  // PT/GX 정보
  assignedTrainer: string
  preferredTime: string
}

// 최근 14일 이내 등록한 회원만 필터링
const mockOrientationMembers: OrientationMember[] = [
  {
    id: '1',
    name: '홍서현',
    phone: '010-1234-8727',
    gender: '여',
    birthDate: '1990.05.15',
    status: '유효',
    registeredDate: '2025.11.29',
    daysFromRegistration: 2,
    workoutGoal: '체중 감량 10kg',
    currentExercises: ['러닝머신', '스쿼트', '플랭크'],
    fitnessLevel: '초급',
    healthNotes: '무릎 약간 불편',
    totalOTSessions: 4,
    completedOTSessions: 3,
    nextSessionDate: '2025.12.02',
    otProgress: 75,
    assignedTrainer: '김코치',
    preferredTime: '오전 10시',
  },
  {
    id: '8',
    name: '송시우',
    phone: '010-1357-9560',
    gender: '남',
    birthDate: '1988.09.14',
    status: '미입력',
    registeredDate: '2025.11.28',
    daysFromRegistration: 3,
    workoutGoal: '근력 강화',
    currentExercises: ['벤치프레스', '데드리프트'],
    fitnessLevel: '중급',
    healthNotes: '없음',
    totalOTSessions: 4,
    completedOTSessions: 1,
    nextSessionDate: '2025.12.01',
    otProgress: 25,
    assignedTrainer: '이코치',
    preferredTime: '오후 2시',
  },
  {
    id: '11',
    name: '박민준',
    phone: '010-2222-3333',
    gender: '남',
    birthDate: '1992.07.20',
    status: '유효',
    registeredDate: '2025.11.25',
    daysFromRegistration: 6,
    workoutGoal: '체력 향상',
    currentExercises: ['러닝', '사이클'],
    fitnessLevel: '초급',
    healthNotes: '허리 디스크 주의',
    totalOTSessions: 4,
    completedOTSessions: 2,
    nextSessionDate: '2025.12.03',
    otProgress: 50,
    assignedTrainer: '김코치',
    preferredTime: '오후 7시',
  },
  {
    id: '12',
    name: '이서연',
    phone: '010-4444-5555',
    gender: '여',
    birthDate: '1995.03.12',
    status: '유효',
    registeredDate: '2025.11.22',
    daysFromRegistration: 9,
    workoutGoal: '다이어트',
    currentExercises: ['필라테스', '요가'],
    fitnessLevel: '초급',
    healthNotes: '없음',
    totalOTSessions: 4,
    completedOTSessions: 4,
    nextSessionDate: '-',
    otProgress: 100,
    assignedTrainer: '박코치',
    preferredTime: '오전 11시',
  },
  {
    id: '13',
    name: '최유진',
    phone: '010-6666-7777',
    gender: '여',
    birthDate: '1988.11.05',
    status: '유효',
    registeredDate: '2025.11.20',
    daysFromRegistration: 11,
    workoutGoal: '체형 교정',
    currentExercises: ['스트레칭', '필라테스'],
    fitnessLevel: '초급',
    healthNotes: '어깨 통증',
    totalOTSessions: 4,
    completedOTSessions: 2,
    nextSessionDate: '2025.12.04',
    otProgress: 50,
    assignedTrainer: '박코치',
    preferredTime: '오후 3시',
  },
  {
    id: '14',
    name: '김태현',
    phone: '010-8888-9999',
    gender: '남',
    birthDate: '1990.09.18',
    status: '유효',
    registeredDate: '2025.11.18',
    daysFromRegistration: 13,
    workoutGoal: '근육량 증가',
    currentExercises: ['웨이트 트레이닝', '프로틴 섭취'],
    fitnessLevel: '고급',
    healthNotes: '없음',
    totalOTSessions: 4,
    completedOTSessions: 3,
    nextSessionDate: '2025.12.05',
    otProgress: 75,
    assignedTrainer: '이코치',
    preferredTime: '오후 8시',
  },
]

export const OrientationListPage: FC = () => {
  const recentMembers = mockOrientationMembers.filter(m => m.daysFromRegistration <= 14)
  
  return (
    <section class="orientation-page">
      {/* Tabs Navigation */}
      <div class="members-tabs" role="tablist">
        <a href="/members" role="tab" class="members-tab">
          회원
        </a>
        <a href="/members/prospects" role="tab" class="members-tab">
          예비회원
        </a>
        <a href="/members/orientation" role="tab" class="members-tab is-active" aria-selected="true">
          OT 리스트
        </a>
        <a href="/members/referrals" role="tab" class="members-tab">
          추천리스트
        </a>
        <a href="/members/contracts" role="tab" class="members-tab">
          전자계약 설정
        </a>
      </div>

      {/* Header Info */}
      <div class="orientation-header">
        <div class="orientation-stats">
          <span class="stat-label">최근 14일 신규 회원</span>
          <strong class="stat-value stat-value--primary">{recentMembers.length}명</strong>
        </div>
        <div class="orientation-actions">
          <button type="button" class="btn btn-ghost btn-sm">
            엑셀 다운로드
          </button>
          <button type="button" class="btn btn-ghost btn-sm">
            OT 스케줄 출력
          </button>
        </div>
      </div>

      {/* OT List Table */}
      <div class="orientation-table-wrapper">
        <table class="orientation-table">
          <thead>
            <tr>
              <th class="th-member" rowspan="2">회원정보</th>
              <th class="th-registration" rowspan="2">등록일</th>
              <th colspan="4" class="th-section-header">운동 정보</th>
              <th colspan="3" class="th-section-header">OT 진행 현황</th>
            </tr>
            <tr>
              <th class="th-sub">운동 목표</th>
              <th class="th-sub">현재 운동</th>
              <th class="th-sub">운동 수준</th>
              <th class="th-sub">특이사항</th>
              <th class="th-sub">진행률</th>
              <th class="th-sub">담당 트레이너</th>
              <th class="th-sub">다음 일정</th>
            </tr>
          </thead>
          <tbody>
            {recentMembers.map((member) => (
              <tr key={member.id} class="ot-row">
                <td class="td-member">
                  <a href={`/members/${member.id}`} class="member-cell member-cell-link">
                    <div class="member-avatar">{member.name.charAt(0)}</div>
                    <div class="member-info">
                      <div class="member-name-status">
                        <strong class="member-name">{member.name}</strong>
                        <span
                          class={`status-badge status-badge--sm ${
                            member.status === '유효' ? 'status-badge--valid' :
                            member.status === '만료' ? 'status-badge--expired' :
                            member.status === '예비' ? 'status-badge--prospect' :
                            'status-badge--none'
                          }`}
                        >
                          {member.status}
                        </span>
                      </div>
                      <span class="member-phone">{member.phone}</span>
                      <span class="member-gender">{member.gender} · {member.birthDate}</span>
                    </div>
                  </a>
                </td>
                <td class="td-registration">
                  <div class="registration-info">
                    <span class="registration-date">{member.registeredDate}</span>
                    <span class="days-badge">D+{member.daysFromRegistration}</span>
                  </div>
                </td>
                <td class="td-goal">
                  <span class="workout-goal">{member.workoutGoal}</span>
                </td>
                <td class="td-exercises">
                  <div class="exercise-tags">
                    {member.currentExercises.map((exercise, idx) => (
                      <span key={idx} class="exercise-tag">{exercise}</span>
                    ))}
                  </div>
                </td>
                <td class="td-level">
                  <span class={`level-badge level-badge--${member.fitnessLevel === '초급' ? 'beginner' : member.fitnessLevel === '중급' ? 'intermediate' : 'advanced'}`}>
                    {member.fitnessLevel}
                  </span>
                </td>
                <td class="td-notes">
                  <span class="health-notes">{member.healthNotes}</span>
                </td>
                <td class="td-progress">
                  <div class="ot-progress-cell">
                    <div class="progress-info">
                      <span class="progress-text">{member.completedOTSessions}/{member.totalOTSessions}</span>
                      <span class="progress-percent">{member.otProgress}%</span>
                    </div>
                    <div class="progress-bar">
                      <div 
                        class={`progress-fill ${member.otProgress === 100 ? 'progress-fill--complete' : ''}`}
                        style={`width: ${member.otProgress}%`}
                      ></div>
                    </div>
                  </div>
                </td>
                <td class="td-trainer">
                  <span class="trainer-name">{member.assignedTrainer}</span>
                  <span class="preferred-time">{member.preferredTime}</span>
                </td>
                <td class="td-next-session">
                  {member.nextSessionDate !== '-' ? (
                    <span class="next-session-date">{member.nextSessionDate}</span>
                  ) : (
                    <span class="session-complete">✓ 완료</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State if no members */}
      {recentMembers.length === 0 && (
        <div class="empty-state">
          <i class="fas fa-users-slash" style="font-size: 3rem; color: #94a3b8; margin-bottom: 1rem;"></i>
          <p class="empty-state-text">최근 14일 내 신규 등록 회원이 없습니다.</p>
        </div>
      )}
    </section>
  )
}
