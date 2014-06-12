import json

from fabric.api import task, sudo, env, local, run, put,cd, prefix, hosts, lcd, execute, path, settings, with_settings
from fabric.contrib.files import sed, append

from fabtools.vagrant import vagrant # allows us to use any of these tasks on a vagrant vm with the command fab vagrant task_name

USER_NAME = 'jsonbrazeal'
SSH_PORT = '4217'
SSH_KEY_FILE = '/Users/jsonbrazeal/.ssh/id_rsa.pub'
SECRETS_DMG = '/Users/jsonbrazeal/Dropbox/Credentials/jasonbrazeal.com.dmg'
SERVER_ADMIN = 'jsonbrazeal@gmail.com'
PROJECT_ROOT = '/opt/jasonbrazeal.com'
WEB_ROOT = '/opt/jasonbrazeal.com/web'
REPO_URL = 'https://github.com/jsonbrazeal/jasonbrazeal-com.git'
BLOG_REPO_URL = 'https://github.com/jsonbrazeal/jasonbrazeal-com-blog.git'

############################# Environment Setters #############################

@task
def dev():
    env.user = USER_NAME
    env.hosts = ['162.243.39.189:' + SSH_PORT]
    env.hostname = 'dev.jasonbrazeal.com'

@task
def web1():
    env.user = USER_NAME
    env.hosts = [':' + SSH_PORT]
    env.hostname = 'web1.jasonbrazeal.com'

############################ All-in-One Functions ############################

@task
def new_server():
    # execute(provision_do)
    execute(setup_git_do)
    execute(setup_mysql)
    execute(run_db_script, script='conf/init.sql')
    execute(run_db_script, script='conf/blog.bak.sql')

########################### Provisioning Functions ###########################

