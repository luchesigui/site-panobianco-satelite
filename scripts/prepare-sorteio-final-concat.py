from pathlib import Path
import re

frames_dir = Path("artifacts/sorteio/frames-2026-08-06T19-33-32-551Z")
original = (frames_dir / "frames.txt").read_text()
files = re.findall(r"file '([^']+)'", original)
if not files:
    raise SystemExit("No frames found")
final_concat = frames_dir / "frames-final.txt"
final_concat.write_text(
    f"file '{files[0]}'\nduration 3.000000\n"
    + original
    + f"file '{files[-1]}'\nduration 3.000000\nfile '{files[-1]}'\n"
)
print(final_concat)
