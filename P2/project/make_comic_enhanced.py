# make_comic_enhanced.py - Enhanced comic generator with placeholder images
import os, json, random, math
import svgwrite
from PIL import Image, ImageDraw, ImageFont

# Cấu hình A4
W_mm, H_mm = 210, 297  # A4 mm
DPI = 300
PX_W, PX_H = int(W_mm/25.4*DPI), int(H_mm/25.4*DPI)
MARGIN = 40  # px

def create_placeholder_image(width, height, text, color="#4A90E2"):
    """Tạo ảnh placeholder với text"""
    img = Image.new('RGB', (width, height), color)
    draw = ImageDraw.Draw(img)
    
    # Tạo text placeholder
    try:
        font = ImageFont.truetype("/System/Library/Fonts/Arial.ttf", 24)
    except:
        font = ImageFont.load_default()
    
    # Tính toán vị trí text
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    x = (width - text_width) // 2
    y = (height - text_height) // 2
    
    draw.text((x, y), text, fill="white", font=font)
    return img

def load_data():
    """Tải dữ liệu cần thiết"""
    with open("public/assets/images.json", "r", encoding="utf-8") as f:
        images = json.load(f)
    
    with open("out/story.json", "r", encoding="utf-8") as f:
        story = json.load(f)
    
    return images, story

def create_placeholder_images():
    """Tạo các ảnh placeholder cho comic"""
    os.makedirs("public/assets", exist_ok=True)
    
    # Danh sách ảnh placeholder với nội dung phù hợp
    placeholder_images = [
        ("vietnam_flag.jpg", "Cờ Đỏ Sao Vàng", "#DC143C"),
        ("ho_chi_minh_square.jpg", "Quảng Trường Ba Đình", "#2E8B57"),
        ("vietnam_development.jpg", "Phát Triển Đất Nước", "#4169E1"),
        ("celebration_parade.jpg", "Lễ Diễu Binh", "#FF6347"),
        ("young_people.jpg", "Thế Hệ Trẻ", "#32CD32"),
        ("future_vietnam.jpg", "Tương Lai Việt Nam", "#9370DB"),
        ("historical_moment.jpg", "Khoảnh Khắc Lịch Sử", "#8B4513"),
        ("national_pride.jpg", "Tự Hào Dân Tộc", "#FFD700")
    ]
    
    for filename, text, color in placeholder_images:
        img_path = f"public/assets/{filename}"
        if not os.path.exists(img_path):
            img = create_placeholder_image(800, 600, text, color)
            img.save(img_path, "JPEG", quality=95)
            print(f"✅ Created placeholder: {img_path}")

def choose_images(images, count):
    """Chọn ảnh ngẫu nhiên"""
    random.shuffle(images)
    selected = []
    for img in images:
        path = img["local_path"]
        if os.path.exists(path):
            selected.append(path)
            if len(selected) >= count:
                break
    return selected

def add_speech_bubble(dwg, group, x, y, w, h, text, tail_to=None):
    """Thêm bong bóng thoại"""
    # Bong bóng: hình chữ nhật bo góc + đuôi tam giác
    radius = 18
    group.add(dwg.rect(
        insert=(x, y), 
        size=(w, h), 
        rx=radius, 
        ry=radius, 
        fill='white', 
        stroke='#2C3E50', 
        stroke_width=2, 
        opacity=0.95
    ))
    
    # Đuôi bong bóng
    if tail_to:
        tx, ty = tail_to
        group.add(dwg.polygon(
            points=[(x+w*0.3, y+h), (x+w*0.35, y+h+22), (tx, ty)], 
            fill='white', 
            stroke='#2C3E50', 
            stroke_width=2
        ))
    
    # Text (SVG native)
    text_element = dwg.text("", insert=(x+16, y+34), fill='#2C3E50', font_size=20, font_family='Arial, sans-serif', font_weight='bold')
    
    # Wrap text theo độ dài ký tự
    line = ""
    max_chars = int((w-32)/14)
    
    for word in text.split():
        if len(line) + len(word) + 1 > max_chars:
            text_element.add(dwg.tspan(line, x=[x+16], dy=[24]))
            line = word
        else:
            line = (line + " " + word).strip()
    
    if line:
        text_element.add(dwg.tspan(line, x=[x+16], dy=[24]))
    
    group.add(text_element)

