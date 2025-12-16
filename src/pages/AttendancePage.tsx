import type { FC } from 'hono/jsx'
import { attendanceMembers } from '../data/attendance'

const viewTabs = [
  { key: 'today', label: '오늘' },
  { key: 'week', label: '이번 주' },
  { key: 'month', label: '이번 달', active: true },
  { key: 'custom', label: '직접 설정' },
]

const filterChips = ['전체', '미등록', '재등록', '이탈 위험']

const statusLabel: Record<'normal' | 'warning' | 'expired', string> = {
  normal: '정상',
  warning: '주의 필요',
  expired: '기간 만료',
}

export const AttendancePageActions: FC = () => (
  <div class="action-group">
    <button type="button" class="btn btn-ghost">
      회원출석 일괄작성
    </button>
    <button type="button" class="btn btn-ghost">
      출석현황 받기
    </button>
    <button type="button" class="btn btn-primary">
      새 회원 등록
    </button>
  </div>
)

export const AttendancePage: FC = () => {
  return (
    <section class="attendance-page">
      <div class="tab-control" role="tablist" aria-label="출석 기간 선택">
        {viewTabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            class={{
              'tab-control__item': true,
              'is-active': !!tab.active,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div class="attendance-toolbar">
        <div class="attendance-date">
          <button type="button" class="icon-button subtle" aria-label="이전 날짜">
            ‹
          </button>
          <div class="attendance-date__label">
            <span class="attendance-date__meta">2025년 11월 28일</span>
          </div>
          <button type="button" class="icon-button subtle" aria-label="다음 날짜">
            ›
          </button>
        </div>

        <div class="attendance-filters">
          {filterChips.map((chip, index) => (
            <button
              key={chip}
              type="button"
              class={{
                'chip-button': true,
                'is-active': index === 0,
              }}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      <div class="attendance-summary">
        <span>
          오늘 출석 회원 <strong>111명</strong>
        </span>
        <div class="attendance-summary__meta">
          <span>PT 진행 36명</span>
          <span>상담 예약 8건</span>
          <span>이탈 위험 회원 5명</span>
        </div>
      </div>

      <div class="attendance-grid">
        {attendanceMembers.map((member) => (
          <article class="attendance-card" key={member.id}>
            <header class="attendance-card__header">
              <div class="attendance-card__identity">
                <div
                  class="avatar"
                  style={{ backgroundColor: member.avatarColor }}
                  aria-hidden="true"
                >
                  {member.name.slice(0, 1)}
                </div>
                <div class="attendance-card__header-info">
                  <div class="attendance-card__name-row">
                    <div class="attendance-card__name">
                      {member.name}
                      <div class="attendance-card__icons">
                        {member.hasPT && (
                          <span class="service-icon service-icon--pt" title="PT 회원">
                            💪
                          </span>
                        )}
                        {member.hasUniform && (
                          <span class="service-icon service-icon--uniform" title="운동복">
                            👕
                          </span>
                        )}
                        {member.hasLocker && (
                          <span class="service-icon service-icon--locker" title="락커">
                            🔒
                          </span>
                        )}
                      </div>
                    </div>
                    <div class="attendance-card__checkin">{member.checkIn}</div>
                  </div>
                  <div class="attendance-card__info">{member.membership}</div>
                </div>
              </div>
            </header>

            <div class="attendance-card__body">
              <div class="attendance-card__row">
                <span class="label">담당 강사</span>
                <span>{member.trainer}</span>
              </div>
              <div class="attendance-card__row">
                <span class="label">잔여</span>
                <span>{member.remainingSessions}</span>
              </div>
              <div class="attendance-card__row">
                <span class="label">연락처</span>
                <span>{member.phone}</span>
              </div>
              <div class="attendance-card__row">
                <span class="label">등록일</span>
                <span>{member.joinedAt}</span>
              </div>
            </div>

            <footer class="attendance-card__footer">
              <span class={{ tag: true, [`status-${member.status}`]: true }}>
                {statusLabel[member.status]}
              </span>
              {member.memo && <span class="memo">{member.memo}</span>}
            </footer>
          </article>
        ))}
      </div>
    </section>
  )
}
