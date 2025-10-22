**Sản phẩm:** **Bảng báo cáo tổng kết** dựa trên **dữ liệu thống kê** do **BTC** cung cấp.
**Đầu vào:** 1 file dữ liệu (gợi ý `data/btc_stats.csv` hoặc `.xlsx`).
**Đầu ra:**

* `dist/report_summary.xlsx` (nhiều sheet) — **bảng biểu tổng hợp**;
* `dist/report.html` (bảng + biểu đồ tĩnh để xem nhanh);
* (tuỳ chọn) `dist/report.pptx` (slide chốt số).

> **Nguyên tắc:** không bịa số liệu; toàn bộ chỉ đọc từ file BTC. Nếu cột thiếu, để **N/A**. Ảnh minh họa (nếu chèn) chỉ từ 3 domain hợp lệ (không bắt buộc trong đề này).

---

## 0) Thư mục & môi trường

```bash
mkdir -p stats_report/{data,dist}
python -m venv stats_report/.venv
source stats_report/.venv/bin/activate
pip install pandas openpyxl matplotlib python-pptx jinja2
```

> Chép file BTC vào `stats_report/data/` (ví dụ `btc_stats.xlsx`).

## 1) Chuẩn hoá tên cột (gợi ý)

BTC có thể cung cấp với các trường như: `event_id, date, province, activity_type, attendees, volunteers, budget_planned, budget_actual, media_mentions, satisfaction_score` ...

* Nếu khác tên, cập nhật **mapping** trong script.

## 2) Tạo script tổng hợp — `make_report.py`

