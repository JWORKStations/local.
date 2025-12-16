import type { FC, JSX } from 'hono/jsx'

type MenuChild = {
  key: string
  label: string
  href: string
  badge?: string
}

const cls = (
  ...values: Array<string | Record<string, boolean> | undefined | null | false>
) =>
  values
    .flatMap((value) => {
      if (!value) return []
      if (typeof value === 'string') return [value]
      return Object.entries(value)
        .filter(([, active]) => Boolean(active))
        .map(([className]) => className)
    })
    .join(' ')

type MenuGroup = {
  key: string
  label: string
  icon: string
  tone: 'indigo' | 'purple' | 'blue' | 'green' | 'orange' | 'pink' | 'slate'
  href?: string
  badge?: string
  accessLabel?: string
  children?: MenuChild[]
}

const menuGroups: MenuGroup[] = [
  {
    key: 'attendance',
    label: '출석',
    icon: '🗓️',
    tone: 'purple',
    href: '/',
    badge: '실시간',
  },
  {
    key: 'members',
    label: '회원',
    icon: '👥',
    tone: 'blue',
    children: [
      { key: 'members', label: '회원', href: '/members' },
      { key: 'prospects', label: '예비회원', href: '/members/prospects' },
      { key: 'orientation', label: 'OT 리스트', href: '/members/orientation' },
      { key: 'referrals', label: '추천리스트', href: '/members/referrals' },
      { key: 'contracts', label: '전자계약서', href: '/members/contracts' },
    ],
  },
  {
    key: 'products',
    label: '상품',
    icon: '🛒',
    tone: 'orange',
    href: '/products',
  },
  {
    key: 'schedule',
    label: '일정',
    icon: '🕒',
    tone: 'green',
    href: '/schedule',
  },
  {
    key: 'guide',
    label: '안내',
    icon: '📢',
    tone: 'indigo',
    children: [
      { key: 'notices', label: '공지사항', href: '/guide/notices' },
      { key: 'consult', label: '상담관리', href: '/guide/consult' },
      { key: 'community', label: '커뮤니티', href: '/guide/community' },
    ],
  },
  {
    key: 'sales',
    label: '매출',
    icon: '💰',
    tone: 'green',
    children: [
      { key: 'overview', label: '매출', href: '/sales' },
      { key: 'settlement', label: '정산', href: '/sales/settlement' },
    ],
  },
  {
    key: 'staff',
    label: '구성원',
    icon: '🧑‍🤝‍🧑',
    tone: 'pink',
    children: [
      { key: 'directory', label: '구성원', href: '/staff' },
      { key: 'payroll', label: '급여정산', href: '/staff/payroll' },
    ],
  },
  {
    key: 'locker',
    label: '락커',
    icon: '🔒',
    tone: 'slate',
    href: '/locker',
  },
  {
    key: 'kiosk',
    label: '키오스크',
    icon: '🖥️',
    tone: 'indigo',
    href: '/kiosk',
  },
  {
    key: 'access',
    label: '출입',
    icon: '🚪',
    tone: 'purple',
    children: [
      { key: 'log', label: '출입 기록', href: '/access' },
      { key: 'settings', label: '출입 관리', href: '/access/settings' },
    ],
  },
  {
    key: 'dashboard',
    label: '대시보드',
    icon: '📊',
    tone: 'indigo',
    href: '/dashboard',
  },
  {
    key: 'cost',
    label: '비용관리',
    icon: '💼',
    tone: 'orange',
    href: '/finance',
  },
  {
    key: 'settings',
    label: '설정',
    icon: '⚙️',
    tone: 'slate',
    href: '/settings',
  },
]

export type AppShellProps = {
  activeMenu: string
  pageTitle: string
  pageDescription?: string
  pageActions?: JSX.Element
  children: JSX.Element
}

