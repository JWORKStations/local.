import type { FC } from 'hono/jsx'

type HighlightCard = {
  title: string
  value: string
  caption: string
  cta: string
  variant?: 'highlight' | 'light'
  gradient?: string
}

type HighlightList = {
  title: string
  subtitle: string
  items: Array<{ label: string; value: string; accent?: string }>
}

type TodoItem = {
  title: string
  detail: string
  status: 'pending' | 'alert' | 'done'
}

type HourlyAttendance = {
  label: string
  value: number
}

type StaffRevenueLeader = {
  name: string
  amount: string
  color: string
  background: string
}

type SalesTimelinePoint = {
  label: string
  value: number
}

type ProductSales = {
  label: string
  current: number
  previous: number
}

const highlightCards: HighlightCard[] = [
  {
    title: '만료예정 30일 이내 회원',
    value: '217명',
    caption: '오늘(2025.11.28) 기준',
    cta: '메시지 보내기',
    variant: 'highlight',
    gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
  },
  {
    title: '10일 이상 미출석 회원',
    value: '373명',
    caption: '최근 10일 미방문 회원',
    cta: '메시지 보내기',
    variant: 'highlight',
    gradient: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
  },
  {
    title: '유효회원',
    value: '1,257명',
    caption: '2025년 11월 기준',
    cta: '메시지 보내기',
    variant: 'light',
  },
]

const attendanceRank: HighlightList = {
  title: '출석왕',
  subtitle: '월간 TOP 3',
  items: [
    { label: '1. 박병규', value: '37회', accent: '+12' },
    { label: '2. 서종훈', value: '30회', accent: '+8' },
    { label: '3. 송정화', value: '26회', accent: '+5' },
  ],
}

const vipRank: HighlightList = {
  title: 'VIP 회원',
  subtitle: '매출 TOP 3',
  items: [
    { label: '1. 최재규', value: '35,000,000원' },
    { label: '2. 원지호', value: '21,500,000원' },
    { label: '3. 안하균', value: '18,900,000원' },
  ],
}

const todoItems: TodoItem[] = [
  { title: 'VIP 상담 예약 확인', detail: '오늘 14:00 · 안하균 재계약 상담', status: 'alert' },
  { title: '미출석 회원 케어', detail: '미출석 10명 대상 메시지 발송', status: 'pending' },
  { title: '강사 스케줄 조정', detail: '17:00 · PT 강사 주간 회의', status: 'pending' },
]

const attendanceTrend = [72, 68, 74, 70, 76, 82, 78, 86, 84, 88, 92, 87, 90, 93]

const hourlyAttendance: HourlyAttendance[] = [
  { label: '06시', value: 12 },
  { label: '08시', value: 24 },
  { label: '10시', value: 32 },
  { label: '12시', value: 40 },
  { label: '14시', value: 34 },
  { label: '16시', value: 28 },
  { label: '18시', value: 36 },
  { label: '20시', value: 30 },
  { label: '22시', value: 18 },
]

const membershipRatio = [
  { label: '재등록', value: 55, color: '#6366f1' },
  { label: '첫 등록', value: 45, color: '#22c55e' },
]

const staffRevenueLeaders: StaffRevenueLeader[] = [
  {
    name: '제니',
    amount: '22,685,000원',
    color: '#6366f1',
    background: 'rgba(99, 102, 241, 0.12)',
  },
  {
    name: '사라',
    amount: '12,000,000원',
    color: '#8b5cf6',
    background: 'rgba(139, 92, 246, 0.12)',
  },
  {
    name: '로이',
    amount: '9,465,000원',
    color: '#0ea5e9',
    background: 'rgba(14, 165, 233, 0.12)',
  },
  {
    name: '케이',
    amount: '5,905,000원',
    color: '#38bdf8',
    background: 'rgba(56, 189, 248, 0.12)',
  },
  {
    name: '이든',
    amount: '3,405,000원',
    color: '#22c55e',
    background: 'rgba(34, 197, 94, 0.12)',
  },
  {
    name: '라라',
    amount: '2,770,000원',
    color: '#f97316',
    background: 'rgba(249, 115, 22, 0.12)',
  },
  {
    name: '제이나',
    amount: '2,733,000원',
    color: '#ec4899',
    background: 'rgba(236, 72, 153, 0.12)',
  },
  {
    name: '에릭',
    amount: '0원',
    color: '#94a3b8',
    background: 'rgba(148, 163, 184, 0.18)',
  },
]

