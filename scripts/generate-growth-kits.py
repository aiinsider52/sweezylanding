"""Compatibility entry point for the shared information-only PDF renderer."""
import json
import sys
from generate_pdf_guides import build
for item in json.load(sys.stdin):
    build(item)
