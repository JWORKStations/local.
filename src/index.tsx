import { Hono } from 'hono'
import { renderer } from './renderer'
import { AppShell } from './components/AppShell'
import {
  AttendancePage,
  AttendancePageActions,
} from './pages/AttendancePage'
import {
  DashboardPage,
  DashboardPageActions,
} from './pages/DashboardPage'
import {
  MembersPage,
  MembersPageActions,
} from './pages/MembersPage'
import {
  MemberDetailPage,
  MemberDetailPageActions,
} from './pages/MemberDetailPage'
import {
  ProspectMembersPage,
  ProspectMembersPageActions,
} from './pages/ProspectMembersPage'
import { OrientationListPage } from './pages/OrientationListPage'
import { ReferralListPage } from './pages/ReferralListPage'
import { ContractSettingsPage } from './pages/ContractSettingsPage'
import { ProductsPage, ProductsPageActions } from './pages/ProductsPage'
import { SchedulePage } from './pages/SchedulePage'
import { NoticesPage, NoticesPageActions } from './pages/NoticesPage'
import { ConsultPage, ConsultPageActions } from './pages/ConsultPage'
import { CommunityPage, CommunityPageActions } from './pages/CommunityPage'
import { SalesPage } from './pages/SalesPage'
import { SettlementPage } from './pages/SettlementPage'
import { StaffPage, StaffPageActions } from './pages/StaffPage'
import { PayrollPage, PayrollPageActions } from './pages/PayrollPage'
import { LockerPage, LockerPageActions } from './pages/LockerPage'
import { AccessLogPage, AccessLogPageActions } from './pages/AccessLogPage'
import { AccessSettingsPage, AccessSettingsPageActions } from './pages/AccessSettingsPage'
import { CostManagementPage, CostManagementPageActions } from './pages/CostManagementPage'

const app = new Hono()

app.use(renderer)

app.get('/', (c) =>
  c.render(
    <AppShell
      activeMenu="attendance"
      pageTitle="출석 현황"
      pageDescription="오늘 센터에 방문한 회원을 실시간으로 확인하세요."
      pageActions={<AttendancePageActions />}
    >
      <AttendancePage />
    </AppShell>
  )
)

app.get('/dashboard', (c) =>
  c.render(
    <AppShell
      activeMenu="dashboard"
      pageTitle="출석 대시보드"
      pageDescription="운영 성과와 주요 지표를 한 번에 확인하세요."
      pageActions={<DashboardPageActions />}
    >
      <DashboardPage />
    </AppShell>
  )
)

app.get('/members', (c) =>
  c.render(
    <AppShell
      activeMenu="members"
      pageTitle="회원 관리"
      pageDescription="등록된 모든 회원의 정보를 확인하고 관리하세요."
      pageActions={<MembersPageActions />}
    >
      <MembersPage />
    </AppShell>
  )
)

app.get('/members/prospects', (c) =>
  c.render(
    <AppShell
      activeMenu="members"
      pageTitle="예비회원 관리"
      pageDescription="예비회원의 정보를 확인하고 관리하세요."
      pageActions={<ProspectMembersPageActions />}
    >
      <ProspectMembersPage />
    </AppShell>
  )
)

app.get('/members/orientation', (c) =>
  c.render(
    <AppShell
      activeMenu="members"
      pageTitle="OT 리스트"
      pageDescription="최근 14일 이내 등록 회원의 운동 정보 및 OT 진행 상황을 확인하세요."
    >
      <OrientationListPage />
    </AppShell>
  )
)

app.get('/members/referrals', (c) =>
  c.render(
    <AppShell
      activeMenu="members"
      pageTitle="추천 리스트"
      pageDescription="회원 추천 현황과 혜택 지급 상태를 확인하세요."
    >
      <ReferralListPage />
    </AppShell>
  )
)

app.get('/members/contracts', (c) =>
  c.render(
    <AppShell
      activeMenu="members"
      pageTitle="전자계약 설정"
      pageDescription="회원 가입 시 사용할 전자계약서 템플릿을 관리하세요."
    >
      <ContractSettingsPage />
    </AppShell>
  )
)

app.get('/members/:id', (c) => {
  const memberId = c.req.param('id')
  return c.render(
    <AppShell
      activeMenu="members"
      pageTitle="회원 상세"
      pageDescription="회원의 상세 정보를 확인하고 관리하세요."
      pageActions={<MemberDetailPageActions />}
    >
      <MemberDetailPage memberId={memberId} />
    </AppShell>
  )
})