const salesTimeline: SalesTimelinePoint[] = [
  { label: '01', value: 180 },
  { label: '02', value: 210 },
  { label: '03', value: 240 },
  { label: '04', value: 190 },
  { label: '05', value: 260 },
  { label: '06', value: 280 },
  { label: '07', value: 220 },
  { label: '08', value: 300 },
  { label: '09', value: 320 },
  { label: '10', value: 280 },
  { label: '11', value: 310 },
  { label: '12', value: 330 },
  { label: '13', value: 270 },
  { label: '14', value: 350 },
  { label: '15', value: 360 },
  { label: '16', value: 310 },
  { label: '17', value: 295 },
  { label: '18', value: 340 },
  { label: '19', value: 370 },
  { label: '20', value: 390 },
  { label: '21', value: 410 },
  { label: '22', value: 360 },
  { label: '23', value: 320 },
  { label: '24', value: 340 },
  { label: '25', value: 380 },
  { label: '26', value: 360 },
  { label: '27', value: 400 },
  { label: '28', value: 420 },
  { label: '29', value: 390 },
  { label: '30', value: 410 },
]

const productSales: ProductSales[] = [
  { label: '회원권', current: 620, previous: 560 },
  { label: 'PT', current: 540, previous: 480 },
  { label: '필라테스', current: 460, previous: 390 },
  { label: '기타 프로그램', current: 320, previous: 270 },
]

const monthlyRevenue = '87,204,900원'

const toPolylinePoints = (values: number[]) => {
  if (values.length < 2) return ''
  return values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * 100
      const y = 100 - value
      return `${x},${y}`
    })
    .join(' ')
}

const lineChartPoints = toPolylinePoints(attendanceTrend)

const pieGradient = membershipRatio
  .reduce<{ gradients: string[]; offset: number }>((acc, item) => {
    const nextOffset = acc.offset + item.value
    acc.gradients.push(`${item.color} ${acc.offset}% ${nextOffset}%`)
    return { gradients: acc.gradients, offset: nextOffset }
  }, { gradients: [], offset: 0 })
  .gradients.join(', ')

const salesTimelineMax = Math.max(...salesTimeline.map((item) => item.value)) || 1
const hourlyAttendanceMax = Math.max(...hourlyAttendance.map((item) => item.value)) || 1
const productSalesMax =
  Math.max(
    ...productSales.flatMap((item) => [item.current, item.previous])
  ) || 1

export const DashboardPageActions: FC = () => (
  <div class="action-group">
    <button type="button" class="btn btn-ghost">
      리포트 내보내기
    </button>
    <button type="button" class="btn btn-primary">
      공지 발송하기
    </button>
  </div>
)

