(function () {
  const storageKey = 'bdsr-sidebar-collapsed'
  const accordionStorageKey = 'bdsr-sidebar-open-groups'

  function ready(fn) {
    if (document.readyState !== 'loading') {
      fn()
      return
    }
    document.addEventListener('DOMContentLoaded', fn, { once: true })
  }

  function parseOpenGroups(value) {
    if (!value) return new Set()

    try {
      const parsed = JSON.parse(value)
      if (Array.isArray(parsed)) {
        return new Set(parsed.filter((item) => typeof item === 'string'))
      }
    } catch (error) {
      console.warn('Failed to parse sidebar accordion state', error)
    }

    return new Set()
  }

  function persistOpenGroups(set) {
    try {
      localStorage.setItem(accordionStorageKey, JSON.stringify(Array.from(set)))
    } catch (error) {
      console.warn('Failed to persist sidebar accordion state', error)
    }
  }

  function setupAccordion(layout) {
    const groupNodes = layout.querySelectorAll('[data-group-key][data-has-children="true"]')
    if (!groupNodes.length) return

    const openGroups = parseOpenGroups(localStorage.getItem(accordionStorageKey))
    let shouldPersist = false

    groupNodes.forEach((group) => {
      const key = group.getAttribute('data-group-key')
      const trigger = group.querySelector('[data-accordion-trigger]')
      if (!key || !trigger) return

      const defaultOpen = group.getAttribute('data-initial-open') === 'true'
      let isOpen = openGroups.has(key)

      if (!isOpen && defaultOpen) {
        isOpen = true
        openGroups.add(key)
        shouldPersist = true
      }

      group.classList.toggle('is-open', isOpen)
      trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false')

      const handleToggle = (event) => {
        event.preventDefault()
        const nowOpen = group.classList.toggle('is-open')
        trigger.setAttribute('aria-expanded', nowOpen ? 'true' : 'false')

        if (nowOpen) {
          openGroups.add(key)
        } else {
          openGroups.delete(key)
        }

        persistOpenGroups(openGroups)
      }

      trigger.addEventListener('click', handleToggle)
      trigger.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          handleToggle(event)
        }
      })
    })

    if (shouldPersist) {
      persistOpenGroups(openGroups)
    }
  }

  ready(() => {
    const layout = document.querySelector('[data-layout]')
    if (!layout) return

    const stored = localStorage.getItem(storageKey)
    if (stored === '1') {
      layout.classList.add('sidebar-collapsed')
    }

    const toggleButtons = layout.querySelectorAll('[data-toggle-sidebar]')

    const toggle = () => {
      const collapsed = layout.classList.toggle('sidebar-collapsed')
      localStorage.setItem(storageKey, collapsed ? '1' : '0')
    }

    toggleButtons.forEach((button) => {
      button.addEventListener('click', toggle)
    })

    setupAccordion(layout)
  })
})()

// Product Modal Functions
window.openProductModal = function() {
  const modal = document.getElementById('productModal');
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
};

window.closeProductModal = function(event) {
  const modal = document.getElementById('productModal');
  if (!modal) return;
  
  if (!event || event.target.classList.contains('modal-overlay') || event.target.classList.contains('modal-close')) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
};

// Product selection functions
let selectedProduct = null;
let currentTab = 'all';

// Tab switching
window.switchTab = function(button, tabName) {
  currentTab = tabName;
  
  // Update active tab
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  button.classList.add('active');
  
  // Here you can filter products based on tab
  // For now, just showing all products
};

// Payment method management
// 판매금액 입력 시 받은금액도 동기화
window.syncSaleToReceived = function(saleInput) {
  // 같은 payment-method-item 내의 받은금액 input 찾기
  const paymentItem = saleInput.closest('.payment-method-item');
  if (!paymentItem) return;
  
  const receivedInput = paymentItem.querySelector('.payment-received-input');
  if (receivedInput) {
    // 판매금액 값을 받은금액에도 복사
    receivedInput.value = saleInput.value;
  }
};