@task
@with_settings(user='root')
def provision_do():
    '''Sets up clean CentOS VPS on Digital Ocean. Host (standard ssh port) must be specified on command line with the config function, e.g. `fab dev provision_do:host=162.243.39.189`
    '''

    # get credentials
    SECRETS = get_secrets()

    # update os and install packages
    sudo('yum -y update', shell=False)
    for package in ['policycoreutils-python', 'httpd', 'php', 'php-mysql', 'php-xml', 'wget', 'nano', 'mysql-server', 'git']:
        install_package(package)

    # configure git
    sudo('git config --global user.name "Jason Brazeal"')
    sudo('git config --global user.email jsonbrazeal@gmail.com')

    # configure apache
    local("sed -e 's/<SERVER_NAME>/" + env.hostname + "/g' -e 's/<SERVER_ADMIN>/" + SERVER_ADMIN + "/g' conf/template.vm_centos.httpd.conf > conf/httpd.conf")
    put('conf/httpd.conf', '/etc/httpd/conf/httpd.conf', use_sudo=True)
    # disable welcome page
    sudo('mv /etc/httpd/conf.d/welcome.conf /etc/httpd/conf.d/welcome.conf.off')
    # configure php
    sed('/etc/ssh/sshd_config','expose_php = On','expose_php = Off', use_sudo=True)

    # set up swap file
    sudo('dd if=/dev/zero of=/swapfile bs=1024 count=512k')
    sudo('mkswap /swapfile')
    sudo('swapon /swapfile')
    append('/etc/fstab', '/swapfile       none    swap    sw      0       0', use_sudo=True)
    sudo('chown root:root /swapfile ')
    sudo('chmod 0600 /swapfile')
    sudo('sysctl vm.swappiness=10')
    append('/etc/sysctl.conf', 'vm.swappiness=10', use_sudo=True)

    # set up firewall rules
    # flush rules
    sudo('iptables -F')
    # block null packets
    sudo('iptables -A INPUT -p tcp --tcp-flags ALL NONE -j DROP')
    # prevent syn-flood attacks
    sudo('iptables -A INPUT -p tcp ! --syn -m state --state NEW -j DROP')
    # drop christmas tree packets
    sudo('iptables -A INPUT -p tcp --tcp-flags ALL ALL -j DROP')
    # localhost
    sudo('iptables -A INPUT -i lo -j ACCEPT')
    # SSH
    sudo('iptables -A INPUT -p tcp -m tcp --dport ' + SSH_PORT + ' -j ACCEPT')
    # web server
    sudo('iptables -A INPUT -p tcp -m tcp --dport 80 -j ACCEPT')
    sudo('iptables -A INPUT -p tcp -m tcp --dport 443 -j ACCEPT')
    # # SMTP
    # sudo('iptables -A INPUT -p tcp -m tcp --dport 25 -j ACCEPT')
    # sudo('iptables -A INPUT -p tcp -m tcp --dport 465 -j ACCEPT')
    # # POP3
    # sudo('iptables -A INPUT -p tcp -m tcp --dport 110 -j ACCEPT')
    # sudo('iptables -A INPUT -p tcp -m tcp --dport 995 -j ACCEPT')
    # # IMAP
    # sudo('iptables -A INPUT -p tcp -m tcp --dport 143 -j ACCEPT')
    # sudo('iptables -A INPUT -p tcp -m tcp --dport 993 -j ACCEPT')
    # accept packets belonging to established and related connections
    sudo('iptables -I INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT')
    # drop everything else
    sudo('iptables -P INPUT DROP')
    # allow all outgoing packets
    sudo('iptables -P OUTPUT ACCEPT')
    # disallow packet forwarding
    sudo('iptables -P FORWARD DROP')
    # save settings (they will persist on reboot)
    sudo('iptables-save | sudo tee /etc/sysconfig/iptables')
    sudo('service iptables restart')

    # disable postfix email service (daemon listens on port 25 by default)
    sudo('/sbin/chkconfig postfix off')

    # create non-root user
    sudo('adduser ' + USER_NAME)
    with settings(prompts = {'New password: ': SECRETS['server_password'],
                            'Retype new password: ': SECRETS['server_password']}):
        sudo('passwd ' + USER_NAME)
    sudo('echo -e "\n' + USER_NAME + '\tALL=(ALL)\tALL" >> /etc/sudoers')

    put('conf/.bashrc', '/home/' + USER_NAME, mode=0754, use_sudo=True)
    sudo('chown ' + USER_NAME + ' /home/' + USER_NAME + '/.bashrc')
    sudo('chgrp ' + USER_NAME + ' /home/' + USER_NAME + '/.bashrc')

    # set up ssh keys
    sudo('mkdir /home/' + USER_NAME + '/.ssh')
    sudo('chown ' + USER_NAME + ' /home/' + USER_NAME + '/.ssh')
    sudo('chgrp ' + USER_NAME + ' /home/' + USER_NAME + '/.ssh')

    put(SSH_KEY_FILE, '/tmp/id_rsa.pub', use_sudo=True)
    sudo('cat /tmp/id_rsa.pub > /home/' + USER_NAME + '/.ssh/authorized_keys')
    sudo('chown ' + USER_NAME + ' /home/' + USER_NAME + '/.ssh/authorized_keys')
    sudo('chgrp ' + USER_NAME + ' /home/' + USER_NAME + '/.ssh/authorized_keys')
    sudo('rm /tmp/id_rsa.pub')
    sudo('chmod 700 /home/' + USER_NAME + '/.ssh')
    sudo('chmod 600 /home/' + USER_NAME + '/.ssh/authorized_keys')
    sudo('restorecon -Rv /home/' + USER_NAME + '/.ssh')

    # templatize sshd_config and copy to /etc/ssh/sshd_config (this will disallow root login)
    local("sed -e 's/<SSH_PORT>/" + SSH_PORT + "/g' -e 's/<USER_NAME>/" + USER_NAME + "/g' conf/template.sshd_config > conf/sshd_config")
    put('conf/sshd_config', '/etc/ssh/sshd_config', use_sudo=True)
    sudo('semanage port -a -t ssh_port_t -p tcp ' + SSH_PORT) # requires policycoreutils-python package
    sudo('service sshd reload')

    sudo('mkdir -p ' + PROJECT_ROOT)

