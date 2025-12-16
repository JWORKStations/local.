import type { FC } from 'hono/jsx'

interface Product {
  id: string
  type: string
  name: string
  isFavorite: boolean
  badges: string[]
  
  // 통계/판매
  statsPeriod: string
  statsSales: string
  limitPeriod: string
  limitSales: string
  
  // 가격
  prices: {
    period: string
    price: string
  }[]
  
  // 수강 인원
  capacity: string
  
  // 옵션 여부
  hasMembership: string // O, X, -
  hasUnitSale: string
  hasPersonalSale: string
  hasTaxDeduction: string
}

const mockProducts: Product[] = [
  {
    id: '1',
    type: '가야금목 목3개월 (24회권)',
    name: '박현교',
    isFavorite: true,
    badges: [],
    statsPeriod: '1개월',
    statsSales: '-',
    limitPeriod: '-',
    limitSales: '-',
    prices: [{ period: '1개월', price: '100,000원' }],
    capacity: 'X',
    hasMembership: '-',
    hasUnitSale: '-',
    hasPersonalSale: '-',
    hasTaxDeduction: 'O'
  },
  {
    id: '2',
    type: '일반적장르 가7개월',
    name: '가람이',
    isFavorite: true,
    badges: [],
    statsPeriod: '1일',
    statsSales: '-',
    limitPeriod: '-',
    limitSales: '-',
    prices: [{ period: '1일', price: '33,000원' }],
    capacity: 'X',
    hasMembership: '-',
    hasUnitSale: 'X',
    hasPersonalSale: 'X',
    hasTaxDeduction: 'O'
  },
  {
    id: '3',
    type: '일반적장르 가7개월',
    name: '필스 GX 디검 등록 회원권',
    isFavorite: true,
    badges: ['GX'],
    statsPeriod: '',
    statsSales: '',
    limitPeriod: '',
    limitSales: '',
    prices: [
      { period: '1개월', price: '121,000원' },
      { period: '3개월', price: '264,000원' },
      { period: '6개월', price: '396,000원' },
      { period: '12개월', price: '594,000원' }
    ],
    capacity: 'O',
    hasMembership: '자유이용권',
    hasUnitSale: 'O',
    hasPersonalSale: 'X',
    hasTaxDeduction: 'O'
  },
  {
    id: '4',
    type: '일반적장르 가7개월',
    name: '베디스터 회원권',
    isFavorite: true,
    badges: ['옥'],
    statsPeriod: '',
    statsSales: '',
    limitPeriod: '',
    limitSales: '',
    prices: [
      { period: '1일', price: '33,000원' },
      { period: '1개월', price: '110,000원' },
      { period: '2개월', price: '176,000원' },
      { period: '3개월', price: '198,000원' },
      { period: '4개월', price: '253,000원' },
      { period: '6개월', price: '297,000원' },
      { period: '12개월', price: '429,000원' },
      { period: '13개월', price: '462,000원' },
      { period: '10회', price: '990,000원' }
    ],
    capacity: 'O',
    hasMembership: '자유이용권',
    hasUnitSale: 'O',
    hasPersonalSale: 'X',
    hasTaxDeduction: 'X'
  }
]

export const ProductsPageActions: FC = () => (
  <div class="action-group">
    <button type="button" class="btn btn-primary">
      + 신규 상품 등록
    </button>
  </div>
)