// 받은금액 합계 및 미수금 계산
window.calculatePaymentTotal = function() {
  const saleInputs = document.querySelectorAll('.payment-sale-input');
  const receivedInputs = document.querySelectorAll('.payment-received-input');
  
  let totalSale = 0;
  let totalReceived = 0;
  
  // 판매금액 합계
  saleInputs.forEach(input => {
    const value = input.value.replace(/,/g, '').trim();
    const amount = parseInt(value) || 0;
    totalSale += amount;
  });
  
  // 받은금액 합계
  receivedInputs.forEach(input => {
    const value = input.value.replace(/,/g, '').trim();
    const amount = parseInt(value) || 0;
    totalReceived += amount;
  });
  
  // 받은금액이 판매금액을 초과하는지 검증 (자동 조정)
  if (totalReceived > totalSale) {
    // 받은금액을 판매금액으로 제한 (알림 없이 자동 조정)
    const excess = totalReceived - totalSale;
    
    // 마지막 입력된 받은금액 필드를 찾아서 조정
    const lastInput = receivedInputs[receivedInputs.length - 1];
    if (lastInput) {
      const lastValue = parseInt(lastInput.value.replace(/,/g, '')) || 0;
      const adjustedValue = Math.max(0, lastValue - excess);
      lastInput.value = adjustedValue.toLocaleString();
      
      // 재계산
      totalReceived = totalSale;
    }
  }
  
  // 상품가격 가져오기 (고정값, 변경하지 않음)
  let productPrice = 0;
  const productPriceEl = document.getElementById('productPrice');
  if (productPriceEl) {
    const priceText = productPriceEl.textContent.replace(/[^0-9]/g, '');
    productPrice = parseInt(priceText) || 0;
  }
  
  // 판매금액 합계 업데이트
  const salePriceEl = document.getElementById('salePrice');
  if (salePriceEl) {
    salePriceEl.textContent = totalSale.toLocaleString() + ' 원';
  }
  
  // 할인금액 계산 및 표시 (상품가격 - 판매금액)
  const discount = productPrice - totalSale;
  const discountEl = document.getElementById('discountAmount');
  const discountColumn = document.getElementById('discountColumn');
  
  if (discountEl && discountColumn) {
    discountEl.textContent = discount.toLocaleString() + ' 원';
    
    // 할인이 0이면 전체 컬럼 숨김 (라벨 + 금액)
    if (discount === 0) {
      discountColumn.style.visibility = 'hidden';
    } else {
      discountColumn.style.visibility = 'visible';
    }
  }
  
  // 받은금액 합계 업데이트
  const receivedAmountEl = document.getElementById('receivedAmount');
  if (receivedAmountEl) {
    receivedAmountEl.textContent = totalReceived.toLocaleString() + ' 원';
  }
  
  // 미수금 계산 (판매금액 - 받은금액)
  const unpaid = totalSale - totalReceived;
  const unpaidDisplayEl = document.getElementById('unpaidAmountDisplay');
  if (unpaidDisplayEl) {
    unpaidDisplayEl.textContent = '미수금 ' + unpaid.toLocaleString() + '원';
    
    // 미수금이 0이면 숨김
    if (unpaid === 0) {
      unpaidDisplayEl.classList.add('zero');
    } else {
      unpaidDisplayEl.classList.remove('zero');
    }
  }
  
  return unpaid;
};

window.addPaymentMethod = function() {
  const list = document.getElementById('paymentMethodList');
  if (!list) return;
  
  // 미수금 계산
  const unpaid = calculatePaymentTotal();
  
  const newItem = document.createElement('div');
  newItem.className = 'payment-method-item';
  newItem.innerHTML = `
    <select class="payment-method-select">
      <option>카드</option>
      <option>현금</option>
      <option>계좌이체</option>
    </select>
    <input type="text" class="payment-received-input payment-received-only" placeholder="받은금액" value="${unpaid > 0 ? unpaid.toLocaleString() : ''}" oninput="calculatePaymentTotal()" />
    <button class="btn-remove-payment" onclick="removePaymentMethod(this)">✕</button>
  `;
  list.appendChild(newItem);
  
  // 금액이 자동 입력된 경우 즉시 재계산
  if (unpaid > 0) {
    calculatePaymentTotal();
  }
};

window.removePaymentMethod = function(button) {
  const item = button.closest('.payment-method-item');
  const list = document.getElementById('paymentMethodList');
  
  // Keep at least one payment method
  if (list && list.children.length > 1) {
    item.remove();
    calculatePaymentTotal(); // 삭제 후 재계산
  } else {
    alert('최소 1개의 결제수단이 필요합니다.');
  }
};

