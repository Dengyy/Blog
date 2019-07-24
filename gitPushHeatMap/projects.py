import requests
import time
import datetime
from os import path

def getProjects(gitUrl, projectIDs, token):
   baseUrl = 'http://' + gitUrl + '/api/v4/projects/'
   headers = {'PRIVATE-TOKEN': token}

   fileObj = open(path.relpath('tmp/projects.js'), 'w')
   fileObj.write('export default [')

   index = 0
   for pid in projectIDs:
      url = baseUrl + str(pid)
      r = requests.get(url, headers=headers)
      res = r.json()
      s = '' if index == 0 else ','
      fileObj.write(s + r.text)
      index = index + 1

   fileObj.write(']')
