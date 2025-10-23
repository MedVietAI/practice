#!/usr/bin/env python3
"""
Text-to-Speech generator for 80th Anniversary Vietnam National Day website
Generates audio from hero section content for enhanced user experience
"""

import os
import json
from datetime import datetime

def generate_tts_script():
    """Generate TTS script for hero section"""
    
    # Load content to get hero section
    try:
        with open('data/content.json', 'r', encoding='utf-8') as f:
            content = json.load(f)
        
        hero_lede = content['hero']['lede']
        
        # Create enhanced TTS script with proper Vietnamese pronunciation
        tts_script = f"""
        Kỷ niệm 80 năm Quốc khánh nước Cộng hòa Xã hội Chủ nghĩa Việt Nam.
        
        {hero_lede}
        
        Đây là hành trình vinh quang của dân tộc Việt Nam, từ ngày độc lập đầu tiên đến những thành tựu to lớn trong công cuộc xây dựng và bảo vệ Tổ quốc.
        
        Chúng ta cùng nhau ôn lại truyền thống hào hùng, tri ân các thế hệ đi trước và khẳng định quyết tâm xây dựng đất nước ngày càng giàu mạnh, văn minh.
        
        Khát vọng Việt Nam: Độc lập - Tự do - Hạnh phúc!
        """
        
        return tts_script.strip()
        
    except FileNotFoundError:
        print("Content file not found. Using default script.")
        return """
        Kỷ niệm 80 năm Quốc khánh nước Cộng hòa Xã hội Chủ nghĩa Việt Nam.
        
        Hành trình 80 năm của dân tộc Việt Nam từ ngày Bác Hồ đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình lịch sử.
        
        Đây là hành trình vinh quang của dân tộc Việt Nam, từ ngày độc lập đầu tiên đến những thành tựu to lớn trong công cuộc xây dựng và bảo vệ Tổ quốc.
        
        Chúng ta cùng nhau ôn lại truyền thống hào hùng, tri ân các thế hệ đi trước và khẳng định quyết tâm xây dựng đất nước ngày càng giàu mạnh, văn minh.
        
        Khát vọng Việt Nam: Độc lập - Tự do - Hạnh phúc!
        """

def create_tts_instructions():
    """Create instructions for TTS generation"""
    
    tts_script = generate_tts_script()
    
    instructions = f"""
# Hướng dẫn tạo file âm thanh TTS

## Nội dung cần chuyển đổi thành giọng nói:

{tts_script}

## Các bước thực hiện:

1. **Sử dụng Google Text-to-Speech API:**
   ```bash
   pip install google-cloud-texttospeech
   ```

2. **Tạo file Python để sinh TTS:**
   ```python
   from google.cloud import texttospeech
   import os
   
   def create_tts_audio():
       client = texttospeech.TextToSpeechClient()
       
       synthesis_input = texttospeech.SynthesisInput(text=\"{tts_script}\")
       
       voice = texttospeech.VoiceSelectionParams(
           language_code="vi-VN",
           name="vi-VN-Standard-A",  # Giọng nữ
           ssml_gender=texttospeech.SsmlVoiceGender.FEMALE
       )
       
       audio_config = texttospeech.AudioConfig(
           audio_encoding=texttospeech.AudioEncoding.MP3
       )
       
       response = client.synthesize_speech(
           input=synthesis_input,
           voice=voice,
           audio_config=audio_config
       )
       
       with open("public/voice/intro.mp3", "wb") as out:
           out.write(response.audio_content)
           print("Audio file created successfully!")
   
   if __name__ == "__main__":
       create_tts_audio()
   ```

3. **Hoặc sử dụng online TTS services:**
   - Azure Cognitive Services
   - Amazon Polly
   - IBM Watson Text to Speech

4. **Lưu file âm thanh:**
   - Đường dẫn: `public/voice/intro.mp3`
   - Định dạng: MP3
   - Chất lượng: 44.1kHz, 128kbps

## Lưu ý:
- Sử dụng giọng nữ Việt Nam để phù hợp với nội dung trang trọng
- Tốc độ nói vừa phải, rõ ràng
- Có thể thêm nhạc nền nhẹ nhàng nếu cần
- Thời lượng khoảng 1-2 phút
"""

    return instructions

def main():
    """Main function to generate TTS instructions"""
    print("Generating TTS instructions for 80th Anniversary website...")
    
    # Create voice directory
    os.makedirs('public/voice', exist_ok=True)
    
    # Generate instructions
    instructions = create_tts_instructions()
    
    # Save instructions
    with open('TTS_INSTRUCTIONS.md', 'w', encoding='utf-8') as f:
        f.write(instructions)
    
    # Create a placeholder audio file info
    audio_info = {
        "file_path": "public/voice/intro.mp3",
        "script": generate_tts_script(),
        "duration_estimate": "90 seconds",
        "voice_type": "Vietnamese Female",
        "quality": "44.1kHz, 128kbps MP3",
        "created_at": datetime.now().isoformat(),
        "note": "This is a placeholder. Use TTS_INSTRUCTIONS.md to generate actual audio file."
    }
    
    with open('public/voice/audio_info.json', 'w', encoding='utf-8') as f:
        json.dump(audio_info, f, ensure_ascii=False, indent=2)
    
    print("TTS instructions generated successfully!")
    print("Instructions saved to: TTS_INSTRUCTIONS.md")
    print("Audio info saved to: public/voice/audio_info.json")
    print("\nTo generate actual audio file, follow the instructions in TTS_INSTRUCTIONS.md")

if __name__ == "__main__":
    main()