// Date calculation functions
window.formatDate = function(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

window.formatDateKorean = function(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const dayName = days[date.getDay()];
  return `${year}.${month}.${day} (${dayName})`;
};

window.addMonths = function(date, months) {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
};

window.initializeDates = function() {
  const today = new Date();
  const startDateInput = document.getElementById('startDate');
  const endDateInput = document.getElementById('endDate');
  const paymentDateTimeInput = document.getElementById('paymentDateTime');
  
  if (startDateInput && !startDateInput.value) {
    startDateInput.value = formatDate(today);
  }
  
  // 결제일시 초기화 (현재 날짜와 시간)
  if (paymentDateTimeInput && !paymentDateTimeInput.value) {
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const hours = String(today.getHours()).padStart(2, '0');
    const minutes = String(today.getMinutes()).padStart(2, '0');
    paymentDateTimeInput.value = `${year}-${month}-${day}T${hours}:${minutes}`;
  }
  
  updateEndDate();
};

window.updateDateRange = function() {
  updateEndDate();
};

window.updateEndDate = function() {
  const periodSelect = document.getElementById('periodSelect');
  const startDateInput = document.getElementById('startDate');
  const endDateInput = document.getElementById('endDate');
  const servicePeriodAdd = document.getElementById('servicePeriodAdd');
  
  if (!periodSelect || !startDateInput || !endDateInput) return;
  
  const months = parseInt(periodSelect.value);
  const startDate = new Date(startDateInput.value);
  
  if (!startDate || isNaN(startDate.getTime())) {
    return;
  }
  
  const endDate = addMonths(startDate, months);
  // 하루 줄이기: 시작일이 25일이면 만료일은 24일
  endDate.setDate(endDate.getDate() - 1);
  
  // 서비스 기간 추가 반영
  if (servicePeriodAdd) {
    const additionalDays = parseInt(servicePeriodAdd.value) || 0;
    endDate.setDate(endDate.getDate() + additionalDays);
  }
  
  endDateInput.value = formatDate(endDate);
};

window.selectProduct = function(button) {
  // 상품 선택 시 빨간색 영역 표시
  const configForm = document.getElementById('productConfigForm');
  const productName = button.textContent;
  
  if (configForm) {
    configForm.style.display = 'block';
    const nameElement = configForm.querySelector('.selected-product-name');
    if (nameElement) {
      nameElement.textContent = productName;
    }
    
    // Initialize dates when product is selected
    initializeDates();
    
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    const periodSelect = document.getElementById('periodSelect');
    
    // 상품별 고정 가격 설정 (상품 메뉴에서 등록한 가격)
    const productPrices = {
      '커피머신 365 BASIC': 264000,
      '커피머신 365 PREMIUM': 440000,
      '정수기 365 STANDARD': 330000,
      '정수기 365 PREMIUM': 550000,
      '공기청정기 365': 385000
    };
    
    const productPrice = productPrices[productName] || 264000;
    
    // 상품가격 설정 (고정값)
    const productPriceEl = document.getElementById('productPrice');
    if (productPriceEl) {
      productPriceEl.textContent = productPrice.toLocaleString() + ' 원';
    }
    
    // 판매금액 초기값을 상품가격과 동일하게 설정
    const saleInput = document.querySelector('.payment-sale-input');
    if (saleInput) {
      saleInput.value = productPrice.toLocaleString();
    }
    
    // 받은금액 초기값을 상품가격과 동일하게 설정
    const receivedInput = document.querySelector('.payment-received-input');
    if (receivedInput) {
      receivedInput.value = productPrice.toLocaleString();
    }
    
    // 금액 계산 업데이트
    if (typeof calculatePaymentTotal === 'function') {
      calculatePaymentTotal();
    }
    
    selectedProduct = {
      name: productName,
      period: periodSelect ? periodSelect.options[periodSelect.selectedIndex].text : '12개월',
      startDate: startDateInput ? formatDateKorean(new Date(startDateInput.value)) : '',
      endDate: endDateInput ? formatDateKorean(new Date(endDateInput.value)) : '',
      amount: productPrice.toLocaleString()
    };
  }
  
  // 선택된 버튼 하이라이트
  document.querySelectorAll('.product-tag-btn').forEach(btn => {
    btn.classList.remove('selected');
  });
  button.classList.add('selected');
};

window.clearProductSelection = function() {
  const configForm = document.getElementById('productConfigForm');
  if (configForm) {
    configForm.style.display = 'none';
  }
  selectedProduct = null;
  document.querySelectorAll('.product-tag-btn').forEach(btn => {
    btn.classList.remove('selected');
  });
};

window.addProductToList = function() {
  if (!selectedProduct) return;
  
  const listElement = document.getElementById('selectedProductsList');
  if (!listElement) return;
  
  // 빈 상태 메시지 제거
  const emptyState = listElement.querySelector('.empty-state-selection');
  if (emptyState) {
    emptyState.remove();
  }
  
  // 선택된 상품 항목 추가
  const productItem = document.createElement('div');
  productItem.className = 'selected-product-item';
  productItem.innerHTML = `
    <div class="product-item-header">
      <span class="product-item-name">${selectedProduct.name}</span>
      <button class="btn-remove-item" onclick="removeProductItem(this)">✕</button>
    </div>
    <div class="product-item-details">
      <span>${selectedProduct.period}</span>
      <span>${selectedProduct.startDate} ~ ${selectedProduct.endDate}</span>
      <span class="product-item-amount">${selectedProduct.amount}원</span>
    </div>
  `;
  
  listElement.appendChild(productItem);
  
  // 폼 초기화
  clearProductSelection();
};

window.removeProductItem = function(button) {
  const item = button.closest('.selected-product-item');
  if (item) {
    item.remove();
  }
  
  // 리스트가 비었으면 빈 상태 메시지 표시
  const listElement = document.getElementById('selectedProductsList');
  if (listElement && listElement.children.length === 0) {
    listElement.innerHTML = '<div class="empty-state-selection">상품을 선택하세요.</div>';
  }
};

// ESC key to close modal
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    window.closeProductModal();
  }
});

