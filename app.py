from flask import Flask

app = Flask(__name__)


store = {

"name" : "Raju",
"items" : [
{
"i1" : "book",
"i2" : "map"
}

]

}



@app.get("/store")
def get_store():
    return {"store": store}