# notes

```bash
# install required nodejs modules
npm install
# clean webpack build dir
npm run clean
# run webpack build
npm run build
# start webpack static server (dev only)
npm run start
npm run --prefix /path/to/project/folder start
# serve built static files with python (dev only) or nginx
cd build
python -m http.server
# start flask server (dev only) or gunicorn
FLASK_DEBUG=1 FLASK_APP=/path/to/project/folder/project/app.py flask run
```

