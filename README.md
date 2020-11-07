# jasonbrazeal.com

Hi! My name is Jason Brazeal, and I’m a software engineer based in San Francisco, California. I write efficient, maintainable code and emphasize the importance of well-designed systems with modern, user-friendly interfaces.

This is my personal website that showcases some of my work and serves as an archive for my writing and code snippets.

# technology used

* sketch
* google fonts - raleway, inconsolata
* font-awesome icons
* react
* remarkable
* primsmjs
* d3.js
* webpack
* nodejs/npm
* python
* flask
* nginx
* letesencrypt
* docker/docker swarm
* ubuntu
* digital ocean

# development

```bash
# install required nodejs modules
npm install
# clean webpack build dir
npm run clean
# run webpack build (runs build.sh)
npm run build
# start webpack static server (dev only)
npm run start
npm run --prefix /path/to/project/folder start
# serve built static files with python (dev only) or nginx
cd build
python -m http.server 8888
# start flask server (dev only) or gunicorn
FLASK_DEBUG=1 FLASK_APP=/path/to/project/folder/project/app.py flask run --host=0.0.0.0 --port=5000
gunicorn app:app -b 0.0.0.0:5000 --log-level DEBUG # run from dir containing app.py
```

# deployment (Digital Ocean node running Docker):

```bash
# create docker node (assumes root has ssh access)
ssh root@<ipaddr>
rm -rf /etc/update-motd.d/99-one-click
apt-get update && apt-get upgrade -y
# keep already installed ssh config if it asks
ufw allow proto tcp from any to any port 80,443
update-alternatives --config editor
# select (3) vim.basic
adduser <user>
# enter info
usermod -aG sudo <user>
su <user> -
mkdir $HOME/.ssh
vi $HOME/.ssh/authorized_keys
# add id_rsa.mbp-json.pub
chmod 600 $HOME/.ssh/authorized_keys
exit
# test ssh login as <user>
vi /etc/ssh/sshd_config
# change yes to no --> PermitRootLogin no
# verify ssh login as root is notunsuccessful

# set up SSL certs using my letsencrypt-nginx image
# if already set up, scp to machine and fix symlinks (see letsencrypt-nginx README)

vi docker-compose.yml
# copy in contents, make sure hostname is correct
docker swarm init --listen-addr lo:2377 --advertise-addr lo:2377
openssl dhparam -out /etc/letsencrypt/live/<domain>/dhparam-2048.pem 2048
cat /etc/letsencrypt/live/<domain>/privkey.pem | docker secret create key -
cat /etc/letsencrypt/live/<domain>/fullchain.pem | docker secret create crt -
cat /etc/letsencrypt/live/<domain>/dhparam-2048.pem | docker secret create dh -
docker pull <repo>:nginx
docker pull <repo>:flask
docker stack deploy -c docker-compose.yml <stack>
```

# update SSL certs:

```bash
# after certs are renewed, must add new certs as docker secret:

docker stack rm <stack>
docker secret rm key
docker secret rm crt
docker secret rm dh

openssl dhparam -out /etc/letsencrypt/live/<domain>/dhparam-2048.pem 2048
cat /etc/letsencrypt/live/<domain>/privkey.pem | docker secret create key -
cat /etc/letsencrypt/live/<domain>/fullchain.pem | docker secret create crt -
cat /etc/letsencrypt/live/<domain>/dhparam-2048.pem | docker secret create dh -

docker stack deploy -c docker-compose.yml <stack>
```

# licensing

See LICENSE.md for the MIT license that covers this project and NOTICE.md for licenses of software included in this project. All other registered brand names and logos used on this website (schools, businesses, software, etc.) are trademarks of their respective companies and owners.
