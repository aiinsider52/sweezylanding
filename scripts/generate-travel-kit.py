"""Rebuild travel PDFs using the shared editorial renderer."""
import json
import subprocess
from generate_pdf_guides import ROOT, build
data = json.loads(subprocess.check_output(["node", "scripts/export-pdf-guides.cjs"], cwd=ROOT))
for item in data:
    if item["id"] == "travel-kit":
        build(item)