export const ProductsPage: FC = () => {
  return (
    <section class="products-page">
      {/* Search Bar */}
      <div class="products-search-section">
        <div class="search-input-wrapper">
          <span class="search-icon">🔍</span>
          <input 
            type="search" 
            placeholder="상품 검색" 
            class="search-input-large"
          />
        </div>
      </div>

      {/* Filters */}
      <div class="products-filters">
        <div class="filters-container">
          <div class="filter-row">
            <button type="button" class="filter-dropdown">
              <span>상품 유형</span>
              <span class="filter-dropdown__icon">▾</span>
            </button>
            <button type="button" class="filter-dropdown">
              <span>생활 여부</span>
              <span class="filter-dropdown__icon">▾</span>
            </button>
            <button type="button" class="filter-dropdown">
              <span>회원권/수강권 여부</span>
              <span class="filter-dropdown__icon">▾</span>
            </button>
            <button type="button" class="filter-dropdown">
              <span>단위권 판매 여부</span>
              <span class="filter-dropdown__icon">▾</span>
            </button>
            <button type="button" class="filter-dropdown">
              <span>회원별 판매 여부</span>
              <span class="filter-dropdown__icon">▾</span>
            </button>
            <button type="button" class="filter-dropdown">
              <span>단위를 할인 여부</span>
              <span class="filter-dropdown__icon">▾</span>
            </button>
            <button type="button" class="filter-dropdown">
              <span>소득공제 여부</span>
              <span class="filter-dropdown__icon">▾</span>
            </button>
            <button type="button" class="filter-dropdown">
              <span>중복사업</span>
              <span class="filter-dropdown__icon">▾</span>
            </button>
          </div>
          <div class="filter-actions">
            <button type="button" class="btn btn-ghost btn-sm">
              필터 초기화
            </button>
            <button type="button" class="btn btn-ghost btn-sm">
              이벤트 설정
            </button>
            <button type="button" class="btn btn-ghost btn-sm">
              엑셀 다운로드
            </button>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div class="products-table-wrapper">
        <table class="products-table">
          <thead>
            <tr>
              <th class="th-checkbox">
                <input type="checkbox" aria-label="전체 선택" />
              </th>
              <th class="th-product-type">
                상품 유형 ↕
              </th>
              <th class="th-product-name">
                상품 이름 ↕
              </th>
              <th class="th-stats">
                통계 기간/판매 횟수
              </th>
              <th class="th-limit">
                재한 기간/재한 방수
              </th>
              <th class="th-price">
                가격
              </th>
              <th class="th-capacity">
                수강 인원
              </th>
              <th class="th-membership">
                회원권/수강권 ↕
              </th>
              <th class="th-unit-sale">
                단위권 판매 여부 ↕
              </th>
              <th class="th-personal-sale">
                회원별 판매 여부 ↕
              </th>
              <th class="th-tax">
                소득공제 여부 ↕
              </th>
            </tr>
          </thead>
          <tbody>
            {mockProducts.map((product) => {
              const rowspan = Math.max(product.prices.length, 1)
              
              return product.prices.length > 0 ? (
                <>
                  {/* First row with all data */}
                  <tr key={`${product.id}-0`} class="product-row">
                    <td rowspan={rowspan}>
                      <input type="checkbox" aria-label={`${product.name} 선택`} />
                    </td>
                    <td rowspan={rowspan} class="td-product-type">
                      {product.type}
                    </td>
                    <td rowspan={rowspan} class="td-product-name">
                      <div class="product-name-cell">
                        {product.isFavorite && (
                          <span class="star-icon">⭐</span>
                        )}
                        <span class="product-name-text">{product.name}</span>
                        {product.badges.map((badge, idx) => (
                          <span key={idx} class="product-badge">{badge}</span>
                        ))}
                      </div>
                    </td>
                    <td rowspan={rowspan} class="td-stats">
                      {product.statsPeriod && (
                        <div class="stats-cell">
                          <div>{product.statsPeriod}</div>
                          {product.statsSales && <div>{product.statsSales}</div>}
                        </div>
                      )}
                    </td>
                    <td rowspan={rowspan} class="td-limit">
                      {product.limitPeriod && product.limitPeriod !== '-' && (
                        <div class="limit-cell">
                          <div>{product.limitPeriod}</div>
                          {product.limitSales && <div>{product.limitSales}</div>}
                        </div>
                      )}
                      {product.limitPeriod === '-' && '-'}
                    </td>
                    {/* Price - first row */}
                    <td class="td-price">
                      <div class="price-cell">
                        <span class="price-period">{product.prices[0].period}</span>
                        <span class="price-amount">{product.prices[0].price}</span>
                      </div>
                    </td>
                    <td rowspan={rowspan} class="td-capacity">
                      <span class={`option-mark ${product.capacity === 'O' ? 'option-mark--yes' : 'option-mark--no'}`}>
                        {product.capacity}
                      </span>
                    </td>
                    <td rowspan={rowspan} class="td-membership">
                      {product.hasMembership === '-' ? '-' : product.hasMembership}
                    </td>
                    <td rowspan={rowspan} class="td-option">
                      <span class={`option-mark ${product.hasUnitSale === 'O' ? 'option-mark--yes' : product.hasUnitSale === 'X' ? 'option-mark--no' : ''}`}>
                        {product.hasUnitSale}
                      </span>
                    </td>
                    <td rowspan={rowspan} class="td-option">
                      <span class={`option-mark ${product.hasPersonalSale === 'O' ? 'option-mark--yes' : product.hasPersonalSale === 'X' ? 'option-mark--no' : ''}`}>
                        {product.hasPersonalSale}
                      </span>
                    </td>
                    <td rowspan={rowspan} class="td-option">
                      <span class={`option-mark ${product.hasTaxDeduction === 'O' ? 'option-mark--yes' : product.hasTaxDeduction === 'X' ? 'option-mark--no' : ''}`}>
                        {product.hasTaxDeduction}
                      </span>
                    </td>
                  </tr>
                  
                  {/* Additional price rows */}
                  {product.prices.slice(1).map((price, idx) => (
                    <tr key={`${product.id}-${idx + 1}`} class="product-row product-row--price-only">
                      <td class="td-price">
                        <div class="price-cell">
                          <span class="price-period">{price.period}</span>
                          <span class="price-amount">{price.price}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </>
              ) : null
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div class="pagination">
        <button type="button" class="pagination-btn" aria-label="이전 페이지">
          ‹
        </button>
        <button type="button" class="pagination-btn is-active">
          1
        </button>
        <button type="button" class="pagination-btn">
          2
        </button>
        <button type="button" class="pagination-btn">
          3
        </button>
        <button type="button" class="pagination-btn" aria-label="다음 페이지">
          ›
        </button>
      </div>
    </section>
  )
}
