// 공통 판매 데이터 인터페이스
export interface SalesData {
  id: string;
  memberName: string;
  memberPhone: string;
  salesType: string;
  salesItem: string;
  productAmount: number;
  amount: number;
  paymentMethod: string;
  paymentDate: string;
  salesperson: string;
  productRegistered: boolean;
  receiptAvailable: boolean;
  installment?: number;
  totalInstallments?: number;
  unpaidAmount?: number;
}

// 회원별 결제 내역을 가져오는 함수
export function getPaymentsByMember(memberName: string): SalesData[] {
  return allSalesData.filter(sale => sale.memberName === memberName);
}

// 결제 ID로 결제 정보를 가져오는 함수
export function getPaymentById(paymentId: string): SalesData | undefined {
  return allSalesData.find(sale => sale.id === paymentId);
}

// 전체 판매 데이터
export const allSalesData: SalesData[] = [
  // === 11월 데이터 ===
  {
    id: 'P2025110101',
    memberName: '강민호',
    memberPhone: '010-1111-2222',
    salesType: '상품',
    salesItem: 'PT 20회권',
    productAmount: 900000,
    amount: 900000,
    paymentMethod: '카드',
    paymentDate: '2025.11.05 10:30',
    salesperson: '박현진',
    productRegistered: true,
    receiptAvailable: true
  },
  {
    id: 'P2025110102',
    memberName: '윤서아',
    memberPhone: '010-2222-3333',
    salesType: '상품',
    salesItem: '헬스 6개월',
    productAmount: 350000,
    amount: 350000,
    paymentMethod: '현금',
    paymentDate: '2025.11.10 14:00',
    salesperson: '강사윤',
    productRegistered: true,
    receiptAvailable: true
  },
  {
    id: 'P2025110103',
    memberName: '정하늘',
    memberPhone: '010-3333-4444',
    salesType: '상품',
    salesItem: '필라테스 10회권',
    productAmount: 550000,
    amount: 550000,
    paymentMethod: '카드',
    paymentDate: '2025.11.15 11:20',
    salesperson: '세나',
    productRegistered: true,
    receiptAvailable: true
  },
  {
    id: 'P2025110104',
    memberName: '김태양',
    memberPhone: '010-4444-5555',
    salesType: '상품',
    salesItem: 'GX 3개월',
    productAmount: 180000,
    amount: 180000,
    paymentMethod: '카드',
    paymentDate: '2025.11.20 16:40',
    salesperson: '로이',
    productRegistered: true,
    receiptAvailable: true
  },
  {
    id: 'P2025110105',
    memberName: '이별',
    memberPhone: '010-5555-6666',
    salesType: '상품',
    salesItem: 'PT 30회권',
    productAmount: 1200000,
    amount: 400000,
    paymentMethod: '카드',
    paymentDate: '2025.11.25 09:15',
    salesperson: '수',
    productRegistered: true,
    receiptAvailable: true,
    installment: 1,
    totalInstallments: 3,
    unpaidAmount: 800000
  },
  
  // === 12월 데이터 ===
  {
    id: 'P2025120101',
    memberName: '김문식',
    memberPhone: '010-1234-5678',
    salesType: '상품',
    salesItem: 'PT 10회권',
    productAmount: 1000000,
    amount: 500000,
    paymentMethod: '카드',
    paymentDate: '2025.12.01 09:30',
    salesperson: '박현진',
    productRegistered: true,
    receiptAvailable: true,
    installment: 1,
    totalInstallments: 2,
    unpaidAmount: 500000
  },
  {
    id: 'P2025120102',
    memberName: '이지은',
    memberPhone: '010-2345-6789',
    salesType: '상품',
    salesItem: '필라테스 20회권',
    productAmount: 800000,
    amount: 800000,
    paymentMethod: '현금',
    paymentDate: '2025.12.01 10:15',
    salesperson: '강사윤',
    productRegistered: true,
    receiptAvailable: true
  },
  {
    id: 'P2025120103',
    memberName: '박서준',
    memberPhone: '010-3456-7890',
    salesType: '상품',
    salesItem: 'GX 회원권',
    productAmount: 120000,
    amount: 120000,
    paymentMethod: '카드',
    paymentDate: '2025.12.01 11:00',
    salesperson: '로이',
    productRegistered: true,
    receiptAvailable: true
  },
  {
    id: 'P2025120104',
    memberName: '최민지',
    memberPhone: '010-4567-8901',
    salesType: '상품',
    salesItem: 'PT 30회권',
    productAmount: 1050000,
    amount: 350000,
    paymentMethod: '카드',
    paymentDate: '2025.12.02 14:20',
    salesperson: '수',
    productRegistered: true,
    receiptAvailable: true,
    installment: 1,
    totalInstallments: 3,
    unpaidAmount: 700000
  },
  {
    id: 'P2025120105',
    memberName: '정우성',
    memberPhone: '010-5678-9012',
    salesType: '상품',
    salesItem: '헬스 3개월',
    productAmount: 180000,
    amount: 180000,
    paymentMethod: '현금',
    paymentDate: '2025.12.03 09:00',
    salesperson: '리키',
    productRegistered: true,
    receiptAvailable: true
  },
  {
    id: 'P2025120106',
    memberName: '한지민',
    memberPhone: '010-6789-0123',
    salesType: '상품',
    salesItem: '필라테스 그룹 10회권',
    productAmount: 400000,
    amount: 200000,
    paymentMethod: '카드',
    paymentDate: '2025.12.03 10:30',
    salesperson: '세나',
    productRegistered: true,
    receiptAvailable: true,
    installment: 1,
    totalInstallments: 2,
    unpaidAmount: 200000
  },
  {
    id: 'P2025120107',
    memberName: '송강호',
    memberPhone: '010-7890-1234',
    salesType: '상품',
    salesItem: 'PT 20회권',
    productAmount: 680000,
    amount: 680000,
    paymentMethod: '현금',
    paymentDate: '2025.12.04 11:00',
    salesperson: '송예빛나',
    productRegistered: true,
    receiptAvailable: true
  },
  {
    id: 'P2025120108',
    memberName: '배두나',
    memberPhone: '010-8901-2345',
    salesType: '상품',
    salesItem: 'GX 6개월',
    productAmount: 240000,
    amount: 240000,
    paymentMethod: '카드',
    paymentDate: '2025.12.04 15:00',
    salesperson: '예지',
    productRegistered: true,
    receiptAvailable: true
  },
  {
    id: 'P2025120109',
    memberName: '유재석',
    memberPhone: '010-9012-3456',
    salesType: '상품',
    salesItem: '필라테스 20회권',
    productAmount: 750000,
    amount: 750000,
    paymentMethod: '카드',
    paymentDate: '2025.12.10 13:30',
    salesperson: '세나',
    productRegistered: true,
    receiptAvailable: true
  },
  {
    id: 'P2025120101-2',
    memberName: '김문식',
    memberPhone: '010-1234-5678',
    salesType: '상품',
    salesItem: 'PT 10회권',
    productAmount: 1000000,
    amount: 500000,
    paymentMethod: '카드',
    paymentDate: '2025.12.15 17:20',
    salesperson: '박현진',
    productRegistered: true,
    receiptAvailable: true,
    installment: 2,
    totalInstallments: 2
  },
  {
    id: 'P2025120110',
    memberName: '박나래',
    memberPhone: '010-0123-4567',
    salesType: '상품',
    salesItem: '헬스 12개월',
    productAmount: 600000,
    amount: 600000,
    paymentMethod: '현금',
    paymentDate: '2025.12.18 10:00',
    salesperson: '리키',
    productRegistered: true,
    receiptAvailable: true
  },
  {
    id: 'P2025120111',
    memberName: '전현무',
    memberPhone: '010-1357-2468',
    salesType: '상품',
    salesItem: 'PT 15회권',
    productAmount: 750000,
    amount: 750000,
    paymentMethod: '카드',
    paymentDate: '2025.12.20 14:45',
    salesperson: '박현진',
    productRegistered: true,
    receiptAvailable: true
  },
  
  // === 1월 데이터 ===
  {
    id: 'P2025010101',
    memberName: '손흥민',
    memberPhone: '010-7777-8888',
    salesType: '상품',
    salesItem: 'PT 20회권',
    productAmount: 950000,
    amount: 950000,
    paymentMethod: '카드',
    paymentDate: '2025.01.02 09:00',
    salesperson: '박현진',
    productRegistered: true,
    receiptAvailable: true
  },
  {
    id: 'P2025010102',
    memberName: '김연아',
    memberPhone: '010-8888-9999',
    salesType: '상품',
    salesItem: '필라테스 30회권',
    productAmount: 1100000,
    amount: 1100000,
    paymentMethod: '현금',
    paymentDate: '2025.01.05 11:30',
    salesperson: '세나',
    productRegistered: true,
    receiptAvailable: true
  },
  {
    id: 'P2025010103',
    memberName: '박지성',
    memberPhone: '010-9999-0000',
    salesType: '상품',
    salesItem: 'GX 12개월',
    productAmount: 480000,
    amount: 480000,
    paymentMethod: '카드',
    paymentDate: '2025.01.08 15:20',
    salesperson: '로이',
    productRegistered: true,
    receiptAvailable: true
  },
  
  // === 김현조 회원 결제 내역 추가 ===
  {
    id: '1b044ec2',
    memberName: '김현조',
    memberPhone: '010-5403-0032',
    salesType: '상품',
    salesItem: '개인레커 2개월',
    productAmount: 33000,
    amount: 33000,
    paymentMethod: '카드',
    paymentDate: '2025.11.27 22:40',
    salesperson: '박현진',
    productRegistered: true,
    receiptAvailable: true
  },
  {
    id: 'a3f3c808',
    memberName: '김현조',
    memberPhone: '010-5403-0032',
    salesType: '상품',
    salesItem: '비디스타일 회원권 3개월',
    productAmount: 108000,
    amount: 108000,
    paymentMethod: '카드',
    paymentDate: '2025.11.27 22:40',
    salesperson: '강사윤',
    productRegistered: true,
    receiptAvailable: true
  },
  {
    id: '877bfab4',
    memberName: '김현조',
    memberPhone: '010-5403-0032',
    salesType: '상품',
    salesItem: '1회이용권 소4인',
    productAmount: 17000,
    amount: 17000,
    paymentMethod: '카드',
    paymentDate: '2025.11.27 00:13',
    salesperson: '로이',
    productRegistered: true,
    receiptAvailable: true
  }
];
