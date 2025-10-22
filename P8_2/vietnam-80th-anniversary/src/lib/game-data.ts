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
  // ===== CHƯƠNG 1: BÓNG TỐI THUỘC ĐỊA (1858-1945) =====
  {
    id: 'q1',
    question: 'Thực dân Pháp xâm lược Việt Nam lần đầu tiên vào năm nào?',
    options: ['1856', '1857', '1858', '1859'],
    correctAnswer: 2,
    explanation: 'Thực dân Pháp xâm lược Việt Nam lần đầu tiên vào năm 1858, bắt đầu từ Đà Nẵng, mở đầu cho gần 100 năm đô hộ đất nước ta.',
    chapter: 'colonial',
    difficulty: 'easy'
  },
  {
    id: 'q2',
    question: 'Ai là người sáng lập Đảng Cộng sản Việt Nam?',
    options: ['Hồ Chí Minh', 'Phan Bội Châu', 'Phan Châu Trinh', 'Nguyễn Ái Quốc'],
    correctAnswer: 0,
    explanation: 'Hồ Chí Minh (Nguyễn Ái Quốc) là người sáng lập Đảng Cộng sản Việt Nam vào ngày 3/2/1930 tại Hồng Kông. Đây là bước ngoặt quan trọng trong lịch sử cách mạng Việt Nam.',
    chapter: 'colonial',
    difficulty: 'easy'
  },
  {
    id: 'q3',
    question: 'Phong trào "Đông Du" do ai khởi xướng?',
    options: ['Hồ Chí Minh', 'Phan Bội Châu', 'Phan Châu Trinh', 'Nguyễn Thái Học'],
    correctAnswer: 1,
    explanation: 'Phan Bội Châu khởi xướng phong trào Đông Du (1905-1908) để đưa thanh niên sang Nhật học tập, tìm đường cứu nước.',
    chapter: 'colonial',
    difficulty: 'medium'
  },
  {
    id: 'q4',
    question: 'Cuộc khởi nghĩa Yên Bái diễn ra năm nào?',
    options: ['1929', '1930', '1931', '1932'],
    correctAnswer: 1,
    explanation: 'Cuộc khởi nghĩa Yên Bái diễn ra ngày 9/2/1930 do Nguyễn Thái Học lãnh đạo, là một trong những cuộc khởi nghĩa quan trọng chống thực dân Pháp.',
    chapter: 'colonial',
    difficulty: 'medium'
  },
  {
    id: 'q5',
    question: 'Ai là người lãnh đạo cuộc khởi nghĩa Yên Bái?',
    options: ['Nguyễn Thái Học', 'Phan Bội Châu', 'Phan Châu Trinh', 'Hồ Chí Minh'],
    correctAnswer: 0,
    explanation: 'Nguyễn Thái Học (1904-1930) là người lãnh đạo cuộc khởi nghĩa Yên Bái, một trong những anh hùng dân tộc tiêu biểu trong cuộc đấu tranh chống thực dân Pháp.',
    chapter: 'colonial',
    difficulty: 'medium'
  },
  {
    id: 'q6',
    question: 'Phong trào "Duy Tân" do ai khởi xướng?',
    options: ['Phan Bội Châu', 'Phan Châu Trinh', 'Hồ Chí Minh', 'Nguyễn Thái Học'],
    correctAnswer: 1,
    explanation: 'Phan Châu Trinh khởi xướng phong trào Duy Tân (1906-1908), chủ trương cải cách văn hóa, giáo dục để nâng cao dân trí.',
    chapter: 'colonial',
    difficulty: 'hard'
  },
  {
    id: 'q7',
    question: 'Cuộc khởi nghĩa nào chống thực dân Pháp diễn ra năm 1930?',
    options: ['Khởi nghĩa Yên Bái', 'Khởi nghĩa Bắc Sơn', 'Khởi nghĩa Nam Kỳ', 'Tất cả các đáp án trên'],
    correctAnswer: 3,
    explanation: 'Năm 1930 có ba cuộc khởi nghĩa lớn: Yên Bái (2/1930), Bắc Sơn (9/1940), và Nam Kỳ (11/1940).',
    chapter: 'colonial',
    difficulty: 'medium'
  },
  {
    id: 'q8',
    question: 'Ai là người sáng lập Việt Nam Quốc dân Đảng?',
    options: ['Nguyễn Thái Học', 'Phan Bội Châu', 'Phan Châu Trinh', 'Hồ Chí Minh'],
    correctAnswer: 0,
    explanation: 'Nguyễn Thái Học sáng lập Việt Nam Quốc dân Đảng năm 1927, tổ chức chính trị quan trọng trong cuộc đấu tranh chống thực dân Pháp.',
    chapter: 'colonial',
    difficulty: 'hard'
  },
  {
    id: 'q9',
    question: 'Cuộc khởi nghĩa Bắc Sơn diễn ra năm nào?',
    options: ['1939', '1940', '1941', '1942'],
    correctAnswer: 1,
    explanation: 'Cuộc khởi nghĩa Bắc Sơn diễn ra tháng 9/1940, là cuộc khởi nghĩa vũ trang đầu tiên do Đảng Cộng sản Đông Dương lãnh đạo.',
    chapter: 'colonial',
    difficulty: 'medium'
  },
  {
    id: 'q10',
    question: 'Cuộc khởi nghĩa Nam Kỳ diễn ra năm nào?',
    options: ['1939', '1940', '1941', '1942'],
    correctAnswer: 1,
    explanation: 'Cuộc khởi nghĩa Nam Kỳ diễn ra tháng 11/1940, là cuộc khởi nghĩa lớn nhất trong ba cuộc khởi nghĩa năm 1930-1940.',
    chapter: 'colonial',
    difficulty: 'medium'
  },
  {
    id: 'q11',
    question: 'Ai là người lãnh đạo cuộc khởi nghĩa Nam Kỳ?',
    options: ['Nguyễn Văn Cừ', 'Lê Duẩn', 'Phạm Văn Đồng', 'Trường Chinh'],
    correctAnswer: 0,
    explanation: 'Nguyễn Văn Cừ (1912-1941) là Tổng Bí thư Đảng Cộng sản Đông Dương, lãnh đạo cuộc khởi nghĩa Nam Kỳ năm 1940.',
    chapter: 'colonial',
    difficulty: 'hard'
  },
  {
    id: 'q12',
    question: 'Phong trào "Xô viết Nghệ Tĩnh" diễn ra năm nào?',
    options: ['1929', '1930', '1931', '1932'],
    correctAnswer: 2,
    explanation: 'Phong trào Xô viết Nghệ Tĩnh diễn ra năm 1930-1931, là phong trào cách mạng rộng lớn nhất trong thời kỳ đấu tranh chống thực dân Pháp.',
    chapter: 'colonial',
    difficulty: 'hard'
  },
  {
    id: 'q13',
    question: 'Ai là người lãnh đạo phong trào Xô viết Nghệ Tĩnh?',
    options: ['Nguyễn Ái Quốc', 'Trần Phú', 'Lê Hồng Phong', 'Tất cả đều đúng'],
    correctAnswer: 3,
    explanation: 'Phong trào Xô viết Nghệ Tĩnh được lãnh đạo bởi nhiều nhà cách mạng tiêu biểu như Nguyễn Ái Quốc, Trần Phú, Lê Hồng Phong.',
    chapter: 'colonial',
    difficulty: 'hard'
  },
  {
    id: 'q14',
    question: 'Cuộc khởi nghĩa nào được coi là "tiếng súng đầu tiên" của cách mạng Việt Nam?',
    options: ['Khởi nghĩa Yên Bái', 'Khởi nghĩa Bắc Sơn', 'Khởi nghĩa Nam Kỳ', 'Phong trào Xô viết Nghệ Tĩnh'],
    correctAnswer: 1,
    explanation: 'Khởi nghĩa Bắc Sơn được coi là "tiếng súng đầu tiên" của cách mạng Việt Nam vì đây là cuộc khởi nghĩa vũ trang đầu tiên do Đảng lãnh đạo.',
    chapter: 'colonial',
    difficulty: 'hard'
  },
  {
    id: 'q15',
    question: 'Ai là người sáng lập Hội Việt Nam Cách mạng Thanh niên?',
    options: ['Hồ Chí Minh', 'Phan Bội Châu', 'Phan Châu Trinh', 'Nguyễn Thái Học'],
    correctAnswer: 0,
    explanation: 'Hồ Chí Minh sáng lập Hội Việt Nam Cách mạng Thanh niên năm 1925 tại Quảng Châu, Trung Quốc, là tổ chức tiền thân của Đảng Cộng sản Việt Nam.',
    chapter: 'colonial',
    difficulty: 'hard'
  },

  // ===== CHƯƠNG 2: NGỌN LỬA CÁCH MẠNG (1911-1945) =====
  {
    id: 'q16',
    question: 'Hồ Chí Minh ra đi tìm đường cứu nước năm nào?',
    options: ['1909', '1910', '1911', '1912'],
    correctAnswer: 2,
    explanation: 'Ngày 5/6/1911, Nguyễn Tất Thành (Hồ Chí Minh) ra đi tìm đường cứu nước từ bến cảng Nhà Rồng, Sài Gòn, bắt đầu hành trình 30 năm tìm đường cứu nước.',
    chapter: 'revolution',
    difficulty: 'easy'
  },
  {
    id: 'q17',
    question: 'Hồ Chí Minh tìm đường cứu nước trong bao nhiêu năm?',
    options: ['20 năm', '25 năm', '30 năm', '35 năm'],
    correctAnswer: 2,
    explanation: 'Hồ Chí Minh ra đi tìm đường cứu nước năm 1911 và trở về năm 1941, tổng cộng 30 năm.',
    chapter: 'revolution',
    difficulty: 'medium'
  },
  {
    id: 'q18',
    question: 'Đảng Cộng sản Việt Nam được thành lập ở đâu?',
    options: ['Hồng Kông', 'Quảng Châu', 'Thượng Hải', 'Ma Cao'],
    correctAnswer: 0,
    explanation: 'Đảng Cộng sản Việt Nam được thành lập ngày 3/2/1930 tại Hồng Kông.',
    chapter: 'revolution',
    difficulty: 'hard'
  },
  {
    id: 'q19',
    question: 'Cách mạng Tháng Tám diễn ra vào năm nào?',
    options: ['1944', '1945', '1946', '1947'],
    correctAnswer: 1,
    explanation: 'Cách mạng Tháng Tám diễn ra từ ngày 14/8 đến 28/8/1945, giành chính quyền từ tay phát xít Nhật.',
    chapter: 'revolution',
    difficulty: 'easy'
  },
  {
    id: 'q20',
    question: 'Tên thật của Hồ Chí Minh là gì?',
    options: ['Nguyễn Sinh Cung', 'Nguyễn Tất Thành', 'Nguyễn Ái Quốc', 'Tất cả đều đúng'],
    correctAnswer: 3,
    explanation: 'Hồ Chí Minh có nhiều tên khác nhau: Nguyễn Sinh Cung (tên khai sinh), Nguyễn Tất Thành (tên thời trẻ), Nguyễn Ái Quốc (tên hoạt động cách mạng).',
    chapter: 'revolution',
    difficulty: 'hard'
  },
  {
    id: 'q21',
    question: 'Cuộc Cách mạng Tháng Tám bắt đầu từ tỉnh nào?',
    options: ['Hà Nội', 'Hải Phòng', 'Thái Nguyên', 'Nghệ An'],
    correctAnswer: 2,
    explanation: 'Cuộc Cách mạng Tháng Tám bắt đầu từ Thái Nguyên ngày 14/8/1945, sau đó lan rộng ra toàn quốc.',
    chapter: 'revolution',
    difficulty: 'medium'
  },
  {
    id: 'q22',
    question: 'Ai là người sáng lập Hội Việt Nam Cách mạng Thanh niên?',
    options: ['Hồ Chí Minh', 'Phan Bội Châu', 'Phan Châu Trinh', 'Nguyễn Thái Học'],
    correctAnswer: 0,
    explanation: 'Hồ Chí Minh sáng lập Hội Việt Nam Cách mạng Thanh niên năm 1925 tại Quảng Châu, Trung Quốc, là tổ chức tiền thân của Đảng Cộng sản Việt Nam.',
    chapter: 'revolution',
    difficulty: 'hard'
  },
  {
    id: 'q23',
    question: 'Hồ Chí Minh viết "Bản án chế độ thực dân Pháp" năm nào?',
    options: ['1923', '1924', '1925', '1926'],
    correctAnswer: 2,
    explanation: 'Hồ Chí Minh viết "Bản án chế độ thực dân Pháp" năm 1925, tố cáo tội ác của thực dân Pháp đối với các dân tộc thuộc địa.',
    chapter: 'revolution',
    difficulty: 'hard'
  },
  {
    id: 'q24',
    question: 'Hồ Chí Minh tham gia Quốc tế Cộng sản lần đầu tiên năm nào?',
    options: ['1920', '1921', '1922', '1923'],
    correctAnswer: 0,
    explanation: 'Năm 1920, Hồ Chí Minh tham gia Quốc tế Cộng sản và trở thành một trong những người sáng lập Đảng Cộng sản Pháp.',
    chapter: 'revolution',
    difficulty: 'hard'
  },
  {
    id: 'q25',
    question: 'Ai là người lãnh đạo cuộc khởi nghĩa Bắc Sơn?',
    options: ['Trường Chinh', 'Lê Duẩn', 'Phạm Văn Đồng', 'Võ Nguyên Giáp'],
    correctAnswer: 0,
    explanation: 'Trường Chinh (1907-1988) là người lãnh đạo cuộc khởi nghĩa Bắc Sơn năm 1940, sau này trở thành Tổng Bí thư Đảng Cộng sản Việt Nam.',
    chapter: 'revolution',
    difficulty: 'hard'
  },
  {
    id: 'q26',
    question: 'Hồ Chí Minh trở về Việt Nam lần đầu tiên năm nào?',
    options: ['1939', '1940', '1941', '1942'],
    correctAnswer: 2,
    explanation: 'Ngày 28/1/1941, Hồ Chí Minh trở về Việt Nam lần đầu tiên sau 30 năm xa Tổ quốc, đặt chân lên cột mốc 108 biên giới Việt-Trung.',
    chapter: 'revolution',
    difficulty: 'medium'
  },
  {
    id: 'q27',
    question: 'Hồ Chí Minh chọn tên "Hồ Chí Minh" năm nào?',
    options: ['1941', '1942', '1943', '1944'],
    correctAnswer: 1,
    explanation: 'Năm 1942, Nguyễn Ái Quốc chọn tên "Hồ Chí Minh" với ý nghĩa "người có tấm lòng trong sáng".',
    chapter: 'revolution',
    difficulty: 'hard'
  },
  {
    id: 'q28',
    question: 'Ai là người sáng lập Mặt trận Việt Minh?',
    options: ['Hồ Chí Minh', 'Trường Chinh', 'Lê Duẩn', 'Phạm Văn Đồng'],
    correctAnswer: 0,
    explanation: 'Hồ Chí Minh sáng lập Mặt trận Việt Minh (Việt Nam Độc lập Đồng minh) ngày 19/5/1941, tập hợp mọi lực lượng yêu nước.',
    chapter: 'revolution',
    difficulty: 'medium'
  },
  {
    id: 'q29',
    question: 'Cuộc khởi nghĩa Bắc Sơn diễn ra ở tỉnh nào?',
    options: ['Lạng Sơn', 'Cao Bằng', 'Thái Nguyên', 'Tuyên Quang'],
    correctAnswer: 0,
    explanation: 'Cuộc khởi nghĩa Bắc Sơn diễn ra ở tỉnh Lạng Sơn, là cuộc khởi nghĩa vũ trang đầu tiên do Đảng Cộng sản Đông Dương lãnh đạo.',
    chapter: 'revolution',
    difficulty: 'medium'
  },
  {
    id: 'q30',
    question: 'Hồ Chí Minh viết "Đường Kách mệnh" năm nào?',
    options: ['1925', '1926', '1927', '1928'],
    correctAnswer: 2,
    explanation: 'Năm 1927, Hồ Chí Minh viết "Đường Kách mệnh", tác phẩm lý luận quan trọng về cách mạng Việt Nam.',
    chapter: 'revolution',
    difficulty: 'hard'
  },

  // ===== CHƯƠNG 3: GIÂY PHÚT THIÊNG LIÊNG (2/9/1945) =====
  {
    id: 'q31',
    question: 'Tuyên ngôn Độc lập được đọc ở đâu?',
    options: ['Quảng trường Ba Đình', 'Quảng trường Đông Kinh Nghĩa Thục', 'Vườn hoa Ba Đình', 'Phủ Toàn quyền'],
    correctAnswer: 0,
    explanation: 'Tuyên ngôn Độc lập được đọc tại Quảng trường Ba Đình, Hà Nội ngày 2/9/1945.',
    chapter: 'independence',
    difficulty: 'easy'
  },
  {
    id: 'q32',
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
    id: 'q33',
    question: 'Ngày 2/9/1945 có bao nhiêu người tham dự lễ tuyên bố độc lập?',
    options: ['Hàng chục nghìn', 'Hàng trăm nghìn', 'Hàng triệu', 'Không có số liệu chính xác'],
    correctAnswer: 1,
    explanation: 'Theo ước tính, có hàng trăm nghìn người dân tham dự lễ tuyên bố độc lập tại Quảng trường Ba Đình.',
    chapter: 'independence',
    difficulty: 'medium'
  },
  {
    id: 'q34',
    question: 'Ai là người đọc Tuyên ngôn Độc lập?',
    options: ['Hồ Chí Minh', 'Trường Chinh', 'Lê Duẩn', 'Phạm Văn Đồng'],
    correctAnswer: 0,
    explanation: 'Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập ngày 2/9/1945, khai sinh nước Việt Nam Dân chủ Cộng hòa.',
    chapter: 'independence',
    difficulty: 'easy'
  },
  {
    id: 'q35',
    question: 'Tuyên ngôn Độc lập được viết dựa trên tài liệu nào?',
    options: ['Tuyên ngôn Độc lập Mỹ', 'Tuyên ngôn Nhân quyền Pháp', 'Cả A và B', 'Không dựa trên tài liệu nào'],
    correctAnswer: 2,
    explanation: 'Tuyên ngôn Độc lập Việt Nam được viết dựa trên Tuyên ngôn Độc lập Mỹ (1776) và Tuyên ngôn Nhân quyền Pháp (1789).',
    chapter: 'independence',
    difficulty: 'hard'
  },
  {
    id: 'q36',
    question: 'Nước Việt Nam Dân chủ Cộng hòa được thành lập năm nào?',
    options: ['1944', '1945', '1946', '1947'],
    correctAnswer: 1,
    explanation: 'Nước Việt Nam Dân chủ Cộng hòa được thành lập ngày 2/9/1945, sau khi Hồ Chí Minh đọc Tuyên ngôn Độc lập.',
    chapter: 'independence',
    difficulty: 'easy'
  },
  {
    id: 'q37',
    question: 'Ai là người thiết kế Quốc kỳ Việt Nam?',
    options: ['Hồ Chí Minh', 'Võ Nguyên Giáp', 'Trường Chinh', 'Không xác định được'],
    correctAnswer: 3,
    explanation: 'Quốc kỳ Việt Nam (cờ đỏ sao vàng) được thiết kế trong phong trào cách mạng, nhưng không xác định được chính xác người thiết kế.',
    chapter: 'independence',
    difficulty: 'hard'
  },
  {
    id: 'q38',
    question: 'Quốc kỳ Việt Nam có bao nhiêu ngôi sao?',
    options: ['4', '5', '6', '7'],
    correctAnswer: 1,
    explanation: 'Quốc kỳ Việt Nam có 5 ngôi sao vàng trên nền đỏ, tượng trưng cho 5 tầng lớp nhân dân đoàn kết.',
    chapter: 'independence',
    difficulty: 'easy'
  },
  {
    id: 'q39',
    question: 'Ai là người sáng tác Quốc ca Việt Nam?',
    options: ['Văn Cao', 'Phạm Tuyên', 'Hoàng Việt', 'Đỗ Nhuận'],
    correctAnswer: 0,
    explanation: 'Nhạc sĩ Văn Cao (1923-1995) sáng tác "Tiến quân ca" - Quốc ca Việt Nam năm 1944.',
    chapter: 'independence',
    difficulty: 'medium'
  },
  {
    id: 'q40',
    question: 'Quốc ca Việt Nam có tên gì?',
    options: ['Tiến quân ca', 'Đoàn ca', 'Quốc ca', 'Tất cả đều đúng'],
    correctAnswer: 0,
    explanation: 'Quốc ca Việt Nam có tên "Tiến quân ca", do nhạc sĩ Văn Cao sáng tác năm 1944.',
    chapter: 'independence',
    difficulty: 'easy'
  },
  {
    id: 'q41',
    question: 'Ai là người viết lời cho Quốc ca Việt Nam?',
    options: ['Văn Cao', 'Phạm Tuyên', 'Hoàng Việt', 'Đỗ Nhuận'],
    correctAnswer: 0,
    explanation: 'Nhạc sĩ Văn Cao (1923-1995) vừa sáng tác nhạc vừa viết lời cho bài "Tiến quân ca" - Quốc ca Việt Nam.',
    chapter: 'independence',
    difficulty: 'medium'
  },
  {
    id: 'q42',
    question: 'Tuyên ngôn Độc lập được viết trong bao lâu?',
    options: ['1 ngày', '2 ngày', '3 ngày', '1 tuần'],
    correctAnswer: 0,
    explanation: 'Tuyên ngôn Độc lập được Hồ Chí Minh viết trong 1 ngày tại nhà số 48 Hàng Ngang, Hà Nội.',
    chapter: 'independence',
    difficulty: 'hard'
  },
  {
    id: 'q43',
    question: 'Ai là người đầu tiên được bổ nhiệm làm Thủ tướng Chính phủ Việt Nam?',
    options: ['Hồ Chí Minh', 'Trường Chinh', 'Lê Duẩn', 'Phạm Văn Đồng'],
    correctAnswer: 0,
    explanation: 'Hồ Chí Minh vừa là Chủ tịch nước vừa là Thủ tướng Chính phủ đầu tiên của nước Việt Nam Dân chủ Cộng hòa.',
    chapter: 'independence',
    difficulty: 'medium'
  },
  {
    id: 'q44',
    question: 'Tuyên ngôn Độc lập được đọc vào giờ nào?',
    options: ['Sáng sớm', 'Trưa', 'Chiều', 'Tối'],
    correctAnswer: 2,
    explanation: 'Tuyên ngôn Độc lập được đọc vào chiều ngày 2/9/1945, trước hàng trăm nghìn người dân tại Quảng trường Ba Đình.',
    chapter: 'independence',
    difficulty: 'hard'
  },
  {
    id: 'q45',
    question: 'Ai là người đầu tiên được bổ nhiệm làm Bộ trưởng Bộ Nội vụ?',
    options: ['Võ Nguyên Giáp', 'Trường Chinh', 'Lê Duẩn', 'Phạm Văn Đồng'],
    correctAnswer: 0,
    explanation: 'Võ Nguyên Giáp được bổ nhiệm làm Bộ trưởng Bộ Nội vụ trong Chính phủ lâm thời Việt Nam Dân chủ Cộng hòa.',
    chapter: 'independence',
    difficulty: 'hard'
  },

  // ===== CHƯƠNG 4: HÀNH TRÌNH XÂY DỰNG (1945-1986) =====
  {
    id: 'q46',
    question: 'Chiến thắng Điện Biên Phủ diễn ra năm nào?',
    options: ['1953', '1954', '1955', '1956'],
    correctAnswer: 1,
    explanation: 'Chiến thắng Điện Biên Phủ diễn ra từ 13/3 đến 7/5/1954, kết thúc thắng lợi cuộc kháng chiến chống Pháp.',
    chapter: 'construction',
    difficulty: 'easy'
  },
  {
    id: 'q47',
    question: 'Cuộc kháng chiến chống Pháp kéo dài bao nhiêu năm?',
    options: ['7 năm', '8 năm', '9 năm', '10 năm'],
    correctAnswer: 2,
    explanation: 'Cuộc kháng chiến chống Pháp kéo dài 9 năm (1946-1954), kết thúc với chiến thắng Điện Biên Phủ lịch sử.',
    chapter: 'construction',
    difficulty: 'easy'
  },
  {
    id: 'q48',
    question: 'Cuộc kháng chiến chống Mỹ kết thúc năm nào?',
    options: ['1973', '1974', '1975', '1976'],
    correctAnswer: 2,
    explanation: 'Cuộc kháng chiến chống Mỹ kết thúc ngày 30/4/1975 với chiến dịch Hồ Chí Minh lịch sử.',
    chapter: 'construction',
    difficulty: 'easy'
  },
  {
    id: 'q49',
    question: 'Chính sách Đổi mới được thực hiện từ năm nào?',
    options: ['1984', '1985', '1986', '1987'],
    correctAnswer: 2,
    explanation: 'Chính sách Đổi mới được thông qua tại Đại hội VI của Đảng Cộng sản Việt Nam năm 1986.',
    chapter: 'construction',
    difficulty: 'medium'
  },
  {
    id: 'q50',
    question: 'Ai là Tổng tư lệnh trong chiến dịch Hồ Chí Minh?',
    options: ['Võ Nguyên Giáp', 'Lê Duẩn', 'Phạm Văn Đồng', 'Trường Chinh'],
    correctAnswer: 0,
    explanation: 'Đại tướng Võ Nguyên Giáp là Tổng tư lệnh trong chiến dịch Hồ Chí Minh lịch sử (1975), giải phóng hoàn toàn miền Nam.',
    chapter: 'construction',
    difficulty: 'medium'
  },
  {
    id: 'q51',
    question: 'Việt Nam thống nhất đất nước năm nào?',
    options: ['1974', '1975', '1976', '1977'],
    correctAnswer: 2,
    explanation: 'Việt Nam thống nhất đất nước năm 1976, thành lập nước Cộng hòa Xã hội Chủ nghĩa Việt Nam.',
    chapter: 'construction',
    difficulty: 'easy'
  },
  {
    id: 'q52',
    question: 'Ai là người lãnh đạo cuộc kháng chiến chống Pháp?',
    options: ['Hồ Chí Minh', 'Võ Nguyên Giáp', 'Trường Chinh', 'Tất cả đều đúng'],
    correctAnswer: 3,
    explanation: 'Cuộc kháng chiến chống Pháp được lãnh đạo bởi nhiều nhà cách mạng tiêu biểu như Hồ Chí Minh, Võ Nguyên Giáp, Trường Chinh.',
    chapter: 'construction',
    difficulty: 'medium'
  },
  {
    id: 'q53',
    question: 'Chiến dịch Điện Biên Phủ kéo dài bao nhiêu ngày?',
    options: ['55 ngày', '56 ngày', '57 ngày', '58 ngày'],
    correctAnswer: 1,
    explanation: 'Chiến dịch Điện Biên Phủ kéo dài 56 ngày (13/3 - 7/5/1954), là chiến thắng quyết định của cuộc kháng chiến chống Pháp.',
    chapter: 'construction',
    difficulty: 'hard'
  },
  {
    id: 'q54',
    question: 'Ai là người lãnh đạo chiến dịch Điện Biên Phủ?',
    options: ['Võ Nguyên Giáp', 'Hồ Chí Minh', 'Trường Chinh', 'Lê Duẩn'],
    correctAnswer: 0,
    explanation: 'Đại tướng Võ Nguyên Giáp là người lãnh đạo trực tiếp chiến dịch Điện Biên Phủ, tạo nên chiến thắng lịch sử.',
    chapter: 'construction',
    difficulty: 'medium'
  },
  {
    id: 'q55',
    question: 'Việt Nam gia nhập Liên Hợp Quốc năm nào?',
    options: ['1976', '1977', '1978', '1979'],
    correctAnswer: 1,
    explanation: 'Việt Nam gia nhập Liên Hợp Quốc ngày 20/9/1977, trở thành thành viên chính thức của tổ chức quốc tế lớn nhất thế giới.',
    chapter: 'construction',
    difficulty: 'hard'
  },
  {
    id: 'q56',
    question: 'Ai là người lãnh đạo cuộc kháng chiến chống Mỹ?',
    options: ['Hồ Chí Minh', 'Lê Duẩn', 'Trường Chinh', 'Tất cả đều đúng'],
    correctAnswer: 3,
    explanation: 'Cuộc kháng chiến chống Mỹ được lãnh đạo bởi nhiều nhà cách mạng tiêu biểu như Hồ Chí Minh, Lê Duẩn, Trường Chinh.',
    chapter: 'construction',
    difficulty: 'medium'
  },
  {
    id: 'q57',
    question: 'Chiến dịch Hồ Chí Minh diễn ra năm nào?',
    options: ['1973', '1974', '1975', '1976'],
    correctAnswer: 2,
    explanation: 'Chiến dịch Hồ Chí Minh diễn ra năm 1975, giải phóng hoàn toàn miền Nam, thống nhất đất nước.',
    chapter: 'construction',
    difficulty: 'easy'
  },
  {
    id: 'q58',
    question: 'Ai là người lãnh đạo chiến dịch Hồ Chí Minh?',
    options: ['Võ Nguyên Giáp', 'Lê Duẩn', 'Trường Chinh', 'Phạm Văn Đồng'],
    correctAnswer: 0,
    explanation: 'Đại tướng Võ Nguyên Giáp là người lãnh đạo chiến dịch Hồ Chí Minh lịch sử, giải phóng hoàn toàn miền Nam.',
    chapter: 'construction',
    difficulty: 'medium'
  },
  {
    id: 'q59',
    question: 'Việt Nam thống nhất đất nước vào ngày nào?',
    options: ['30/4/1975', '1/5/1975', '2/7/1976', '2/9/1976'],
    correctAnswer: 2,
    explanation: 'Việt Nam thống nhất đất nước ngày 2/7/1976, thành lập nước Cộng hòa Xã hội Chủ nghĩa Việt Nam.',
    chapter: 'construction',
    difficulty: 'hard'
  },
  {
    id: 'q60',
    question: 'Ai là người lãnh đạo chính sách Đổi mới?',
    options: ['Lê Duẩn', 'Trường Chinh', 'Nguyễn Văn Linh', 'Đỗ Mười'],
    correctAnswer: 2,
    explanation: 'Nguyễn Văn Linh là người lãnh đạo chính sách Đổi mới, được thông qua tại Đại hội VI của Đảng năm 1986.',
    chapter: 'construction',
    difficulty: 'hard'
  },

  // ===== CHƯƠNG 5: VIỆT NAM HIỆN ĐẠI (1986-2025) =====
  {
    id: 'q61',
    question: 'Việt Nam gia nhập ASEAN năm nào?',
    options: ['1993', '1994', '1995', '1996'],
    correctAnswer: 2,
    explanation: 'Việt Nam gia nhập ASEAN ngày 28/7/1995, trở thành thành viên thứ 7 của tổ chức.',
    chapter: 'modern',
    difficulty: 'medium'
  },
  {
    id: 'q62',
    question: 'Thành phố Hồ Chí Minh có tên cũ là gì?',
    options: ['Gia Định', 'Sài Gòn', 'Đông Kinh', 'Cả A và B'],
    correctAnswer: 3,
    explanation: 'Thành phố Hồ Chí Minh có tên cũ là Sài Gòn (thời Pháp thuộc) và Gia Định (thời Nguyễn).',
    chapter: 'modern',
    difficulty: 'easy'
  },
  {
    id: 'q63',
    question: 'Việt Nam phóng vệ tinh đầu tiên năm nào?',
    options: ['2012', '2013', '2014', '2015'],
    correctAnswer: 1,
    explanation: 'Vinasat-1, vệ tinh viễn thông đầu tiên của Việt Nam, được phóng lên quỹ đạo ngày 18/4/2008.',
    chapter: 'modern',
    difficulty: 'hard'
  },
  {
    id: 'q64',
    question: 'Việt Nam có bao nhiêu tỉnh thành?',
    options: ['61', '62', '63', '64'],
    correctAnswer: 2,
    explanation: 'Việt Nam hiện có 63 tỉnh thành, bao gồm 58 tỉnh và 5 thành phố trực thuộc Trung ương.',
    chapter: 'modern',
    difficulty: 'medium'
  },
  {
    id: 'q65',
    question: 'Việt Nam đạt được mục tiêu "Thoát nghèo" vào năm nào?',
    options: ['2019', '2020', '2021', '2022'],
    correctAnswer: 1,
    explanation: 'Việt Nam đạt được mục tiêu "Thoát nghèo" năm 2020, trở thành nước có thu nhập trung bình thấp.',
    chapter: 'modern',
    difficulty: 'hard'
  },
  {
    id: 'q66',
    question: 'Việt Nam có bao nhiêu di sản thế giới được UNESCO công nhận?',
    options: ['6', '7', '8', '9'],
    correctAnswer: 2,
    explanation: 'Việt Nam có 8 di sản thế giới được UNESCO công nhận (tính đến 2023).',
    chapter: 'modern',
    difficulty: 'hard'
  },
  {
    id: 'q67',
    question: 'Việt Nam là nước xuất khẩu gạo đứng thứ mấy thế giới?',
    options: ['Thứ 1', 'Thứ 2', 'Thứ 3', 'Thứ 4'],
    correctAnswer: 2,
    explanation: 'Việt Nam là nước xuất khẩu gạo đứng thứ 3 thế giới, sau Ấn Độ và Thái Lan.',
    chapter: 'modern',
    difficulty: 'medium'
  },
  {
    id: 'q68',
    question: 'Việt Nam có bao nhiêu di sản văn hóa phi vật thể được UNESCO công nhận?',
    options: ['10', '12', '14', '16'],
    correctAnswer: 2,
    explanation: 'Việt Nam có 14 di sản văn hóa phi vật thể được UNESCO công nhận, bao gồm Nhã nhạc cung đình Huế, Quan họ Bắc Ninh, Ca trù...',
    chapter: 'modern',
    difficulty: 'hard'
  },
  {
    id: 'q69',
    question: 'Việt Nam phóng vệ tinh Vinasat-1 từ đâu?',
    options: ['Trung tâm Vũ trụ Baikonur', 'Trung tâm Vũ trụ Kourou', 'Trung tâm Vũ trụ Kennedy', 'Trung tâm Vũ trụ Tanegashima'],
    correctAnswer: 1,
    explanation: 'Vinasat-1 được phóng từ Trung tâm Vũ trụ Kourou, Guiana thuộc Pháp, đánh dấu bước tiến quan trọng của Việt Nam trong lĩnh vực công nghệ vũ trụ.',
    chapter: 'modern',
    difficulty: 'hard'
  },
  {
    id: 'q70',
    question: 'Việt Nam đạt được mục tiêu "Thoát nghèo" theo tiêu chuẩn nào?',
    options: ['Ngân hàng Thế giới', 'Liên Hợp Quốc', 'IMF', 'Tất cả các tổ chức trên'],
    correctAnswer: 3,
    explanation: 'Việt Nam đạt được mục tiêu "Thoát nghèo" theo tiêu chuẩn của Ngân hàng Thế giới, Liên Hợp Quốc và IMF.',
    chapter: 'modern',
    difficulty: 'hard'
  },
  {
    id: 'q71',
    question: 'Việt Nam có bao nhiêu di sản thiên nhiên thế giới?',
    options: ['2', '3', '4', '5'],
    correctAnswer: 1,
    explanation: 'Việt Nam có 3 di sản thiên nhiên thế giới: Vịnh Hạ Long, Vườn quốc gia Phong Nha - Kẻ Bàng, và Quần thể danh thắng Tràng An.',
    chapter: 'modern',
    difficulty: 'hard'
  },
  {
    id: 'q72',
    question: 'Việt Nam có bao nhiêu di sản văn hóa thế giới?',
    options: ['3', '4', '5', '6'],
    correctAnswer: 2,
    explanation: 'Việt Nam có 5 di sản văn hóa thế giới: Quần thể di tích Cố đô Huế, Phố cổ Hội An, Thánh địa Mỹ Sơn, Hoàng thành Thăng Long, và Thành nhà Hồ.',
    chapter: 'modern',
    difficulty: 'hard'
  },
  {
    id: 'q73',
    question: 'Việt Nam có bao nhiêu di sản hỗn hợp thế giới?',
    options: ['0', '1', '2', '3'],
    correctAnswer: 0,
    explanation: 'Việt Nam hiện chưa có di sản hỗn hợp thế giới nào được UNESCO công nhận.',
    chapter: 'modern',
    difficulty: 'hard'
  },
  {
    id: 'q74',
    question: 'Việt Nam có bao nhiêu di sản tư liệu thế giới?',
    options: ['3', '4', '5', '6'],
    correctAnswer: 1,
    explanation: 'Việt Nam có 4 di sản tư liệu thế giới: Mộc bản triều Nguyễn, Châu bản triều Nguyễn, Bia tiến sĩ Văn Miếu - Quốc Tử Giám, và Mộc bản Kinh Phật chùa Vĩnh Nghiêm.',
    chapter: 'modern',
    difficulty: 'hard'
  },
  {
    id: 'q75',
    question: 'Việt Nam có bao nhiêu di sản địa chất thế giới?',
    options: ['0', '1', '2', '3'],
    correctAnswer: 0,
    explanation: 'Việt Nam hiện chưa có di sản địa chất thế giới nào được UNESCO công nhận.',
    chapter: 'modern',
    difficulty: 'hard'
  }
];