// Initialize payment calculations on page load
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', function() {
    // Initial calculation to hide unpaid amount if zero
    if (typeof calculatePaymentTotal === 'function') {
      calculatePaymentTotal();
    }
  });
}

// 회원 정보 수정 모달 (업데이트된 버전)
window.openMemberEditModal = function() {
  const modal = document.getElementById('memberEditModal');
  if (modal) {
    // 현재 회원 정보 불러오기
    loadCurrentMemberInfo();
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
};

// 현재 회원 정보를 입력 필드에 로드
function loadCurrentMemberInfo() {
  // 이름
  const nameElement = document.querySelector('.member-name h2');
  if (nameElement) {
    const nameInput = document.getElementById('memberName');
    if (nameInput) nameInput.value = nameElement.textContent.trim();
  }
  
  // 회원 정보 그리드에서 값 가져오기
  const infoItems = document.querySelectorAll('.member-info-item');
  
  infoItems.forEach(item => {
    const label = item.querySelector('.member-info-label')?.textContent;
    const value = item.querySelector('.member-info-value')?.textContent;
    
    if (!value || value === '-') return;
    
    switch(label) {
      case '생년월일':
        // YYYY.MM.DD 형식을 파싱
        const dateParts = value.split('.');
        if (dateParts.length === 3) {
          const yearInput = document.getElementById('birthYear');
          const monthInput = document.getElementById('birthMonth');
          const dayInput = document.getElementById('birthDay');
          
          if (yearInput) yearInput.value = dateParts[0];
          if (monthInput) monthInput.value = parseInt(dateParts[1]);
          if (dayInput) dayInput.value = parseInt(dateParts[2]);
        }
        break;
      case '성별':
        const genderRadio = document.querySelector(`input[name="gender"][value="${value}"]`);
        if (genderRadio) genderRadio.checked = true;
        break;
      case '연락처':
        const phoneInput = document.getElementById('memberPhone');
        if (phoneInput) phoneInput.value = value;
        break;
      case '주소':
        const addressInput = document.getElementById('memberAddress');
        if (addressInput && value) {
          // "상세주소"가 포함되어 있다면 분리
          // 예: "(12345) 서울시 강남구 테헤란로 152 상세주소" -> "(12345) 서울시 강남구 테헤란로 152" 와 "상세주소"
          addressInput.value = value;
        }
        break;
      case '담당자':
        const managerSelect = document.getElementById('memberManager');
        if (managerSelect) managerSelect.value = value;
        break;
      case '운동목적':
        const goalInput = document.getElementById('exerciseGoal');
        if (goalInput) goalInput.value = value;
        break;
      case '운동가능시간대':
        const timeInput = document.getElementById('exerciseTime');
        if (timeInput) timeInput.value = value;
        break;
    }
  });
}

window.closeMemberEditModal = function() {
  const modal = document.getElementById('memberEditModal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
};

// ESC 키로 모달 닫기
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeMemberEditModal();
  }
});

// 주소 검색
window.openAddressSearch = function() {
  new daum.Postcode({
    oncomplete: function(data) {
      // 도로명 주소 또는 지번 주소 선택
      let addr = '';
      
      if (data.userSelectedType === 'R') {
        // 도로명 주소
        addr = data.roadAddress;
      } else {
        // 지번 주소
        addr = data.jibunAddress;
      }
      
      // 우편번호와 주소 정보를 조합
      const fullAddress = `(${data.zonecode}) ${addr}`;
      
      // 주소 input에 값 설정
      const addressInput = document.getElementById('memberAddress');
      if (addressInput) {
        addressInput.value = fullAddress;
      }
      
      // 상세주소 입력 필드에 포커스
      const detailAddressInput = document.getElementById('memberDetailAddress');
      if (detailAddressInput) {
        detailAddressInput.focus();
      }
    },
    // 팝업 크기 설정
    width: '100%',
    height: '100%'
  }).open();
};

