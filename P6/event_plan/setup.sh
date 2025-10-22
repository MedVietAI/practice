#!/bin/bash
# Setup script for Vietnam 80th Anniversary Event Planning System

echo "🇻🇳 Setting up Vietnam 80th Anniversary Event Planning System..."

# Create virtual environment
echo "📦 Creating virtual environment..."
python3 -m venv .venv

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source .venv/bin/activate

# Install dependencies
echo "📚 Installing dependencies..."
pip install -r requirements.txt

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "🔑 Creating .env file..."
    echo "API_KEY=sk-your-key-here" > .env
    echo "⚠️  Please update .env with your actual API key"
fi

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p sources public/assets out dist

# Run image crawler
echo "🕷️ Running image crawler..."
python crawler.py

# Generate content (if API key is available)
echo "🤖 Generating content..."
if grep -q "sk-your-key-here" .env; then
    echo "⚠️  Please update API_KEY in .env file to generate content with AI"
    echo "📝 Using sample content instead..."
else
    python gen_plan_content.py
fi

# Generate PowerPoint
echo "📊 Generating PowerPoint presentation..."
python make_plan_pptx.py

echo "✅ Setup complete!"
echo "📁 Generated files:"
echo "   - dist/plan_80nam_A90.pptx (PowerPoint presentation)"
echo "   - out/content.json (Event plan content)"
echo "   - public/assets/images.json (Crawled images)"
echo ""
echo "🎯 To use the system:"
echo "   1. Update API_KEY in .env file"
echo "   2. Run: python gen_plan_content.py (to regenerate content with AI)"
echo "   3. Run: python make_plan_pptx.py (to regenerate PowerPoint)"
echo "   4. Open dist/plan_80nam_A90.pptx in PowerPoint"
