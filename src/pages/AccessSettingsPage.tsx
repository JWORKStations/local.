export function AccessSettingsPage() {
  const allowedMemberships = [
    '일반회원/개인회원권',
    '일반회원/4주 평일',
    '수강권/3PT',
    '일반회원/연장회원',
    '일반회원/초-OX (1회 등록 회원권)',
    '일반회원/회원권_시설X',
    '일반회원/초+수영',
    'PT회원/초+3PT 2:1',
    '일반회원/수영레슨',
    '일반회원/재계약 레슨비 부과 회원권',
  ];

  return (
    <div class="access-settings-page">
      {/* 탭 메뉴 */}
      <div class="page-tabs">
        <a href="/access" class="page-tab">출입 기록</a>
        <a href="/access/settings" class="page-tab active">출입 관리</a>
      </div>

      <div class="settings-section">
        <h3 class="settings-title">출입 기록 설정</h3>
        <div class="settings-description">
          출입 기록의 필터링 및 알림 설정을 관리합니다.
        </div>

        <div class="settings-card compact">
          <div class="settings-item compact">
            <div class="settings-item-header">
              <div class="settings-item-title">
                <i class="fas fa-clock"></i>
                <span>3시간 중복 필터링</span>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" checked />
                <span class="toggle-slider"></span>
              </label>
            </div>
            <div class="settings-item-description">
              회원의 경우 3시간 이내 중복 출입은 출석에 표시되지 않습니다. 출입 로그에는 모두 기록됩니다.
            </div>
          </div>

          <div class="settings-item compact">
            <div class="settings-item-header">
              <div class="settings-item-title">
                <i class="fas fa-user-tie"></i>
                <span>직원 출입 기록</span>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" checked />
                <span class="toggle-slider"></span>
              </label>
            </div>
            <div class="settings-item-description">
              구성원(직원)의 출입 기록을 모두 저장합니다.
            </div>
          </div>

          <div class="settings-item compact">
            <div class="settings-item-header">
              <div class="settings-item-title">
                <i class="fas fa-bell"></i>
                <span>실시간 출입 알림</span>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" />
                <span class="toggle-slider"></span>
              </label>
            </div>
            <div class="settings-item-description">
              회원 및 구성원의 출입 시 실시간으로 알림을 받습니다.
            </div>
          </div>
        </div>
      </div>

      <div class="settings-section">
        <h3 class="settings-title">출입 가능 회원권</h3>
        <div class="settings-description">
          아래 회원권을 독립으로 또는 패키지로 포함해서 이 출입문으로 출입이 가능하도록 출입권을 정의할 수 있습니다.
        </div>

        <div class="settings-card">
          <div class="membership-tabs">
            <button class="membership-tab active">
              <i class="fas fa-check-circle"></i>
              <span>출입 가능 회원권 ({allowedMemberships.length})</span>
            </button>
            <button class="membership-tab">
              <i class="fas fa-times-circle"></i>
              <span>출입 제한 회원권 (0/0)</span>
            </button>
          </div>

          <div class="membership-list">
            {allowedMemberships.map((membership, index) => (
              <div key={index} class="membership-item">
                <span>{membership}</span>
                <i class="fas fa-chevron-right"></i>
              </div>
            ))}
          </div>

          <div class="membership-empty">
            출입을 제한한 회원권이 없어요.
          </div>
        </div>
      </div>

      <div class="settings-section">
        <h3 class="settings-title">출입 시간대 설정</h3>
        <div class="settings-description">
          출입 기록 필터링을 위한 시간대를 설정합니다.
        </div>

        <div class="settings-card compact">
          <div class="settings-time-item">
            <div class="settings-time-label">
              <i class="fas fa-sun"></i>
              <span>아침</span>
            </div>
            <div class="settings-time-range">
              <input type="time" value="06:00" class="time-input" />
              <span>~</span>
              <input type="time" value="11:00" class="time-input" />
            </div>
          </div>

          <div class="settings-time-item">
            <div class="settings-time-label">
              <i class="fas fa-utensils"></i>
              <span>점심</span>
            </div>
            <div class="settings-time-range">
              <input type="time" value="11:00" class="time-input" />
              <span>~</span>
              <input type="time" value="14:00" class="time-input" />
            </div>
          </div>

          <div class="settings-time-item">
            <div class="settings-time-label">
              <i class="fas fa-cloud-sun"></i>
              <span>오후</span>
            </div>
            <div class="settings-time-range">
              <input type="time" value="14:00" class="time-input" />
              <span>~</span>
              <input type="time" value="18:00" class="time-input" />
            </div>
          </div>

          <div class="settings-time-item">
            <div class="settings-time-label">
              <i class="fas fa-moon"></i>
              <span>야간</span>
            </div>
            <div class="settings-time-range">
              <input type="time" value="18:00" class="time-input" />
              <span>~</span>
              <input type="time" value="23:00" class="time-input" />
            </div>
          </div>
        </div>

        <div class="settings-actions">
          <button class="ghost-button">취소</button>
          <button class="primary-button">
            <i class="fas fa-save"></i> 저장
          </button>
        </div>
      </div>
    </div>
  );
}

export function AccessSettingsPageActions() {
  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <button class="ghost-button">
        <i class="fas fa-undo"></i> 초기화
      </button>
    </div>
  );
}
