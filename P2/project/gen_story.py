# gen_story.py
from openai import OpenAI
import os, json, re

# Khởi tạo client
client = OpenAI(
    api_key=os.getenv("API_KEY"), 
    base_url="https://api.thucchien.ai"
)

# Prompt chi tiết cho AI
PROMPT = {
    "role": "user",
    "content": (
        "Sáng tạo truyện tranh chủ đề 80 năm Quốc khánh 2/9/2025, tiếng Việt, 6–8 trang (bao gồm 1 trang bìa).\n"
        "Trả về JSON: {title, pages:[{page_no, kind: 'cover'|'story', page_title, narration, panels:[{role:'caption'|'dialogue', speaker?, text}]}]}.\n"
        "Tông: trang trọng – ấm áp – truyền cảm hứng, nêu giá trị độc lập – tự do – đoàn kết – đổi mới.\n"
        "Không nêu chi tiết chưa chắc chắn. Lời ngắn gọn, phù hợp bố cục tranh.\n"
        "Cấu trúc đề xuất:\n"
        "- Trang 1: Bìa (cover) - Tiêu đề + hình ảnh nổi bật\n"
        "- Trang 2-3: Lịch sử - Tóm tắt 80 năm qua\n"
        "- Trang 4-5: Hiện tại - Các hoạt động kỷ niệm\n"
        "- Trang 6-7: Tương lai - Khát vọng phát triển\n"
        "- Trang 8: Kết - Thông điệp đoàn kết\n"
        "Mỗi panel có tối đa 2-3 câu, dễ đọc, có ý nghĩa sâu sắc."
    )
}

def generate_story():
    """Sinh cốt truyện bằng AI"""
    try:
        print("🤖 Đang sinh cốt truyện...")
        response = client.chat.completions.create(
            model="gemini-2.5-pro",
            messages=[PROMPT]
        )
        
        text = response.choices[0].message.content
        print("✅ AI đã sinh cốt truyện")
        
        # Lưu toàn bộ response
        os.makedirs("out", exist_ok=True)
        with open("out/story_full.txt", "w", encoding="utf-8") as f:
            f.write(text)
        
        # Trích xuất JSON
        json_match = re.search(r"\{[\s\S]*\}", text)
        if not json_match:
            raise SystemExit("❌ Không tìm thấy JSON trong phản hồi")
        
        story_data = json.loads(json_match.group(0))
        
        # Lưu JSON
        with open("out/story.json", "w", encoding="utf-8") as f:
            json.dump(story_data, f, ensure_ascii=False, indent=2)
        
        print("✅ story.json sẵn sàng")
        return story_data
        
    except Exception as e:
        print(f"❌ Lỗi khi sinh cốt truyện: {e}")
        return None

if __name__ == "__main__":
    generate_story()