```python
import os, sys, pandas as pd, numpy as np
import matplotlib.pyplot as plt
from pptx import Presentation
from pptx.util import Inches, Pt

INFILE = sys.argv[1] if len(sys.argv)>1 else 'data/btc_stats.xlsx'
os.makedirs('dist', exist_ok=True)

# 1) Đọc
if INFILE.endswith('.csv'):
    df = pd.read_csv(INFILE)
else:
    df = pd.read_excel(INFILE)

# 2) Chuẩn hoá tên cột
colmap = {
    'Event ID':'event_id','ID':'event_id',
    'Date':'date','Ngày':'date',
    'Province':'province','Tỉnh/TP':'province',
    'Activity Type':'activity_type','Hoạt động':'activity_type',
    'Attendees':'attendees','Người tham gia':'attendees',
    'Volunteers':'volunteers','Tình nguyện viên':'volunteers',
    'Budget Planned':'budget_planned','Ngân sách dự trù':'budget_planned',
    'Budget Actual':'budget_actual','Ngân sách thực chi':'budget_actual',
    'Media Mentions':'media_mentions','Truyền thông':'media_mentions',
    'Satisfaction':'satisfaction_score','Hài lòng':'satisfaction_score'
}
df = df.rename(columns={k:v for k,v in colmap.items() if k in df.columns})

# 3) Tiền xử lý
for c in ['attendees','volunteers','budget_planned','budget_actual','media_mentions','satisfaction_score']:
    if c in df.columns:
        df[c] = pd.to_numeric(df[c], errors='coerce')
if 'date' in df.columns:
    df['date'] = pd.to_datetime(df['date'], errors='coerce')

# 4) KPI tổng quan
kpis = {}
if 'attendees' in df.columns:
    kpis['Tổng người tham gia'] = int(df['attendees'].sum(skipna=True))
if set(['budget_planned','budget_actual']).issubset(df.columns):
    kpis['Tổng dự trù (₫)'] = float(df['budget_planned'].sum(skipna=True))
    kpis['Tổng thực chi (₫)'] = float(df['budget_actual'].sum(skipna=True))
    kpis['Chênh lệch (₫)'] = kpis['Tổng thực chi (₫)'] - kpis['Tổng dự trù (₫)']
if 'media_mentions' in df.columns:
    kpis['Lượt nhắc truyền thông'] = int(df['media_mentions'].sum(skipna=True))
if 'satisfaction_score' in df.columns:
    kpis['Điểm hài lòng TB'] = round(df['satisfaction_score'].mean(skipna=True),2)

# 5) Phân tích theo chiều (nếu có)
by_province = df.groupby('province', dropna=False).agg({
    'attendees':'sum', 'budget_actual':'sum', 'media_mentions':'sum'
}).reset_index() if 'province' in df.columns else None

by_activity = df.groupby('activity_type', dropna=False).agg({
    'attendees':'sum', 'budget_actual':'sum', 'media_mentions':'sum'
}).reset_index() if 'activity_type' in df.columns else None

by_time = df.set_index('date').resample('W').agg({
    'attendees':'sum','budget_actual':'sum','media_mentions':'sum'
}).reset_index() if 'date' in df.columns else None

# 6) Xuất Excel nhiều sheet
with pd.ExcelWriter('dist/report_summary.xlsx', engine='openpyxl') as w:
    df.to_excel(w, index=False, sheet_name='Raw')
    pd.DataFrame(list(kpis.items()), columns=['KPI','Value']).to_excel(w, index=False, sheet_name='KPI')
    if by_province is not None: by_province.to_excel(w, index=False, sheet_name='By Province')
    if by_activity is not None: by_activity.to_excel(w, index=False, sheet_name='By Activity')
    if by_time is not None: by_time.to_excel(w, index=False, sheet_name='By Week')
print('✅ dist/report_summary.xlsx')

# 7) Biểu đồ PNG để nhúng HTML
plots=[]
if by_province is not None:
    plt.figure(); by_province.sort_values('attendees', ascending=False).head(10).plot(x='province', y='attendees', kind='bar')
    plt.title('Top địa phương theo số người tham gia'); plt.tight_layout(); plt.savefig('dist/by_province_attendees.png'); plots.append('dist/by_province_attendees.png')
if by_activity is not None:
    plt.figure(); by_activity.sort_values('attendees', ascending=False).plot(x='activity_type', y='attendees', kind='bar')
    plt.title('Tham gia theo loại hoạt động'); plt.tight_layout(); plt.savefig('dist/by_activity_attendees.png'); plots.append('dist/by_activity_attendees.png')
if by_time is not None:
    plt.figure(); by_time.plot(x='date', y='attendees')
    plt.title('Xu hướng theo thời gian (người tham gia/tuần)'); plt.tight_layout(); plt.savefig('dist/by_week_attendees.png'); plots.append('dist/by_week_attendees.png')

# 8) Tạo HTML tóm tắt
html = ["<html><head><meta charset='utf-8'><title>Báo cáo tổng kết</title></head><body>"]
html.append("<h1>Báo cáo tổng kết sự kiện — 80 năm Quốc khánh 2/9</h1>")
html.append("<h2>KPI chính</h2><ul>")
for k,v in kpis.items():
    html.append(f"<li>{k}: <b>{v:,}</b></li>")
html.append("</ul>")
for p in plots:
    html.append(f"<h3>{os.path.basename(p)}</h3><img src='{os.path.basename(p)}' style='max-width:960px'>")
html.append("<p><i>Nguồn dữ liệu: BTC cung cấp</i></p>")
html.append("</body></html>")
with open('dist/report.html','w',encoding='utf-8') as f: f.write('\n'.join(html))
print('✅ dist/report.html')

# 9) (Tuỳ chọn) Xuất PPTX chốt số nhanh
try:
    from pptx import Presentation
    prs = Presentation()
    s = prs.slides.add_slide(prs.slide_layouts[0])
    s.shapes.title.text = 'Tổng kết sự kiện 2/9'
    s.placeholders[1].text = '\n'.join([f"{k}: {v:,}" for k,v in kpis.items()])
    prs.save('dist/report.pptx')
    print('✅ dist/report.pptx')
except Exception as e:
    print('PPTX optional skipped:', e)
```

Chạy:

```bash
cd stats_report
python make_report.py data/btc_stats.xlsx
# Hoặc CSV: python make_report.py data/btc_stats.csv
```

## 3) Checklist nghiệm thu

* [ ] Chỉ dùng **dữ liệu BTC**; không bịa số.
* [ ] KPI rõ, bảng phân tích theo **địa phương/loại hoạt động/thời gian** (nếu có cột).
* [ ] Có file **Excel nhiều sheet** + **HTML xem nhanh** (và **PPTX** tuỳ chọn).
* [ ] Đồ thị nhãn tiếng Việt, dễ đọc; file xuất ở thư mục `dist/`.

---

## Gợi ý mở rộng

* Chuẩn hoá **mã hoá tỉnh/TP** theo danh mục, gộp nhóm vùng;
* Thêm sheet **Budget vs Actual** theo chương trình;
* Nếu có **điểm hài lòng**, vẽ **phân phối** và **Top/Bottom 10** đơn vị;
* Nếu có dữ liệu **truyền thông**, vẽ **tương quan** giữa người tham gia và nhắc truyền thông.