app.get('/products', (c) =>
  c.render(
    <AppShell
      activeMenu="products"
      pageTitle="상품"
      pageDescription="판매 상품을 등록하고 관리하세요."
      pageActions={<ProductsPageActions />}
    >
      <ProductsPage />
    </AppShell>
  )
)

app.get('/schedule', (c) =>
  c.render(
    <AppShell
      activeMenu="schedule"
      pageTitle="일정"
      pageDescription="회원 및 강사의 일정을 관리하고 수업을 스케줄링하세요."
    >
      <SchedulePage />
    </AppShell>
  )
)

app.get('/guide/notices', (c) =>
  c.render(
    <AppShell
      activeMenu="guide"
      pageTitle="공지사항"
      pageDescription="회원앱과 강사앱에 표시될 공지사항을 관리하세요."
      pageActions={<NoticesPageActions />}
    >
      <NoticesPage />
    </AppShell>
  )
)

app.get('/guide/consult', (c) =>
  c.render(
    <AppShell
      activeMenu="guide"
      pageTitle="상담관리"
      pageDescription="센터 방문 상담 및 문의 내역을 관리하세요."
      pageActions={<ConsultPageActions />}
    >
      <ConsultPage />
    </AppShell>
  )
)

app.get('/guide/community', (c) =>
  c.render(
    <AppShell
      activeMenu="guide"
      pageTitle="커뮤니티"
      pageDescription="회원들의 게시글과 소통 내역을 관리하세요."
      pageActions={<CommunityPageActions />}
    >
      <CommunityPage />
    </AppShell>
  )
)

app.get('/sales', (c) =>
  c.render(
    <AppShell
      activeMenu="sales"
      pageTitle="매출"
      pageDescription="센터의 매출 현황을 확인하고 정산을 관리하세요."
    >
      <SalesPage />
    </AppShell>
  )
)

app.get('/sales/settlement', (c) =>
  c.render(
    <AppShell
      activeMenu="sales"
      pageTitle="정산"
      pageDescription="결제수단별, 카드사별, 플랫폼별 정산 내역을 확인하세요."
    >
      <SettlementPage />
    </AppShell>
  )
)

app.get('/staff', (c) =>
  c.render(
    <AppShell
      activeMenu="staff"
      pageTitle="구성원"
      pageDescription="센터 구성원을 관리하고 권한을 설정하세요."
      pageActions={<StaffPageActions />}
    >
      <StaffPage />
    </AppShell>
  )
)

app.get('/staff/payroll', (c) =>
  c.render(
    <AppShell
      activeMenu="staff"
      pageTitle="급여정산"
      pageDescription="구성원의 급여를 계산하고 정산을 관리하세요."
      pageActions={<PayrollPageActions />}
    >
      <PayrollPage />
    </AppShell>
  )
)

app.get('/locker', (c) =>
  c.render(
    <AppShell
      activeMenu="locker"
      pageTitle="락커"
      pageDescription="락커 배정 현황을 확인하고 관리하세요."
      pageActions={<LockerPageActions />}
    >
      <LockerPage />
    </AppShell>
  )
)

app.get('/access', (c) =>
  c.render(
    <AppShell
      activeMenu="access.log"
      pageTitle="출입 기록"
      pageDescription="센터 출입 로그를 실시간으로 확인하세요."
      pageActions={<AccessLogPageActions />}
    >
      <AccessLogPage />
    </AppShell>
  )
)

app.get('/access/settings', (c) =>
  c.render(
    <AppShell
      activeMenu="access.settings"
      pageTitle="출입 관리"
      pageDescription="출입 기록 필터링 및 알림 설정을 관리하세요."
      pageActions={<AccessSettingsPageActions />}
    >
      <AccessSettingsPage />
    </AppShell>
  )
)

app.get('/finance', (c) =>
  c.render(
    <AppShell
      activeMenu="finance"
      pageTitle="비용관리"
      pageDescription="카드, 계좌, 인건비 정보를 취합하여 매입매출을 계산하세요."
      pageActions={<CostManagementPageActions />}
    >
      <CostManagementPage />
    </AppShell>
  )
)

export default app