export const gameChapters: Chapter[] = [
  {
    id: 'colonial',
    title: 'Bóng Tối Thuộc Địa (1858-1945)',
    description: 'Hơn 80 năm dưới ách thống trị của thực dân Pháp - thời kỳ đen tối nhất trong lịch sử dân tộc. Nhân dân ta phải chịu đựng sự bóc lột tàn bạo, chia cắt đất nước, và đàn áp văn hóa. Nhưng từ trong bóng tối, những ngọn lửa yêu nước đã bùng lên mạnh mẽ. Các phong trào Đông Du, Duy Tân, các cuộc khởi nghĩa Yên Bái, Bắc Sơn, Nam Kỳ, và phong trào Xô viết Nghệ Tĩnh đã chứng minh tinh thần bất khuất của dân tộc Việt Nam.',
    duration: 5,
    images: [],
    questions: gameQuestions.filter(q => q.chapter === 'colonial')
  },
  {
    id: 'revolution',
    title: 'Ngọn Lửa Cách Mạng (1911-1945)',
    description: 'Hành trình 30 năm tìm đường cứu nước của Nguyễn Ái Quốc - Hồ Chí Minh. Từ những ngày đầu ra đi tìm đường cứu nước từ bến cảng Nhà Rồng đến sự ra đời của Đảng Cộng sản Việt Nam, và cuộc Cách mạng Tháng Tám vĩ đại. Đây là thời kỳ hình thành nên những tư tưởng cách mạng, những tổ chức chính trị quan trọng, và cuối cùng là sự ra đời của nước Việt Nam Dân chủ Cộng hòa.',
    duration: 6,
    images: [],
    questions: gameQuestions.filter(q => q.chapter === 'revolution')
  },
  {
    id: 'independence',
    title: 'Giây Phút Thiêng Liêng (2/9/1945)',
    description: 'Ngày 2/9/1945 - giây phút thiêng liêng nhất trong lịch sử dân tộc. Tại Quảng trường Ba Đình, Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập, khai sinh nước Việt Nam Dân chủ Cộng hòa. Hàng triệu trái tim Việt Nam cùng hòa chung nhịp đập tự do. Đây là thời khắc lịch sử, khi dân tộc Việt Nam chính thức tuyên bố với thế giới về quyền độc lập, tự do và chủ quyền của mình.',
    duration: 4,
    images: [],
    questions: gameQuestions.filter(q => q.chapter === 'independence')
  },
  {
    id: 'construction',
    title: 'Hành Trình Xây Dựng (1945-1986)',
    description: 'Từ ngày độc lập đến đổi mới - những thăng trầm và phát triển vĩ đại. Cuộc kháng chiến chống Pháp với chiến thắng Điện Biên Phủ lịch sử, cuộc kháng chiến chống Mỹ với chiến dịch Hồ Chí Minh vĩ đại, và bước ngoặt đổi mới năm 1986 đã mở ra một trang sử mới cho dân tộc. Đây là thời kỳ Việt Nam vừa bảo vệ độc lập dân tộc, vừa xây dựng đất nước theo con đường xã hội chủ nghĩa.',
    duration: 7,
    images: [],
    questions: gameQuestions.filter(q => q.chapter === 'construction')
  },
  {
    id: 'modern',
    title: 'Việt Nam Hiện Đại (1986-2025)',
    description: 'Việt Nam ngày nay - một quốc gia phát triển, hiện đại với những thành tựu rực rỡ. Từ nước nghèo đói trở thành nước có thu nhập trung bình, hội nhập sâu rộng với thế giới, và khẳng định vị thế trên trường quốc tế. Với 8 di sản thế giới được UNESCO công nhận, vệ tinh Vinasat-1 bay vào vũ trụ, và những thành tựu kinh tế - xã hội vượt bậc, Việt Nam đã trở thành một trong những quốc gia năng động nhất khu vực Đông Nam Á.',
    duration: 6,
    images: [],
    questions: gameQuestions.filter(q => q.chapter === 'modern')
  }
];

export const getTitleByScore = (score: number): string => {
  if (score >= 600) return 'Anh Hùng Dân Tộc';
  if (score >= 500) return 'Chiến Sĩ Cách Mạng';
  if (score >= 400) return 'Công Dân Yêu Nước';
  if (score >= 300) return 'Người Bạn Việt Nam';
  if (score >= 200) return 'Người Yêu Lịch Sử';
  if (score >= 100) return 'Người Mới Bắt Đầu';
  return 'Cần Học Thêm';
};
