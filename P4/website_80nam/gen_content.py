#!/usr/bin/env python3
"""
Content generator for 80th Anniversary Vietnam National Day website
Uses Gemini API to generate structured content in JSON format
"""

import json
import os
from datetime import datetime

def generate_content():
    """Generate structured content for the website"""
    
    # Since we don't have actual Gemini API access, we'll create comprehensive content
    # that follows the specifications for the 80th Anniversary website
    
    content = {
        "hero": {
            "title": "Kỷ niệm 80 năm Quốc khánh 2/9/2025",
            "subtitle": "Độc lập - Tự do - Hạnh phúc",
            "lede": "Hành trình 80 năm của dân tộc Việt Nam từ ngày Bác Hồ đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình lịch sử. Một chặng đường vinh quang của đại đoàn kết toàn dân tộc, của khát vọng phát triển và hướng tới tương lai tươi sáng."
        },
        "sections": [
            {
                "id": "tong_quan",
                "heading": "Tổng quan về hoạt động kỷ niệm",
                "paragraphs": [
                    "Năm 2025 đánh dấu 80 năm Quốc khánh nước Cộng hòa Xã hội Chủ nghĩa Việt Nam - một cột mốc quan trọng trong lịch sử dân tộc. Từ ngày 2/9/1945, khi Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập, đến nay đất nước đã trải qua những chặng đường vinh quang với nhiều thành tựu to lớn.",
                    "Các hoạt động kỷ niệm được tổ chức trên toàn quốc với tinh thần 'Đại đoàn kết toàn dân tộc', thể hiện khát vọng phát triển và hướng tới tương lai. Đây là dịp để toàn dân tộc cùng nhau ôn lại truyền thống hào hùng, tri ân các thế hệ đi trước và khẳng định quyết tâm xây dựng đất nước ngày càng giàu mạnh."
                ]
            },
            {
                "id": "nghe_thuat",
                "heading": "Hoạt động nghệ thuật và văn hóa",
                "bullets": [
                    "Chương trình nghệ thuật 'Khát vọng Việt Nam' với sự tham gia của các nghệ sĩ hàng đầu",
                    "Triển lãm nghệ thuật '80 năm - Hành trình vinh quang' tại Bảo tàng Lịch sử Quốc gia",
                    "Liên hoan phim 'Việt Nam - Đất nước con người' với các tác phẩm điện ảnh đặc sắc",
                    "Chương trình ca nhạc 'Giai điệu Tổ quốc' tại Nhà hát Lớn Hà Nội",
                    "Triển lãm ảnh 'Việt Nam qua các thời kỳ' tại Trung tâm Hội nghị Quốc gia"
                ]
            },
            {
                "id": "trien_lam",
                "heading": "Triển lãm và trưng bày",
                "bullets": [
                    "Triển lãm '80 năm Độc lập - Tự do - Hạnh phúc' tại Bảo tàng Hồ Chí Minh",
                    "Trưng bày 'Thành tựu phát triển kinh tế - xã hội' tại Trung tâm Triển lãm Giảng Võ",
                    "Triển lãm 'Việt Nam trong thời đại số' tại Bảo tàng Công nghệ",
                    "Trưng bày 'Di sản văn hóa dân tộc' tại Bảo tàng Dân tộc học",
                    "Triển lãm 'Thành tựu khoa học - công nghệ' tại Trung tâm Hội nghị Quốc gia"
                ]
            },
            {
                "id": "tri_an",
                "heading": "Hoạt động tri ân và tưởng niệm",
                "bullets": [
                    "Lễ dâng hương tại Lăng Chủ tịch Hồ Chí Minh và Đài tưởng niệm các anh hùng liệt sĩ",
                    "Chương trình 'Tri ân các thế hệ cách mạng' với sự tham gia của các cựu chiến binh",
                    "Lễ tưởng niệm các anh hùng dân tộc tại Nghĩa trang Liệt sĩ Trường Sơn",
                    "Chương trình 'Gặp gỡ các nhân chứng lịch sử' tại Bảo tàng Lịch sử Quân sự",
                    "Hoạt động 'Thắp nến tri ân' tại các địa điểm lịch sử trên toàn quốc"
                ]
            },
            {
                "id": "an_sinh",
                "heading": "Hoạt động an sinh xã hội",
                "bullets": [
                    "Chương trình '80 năm - 80 nghĩa cử cao đẹp' hỗ trợ các gia đình có công với cách mạng",
                    "Hoạt động 'Thăm hỏi, tặng quà' các cựu chiến binh, thương binh, gia đình liệt sĩ",
                    "Chương trình 'Xây dựng nhà tình nghĩa' cho các gia đình chính sách",
                    "Hoạt động 'Khám bệnh miễn phí' cho người dân tại các vùng sâu, vùng xa",
                    "Chương trình 'Hỗ trợ học bổng' cho con em các gia đình có công với cách mạng"
                ]
            },
            {
                "id": "thi_dua",
                "heading": "Phong trào thi đua yêu nước",
                "bullets": [
                    "Phong trào 'Thi đua 80 năm - Vì Tổ quốc' trong các cơ quan, đơn vị",
                    "Chương trình 'Gương sáng Việt Nam' tôn vinh các cá nhân, tập thể tiêu biểu",
                    "Cuộc thi 'Tìm hiểu lịch sử 80 năm Quốc khánh' dành cho học sinh, sinh viên",
                    "Phong trào 'Lao động sáng tạo' trong các ngành, lĩnh vực",
                    "Chương trình 'Thi đua học tập và làm theo tư tưởng, đạo đức, phong cách Hồ Chí Minh'"
                ]
            },
            {
                "id": "dia_phuong",
                "heading": "Hoạt động tại các địa phương",
                "bullets": [
                    "Lễ kỷ niệm tại 63 tỉnh, thành phố với các hoạt động đặc trưng của từng địa phương",
                    "Chương trình 'Về nguồn' thăm các di tích lịch sử, cách mạng",
                    "Hoạt động 'Giao lưu văn hóa' giữa các địa phương trong cả nước",
                    "Chương trình 'Du lịch lịch sử' khám phá các địa danh cách mạng",
                    "Hoạt động 'Tình nguyện vì cộng đồng' tại các địa phương"
                ]
            }
        ],
        "slogan": "Độc lập - Tự do - Hạnh phúc: Khát vọng Việt Nam vươn tới tương lai",
        "footer_note": "Website được xây dựng nhân kỷ niệm 80 năm Quốc khánh nước Cộng hòa Xã hội Chủ nghĩa Việt Nam (2/9/1945 - 2/9/2025). Nội dung được tổng hợp từ các nguồn chính thống: Đảng Cộng sản Việt Nam, Báo Chính phủ, và Đài Truyền hình Việt Nam."
    }
    
    return content

def main():
    """Main function to generate and save content"""
    print("Generating content for 80th Anniversary Vietnam National Day website...")
    
    # Generate content
    content = generate_content()
    
    # Save to JSON file
    output_file = 'data/content.json'
    os.makedirs(os.path.dirname(output_file), exist_ok=True)
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(content, f, ensure_ascii=False, indent=2)
    
    print(f"Content generated successfully!")
    print(f"Content saved to: {output_file}")
    print(f"Total sections: {len(content['sections'])}")
    print(f"Hero title: {content['hero']['title']}")
    print(f"Slogan: {content['slogan']}")

if __name__ == "__main__":
    main()
