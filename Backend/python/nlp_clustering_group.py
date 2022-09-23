import requests
import json
import csv

from google.cloud import language
from google.oauth2 import service_account

client = language.LanguageServiceClient.from_service_account_json('apikey.json')
inputlist = []
IDList = []
with open('student_responds.json','r',encoding='utf-8') as f:
    responds = json.load(f)
    for respond in responds:
        inputlist.append(respond['text'])
        IDList.append(respond['id'])

outputlist = []
stopwords = ['성격','관심','관심사', '꿈', '장래희망', '취미', '쪽', '분야', 'IT', '장래', '희망']
for respIndex, respond in enumerate(inputlist):
    output = ''
    document = language.Document(content=respond, type=language.Document.Type.PLAIN_TEXT)
    features = {
            'extract_syntax': False,
            'extract_entities': True,
            'extract_document_sentiment': False,
            'extract_entity_sentiment': False,
            'classify_text': False
            }
    response = client.annotate_text(document=document,features=features)
    entities = response.entities
    # output = ' '.join(entities)
    for entity in entities:
        if str(entity.name) not in stopwords:
            output = output + ' ' + str(entity.name)
    # print(output)
    outputlist.append(output)

from sklearn.feature_extraction.text import CountVectorizer
cv = CountVectorizer()
cv.fit(outputlist)

outputlist = cv.transform(outputlist)
# print(outputlist)
# print(outputlist.toarray())

from sklearn.cluster import KMeans
cluster_num = 4
kmeans = KMeans(n_clusters=cluster_num, max_iter=1000, random_state=922)
cluster_labels = kmeans.fit_predict(outputlist)
print(cluster_labels)

labelNumList = [0] * cluster_num

for label in cluster_labels:
    labelNumList[label] = labelNumList[label] + 1

groupID = 1
currentGroupPeopleNum = 0
peoplePerGroup = 4
assignedGroupIDList = [-1] * len(cluster_labels) 
sadPeopleList = []

for cnum in range(cluster_num):
    for labelIndex, label in enumerate(cluster_labels):
        if cnum == label:
            if labelNumList[label] + currentGroupPeopleNum >= peoplePerGroup:
                assignedGroupIDList[labelIndex] = groupID
                currentGroupPeopleNum = currentGroupPeopleNum + 1
                labelNumList[label] = labelNumList[label] - 1
                if currentGroupPeopleNum == peoplePerGroup:
                    groupID = groupID + 1
                    currentGroupPeopleNum = 0
            else:
                sadPeopleList.append(labelIndex) 
                labelNumList[label] = labelNumList[label] - 1

for sadPerson in sadPeopleList:
    assignedGroupIDList[sadPerson] = groupID
    currentGroupPeopleNum = currentGroupPeopleNum + 1
    if currentGroupPeopleNum == peoplePerGroup:
        groupID = groupID + 1
        currentGroupPeopleNum = 0

exportlist = []
for labelIndex, label in enumerate(cluster_labels):
    export = dict()
    export['id'] = IDList[labelIndex]
    export['groupid'] = assignedGroupIDList[labelIndex]
    exportlist.append(export)
            
with open('group_output.json', 'w', encoding='utf-8') as make_file:
    json.dump(exportlist, make_file, indent="\t")

