var exports = module.exports = {};

var writing = [
  {
    title: "How to Build a Simple IoT System with Python",
    slug: "buildIotSystemWithPython",
    date: "September 10, 2015",
    preview: 'The Internet of Things (IoT) movement is in full swing and growing bigger every day. Wireless thermostats and refrigerators, home security systems controlled by a mobile app, scales and health monitors that save your weight and fitness data...these are some examples of the "smart" gadgets coming out of the IoT movement. This blog post describes how to use Python and the MQTT protocol to hook your gadgets up to a network.',
    md: `### IoT
The [Internet of Things (IoT)](https://en.wikipedia.org/wiki/Internet_of_Things) movement is in full swing and growing bigger every day. Wireless thermostats and refrigerators, home security systems controlled by a mobile app, scales and health monitors that save your weight and fitness data...these are some examples of the "smart" gadgets coming out of the IoT movement. This blog post describes how to use Python and the MQTT protocol to hook your gadgets up to a network. [Message Queuing Telemetry Transport (MQTT)](http://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.html) is a lightweight protocol that runs over TCP/IP and uses a publish/subscribe model to pass messages between publishers and consumers. It offers certificate-based SSL/TLS encryption and is often a good transport solution in low bandwidth situations common in IoT networks. This post describes how to set up a basic IoT system using a central message broker to receive and process messages from all the devices on your wireless network. A device is anything that is able to connect to wifi and send/receive an MQTT message: sensors (temperature, light, motion, etc.), controllers (lights on/off, etc.), etc. Although it's outside of the scope of this article, it's not that hard to create and program your own device these days, at least if it can run Python on it :) See the links at the end of this article for some ideas. For this tutorial, you can use any wifi-capable device, including a laptop simulating a real device. Here's the list of what you'll need:
  * Linux server or VM connected to a wifi network
    * Python
    * Mosquitto MQTT broker
    * MQTT subscriber code
    * Database
  * Device or simulator connected to a wifi network (can be a simulator script running on the above VM)
    * MQTT publisher code

I'll assume you know some [Linux and bash basics](http://www.gnu.org/software/bash/) and how to [set up your Python environment](https://www.python.org/) and [use pip](https://pip.pypa.io/en/stable/index.html). I'll be using Ubuntu 14.04.2 and Python 2.7.9.
The basic system we're building is simple: a message broker that receives messages from devices, processes them, and saves them in a database. It'd be trivial to add a web interface to view the data, but I'll leave that as an exercise for the reader.
### Setting Up the Message Broker
[Mosquitto](https://eclipse.org/mosquitto/) is an MQTT message broker currently maintained by [Eclipse IoT](http://iot.eclipse.org/). It is written in C and does not consume much memory, even with lots of clients connected (specifically, "[around 3MB RAM with 1000 clients connected](https://projects.eclipse.org/projects/technology.mosquitto)"). Mosquitto has the ability to act as a bridge and connect to other MQTT brokers, but our setup will use a single instance as a central receiving point for messages from IoT devices. To install it, run: \`sudo apt-get install mosquitto\`
That should install mosquitto as a service and configure it to run on startup, listening for connections on port 1883. For SSL/TLS setup, see [here](http://www.eclipse.org/mosquitto/man/mosquitto-tls-7.php). To test the broker, go ahead and install these command line utilities: \`sudo apt-get install mosquitto-clients\` Now you can easily subscribe to a topic with \`mosquitto_sub -t 'mytopic'\` and publish a message with \`mosquitto_pub -t 'mytopic' -m 'mymessage'\`. See [here](http://www.eclipse.org/mosquitto/) for more on mosquitto-clients. While developing, I almost always have a terminal window opened that has a subscriber running listening on all topics, represented by "#" and with the \`-v\` flag so that the topic is displayed alongside the message: \`mosquitto_sub -v -t '#'\`
The configuration file is located by default at /etc/mosquitto/mosquitto.conf on Ubuntu 14.04.2 and it is very well-commented. Note that there is no security or logging enabled by default.
### Publishing and Receiving Messages with Python
MQTT messages have a payload and are published to a topic. The payload can be any type of data: text, JSON, XML, binary, etc. The max payload size allowed by Mosquitto can be configured (see [message_size_limit](https://eclipse.org/mosquitto/man/mosquitto-conf-5.php)), but the default cap is the max allowed by MQTT, around 268MB. MQTT topics are hierarchically structured and delimited by a slash '/'. Some examples are 'sensor/humidity/12345678' and 'device/light/kitchen'. A copy of the message will go to all clients subscribed to the message's topic at the time of publication. The wildcard characters '+' and '#' can also be used when subscribing to topics. The '+' matches exactly one topic and the '#' matches zero or more topics. Expanding on the examples above, a subscription to 'sensor/#' would receive data from all sensors, e.g. messages published to 'sensor/humidity/12345678', 'sensor/light/12345678', etc. A subscription to 'device/+/kitchen' would receive data on all devices in the kitchen, e.g. messages published to 'device/light/kitchen', 'device/refrigerator/kitchen', etc. There is also a special set of topics beginning in '$SYS/' where subscribers can get system information like the number of connected clients, and broker uptime. See the [documentation](https://eclipse.org/mosquitto/man/mosquitto-8.php) for a full listing.
To send and receive MQTT messages, we'll use the [Paho](http://www.eclipse.org/paho/) Python client library, also from Eclipse. To install it, run: \`pip install paho-mqtt\` or \`sudo pip install paho-mqtt\`
The Paho library uses an asynchronous event loop to connect to MQTT brokers. This means you have to create a series of functions, callbacks, that will run when certain events fire. These events include:
  * on_connect = connected to broker
  * on_disconnect = disconnected from broker
  * on_publish = message published
  * on_message = message received
  * on_subscribe = subscribed to topic
  * on_unsubscribe = unsubscribed from topic

You don't have to set up every callback; for example \`on_publish\` will not be used in our subscriber code. After defining the callbacks, the code to connect to the broker is pretty concise. Here's our simple subscriber (code adapted from [Paho source repository](http://git.eclipse.org/c/paho/org.eclipse.paho.mqtt.python.git/tree/examples)):

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

[gist](https://gist.github.com/jsonbrazeal/3c7edf1ced0b448d2e77)
After the callbacks are defined, we create an instance of an MQTT client and assign the callbacks to its \`on_\` properties. Then we connect to the broker, subscribe to a topic, and start the event loop. Because this code is asynchronous, nothing actually happens until the event loop is started. The connect and subscribe methods don't run when the execution reaches their lines in the code. They are merely scheduled at that time and actually run once the event loop has started. This is the nature of event-driven, asynchronous code. When the loop starts, the \`connect\` function runs and its completion triggers \`on_connect\`. The \`subscribe\` function then runs and its completion triggers \`on_subscribe\`. At any point after subscribing, a message received will cause \`on_message\` to run. Here I assume you have a \`db.py\` module in the same directory as this code with a \`save_to_db\` function that parses the message and saves it to your database. I'll leave that part for you to implement as you like. After a callback returns, the event loop takes over and waits on the next event to fire and next callback to be triggered. The \`loop_forever\` call will cause a client to listen until it calls \`disconnect\`. Our subscriber code doesn't disconnect, but it may be interrupted with CTRL+C or killed.
The publisher code is very similar to the subscriber code. The key difference is that it publishes instead of subscribing in the \`on_connect\` callback, and disconnects after publishing one message:

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

[gist](https://gist.github.com/jsonbrazeal/745e118b37479b875a8d)
You can test this code all on the same machine using the mosquitto-clients utilities. When deploying, you have several options. In this example, the subscriber code would live on the same Linux machine as Mosquitto. The publisher code would be run on all your devices, periodically sending messages to the central broker. This setup is ideal if you have devices like sensors or monitors that just collect and send in data. For more complicated devices that you'd like to control via MQTT, the setup would be a little different. You could have a subscriber running on the device, and whenever a message is published to a certain topic with a certain payload, this might cause the device to perform an action like turning off a light. Just be careful to secure your IoT devices well or better yet, only expose them to your home network and not to the entire internet.
### Go Forth and IoT
The examples in this blog post will hopefully be helpful in getting a basic IoT infrastructure up and running. Using open source tools, it is not too hard to set up an IoT system with a central message broker that receives messages from wifi-connected devices. With some more work, you could develop this base infrastructure into a full system to connect all your gadgets. Admittedly, I didn't talk much about the "things" in IoT, and these devices are what the movement is all about! Here are some small boards that can run Python and are popular for IoT projects:
  * [MicroPython PyBoard](http://micropython.org/)
  * [WiPy](http://wipy.io/)
  * [Arduino](https://www.arduino.cc/)
  * [Raspberry Pi](https://www.raspberrypi.org/)

They can be connected to just about any device and to wifi. As an example, you could wire a temperature sensor to a PyBoard and program the board to read the temperature and send an MQTT message every hour. With your IoT system connecting all your smart devices, the possibilities are endless!
    `
  },
  {
    title: "Python Lists",
    slug: "pythonLists",
    date: "June 22, 2014",
    preview: "Welcome to my Python lists reference guide. The objective is to gather essential information on the list data type in one place with lots of examples. Please let me know what you think...additions, corrections, and suggestions welcome!",
    md: `### intro

Welcome to my Python lists reference guide. The objective is to gather essential information on the list data type in one place with lots of examples. Please let me know what you think...additions, corrections, and suggestions welcome!

### create lists

* lists are ordered sequences and can hold any combination or types of objects or expressions
\`\`\`python
l = [student_1, 56754, 'hello']
l = [[1,2,3], [4,5,6]]
l = [1 == 2, 1 == 1] # l contains [False, True]
\`\`\`

* create an empty list
\`\`\`python
l = []
l = list() # the list constructor
\`\`\`

* create a list by applying a function to every member of a sequence, called a list comprehension
\`\`\`python
l = [f(x) for x in sequence]
l = [x*2 for x in range(1,6)] # [2,4,6,8,10]
l = ["\${:.2f}".format(x) for x in [1.10343,5.59730,4.35467]]
# ['$1.10', '$5.60', '$4.35']
\`\`\`

* or by casting another sequence into a list type
\`\`\`python
l = list('hello') # ['h','e','l','l','o']
l = list((1,2,3)) # [1,2,3]
\`\`\`

### use lists

* lists have a zero-based index, and slice notation is used to access one or more objects in the list
\`\`\`python
l[0] # first item in list
l[:2] # first two items in list; same as l[0:2]
l[3:6] # the fourth, fifth, and sixth items
l[-1] # last item in list
l[5:] # the sixth item until the end; same as l[5:len(l)]
\`\`\`

* add a step parameter to get every second object, every third object, etc.
\`\`\`python
l[::2] # every other item in list
l[1:8:3] # every third item in slice [1:8]
\`\`\`

* index gets the index of the first occurrence of the argument
\`\`\`python
l = ['hello','world', 'world']
l.index('world') # returns 1
\`\`\`

* loop through lists using standard for-in loops
\`\`\`python
for x in nums:
    print('x= ', x)
\`\`\`

* use the enumerate function to get the indices too
\`\`\`python
for i, x in enumerate(nums):
    print('i= ', i, ' and x= ', x)
\`\`\`

* to test membership in a list, use the in operator for best performance
\`\`\`python
if extension in ['jpg', 'png', 'svg']:
    print('graphics file')
\`\`\`

* use sort to sort a list in place and sorted to return a sorted copy of the list while leaving the original untouched
\`\`\`python
l = [4,2,3,5,1]
m = sorted(l) # l is still [4,2,3,5,1]
l.sort() # now both m and l are [1,2,3,4,5]
\`\`\`

* other useful list functions
\`\`\`python
len(l) # returns number of objects in list
l.count(x) # returns a number of times x occurs in list
max(l) and min(l) # return max/min of list
sum(l) # returns sum of list of summable items
any(l) # True if any members evaluate to True
all(l) # True if all members evaluate to True
\`\`\`

### modify lists

* slicing notation can be used to modify a list; just assign a value or sequence of values to the slice
\`\`\`python
l = ['a','b','c','d','e']
l[4] = 'z' # l is ['a','b','c','d','z']
l[:2] = ['v', 'w'] # l is ['v','w','c','d','z']
l[2:4] = ['x', 'y'] # l is ['v','w','x','y','z'] 
\`\`\`
* to add objects to a list use append, extend, or insert  
\`\`\`python
l.append('extra') # adds one element to end of list
l.extend(['extra', 'large', 'fries']) # adds list of elements to end of list
l.insert(i, x) # inserts element x at index i
\`\`\`

* to remove objects from a list, use del, remove, or pop 
\`\`\`python
del l[3] # delete fourth item in the list
del l[3:5] # delete fourth and fifth item in the list
l.remove(x) # remove first occurrence of x in the list
l.pop() # delete and return last item in the list
l.pop(i) # delete and return item at index i
\`\`\`

* you can use some operators on lists
\`\`\`python
l = [1,2,3]
l += [4] # concatenation - like l.extend([4]) except returns a new list
l = [0, 1] * 3 # repetition - same as [0, 1] + [0, 1] + [0, 1] or [0, 1, 0, 1, 0, 1]
\`\`\`

### do stuff with lists

* easily implement stack &amp; queue data structures using the methods described above
* stacks
\`\`\`python
stack = [1,2,3]
stack.append(4) # stack is [1,2,3,4]
stack.pop() # returns 4; stack is [1,2,3]
\`\`\`
* queues

\`\`\`python
queue = [3,2,1]
queue.insert(0,4) # queue is [4,3,2,1]
queue.pop() # returns 1; queue is [4,3,2]
\`\`\`
* note: inserting items at the beginning of the list is slow compared to the end of the list, so for best performance use Python's deque class from the collections module for queues

* string manipulation and analysis using lists
\`\`\`python
s = 'the quick brown fox jumped over the lazy sleeping dog'
l = s.split(' ') # l is ['the', 'quick', 'brown', 'fox', 'jumped', 'over', 'the', 'lazy', 'sleeping', 'dog']
l = list(set(l)) # remove duplicates
l.sort() # alphabetize
print len(l) # print number of unique words in s
print '\n'.join(l) # print unique words in s, one per line
\`\`\`
* zip two lists together into a list of tuples
\`\`\`python
x_data = [1, 3, 5]
y_data = [2, 4, 6]
data_points = zip(x_data, y_data) # data_points is [(1, 2), (3, 4), (5, 6)]
\`\`\`

### list gotchas

* lists as default arguments - default values are evaluated only once, so there are differences in using a mutable type (list, etc.) and an immutable type (None, etc.) as a default
  * this function will keep appending char to the same list on subsequent calls
\`\`\`python
def add_char(char, l=[]):
    l.append(char)
    return l
print add_char('*') # ['*']
print add_char('*') # ['*', '*']
print add_char('*') # ['*', '*', '*']
\`\`\`
  * this function will create a new list on every call
\`\`\`python
def add_char(char, l=None):
    if l is None:
        l = []
    l.append(char)
    return l
print add_char('*') # ['*']
print add_char('*') # ['*']
print add_char('*') # ['*']
\`\`\`

* assigning a variable to a list does not make a copy of it
\`\`\`python
l1 = [1,2,3]
l2 = [4,5,6]
l2 = l1 # now the list [1,2,3] is referenced by both l1 and l2
# the list [4,5,6] is an object with no references and no way
# to access it, so it will be automatically deleted (garbage collected)
l1.append(4) # now the value of l1 and l2 is [1,2,3,4]
\`\`\`

* use the list constructor or slicing notation to copy a list
\`\`\`python
l2=list(l1) # both of these make a copy of l1
l2=l1[:] # and assign its reference to l2
\`\`\`
`
  },
  {
    title: "Markdown Here for Code Styling",
    slug: "markdownHereCodeStyling",
    date: "March 7, 2014",
    preview: "I really appreciate the way good text editors render nicely styled, syntax highlighted code. Not only is it visually attractive, it helps you easily pick out keywords quickly spot missing quotes or brackets. Unfortunately copying and pasting code somewhere else almost never preserves the highlighting, and even if it does, formatting adjustments are often still required.",
    md: `I really appreciate the way good text editors render nicely styled, syntax highlighted code. Not only is it visually attractive, it helps you easily pick out keywords quickly spot missing quotes or brackets. Unfortunately copying and pasting code somewhere else almost never preserves the highlighting, and even if it does, formatting adjustments are often still required. An example case is when sharing a code snippet with a colleague by email or Evernote. Whether I copy the formatted text from Sublime Text 2 or from Eclipse (PyDev plugin), when I paste it into the Gmail web interface to send to a friend, the text is all black and the font changes to a non-monospace one in Chrome and Firefox (Mac). Safari preserves the monospace font, and sometimes gets the font color right, but if you use a dark background in your text editor like I do, the font colors don't look well in an message with a white background anyway. So how do you share beautifully formatted code with others? [Markdown Here](http://markdown-here.com/), a nifty plugin available for all major browsers. You can write your notes in a special formatting language called [Markdown](http://daringfireball.net/projects/markdown/), and this plugin applies slick formatting with the press of a button. If you're not familiar with it, Markdown makes it very easy to structure and format your document by easily creating headings, lists, tables, and more. For code blocks, Markdown Here lets you choose from 30+ syntax highlighting themes and even customize them with CSS. All you do is start the code block with three backticks and the name of the language, and end the block with three more backticks, as shown below. For html code, use "xml":

![markdown here code before styling](./before_markdown.png "markdown here code before styling")

A click on the Markdown Here button or a quick press of the customizable hotkey changes the above Markdown into this:

![markdown here styling applied](./after_markdown.png "markdown here styling applied")

How cool is that?! The style of these snippets is Tomorrow Night Eighties, but you can see the other available themes and languages on this [demo page](http://highlightjs.org/static/test.html) for highlight.js. Being a plugin, Markdown Here can't be used in Word or other applications, but it is usable in some other places on the web such as Wordpress, Outlook Web App and Google Groups ([full list](https://github.com/adam-p/markdown-here/wiki/Compatibility)). I needed an easy way to style the code I share through Evernote and Gmail, and I found Markdown Here to be a great solution. I've also used it for quick formatting of lists in email.

Do you have any other solutions for code styling? Other creative uses of Markdown or Markdown Here?
`
  },
]
module.exports = {
  writing: writing
};

