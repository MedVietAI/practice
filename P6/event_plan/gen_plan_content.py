#!/usr/bin/env python3
"""
Content generator for Vietnam 80th Anniversary event plan
Uses Gemini AI to generate comprehensive event planning content
"""

import os
import json
import re
from openai import OpenAI
from config import API_KEY, BASE_URL, OUTPUT_DIR, EVENT_TITLE, EVENT_FRAMEWORK, TIMELINE_START, TIMELINE_END

def generate_event_plan():
    """Generate comprehensive event plan using Gemini AI"""
    
    # Initialize OpenAI client with custom base URL
    client = OpenAI(api_key=API_KEY, base_url=BASE_URL)
    
    # Comprehensive prompt for event planning
    prompt = {
        "role": "user",
        "content": f"""
Soạn dàn ý kế hoạch sự kiện kỷ niệm 80 năm Quốc khánh 2/9 theo khung A90 (T-60→T+30).

Trả JSON với cấu trúc sau:
{{
  "title": "Tiêu đề chính của sự kiện",
  "objectives": [
    "Mục tiêu 1: Tôn vinh truyền thống lịch sử",
    "Mục tiêu 2: Giáo dục thế hệ trẻ",
    "Mục tiêu 3: Thúc đẩy tinh thần đoàn kết dân tộc"
  ],
  "scope": [
    "Phạm vi địa lý: Toàn quốc",
    "Đối tượng tham gia: Công dân Việt Nam và kiều bào",
    "Thời gian: 90 ngày (T-60 đến T+30)",
    "Nội dung: Lễ kỷ niệm, triển lãm, hội thảo, hoạt động văn hóa"
  ],
  "stakeholders": [
    "Ban Chấp hành Trung ương Đảng",
    "Chính phủ và các bộ, ngành",
    "Ủy ban Trung ương Mặt trận Tổ quốc Việt Nam",
    "Các tổ chức chính trị - xã hội",
    "Chính quyền địa phương các cấp",
    "Các cơ quan truyền thông",
    "Nhân dân và kiều bào"
  ],
  "timeline": [
    {{
      "phase": "Chuẩn bị",
      "window": "T-60 đến T-30",
      "workstreams": [
        "Thành lập Ban chỉ đạo",
        "Xây dựng kế hoạch chi tiết",
        "Phân bổ ngân sách",
        "Tuyển chọn địa điểm"
      ]
    }},
    {{
      "phase": "Triển khai",
      "window": "T-30 đến T-7",
      "workstreams": [
        "Tổ chức các hoạt động tuyên truyền",
        "Chuẩn bị hậu cần",
        "Tập huấn lực lượng",
        "Kiểm tra an ninh"
      ]
    }},
    {{
      "phase": "Thực hiện",
      "window": "T-7 đến T+1",
      "workstreams": [
        "Tổ chức lễ kỷ niệm chính",
        "Các hoạt động văn hóa",
        "Truyền hình trực tiếp",
        "Đảm bảo an ninh trật tự"
      ]
    }},
    {{
      "phase": "Kết thúc",
      "window": "T+1 đến T+30",
      "workstreams": [
        "Tổng kết đánh giá",
        "Báo cáo kết quả",
        "Lưu trữ tài liệu",
        "Tri ân các đơn vị tham gia"
      ]
    }}
  ],
  "program": [
    {{
      "name": "Lễ kỷ niệm chính thức",
      "goal": "Tôn vinh 80 năm Quốc khánh",
      "owner": "Ban Tổ chức Trung ương",
      "resources": "Sân vận động, hệ thống âm thanh, ánh sáng",
      "venue": "Quảng trường Ba Đình, Hà Nội"
    }},
    {{
      "name": "Triển lãm lịch sử",
      "goal": "Giáo dục truyền thống cách mạng",
      "owner": "Bảo tàng Lịch sử Quốc gia",
      "resources": "Hiện vật, tài liệu, công nghệ trình chiếu",
      "venue": "Bảo tàng Lịch sử Quốc gia"
    }},
    {{
      "name": "Hội thảo khoa học",
      "goal": "Nghiên cứu giá trị lịch sử",
      "owner": "Viện Lịch sử Đảng",
      "resources": "Chuyên gia, tài liệu nghiên cứu",
      "venue": "Hội trường lớn"
    }}
  ],
  "communications": [
    {{
      "channel": "Truyền hình",
      "message": "Truyền hình trực tiếp lễ kỷ niệm",
      "key_dates": "2/9/2025"
    }},
    {{
      "channel": "Báo chí",
      "message": "Đưa tin về các hoạt động kỷ niệm",
      "key_dates": "T-30 đến T+7"
    }},
    {{
      "channel": "Mạng xã hội",
      "message": "Lan tỏa thông điệp yêu nước",
      "key_dates": "T-60 đến T+30"
    }}
  ],
  "logistics": [
    {{
      "item": "Địa điểm tổ chức",
      "details": "Chuẩn bị sân khấu, ghế ngồi, hệ thống âm thanh",
      "deadline": "T-15"
    }},
    {{
      "item": "Vận chuyển",
      "details": "Đưa đón khách mời, vận chuyển thiết bị",
      "deadline": "T-1"
    }},
    {{
      "item": "Catering",
      "details": "Phục vụ ăn uống cho khách mời",
      "deadline": "T-7"
    }}
  ],
  "budget": [
    {{
      "category": "Tổ chức sự kiện",
      "planned": "2.000.000.000 VNĐ",
      "notes": "Bao gồm thuê địa điểm, thiết bị, nhân lực"
    }},
    {{
      "category": "Truyền thông",
      "planned": "500.000.000 VNĐ",
      "notes": "Quảng cáo, sản xuất nội dung"
    }},
    {{
      "category": "Hậu cần",
      "planned": "300.000.000 VNĐ",
      "notes": "Vận chuyển, ăn uống, lưu trú"
    }}
  ],
  "risk": [
    {{
      "risk": "Thời tiết bất lợi",
      "impact": "Cao",
      "likelihood": "Trung bình",
      "owner": "Ban Tổ chức",
      "mitigation": "Chuẩn bị phương án dự phòng trong nhà"
    }},
    {{
      "risk": "An ninh trật tự",
      "impact": "Cao",
      "likelihood": "Thấp",
      "owner": "Công an",
      "mitigation": "Tăng cường lực lượng bảo vệ"
    }},
    {{
      "risk": "Vượt ngân sách",
      "impact": "Trung bình",
      "likelihood": "Trung bình",
      "owner": "Ban Tài chính",
      "mitigation": "Kiểm soát chi phí chặt chẽ"
    }}
  ],
  "safety": [
    {{
      "topic": "An toàn sức khỏe",
      "actions": "Kiểm tra sức khỏe tham gia, chuẩn bị y tế"
    }},
    {{
      "topic": "An toàn giao thông",
      "actions": "Phân luồng giao thông, hướng dẫn đỗ xe"
    }},
    {{
      "topic": "An toàn cháy nổ",
      "actions": "Kiểm tra hệ thống điện, chuẩn bị thiết bị chữa cháy"
    }}
  ],
  "sustainability": [
    {{
      "topic": "Môi trường",
      "actions": "Sử dụng vật liệu thân thiện, tái chế rác thải"
    }},
    {{
      "topic": "Tiết kiệm năng lượng",
      "actions": "Sử dụng thiết bị tiết kiệm điện"
    }},
    {{
      "topic": "Giảm thiểu rác thải",
      "actions": "Hạn chế sử dụng đồ nhựa, phân loại rác"
    }}
  ],
  "raci": [
    {{
      "task": "Lập kế hoạch tổng thể",
      "R": "Ban Chỉ đạo",
      "A": "Ban Tổ chức",
      "C": "Các bộ, ngành",
      "I": "Địa phương"
    }},
    {{
      "task": "Tổ chức lễ kỷ niệm",
      "R": "Ban Tổ chức",
      "A": "Đơn vị sự kiện",
      "C": "Ban An ninh",
      "I": "Khách mời"
    }},
    {{
      "task": "Truyền thông",
      "R": "Ban Tuyên giáo",
      "A": "Cơ quan báo chí",
      "C": "Ban Tổ chức",
      "I": "Công chúng"
    }}
  ],
  "kpi": [
    {{
      "metric": "Số lượng người tham gia",
      "definition": "Tổng số người tham dự các hoạt động",
      "target": "≥ 100.000 người"
    }},
    {{
      "metric": "Độ phủ sóng truyền thông",
      "definition": "Số lượng bài viết, lượt xem",
      "target": "≥ 1.000.000 lượt tiếp cận"
    }},
    {{
      "metric": "Mức độ hài lòng",
      "definition": "Đánh giá từ khách mời và người tham gia",
      "target": "≥ 90% hài lòng"
    }}
  ],
  "approvals": [
    {{
      "gate": "Phê duyệt kế hoạch",
      "criteria": "Kế hoạch chi tiết, ngân sách hợp lý",
      "owner": "Ban Chấp hành Trung ương"
    }},
    {{
      "gate": "Phê duyệt ngân sách",
      "criteria": "Ngân sách trong khả năng, hiệu quả cao",
      "owner": "Bộ Tài chính"
    }},
    {{
      "gate": "Phê duyệt an ninh",
      "criteria": "Đảm bảo an ninh trật tự",
      "owner": "Bộ Công an"
    }}
  ]
}}

Giữ giọng trang trọng, tránh chi tiết chưa xác thực, ưu tiên thông điệp chung về tinh thần yêu nước và đoàn kết dân tộc.
"""
    }
    
    print("🤖 Generating event plan content with Gemini AI...")
    
    try:
        # Call Gemini API
        response = client.chat.completions.create(
            model='gemini-2.5-pro',
            messages=[prompt],
            temperature=0.7,
            max_tokens=4000
        )
        
        # Extract content
        text = response.choices[0].message.content
        print("✅ Received response from Gemini AI")
        
        # Save raw response
        os.makedirs(OUTPUT_DIR, exist_ok=True)
        with open(os.path.join(OUTPUT_DIR, '_raw.txt'), 'w', encoding='utf-8') as f:
            f.write(text)
        
        # Extract JSON from response
        json_match = re.search(r'\{[\s\S]*\}', text)
        if not json_match:
            raise SystemExit('❌ Không tìm thấy JSON trong phản hồi')
        
        # Parse JSON
        content = json.loads(json_match.group(0))
        
        # Save structured content
        with open(os.path.join(OUTPUT_DIR, 'content.json'), 'w', encoding='utf-8') as f:
            json.dump(content, f, ensure_ascii=False, indent=2)
        
        print(f"✅ Đã lưu nội dung kế hoạch vào {OUTPUT_DIR}/content.json")
        print(f"📊 Tổng số mục tiêu: {len(content.get('objectives', []))}")
        print(f"📊 Tổng số bên liên quan: {len(content.get('stakeholders', []))}")
        print(f"📊 Tổng số giai đoạn: {len(content.get('timeline', []))}")
        
        return content
        
    except Exception as e:
        print(f"❌ Lỗi khi tạo nội dung: {e}")
        return None

if __name__ == "__main__":
    generate_event_plan()
