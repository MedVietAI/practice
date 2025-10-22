**Sản phẩm:** Bài nhạc dạng **lyric song** (có **phần lời** và **nhạc nền**), xuất bản thành **video lyric MP4** hiển thị lời trên nền **ảnh tĩnh hợp lệ** (chỉ từ dangcongsan.vn, baochinhphu.vn, vtv.vn).
**Ghi chú:** Đề cho phép **Suno** là tài nguyên hỗ trợ tạo nhạc. Tuy nhiên để đảm bảo toàn bộ quy trình có thể chạy **hoàn toàn trong Cursor** và **không phụ thuộc API ngoài**, hướng dẫn mặc định dưới đây sẽ **tự sinh nhạc nền** (thuật toán) + **tự sinh lời** (Gemini) + **tự render video** (MoviePy). Nếu BTC cung cấp link nhạc Suno có thể **tải trực tiếp** bằng `requests` (mục A7).

---

## 0) Mục tiêu & tinh thần

* Giai điệu nhẹ nhàng – hùng tráng, tiết tấu 80–95 BPM, giọng điệu **trang trọng – tự hào – gắn kết**.
* Lời ca đề cao: **độc lập – tự do – hạnh phúc**, **đại đoàn kết**, **tri ân** thế hệ cha anh, **khát vọng phát triển** tương lai.
* Tránh nêu dữ kiện chưa xác thực; ưu tiên thông điệp – cảm xúc – tính giáo dục.

## 1) Cấu trúc dự án

```
lyric_project/
 ├─ .env                      # API_KEY=...
 ├─ sources/links.txt         # URL từ 3 nguồn hợp lệ (ảnh nền)
 ├─ public/assets/            # ảnh tải về + images.json
 ├─ public/music/             # nhạc nền (auto_compose.wav / suno_track.mp3)
 ├─ out/
 │   ├─ lyrics.json           # cấu trúc verse/chorus/bridge + timing
 │   └─ lyrics_full.txt
 ├─ dist/
 │   └─ lyric_video.mp4
 ├─ crawler.py
 ├─ gen_lyrics.py
 ├─ compose_music.py
 ├─ make_lyric_video.py
 └─ (tuỳ chọn) fetch_suno.py
```

## 2) Chuẩn bị môi trường

```bash
python -m venv lyric_project/.venv
source lyric_project/.venv/bin/activate  # Windows: .venv\Scripts\activate
pip install requests beautifulsoup4 numpy pillow moviepy imageio-ffmpeg
printf "API_KEY=sk-xxxx\n" > lyric_project/.env
```

## 3) Crawler ảnh hợp lệ (3 domain)

Tạo `crawler.py` (giống logic whitelist đã dùng ở các đề trước), chạy:

```bash
cd lyric_project
python crawler.py
```

Yêu cầu có ≥ 8–12 ảnh đa dạng để dàn nền.

## 4) Sinh **lời bài hát** (Gemini → JSON + text)

Tạo `gen_lyrics.py`:

```python
from openai import OpenAI
import os, re, json

client = OpenAI(api_key=os.getenv("API_KEY"), base_url="https://api.thucchien.ai")
PROMPT = {
  "role":"user",
  "content": (
    "Sáng tác lời bài hát tiếng Việt về kỷ niệm 80 năm Quốc khánh 2/9/2025.\n"
    "Tông trang trọng, tự hào, ấm áp; nhấn mạnh độc lập–tự do–hạnh phúc, đại đoàn kết, tri ân và khát vọng phát triển.\n"
    "Cấu trúc: Intro (spoken, 4s), Verse1 (20s), PreChorus (8s), Chorus (16s), Verse2 (20s), Bridge (8s), Chorus (16s).\n"
    "Trả JSON: {bpm, key, structure:[{label,duration_sec,lines:["câu 1","câu 2",...]}]}.\n"
    "Không nêu số liệu/địa danh chưa xác thực; lời hát ngắn gọn, dễ đọc trên màn hình."
  )
}

resp = client.chat.completions.create(model="gemini-2.5-pro", messages=[PROMPT])
text = resp.choices[0].message.content
os.makedirs("out", exist_ok=True)
with open("out/lyrics_full.txt","w",encoding="utf-8") as f: f.write(text)
m = re.search(r"\{[\s\S]*\}", text)
if not m: raise SystemExit("Không thấy JSON")
obj = json.loads(m.group(0))
with open("out/lyrics.json","w",encoding="utf-8") as f: json.dump(obj, f, ensure_ascii=False, indent=2)
print("✅ lyrics.json sẵn sàng")
```

