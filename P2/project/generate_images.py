#!/usr/bin/env python3
"""
AI Image Generation System for Vietnam 80th Anniversary Comic
Creates powerful historical and present-day images with emotional impact
"""

import os
import json
import requests
import time
from openai import OpenAI

# Initialize OpenAI client
client = OpenAI(
    api_key=os.getenv("API_KEY"), 
    base_url="https://api.thucchien.ai"
)

def generate_historical_image(prompt, filename):
    """Generate historical image using AI"""
    try:
        print(f"🎨 Generating historical image: {filename}")
        
        response = client.images.generate(
            model="imagen-4",
            prompt=prompt,
            size="1024x1024",
            quality="hd",
            n=1
        )
        
        image_url = response.data[0].url
        
        # Download and save image
        img_response = requests.get(image_url)
        if img_response.status_code == 200:
            os.makedirs("public/assets/generated", exist_ok=True)
            filepath = f"public/assets/generated/{filename}"
            
            with open(filepath, "wb") as f:
                f.write(img_response.content)
            
            print(f"✅ Generated: {filepath}")
            return filepath
        else:
            print(f"❌ Failed to download image: {image_url}")
            return None
            
    except Exception as e:
        print(f"❌ Error generating image {filename}: {e}")
        return None

def create_historical_scenes():
    """Create powerful historical scenes"""
    historical_prompts = [
        {
            "filename": "ho_chi_minh_declaration.jpg",
            "prompt": "September 2, 1945, Ho Chi Minh reading the Declaration of Independence at Ba Dinh Square, Hanoi, Vietnam. Thousands of Vietnamese people gathered, emotional and proud moment, historical black and white photography style, dramatic lighting, patriotic atmosphere"
        },
        {
            "filename": "war_sacrifice.jpg", 
            "prompt": "Vietnamese soldiers and civilians during the resistance war, showing sacrifice and determination, emotional scene of people fighting for independence, black and white documentary photography style, powerful and moving"
        },
        {
            "filename": "reconstruction_era.jpg",
            "prompt": "Vietnam in the 1950s-1960s, people rebuilding the country after independence, construction workers, farmers, students, showing the spirit of reconstruction and development, documentary photography style"
        },
        {
            "filename": "doi_moi_beginning.jpg",
            "prompt": "Vietnam in the 1980s-1990s, the beginning of Doi Moi (Renovation) policy, people working in new economic zones, factories, showing the transition to modernization, documentary photography style"
        }
    ]
    
    generated_images = []
    
    for scene in historical_prompts:
        filepath = generate_historical_image(scene["prompt"], scene["filename"])
        if filepath:
            generated_images.append({
                "local_path": filepath,
                "source": "AI Generated - Historical",
                "description": scene["filename"].replace(".jpg", "").replace("_", " ").title(),
                "category": "historical",
                "generated_at": time.strftime("%Y-%m-%d %H:%M:%S")
            })
        
        # Add delay to avoid rate limiting
        time.sleep(2)
    
    return generated_images

def create_present_day_scenes():
    """Create present-day scenes showing peace and prosperity"""
    present_prompts = [
        {
            "filename": "modern_hanoi.jpg",
            "prompt": "Modern Hanoi, Vietnam in 2025, bustling city with skyscrapers, modern architecture, people in business suits and traditional ao dai, showing prosperity and development, vibrant colors, professional photography"
        },
        {
            "filename": "peaceful_village.jpg",
            "prompt": "Peaceful Vietnamese countryside village in 2025, green rice fields, modern houses, children playing, elderly people resting, showing tranquility and prosperity, warm and peaceful atmosphere, high quality photography"
        },
        {
            "filename": "young_generation.jpg",
            "prompt": "Young Vietnamese generation in 2025, students and professionals using technology, working in modern offices, showing innovation and progress, diverse and confident people, professional photography"
        },
        {
            "filename": "celebration_2025.jpg",
            "prompt": "Vietnam National Day celebration in 2025, people celebrating with flags, fireworks, cultural performances, showing national pride and unity, festive atmosphere, professional event photography"
        }
    ]
    
    generated_images = []
    
    for scene in present_prompts:
        filepath = generate_historical_image(scene["prompt"], scene["filename"])
        if filepath:
            generated_images.append({
                "local_path": filepath,
                "source": "AI Generated - Present Day",
                "description": scene["filename"].replace(".jpg", "").replace("_", " ").title(),
                "category": "present",
                "generated_at": time.strftime("%Y-%m-%d %H:%M:%S")
            })
        
        # Add delay to avoid rate limiting
        time.sleep(2)
    
    return generated_images