def create_cover_page(dwg, page_data, images):
    """Tạo trang bìa"""
    # Nền gradient
    gradient = dwg.linearGradient((0, 0), (0, PX_H), id="bg_gradient")
    gradient.add_stop_color(0, "#FFD700")  # Vàng
    gradient.add_stop_color(1, "#DC143C")  # Đỏ
    dwg.defs.add(gradient)
    
    dwg.add(dwg.rect(insert=(0, 0), size=(PX_W, PX_H), fill="url(#bg_gradient)"))
    
    # Tiêu đề chính
    title = page_data.get("page_title", "Kỷ Niệm 80 Năm Quốc Khánh")
    dwg.add(dwg.text(
        "HÀNH TRÌNH 80 NĂM", 
        insert=(PX_W//2, MARGIN+60), 
        font_size=48, 
        font_family='Arial, sans-serif', 
        fill='white',
        text_anchor="middle",
        font_weight="bold"
    ))
    
    dwg.add(dwg.text(
        "VỮNG BƯỚC TƯƠNG LAI", 
        insert=(PX_W//2, MARGIN+100), 
        font_size=36, 
        font_family='Arial, sans-serif', 
        fill='white',
        text_anchor="middle",
        font_weight="bold"
    ))
    
    # Ảnh nền chính
    selected_images = choose_images(images, 1)
    if selected_images:
        img_path = selected_images[0]
        try:
            # Tạo khung ảnh với border
            img_x = MARGIN + 50
            img_y = MARGIN + 150
            img_w = PX_W - 2*MARGIN - 100
            img_h = PX_H - 2*MARGIN - 200
            
            # Border cho ảnh
            dwg.add(dwg.rect(
                insert=(img_x-5, img_y-5), 
                size=(img_w+10, img_h+10), 
                fill='white', 
                stroke='#2C3E50', 
                stroke_width=3
            ))
            
            dwg.add(dwg.image(href=img_path, insert=(img_x, img_y), size=(img_w, img_h)))
        except Exception as e:
            print(f"Lỗi khi tải ảnh {img_path}: {e}")
    
    # Text kỷ niệm
    dwg.add(dwg.text(
        "Kỷ niệm 80 năm Quốc khánh 2/9/2025", 
        insert=(PX_W//2, PX_H-MARGIN-20), 
        font_size=24, 
        fill='white',
        text_anchor="middle",
        font_weight="bold"
    ))
    
    # Thông tin nguồn
    dwg.add(dwg.text(
        "Nguồn: dangcongsan.vn • baochinhphu.vn • vtv.vn", 
        insert=(PX_W//2, PX_H-MARGIN+10), 
        font_size=16, 
        fill='white',
        text_anchor="middle"
    ))

def create_story_page(dwg, page_data, images):
    """Tạo trang nội dung"""
    # Nền
    dwg.add(dwg.rect(insert=(0, 0), size=(PX_W, PX_H), fill="#F8F9FA"))
    
    # Tiêu đề trang
    title = page_data.get("page_title", "Trang")
    dwg.add(dwg.text(
        title, 
        insert=(MARGIN, MARGIN+30), 
        font_size=32, 
        font_family='Arial, sans-serif', 
        fill='#2C3E50',
        font_weight="bold"
    ))
    
    # Bố cục 2-4 khung linh hoạt
    panels = page_data.get("panels", [])
    panel_count = min(4, max(2, len(panels)))
    selected_images = choose_images(images, panel_count)
    
    # Tính toán layout
    cols = 2 if panel_count >= 2 else 1
    rows = math.ceil(panel_count/cols)
    padding = 20
    
    panel_w = (PX_W - 2*MARGIN - (cols-1)*padding)//cols
    panel_h = (PX_H - 2*MARGIN - 80 - (rows-1)*padding)//rows
    
    # Tạo các panel
    for i in range(panel_count):
        row = i // cols
        col = i % cols
        
        x = MARGIN + col*(panel_w + padding)
        y = MARGIN + 60 + row*(panel_h + padding)
        
        # Khung panel với shadow
        dwg.add(dwg.rect(
            insert=(x+3, y+3), 
            size=(panel_w, panel_h), 
            fill='#E8E8E8', 
            stroke='none'
        ))
        
        dwg.add(dwg.rect(
            insert=(x, y), 
            size=(panel_w, panel_h), 
            fill='white', 
            stroke='#2C3E50',
            stroke_width=2
        ))
        
        # Ảnh nền panel
        if i < len(selected_images):
            img_path = selected_images[i]
            try:
                dwg.add(dwg.image(
                    href=img_path, 
                    insert=(x+10, y+10), 
                    size=(panel_w-20, panel_h-20), 
                    preserveAspectRatio='xMidYMid slice'
                ))
            except Exception as e:
                print(f"Lỗi khi tải ảnh {img_path}: {e}")
        
        # Bong bóng thoại nếu có text
        if i < len(panels):
            panel_text = panels[i].get('text', '')
            if panel_text:
                bubble_x = x + 20
                bubble_y = y + 20
                bubble_w = panel_w - 40
                bubble_h = 100
                
                add_speech_bubble(
                    dwg, dwg, 
                    bubble_x, bubble_y, bubble_w, bubble_h, 
                    panel_text, 
                    tail_to=(x + panel_w*0.8, y + bubble_h + 30)
                )

def create_comic_pages():
    """Tạo tất cả trang truyện tranh"""
    # Tạo placeholder images trước
    create_placeholder_images()
    
    images, story = load_data()
    
    os.makedirs("comic", exist_ok=True)
    
    for page_data in story.get("pages", []):
        page_no = page_data.get("page_no", 1)
        kind = page_data.get("kind", "story")
        
        # Tạo SVG
        dwg = svgwrite.Drawing(
            filename=f"comic/page_{page_no:02d}.svg", 
            size=(f"{PX_W}px", f"{PX_H}px")
        )
        
        if kind == 'cover':
            create_cover_page(dwg, page_data, images)
        else:
            create_story_page(dwg, page_data, images)
        
        # Footer credit + số trang
        footer = f"Nguồn ảnh: dangcongsan.vn · baochinhphu.vn · vtv.vn  —  Trang {page_no}"
        dwg.add(dwg.text(
            footer, 
            insert=(MARGIN, PX_H-15), 
            font_size=14, 
            fill='#666',
            font_family='Arial, sans-serif'
        ))
        
        dwg.save()
        print(f"✅ Đã tạo: {dwg.filename}")

def main():
    """Hàm chính"""
    print("🎨 Bắt đầu tạo truyện tranh nâng cao...")
    create_comic_pages()
    print("🎉 Hoàn thành! Truyện tranh đã lưu trong thư mục comic/")
    print("🇻🇳 Chúc mừng kỷ niệm 80 năm Quốc khánh!")

if __name__ == "__main__":
    main()
