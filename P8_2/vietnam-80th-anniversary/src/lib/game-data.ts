export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  chapter: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  images: string[];
  questions: Question[];
}

export const gameQuestions: Question[] = [
  // Chương 1: Bóng Tối Thuộc Địa
  {
    id: 'q1',
    question: 'Ai là người sáng lập Đảng Cộng sản Việt Nam?',
    options: ['Hồ Chí Minh', 'Phan Bội Châu', 'Phan Châu Trinh', 'Nguyễn Ái Quốc'],
    correctAnswer: 0,
    explanation: 'Hồ Chí Minh (Nguyễn Ái Quốc) là người sáng lập Đảng Cộng sản Việt Nam vào ngày 3/2/1930 tại Hồng Kông. Đây là bước ngoặt quan trọng trong lịch sử cách mạng Việt Nam.',
    chapter: 'colonial',
    difficulty: 'easy'
  },
  {
    id: 'q2',
    question: 'Cuộc khởi nghĩa nào chống thực dân Pháp diễn ra năm 1930?',
    options: ['Khởi nghĩa Yên Bái', 'Khởi nghĩa Bắc Sơn', 'Khởi nghĩa Nam Kỳ', 'Tất cả các đáp án trên'],
    correctAnswer: 3,
    explanation: 'Năm 1930 có ba cuộc khởi nghĩa lớn: Yên Bái (2/1930), Bắc Sơn (9/1940), và Nam Kỳ (11/1940).',
    chapter: 'colonial',
    difficulty: 'medium'
  },
  {
    id: 'q3',
    question: 'Phong trào "Đông Du" do ai khởi xướng?',
    options: ['Hồ Chí Minh', 'Phan Bội Châu', 'Phan Châu Trinh', 'Nguyễn Thái Học'],
    correctAnswer: 1,
    explanation: 'Phan Bội Châu khởi xướng phong trào Đông Du (1905-1908) để đưa thanh niên sang Nhật học tập.',
    chapter: 'colonial',
    difficulty: 'medium'
  },

  // Chương 2: Ngọn Lửa Cách Mạng
  {
    id: 'q4',
    question: 'Cách mạng Tháng Tám diễn ra vào năm nào?',
    options: ['1944', '1945', '1946', '1947'],
    correctAnswer: 1,
    explanation: 'Cách mạng Tháng Tám diễn ra từ ngày 14/8 đến 28/8/1945, giành chính quyền từ tay phát xít Nhật.',
    chapter: 'revolution',
    difficulty: 'easy'
  },
  {
    id: 'q5',
    question: 'Hồ Chí Minh tìm đường cứu nước trong bao nhiêu năm?',
    options: ['20 năm', '25 năm', '30 năm', '35 năm'],
    correctAnswer: 2,
    explanation: 'Hồ Chí Minh ra đi tìm đường cứu nước năm 1911 và trở về năm 1941, tổng cộng 30 năm.',
    chapter: 'revolution',
    difficulty: 'medium'
  },
  {
    id: 'q6',
    question: 'Đảng Cộng sản Việt Nam được thành lập ở đâu?',
    options: ['Hồng Kông', 'Quảng Châu', 'Thượng Hải', 'Ma Cao'],
    correctAnswer: 0,
    explanation: 'Đảng Cộng sản Việt Nam được thành lập ngày 3/2/1930 tại Hồng Kông.',
    chapter: 'revolution',
    difficulty: 'hard'
  },

  // Chương 3: Giây Phút Thiêng Liêng
  {
    id: 'q7',
    question: 'Tuyên ngôn Độc lập được đọc ở đâu?',
    options: ['Quảng trường Ba Đình', 'Quảng trường Đông Kinh Nghĩa Thục', 'Vườn hoa Ba Đình', 'Phủ Toàn quyền'],
    correctAnswer: 0,
    explanation: 'Tuyên ngôn Độc lập được đọc tại Quảng trường Ba Đình, Hà Nội ngày 2/9/1945.',
    chapter: 'independence',
    difficulty: 'easy'
  },
  {
    id: 'q8',
    question: 'Tuyên ngôn Độc lập bắt đầu bằng câu nào?',
    options: [
      'Tất cả mọi người đều sinh ra có quyền bình đẳng',
      'Tất cả mọi người đều sinh ra tự do và bình đẳng',
      'Tất cả mọi người đều có quyền sống, quyền tự do',
      'Tất cả mọi người đều có quyền bình đẳng, tự do'
    ],
    correctAnswer: 1,
    explanation: 'Tuyên ngôn Độc lập bắt đầu: "Tất cả mọi người đều sinh ra tự do và bình đẳng về quyền lợi".',
    chapter: 'independence',
    difficulty: 'hard'
  },
  {
    id: 'q9',
    question: 'Ngày 2/9/1945 có bao nhiêu người tham dự lễ tuyên bố độc lập?',
    options: ['Hàng chục nghìn', 'Hàng trăm nghìn', 'Hàng triệu', 'Không có số liệu chính xác'],
    correctAnswer: 1,
    explanation: 'Theo ước tính, có hàng trăm nghìn người dân tham dự lễ tuyên bố độc lập tại Quảng trường Ba Đình.',
    chapter: 'independence',
    difficulty: 'medium'
  },

  // Chương 4: Hành Trình Xây Dựng
  {
    id: 'q10',
    question: 'Chiến thắng Điện Biên Phủ diễn ra năm nào?',
    options: ['1953', '1954', '1955', '1956'],
    correctAnswer: 1,
    explanation: 'Chiến thắng Điện Biên Phủ diễn ra từ 13/3 đến 7/5/1954, kết thúc thắng lợi cuộc kháng chiến chống Pháp.',
    chapter: 'construction',
    difficulty: 'easy'
  },
  {
    id: 'q11',
    question: 'Cuộc kháng chiến chống Mỹ kết thúc năm nào?',
    options: ['1973', '1974', '1975', '1976'],
    correctAnswer: 2,
    explanation: 'Cuộc kháng chiến chống Mỹ kết thúc ngày 30/4/1975 với chiến dịch Hồ Chí Minh lịch sử.',
    chapter: 'construction',
    difficulty: 'easy'
  },
  {
    id: 'q12',
    question: 'Chính sách Đổi mới được thực hiện từ năm nào?',
    options: ['1984', '1985', '1986', '1987'],
    correctAnswer: 2,
    explanation: 'Chính sách Đổi mới được thông qua tại Đại hội VI của Đảng Cộng sản Việt Nam năm 1986.',
    chapter: 'construction',
    difficulty: 'medium'
  },

  // Chương 5: Việt Nam Hiện Đại
  {
    id: 'q13',
    question: 'Việt Nam gia nhập ASEAN năm nào?',
    options: ['1993', '1994', '1995', '1996'],
    correctAnswer: 2,
    explanation: 'Việt Nam gia nhập ASEAN ngày 28/7/1995, trở thành thành viên thứ 7 của tổ chức.',
    chapter: 'modern',
    difficulty: 'medium'
  },
  {
    id: 'q14',
    question: 'Thành phố Hồ Chí Minh có tên cũ là gì?',
    options: ['Gia Định', 'Sài Gòn', 'Đông Kinh', 'Cả A và B'],
    correctAnswer: 3,
    explanation: 'Thành phố Hồ Chí Minh có tên cũ là Sài Gòn (thời Pháp thuộc) và Gia Định (thời Nguyễn).',
    chapter: 'modern',
    difficulty: 'easy'
  },
  {
    id: 'q15',
    question: 'Việt Nam phóng vệ tinh đầu tiên năm nào?',
    options: ['2012', '2013', '2014', '2015'],
    correctAnswer: 1,
    explanation: 'Vinasat-1, vệ tinh viễn thông đầu tiên của Việt Nam, được phóng lên quỹ đạo ngày 18/4/2008.',
    chapter: 'modern',
    difficulty: 'hard'
  },
  {
    id: 'q16',
    question: 'Quốc ca Việt Nam có tên gì?',
    options: ['Tiến quân ca', 'Đoàn ca', 'Quốc ca', 'Tất cả đều đúng'],
    correctAnswer: 0,
    explanation: 'Quốc ca Việt Nam có tên "Tiến quân ca", do nhạc sĩ Văn Cao sáng tác năm 1944.',
    chapter: 'modern',
    difficulty: 'easy'
  },
  {
    id: 'q17',
    question: 'Việt Nam có bao nhiêu tỉnh thành?',
    options: ['61', '62', '63', '64'],
    correctAnswer: 2,
    explanation: 'Việt Nam hiện có 63 tỉnh thành, bao gồm 58 tỉnh và 5 thành phố trực thuộc Trung ương.',
    chapter: 'modern',
    difficulty: 'medium'
  },
  {
    id: 'q18',
    question: 'Việt Nam đạt được mục tiêu "Thoát nghèo" vào năm nào?',
    options: ['2019', '2020', '2021', '2022'],
    correctAnswer: 1,
    explanation: 'Việt Nam đạt được mục tiêu "Thoát nghèo" năm 2020, trở thành nước có thu nhập trung bình thấp.',
    chapter: 'modern',
    difficulty: 'hard'
  },
  {
    id: 'q19',
    question: 'Việt Nam có bao nhiêu di sản thế giới được UNESCO công nhận?',
    options: ['6', '7', '8', '9'],
    correctAnswer: 2,
    explanation: 'Việt Nam có 8 di sản thế giới được UNESCO công nhận (tính đến 2023).',
    chapter: 'modern',
    difficulty: 'hard'
  },
  {
    id: 'q20',
    question: 'Việt Nam là nước xuất khẩu gạo đứng thứ mấy thế giới?',
    options: ['Thứ 1', 'Thứ 2', 'Thứ 3', 'Thứ 4'],
    correctAnswer: 2,
    explanation: 'Việt Nam là nước xuất khẩu gạo đứng thứ 3 thế giới, sau Ấn Độ và Thái Lan.',
    chapter: 'modern',
    difficulty: 'medium'
  }
];

