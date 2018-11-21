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
python -m http.server 8888
# start flask server (dev only) or gunicorn
FLASK_DEBUG=1 FLASK_APP=/path/to/project/folder/project/app.py flask run --host=0.0.0.0 --port=5000
```

# license info

* some icons from here: https://fontawesome.com/license

# digital ocean setup:
* create docker one-click app/node $5/month, with ssh key
ssh root@<IPADDR>
rm -rf /etc/update-motd.d/99-one-click
apt-get update && apt-get upgrade
ufw allow proto tcp from any to any port 80,443
adduser jsonbrazeal
usermod -aG sudo jsonbrazeal
update-alternatives --config editor
# select (3) vim.basic
mkdir /home/jsonbrazeal/.ssh
vi /home/jsonbrazeal/.ssh/authorized_keys
# add id_rsa.mbp-json.pub
chmod 600 /home/jsonbrazeal/.ssh/authorized_keys
chown -R jsonbrazeal: .ssh
# test ssh login as jsonbrazeal
vi /etc/ssh/sshd_config
# change yes to no --> PermitRootLogin no
