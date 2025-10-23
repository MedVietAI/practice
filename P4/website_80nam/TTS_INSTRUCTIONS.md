
# Hướng dẫn tạo file âm thanh TTS

## Nội dung cần chuyển đổi thành giọng nói:

Kỷ niệm 80 năm Quốc khánh nước Cộng hòa Xã hội Chủ nghĩa Việt Nam.
        
        Hành trình 80 năm của dân tộc Việt Nam từ ngày Bác Hồ đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình lịch sử. Một chặng đường vinh quang của đại đoàn kết toàn dân tộc, của khát vọng phát triển và hướng tới tương lai tươi sáng.
        
        Đây là hành trình vinh quang của dân tộc Việt Nam, từ ngày độc lập đầu tiên đến những thành tựu to lớn trong công cuộc xây dựng và bảo vệ Tổ quốc.
        
        Chúng ta cùng nhau ôn lại truyền thống hào hùng, tri ân các thế hệ đi trước và khẳng định quyết tâm xây dựng đất nước ngày càng giàu mạnh, văn minh.
        
        Khát vọng Việt Nam: Độc lập - Tự do - Hạnh phúc!

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
       
       synthesis_input = texttospeech.SynthesisInput(text="Kỷ niệm 80 năm Quốc khánh nước Cộng hòa Xã hội Chủ nghĩa Việt Nam.
        
        Hành trình 80 năm của dân tộc Việt Nam từ ngày Bác Hồ đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình lịch sử. Một chặng đường vinh quang của đại đoàn kết toàn dân tộc, của khát vọng phát triển và hướng tới tương lai tươi sáng.
        
        Đây là hành trình vinh quang của dân tộc Việt Nam, từ ngày độc lập đầu tiên đến những thành tựu to lớn trong công cuộc xây dựng và bảo vệ Tổ quốc.
        
        Chúng ta cùng nhau ôn lại truyền thống hào hùng, tri ân các thế hệ đi trước và khẳng định quyết tâm xây dựng đất nước ngày càng giàu mạnh, văn minh.
        
        Khát vọng Việt Nam: Độc lập - Tự do - Hạnh phúc!")
       
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
