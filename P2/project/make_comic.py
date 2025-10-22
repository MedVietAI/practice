# make_comic.py
import os, json, random, math
import svgwrite
from PIL import Image

# Cấu hình A4
W_mm, H_mm = 210, 297  # A4 mm
DPI = 300
PX_W, PX_H = int(W_mm/25.4*DPI), int(H_mm/25.4*DPI)
MARGIN = 40  # px

def load_data():
    """Tải dữ liệu cần thiết"""
    with open("public/assets/images.json", "r", encoding="utf-8") as f:
        images = json.load(f)
    
    with open("out/story.json", "r", encoding="utf-8") as f:
        story = json.load(f)
    
    return images, story

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
        stroke='black', 
        stroke_width=2, 
        opacity=0.92
    ))
    
    # Đuôi bong bóng
    if tail_to:
        tx, ty = tail_to
        group.add(dwg.polygon(
            points=[(x+w*0.3, y+h), (x+w*0.35, y+h+22), (tx, ty)], 
            fill='white', 
            stroke='black', 
            stroke_width=2
        ))
    
    # Text (SVG native)
    text_element = dwg.text("", insert=(x+16, y+34), fill='black', font_size=24, font_family='system-ui')
    
    # Wrap text theo độ dài ký tự
    line = ""
    max_chars = int((w-32)/12)
    
    for word in text.split():
        if len(line) + len(word) + 1 > max_chars:
            text_element.add(dwg.tspan(line, x=[x+16], dy=[28]))
            line = word
        else:
            line = (line + " " + word).strip()
    
    if line:
        text_element.add(dwg.tspan(line, x=[x+16], dy=[28]))
    
    group.add(text_element)

def create_cover_page(dwg, page_data, images):
    """Tạo trang bìa"""
    # Nền
    dwg.add(dwg.rect(insert=(0, 0), size=(PX_W, PX_H), fill="#f7f7f7"))
    
    # Tiêu đề trang
    title = page_data.get("page_title", "Trang bìa")
    dwg.add(dwg.text(
        title, 
        insert=(MARGIN, MARGIN+10), 
        font_size=36, 
        font_family='system-ui', 
        fill='#111'
    ))
    
    # Ảnh nền chính
    selected_images = choose_images(images, 1)
    if selected_images:
        img_path = selected_images[0]
        try:
            img = Image.open(img_path)
            iw, ih = img.size
            
            # Fit vào khung lớn
            box_w, box_h = PX_W - 2*MARGIN, PX_H - 3*MARGIN
            scale = min(box_w/iw, box_h/ih)
            rw, rh = int(iw*scale), int(ih*scale)
            x = (PX_W - rw)//2
            y = (PX_H - rh)//2
            
            dwg.add(dwg.image(href=img_path, insert=(x, y), size=(rw, rh)))
        except Exception as e:
            print(f"Lỗi khi tải ảnh {img_path}: {e}")
    
    # Text kỷ niệm
    dwg.add(dwg.text(
        "Kỷ niệm 80 năm Quốc khánh 2/9/2025", 
        insert=(MARGIN, PX_H-MARGIN), 
        font_size=28, 
        fill='#c00'
    ))

def create_story_page(dwg, page_data, images):
    """Tạo trang nội dung"""
    # Nền
    dwg.add(dwg.rect(insert=(0, 0), size=(PX_W, PX_H), fill="#f7f7f7"))
    
    # Tiêu đề trang
    title = page_data.get("page_title", "Trang")
    dwg.add(dwg.text(
        title, 
        insert=(MARGIN, MARGIN+10), 
        font_size=36, 
        font_family='system-ui', 
        fill='#111'
    ))
    
    # Bố cục 2-4 khung linh hoạt
    panels = page_data.get("panels", [])
    panel_count = min(4, max(2, len(panels)))
    selected_images = choose_images(images, panel_count)
    
    # Tính toán layout
    cols = 2 if panel_count >= 2 else 1
    rows = math.ceil(panel_count/cols)
    padding = 16
    
    panel_w = (PX_W - 2*MARGIN - (cols-1)*padding)//cols
    panel_h = (PX_H - 2*MARGIN - 60 - (rows-1)*padding)//rows
    
    # Tạo các panel
    for i in range(panel_count):
        row = i // cols
        col = i % cols
        
        x = MARGIN + col*(panel_w + padding)
        y = MARGIN + 40 + row*(panel_h + padding)
        
        # Khung panel
        dwg.add(dwg.rect(
            insert=(x, y), 
            size=(panel_w, panel_h), 
            fill='white', 
            stroke='#ddd'
        ))
        
        # Ảnh nền panel
        if i < len(selected_images):
            img_path = selected_images[i]
            dwg.add(dwg.image(
                href=img_path, 
                insert=(x, y), 
                size=(panel_w, panel_h), 
                preserveAspectRatio='xMidYMid slice'
            ))
        
        # Bong bóng thoại nếu có text
        if i < len(panels):
            panel_text = panels[i].get('text', '')
            if panel_text:
                bubble_x = x + 16
                bubble_y = y + 16
                bubble_w = panel_w - 32
                bubble_h = 110
                
                add_speech_bubble(
                    dwg, dwg, 
                    bubble_x, bubble_y, bubble_w, bubble_h, 
                    panel_text, 
                    tail_to=(x + panel_w*0.8, y + bubble_h + 20)
                )

def create_comic_pages():
    """Tạo tất cả trang truyện tranh"""
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
            insert=(MARGIN, PX_H-MARGIN/2), 
            font_size=18, 
            fill='#555'
        ))
        
        dwg.save()
        print(f"✅ Đã tạo: {dwg.filename}")

def main():
    """Hàm chính"""
    print("🎨 Bắt đầu tạo truyện tranh...")
    create_comic_pages()
    print("🎉 Hoàn thành! Truyện tranh đã lưu trong thư mục comic/")

if __name__ == "__main__":
    main()