export const AppShell: FC<AppShellProps> = ({
  activeMenu,
  pageTitle,
  pageDescription,
  pageActions,
  children,
}) => {
  const [activeGroupKey, activeChildKey] = activeMenu.split('.') as [string, string?]

  return (
    <div class="layout" data-layout>
      <aside class="sidebar" aria-label="사이드바 내비게이션">
        <div class="sidebar__brand">
          <a class="brand" href="/dashboard">
            <div class="brand__mark">B</div>
            <div class="brand__label">
              <span class="brand__name">BDSR CRM</span>
              <span class="brand__subtitle">센터 운영 플랫폼</span>
            </div>
          </a>
        </div>
        <nav class="sidebar__nav" aria-label="주요 메뉴">
          <ul class="sidebar__menu" role="list">
            {menuGroups.map((group) => {
              const hasChildren = Boolean(group.children?.length)
              const isGroupActive = activeGroupKey === group.key
              const isLeafActive = !hasChildren && activeGroupKey === group.key
              const submenuId = hasChildren ? `submenu-${group.key}` : undefined

              return (
                <li
                  class={cls(
                    'sidebar__menu-item',
                    hasChildren ? 'has-children' : 'is-leaf',
                    {
                      'is-open': hasChildren && isGroupActive,
                      'is-active': hasChildren ? isGroupActive : isLeafActive,
                    }
                  )}
                  key={group.key}
                  data-group-key={hasChildren ? group.key : undefined}
                  data-has-children={hasChildren ? 'true' : undefined}
                  data-initial-open={hasChildren && isGroupActive ? 'true' : undefined}
                >
                  {hasChildren ? (
                    <>
                      <button
                        type="button"
                        class="sidebar__menu-link sidebar__menu-toggle"
                        data-accordion-trigger
                        aria-expanded={hasChildren && isGroupActive ? 'true' : 'false'}
                        aria-controls={submenuId}
                      >
                        <span
                          class={cls('sidebar__icon', `tone-${group.tone}`)}
                          aria-hidden="true"
                        >
                          {group.icon}
                        </span>
                        <span class="sidebar__label-group">
                          <span class="sidebar__label">{group.label}</span>
                          {group.accessLabel && (
                            <span class="sidebar__access">{group.accessLabel}</span>
                          )}
                        </span>
                        <span class="sidebar__caret" aria-hidden="true">⌄</span>
                      </button>
                      <ul class="sidebar__submenu" id={submenuId} role="list">
                        {group.children?.map((child) => {
                          const isChildActive = isGroupActive && activeChildKey === child.key
                          return (
                            <li
                              class={cls('sidebar__submenu-item', {
                                'is-active': isChildActive,
                              })}
                              key={`${group.key}.${child.key}`}
                            >
                              <a
                                href={child.href}
                                class="sidebar__submenu-link"
                                aria-current={isChildActive ? 'page' : undefined}
                              >
                                <span class="sidebar__submenu-label">{child.label}</span>
                                {child.badge && <span class="sidebar__badge">{child.badge}</span>}
                              </a>
                            </li>
                          )
                        })}
                      </ul>
                    </>
                  ) : (
                    <a
                      href={group.href ?? '#'}
                      class="sidebar__menu-link"
                      aria-current={isLeafActive ? 'page' : undefined}
                    >
                      <span
                        class={cls('sidebar__icon', `tone-${group.tone}`)}
                        aria-hidden="true"
                      >
                        {group.icon}
                      </span>
                      <span class="sidebar__label-group">
                        <span class="sidebar__label">{group.label}</span>
                        {group.accessLabel && (
                          <span class="sidebar__access">{group.accessLabel}</span>
                        )}
                      </span>
                      {group.badge && <span class="sidebar__badge">{group.badge}</span>}
                    </a>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>
        <div class="sidebar__footer">
          <div class="sidebar__cta">
            <p class="sidebar__cta-title">바디 관리 도움센터</p>
            <p class="sidebar__cta-desc">운영 가이드와 베스트 프랙티스를 확인하세요.</p>
            <a class="sidebar__cta-link" href="#">도움말 보기</a>
          </div>
        </div>
      </aside>
      <div class="workspace">
        <header class="topbar">
          <div class="topbar__left">
            <button
              class="icon-button"
              type="button"
              data-toggle-sidebar
              aria-label="사이드바 토글"
            >
              <span class="icon-bars" aria-hidden="true"></span>
            </button>
            <div class="topbar__search" role="search">
              <span class="search-icon" aria-hidden="true">🔍</span>
              <input
                type="search"
                placeholder="회원 이름, 연락처 등으로 검색"
                aria-label="회원 검색"
              />
            </div>
          </div>
          <div class="topbar__right">
            <button type="button" class="ghost-button">공지센터</button>
            <button type="button" class="ghost-button">문의하기</button>
            <button class="icon-button" type="button" aria-label="알림">
              <span class="icon-bell" aria-hidden="true"></span>
              <span class="badge-dot" aria-hidden="true"></span>
            </button>
            <div class="user-chip" role="button" tabIndex={0}>
              <span class="user-chip__avatar" aria-hidden="true">
                <span>J</span>
              </span>
              <div class="user-chip__meta">
                <span class="user-chip__name">제이슨 매니저</span>
                <span class="user-chip__role">슈퍼관리자</span>
              </div>
              <span class="user-chip__chevron" aria-hidden="true">⌄</span>
            </div>
          </div>
        </header>
        <main class="main-content">{children}</main>
      </div>
    </div>
  )
}
