// for now, this file could be generated from the kb files
// eventually kb can be a service

var exports = module.exports = {};

var snippets = {
  grep: `grep it`,

  catt: `# how to add syntax highlighting to command line output
  * install the Python syntax highlighter [Pygments](http://pygments.org/)

  \`\`\`bash
  sudo apt-get install python-pygments
  \`\`\`

  * choose an alias and assign the pygmentize command to it, customizing the style however you'd like

  \`\`\`bash
  alias catt='pygmentize -O style=monokai -f console256 -g'
  \`\`\`

  * add the alias line to your bash startup file (.bashrc, for example) to have it available every time you log on
  * enjoy your nicely highlighted command line output!

  \`\`\`bash
  catt /path/to/file
  \`\`\`
  `,


  mysql: `# how to backup and restore a mysql database

  * backup mysql database:

  \`\`\`bash
    mysqldump -v -h localhost -u username -p db_name > backup.sql
  \`\`\`

  * restore mysql database:

  \`\`\`bash
    mysql -v --show-warnings -h localhost -u username -p db_name < backup.sql
  \`\`\`

  # how to create a new mysql database user
  * login as root or other user with sufficient privileges \`bash mysql -h localhost -u root -p \`
  * create new user \`sql CREATE USER username@localhost IDENTIFIED BY 'password'; \`
  * give new user privileges
    * all privileges, all databases, ability to grant further privileges \`sql GRANT ALL ON *.* TO username@localhost WITH GRANT OPTION; \`
    * some privileges, all databases \`sql GRANT INSERT, DELETE, UPDATE ON *.* TO username@localhost; \`
    * all privileges, one database called "db" \`sql GRANT ALL ON db.* TO username@localhost; \`
    * all privileges, one database called "db", one table called "tb" \`sql GRANT ALL ON db.tb TO username@localhost; \`
  * see which privileges a user has been granted \`sql SHOW GRANTS FOR ghb_user@localhost; \`
  * see all possible privileges you can grant \`sql SHOW PRIVILEGES; \`
  `,


  rabbitmq: `# how to delete all queues from rabbitmq in bash
  * delete all queues from a RabbitMQ instance

  \`\`\`
    sudo rabbitmqctl list_queues |
    awk '{print $1}' |
    xargs -I qn amqp-delete-queue --queue=qn
    --url=amqp://user:passwd@host.com:5672
   \`\`\`
  * source: [Stack Overflow](http://stackoverflow.com/questions/11459676/how-to-delete-all-the-queues-from-rabbitmq)
  * tested with RabbitMQ 3.5.3 on Ubuntu 14.04.2
  `,


  unixTime: `# how to get unix time in bash
  * get current [unix time](https://en.wikipedia.org/wiki/Unix_time)
    * in seconds \`bash date +%s \`
    * in milliseconds \`bash date +%s%3N \`
  * tested on Ubuntu 14.04.2

  # how to get unix time in ruby
  * get current [unix time](https://en.wikipedia.org/wiki/Unix_time)

  * float
    * \`ruby since_epoch_float = Time.new.utc.to_f \`
  * integer
    * \`ruby since_epoch_int = Time.new.utc.to_i \`
  * get unix time corresponding to a specific date
    * \`ruby my_datetime = Time.utc(1979, 3, 7, 21, 0, 0) since_epoch_int = my_datetime.to_i \`

  * get time object corresponding to a specific unix time \`ruby my_datetime = Time.at(289688400).utc \`

  # how to get unix time in python
  * get current [unix time](https://en.wikipedia.org/wiki/Unix_time)

  * float
    * \`python since_epoch_float = time.time() \`
  * integer
    * \`python since_epoch_int = int(round(time.time())) \`
  * get unix time corresponding to a specific date
    * \`python my_datetime = datetime.datetime(month=3, day=7, year=1979, hour=21, minute=0, second=0) since_epoch_int = calendar.timegm(my_datetime.utctimetuple()) \`

  * tested with Python 2.7.6 on Ubuntu 14.04.2

  `,


  pythonCli: `# how to run python code from the command line

  \`\`\`python
  import this
  test = "a test string"
  test3 = 1 + 2
  \`\`\`

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

  * you can also use commas to separate lines
  \`\`\`python
  python -c 'import random; print(random.randint(0,1))'
  \`\`\`

  * tested with Python 2.7.6 on Ubuntu 14.04.2

  `
}

module.exports = {
  snippets: snippets
};
