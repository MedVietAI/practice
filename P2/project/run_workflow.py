#!/usr/bin/env python3
"""
Comprehensive workflow script for creating Vietnam 80th Anniversary Comic
This script demonstrates the complete process from image crawling to comic generation
"""

import os
import sys
import subprocess
import json
from pathlib import Path

def run_command(command, description):
    """Run a command and handle errors"""
    print(f"\n🔄 {description}...")
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        print(f"✅ {description} completed successfully")
        if result.stdout:
            print(f"Output: {result.stdout}")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Error in {description}: {e}")
        if e.stderr:
            print(f"Error details: {e.stderr}")
        return False

def check_requirements():
    """Check if all required files and configurations are in place"""
    print("🔍 Checking requirements...")
    
    # Check if .env exists and has API key
    if not os.path.exists('.env'):
        print("❌ Missing .env file. Please create it with your API_KEY")
        return False
    
    with open('.env', 'r') as f:
        env_content = f.read()
        if 'sk-xxxxxx' in env_content:
            print("⚠️  Please update .env file with your actual API key")
            return False
    
    # Check if links.txt has real URLs
    links_path = 'sources/links.txt'
    if not os.path.exists(links_path):
        print("❌ Missing sources/links.txt file")
        return False
    
    with open(links_path, 'r') as f:
        links_content = f.read()
        if 'example-article' in links_content:
            print("⚠️  Please update sources/links.txt with real URLs from the 3 official sources")
            return False
    
    print("✅ All requirements checked")
    return True

def create_sample_data():
    """Create sample data for testing if real data is not available"""
    print("\n📝 Creating sample data for testing...")
    
    # Create sample images.json
    sample_images = [
        {
            "local_path": "public/assets/sample_image_1.jpg",
            "source_page": "https://dangcongsan.vn/sample-article",
            "image_url": "https://dangcongsan.vn/sample-image.jpg",
            "credit": "dangcongsan.vn",
            "accessed_at": "2025-01-22 10:00:00",
            "file_size": 1024000
        },
        {
            "local_path": "public/assets/sample_image_2.jpg", 
            "source_page": "https://baochinhphu.vn/sample-article",
            "image_url": "https://baochinhphu.vn/sample-image.jpg",
            "credit": "baochinhphu.vn",
            "accessed_at": "2025-01-22 10:00:00",
            "file_size": 1024000
        },
        {
            "local_path": "public/assets/sample_image_3.jpg",
            "source_page": "https://vtv.vn/sample-article", 
            "image_url": "https://vtv.vn/sample-image.jpg",
            "credit": "vtv.vn",
            "accessed_at": "2025-01-22 10:00:00",
            "file_size": 1024000
        }
    ]
    
    os.makedirs('public/assets', exist_ok=True)
    with open('public/assets/images.json', 'w', encoding='utf-8') as f:
        json.dump(sample_images, f, ensure_ascii=False, indent=2)
    
    # Create sample story.json
    sample_story = {
        "title": "Hành Trình 80 Năm - Tự Hào Việt Nam",
        "pages": [
            {
                "page_no": 1,
                "kind": "cover",
                "page_title": "Kỷ Niệm 80 Năm Quốc Khánh",
                "narration": "Một hành trình vĩ đại của dân tộc Việt Nam",
                "panels": []
            },
            {
                "page_no": 2,
                "kind": "story",
                "page_title": "Lịch Sử Hào Hùng",
                "narration": "Từ ngày 2/9/1945 đến nay...",
                "panels": [
                    {
                        "role": "caption",
                        "text": "Ngày 2/9/1945, Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập"
                    },
                    {
                        "role": "dialogue",
                        "speaker": "Bác Hồ",
                        "text": "Nước Việt Nam có quyền hưởng tự do và độc lập"
                    }
                ]
            },
            {
                "page_no": 3,
                "kind": "story",
                "page_title": "Hiện Tại Tươi Sáng",
                "narration": "Những thành tựu vĩ đại của đất nước...",
                "panels": [
                    {
                        "role": "caption",
                        "text": "Đất nước phát triển mạnh mẽ trong 80 năm qua"
                    },
                    {
                        "role": "dialogue",
                        "speaker": "Nhân dân",
                        "text": "Chúng ta tự hào về những thành tựu của đất nước"
                    }
                ]
            }
        ]
    }
    
    os.makedirs('out', exist_ok=True)
    with open('out/story.json', 'w', encoding='utf-8') as f:
        json.dump(sample_story, f, ensure_ascii=False, indent=2)
    
    with open('out/story_full.txt', 'w', encoding='utf-8') as f:
        f.write("Sample story content for testing purposes")
    
    print("✅ Sample data created")

def main():
    """Main workflow function"""
    print("🎨 Vietnam 80th Anniversary Comic Generator")
    print("=" * 50)
    
    # Check requirements
    if not check_requirements():
        print("\n⚠️  Some requirements are missing. Creating sample data for demonstration...")
        create_sample_data()
    
    # Step 1: Crawl images (or use sample data)
    print("\n📸 Step 1: Image Collection")
    if os.path.exists('public/assets/images.json'):
        print("✅ Images already available")
    else:
        if not run_command("python crawler.py", "Image crawling"):
            print("⚠️  Image crawling failed, using sample data")
            create_sample_data()
    
    # Step 2: Generate story
    print("\n📖 Step 2: Story Generation")
    if os.path.exists('out/story.json'):
        print("✅ Story already available")
    else:
        if not run_command("python gen_story.py", "Story generation"):
            print("⚠️  Story generation failed, using sample data")
            create_sample_data()
    
    # Step 3: Create comic
    print("\n🎨 Step 3: Comic Creation")
    if not run_command("python make_comic.py", "Comic generation"):
        print("❌ Comic generation failed")
        return False
    
    # Step 4: Optional PNG conversion
    print("\n🖼️ Step 4: PNG Conversion (Optional)")
    convert_png = input("Do you want to convert SVG to PNG? (y/n): ").lower().strip()
    if convert_png == 'y':
        # Install cairosvg if not available
        run_command("pip install cairosvg", "Installing cairosvg")
        run_command("python convert_to_png.py", "PNG conversion")
    
    # Summary
    print("\n🎉 Workflow completed successfully!")
    print("\n📁 Generated files:")
    
    # List generated files
    comic_files = list(Path('comic').glob('*.svg'))
    if comic_files:
        print(f"  📚 Comic pages: {len(comic_files)} SVG files in comic/")
        for file in sorted(comic_files):
            print(f"    - {file.name}")
    
    png_files = list(Path('comic').glob('*.png'))
    if png_files:
        print(f"  🖼️ PNG files: {len(png_files)} PNG files in comic/")
    
    print(f"  📊 Metadata: public/assets/images.json")
    print(f"  📝 Story: out/story.json")
    
    print("\n✨ Your Vietnam 80th Anniversary comic is ready!")
    print("🇻🇳 Chúc mừng kỷ niệm 80 năm Quốc khánh!")

if __name__ == "__main__":
    main()
