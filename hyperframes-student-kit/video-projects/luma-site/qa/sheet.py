# usage: python3 qa/sheet.py <video> <out.jpg> [fps]  — contact sheet 1 image/s (or fps), 8 columns
import sys, subprocess, math, os, glob
from PIL import Image
vid, out = sys.argv[1], sys.argv[2]; fps = float(sys.argv[3]) if len(sys.argv) > 3 else 1
d = '/tmp/claude-0/-home-user-LUMA-WHATSAP/b4779134-fd59-5702-a6d1-f2582282b14c/scratchpad/sheet'; os.makedirs(d, exist_ok=True)
for f in glob.glob(d + '/*.jpg'): os.remove(f)
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', vid, '-vf', f'fps={fps},scale=480:-1', '-q:v', '4', d + '/f%04d.jpg'], check=True)
fr = sorted(glob.glob(d + '/f*.jpg')); cols = 8; rows = math.ceil(len(fr) / cols)
im0 = Image.open(fr[0]); w, h = im0.size
sheet = Image.new('RGB', (cols * w, rows * h), 'black')
for i, f in enumerate(fr): sheet.paste(Image.open(f), ((i % cols) * w, (i // cols) * h))
sheet.save(out, quality=78); print(out, sheet.size, len(fr), 'frames')