@task
def setup_git_do(wp_name='blog'):
    '''Configures Git and checks out master of 'web' directory and Wordpress blog theme.
    '''
    with cd(PROJECT_ROOT):
        sudo('git init')
        sudo('git remote add -f origin ' + REPO_URL)
        sudo('git config core.sparsecheckout true')
        sudo('echo web/ >> .git/info/sparse-checkout')
        sudo('git checkout master')
    THEME_ROOT = WEB_ROOT + '/' + wp_name + '/wp-content/themes/jasonbrazeal-com-blog'
    with cd(THEME_ROOT):
        # sudo('git init')
        sudo('git remote add -f origin ' + BLOG_REPO_URL)
        sudo('git checkout master')

@task
def setup_mysql():
    '''Installs MySQL database.
    '''
    # get credentials
    SECRETS = get_secrets()
    if not SECRETS:
        sys.exit()

    # The prompts dictionary is supported beginning in Fabric 1.8.1
    # Run `pip install https://github.com/fabric/fabric/zipball/master` to pull down the latest version
    # The function works fine with earlier version, but you have to respond to the prompts manually
    with settings(prompts = {
                             'Enter current password for root (enter for none): ': '',
                             'Set root password? [Y/n] ': 'Y',
                             'New password: ': SECRETS.get('db_root_password', ''),
                             'Re-enter new password: ': SECRETS.get('db_root_password', ''),
                             'Remove anonymous users? [Y/n] ': 'Y',
                             'Disallow root login remotely? [Y/n] ': 'Y',
                             'Remove test database and access to it? [Y/n] ': 'Y',
                             'Reload privilege tables now? [Y/n] ': 'Y'
                             }):
        sudo('/sbin/service mysqld start')
        sudo('/usr/bin/mysql_secure_installation')
    sudo('/sbin/chkconfig mysqld on')
    sudo('/sbin/service mysqld start')

@task
def run_db_script(script='conf/init.sql'):
    '''Puts the script given on the server and runs it as root. Defaults to the init script, but a db dump file can be used to restore the db (e.g. conf/blog.bak.sql)
    '''
    put(script, '/tmp/tmp.sql', use_sudo=True)

    # replace database credentials in init.sql
    sed('/tmp/tmp.sql', 'db_name', SECRETS.get('db_name', ''), use_sudo=True)
    sed('/tmp/tmp.sql', 'db_user', SECRETS.get('db_user', ''), use_sudo=True)
    sed('/tmp/tmp.sql', 'db_password', SECRETS.get('db_password', ''), use_sudo=True)
    sed('/tmp/tmp.sql', 'db_host', SECRETS.get('db_host', ''), use_sudo=True)

    # run script
    with settings(prompts = {
                             'Enter password: ': SECRETS.get('db_root_password', '')
                             }):
        sudo('/usr/bin/mysql -vvv --show-warnings -h ' + SECRETS.get('db_host', '') + ' -u root -p < /tmp/tmp.sql')
    sudo('rm /tmp/tmp.sql')

@task
def provision_vagrant(project):
    '''Sets up a development machine from a clean CentOS install on a Vagrant-managed VM.
    '''
    run('chmod ugo+x /home/vagrant')
    put('conf/.bashrc', '/home/vagrant', use_sudo=True)
    sudo('rm /root/.bashrc')
    sudo('ln -s /home/vagrant/.bashrc /root/.bashrc')
    put('conf/yum.conf', '/etc', use_sudo=True)
    sudo('echo -e "\nMatch User vagrant\n\tAllowAgentForwarding yes" >> /etc/ssh/sshd_config')

    # install more yum repos
    # sudo('rpm -Uvh http://packages.sw.be/rpmforge-release/rpmforge-release-0.5.3-1.el6.rf.x86_64.rpm')
    # sudo('rpm -Uvh http://download.fedoraproject.org/pub/epel/6/x86_64/epel-release-6-8.noarch.rpm')
    # sudo('rpm -Uvh http://rpms.famillecollet.com/enterprise/remi-release-6.rpm')
    # sudo('rpm -Uvh http://centos.alt.ru/repository/centos/6/x86_64/centalt-release-6-1.noarch.rpm')
    sudo('rpm -Uvh http://repo.webtatic.com/yum/el6/latest.rpm', warn_only=True)

    # install packages
    sudo('yum -y update', shell=False)
    sudo('yum -y groupinstall development')
    for package in ['openssl-devel', 'sqlite-devel', 'bzip2-devel', 'httpd', 'mod_wsgi', 'php', 'php-mysql', 'php-xml', 'wget', 'nano', 'mysql-server']:
        install_package(package)

    # configure apache
    put('conf/template.vm_centos.httpd.conf', '/etc/httpd/conf/httpd.conf', use_sudo=True)

    # make project folder
    sudo('mkdir /opt/' + project)

