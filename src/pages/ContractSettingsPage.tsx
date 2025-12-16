import type { FC } from 'hono/jsx'

interface ContractTemplate {
  id: string
  name: string
  description: string
  sections: {
    title: string
    content: string
  }[]
  variables: string[]
  isActive: boolean
  createdAt: string
  updatedAt: string
}

// Mock contract templates
const mockTemplates: ContractTemplate[] = [
  {
    id: '1',
    name: '회원권 계약서',
    description: '기본 회원권 계약서 템플릿입니다.',
    sections: [
      {
        title: '계약자 적성서 확정',
        content: '기본으로 작성할 건지 예시대로 작성서를 선택해 주세요.'
      },
      {
        title: '템플릿 설정',
        content: ''
      },
      {
        title: '약관 설정',
        content: '약관의 부수를 설정한 뒤, 각 약관의 제목과 본문을 입력하고, 이에 대해 약관 제가를 받고자 하는가를 설정합니다.'
      }
    ],
    variables: ['회원명', '연락처', '주소', '계약일자', '만료일자'],
    isActive: true,
    createdAt: '2025.01.15',
    updatedAt: '2025.01.15'
  },
  {
    id: '2',
    name: 'PT 계약서',
    description: '개인 레슨 계약서 템플릿입니다.',
    sections: [
      {
        title: '계약자 적성서 확정',
        content: 'PT 전용 계약서 양식'
      }
    ],
    variables: ['회원명', '연락처', '트레이너명', '수업횟수', '계약금액'],
    isActive: true,
    createdAt: '2025.01.10',
    updatedAt: '2025.01.12'
  }
]

export const ContractSettingsPage: FC = () => {
  return (
    <section class="contract-settings-page">
      {/* Tabs Navigation */}
      <div class="members-tabs" role="tablist">
        <a href="/members" role="tab" class="members-tab">
          회원
        </a>
        <a href="/members/prospects" role="tab" class="members-tab">
          예비회원
        </a>
        <a href="/members/orientation" role="tab" class="members-tab">
          OT 리스트
        </a>
        <a href="/members/referrals" role="tab" class="members-tab">
          추천리스트
        </a>
        <a href="/members/contracts" role="tab" class="members-tab is-active" aria-selected="true">
          전자계약 설정
        </a>
      </div>

      {/* Header */}
      <div class="contract-settings-header">
        <div class="contract-settings-info">
          <h2 class="section-title">계약서 템플릿 관리</h2>
          <p class="section-description">회원 가입 시 사용할 전자계약서 템플릿을 생성하고 관리하세요.</p>
        </div>
        <button type="button" class="btn btn-primary">
          <i class="fas fa-plus"></i>
          새 템플릿 만들기
        </button>
      </div>

      {/* Template List */}
      <div class="template-list">
        {mockTemplates.map((template) => (
          <div key={template.id} class="template-card">
            <div class="template-card-header">
              <div class="template-info">
                <h3 class="template-name">{template.name}</h3>
                <p class="template-description">{template.description}</p>
              </div>
              <div class="template-status">
                {template.isActive ? (
                  <span class="status-badge status-badge--active">활성</span>
                ) : (
                  <span class="status-badge status-badge--inactive">비활성</span>
                )}
              </div>
            </div>

            <div class="template-card-body">
              {/* Sections */}
              <div class="template-sections">
                <h4 class="subsection-title">
                  <i class="fas fa-file-alt"></i>
                  계약서 구성
                </h4>
                <div class="section-list">
                  {template.sections.map((section, idx) => (
                    <div key={idx} class="section-item">
                      <div class="section-number">{idx + 1}</div>
                      <div class="section-content">
                        <strong class="section-title-text">{section.title}</strong>
                        {section.content && (
                          <p class="section-description-text">{section.content}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Variables */}
              <div class="template-variables">
                <h4 class="subsection-title">
                  <i class="fas fa-code"></i>
                  사용 가능한 변수
                </h4>
                <div class="variable-tags">
                  {template.variables.map((variable, idx) => (
                    <span key={idx} class="variable-tag">
                      {`{${variable}}`}
                    </span>
                  ))}
                </div>
              </div>

              {/* Metadata */}
              <div class="template-meta">
                <span class="meta-item">
                  <i class="far fa-calendar"></i>
                  생성일: {template.createdAt}
                </span>
                <span class="meta-item">
                  <i class="far fa-clock"></i>
                  수정일: {template.updatedAt}
                </span>
              </div>
            </div>

            <div class="template-card-footer">
              <button type="button" class="btn btn-ghost btn-sm">
                <i class="fas fa-edit"></i>
                편집
              </button>
              <button type="button" class="btn btn-ghost btn-sm">
                <i class="fas fa-copy"></i>
                복제
              </button>
              <button type="button" class="btn btn-ghost btn-sm">
                <i class="fas fa-eye"></i>
                미리보기
              </button>
              <button type="button" class="btn btn-ghost btn-sm text-danger">
                <i class="fas fa-trash"></i>
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {mockTemplates.length === 0 && (
        <div class="empty-state">
          <i class="fas fa-file-contract" style="font-size: 3rem; color: #94a3b8; margin-bottom: 1rem;"></i>
          <p class="empty-state-text">등록된 계약서 템플릿이 없습니다.</p>
          <button type="button" class="btn btn-primary" style="margin-top: 1rem;">
            <i class="fas fa-plus"></i>
            첫 템플릿 만들기
          </button>
        </div>
      )}

      {/* Help Section */}
      <div class="help-section">
        <div class="help-card">
          <div class="help-icon">
            <i class="fas fa-lightbulb"></i>
          </div>
          <div class="help-content">
            <h4 class="help-title">템플릿 작성 가이드</h4>
            <ul class="help-list">
              <li>계약서 템플릿에는 회원 정보를 자동으로 입력할 수 있는 변수를 사용할 수 있습니다.</li>
              <li>변수는 중괄호로 감싸서 사용합니다. (예: {`{회원명}`}, {`{연락처}`})</li>
              <li>약관은 여러 개로 나누어 작성할 수 있으며, 각 약관에 대한 동의를 받을 수 있습니다.</li>
              <li>템플릿을 활성화하면 회원 가입 시 해당 템플릿이 사용됩니다.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
