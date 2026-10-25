"""Check every PDF against exported editorial content and published previews."""
import json
import subprocess
from pathlib import Path
import fitz
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
guides = json.loads(subprocess.check_output(['node', 'scripts/export-pdf-guides.cjs'], cwd=ROOT))
assert len(guides) == 21
pages = 0
for guide in guides:
    file = ROOT / 'public/downloads' / guide['filename']
    with fitz.open(file) as doc:
        expected = 10 if guide['id'] == 'travel-kit' else 2 + (len(guide['sections'])+1)//2
        assert len(doc) == expected, file
        assert not doc.is_form_pdf, (file, 'PDF contains a form')
        fulltext = ' '.join(' '.join(page.get_text() for page in doc).split())
        assert not any(char in fulltext for char in ['☐', '☑', '□', '�']), file
        assert len(fulltext) > 2200, (file, 'Too little useful text')
        uris = {link.get('uri') for page in doc for link in page.get_links()}
        assert guide['guide'] in uris, file
        for source in guide['sources']:
            assert source['url'] in uris, (file, source)
        for section in guide['sections']:
            assert ' '.join(section['body'].split()) in fulltext, (file, 'Dropped or truncated paragraph')
        for place in guide.get('places', []):
            assert ' '.join(place['description'].split()) in fulltext, (file, place['slug'])
            assert ' '.join(place['arrival'].split()) in fulltext, (file, 'Missing transport')
        for page in doc:
            assert not list(page.widgets() or []), file
            for block in page.get_text('blocks'):
                assert 0 <= block[0] < block[2] <= page.rect.width+1 and 0 <= block[1] < block[3] <= page.rect.height+1, (file, block)
        pages += len(doc)
    with Image.open(ROOT / f'public/downloads/sweezy-{guide["id"]}-cover-{guide["locale"]}.webp') as preview:
        assert preview.size == (714, 1010)
    assert file.stat().st_size < 2_000_000, (file, 'Download exceeds size budget')
print(f'PASS: 21 PDFs, {pages} pages, no forms/checkboxes, complete prose, source links, correct previews, all files below 2 MB')
