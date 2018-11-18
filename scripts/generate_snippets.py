#!/usr/bin/env python

from pathlib import Path
import re
import sys


def main():
    snip_dir = Path(sys.argv[1]).expanduser()
    print(snip_dir)
    if not snip_dir.exists():
        raise RuntimeError(f'{snip_dir} does not exist.')
    with open('./snippets.js', 'w') as f:
        f.write('var exports = module.exports = {};')
        f.write('\n')
        f.write('\n')
        f.write('var snippets = {')
        f.write('\n')
        f.write('\n')
        snippet_files = [snip for snip in snip_dir.iterdir() if not snip.is_dir()]
        for s in snippet_files:
            contents = re.sub(r'`', r'\`', Path(s).read_text())
            f.write(f'  {Path(s).name}: {{title: "{Path(s).name}",')
            f.write('\n')
            f.write(f'{" " * (5 + len(Path(s).name))}content: `')
            f.write(f'{contents}`}},')
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
