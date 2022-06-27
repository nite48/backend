import pymongo
import datetime


myclient = pymongo.MongoClient('mongodb://localhost:27017/')
mydb = myclient["hospital"]
mycol = mydb["times"]
items = ['9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00']
date = '2022-07-10'
mydict = { "date": date, "time": items}
ins = mycol.insert_one(mydict)
print('ok')


# end_date = datetime.date.today()
# count = 1
# for i in items:
#   new_date = end_date + datetime.timedelta(days=count)
#   mydict = { "date": new_date, "time": items}
#   print(new_date)
#   count+=1
#   