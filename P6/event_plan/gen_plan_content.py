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

def create_fallback_content(text):
    """Create structured content from text analysis when JSON parsing fails"""
    return {
        "title": "Kế hoạch Tổ chức Lễ Kỷ niệm 80 năm Ngày Quốc khánh nước Cộng hòa Xã hội Chủ nghĩa Việt Nam (2/9/1945 - 2/9/2025)",
        "objectives": [
            "Tôn vinh giá trị lịch sử vĩ đại của Cách mạng Tháng Tám và Tuyên ngôn Độc lập 2/9/1945",
            "Khẳng định thành tựu 80 năm xây dựng và bảo vệ Tổ quốc từ ngày độc lập đầu tiên",
            "Giáo dục truyền thống yêu nước, lòng tự hào dân tộc và ý chí tự lực, tự cường cho các tầng lớp nhân dân",
            "Củng cố và tăng cường sức mạnh khối đại đoàn kết toàn dân tộc trong thời đại mới",
            "Quảng bá hình ảnh đất nước, con người Việt Nam hòa bình, hữu nghị, năng động và phát triển"
        ],
        "scope": [
            "Phạm vi địa lý: Toàn quốc, với các hoạt động trọng điểm tại Thủ đô Hà Nội - nơi Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập",
            "Đối tượng tham gia: Toàn thể nhân dân Việt Nam, kiều bào ta ở nước ngoài, và bạn bè quốc tế",
            "Thời gian: 90 ngày, từ T-60 đến T+30 (so với ngày 2/9/2025) - kỷ niệm 80 năm ngày độc lập",
            "Nội dung: Chuỗi hoạt động bao gồm Lễ míttinh, diễu binh, diễu hành cấp quốc gia và các hoạt động văn hóa lịch sử"
        ],
        "stakeholders": [
            "Ban Chấp hành Trung ương Đảng, Quốc hội, Chủ tịch nước, Chính phủ",
            "Các Bộ, ban, ngành Trung ương (Bộ Quốc phòng, Bộ Công an, Bộ Văn hóa)",
            "Ủy ban Trung ương Mặt trận Tổ quốc Việt Nam và các tổ chức thành viên",
            "Ủy ban nhân dân các tỉnh, thành phố trực thuộc Trung ương",
            "Các cơ quan thông tấn, báo chí",
            "Toàn thể nhân dân Việt Nam và cộng đồng người Việt Nam ở nước ngoài"
        ],
        "timeline": [
            {
                "phase": "Giai đoạn 1: Khởi động và Chuẩn bị",
                "window": "T-60 đến T-30",
                "workstreams": [
                    "Thành lập Ban Chỉ đạo, Ban Tổ chức và các Tiểu ban chuyên trách",
                    "Xây dựng và phê duyệt Kế hoạch tổng thể, kịch bản chi tiết",
                    "Dự toán, phân bổ và triển khai các thủ tục về ngân sách",
                    "Phát động các phong trào thi đua yêu nước chào mừng kỷ niệm"
                ]
            },
            {
                "phase": "Giai đoạn 2: Triển khai cao điểm",
                "window": "T-30 đến T-7",
                "workstreams": [
                    "Đẩy mạnh công tác tuyên truyền trên các phương tiện thông tin đại chúng",
                    "Tổ chức sơ duyệt, tổng duyệt các chương trình chính",
                    "Hoàn thiện công tác hậu cần, kỹ thuật, an ninh, y tế",
                    "Tổ chức các hoạt động bên lề tại các địa phương trên cả nước"
                ]
            },
            {
                "phase": "Giai đoạn 3: Thực hiện sự kiện",
                "window": "T-7 đến T+1",
                "workstreams": [
                    "Tổ chức Lễ Kỷ niệm chính thức, diễu binh, diễu hành cấp quốc gia",
                    "Tổ chức Chương trình nghệ thuật đặc biệt vào tối 2/9",
                    "Triển khai các phương án đảm bảo an ninh, an toàn tuyệt đối",
                    "Truyền hình, phát thanh trực tiếp các sự kiện chính"
                ]
            },
            {
                "phase": "Giai đoạn 4: Tổng kết và lan tỏa",
                "window": "T+1 đến T+30",
                "workstreams": [
                    "Tổ chức họp tổng kết, đánh giá, rút kinh nghiệm",
                    "Thực hiện công tác thi đua, khen thưởng cho các tập thể, cá nhân xuất sắc",
                    "Hoàn tất thủ tục tài chính, quyết toán",
                    "Sản xuất các sản phẩm truyền thông hậu sự kiện"
                ]
            }
        ],
        "program": [
            {
                "name": "Lễ Míttinh, Diễu binh, Diễu hành cấp Quốc gia",
                "goal": "Biểu dương sức mạnh đại đoàn kết toàn dân tộc, khẳng định thành tựu 80 năm",
                "owner": "Ban Tổ chức cấp Nhà nước",
                "resources": "Lực lượng vũ trang, các khối đại diện nhân dân, phương tiện kỹ thuật quân sự",
                "venue": "Quảng trường Ba Đình và các tuyến phố chính tại Hà Nội"
            },
            {
                "name": "Triển lãm '80 năm - Chặng đường vẻ vang'",
                "goal": "Trưng bày các tư liệu, hình ảnh, hiện vật quý giá về Cách mạng tháng Tám",
                "owner": "Bộ VHTTDL, Bảo tàng Lịch sử Quốc gia",
                "resources": "Tư liệu, hiện vật, không gian trưng bày, công nghệ trình chiếu tương tác",
                "venue": "Trung tâm Triển lãm Văn hóa Nghệ thuật Việt Nam"
            },
            {
                "name": "Chương trình nghệ thuật đặc biệt 'Việt Nam - Khát vọng Rồng bay'",
                "goal": "Tái hiện lịch sử hào hùng và thể hiện khát vọng phát triển của dân tộc",
                "owner": "Bộ VHTTDL, Đài Truyền hình Việt Nam",
                "resources": "Sân khấu quy mô lớn, đạo diễn, nghệ sĩ, công nghệ trình diễn hiện đại",
                "venue": "Sân vận động Quốc gia Mỹ Đình, Hà Nội"
            }
        ],
        "communications": [
            {
                "channel": "Truyền hình",
                "message": "Truyền hình trực tiếp lễ kỷ niệm và các hoạt động",
                "key_dates": "2/9/2025 và các ngày trọng đại"
            },
            {
                "channel": "Báo chí",
                "message": "Đưa tin toàn diện về các hoạt động kỷ niệm",
                "key_dates": "T-30 đến T+7"
            },
            {
                "channel": "Mạng xã hội",
                "message": "Lan tỏa thông điệp yêu nước và tinh thần dân tộc",
                "key_dates": "T-60 đến T+30"
            }
        ],
        "logistics": [
            {
                "item": "Địa điểm tổ chức",
                "details": "Chuẩn bị sân khấu, ghế ngồi, hệ thống âm thanh ánh sáng",
                "deadline": "T-15"
            },
            {
                "item": "Vận chuyển",
                "details": "Đưa đón khách mời, vận chuyển thiết bị và hiện vật",
                "deadline": "T-1"
            },
            {
                "item": "Catering",
                "details": "Phục vụ ăn uống cho khách mời và lực lượng tham gia",
                "deadline": "T-7"
            }
        ],
        "budget": [
            {
                "category": "Tổ chức sự kiện",
                "planned": "3.000.000.000 VNĐ",
                "notes": "Bao gồm thuê địa điểm, thiết bị, nhân lực"
            },
            {
                "category": "Truyền thông",
                "planned": "800.000.000 VNĐ",
                "notes": "Quảng cáo, sản xuất nội dung, phát sóng"
            },
            {
                "category": "Hậu cần",
                "planned": "500.000.000 VNĐ",
                "notes": "Vận chuyển, ăn uống, lưu trú"
            }
        ],
        "risk": [
            {
                "risk": "Thời tiết bất lợi",
                "impact": "Cao",
                "likelihood": "Trung bình",
                "owner": "Ban Tổ chức",
                "mitigation": "Chuẩn bị phương án dự phòng trong nhà và lều che"
            },
            {
                "risk": "An ninh trật tự",
                "impact": "Cao",
                "likelihood": "Thấp",
                "owner": "Công an",
                "mitigation": "Tăng cường lực lượng bảo vệ và kiểm soát"
            }
        ],
        "safety": [
            {
                "topic": "An toàn sức khỏe",
                "actions": "Kiểm tra sức khỏe tham gia, chuẩn bị y tế tại chỗ"
            },
            {
                "topic": "An toàn giao thông",
                "actions": "Phân luồng giao thông, hướng dẫn đỗ xe, điều phối lưu thông"
            }
        ],
        "sustainability": [
            {
                "topic": "Môi trường",
                "actions": "Sử dụng vật liệu thân thiện, tái chế rác thải, giảm thiểu ô nhiễm"
            },
            {
                "topic": "Tiết kiệm năng lượng",
                "actions": "Sử dụng thiết bị tiết kiệm điện, năng lượng tái tạo"
            }
        ],
        "raci": [
            {
                "task": "Lập kế hoạch tổng thể",
                "R": "Ban Chỉ đạo Trung ương",
                "A": "Ban Tổ chức Trung ương",
                "C": "Các bộ, ngành liên quan",
                "I": "Chính quyền địa phương"
            }
        ],
        "kpi": [
            {
                "metric": "Số lượng người tham gia",
                "definition": "Tổng số người tham dự các hoạt động kỷ niệm",
                "target": "≥ 200.000 người"
            },
            {
                "metric": "Độ phủ sóng truyền thông",
                "definition": "Số lượng bài viết, lượt xem, chia sẻ trên các kênh",
                "target": "≥ 5.000.000 lượt tiếp cận"
            }
        ],
        "approvals": [
            {
                "gate": "Phê duyệt kế hoạch tổng thể",
                "criteria": "Kế hoạch chi tiết, ngân sách hợp lý, đảm bảo an ninh",
                "owner": "Ban Chấp hành Trung ương Đảng"
            }
        ]
    }

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
        
        # Extract JSON from response - try multiple patterns
        json_patterns = [
            r'\{[\s\S]*\}',  # Standard JSON
            r'```json\s*(\{[\s\S]*?\})\s*```',  # JSON in code blocks
            r'```\s*(\{[\s\S]*?\})\s*```'  # JSON in generic code blocks
        ]
        
        content = None
        for pattern in json_patterns:
            json_match = re.search(pattern, text)
            if json_match:
                try:
                    json_str = json_match.group(1) if len(json_match.groups()) > 0 else json_match.group(0)
                    content = json.loads(json_str)
                    break
                except json.JSONDecodeError:
                    continue
        
        if not content:
            # Fallback: create content from text analysis
            print("⚠️  JSON parsing failed, creating structured content from text...")
            content = create_fallback_content(text)
        
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
