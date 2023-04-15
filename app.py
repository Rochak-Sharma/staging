from flask import Flask, request

app = Flask(__name__)


store = [
{

"name" : "Raju",
"items" : [
{
"i1" : "book",
"i2" : "map"
}

]

}
]



@app.get("/store")
def get_store():
    return {"store": store}


@app.post("/store")
def post_store():
    data = request.get_json()

    nameData = data['name']

    store.append({"name": nameData, "items": []})

    return store, 201




@app.get("/store/<string:name>")
def get_store_names(name):
    for data in store:
        if data["name"] == name:
            return {"store": data}, 200
    
    return {"message": "Data wrong"}, 401