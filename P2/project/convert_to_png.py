# convert_to_png.py
import glob
import cairosvg

def convert_svg_to_png():
    """Chuyển đổi tất cả SVG sang PNG"""
    svg_files = sorted(glob.glob('comic/page_*.svg'))
    
    for svg_file in svg_files:
        png_file = svg_file.replace('.svg', '.png')
        try:
            cairosvg.svg2png(
                url=svg_file, 
                write_to=png_file, 
                output_width=1240  # Độ phân giải xem nhanh
            )
            print(f"✅ Đã chuyển: {png_file}")
        except Exception as e:
            print(f"❌ Lỗi chuyển đổi {svg_file}: {e}")

if __name__ == "__main__":
    convert_svg_to_png()