export const gameChapters: Chapter[] = [
  {
    id: 'colonial',
    title: 'Bóng Tối Thuộc Địa',
    description: 'Việt Nam dưới ách thống trị của thực dân Pháp',
    duration: 2,
    images: [],
    questions: gameQuestions.filter(q => q.chapter === 'colonial')
  },
  {
    id: 'revolution',
    title: 'Ngọn Lửa Cách Mạng',
    description: 'Phong trào cách mạng và sự ra đời của Đảng Cộng sản Việt Nam',
    duration: 2.5,
    images: [],
    questions: gameQuestions.filter(q => q.chapter === 'revolution')
  },
  {
    id: 'independence',
    title: 'Giây Phút Thiêng Liêng',
    description: 'Ngày 2/9/1945 - Tuyên ngôn Độc lập',
    duration: 2,
    images: [],
    questions: gameQuestions.filter(q => q.chapter === 'independence')
  },
  {
    id: 'construction',
    title: 'Hành Trình Xây Dựng',
    description: 'Việt Nam từ 1945 đến nay - những thăng trầm và phát triển',
    duration: 2,
    images: [],
    questions: gameQuestions.filter(q => q.chapter === 'construction')
  },
  {
    id: 'modern',
    title: 'Việt Nam Hiện Đại',
    description: 'Việt Nam ngày nay - một quốc gia phát triển, hiện đại',
    duration: 1.5,
    images: [],
    questions: gameQuestions.filter(q => q.chapter === 'modern')
  }
];

export const getTitleByScore = (score: number): string => {
  if (score >= 180) return 'Anh Hùng Dân Tộc';
  if (score >= 150) return 'Chiến Sĩ Cách Mạng';
  if (score >= 120) return 'Công Dân Yêu Nước';
  if (score >= 90) return 'Người Bạn Việt Nam';
  return 'Cần Học Thêm';
};