Chạy:

```bash
python gen_lyrics.py
```

## 5) **Tự soạn nhạc nền** (thuật toán, không cần API ngoài)

Tạo `compose_music.py` — tạo **WAV** 90–100s ở 44.1kHz, hoà âm hợp âm I–V–vi–IV (C–G–Am–F) hoặc tương tự theo `obj["key"]` nếu có:

```python
import os, json, math, wave, struct
import numpy as np

SR = 44100
AMP = 0.25  # giảm để tránh clip

NOTE_FREQS = {
  'C4':261.63,'D4':293.66,'E4':329.63,'F4':349.23,'G4':392.00,'A4':440.00,'B4':493.88,
  'C3':130.81,'E3':164.81,'G3':196.00,'A3':220.00,'F3':174.61
}
CHORDS = [ ('C3','E3','G3'), ('G3','B3','D4'), ('A3','C4','E4'), ('F3','A3','C4') ]

with open('out/lyrics.json','r',encoding='utf-8') as f:
    lyr = json.load(f)

bpm = lyr.get('bpm', 88)
beat = 60.0/bpm
bar_dur = beat*4

secs = sum(max(2, s.get('duration_sec',8)) for s in lyr.get('structure',[]))
# vòng hợp âm lặp đủ dài

samples = np.zeros(int(SR*secs), dtype=np.float32)

def synth_chord(chord_notes, dur, sr=SR):
    t = np.linspace(0, dur, int(sr*dur), endpoint=False)
    sig = np.zeros_like(t)
    for n in chord_notes:
        f = NOTE_FREQS.get(n, 220.0)
        sig += np.sin(2*np.pi*f*t)
    # ADSR đơn giản
    a = int(0.02*sr); d = int(0.15*sr); r = int(0.2*sr)
    env = np.ones_like(sig)
    env[:a] = np.linspace(0,1,a)
    env[a:a+d] = np.linspace(1,0.8,max(1,d))
    env[-r:] = np.linspace(0.8,0,max(1,r))
    sig = (sig/len(chord_notes))*env
    return sig

pos=0
while pos < len(samples):
    for chord in CHORDS:
        seg = synth_chord(chord, bar_dur)
        end = min(len(samples), pos+len(seg))
        samples[pos:end] += seg[:end-pos]
        pos = end
        if pos >= len(samples): break

samples *= AMP
# limiter thô
mx = np.max(np.abs(samples));
if mx>0.99: samples *= 0.99/mx

os.makedirs('public/music', exist_ok=True)
with wave.open('public/music/auto_compose.wav','wb') as wf:
    wf.setnchannels(2)
    wf.setsampwidth(2)
    wf.setframerate(SR)
    stereo = np.stack([samples, samples], axis=1)
    pcm = (stereo*32767).astype(np.int16)
    wf.writeframes(pcm.tobytes())
print('✅ Tạo nhạc nền public/music/auto_compose.wav')
```

Chạy:

```bash
python compose_music.py
```

## 6) Render **video lyric MP4** (ảnh nền hợp lệ + overlay lời theo timing)

Tạo `make_lyric_video.py`:

