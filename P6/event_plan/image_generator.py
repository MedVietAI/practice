#!/usr/bin/env python3
"""
Image generator for Vietnam 80th Anniversary event planning
Generates patriotic and historical images using AI
"""

import os
import json
import requests
from config import API_KEY, BASE_URL, ASSETS_DIR

class ImageGenerator:
    def __init__(self):
        self.api_key = API_KEY
        self.base_url = BASE_URL
        
    def generate_patriotic_image(self, prompt, style="photographic"):
        """Generate patriotic image using AI"""
        try:
            # Enhanced prompts for Vietnamese patriotism
            enhanced_prompts = {
                "historical_sacrifice": f"Vietnam war footage, 1945-1975, black and white, soldiers fighting for independence, sacrifice, heroic, dramatic lighting, {style}",
                "modern_peace": f"Modern Vietnam 2025, peaceful cities, prosperity, development, Vietnamese flag, golden star, red background, {style}",
                "revolution": f"August Revolution 1945, Ho Chi Minh, Ba Dinh Square, declaration of independence, historical moment, {style}",
                "unity": f"Vietnamese people united, diverse ethnic groups, national flag, solidarity, strength, {style}",
                "future": f"Vietnam 2045 vision, modern technology, green development, prosperity, dragon symbolism, {style}"
            }
            
            # Use enhanced prompt if available
            full_prompt = enhanced_prompts.get(prompt, f"{prompt}, Vietnamese patriotism, {style}")
            
            # Call AI image generation API
            response = requests.post(
                f"{self.base_url}/v1/images/generations",
                headers={
                    "Authorization": f"Bearer {self.api_key}",
                    "Content-Type": "application/json"
                },
                json={
                    "model": "dall-e-3",
                    "prompt": full_prompt,
                    "n": 1,
                    "size": "1024x1024",
                    "quality": "hd",
                    "style": style
                },
                timeout=30
            )
            
            if response.status_code == 200:
                result = response.json()
                if 'data' in result and len(result['data']) > 0:
                    return result['data'][0]['url']
            
            print(f"⚠️  Image generation failed: {response.status_code}")
            return None
            
        except Exception as e:
            print(f"⚠️  Error generating image: {e}")
            return None
    
    def generate_historical_contrast_images(self):
        """Generate images showing historical contrast"""
        images = {}
        
        # Historical sacrifice images
        historical_prompts = [
            "historical_sacrifice",
            "revolution"
        ]
        
        for prompt in historical_prompts:
            image_url = self.generate_patriotic_image(prompt, "photographic")
            if image_url:
                images[f"historical_{prompt}"] = {
                    "url": image_url,
                    "alt": f"Historical {prompt} - Vietnam's struggle for independence",
                    "title": f"Vietnam Historical {prompt.title()}",
                    "category": "historical"
                }
        
        # Modern peace and prosperity images
        modern_prompts = [
            "modern_peace",
            "future"
        ]
        
        for prompt in modern_prompts:
            image_url = self.generate_patriotic_image(prompt, "natural")
            if image_url:
                images[f"modern_{prompt}"] = {
                    "url": image_url,
                    "alt": f"Modern {prompt} - Vietnam's development and prosperity",
                    "title": f"Vietnam Modern {prompt.title()}",
                    "category": "modern"
                }
        
        return images
    
    def save_generated_images(self, images):
        """Save generated images metadata"""
        os.makedirs(ASSETS_DIR, exist_ok=True)
        
        # Load existing images
        existing_file = os.path.join(ASSETS_DIR, 'images.json')
        existing_images = []
        
        if os.path.exists(existing_file):
            with open(existing_file, 'r', encoding='utf-8') as f:
                existing_images = json.load(f)
        
        # Add generated images
        for key, img_data in images.items():
            existing_images.append(img_data)
        
        # Save updated images
        with open(existing_file, 'w', encoding='utf-8') as f:
            json.dump(existing_images, f, ensure_ascii=False, indent=2)
        
        print(f"✅ Added {len(images)} generated images to database")
        return len(images)

def main():
    """Generate patriotic images for the presentation"""
    print("🎨 Generating patriotic images for Vietnam 80th Anniversary...")
    
    generator = ImageGenerator()
    
    # Generate historical contrast images
    images = generator.generate_historical_contrast_images()
    
    if images:
        # Save to database
        count = generator.save_generated_images(images)
        print(f"✅ Generated {count} patriotic images")
    else:
        print("⚠️  No images generated - check API configuration")

if __name__ == "__main__":
    main()