export const DashboardPage: FC = () => {
  return (
    <section class="dashboard-page">
      <div class="dashboard-top">
        <div class="dashboard-top__left">
          <div class="dashboard-tabs" role="tablist" aria-label="조회 기간">
            <button type="button" role="tab" class="is-active">
              월
            </button>
            <button type="button" role="tab">
              누적
            </button>
            <button type="button" role="tab">
              일
            </button>
            <button type="button" role="tab">
              오늘
            </button>
          </div>
          <p class="dashboard-announce">바디스타 피트니스 운영지표 정비 준비에 참여해 주세요!</p>
        </div>
        <div class="dashboard-top__right">2025.11.28 13:28 업데이트됨</div>
      </div>

      <div class="dashboard-date-nav" aria-label="월 선택">
        <button type="button" class="icon-button subtle" aria-label="이전 달">
          ‹
        </button>
        <h2>2025년 11월</h2>
        <button type="button" class="icon-button subtle" aria-label="다음 달">
          ›
        </button>
      </div>

      <div class="dashboard-kpi-row">
        <div class="dashboard-kpi-left">
          <div class="dashboard-notice">
            <span class="dashboard-notice__icon">📢</span>
            <p class="dashboard-notice__text">국내 1위 헬스&amp;PT 플랫폼에서 결제한 당일으로부터 서비스를 제공받으실 수 있어요. 🔥✨</p>
          </div>
          <div class="dashboard-kpi-cards">
            {highlightCards.map((card, index) => (
              <article
                key={card.title}
                class={`kpi-card ${card.variant === 'highlight' ? 'kpi-card--highlight' : 'kpi-card--light'}`}
                style={card.gradient ? { background: card.gradient } : undefined}
              >
                <div class="kpi-card__header">
                  <p class="kpi-card__title">{card.title}</p>
                  <p class="kpi-card__subtitle">{card.caption}</p>
                </div>
                <strong class="kpi-card__value">{card.value}</strong>
                <button type="button" class="kpi-card__cta">
                  {card.cta}
                </button>
              </article>
            ))}

            {[attendanceRank, vipRank].map((list, index) => (
              <article key={list.title} class={`kpi-card kpi-card--light kpi-card--list`}>
                <div class="kpi-card__header">
                  <h3>{list.title}</h3>
                  <span>{list.subtitle}</span>
                </div>
                <ul class="list-metric" role="list">
                  {list.items.map((item) => (
                    <li key={item.label}>
                      <span class="list-metric__label">{item.label}</span>
                      <span class="list-metric__value">{item.value}</span>
                      {item.accent && <span class="list-metric__accent">{item.accent}</span>}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>

        <article class="kpi-card kpi-card--todo">
          <div class="kpi-card__header">
            <h3>ToDo리스트</h3>
            <span>오늘 처리해야 할 업무</span>
          </div>
          <ul class="todo-list" role="list">
            {todoItems.map((item) => (
              <li key={item.title} data-status={item.status}>
                <div>
                  <strong>{item.title}</strong>
                  <span>{item.detail}</span>
                </div>
                <span class="todo-badge">
                  {item.status === 'alert' ? '긴급' : item.status === 'done' ? '완료' : '대기'}
                </span>
              </li>
            ))}
          </ul>
          <button type="button" class="kpi-card__cta">
            할 일 관리하기
          </button>
        </article>
      </div>

      <div class="dashboard-grid">
        <section class="panel span-4 panel--line">
          <header class="panel__header">
            <div>
              <h3>회원 출석률</h3>
              <span>최근 2주간 일별 추이</span>
            </div>
          </header>
          <div class="panel__body">
            <svg class="chart chart--line" viewBox="0 0 100 100" preserveAspectRatio="none">
              <polyline points={lineChartPoints} />
              {attendanceTrend.map((value, index) => {
                const x = (index / (attendanceTrend.length - 1)) * 100
                const y = 100 - value
                return <circle key={index} cx={x} cy={y} r={1.5} />
              })}
            </svg>
            <div class="chart__labels">
              {attendanceTrend.map((_, index) => (
                <span key={`attendance-label-${index}`}>D{index + 1}</span>
              ))}
            </div>
          </div>
        </section>

        <section class="panel span-4">
          <header class="panel__header">
            <div>
              <h3>시간대별 평균 출석 회원</h3>
              <span>단위: 명</span>
            </div>
          </header>
          <div class="panel__body">
            <div class="chart chart--bar">
              {hourlyAttendance.map((item) => (
                <div class="bar" key={item.label}>
                  <div
                    class="bar__value"
                    style={{ height: `${(item.value / hourlyAttendanceMax) * 32}px` }}
                  ></div>
                  <span class="bar__label">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section class="panel span-4 panel--center">
          <header class="panel__header">
            <div>
              <h3>재등록 회원 비율</h3>
              <span>회원권 구성 비중</span>
            </div>
          </header>
          <div class="panel__body panel__body--center">
            <div
              class="pie-chart pie-chart--compact"
              style={{ background: `conic-gradient(${pieGradient})` }}
              role="img"
              aria-label="재등록 회원 비율"
            ></div>
            <ul class="legend" role="list">
              {membershipRatio.map((item) => (
                <li key={item.label}>
                  <span class="dot" style={{ backgroundColor: item.color }}></span>
                  <span>{item.label}</span>
                  <strong>{item.value}%</strong>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section class="panel span-4 panel--value">
          <header class="panel__header">
            <div>
              <h3>월매출</h3>
              <span>확정 매출 기준</span>
            </div>
          </header>
          <div class="panel__body panel__body--center">
            <strong class="metric metric--xl">{monthlyRevenue}</strong>
          </div>
        </section>

        <section class="panel span-8">
          <header class="panel__header">
            <div>
              <h3>구성원 매출액 순위</h3>
              <span>단위: 원</span>
            </div>
          </header>
          <div class="panel__body">
            <ul class="chip-list" role="list">
              {staffRevenueLeaders.map((staff) => (
                <li
                  key={staff.name}
                  class="chip chip--leader"
                  style={{ color: staff.color, background: staff.background }}
                >
                  <span class="chip__name">{staff.name}</span>
                  <span class="chip__value">{staff.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section class="panel span-7">
          <header class="panel__header">
            <div>
              <h3>매출</h3>
              <span>일별 실적 (단위: 만원)</span>
            </div>
          </header>
          <div class="panel__body">
            <div class="chart chart--bar chart--bar-wide">
              {salesTimeline.map((point) => (
                <div class="bar" key={point.label}>
                  <div
                    class="bar__value"
                    style={{ height: `${(point.value / salesTimelineMax) * 80}px` }}
                  ></div>
                  <span class="bar__label">{point.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section class="panel span-5">
          <header class="panel__header">
            <div>
              <h3>상품유형별 매출</h3>
              <span>단위: 건</span>
            </div>
          </header>
          <div class="panel__body">
            <div class="chart chart--grouped">
              {productSales.map((item) => (
                <div class="group" key={item.label}>
                  <div class="group__bars">
                    <span
                      class="group__bar group__bar--primary"
                      style={{ height: `${(item.current / productSalesMax) * 80}px` }}
                    ></span>
                    <span
                      class="group__bar group__bar--secondary"
                      style={{ height: `${(item.previous / productSalesMax) * 80}px` }}
                    ></span>
                  </div>
                  <span class="group__label">{item.label}</span>
                </div>
              ))}
            </div>
            <div class="chart-legend">
              <span>
                <span class="dot dot--primary"></span>
                이번 달
              </span>
              <span>
                <span class="dot dot--secondary"></span>
                지난 달
              </span>
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}
