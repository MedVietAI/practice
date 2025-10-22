#!/usr/bin/env python3
"""
Setup script for Vietnam 80th Anniversary Comic Generator
This script helps set up the project environment and dependencies
"""

import os
import sys
import subprocess
import shutil
from pathlib import Path

def run_command(command, description, check=True):
    """Run a command and handle errors"""
    print(f"🔄 {description}...")
    try:
        result = subprocess.run(command, shell=True, check=check, capture_output=True, text=True)
        if result.returncode == 0:
            print(f"✅ {description} completed successfully")
        else:
            print(f"⚠️ {description} completed with warnings")
        if result.stdout:
            print(f"Output: {result.stdout}")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Error in {description}: {e}")
        if e.stderr:
            print(f"Error details: {e.stderr}")
        return False

def check_python():
    """Check Python version"""
    print("🐍 Checking Python version...")
    version = sys.version_info
    if version.major < 3 or (version.major == 3 and version.minor < 8):
        print("❌ Python 3.8+ is required")
        return False
    print(f"✅ Python {version.major}.{version.minor}.{version.micro} detected")
    return True

def setup_environment():
    """Set up Python virtual environment"""
    print("\n🔧 Setting up Python environment...")
    
    # Create virtual environment
    if not run_command("python3 -m venv .venv", "Creating virtual environment"):
        return False
    
    # Activate and install dependencies
    activate_cmd = "source .venv/bin/activate" if os.name != 'nt' else ".venv\\Scripts\\activate"
    
    dependencies = [
        "requests",
        "beautifulsoup4", 
        "pillow",
        "pydub",
        "moviepy",
        "imageio-ffmpeg",
        "svgwrite",
        "openai"
    ]
    
    install_cmd = f"{activate_cmd} && pip install {' '.join(dependencies)}"
    if not run_command(install_cmd, "Installing dependencies"):
        return False
    
    print("✅ Environment setup completed")
    return True

def create_directories():
    """Create required directories"""
    print("\n📁 Creating project directories...")
    
    directories = [
        "sources",
        "public/assets", 
        "public/voice",
        "out",
        "dist",
        "comic"
    ]
    
    for directory in directories:
        os.makedirs(directory, exist_ok=True)
        print(f"✅ Created directory: {directory}")
    
    return True

def create_config_files():
    """Create configuration files"""
    print("\n⚙️ Creating configuration files...")
    
    # Create .env file if it doesn't exist
    if not os.path.exists('.env'):
        with open('.env', 'w') as f:
            f.write("# API Key for AI services\n")
            f.write("# Replace with your actual API key\n")
            f.write("API_KEY=sk-xxxxxx\n")
        print("✅ Created .env file")
    else:
        print("✅ .env file already exists")
    
    # Create .gitignore
    if not os.path.exists('.gitignore'):
        gitignore_content = """# Environment variables
.env

# Python
__pycache__/
*.pyc
*.pyo
*.pyd
.Python
.venv/
venv/

# Generated files
public/assets/*.jpg
public/assets/*.png
public/assets/*.jpeg
public/assets/*.webp
out/story.json
out/story_full.txt
comic/*.svg
comic/*.png
dist/*.mp4

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db
"""
        with open('.gitignore', 'w') as f:
            f.write(gitignore_content)
        print("✅ Created .gitignore file")
    else:
        print("✅ .gitignore file already exists")
    
    return True

def create_sample_links():
    """Create sample links file"""
    print("\n📝 Creating sample links file...")
    
    links_content = """# Sample URLs from official sources for 80th Anniversary of Vietnam's Independence Day
# Replace these with actual URLs from the three official sources

# dangcongsan.vn examples (replace with real URLs)
https://dangcongsan.vn/example-article-1
https://dangcongsan.vn/example-article-2
https://dangcongsan.vn/example-article-3

# baochinhphu.vn examples (replace with real URLs)
https://baochinhphu.vn/example-article-1
https://baochinhphu.vn/example-article-2
https://baochinhphu.vn/example-article-3

# vtv.vn examples (replace with real URLs)
https://vtv.vn/example-article-1
https://vtv.vn/example-article-2
https://vtv.vn/example-article-3

# Note: You need to replace these example URLs with actual URLs from the three official sources
# Search for articles about 80th anniversary celebrations, ceremonies, and activities
# Minimum 15-20 URLs from each source (45-60 total URLs)
"""
    
    with open('sources/links.txt', 'w', encoding='utf-8') as f:
        f.write(links_content)
    
    print("✅ Created sample links file")
    return True

def make_scripts_executable():
    """Make Python scripts executable"""
    print("\n🔧 Making scripts executable...")
    
    scripts = [
        "crawler.py",
        "gen_story.py", 
        "make_comic.py",
        "convert_to_png.py",
        "run_workflow.py"
    ]
    
    for script in scripts:
        if os.path.exists(script):
            os.chmod(script, 0o755)
            print(f"✅ Made {script} executable")
    
    return True

def main():
    """Main setup function"""
    print("🎨 Vietnam 80th Anniversary Comic Generator Setup")
    print("=" * 60)
    
    # Check Python version
    if not check_python():
        print("❌ Setup failed: Python version requirement not met")
        return False
    
    # Set up environment
    if not setup_environment():
        print("❌ Setup failed: Environment setup failed")
        return False
    
    # Create directories
    if not create_directories():
        print("❌ Setup failed: Directory creation failed")
        return False
    
    # Create config files
    if not create_config_files():
        print("❌ Setup failed: Configuration file creation failed")
        return False
    
    # Create sample links
    if not create_sample_links():
        print("❌ Setup failed: Sample links creation failed")
        return False
    
    # Make scripts executable
    if not make_scripts_executable():
        print("❌ Setup failed: Script permissions failed")
        return False
    
    print("\n🎉 Setup completed successfully!")
    print("\n📋 Next steps:")
    print("1. Update .env file with your actual API key")
    print("2. Update sources/links.txt with real URLs from the 3 official sources")
    print("3. Run: python run_workflow.py")
    print("\n🇻🇳 Chúc mừng kỷ niệm 80 năm Quốc khánh!")
    
    return True

if __name__ == "__main__":
    main()