def create_emotional_contrast_scenes():
    """Create scenes that show the contrast between past and present"""
    contrast_prompts = [
        {
            "filename": "war_to_peace.jpg",
            "prompt": "Split image showing Vietnamese war scene on left (black and white, soldiers, destruction) and peaceful modern Vietnam on right (color, prosperity, happiness), dramatic contrast, emotional impact, professional photography"
        },
        {
            "filename": "sacrifice_to_prosperity.jpg",
            "prompt": "Vietnamese family in 1945 (struggling, determined) contrasted with same family in 2025 (prosperous, happy), showing the fruits of sacrifice, emotional storytelling, professional photography"
        },
        {
            "filename": "independence_celebration.jpg",
            "prompt": "Vietnamese people celebrating independence in 1945 (black and white, emotional, historic) and celebrating 80th anniversary in 2025 (color, joyful, modern), showing continuity and progress, professional photography"
        }
    ]
    
    generated_images = []
    
    for scene in contrast_prompts:
        filepath = generate_historical_image(scene["prompt"], scene["filename"])
        if filepath:
            generated_images.append({
                "local_path": filepath,
                "source": "AI Generated - Contrast",
                "description": scene["filename"].replace(".jpg", "").replace("_", " ").title(),
                "category": "contrast",
                "generated_at": time.strftime("%Y-%m-%d %H:%M:%S")
            })
        
        # Add delay to avoid rate limiting
        time.sleep(2)
    
    return generated_images

def update_images_metadata(generated_images):
    """Update the images.json with generated images"""
    # Load existing images
    try:
        with open("public/assets/images.json", "r", encoding="utf-8") as f:
            existing_images = json.load(f)
    except:
        existing_images = []
    
    # Add generated images
    all_images = existing_images + generated_images
    
    # Save updated metadata
    with open("public/assets/images.json", "w", encoding="utf-8") as f:
        json.dump(all_images, f, ensure_ascii=False, indent=2)
    
    print(f"✅ Updated images.json with {len(generated_images)} new images")

def main():
    """Main function to generate all images"""
    print("🎨 VIETNAM 80TH ANNIVERSARY - AI IMAGE GENERATION")
    print("=" * 60)
    
    # Create all image categories
    print("\n📸 Generating Historical Scenes...")
    historical_images = create_historical_scenes()
    
    print("\n📸 Generating Present Day Scenes...")
    present_images = create_present_day_scenes()
    
    print("\n📸 Generating Contrast Scenes...")
    contrast_images = create_emotional_contrast_scenes()
    
    # Combine all images
    all_generated_images = historical_images + present_images + contrast_images
    
    # Update metadata
    update_images_metadata(all_generated_images)
    
    print(f"\n🎉 IMAGE GENERATION COMPLETE!")
    print(f"📊 Total images generated: {len(all_generated_images)}")
    print(f"   📚 Historical: {len(historical_images)}")
    print(f"   🏙️ Present Day: {len(present_images)}")
    print(f"   ⚖️ Contrast: {len(contrast_images)}")
    
    print(f"\n🇻🇳 Ready to create powerful comic with emotional impact!")
    print(f"📁 Images saved in: public/assets/generated/")

if __name__ == "__main__":
    main()
