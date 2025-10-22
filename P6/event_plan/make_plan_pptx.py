#!/usr/bin/env python3
"""
PowerPoint generator for Vietnam 80th Anniversary event plan
Creates professional presentation with comprehensive content
"""

import os
import json
import random
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_AUTO_SHAPE_TYPE
from pptx.enum.dml import MSO_THEME_COLOR
from PIL import Image
from config import OUTPUT_DIR, DIST_DIR, EVENT_TITLE, EVENT_FRAMEWORK

# Slide dimensions (16:9)
W, H = Inches(13.33), Inches(7.5)

# Color scheme (Vietnamese flag colors)
THEME_BG = RGBColor(230, 0, 0)      # Red
ACCENT = RGBColor(255, 210, 0)      # Gold
TEXT = RGBColor(20, 20, 20)         # Dark text
WHITE = RGBColor(255, 255, 255)     # White
LIGHT_BG = RGBColor(248, 248, 248)  # Light background

class PowerPointGenerator:
    def __init__(self):
        self.prs = Presentation()
        self.slide_w = self.prs.slide_width
        self.slide_h = self.prs.slide_height
        
    def add_title_slide(self, title, subtitle=""):
        """Create title slide with Vietnamese theme"""
        slide = self.prs.slides.add_slide(self.prs.slide_layouts[6])
        
        # Background with gradient effect
        bg = slide.shapes.add_shape(MSO_AUTO_SHAPE_TYPE.RECTANGLE, 0, 0, self.slide_w, self.slide_h)
        bg.fill.solid()
        bg.fill.fore_color.rgb = THEME_BG
        bg.line.fill.background()
        
        # Title text box
        title_box = slide.shapes.add_textbox(Inches(0.8), Inches(2.2), Inches(11.8), Inches(2.5))
        title_frame = title_box.text_frame
        title_frame.clear()
        
        # Main title
        title_p = title_frame.paragraphs[0]
        title_p.text = title
        title_p.font.size = Pt(48)
        title_p.font.bold = True
        title_p.font.color.rgb = WHITE
        title_p.alignment = PP_ALIGN.CENTER
        
        # Subtitle
        if subtitle:
            subtitle_p = title_frame.add_paragraph()
            subtitle_p.text = subtitle
            subtitle_p.font.size = Pt(24)
            subtitle_p.font.color.rgb = WHITE
            subtitle_p.alignment = PP_ALIGN.CENTER
        
        return slide
    
    def add_bullets_slide(self, title, bullets, two_col=False):
        """Create bullet points slide"""
        slide = self.prs.slides.add_slide(self.prs.slide_layouts[6])
        
        # Light background
        bg = slide.shapes.add_shape(MSO_AUTO_SHAPE_TYPE.RECTANGLE, 0, 0, self.slide_w, self.slide_h)
        bg.fill.solid()
        bg.fill.fore_color.rgb = LIGHT_BG
        bg.line.fill.background()
        
        # Title
        title_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(11.8), Inches(1.0))
        title_frame = title_box.text_frame
        title_frame.clear()
        title_p = title_frame.paragraphs[0]
        title_p.text = title
        title_p.font.size = Pt(36)
        title_p.font.bold = True
        title_p.font.color.rgb = THEME_BG
        title_p.alignment = PP_ALIGN.CENTER
        
        if two_col:
            # Two column layout
            x1, y, w, h = Inches(0.8), Inches(1.4), Inches(5.6), Inches(5.6)
            x2 = Inches(6.6)
            cols = [(x1, y, w, h), (x2, y, w, h)]
            chunks = [bullets[:len(bullets)//2+1], bullets[len(bullets)//2+1:]]
            
            for (x, y, w, h), bullet_list in zip(cols, chunks):
                text_box = slide.shapes.add_textbox(x, y, w, h)
                text_frame = text_box.text_frame
                text_frame.clear()
                
                for i, bullet in enumerate(bullet_list):
                    p = text_frame.add_paragraph() if i else text_frame.paragraphs[0]
                    p.text = str(bullet)
                    p.level = 0
                    p.font.size = Pt(20)
                    p.font.color.rgb = TEXT
        else:
            # Single column layout
            text_box = slide.shapes.add_textbox(Inches(0.8), Inches(1.4), Inches(11.8), Inches(5.8))
            text_frame = text_box.text_frame
            text_frame.clear()
            
            for i, bullet in enumerate(bullets):
                p = text_frame.add_paragraph() if i else text_frame.paragraphs[0]
                p.text = str(bullet)
                p.level = 0
                p.font.size = Pt(22)
                p.font.color.rgb = TEXT
        
        return slide
    
    def add_timeline_slide(self, title, timeline_data):
        """Create timeline slide with visual elements"""
        slide = self.prs.slides.add_slide(self.prs.slide_layouts[6])
        
        # Background
        bg = slide.shapes.add_shape(MSO_AUTO_SHAPE_TYPE.RECTANGLE, 0, 0, self.slide_w, self.slide_h)
        bg.fill.solid()
        bg.fill.fore_color.rgb = LIGHT_BG
        bg.line.fill.background()
        
        # Title
        title_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(11.8), Inches(1.0))
        title_frame = title_box.text_frame
        title_frame.clear()
        title_p = title_frame.paragraphs[0]
        title_p.text = title
        title_p.font.size = Pt(36)
        title_p.font.bold = True
        title_p.font.color.rgb = THEME_BG
        title_p.alignment = PP_ALIGN.CENTER
        
        # Timeline content
        y_start = Inches(1.8)
        for i, phase in enumerate(timeline_data):
            # Phase box
            phase_box = slide.shapes.add_textbox(Inches(0.8), y_start + i * Inches(1.2), Inches(11.8), Inches(1.0))
            phase_frame = phase_box.text_frame
            phase_frame.clear()
            
            # Phase title
            phase_p = phase_frame.paragraphs[0]
            phase_p.text = f"{phase.get('phase', '')} — {phase.get('window', '')}"
            phase_p.font.size = Pt(24)
            phase_p.font.bold = True
            phase_p.font.color.rgb = THEME_BG
            
            # Workstreams
            for j, workstream in enumerate(phase.get('workstreams', [])):
                ws_p = phase_frame.add_paragraph()
                ws_p.text = f"  • {workstream}"
                ws_p.font.size = Pt(18)
                ws_p.font.color.rgb = TEXT
                ws_p.level = 1
        
        return slide
    
    def add_budget_slide(self, title, budget_data):
        """Create budget slide with table-like layout"""
        slide = self.prs.slides.add_slide(self.prs.slide_layouts[6])
        
        # Background
        bg = slide.shapes.add_shape(MSO_AUTO_SHAPE_TYPE.RECTANGLE, 0, 0, self.slide_w, self.slide_h)
        bg.fill.solid()
        bg.fill.fore_color.rgb = LIGHT_BG
        bg.line.fill.background()
        
        # Title
        title_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(11.8), Inches(1.0))
        title_frame = title_box.text_frame
        title_frame.clear()
        title_p = title_frame.paragraphs[0]
        title_p.text = title
        title_p.font.size = Pt(36)
        title_p.font.bold = True
        title_p.font.color.rgb = THEME_BG
        title_p.alignment = PP_ALIGN.CENTER
        
        # Budget items
        y_start = Inches(1.8)
        for i, item in enumerate(budget_data):
            item_box = slide.shapes.add_textbox(Inches(0.8), y_start + i * Inches(1.0), Inches(11.8), Inches(0.8))
            item_frame = item_box.text_frame
            item_frame.clear()
            
            item_p = item_frame.paragraphs[0]
            item_p.text = f"{item.get('category', '')}: {item.get('planned', '')} ({item.get('notes', '')})"
            item_p.font.size = Pt(20)
            item_p.font.color.rgb = TEXT
        
        return slide
    
    def add_risk_matrix_slide(self, title, risk_data):
        """Create risk assessment slide"""
        slide = self.prs.slides.add_slide(self.prs.slide_layouts[6])
        
        # Background
        bg = slide.shapes.add_shape(MSO_AUTO_SHAPE_TYPE.RECTANGLE, 0, 0, self.slide_w, self.slide_h)
        bg.fill.solid()
        bg.fill.fore_color.rgb = LIGHT_BG
        bg.line.fill.background()
        
        # Title
        title_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(11.8), Inches(1.0))
        title_frame = title_box.text_frame
        title_frame.clear()
        title_p = title_frame.paragraphs[0]
        title_p.text = title
        title_p.font.size = Pt(36)
        title_p.font.bold = True
        title_p.font.color.rgb = THEME_BG
        title_p.alignment = PP_ALIGN.CENTER
        
        # Risk items
        y_start = Inches(1.8)
        for i, risk in enumerate(risk_data):
            risk_box = slide.shapes.add_textbox(Inches(0.8), y_start + i * Inches(1.2), Inches(11.8), Inches(1.0))
            risk_frame = risk_box.text_frame
            risk_frame.clear()
            
            risk_p = risk_frame.paragraphs[0]
            risk_p.text = f"{risk.get('risk', '')} — Tác động: {risk.get('impact', '')} — Xác suất: {risk.get('likelihood', '')}"
            risk_p.font.size = Pt(20)
            risk_p.font.bold = True
            risk_p.font.color.rgb = THEME_BG
            
            mitigation_p = risk_frame.add_paragraph()
            mitigation_p.text = f"Ứng phó: {risk.get('mitigation', '')}"
            mitigation_p.font.size = Pt(18)
            mitigation_p.font.color.rgb = TEXT
            mitigation_p.level = 1
        
        return slide
    
    def generate_presentation(self, data):
        """Generate complete presentation from data"""
        print("📊 Generating PowerPoint presentation...")
        
        # 1) Title slide
        self.add_title_slide(
            data.get('title', EVENT_TITLE), 
            f'Khung {EVENT_FRAMEWORK} — T-60 → T+30'
        )
        
        # 2) Objectives & Scope
        self.add_bullets_slide('Mục tiêu', data.get('objectives', []))
        self.add_bullets_slide('Phạm vi', data.get('scope', []))
        
        # 3) Stakeholders
        self.add_bullets_slide('Các bên liên quan', data.get('stakeholders', []), two_col=True)
        
        # 4) Timeline
        self.add_timeline_slide('Dòng thời gian (A90)', data.get('timeline', []))
        
        # 5) Key programs
        programs = [f"{p.get('name', '')}: {p.get('goal', '')} (Chủ trì: {p.get('owner', '')})" 
                   for p in data.get('program', [])]
        self.add_bullets_slide('Chương trình trọng điểm', programs)
        
        # 6) Communications
        communications = [f"{c.get('channel', '')}: {c.get('message', '')} — Mốc: {c.get('key_dates', '')}" 
                        for c in data.get('communications', [])]
        self.add_bullets_slide('Kế hoạch truyền thông', communications, two_col=True)
        
        # 7) Logistics
        logistics = [f"{l.get('item', '')}: {l.get('details', '')} — Hạn: {l.get('deadline', '')}" 
                   for l in data.get('logistics', [])]
        self.add_bullets_slide('Hậu cần', logistics)
        
        # 8) Budget
        self.add_budget_slide('Ngân sách (dự trù)', data.get('budget', []))
        
        # 9) Risk assessment
        self.add_risk_matrix_slide('Rủi ro chính & Ứng phó', data.get('risk', []))
        
        # 10) Safety
        safety = [f"{s.get('topic', '')}: {s.get('actions', '')}" for s in data.get('safety', [])]
        self.add_bullets_slide('An toàn', safety)
        
        # 11) Sustainability
        sustainability = [f"{s.get('topic', '')}: {s.get('actions', '')}" for s in data.get('sustainability', [])]
        self.add_bullets_slide('Bền vững', sustainability)
        
        # 12) RACI Matrix
        raci = [f"{r.get('task', '')}: R={r.get('R', '')}, A={r.get('A', '')}, C={r.get('C', '')}, I={r.get('I', '')}" 
               for r in data.get('raci', [])]
        self.add_bullets_slide('Ma trận RACI', raci)
        
        # 13) KPIs
        kpis = [f"{k.get('metric', '')}: {k.get('definition', '')} — Mục tiêu: {k.get('target', '')}" 
               for k in data.get('kpi', [])]
        self.add_bullets_slide('Chỉ số đo lường (KPI)', kpis)
        
        # 14) Approvals
        approvals = [f"Cổng {a.get('gate', '')}: {a.get('criteria', '')} — Chủ trì: {a.get('owner', '')}" 
                    for a in data.get('approvals', [])]
        self.add_bullets_slide('Cổng phê duyệt', approvals)
        
        # 15) Closing slide
        self.add_title_slide('Tri ân — Đoàn kết — Khát vọng', 'Hướng tới tương lai phồn vinh, hạnh phúc')
        
        print(f"✅ Generated {len(self.prs.slides)} slides")
    
    def save_presentation(self, filename="plan_80nam_A90.pptx"):
        """Save presentation to file"""
        os.makedirs(DIST_DIR, exist_ok=True)
        filepath = os.path.join(DIST_DIR, filename)
        self.prs.save(filepath)
        print(f"✅ Saved presentation to {filepath}")
        return filepath

def main():
    """Main function to generate PowerPoint presentation"""
    print("🎯 Starting PowerPoint generation for Vietnam 80th Anniversary...")
    
    # Load content
    content_file = os.path.join(OUTPUT_DIR, 'content.json')
    if not os.path.exists(content_file):
        print("❌ Content file not found. Please run gen_plan_content.py first.")
        return
    
    with open(content_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Generate presentation
    generator = PowerPointGenerator()
    generator.generate_presentation(data)
    generator.save_presentation()
    
    print("🎉 PowerPoint presentation generated successfully!")

if __name__ == "__main__":
    main()
