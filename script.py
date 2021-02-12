import sys, os
import json

# Returns the text inside a file
def openFile(path):
    f = open(path, "r")
    return f.read()

def loadJson(relPath):
    absPath = os.path.normpath(os.path.dirname(os.path.abspath(__file__)) + '/' + relPath)
    return json.loads(openFile(absPath))

def getMails():
    return loadJson('./config.json')

if __name__ == '__main__':
    try:
        mails = loadJson('./config.json')
    except Exception as e:
        print("[-] Can't open 'config.json' file")


    for mail in mails:
        print(mail)

