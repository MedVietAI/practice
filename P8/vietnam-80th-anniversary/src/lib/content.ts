// Historical content about Vietnam's 80th National Day Anniversary
export const historicalContent = {
  topics: [
    {
      id: 'independence-declaration',
      title: 'Tuyên ngôn Độc lập 2/9/1945',
      description: 'Ngày Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình',
      keyEvents: [
        'Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập',
        'Thành lập nước Việt Nam Dân chủ Cộng hòa',
        'Kết thúc chế độ thực dân Pháp tại Việt Nam'
      ],
      significance: 'Đánh dấu sự ra đời của nước Việt Nam độc lập, tự do'
    },
    {
      id: 'august-revolution',
      title: 'Cách mạng Tháng Tám 1945',
      description: 'Cuộc cách mạng giành độc lập cho dân tộc Việt Nam',
      keyEvents: [
        'Khởi nghĩa giành chính quyền trên toàn quốc',
        'Thành lập Ủy ban Giải phóng dân tộc',
        'Tổng khởi nghĩa tháng 8/1945'
      ],
      significance: 'Mở ra kỷ nguyên mới cho dân tộc Việt Nam'
    },
    {
      id: 'resistance-war',
      title: 'Kháng chiến chống Pháp (1945-1954)',
      description: 'Cuộc kháng chiến bảo vệ nền độc lập dân tộc',
      keyEvents: [
        'Chiến thắng Điện Biên Phủ 1954',
        'Hiệp định Geneva 1954',
        'Kết thúc chế độ thực dân Pháp'
      ],
      significance: 'Khẳng định ý chí độc lập, tự do của dân tộc Việt Nam'
    },
    {
      id: 'national-construction',
      title: 'Xây dựng đất nước sau độc lập',
      description: 'Quá trình phát triển và xây dựng đất nước',
      keyEvents: [
        'Cải cách ruộng đất',
        'Xây dựng chủ nghĩa xã hội',
        'Đổi mới và hội nhập quốc tế'
      ],
      significance: 'Phát triển đất nước theo con đường xã hội chủ nghĩa'
    }
  ],
  
  celebrations: [
    {
      year: 2025,
      theme: 'Kỷ niệm 80 năm Quốc khánh',
      activities: [
        'Lễ diễu binh, diễu hành',
        'Triển lãm lịch sử',
        'Hoạt động văn hóa, nghệ thuật',
        'Giáo dục truyền thống cho thế hệ trẻ'
      ]
    }
  ],

  achievements: [
    {
      title: 'Độc lập dân tộc',
      description: 'Giành được độc lập từ tay thực dân Pháp',
      year: 1945
    },
    {
      title: 'Thống nhất đất nước',
      description: 'Thống nhất Bắc - Nam sau chiến tranh',
      year: 1975
    },
    {
      title: 'Đổi mới và phát triển',
      description: 'Công cuộc đổi mới và hội nhập quốc tế',
      year: 1986
    },
    {
      title: 'Phát triển kinh tế',
      description: 'Trở thành nước có thu nhập trung bình',
      year: 2020
    }
  ],

  figures: [
    {
      name: 'Hồ Chí Minh',
      role: 'Chủ tịch nước',
      contribution: 'Lãnh đạo cách mạng và giành độc lập',
      quote: 'Không có gì quý hơn độc lập, tự do'
    },
    {
      name: 'Võ Nguyên Giáp',
      role: 'Đại tướng',
      contribution: 'Tổng tư lệnh quân đội nhân dân Việt Nam',
      quote: 'Đánh cho Mỹ cút, đánh cho Ngụy nhào'
    }
  ]
}

export const gameContent = {
  quizQuestions: [
    {
      question: "Ngày Quốc khánh Việt Nam là ngày nào?",
      options: ["1/9/1945", "2/9/1945", "3/9/1945", "4/9/1945"],
      correct: 1,
      explanation: "Ngày 2/9/1945, Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình, Hà Nội."
    },
    {
      question: "Ai là người đọc Tuyên ngôn Độc lập?",
      options: ["Võ Nguyên Giáp", "Hồ Chí Minh", "Phạm Văn Đồng", "Lê Duẩn"],
      correct: 1,
      explanation: "Chủ tịch Hồ Chí Minh là người đọc Tuyên ngôn Độc lập ngày 2/9/1945."
    },
    {
      question: "Nước Việt Nam Dân chủ Cộng hòa được thành lập khi nào?",
      options: ["1945", "1954", "1975", "1986"],
      correct: 0,
      explanation: "Nước Việt Nam Dân chủ Cộng hòa được thành lập ngày 2/9/1945."
    }
  ],

  rpgScenarios: [
    {
      id: 'beginning',
      title: 'Khởi đầu hành trình',
      description: 'Bạn là một nhà sử học trẻ, được giao nhiệm vụ khám phá lịch sử Việt Nam.',
      options: [
        'Bắt đầu từ thời kỳ dựng nước',
        'Tìm hiểu về Cách mạng Tháng Tám',
        'Khám phá cuộc kháng chiến chống Pháp'
      ]
    },
    {
      id: 'independence',
      title: 'Ngày độc lập',
      description: 'Bạn đang chứng kiến lễ tuyên bố độc lập ngày 2/9/1945.',
      options: [
        'Lắng nghe Tuyên ngôn Độc lập',
        'Quan sát đám đông tại Quảng trường Ba Đình',
        'Tìm hiểu về ý nghĩa của sự kiện'
      ]
    }
  ]
}

export default {
  historicalContent,
  gameContent
}