// 회원 정보 저장
window.saveMemberInfo = function() {
  // 모든 입력 필드 값 가져오기
  const updatedMember = {
    name: document.getElementById('memberName')?.value.trim(),
    phone: document.getElementById('memberPhone')?.value.trim(),
    gender: document.querySelector('input[name="gender"]:checked')?.value,
    birthYear: document.getElementById('birthYear')?.value.trim(),
    birthMonth: document.getElementById('birthMonth')?.value.trim(),
    birthDay: document.getElementById('birthDay')?.value.trim(),
    address: document.getElementById('memberAddress')?.value.trim(),
    detailAddress: document.getElementById('memberDetailAddress')?.value.trim(),
    manager: document.getElementById('memberManager')?.value.trim(),
    superManager: document.getElementById('memberSuperManager')?.value.trim(),
    exerciseGoal: document.getElementById('exerciseGoal')?.value.trim(),
    exerciseTime: document.getElementById('exerciseTime')?.value.trim(),
    registrationReason: document.getElementById('registrationReason')?.value.trim()
  };
  
  // 필수 입력 검증
  if (!updatedMember.name) {
    alert('이름을 입력해주세요.');
    document.getElementById('memberName')?.focus();
    return;
  }
  
  if (!updatedMember.phone) {
    alert('연락처를 입력해주세요.');
    document.getElementById('memberPhone')?.focus();
    return;
  }
  
  if (!updatedMember.gender) {
    alert('성별을 선택해주세요.');
    return;
  }
  
  // 생년월일 조합 및 검증
  if (updatedMember.birthYear && updatedMember.birthMonth && updatedMember.birthDay) {
    const year = parseInt(updatedMember.birthYear);
    const month = parseInt(updatedMember.birthMonth);
    const day = parseInt(updatedMember.birthDay);
    
    if (year < 1900 || year > new Date().getFullYear()) {
      alert('올바른 출생년도를 입력해주세요.');
      document.getElementById('birthYear')?.focus();
      return;
    }
    
    if (month < 1 || month > 12) {
      alert('올바른 월(1-12)을 입력해주세요.');
      document.getElementById('birthMonth')?.focus();
      return;
    }
    
    if (day < 1 || day > 31) {
      alert('올바른 일(1-31)을 입력해주세요.');
      document.getElementById('birthDay')?.focus();
      return;
    }
    
    // 생년월일 포맷팅: YYYY.MM.DD
    updatedMember.birthDate = `${year}.${month.toString().padStart(2, '0')}.${day.toString().padStart(2, '0')}`;
  }
  
  // 화면에 업데이트된 정보 반영
  updateMemberDisplay(updatedMember);
  
  // 저장 성공 메시지
  alert('회원 정보가 수정되었습니다.');
  
  // 모달 닫기
  closeMemberEditModal();
};

// 회원 정보 화면 업데이트
function updateMemberDisplay(member) {
  console.log('updateMemberDisplay called with:', member);
  
  // 이름 업데이트
  const nameElement = document.querySelector('.member-name h2');
  console.log('nameElement:', nameElement);
  if (nameElement) {
    nameElement.textContent = member.name;
    console.log('Updated name to:', member.name);
  }
  
  // 회원 정보 그리드 업데이트
  const infoItems = document.querySelectorAll('.member-info-item');
  console.log('Found info items:', infoItems.length);
  
  infoItems.forEach((item, index) => {
    const label = item.querySelector('.member-info-label')?.textContent;
    const valueElement = item.querySelector('.member-info-value');
    
    console.log(`Item ${index}: label="${label}", valueElement:`, valueElement);
    
    if (!valueElement) return;
    
    switch(label) {
      case '생년월일':
        if (member.birthDate) {
          valueElement.textContent = member.birthDate;
          console.log('Updated 생년월일 to:', member.birthDate);
        }
        break;
      case '성별':
        valueElement.textContent = member.gender === '남' ? '남' : '여';
        console.log('Updated 성별 to:', member.gender);
        break;
      case '연락처':
        valueElement.textContent = member.phone;
        console.log('Updated 연락처 to:', member.phone);
        break;
      case '주소':
        const fullAddress = member.detailAddress 
          ? `${member.address} ${member.detailAddress}` 
          : member.address;
        valueElement.textContent = fullAddress || '-';
        console.log('Updated 주소 to:', fullAddress);
        break;
      case '담당자':
        valueElement.textContent = member.manager || '-';
        console.log('Updated 담당자 to:', member.manager);
        break;
      case '운동목적':
        valueElement.textContent = member.exerciseGoal || '-';
        console.log('Updated 운동목적 to:', member.exerciseGoal);
        break;
      case '운동가능시간대':
        valueElement.textContent = member.exerciseTime || '-';
        console.log('Updated 운동가능시간대 to:', member.exerciseTime);
        break;
    }
  });
}

// 출석 기록 뷰 전환
window.toggleAttendanceView = function(view) {
  const listView = document.getElementById('attendanceListView');
  const calendarView = document.getElementById('attendanceCalendarView');
  const listBtn = document.querySelector('.view-toggle-btn[data-view="list"]');
  const calendarBtn = document.querySelector('.view-toggle-btn[data-view="calendar"]');
  
  if (view === 'list') {
    listView.style.display = 'block';
    calendarView.style.display = 'none';
    listBtn.classList.add('active');
    calendarBtn.classList.remove('active');
  } else {
    listView.style.display = 'none';
    calendarView.style.display = 'flex';
    listBtn.classList.remove('active');
    calendarBtn.classList.add('active');
    
    // 캘린더 렌더링
    renderCalendar();
  }
};

// 캘린더 렌더링
let currentYear = 2025;
let currentMonth = 12; // 12월 (0-based는 11)

