import requests
import time
import datetime
from os import path
import projects
import sys

fromDate = '2019-01-01'
initEndDate = time.strftime("%Y-%m-%d", time.localtime())

[name, uid, token, gitUrl] = sys.argv

if not uid or not token or not gitUrl:
   print('please config uid and private token')
   exit

baseUrl = 'http://' + gitUrl + '/api/v4/users/' + uid + '/events?action=pushed&before='
headers = {'PRIVATE-TOKEN': token}

fileObj = open(path.relpath('tmp/pushes.js'), 'w')
fileObj.write('export default [')

dictData = {}
xArr = []
yArr = []
projectIDs = []

def getDate(str):
   return datetime.datetime.strptime(str,'%Y-%m-%d').date()

def getProjectIDS(pushes):
   global projectIDs
   for p in pushes:
      projectIDs = projectIDs + [p['project_id']]

endDate = initEndDate
while getDate(endDate) > getDate(fromDate):
   s = '' if endDate == initEndDate else ','
   url = baseUrl + endDate
   r = requests.get(url, headers=headers)
   pushes = r.json()
   endDate = pushes[-1]['created_at'][0:10]
   fileObj.write(s + r.text[1:][:-1])
   getProjectIDS(pushes)
else:
   fileObj.write(']')
   fileObj.close()
   projectIDs = list(set(projectIDs))
   projects.getProjects(projectIDs, token)
