#!/usr/bin/env python

from pathlib import Path
import re
import sys


def main():
    PROJECT_DIR = Path(__file__).resolve().parent.parent
    OUTPUT_FILE = PROJECT_DIR / 'jasonbrazeal_com' / 'ui' / 'js' / 'snippets.js'
    SNIP_DIR = Path(sys.argv[1]).expanduser()
    if SNIP_DIR.exists():
      print(f'writing snippets from {SNIP_DIR} to {OUTPUT_FILE}')
    else:
        raise RuntimeError(f'{SNIP_DIR} does not exist.')
    with open(OUTPUT_FILE, 'w') as f:
        f.write('var exports = module.exports = {};')
        f.write('\n')
        f.write('\n')
        f.write('var snippets = {')
        f.write('\n')
        f.write('\n')
        snippet_files = [snip for snip in SNIP_DIR.iterdir() if not snip.is_dir()]
        for s in snippet_files:
            contents = re.sub(r'`', r'\`', Path(s).read_text())
            lines = contents.split('\n')
            contents_minus_title = '\n'.join(lines[1:])
            match = re.match(r'^\w*#\w*.*$', lines[0])
            if match:
              title = match.group().strip('#').strip()
            else:
              title = Path(s).name
            f.write(f'  {Path(s).name}: {{title: "{title}",')
            f.write('\n')
            f.write(f'{" " * (5 + len(Path(s).name))}content: `')
            f.write(f'{contents_minus_title}`}},')
            f.write('\n')
            f.write('\n')
        f.write('}')
        f.write('\n')
        f.write('''
module.exports = {
  snippets: snippets
};''')


if __name__ == "__main__":
    main()