function renderCalendar() {
  const calendarGrid = document.getElementById('calendarGrid');
  const calendarTitle = document.getElementById('calendarTitle');
  
  if (!calendarGrid || !calendarTitle) return;
  
  // 제목 업데이트
  calendarTitle.textContent = `${currentYear}년 ${currentMonth}월`;
  
  // 해당 월의 첫날과 마지막날
  const firstDay = new Date(currentYear, currentMonth - 1, 1);
  const lastDay = new Date(currentYear, currentMonth, 0);
  const startDayOfWeek = firstDay.getDay();
  const daysInMonth = lastDay.getDate();
  
  // 기존 날짜 셀만 제거 (요일 헤더는 유지)
  const existingDays = calendarGrid.querySelectorAll('.calendar-day');
  existingDays.forEach(day => day.remove());
  
  // 빈 날짜 (이전 달)
  for (let i = 0; i < startDayOfWeek; i++) {
    const emptyDay = document.createElement('div');
    emptyDay.className = 'calendar-day empty';
    calendarGrid.appendChild(emptyDay);
  }
  
  // 출석 날짜 데이터 (예시)
  const attendanceDates = [12, 11, 4, 3, 1, 28, 27]; // 출석한 날짜들
  
  // 날짜 생성
  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement('div');
    dayElement.className = 'calendar-day';
    
    // 출석 표시
    if (attendanceDates.includes(day)) {
      dayElement.classList.add('attended');
      dayElement.innerHTML = `<span class="day-number">${day}</span><span class="attendance-dot">●</span>`;
    } else {
      dayElement.innerHTML = `<span class="day-number">${day}</span>`;
    }
    
    // 오늘 날짜 표시
    const today = new Date();
    if (currentYear === today.getFullYear() && 
        currentMonth === today.getMonth() + 1 && 
        day === today.getDate()) {
      dayElement.classList.add('today');
    }
    
    calendarGrid.appendChild(dayElement);
  }
}

// 월 변경
window.changeMonth = function(delta) {
  currentMonth += delta;
  
  if (currentMonth > 12) {
    currentMonth = 1;
    currentYear++;
  } else if (currentMonth < 1) {
    currentMonth = 12;
    currentYear--;
  }
  
  renderCalendar();
};