@task
def setup_git_vagrant(project):
    '''Sets up Git on a local Vagrant VM for development.
    '''
    with cd('/opt/' + project):
        sudo('git config --global user.name "Jason Brazeal"')
        sudo('git config --global user.email jsonbrazeal@gmail.com')
        # if the repo already exists we only need to run `git clone`, not the rest of this
        sudo('git init')
        sudo('git add .')
        sudo("git commit -am 'initial commit'")
        sudo('git remote add origin ' + REPO_URL)
        sudo('git push origin master')

############################# Wordpress Functions #############################

@task
# must escape certain characters in passwords with two backslashes: &, $ (or avoid them!)
def new_wp(wp_name="wordpress"):
    '''Downloads and installs Wordpress.
    '''
    WP_HOME = WEB_ROOT + wp_name

    sudo('mkdir -p ' + WP_HOME, warn_only=True)

    # get wordpress source
    with cd('/usr/local/src'):
        sudo('wget http://wordpress.org/latest.tar.gz')
        sudo('tar -xzvf latest.tar.gz')
        sudo('mv wordpress/* ' + WP_HOME)

    execute(setup_wp_configs)
    execute(setup_mysql)
    execute(start_apache)
    execute(start_mysqld)
    # also need to change AllowOverride None to AllowOverride All in <Directory "/var/www/html"> section of httpd.conf (or wherever WP is served from)

@task
def setup_wp_configs():
    '''Configures Wordpress installation.
    '''
    # create /tmp/wp_config by deleting default lines for auth keys and such that we don't need
    CONFIG_SAMPLE = WP_HOME + '/wp-config-sample.php'
    CONFIG = WP_HOME + '/wp-config.php'
    sudo('grep -vwE "(AUTH_KEY|SECURE_AUTH_KEY|LOGGED_IN_KEY|NONCE_KEY|AUTH_SALT|SECURE_AUTH_SALT|LOGGED_IN_SALT|NONCE_SALT)" ' + CONFIG_SAMPLE + ' > /tmp/wp_config')

    # get random secret keys from wordpress, add them to /tmp/wp_config, and copy them to CONFIG
    sudo('wget https://api.wordpress.org/secret-key/1.1/salt/ -O /tmp/wp_secrets')
    sudo(r'csplit -f wp /tmp/wp_config "/\*\*#@-\*/"')
    sudo('cat wp00 /tmp/wp_secrets wp01  >> ' + CONFIG)

    # sudo('echo "?>" >> ' + CONFIG)
    sudo('rm /tmp/wp_*')

    # get credentials
    SECRETS = get_secrets()
    if not SECRETS:
        print('Please update wp-config.php manually to set up database.')

    # replace database credentials
    sed(WP_HOME + '/wp-config.php', 'db_name', SECRETS.get('db_name', ''), use_sudo=True)
    sed(WP_HOME + '/wp-config.php', 'db_user', SECRETS.get('db_user', ''), use_sudo=True)
    sed(WP_HOME + '/wp-config.php', 'db_password', SECRETS.get('db_password', ''), use_sudo=True)
    sed(WP_HOME + '/wp-config.php', 'localhost', SECRETS.get('db_host', ''), use_sudo=True)
    sed(WP_HOME + '/wp-config.php', 'wp_', wp_name + '_', use_sudo=True)

    # clean up after sed
    sudo('rm ' + WP_HOME + '/wp-config.php.bak')

