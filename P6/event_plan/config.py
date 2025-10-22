# Configuration file for the event planning system
import os

# API Configuration
API_KEY = os.getenv("API_KEY", "sk--8AzWfy0-Igppt0xDtQPKQ")
BASE_URL = "https://api.thucchien.ai"

# Project paths
PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))
SOURCES_DIR = os.path.join(PROJECT_ROOT, "sources")
ASSETS_DIR = os.path.join(PROJECT_ROOT, "public", "assets")
OUTPUT_DIR = os.path.join(PROJECT_ROOT, "out")
DIST_DIR = os.path.join(PROJECT_ROOT, "dist")

# Image domains for crawling
VALID_DOMAINS = [
    "dangcongsan.vn",
    "vtv.vn", 
    "nhandan.vn"
]

# Event configuration
EVENT_TITLE = "Kỷ niệm 80 năm Quốc khánh 2/9"
EVENT_FRAMEWORK = "A90"  # 90-day framework
TIMELINE_START = "T-60"  # 60 days before
TIMELINE_END = "T+30"    # 30 days after
