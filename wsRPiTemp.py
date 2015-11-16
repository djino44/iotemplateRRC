#!/usr/bin/env python
import tornado.httpserver
import tornado.websocket
import tornado.ioloop
import tornado.web
from threading import Timer
import json
import numpy as np
import random
import os
from firebase import firebase


wss =[]

firebase = firebase.FirebaseApplication('https://intense-torch-9628.firebaseio.com', None)
result = firebase.get('/', None)
print result



# def check_origin(self, origin):
#     return True
class WSHandler(tornado.websocket.WebSocketHandler):
  def open(self):
    print 'New user is connected.\n' 
    if self not in wss:
      wss.append(self)
  def on_close(self):
    print 'connection closed\n'
    if self in wss:
      wss.remove(self)

  def check_origin(self, origin):
        return True

  def on_message(self,message):
      # print "Message received: {}".format(message)
      self.write_message("message received")

application = tornado.web.Application([(r'/ws', WSHandler),])

if __name__ == "__main__":
  # os.system('modprobe w1-gpio')
  # os.system('modprobe w1-therm')
  interval_msec = 1000

  def wsSend(message):
    for ws in wss:
      if not ws.ws_connection.stream.socket:
        print "Web socket does not exist anymore!!!"
        wss.remove(ws)
      else:
        ws.write_message(message)

  class SetEncoder(json.JSONEncoder):
    def default(self, obj):
      if isinstance(obj, set):
        return list(obj)
      return json.JSONEncoder.default(self, obj)

  def read_temp():
    try:
      a=random.random()
      b=random.random()
      randomTab = np.random.random_sample((7,))*100
      toto=json.dumps(set(randomTab), cls=SetEncoder)
      print "toto : "+toto+'\n'
      # temp = '%s;%s' %(a,b)
      wsSend(toto)
    except:
      wsSend("2;-")

  http_server = tornado.httpserver.HTTPServer(application)
  http_server.listen(7778)
    
  main_loop = tornado.ioloop.IOLoop.instance()
  sched_temp = tornado.ioloop.PeriodicCallback(read_temp, interval_msec,   io_loop = main_loop)

  sched_temp.start()
  main_loop.start()