// 상품 필터링 (이용중인 상품 / 지난 상품)
window.filterProducts = function(button, filterType) {
  // 탭 버튼 활성화 상태 변경
  const allTabs = button.parentElement.querySelectorAll('.tab-btn');
  allTabs.forEach(tab => tab.classList.remove('active'));
  button.classList.add('active');
  
  // 상품 필터링
  const productItems = document.querySelectorAll('.product-list-item');
  
  productItems.forEach(item => {
    const status = item.getAttribute('data-status');
    
    if (filterType === 'current') {
      // 이용중인 상품: status가 '진행중'인 것만 표시
      if (status === '진행중') {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    } else if (filterType === 'past') {
      // 지난 상품: status가 '만료' 또는 '종료'인 것만 표시
      if (status === '만료' || status === '종료') {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    }
  });
  
  // 표시할 상품이 없는 경우 메시지 표시
  const visibleItems = Array.from(productItems).filter(item => item.style.display !== 'none');
  const productsList = document.querySelector('.products-list');
  
  // 기존 empty 메시지 제거
  const existingEmpty = productsList.querySelector('.empty-state');
  if (existingEmpty) {
    existingEmpty.remove();
  }
  
  if (visibleItems.length === 0) {
    const emptyMsg = document.createElement('div');
    emptyMsg.className = 'empty-state';
    emptyMsg.innerHTML = '<p>표시할 상품이 없습니다.</p>';
    productsList.appendChild(emptyMsg);
  }
};


// 회원 페이지 필터 드롭다운 기능
window.toggleFilterDropdown = function(button) {
  const dropdown = button.nextElementSibling;
  
  // CSS에서 display:none이 설정되어 있으면 style.display는 빈 문자열
  // getComputedStyle로 실제 computed style 확인
  const computedDisplay = dropdown ? window.getComputedStyle(dropdown).display : 'none';
  const isOpen = computedDisplay === 'block';
  
  // 모든 드롭다운 닫기
  document.querySelectorAll('.filter-options').forEach(opt => {
    opt.style.display = 'none';
  });
  
  // 모든 버튼 active 제거
  document.querySelectorAll('.filter-dropdown').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // 현재 드롭다운 토글
  if (dropdown && !isOpen) {
    dropdown.style.display = 'block';
    button.classList.add('active');
  }
}

// 필터 옵션 선택
window.selectFilterOption = function(checkbox, filterType) {
  // 체크박스 상태 업데이트는 자동으로 됨
  console.log(`Filter ${filterType} changed:`, checkbox.value, checkbox.checked);
  
  // 실제 필터링 로직은 여기에 구현
  applyMemberFilters();
}

// 필터 적용
function applyMemberFilters() {
  const filters = {
    status: [],
    gender: [],
    ageGroup: [],
    membershipType: [],
    grade: [],
    expiryDate: []
  };
  
  // 체크된 필터 수집
  document.querySelectorAll('.filter-options input[type="checkbox"]:checked').forEach(checkbox => {
    const filterType = checkbox.closest('.filter-options').dataset.filterType;
    if (filterType && filters[filterType]) {
      filters[filterType].push(checkbox.value);
    }
  });
  
  console.log('Applying filters:', filters);
  
  // 회원 목록 필터링
  const memberRows = document.querySelectorAll('.member-table tbody tr');
  memberRows.forEach(row => {
    let shouldShow = true;
    
    // 각 필터 타입별로 체크
    Object.entries(filters).forEach(([filterType, selectedValues]) => {
      if (selectedValues.length === 0) return; // 필터가 선택되지 않았으면 스킵
      
      const cellValue = row.dataset[filterType] || '';
      if (!selectedValues.includes(cellValue)) {
        shouldShow = false;
      }
    });
    
    row.style.display = shouldShow ? '' : 'none';
  });
  
  // 필터 카운트 업데이트
  updateFilterCounts(filters);
}

// 필터 카운트 업데이트
function updateFilterCounts(filters) {
  let totalFilters = 0;
  Object.values(filters).forEach(values => {
    totalFilters += values.length;
  });
  
  // 필터 버튼에 카운트 표시
  document.querySelectorAll('.filter-dropdown').forEach(btn => {
    const filterType = btn.nextElementSibling?.dataset.filterType;
    if (filterType && filters[filterType]) {
      const count = filters[filterType].length;
      if (count > 0) {
        btn.classList.add('has-active-filter');
        // 카운트 뱃지 추가 (옵션)
        let badge = btn.querySelector('.filter-badge');
        if (!badge) {
          badge = document.createElement('span');
          badge.className = 'filter-badge';
          btn.appendChild(badge);
        }
        badge.textContent = count;
      } else {
        btn.classList.remove('has-active-filter');
        const badge = btn.querySelector('.filter-badge');
        if (badge) badge.remove();
      }
    }
  });
}

// 필터 초기화
window.resetFilters = function() {
  // 모든 체크박스 해제
  document.querySelectorAll('.filter-options input[type="checkbox"]').forEach(checkbox => {
    checkbox.checked = false;
  });
  
  // 필터 적용
  applyMemberFilters();
}

// 드롭다운 외부 클릭 시 닫기
document.addEventListener('click', function(e) {
  if (!e.target.closest('.filter-dropdown') && !e.target.closest('.filter-options')) {
    document.querySelectorAll('.filter-options').forEach(opt => {
      opt.style.display = 'none';
    });
    document.querySelectorAll('.filter-dropdown').forEach(btn => {
      btn.classList.remove('active');
    });
  }
});


// 생년월일로 연령대 계산
function getAgeGroup(birthDate) {
  if (!birthDate || birthDate === '-') return '';
  
  const year = parseInt(birthDate.split('.')[0]);
  const currentYear = new Date().getFullYear();
  const age = currentYear - year;
  
  if (age < 30) return '20대';
  if (age < 40) return '30대';
  if (age < 50) return '40대';
  if (age < 60) return '50대';
  return '60대 이상';
}

// 회원권 타입 추출
function getMembershipType(membershipTypeStr) {
  if (!membershipTypeStr || membershipTypeStr === '-') return '';
  
  if (membershipTypeStr.includes('6개월')) return '6개월';
  if (membershipTypeStr.includes('12개월')) return '12개월';
  if (membershipTypeStr.includes('PT')) return 'PT';
  
  return membershipTypeStr;
}


// 필터 함수 업데이트 (data 속성 이름 수정)
window.applyMemberFilters = function() {
  const filters = {
    status: [],
    gender: [],
    ageGroup: [],
    membershipType: []
  };
  
  // 체크된 필터 수집
  document.querySelectorAll('.filter-options input[type="checkbox"]:checked').forEach(checkbox => {
    const filterType = checkbox.closest('.filter-options').dataset.filterType;
    if (filterType && filters[filterType]) {
      filters[filterType].push(checkbox.value);
    }
  });
  
  console.log('Applying filters:', filters);
  
  // 회원 목록 필터링
  const memberRows = document.querySelectorAll('.members-table tbody tr');
  let visibleCount = 0;
  
  memberRows.forEach(row => {
    let shouldShow = true;
    
    // 상태 필터
    if (filters.status.length > 0) {
      const rowStatus = row.dataset.status || '';
      if (!filters.status.includes(rowStatus)) {
        shouldShow = false;
      }
    }
    
    // 성별 필터
    if (filters.gender.length > 0) {
      const rowGender = row.dataset.gender || '';
      if (!filters.gender.includes(rowGender)) {
        shouldShow = false;
      }
    }
    
    // 연령대 필터
    if (filters.ageGroup.length > 0) {
      const rowAgeGroup = row.dataset.ageGroup || '';
      if (!filters.ageGroup.includes(rowAgeGroup)) {
        shouldShow = false;
      }
    }
    
    // 회원권 타입 필터
    if (filters.membershipType.length > 0) {
      const rowMembershipType = row.dataset.membershipType || '';
      if (!filters.membershipType.includes(rowMembershipType)) {
        shouldShow = false;
      }
    }
    
    row.style.display = shouldShow ? '' : 'none';
    if (shouldShow) visibleCount++;
  });
  
  console.log(`Filtered: ${visibleCount} / ${memberRows.length} members`);
  
  // 필터 카운트 업데이트
  updateFilterCounts(filters);
};


// 생일 필터 함수 업데이트
window.applyMemberFilters = function() {
  const filters = {
    status: [],
    gender: [],
    birthday: [], // 월별 + 연령대
    membershipType: [],
    accessInfo: [] // 출입정보
  };
  
  // 체크된 필터 수집
  document.querySelectorAll('.filter-options input[type="checkbox"]:checked').forEach(checkbox => {
    const filterType = checkbox.closest('.filter-options').dataset.filterType;
    if (filterType && filters[filterType] !== undefined) {
      filters[filterType].push(checkbox.value);
    }
  });
  
  console.log('Applying filters:', filters);
  
  // 회원 목록 필터링
  const memberRows = document.querySelectorAll('.members-table tbody tr');
  let visibleCount = 0;
  
  memberRows.forEach(row => {
    let shouldShow = true;
    
    // 상태 필터
    if (filters.status.length > 0) {
      const rowStatus = row.dataset.status || '';
      if (!filters.status.includes(rowStatus)) {
        shouldShow = false;
      }
    }
    
    // 성별 필터
    if (filters.gender.length > 0) {
      const rowGender = row.dataset.gender || '';
      if (!filters.gender.includes(rowGender)) {
        shouldShow = false;
      }
    }
    
    // 생일 필터 (월별 또는 연령대)
    if (filters.birthday.length > 0) {
      const rowBirthMonth = row.dataset.birthMonth || '';
      const rowAgeGroup = row.dataset.ageGroup || '';
      
      // 월별 필터 (1-12)와 연령대 필터 (10대-80대) 분리
      const monthFilters = filters.birthday.filter(v => !isNaN(v) && parseInt(v) >= 1 && parseInt(v) <= 12);
      const ageFilters = filters.birthday.filter(v => v.includes('대'));
      
      let monthMatch = monthFilters.length === 0; // 월별 필터가 없으면 true
      let ageMatch = ageFilters.length === 0; // 연령대 필터가 없으면 true
      
      // 월별 체크
      if (monthFilters.length > 0) {
        monthMatch = monthFilters.some(month => {
          // 월 비교 시 앞의 0 제거하여 비교
          return parseInt(rowBirthMonth) === parseInt(month);
        });
      }
      
      // 연령대 체크
      if (ageFilters.length > 0) {
        ageMatch = ageFilters.includes(rowAgeGroup);
      }
      
      // 월별과 연령대 모두 만족해야 함 (AND 조건)
      if (!monthMatch || !ageMatch) {
        shouldShow = false;
      }
    }
    
    // 회원권 타입 필터
    if (filters.membershipType.length > 0) {
      const rowMembershipType = row.dataset.membershipType || '';
      if (!filters.membershipType.includes(rowMembershipType)) {
        shouldShow = false;
      }
    }
    
    // 출입정보 필터
    if (filters.accessInfo.length > 0) {
      const rowAccessInfo = row.dataset.accessInfo || '';
      if (!filters.accessInfo.includes(rowAccessInfo)) {
        shouldShow = false;
      }
    }
    
    row.style.display = shouldShow ? '' : 'none';
    if (shouldShow) visibleCount++;
  });
  
  console.log(`Filtered: ${visibleCount} / ${memberRows.length} members`);
  
  // 필터 카운트 업데이트
  updateFilterCounts(filters);
};


// 범위 필터 적용
window.applyRangeFilter = function(filterType) {
  const minInput = document.getElementById(`${filterType}Min`);
  const maxInput = document.getElementById(`${filterType}Max`);
  
  if (!minInput || !maxInput) return;
  
  const minValue = parseInt(minInput.value) || 0;
  const maxValue = parseInt(maxInput.value) || Infinity;
  
  console.log(`Applying range filter ${filterType}:`, minValue, '~', maxValue);
  
  // 회원 목록 필터링
  const memberRows = document.querySelectorAll('.members-table tbody tr');
  let visibleCount = 0;
  
  memberRows.forEach(row => {
    const dataValue = parseInt(row.dataset[filterType]) || 0;
    const shouldShow = dataValue >= minValue && dataValue <= maxValue;
    
    if (!shouldShow) {
      row.style.display = 'none';
    } else {
      visibleCount++;
    }
  });
  
  console.log(`Range filter: ${visibleCount} / ${memberRows.length} members`);
};

// 범위 필터 초기화 (버튼 텍스트를 "초기화"로 수정했지만 실제로는 적용 기능)
// 실제로는 applyRangeFilter가 호출됨