```python
import os, json, random
from moviepy.editor import ImageClip, AudioFileClip, TextClip, CompositeVideoClip, ColorClip
from PIL import Image

W,H = 1920,1080
FPS=30
IMG_JSON='public/assets/images.json'
AUDIO='public/music/auto_compose.wav'  # hoặc suno_track.mp3 nếu có
OUT='dist/lyric_video.mp4'

os.makedirs('dist', exist_ok=True)
with open('out/lyrics.json','r',encoding='utf-8') as f: lyr=json.load(f)
with open(IMG_JSON,'r',encoding='utf-8') as f: imgs=json.load(f)

bg_paths=[it['local_path'] for it in imgs if os.path.exists(it['local_path'])]
random.shuffle(bg_paths)

aud=AudioFileClip(AUDIO)

clips=[]; t=0.0

for sec in lyr['structure']:
    dur = max(2, float(sec.get('duration_sec',8)))
    # chọn ảnh nền
    if not bg_paths: raise SystemExit('Thiếu ảnh nền hợp lệ')
    bg = ImageClip(random.choice(bg_paths)).resize(height=H)
    if bg.w < W: bg = bg.resize(width=W)
    bg = bg.set_duration(dur)
    # khung mờ để đọc chữ
    pad = ColorClip(size=(W, int(H*0.28)), color=(0,0,0)).set_opacity(0.45).set_position((0,int(H*0.62))).set_duration(dur)
    # ghép câu theo dòng
    lines = sec.get('lines', [])
    text = "\n".join(lines)
    lyrclip = TextClip(text, fontsize=48, color='white', method='caption', size=(W-240,None), align='center', font='DejaVu-Sans')\
        .set_position(('center', int(H*0.68)))\
        .set_duration(dur)
    title = TextClip(sec.get('label',''), fontsize=42, color='#ffd200', font='DejaVu-Sans')\
        .set_position((80,60)).set_duration(min(4,dur))

    comp = CompositeVideoClip([bg, pad, lyrclip, title], size=(W,H)).set_start(t)
    clips.append(comp)
    t += dur

# tiêu đề mở + credit cuối
intro = CompositeVideoClip([
    ColorClip(size=(W,H), color=(180,0,0)).set_duration(3),
    TextClip("BÀI HÁT — KỶ NIỆM 80 NĂM QUỐC KHÁNH 2/9", fontsize=64, color='white', font='DejaVu-Sans').set_duration(3).set_position('center')
], size=(W,H)).set_start(0)

end = CompositeVideoClip([
    ColorClip(size=(W,H), color=(0,60,120)).set_duration(3),
    TextClip("Nguồn ảnh: dangcongsan.vn · baochinhphu.vn · vtv.vn", fontsize=36, color='white', font='DejaVu-Sans').set_duration(3).set_position('center')
], size=(W,H)).set_start(t)

final = CompositeVideoClip([intro]+clips+[end], size=(W,H))
final = final.set_audio(aud).set_fps(FPS)
final.write_videofile(OUT, codec='libx264', audio_codec='aac', fps=FPS, bitrate='6000k')
print('✅ Xuất', OUT)
```

Chạy:

```bash
python make_lyric_video.py
```

## 7) (Tuỳ chọn) Dùng **Suno** nếu BTC cấp link tải trực tiếp

> Chỉ thực hiện nếu BTC cung cấp **URL tải file nhạc** (mp3/wav). Không tự động tương tác web.
> Tạo `fetch_suno.py`:

```python
import os, requests
url = os.getenv('SUNO_MP3_URL')  # do BTC cung cấp
os.makedirs('public/music', exist_ok=True)
r = requests.get(url, stream=True, timeout=120); r.raise_for_status()
with open('public/music/suno_track.mp3','wb') as f:
    for ch in r.iter_content(8192): f.write(ch)
print('✅ Tải suno_track.mp3 — cập nhật AUDIO trong make_lyric_video.py')
```

Chạy:

```bash
export SUNO_MP3_URL="https://.../track.mp3"  # do BTC cấp
python fetch_suno.py
```

## 8) Checklist nghiệm thu

* [ ] Ảnh nền **chỉ** từ 3 nguồn hợp lệ, có credit cuối video.
* [ ] Lời hát rõ ràng, dễ đọc, không chứa dữ kiện chưa xác thực.
* [ ] Nhạc nền êm, không vỡ tiếng, độ dài khớp tổng thời lượng lyric.
* [ ] **MP4** phát mượt, bitrate ≥ 6 Mbps, 1920×1080.
* [ ] Toàn bộ quy trình chạy **trong Cursor**, không phụ thuộc công cụ ngoài (trừ khi BTC cung cấp **link Suno** hợp lệ).
