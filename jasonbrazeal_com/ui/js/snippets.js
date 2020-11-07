var exports = module.exports = {};

var snippets = {

  hdiutil: {title: "hdiutil - dmg management",
            content: `
\`\`\`bash
# create encrypted dmg
hdiutil create <diskName> -encryption -stdinpass -volname <diskName> -fs JHFS+ -type SPARSEBUNDLE -size 1t

# another way to create encrypted dmg
export DISKNAME=''
hdiutil create $DISKNAME -encryption AES-256 -stdinpass -volname $DISKNAME -fs 'Case-sensitive Journaled HFS+' -type SPARSEBUNDLE -size 1t

# mount it from command line
hdiutil attach $DISKNAME -encryption -stdinpass

# can also pass in password through stdin
echo -n $PASSWD | hdiutil create ~/Desktop/$DISKNAME -encryption AES-256 -stdinpass -volname $DISKNAME -fs 'Case-sensitive Journaled HFS+' -type SPARSEBUNDLE -size 1t

# note: encrypted DMGs are great for sharing secret data through email or other means, but a bad idea for file syncing services
`},

  pyenv: {title: "pyenv",
          content: `
\`\`\`bash
# install pyenv and pyenv-virtualenv
brew install pyenv pyenv-virtualenv
# add this to shell profile (~/.profile in my case)
eval "$(pyenv init -)"
eval "$(pyenv virtualenv-init -)"
# see all versions
pyenv versions
# see current version
pyenv version
# set global version in ~/.pyenv/version...This version can be overridden by an application (dir)-specific .python-version file, or by setting the PYENV_VERSION environment variable
pyenv global 3.7.1
# set version for that dir (and containing dirs unless a different versions is specified in those…saves this info in .python-version…this can be overridden by setting the PYENV_VERSION environment variable directly or with pyenv shell X.X.X
pyenv local 3.7.1
# unset local python version
pyenv local --unset
# install python 3.7.1 to ~/.pyenv/versions, where all pyenv installs go
pyenv install 3.7.1
# install with Framework support on MacOS (analogous to enabling shared library support on Linux) - required for some tools like pyinstaller:
CFLAGS="-I$(brew --prefix openssl)/include" \
LDFLAGS="-L$(brew --prefix openssl)/lib" \
env PYTHON_CONFIGURE_OPTS="--enable-framework" pyenv install 3.7.1
# configures shims with version info - RUN THIS AFTER INSTALLING NEW VERSION
pyenv rehash
# see available versions
pyenv install  --list
# uninstall python 3.7.1 to ~/.pyenv/versions...rm -rf does the same
pyenv uninstall 3.7.1
# return path to executable
pyenv which python
# return value of PYENV_VERSION
pyenv shell
# set shell-specific version of python by setting PYENV_VERSION
pyenv shell pypy-1.9
# unset shell-specific version of python
pyenv shell --unset

# how pyenv decides python version to use:
# PYENV_VERSION environmental var
# local version in .python-version in current dir
# local .python-version in a parent dir all the way to root
# global version in ~/.pyenv/version

# create a virtualenv based on Python 2.7.5 under ~/.pyenv/versions (alongside the pyenv python installations) in a folder called virtual-env-name…if no Python version is given, the current version will be used (pyenv version)
pyenv virtualenv 2.7.5 virtual-env-name

# list existing virtualenvs
pyenv virtualenvs

# activate virtualenv
pyenv virtualenv envName

# deactivate virtualenv
pyenv dectivate
\`\`\`

* How to build CPython with Framework support on MacOS

Some of 3rd party tool like [PyInstaller](https://github.com/pyinstaller/pyinstaller) might require CPython installation built with \`--enable-framework\` (MacOS) or \`--enable-shared\` (Linux).

\`\`\`bash
env PYTHON_CONFIGURE_OPTS="--enable-framework" pyenv install 3.5.0
\`\`\`

\`\`\`bash
env PYTHON_CONFIGURE_OPTS="--enable-shared" pyenv install 3.5.0
\`\`\`

* Linux Notes

Since pyenv (precisely, python-build) will build CPython with configuring RPATH, you don't have to set \`LD_LIBRARY_PATH\` to specify library path on GNU/Linux.

* MacOS Notes

if you get this error: \`zipimport.ZipImportError: can't decompress data; zlib not available\`, run \`xcode-select --install\`

if you get this error: \`ERROR: The Python ssl extension was not compiled. Missing the OpenSSL lib?\`, prefix your install command with this:

\`\`\`
CFLAGS="-I$(brew --prefix openssl)/include" \
LDFLAGS="-L$(brew --prefix openssl)/lib" \
\`\`\`
`},

  mysqlUsers: {title: "MySQL Users",
               content: `
\`\`\`bash
# login as root or other user with sufficient privileges
mysql -h localhost -P 3306 -u root -p

# create new user
CREATE USER username@localhost IDENTIFIED BY 'password';

# give new user privileges
# all privileges, all databases, ability to grant further privileges
GRANT ALL ON *.* TO username@localhost WITH GRANT OPTION;

# some privileges, all databases
GRANT INSERT, DELETE, UPDATE ON *.* TO username@localhost;

# all privileges, one database called "db"
GRANT ALL ON db.* TO username@localhost;

# all privileges, one database called "db", one table called "tb"
GRANT ALL ON db.tb TO username@localhost;

# see which privileges a user has been granted
SHOW GRANTS FOR username@localhost;

# see all possible privileges you can grant
SHOW PRIVILEGES;
\`\`\`
`},

  s3: {title: "AWS S3",
       content: `
\`\`\`python
import os
import io

import boto3


def write_s3(bucket, file_name, bytes_to_write):
    client = boto3.client('s3',
                          aws_access_key_id=os.environ['AWS_ACCESS_ID'],
                          aws_secret_access_key=os.environ['AWS_ACCESS_KEY'])
    client.put_object(Bucket=bucket, Key=file_name, Body=bytes_to_write)


def read_file_from_s3(bucket, file_name, file_path):
    client = boto3.client('s3',
                          aws_access_key_id=os.environ['AWS_ACCESS_ID'],
                          aws_secret_access_key=os.environ['AWS_ACCESS_KEY'])
    client.download_file(bucket, file_name, file_path)


def read_bytes_from_s3(bucket, file_name):
    client = boto3.client('s3',
                          aws_access_key_id=os.environ['AWS_ACCESS_ID'],
                          aws_secret_access_key=os.environ['AWS_ACCESS_KEY'])
    bytes_io = io.BytesIO()
    client.download_fileobj(bucket, file_name, bytes_io)

    return bytes_io.getvalue()
\`\`\`
`},

  catt: {title: "Command Line Syntax Highlighting",
         content: `
* install the Python syntax highlighter [Pygments](http://pygments.org/)

\`\`\`bash
pip install python-pygments
\`\`\`

* choose an alias and assign the pygmentize command to it, customizing the style however you'd like

\`\`\`bash
alias catt='pygmentize -O style=monokai -f console256 -g'
\`\`\`

* add the alias line to your bash startup file (.bashrc, for example) to have it available every time you log on

\`\`\`bash
catt /path/to/file
\`\`\`
`},

  docker: {title: "docker",
           content: `
* containers and images

\`\`\`bash
# Execute image
docker run <imageNameId>

# List images
docker image ls

# List containers (running)
docker container ls

# List containers (all in quiet mode, IDs only)
docker container ls -aq

# Gracefully stop the specified container
docker stop <containerNameId>
docker container stop <containerNameId>

# Gracefully stop all running containers
docker stop $(docker ps -aq)

# Force shutdown of the specified container
docker kill <containerNameId>
docker container kill <containerNameId>

# Remove specified container
docker rm <containerNameId>
docker container rm <containerNameId>

# Force remove specified container
docker rm -f <containerNameId>

# Remove all containers
docker rm $(docker ps -aq)
docker container rm $(docker container ls -aq)

# Remove specified image
docker image rm <imageNameId>

# Remove all images
docker image rm $(docker image ls -aq)
docker rmi $(docker images -q)
docker image prune -a

# attach this terminal's stdin, stdout, and stderr to container
docker attach <containerNameId>
# detach the tty without exiting the shell, use the escape sequence Ctrl+p + Ctrl+q

# get logs
docker container logs <containerNameId>

# tail logs
docker container logs <containerNameId> -f

# see processes
docker container top <containerNameId>

# Create imagesing this directory's Dockerfile and tag
docker build -t username/repository:tag  .

# Run container from image mapping port 4000 to 80
docker run -p 4000:80 <imageNameId>

# Same thing, but in detached mode
docker run -d -p 4000:80 <imageNameId>

# Same thing, but in interactive mode, and start up bash shell
docker run -ti -p 4000:80 <imageNameId> /bin/bash

# Start shell in running container in interactive mode
docker exec -it <containerNameId> /bin/bash

# Log in this CLI session using your Docker credentials
docker login

# Tag <imageNameId> for upload to registry
docker tag <imageNameId> username/repository:tag

# Upload tagged image to registry
docker push username/repository:tag

# Download tagged image to registry
docker pull username/repository:tag

# Run image from a registry
docker run username/repository:tag
\`\`\`

* services and swarms

\`\`\`bash
# Create swarm and act as manager
docker swarm init

# List stacks or apps
docker stack ls

# Run the specified Compose file
docker stack deploy -c <composefile> <appname>

# required when container is in private repository
docker stack deploy --with-registry-auth -c <composefile> <appname>

# Tear down an application
docker stack rm <appname>

# Take down a single node swarm from the manager
docker swarm leave --force

# List running services associated with an app
docker service ls

# List tasks associated with an app
docker service ps <service>

# Inspect task or container
docker inspect <task or container>
\`\`\`

* volumes

\`\`\`bash
# create a volume
docker volume create <volume>

# inspect a volume
docker volume inspect <volume>

# list volumes
docker volume ls

# remove a volume
docker volume rm <volume>

# run a container with a volume attached
docker run -d --name devtest -v <volume>:/<mountPoint> username/repository:tag
docker run -ti --name devtest -v <volume>:/<mountPoint> username/repository:tag /bin/bash

# remove unused volumes
docker volume prune
\`\`\`

* networking

\`\`\`bash
# view networks
docker network ls

# view default network info (container IP addresses, etc.)
docker network inspect bridge

# create user-defined network (automatic DNS resolution between containers)
docker network create --driver bridge <network>

# create container connected to <network>
docker run -dit --name alpine1 --network <network> alpine ash

# connect container to network
docker network connect <network> <container>

# disconnect container from network
docker network disconnect <network> <container>

# remove network
docker network rm <network>

# remove unused networks
docker network prune
\`\`\`

* secrets

\`\`\`bash
# create a secret
echo <secret> | docker secret create <secretName> -

# list secrets
docker secret ls

# inspect a secret
docker secret inspect

# remove a secret
docker secret rm
\`\`\`

* docker for macos

\`\`\`bash
# attach to Docker for Mac VM
screen ~/Library/Containers/com.docker.docker/Data/vms/0/tty

# then you can see volumes
ls -lah /var/lib/docker/volumes
\`\`\`

* bash completion on macos

\`\`\`bash
cd /usr/local/etc/bash_completion.d
ln -s /Applications/Docker.app/Contents/Resources/etc/docker.bash-completion
ln -s /Applications/Docker.app/Contents/Resources/etc/docker-machine.bash-completion
ln -s /Applications/Docker.app/Contents/Resources/etc/docker-compose.bash-completion
\`\`\`

* source: [docs.docker.com](https://docs.docker.com/)
`},

  inspect: {title: "Python inspect",
            content: `
\`\`\`python
import inspect

# get name of currently running function
print(inspect.currentframe().f_code.co_name)

# get currently running function’s local vars
print(inspect.currentframe().f_code.co_varnames) 

# get number of args a currently running function takes
print(inspect.currentframe().f_code.co_argcount) 

# get name of calling function
print(inspect.currentframe(1).f_code.co_name)

# get recursion depth
print(len(inspect.getouterframes(inspect.currentframe())))

# get source code
print(inspect.getsource(package.subpackage.module))
\`\`\`
`},

  trees: {title: "Trees",
          content: `
* recursive, nonlinear data structure composed of linked nodes that simulates a hierarchical tree structure, with a root node and subtrees of children each having one parent node
* can be described as special type of graph: connected acyclic rooted graph
* any data type may be associated with each node (attribute often called key, value, name, payload, cargo, etc.)
* nodes may or may not have links to parent
* leaf node = node with no children

## types of trees

* binary tree - tree whose nodes have 2 or fewer children
* binary search tree - binary tree ordered such that each node's value is greater than all values in its left subtree and less than all values in its right subtree; if a binary search tree can have duplicate values, they are often in the left subtree (left <= n < right), but they may also be in the right subtree (left < n <= right) or either subtree (left <= n <= right)...clarification required
* balanced trees - a tree is balanced if the height of its left and right subtrees are close (no need to be exact, just need to ensure O(log n) finds and inserts); height is the length of the longest path from the root to a leaf, measured in the number of edges; note that a totally unbalanced tree is just a linked list
* complete binary tree - binary tree in which every level of the tree is fully filled, except for perhaps the last level; to the extent that the last level is filled, it is filled left to right
* full binary tree - binary tree in which every node has either zero or two children
* perfect binary tree - binary tree that's both full and complete; all leaf nodes will be at the same level, and this level has the maximum number of nodes

## representing trees

\`\`\`

        5
      /   \\
     3     8
    / \\   / \\
   2   4 6  10

\`\`\`

### node objects and references

\`\`\`python
class Node:
    '''Class representing a binary tree node'''
    def __init__(self, value=None):
        self.value = value
        self.left = None
        self.right = None


root = Node(5)
root.left = Node(3)
root.right = Node(8)
root.left.left = Node(2)
root.left.right = Node(4)
root.right.left = Node(6)
root.right.right = Node(10)
\`\`\`

### list of lists

\`\`\`python
tree = [
    5, # root value
    [
        3, # left subtree
        [2, [], []], # leaf node (both subtrees = empty lists)
        [4, [], []]
    ],
    [
        8, # right subtree
        [6, [], []],
        [10, [], []]
    ]
]
\`\`\`

### dictionary

\`\`\`python
tree = {
    'value': 5, # root value
    'left': { # left subtree
        'value': 3,
        'left': {
            'value': 2 # leaf node (no left or right subtrees)
        },
        'right': {
            'value': 4
        }
    },
    'right': { # right subtree
        'value': 8,
        'left': {
            'value': 6
        },
        'right': {
            'value': 10
        }
    }
}
\`\`\`

## traversing trees

* in-order (nodes visited in ascending order in a binary search tree)
* pre-order (root node visited first)
* post-order (root node visited last)

* visited = processed = printed (in the examples below)

### node objects and references

\`\`\`python
def in_order(node):
    '''Performs an in-order traversal on a tree represented as node objects and references.'''
    if node is None:
        return
    in_order(node.left)
    print(node.value)
    in_order(node.right)


def pre_order(node):
    '''Performs a pre-order traversal on a tree represented as node objects and references.'''
    if node is None:
        return
    print(node.value)
    pre_order(node.left)
    pre_order(node.right)


def post_order(node):
    '''Performs a post-order traversal on a tree represented as node objects and references.'''
    if node is None:
        return
    post_order(node.left)
    post_order(node.right)
    print(node.value)
\`\`\`

### list of lists

\`\`\`python
def in_order(tree):
    '''Performs an in-order traversal on a tree represented as a list of lists.'''
    if not tree:
        return
    in_order(tree[1]) # left subtree
    print(tree[0]) # root value
    in_order(tree[2]) # right subtree


def pre_order(tree):
    '''Performs a pre-order traversal on a tree represented as a list of lists.'''
    if not tree:
        return
    print(tree[0]) # root value
    pre_order(tree[1]) # left subtree
    pre_order(tree[2]) # right subtree


def post_order(tree):
    '''Performs a post-order traversal on a tree represented as a list of lists.'''
    if not tree:
        return
    post_order(tree[1]) # left subtree
    post_order(tree[2]) # right subtree
    print(tree[0]) # root value
\`\`\`

### dictionary

\`\`\`python
def in_order(tree):
    '''Performs an in-order traversal on a tree represented as a dictionary.'''
    if 'left' in tree:
        in_order(tree['left'])
    print(tree['value'])
    if 'right' in tree:
        in_order(tree['right'])


def pre_order(tree):
    '''Performs a pre-order traversal on a tree represented as a dictionary.'''
    print(tree['value'])
    if 'left' in tree:
        pre_order(tree['left'])
    if 'right' in tree:
        pre_order(tree['right'])


def post_order(tree):
    '''Performs a post-order traversal on a tree represented as a dictionary.'''
    if 'left' in tree:
        post_order(tree['left'])
    if 'right' in tree:
        post_order(tree['right'])
    print(tree['value'])
\`\`\`

* sources: [Cracking the Coding Interview, 6th edition](http://www.crackingthecodinginterview.com/), [Wikipedia](https://en.wikipedia.org/wiki/Tree_(data_structure)), [Practical Algorithms and Data Structures](https://bradfieldcs.com/algos)
`},

  gpg: {title: "gpg",
        content: `
\`\`\`bash
# encrypt and sign for recipient <keyOwner>,  key ID, email, or name
# produces file.tgz.gpg
gpg -r <keyOwner> -es file.tgz

# decrypt and verify
gpg -o /path/to/output/file.tgz file.tgz.gpg

# list keys
gpg --list-keys

# delete key
gpg --delete-key <keyOwner>

# import public keys from file
gpg --import pubkeys.txt

# import public keys by id
gpg --recv-keys <keyId> <keyId> <keyId>

# sign key
gpg --sign-key <keyOwner>

# edit trust
gpg --edit-key <keyOwner>

# verify signed file
gpg --verify <sigFile> <fileToVerify>

# export key in ASCII-armored format
gpg --armor --export <keyOwner>

# get key info (expiration, email, etc.)
gpg --fingerprint <keyOwner>
\`\`\`
`},

  decorators: {title: "Python decorator examples",
               content: `
\`\`\`python
def logger(func):
    print('Arguments were: {args}, {kwargs}.')
    def inner(*args, **kwargs):
        return func(*args, **kwargs)
    return inner


def timer(func):
    """Print the runtime of the decorated function"""
    @functools.wraps(func)
    def wrapper_timer(*args, **kwargs):
        start_time = time.perf_counter()    # 1
        value = func(*args, **kwargs)
        end_time = time.perf_counter()      # 2
        run_time = end_time - start_time    # 3
        print(f"Finished {func.__name__!r} in {run_time:.4f} secs")
        return value
    return wrapper_timer


def repeat(num_times):
    def decorator_repeat(func):
        @functools.wraps(func)
        def wrapper_repeat(*args, **kwargs):
            for _ in range(num_times):
                value = func(*args, **kwargs)
            return value
        return wrapper_repeat
    return decorator_repeat

import functools


class CountCalls:
    def __init__(self, func):
        functools.update_wrapper(self, func)
        self.func = func
        self.num_calls = 0

    def __call__(self, *args, **kwargs):
        self.num_calls += 1
        print(f"Call {self.num_calls} of {self.func.__name__!r}")
        return self.func(*args, **kwargs)


def slow_down(func):
    """Sleep 1 second before calling the function"""
    @functools.wraps(func)
    def wrapper_slow_down(*args, **kwargs):
        time.sleep(1)
        return func(*args, **kwargs)
    return wrapper_slow_down


def slow_down(_func=None, *, rate=1):
    """Sleep given amount of seconds before calling the function"""
    def decorator_slow_down(func):
        @functools.wraps(func)
        def wrapper_slow_down(*args, **kwargs):
            time.sleep(rate)
            return func(*args, **kwargs)
        return wrapper_slow_down

    if _func is None:
        return decorator_slow_down
    else:
        return decorator_slow_down(_func)


def cache(func):
    """Keep a cache of previous function calls"""
    @functools.wraps(func)
    def wrapper_cache(*args, **kwargs):
        cache_key = args + tuple(kwargs.items())
        if cache_key not in wrapper_cache.cache:
            wrapper_cache.cache[cache_key] = func(*args, **kwargs)
        return wrapper_cache.cache[cache_key]
    wrapper_cache.cache = dict()
    return wrapper_cache


@functools.lru_cache(maxsize=4)
def fibonacci(num):
    print(f"Calculating fibonacci({num})")
    if num < 2:
        return num
    return fibonacci(num - 1) + fibonacci(num - 2)


class decoratorWithoutArguments(object):

    def __init__(self, f):
        """
        If there are no decorator arguments, the function
        to be decorated is passed to the constructor.
        """
        print "Inside __init__()"
        self.f = f

    def __call__(self, *args):
        """
        The __call__ method is not called until the
        decorated function is called.
        """
        print "Inside __call__()"
        self.f(*args)
        print "After self.f(*args)"


class decoratorWithArguments(object):

    def __init__(self, arg1, arg2, arg3):
        """
        If there are decorator arguments, the function
        to be decorated is not passed to the constructor!
        """
        print "Inside __init__()"
        self.arg1 = arg1
        self.arg2 = arg2
        self.arg3 = arg3

    def __call__(self, f):
        """
        If there are decorator arguments, __call__() is only called
        once, as part of the decoration process! You can only give
        it a single argument, which is the function object.
        """
        print "Inside __call__()"
        def wrapped_f(*args):
            print "Inside wrapped_f()"
            print "Decorator arguments:", self.arg1, self.arg2, self.arg3
            f(*args)
            print "After f(*args)"
        return wrapped_f
\`\`\`


* sources: [artima.com](https://www.artima.com/weblogs/viewpost.jsp?thread=240845), [realpython.com](https://realpython.com/primer-on-python-decorators/#timing-functions)
`},

  datetime: {title: "Python datetime conversions",
             content: `
\`\`\`python
from datetime import datetime

d_str = '08/18/2015 11:21:00'
print(d_str)
# --> 08/18/2015 11:21:00

# datestring to datetime
d_dt = datetime.strptime(d_str, '%m/%d/%Y %H:%M:%S')
print(d_dt)
# --> 2015-08-18 11:21:00 (default str representation of datetime.datetime(2015, 8, 18, 11, 21))

# datetime to unix timestamp (seconds since epoch)
d_epoch = int(round((d_dt - datetime(1970, 1, 1)).total_seconds()))
print(d_epoch)
# --> 1439896860

# unix timestamp (seconds since epoch) to datetime
d_dt2 = datetime.utcfromtimestamp(d_epoch)
print(d_dt2)
# --> 2015-08-18 11:21:00 (default str representation of datetime.datetime(2015, 8, 18, 11, 21))

# to get milliseconds since epoch, multiply by 1000 first if subsecond precision is not necessary

assert d_dt == d_dt2

# format datetime object
d_dt2_f = d_dt2.strftime('%Y-%m-%d %H:%M:%S.%f')
print(d_dt2_f)
\`\`\`
`},

  rvm: {title: "Ruby Version Manager",
        content: `
\`\`\`bash
#  install rvm
gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB
# gpg --keyserver hkp://pgp.mit.edu ---recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB
# \curl -sSL https://get.rvm.io | bash -s stable --ruby

# for rvm, you must set your shell to /bin/bash --login

rvm list known
rvm install 2.2.3
rvm reinstall 2.2.3
rvm docs generate
rvm list rubies
rvm use 2.2.3
rvm info
rvm system (use system ruby)
rvm gemset list
rvm gemset use global
rvm gemset install bundler
rvm gemset create tmp
rvm gemset use tmp
rvm gemdir
rvm 2.2.3@tmp (use tmp gemset with ruby 2.2.3)
rvm 2.2.3@tmp2 --create (create new gemset and switch to it)

#  manage packages individually (like pip install):
rvm gemset install PACKAGE
rvm gemset delete PACKAGE
rvm gemset empty PACKAGE
rvm gemset install rails

#  "You have to install development tools first." --> update, upgrade, and install all ubuntu packages above; them rvm implode; \curl -sSL https://get.rvm.io | bash -s stable --ruby

# manage packages with bundler (like pip install -r requirements.txt):

cd myproject
bundle init
# add to Gemfile:
# gem "rails"
bundle install
# list global gems
rvm @global do gem list
list local gems (only in current gemset)
ls \`rvm gemdir\`/gems
`},

  argparse: {title: "Python argparse",
             content: `
\`\`\`python
import argparse
parser = argparse.ArgumentParser(description='program description')

# add positional argument, must be an int
parser.add_argument('num', help='help text', type=int)

# add positional argument, restrict to choices
parser.add_argument('num', help='help text', type=int, choices=[0, 1, 2],)

# add optional argument, default to 10
parser.add_argument('-n', '--num', default=10, type=int, help='help text')

# add optional argument, boolean value
parser.add_argument('-n', '--num', action='store_true', help='help text')

# enable multiple arguments like -vvv
parser.add_argument('-v', '--verbose', action='count', default=0, help='help text')

# add arguments that can't be used together
group = parser.add_mutually_exclusive_group()
group.add_argument('-v', '--verbose', action='store_true')
group.add_argument('-q', '--quiet', action='store_true')

# make positional argument accept one or more arguments, collected into a list if needed
# nargs can be an int, ?, +, *
parser.add_argument('nums', nargs='+', type=int, help='help text')

# make optional argument accept one or more arguments, collected into a list if needed
# nargs can be an int, ?, +, *
parser.add_argument('-n', '--nums', type=int, nargs='+', help='help text')

args = parser.parse_args()

print(args)
\`\`\`
`},

  bigO: {title: "Big O",
         content: `
* used to describe time or space complexity of an algorithm as a way to describe its efficiency
* explains how the algorithm's time or space requirements will grow as its inputs grows (asymptotic computational complexity)

## academic definitions

* big O - upper bound on runtime, algorithm is at least this fast, no slower
* big Ω - lower bound on runtime, algorithm is at least this slow, no faster
* big Θ - tight bound on runtime, combination of big O and big Ω

* example: iterate through and print each value in an array
  * big O = O(n) [technically it's also O(n²), O(n³), O(2ⁿ)]
  * big Ω = O(n) [technically it's also O(1), O(log n)]
  * big Θ = O(n)

* for non-academic settings, big O alone is usually used to describe runtimes, and the tightest description possible is the correct one [so, big O is O(n) in the above example and O(n²) would be considered incorrect]

## best/worst/expected cases

* example: quicksort
  * best case - O(n) - all elements are equal, one traversal (depends on implementation)
  * worst case - O(n²) - pivot element is repeatedly biggest element, so algorithm doesn't split array in half, it reduces subarray size by 1
  * expected case - O(n log n) - sometimes pivot element will be very low or high, but not every time

## space complexity and big O

* examples
  * data structure: array of size n = O(n)
  * data structure: 2d array of size n = O(n²)
  * algorithm: for loop that calls a function on each iteration = O(1)
  * algorithm: simple recursive function that calls itself once each call = O(n) (stack space counts!)

## common big O runtimes

* O(1) - constant
* O(log n) - logarithmic - example: find element in balanced binary search tree (and others that involve halving the problem space on each iteration/recursive call)
* O(n) - linear
* O(n log n) - loglinear
* O(n²) - quadratic
* O(n³) - cubic
* O(2ⁿ) - exponential
* O(n!) - factorial - example: list all permutations of an array

## how to calculate time complexity

* identify steps in algorithm, add or multiply their runtimes
* add runtimes if steps are sequential (i.e. non-nested for loops)
* multiply if one step is done once for each iteration of other step (i.e. nested for loops)
* reduce expression as much as possible, often to one of the common values listed above
* drop constants - O(2n) reduces to O(n)
* drop non-dominant terms - O(n² + n) reduces to O(n²)

## amortized time

* describes time complexity taking into account frequency of worst case runs and expected/best case runs
* example: appending onto a dynamic array
* expected/best case big O = O(1) [normal array appending]
* worst case big O = O(n) [array is full, so must create a new one and copy all existing elements over]
* amortized big O = O(1) [worse case happens every now and then, but once it does, we know that case won't come up for a while]


## big O with recursion

* often recursive runtimes can be calculated as O(bᵈ), where b = branches and d = depth
* generally speaking, when you see an algorithm with multiple recursive calls, you're looking at exponential runtime
* example: O(n) - sum all values in a balanced binary search tree (if there are n total nodes, then depth is roughly log n)
* example: O(n) - compute n factorial
* example: O(2ⁿ) - compute nth fibonacci number
* example: O(n) - compute nth fibonacci number with memoization
* example: O(log n) - compute powers of 2 from 1 to n (inclusive)


* source: [Cracking the Coding Interview, 6th edition](http://www.crackingthecodinginterview.com/)
`},

  unixTime: {title: "Unix Time",
             content: `
* bash
\`\`\`bash
# in seconds
bash date +%s
# in milliseconds
bash date +%s%3N
\`\`\`

* ruby
\`\`\`ruby
# float
since_epoch_float = Time.new.utc.to_f
# integer
since_epoch_int = Time.new.utc.to_i
# integer corresponding to a given date
my_datetime = Time.utc(1979, 3, 7, 21, 0, 0)
since_epoch_int = my_datetime.to_i
# time object corresponding to a given integer
my_datetime = Time.at(289688400).utc
\`\`\`

* python
\`\`\`python
# float
python since_epoch_float = time.time()
# integer
python since_epoch_int = int(round(time.time()))
# integer corresponding to a specific date
import calendar
python my_datetime = datetime.datetime(month=3, day=7, year=1979, hour=21, minute=0, second=0)
since_epoch_int = calendar.timegm(my_datetime.utctimetuple())
\`\`\`
`},

  rabbitmq: {title: "RabbitMQ",
             content: `
* delete all queues from a RabbitMQ instance

\`\`\`bash
rabbitmqctl list_queues |
awk '{print $1}' |
xargs -I qn amqp-delete-queue --queue=qn
--url=amqp://user:passwd@host.com:5672
\`\`\`

* other commands

\`\`\`bash
rabbitmqctl list_queues
rabbitmqctl list_queues -p vhost
rabbitmqctl list_queues name messages_ready messages_unacknowledged
rabbitmqctl list_exchanges
rabbitmqctl list_bindings
\`\`\`

* source: [Stack Overflow](http://stackoverflow.com/questions/11459676/how-to-delete-all-the-queues-from-rabbitmq)
`},

  regex: {title: "Regular Expressions",
          content: `
\`\`\`bash
# matches any one character
/./

# matches any of the set of chars inside bracket
/[abc]/

# matches any of the set of chars not inside bracket
/[^aeiou]/

# indicates of range of chars when inside brackets
/[A-Za-z0-9]/

# preceding element can occur zero or more times
/a*/

# preceding element can occur one or more times (extended set)
/a+/

# preceding element can occur zero or one time (extended set)
/a?/

# OR operator (extended set)
/(jpb|gif|png)/

# beginning of line char
/^Hello/

# end of line char
/World$/

# backspace escapes next char (so that + is literal + here)
/\\+/

# matches any digit
/\\d/

# matches any not a digit
/\\D/

# matches any word char (alphanumeric and underscore)
/\\w/

# matches anything not word char
/\\W/

# matches any whitespace (space, tab, line break)
/\\s/

# matches anything not whitespace
/\\S/

# matches an alphabetic char
/[[:alpha:]]/

# matches a numeric char
/[[:digit:]]/

# matches an alphanumeric char
/[[:alnum:]]/

# matches a lower case alphabetic char
/[[:lower:]]/

# matches an upper case alphabetic char
/[[:upper:]]/

# matches a punctuation char
/[[:punct:]]/

# matches a space char (space, tab, new line)
/[[:space:]]/

# matches a whitespace char
/[[:blank:]]/

# matches a printable char (including space)
/[[:print:]]/

# matches a printable char (not including space)
/[[:graph:]]/

# matches a control char (non-printing)
/[[:cntrl:]]/

# matches a hex char (0-9, A-F, a-f)
/[[:xdigit:]]/
\`\`\`
`},

  nvm: {title: "Node Version Manager",
        content: `
\`\`\`bash
# install nvm
brew install nvm

# see what versions are available:
nvm ls-remote

# install different versions:
nvm install v0.12.7
nvm install iojs-v2.3.4

# other commands:
nvm --version
nvm install [-s] <version>
nvm uninstall <version>
nvm use <version>
nvm run <version> [<args>]
nvm current
nvm ls
nvm ls <version>
nvm ls-remote
nvm deactivate
nvm which [<version>]
\`\`\`
`},

  grep: {title: "grep",
         content: `
* grep = global regular expression print

\`\`\`bash
grep 'regex' path # quotes are optional
# grep options:
-i # case insensitive
-w # match on whole words (i.e. grep -w apple will skip pineapple
-v # returns all lines that DON"T match regex
-n # returns line numbers too
-c # returns number of occurrences
-R # to search for regex inside all files inside directory
-Rn # returns line numbers too
-Rh # returns lines (no path to file or line numbers)
-Rl # returns files containing regex
-RL # returns files NOT containing regex
--color
--color=always
--color=never
--color=auto # doesn't color when output is piped to a file
-E # use extended set of regexes
\`\`\`
`},

  requests: {title: "Python Requests",
             content: `
\`\`\`python
import requests

# request methods
resp = requests.post('https://httpbin.org/post', data = {'key':'value'}, timeout=30)
resp = requests.put('https://httpbin.org/put', data = {'key':'value'}, timeout=30)
resp = requests.delete('https://httpbin.org/delete', timeout=30)
resp = requests.head('https://httpbin.org/get', timeout=30)
resp = requests.options('https://httpbin.org/get', timeout=30)

# request headers
headers = {'user-agent': 'my-app/0.0.1'}
resp = requests.get(url, headers=headers, timeout=30)

# url params
params = {'key1': 'value1', 'key2': 'value2'}
resp = requests.get('https://httpbin.org/get', params=params, timeout=30)

# files
files = {'file': ('report.xls', open('report.xls', 'rb'), 'application/vnd.ms-excel', {'Expires': '0'})}
r = requests.post('https://httpbin.org/post', files=files, timeout=30)

# response data
r.status_code
r.content
r.json()
r.headers
r.encoding
r.cookies
r.url
r.history # redirects
\`\`\`
`},

  mqttSub: {title: "MQTT Subscriber",
            content: `
\`\`\`python
import paho.mqtt.client as mqtt
from db import save_to_db

def on_connect(mqttc, userdata, rc):
    print('connected...rc=' + str(rc))
    mqttc.subscribe(topic='device/#', qos=0)

def on_disconnect(mqttc, userdata, rc):
    print('disconnected...rc=' + str(rc))

def on_message(mqttc, userdata, msg):
    print('message received...')
    print('topic: ' + msg.topic + ', qos: ' + str(msg.qos) + ', message: ' + str(msg.payload))
    save_to_db(msg)

def on_subscribe(mqttc, userdata, mid, granted_qos):
    print('subscribed (qos=' + str(granted_qos) + ')')

def on_unsubscribe(mqttc, userdata, mid, granted_qos):
    print('unsubscribed (qos=' + str(granted_qos) + ')')

mqttc = mqtt.Client()
mqttc.on_connect = on_connect
mqttc.on_disconnect = on_disconnect
mqttc.on_message = on_message
mqttc.on_subscribe = on_subscribe
mqttc.on_unsubscribe = on_unsubscribe
mqttc.connect(host='localhost', port=1883)
mqttc.loop_forever()
\`\`\`
`},

  pngToUri: {title: "PNG to Data URI",
             content: `
\`\`\`python
#!/usr/bin/env python

import sys
import base64


def main():
    with open(sys.argv[1], 'rb') as f:
        encoded = base64.b64encode(f.read()).decode()
    print(f'data:image/png;base64,{encoded}')


if __name__ == '__main__':
    main()
\`\`\`
`},

  httpServer: {title: "Python HTTP/HTTPS servers",
               content: `
* http server

\`\`\`bash
# start http server in current directory listening on 0.0.0.0:8000
python -m http.server

# specify host to bind to and port to listen on
python -m http.server -b 0.0.0.0 8888
\`\`\`

* https server

\`\`\`python
from http.server import HTTPServer, SimpleHTTPRequestHandler
import ssl

httpd = HTTPServer(('0.0.0.0', 443), SimpleHTTPRequestHandler)
httpd.socket = ssl.wrap_socket (httpd.socket, server_side=True,
        keyfile='/path/to/privkey.pem',
        certfile='/path/to/fullchain.pem')
httpd.serve_forever()
\`\`\`
`},

  nc: {title: "netcat",
       content: `
\`\`\`bash
# OpenBSD netcat (Ubuntu)

# send data to host via TCP (1 second timeout)
echo 'hello tcp' | nc -v -w1 <host> <port>

# send data to host via UDP
echo 'hello udp' | nc -uv -w1 <host> <port>

# specify source port
echo 'hello udp' | nc -uv -w1 -p9998 <host> <port>

# listen on a port for TCP packets
nc -lv -W1 <host> <port> # just listens for one packet then exits
nc -klv <host> <port> # receives multiple packets

# listen on a port for UDP packets
nc -luv -W1 <host> <port>
nc -kluv <host> <port>
\`\`\`

\`\`\`bash
# GNU netcat (MacOS/Homebrew)

# send data to host via TCP (and close connection)
echo 'hello tcp' | nc -vc <host> <port>

# send data to host via UDP
echo 'hello udp' | nc -uvc <host> <port>

# specify source port
echo 'hello udp' | nc -uvc -p9998 <host> <port>

# listen on a port for TCP packets
nc -lvc <host> -p <port> # just listens for one packet
while ! nc -lvc <host> -p <port>; do sleep 1; done # receives multiple packets

# listen on a port for UDP packets
nc -luvc <host> -p <port>
while ! nc -luvc <host> -p <port>; do sleep 1; done
\`\`\`
`},

  pythonCli: {title: "Command Line Python",
              content: `
* run python code from the command line with the \`-c\` flag; put the code in single quotes and use double quotes in the Python code
\`\`\`python
python -c 'print("hi")'
\`\`\`

* you must print your results in the code to display them in the terminal
\`\`\`python
  python -c 'sum([1,2,3,4,5])'
  python -c 'print(sum([1,2,3,4,5]))'
\`\`\`

* you can enter multi-line strings of code
\`\`\`python
  python -c 'import random
  print(random.randint(1, 10))'
\`\`\`

* but indentation must be preserved
\`\`\`python
  python -c 'import random
              print(random.randint(1, 10))'

    File "<string>", line 2
      print(random.randint(1, 10))
      ^
  IndentationError: unexpected indent
\`\`\`

* some might find this easier to read
\`\`\`python
  python -c '\
  import random
  print(random.randint(1, 10))
  '
\`\`\`

* you can also use semicolons to separate lines
\`\`\`python
python -c 'import random; print(random.randint(0,1))'
\`\`\`
`},

  isoToUsb: {title: "ISO to bootable USB image",
             content: `
\`\`\`bash
# Note: this procedure requires an .img file that you will be required to create from the .iso file you download.

hdiutil convert -format UDRW -o ubuntu-16.04.1-server-amd64.img ubuntu-16.04.1-server-amd64.iso

# try adding status=progress for a progress bar
# Note: OS X tends to put the .dmg ending on the output file automatically...this is fine, just leave it
# Insert your flash media, then get a list of devices

diskutil list

# determine the device node assigned to your flash media (e.g. /dev/disk2) and partition it

diskutil partitionDisk /dev/disk2 1 "Free Space" "unused" "100%"

# (replace N with the disk number from the last command; in the previous example, N would be 2)

sudo dd if=ubuntu-16.04.1-server-amd64.img.dmg of=/dev/disk2 bs=1m

# Using /dev/rdisk instead of /dev/disk may be faster.
# If you see the error dd: Invalid number '1m', you are using GNU dd. Use the same command but replace bs=1m with bs=1M.
# If you see the error dd: /dev/diskN: Resource busy, make sure the disk is not in use. Start Disk Utility.app and unmount the volume (don't eject).

diskutil eject /dev/diskN # click ignore after running this command if a dialog had popped up

# remove your flash media when the command completes
\`\`\`
`},

  graphs: {title: "Graphs",
           content: `
* nonlinear data structure composed of vertices (nodes) and edges (links) between them
* any data type may be associated with each vertex (attribute often called key, value, name, payload, cargo, etc.)
* often used to represent a set of states or entities and a set of transitions or connections between them, for example a social or telephone network or a map of cities with distances between them

## types of graphs

* connected/disconnected - In connected graphs, all vertices have a path through one or more edges to all other vertices. Disconnected graphs contain 2 or more isolated subgraphs.
* directed/undirected - Edges may be directed and only allow movement in one direction, or undirected and allow movement in either directions.
* cyclic/acyclic - A cycle is a path that starts and ends at the same vertex. Acyclic graphs have no cycles
* weighted/unweighted - Graph edges may be weighted to represent the cost to go from one vertex to another. For example, a graph representing a map of cities and roads, the weighted edges could denote the distance between the cities.
* tree - connected acyclic rooted graph

## representing graphs


### adjacency list: node objects and references

### adjacency list: dictionary

### adjacency matrix: list of lists

### adjacency matrix: dictionary





* sources: [Cracking the Coding Interview, 6th edition](http://www.crackingthecodinginterview.com/), [Wikipedia](https://en.wikipedia.org/wiki/Graph_(abstract_data_type)), [vevurka-dev](https://vevurka.github.io/dsp17/python/cs/graph_in_python_matrix/), [Practical Algorithms and Data Structures](https://bradfieldcs.com/algos)

`},

  mqttPub: {title: "MQTT Publisher",
            content: `
\`\`\`python
import paho.mqtt.client as mqtt

def on_connect(mqttc, userdata, rc):
    print('connected...rc=' + str(rc))
    mqttc.publish(topic='device/sensor/temperature', payload='80', qos=0)

def on_disconnect(mqttc, userdata, rc):
    print('disconnected...rc=' + str(rc))

def on_message(mqttc, userdata, msg):
    print('message received...')
    print('topic: ' + msg.topic + ', qos: ' + str(msg.qos) + ', message: ' + str(msg.payload))

def on_publish(mqttc, userdata, mid):
    print('message published')
    mqttc.disconnect()

mqttc = mqtt.Client()
mqttc.on_connect = on_connect
mqttc.on_disconnect = on_disconnect
mqttc.on_message = on_message
mqttc.on_publish = on_publish
mqttc.connect(host='localhost', port=1883)
mqttc.loop_forever()
\`\`\`
`},

  heaps: {title: "Binary Heaps",
          content: `
* data structure based on a complete binary tree that satisfies a heap ordering property
* commonly used to implement priority queues and heapsort

## types of heaps

* max-heap: node's value <= parent's value, root = maximum element
\`\`\`

        9
      /   \\
     8     4
    / \\  /
   2   7 3

\`\`\`

* min-heap: node's value >= parent's value, root = minimum element
\`\`\`

        2
      /   \\
     7     5
    / \\  /
   12  9 8

\`\`\`

## common heap operations

* build/create/heapify - create new heap, often from a list of values
    * start with empty heap and insert each element (append it then percolate it up to where it belongs) - O(n log n)
    * start with unordered list, going in reverse from halfway point, percolate each element down to where it belongs in heap - O(n)
* add/insert/push - add item to heap, maintaining heap ordering property
    * add value to end of heap, percolate that value up heap until heap ordering property is restored
* remove/delete/pop - remove (root, max or min) item from heap, maintaining heap ordering property
    * replace root with last value in heap, percolate that value down heap until heap ordering property is restored, return value of original heap root
* find/peek - look for item in heap but do not remove it
    * return value of heap root

## representing heaps

* arrays are often used as a compact, efficient way to represent heaps (complete binary trees)
* each element of the array represents a node, and the parent and children of each node can be found by using simple math
* the min-heap above could be represented as:

\`\`\`python
# the first element is not part of the heap; we could use that slot
# too but the parent/child math would change a little
min_heap = [0, 2, 7, 5, 12, 9, 8]
ROOT_INDEX = 1
root = min_heap[ROOT_INDEX] # root element
left_child = min_heap[2 * ROOT_INDEX] # root element's left child
right_child = min_heap[2 * ROOT_INDEX + 1] # root element's right child
\`\`\`

## Python heapq

* easily represent a priority queue with the heapq module in Python
* this module implements a min-heap and exposes the following methods:

\`\`\`python
# push element into heap maintaining min-heap property
heapq.heappush(heap, item)
# pop the minimum element off the heap, IndexError if heap is empty
heapq.heappop(heap)
# efficiently push an element then pop the minimum element
heapq.heappushpop(heap, item)
# transform a list into a heap
heapq.heapify(items)
# efficiently pop the minimum element off the heap and push new item
# IndexError if heap is empty
heapq.heapreplace(heap, item)
\`\`\`

* sources: [Cracking the Coding Interview, 6th edition](http://www.crackingthecodinginterview.com/), [Python 3 documentation](https://docs.python.org/3/library/heapq.html), [Wikipedia](https://en.wikipedia.org/wiki/Heap_(data_structure))
`},

  mysqldump: {title: "MySQL backup/restore",
              content: `
* backup mysql database:

\`\`\`bash
  mysqldump -v -h localhost -u username -p db_name > backup.sql
\`\`\`

* restore mysql database:

\`\`\`bash
  mysql -v --show-warnings -h localhost -u username -p db_name < backup.sql
\`\`\`
`},

  email: {title: "Python email",
          content: `
\`\`\`python
from email.message import EmailMessage
import os
import smtplib


def send_email(recipient, subject, message_text):
    """Send an email from a gmail account.
    Requires GMAIL_ACCT and GMAIL_PASSWD environment variables for
    authentication. GMAIL_ACCT is the full email address, e.g.
    user@domain.com GMAIL_PASSWD should be an app password for GMAIL_ACCT
    created here: https://security.google.com/settings/security/apppasswords
    """
    message = EmailMessage()
    message.set_content(message_text)
    message['Subject'] = subject
    message['From'] = os.environ['GMAIL_ACCT']
    message['To'] = recipient
    s = smtplib.SMTP('smtp.gmail.com', 587)
    s.starttls()
    s.ehlo()
    s.login(os.environ['GMAIL_ACCT'], os.environ['GMAIL_PASSWD'])
    s.send_message(message)
    s.quit()
\`\`\`


`},

  ruby: {title: "Ruby Notes",
         content: `
\`\`\`ruby
# quickly create an array of strings

a1 = %w{ant bee cat 1234}
a2 = %w(ant bee cat 1234)

# process lines in a file
 # store whatever gets returns into the variable line and then test to see whether that returned value was nil or false before continuing (gets returns nil when it reaches the end of the input)

while line = gets # gets reads from stdin
  puts line.downcase
end

# with_index is like Python enumerate
f = File.open("testfile")
f.each.with_index do |line, index|
  puts "Line #{index} is: #{line}"
end
f.close

# idiomatic Ruby (no return statement)

def say_goodnight(name)
  "Good night, #{name.capitalize}"
end

puts say_goodnight('ma')

# statment modifiers

square = 4
square = square#square while square < 1000

puts "Danger, Will Robinson" if radiation > 3000

# regular expressions
# match operator is =~; if the pattern is found in the string, =~ returns its starting position; otherwise, it returns nil.

line = gets
if line =~ /Perl|Python/
  puts "Scripting language mentioned: #{line}"
end
newline = line.sub(/Perl/, 'Ruby') # replace first 'Perl' with 'Ruby'
newerline = newline.gsub(/Python/, 'Ruby') # replace every 'Python' with 'Ruby'

# code blocks
# becoming a Ruby standard: use braces for single-line blocks and do/end for multiline blocks
# you associate blocks with method calls and they are called each time the method yields

def call_block
  puts "Start of method"
  yield
  yield
  puts "End of method"
end

call_block { puts "In the block" }

def who_says_what
  yield("Dave", "hello")
  yield("Andy", "goodbye")
end

who_says_what {|person, phrase| puts "#{person} says #{phrase}"}

[ 'cat', 'dog', 'horse' ].each {|name| print name, " " }
5.times { print "#" }
3.upto(6) {|i| print i }
('a'..'e').each {|char| print char }

# run as a script

if __FILE__ == $0
  # code goes here
end

# CLargs

print ARGV
print ARGV.size
print ARGF

# writing data

# define a to_s method to customize an object's string representation like Python __repr__u
# puts (print string with new line)
# p (print object's internal representation with attrs)
# print (print string without new line)
# printf (print formatted strings à la C)

# classes

class BookInStock
  def initialize(isbn, price)
    # instance vars
    @isbn = isbn
    @price = Float(price)
  end
  def to_s
    "ISBN: #{@isbn}, price: #{@price}"
  end
end

class BookInStock
  def initialize(isbn, price)
    @isbn = isbn
    @price = Float(price)
  end
  # getters
  def isbn
    @isbn
  end
  def price
    @price
  end
  # setter
  def price=(new_price)
    @price = new_price
  end
end

class BookInStock
  # getters (with symbol)
  attr_reader :isbn
  # getters and setters
  attr_accessor :price
  # just a setter, a write-only attr would be attr_write, but that's rare
  def initialize(isbn, price)
    @isbn = isbn
    @price = Float(price)
  end
end

class BookInStock
  attr_reader :isbn
  attr_accessor :price
  def initialize(isbn, price)
    @isbn = isbn
    @price = Float(price)
  end
  # virtual attribute (getter)
  def price_in_cents
    Integer(price#100 + 0.5)
  end
  # virtual attribute (setter)
  def price_in_cents=(cents)
    @price = cents / 100.0
  end
  # ...
end

# access control
class MyClass
  def method1 # default is 'public'
    #...
  end
  protected # subsequent methods will be 'protected'
  def method2 # will be 'protected'
    #...
  end
  private # subsequent methods will be 'private'
  def method3 # will be 'private'
    #...
  end
  public # subsequent methods will be 'public'
  def method4 # so this will be 'public'
    #...
  end
end

# another way to do access control
class MyClass
  def method1
    #...
  end
  def method2
    #...
  end
  # ... and so on
  public :method1, :method4
  protected :method2
  private :method3
end

# make an object read-only with \`Object.freeze\`

# arrays

Array.length
Array.first (returns first element, but doesn't remove it)
Array.last (returns last element, but doesn't remove it)
Array.push
Array.pop
Array.shift
Array.unshift

a = [1, 3, 5, 7, 9]
a[-1] # => 9
a[-2] # => 7
a[-99] # => nil
a[1..3] # => [3, 5, 7]
a[1...3] # => [3, 5]
a[3..3] # => [7]
a[-3..-1] # => [5, 7, 9]
a[1] = 'bat' #=> [1, "bat", 5, 7, 9]
a[2, 2] = 'cat' #=> [1, "bat", "cat", 9]
a[2, 0] = 'dog' #=> [1, "bat", "dog", "cat", 9]
a[1, 1] = [ 9, 8, 7 ] #=> [1, 9, 8, 7, "dog", "cat", 9]
a[0..3] = [] #=> ["dog", "cat", 9]
a[5..6] = 99, 98 #=> ["dog", "cat", 9, nil, nil, 99, 98]

# hashes
# Ruby remembers the order in which you add items to a hash

Hash.haskey?
Hash.new(default_val)
Hash.sort_by {|key, val| val} # sorts by value
Hash.sort_by {|key, val| key} # sorts by key

h={ 'dog' => 'canine', 'cat' => 'feline', 'donkey' => 'asinine' }
h.length # => 3
h['dog'] # => "canine"
h['cow'] = 'bovine'
h[12] = 'dodecine'
h['cat'] = 99
h # => {"dog"=>"canine", "cat"=>99, "donkey"=>"asinine", "cow"=>"bovine", 12=>"dodecine"}

# if keys are symbols
h = { :dog => 'canine', :cat => 'feline', :donkey => 'asinine' }
h = { dog: 'canine', cat: 'feline', donkey: 'asinine' }

# strings

String.dup
String.downcase
String.scan(regular_expr) # returns an array of substrings that match

# iterators

some_array.each {|value| puts value# 3 }

my_hash.each do |key, val|
  puts "#{key}: #{val}"
end

puts my_hash.map { |key, val| "#{key}: #{val}" }

# block parms are always block local
value = 2
[1, 2, 3].each {|value| puts value# 3 }
puts value
=>prints:
3
6
9
2

# to declare a var block local, use a ; and put it after the block parms
val = 2
[1, 2, 3].each do |value; val|
  val = value + 1
  puts val
end
puts val
=>prints:
2
3
4
2

# otherwise a variable created inside a block overwrites one created before the block
val = 2
[1, 2, 3].each do |value|
  val = value + 1
  puts val
end
puts val
=>prints:
2
3
4
4

[1, 3, 5, 7, 9].find {|v| v#v > 30 } # => 7
[1, 3, 5, 7, 9].find_all {|v| v#v > 30 } # => [7, 9]
["H", "A", "L"].collect {|x| x.succ } # => ["I", "B", "M"]

# inject

# the arg to inject is the first value of the first arg in the block (sum, product)
[1,3,5,7].inject(0) {|sum, element| sum+element} # => 16
[1,3,5,7].inject(1) {|product, element| product#element} # => 105

# if no args are given, the first value is the first element in the sequence and iteration begins with the second element
[1,3,5,7].inject {|sum, element| sum+element} # => 16
[1,3,5,7].inject {|product, element| product#element} # => 105

# you can also just give inject the name of a method you want to apply to successive members of the sequence
# here the symbol :+ represents the addition method +: (same for multiplication)
[1,3,5,7].inject(:+) # => 16
[1,3,5,7].inject(:#) # => 105

# fibonacci sequence up to a max

def fib_up_to(max)
  i1, i2 = 1, 1
  while i1 <= max
    yield i1
    i1, i2 = i2, i1+i2
  end
end
fib_up_to(1000) {|f| print f, " " }
=>prints:
1 1 2 3 5 8 13 21 34 55 89 144 233 377 610 987
\`\`\`
`},

  git: {title: "git",
        content: `
\`\`\`bash
# stage all changes for commit (tracked and untracked files)
git add :/
git add -A

# commit staged changes
git commit -m <message>

# add all changes (except in untracked files) and commit staged changes
git commit -am <message>

# edit previous commit message (optionally, modify and add files to the index, and they will be added to the last commit)
git commit --amend

# discard staged and working directory changes
git reset --hard

# discard staged, working directory changes, and changes from last 2 commits
git reset --hard HEAD^^

# undo last commit, but leave changes in index
git reset --soft HEAD^

# To remove untracked files
git clean -fd

# clone a repo's content to directory named with repo name (xxx in xxx.git)
git clone <url>

# clone a repo's contents to directory named with <dirname>
git clone <url> <dirname>

# see remote info
git remote -v

# push master branch to origin and set up remote tracking
git push -u <remote> <branch>

# force delete the branch
git branch -D <branch>

# set up remote tracking
git branch -u <remote>/<branch>

# checkout branch
git checkout master

# check out new branch based on currently checked out branch
git checkout -b <branch>

# check out new branch based on another branch, commit, etc.
git checkout -b <branch> <sourceRef>

# show diff between working directory and last commit
git diff

# show diff between index and last commit
git diff --cached
git diff --staged

# show diff between working directory and index
git diff

# show diff between last commit and prior commit alone with current changes from working directory
git diff HEAD^

# show diff between files, branches, commits, etc.
git diff <ref1> <ref2>

# show last commit log entry
git log -1

# show reference log (more details than commit log)
git reflog

# show current status
git status

# stash changes
git stash
git stash push

# list stash
git stash list

# apple latest change
git stash pop

# apply a specific change
git stash apply stash@{6}

# fetch remote branches
git fetch

# fetch remote branches and merge tracked branch into current one
git pull

# fetch remote branches and merge <branch> into current one
git pull <remote> <branch>

# apply a single commit to currently checked out branch
git cherry-pick <hash>

# tag currently checked out code with message
git tag -a <tag>

# push tags
git push <remote> --tags

# pull in changes from <branch> into currently checked out branch with merge commit
git merge <branch>

# pull in new changes from <branch> into currently checked out branch without merge commit
git rebase <branch>

# rewrite history for the last 4 commits (options to combine commits, rewrite messages, change commits, etc.)
git rebase -i HEAD^^^^

# pull in new changes from <branch> into currently checked out branch without merge commit
git rebase <branch>

# pull in changes from master when: <branch1> is off master, <branch2> is off <branch1>, <branch1> has been merged into master
git rebase --onto master <branch1> <branch2>
\`\`\`
`},

  dnsQueries: {title: "DNS Queries",
               content: `
\`\`\`bash
# hostname to IP address
dig <hostname>
nslookup <hostname>

# hostname to IP address, short version
dig +short <hostname>

# get all DNS records
dig <hostname> ANY
nslookup -type=ANY <hostname>

# specify nameserver
dig @<nameserver> <hostname> ANY
nslookup -type=ANY <hostname> <nameserver>

# IP address to hostname
dig -x <ipaddr>
nslookup -type=PTR <ipaddr>
\`\`\`
`},

}

module.exports = {
  snippets: snippets
};