############################ Deployment Functions ############################

# @task
# def deploy_do(tag="master"):
#     with cd(WEB_ROOT):
#         sudo('git checkout ' + tag)
#     execute(setup_wp_configs)

# @task
# def deploy_wp_do(tag="master"):
#     with cd(WEB_ROOT + '/blog/wp-content/themes/jasonbrazeal-com-blog'):
#         sudo('git checkout ' + tag)

############################ Maintenance Functions ############################

@task
def restart_apache():
    sudo('/sbin/chkconfig httpd on', shell=False)
    sudo('/sbin/service httpd restart', shell=False)

@task
def start_apache():
    sudo('/sbin/chkconfig httpd on', shell=False)
    sudo('/sbin/service httpd start', shell=False)

@task
def stop_apache():
    sudo('/sbin/service httpd stop', shell=False)

@task
def start_mysqld():
    sudo('/sbin/chkconfig mysqld on', shell=False)
    sudo('/sbin/service mysqld start', shell=False)

@task
def stop_mysqld():
    sudo('/sbin/service mysqld stop', shell=False)

@task
def backup_mysql():
    execute(stop_mysqld)
    with cd('/Users/vagrant'):
        sudo('mysqldump --add-drop-table -h localhost -u root -p wpdb | bzip2 -c > blog.bak.sql.bz2')
        sudo('mv blog.bak.sql.bz2 /opt/jasonbrazeal.com/db_backup/blog.bak.sql.bz2')

@task
def reset_httpd_conf_vm():
    put('conf/default_centos.httpd.conf', '/etc/httpd/conf/httpd.conf', use_sudo=True)

############################## Helper Functions ##############################

def install_package(name, option=''):
    sudo('yum -y ' + option + ' install ' + name, shell=False)

# use fabric's sed command to run sed remotely
def replace_in_file(file_name, old, new):
    old = _escape_string_for_sed(old)
    new = _escape_string_for_sed(new)
    sudo('sed -i \'s/' + old + '/' + new+ ' /g\' ' + file_name, shell=False)

def _escape_string_for_sed(str):
    return str.replace('/', '\\/').replace('\'', '\'"\'"\'')

def get_secrets():
    try:
        local('hdiutil attach -stdinpass -mountpoint "$PWD/secrets" ' + SECRETS_DMG)
        with open('secrets/secrets.json') as file:
            return json.load(file)
    except:
        print('Secrets file unavailable. Could not open ' + SECRETS_DMG)
        return None
    finally:
        local('hdiutil detach "$PWD/secrets"')

############################# Webfaction Scripts #############################

@hosts('jason379@web388.webfaction.com')
@task
def start_apache_wf(webapp):
    run('/home/jason379/webapps/' + webapp + '/apache2/bin/start')

@hosts('jason379@web388.webfaction.com')
@task
def stop_apache_wf(webapp):
    run('/home/jason379/webapps/' + webapp + '/apache2/bin/stop')

@hosts('jason379@web388.webfaction.com')
@task
def restart_apache_wf(webapp):
    run('/home/jason379/webapps/' + webapp + '/apache2/bin/restart')


@hosts('jason379@web388.webfaction.com')
@task
def new_git_repo_wf(repo):
    '''Creates new repo at git.DOMAIN'''
    with cd('/home/jason379/webapps/git/repos'):
        run('git init --bare ' + repo + '.git')
    with cd('/home/jason379/webapps/git/repos/' + repo + '.git'):
        run('git config http.receivepack true') # enable http push
        run('git config http.postBuffer 524288000') # set max push size to 500MB
        run('echo ' + repo + ' > description') # set description shown in git web app

@hosts('jason379@web388.webfaction.com')
@task
def deploy_wf(webapp, tag=None):
    '''Deploys the latest commit if no tag given to Webfaction.
    '''
    with cd('/home/jason379/webapps/' + webapp):
        run('git pull origin master')
        if tag != None:
            run('git checkout ' + tag)
    execute(start_apache_wf, webapp)
