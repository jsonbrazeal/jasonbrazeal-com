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
* favicons/icons generated here: https://realfavicongenerator.net/

# digital ocean setup:
* create docker one-click app/node $5/month, with ssh key
ssh root@<IPADDR>
rm -rf /etc/update-motd.d/99-one-click
apt-get update && apt-get upgrade -y
# update ssh config to package maintainer's default
ufw allow proto tcp from any to any port 80,443
adduser jsonbrazeal
# enter info
usermod -aG sudo jsonbrazeal
update-alternatives --config editor
# select (3) vim.basic
mkdir /home/jsonbrazeal/.ssh
vi /home/jsonbrazeal/.ssh/authorized_keys
# add id_rsa.mbp-json.pub
chmod 600 /home/jsonbrazeal/.ssh/authorized_keys
chown -R jsonbrazeal: /home/jsonbrazeal/.ssh
# test ssh login as jsonbrazeal
vi /etc/ssh/sshd_config
# change yes to no --> PermitRootLogin no

# set up SSL certs using my letsencrypt-nginx image
# if already set up, scp to machine and fix symlinks (see letsencrypt-nginx README)

vi docker-compose.yml
# copy in contents
docker swarm init --listen-addr lo:2377 --advertise-addr lo:2377
openssl dhparam -out /etc/letsencrypt/live/jason.ninja/dhparam-2048.pem 2048
cat /etc/letsencrypt/live/jason.ninja/privkey.pem | docker secret create key -
cat /etc/letsencrypt/live/jason.ninja/fullchain.pem | docker secret create crt -
cat /etc/letsencrypt/live/jason.ninja/dhparam-2048.pem | docker secret create dh -
docker login
docker pull jsonbrazeal/jasonbrazeal.com:nginx
docker pull jsonbrazeal/jasonbrazeal.com:flask
docker stack deploy -c docker-compose.yml jasonbrazeal_com
