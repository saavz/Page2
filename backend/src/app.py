from flask import Flask, jsonify, request
from flask_pymongo import PyMongo 
from flask_cors import CORS
from bson import ObjectId

app = Flask(__name__)
app.config['MONGO_URI']='mongodb://localhost/bddambulantes'
mongo = PyMongo(app)
CORS(app)

db = mongo.db.user

@app.route('/users', methods=['POST'])
def createUsers():
    id = db.insert_one({
        'name': request.json['name'],
        'rut': request.json['rut'],
        'pin': request.json['pin'],
        'products': request.json['products'],
        'lastUpdate': request.json['lastUpdate']
    })
    idResult = id.inserted_id
    return jsonify((str(idResult)))

@app.route('/user/<pin>', methods=['GET'])
def getUser(pin):
    user = db.find_one({'pin': pin}) 
    return jsonify({
        'name': user['name'],
        'rut': user['rut'],
        'pin': user['pin'],
        'products': user['products'],
        'lastUpdate': user['lastUpdate']
    })

@app.route('/users/', methods=['GET'])
def getUsers():
    users = []
    for doc in db.find():
        users.append({
            '_id': str(ObjectId(doc['_id'])),
            'name': doc['name'],
            'rut': doc['rut'],
            'pin': doc['pin'],
            'products': doc['products'],
            'lastUpdate': doc['lastUpdate']
        })
    return jsonify(users)



if __name__ == "__main__":
    app.run(debug=True)


