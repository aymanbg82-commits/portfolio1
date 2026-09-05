from pathlib import Path
import shutil

SOURCE = Path(r"C:\Users\ayman\OneDrive\Documents\AymanBaig-Resume.docx (1).pdf")
DEST = Path(__file__).resolve().parent / "resume.pdf"

if SOURCE.exists():
    shutil.copy2(SOURCE, DEST)
    print(f"Copied resume to {DEST}")
else:
    print(f"Resume source not found: {SOURCE}")
