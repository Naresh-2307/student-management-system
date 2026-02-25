import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId

load_dotenv()

app = Flask(__name__)
CORS(app)

# connect MongoDB
client = MongoClient("mongodb://localhost:27017")
db = client["student_db"]
students_collection = db["students"]

@app.route("/")
def home():
    return "Flask connected to MongoDB"

# CREATE student
@app.route("/students", methods=["POST"])
def create_student():
    data = request.get_json()

    student = {
        "name": data["name"],
        "age": data["age"]
    }

    students_collection.insert_one(student)

    return jsonify({"message": "Student added successfully"})

# READ students
@app.route("/students", methods=["GET"])
def get_students():

    students = []

    for student in students_collection.find():
     students.append({
        "id": str(student["_id"]),
        "name": student["name"],
        "age": student["age"]
    })
    return jsonify(students)

from bson.objectid import ObjectId

@app.route("/students/<id>", methods=["DELETE"])
def delete_student(id):

    students_collection.delete_one({"_id": ObjectId(id)})

    return jsonify({"message": "Student deleted successfully"})
from bson.objectid import ObjectId

@app.route("/students/<id>", methods=["PUT"])
def update_student(id):

    data = request.get_json()

    students_collection.update_one(
        {"_id": ObjectId(id)},
        {"$set": {
            "name": data["name"],
            "age": data["age"]
        }}
    )

    return jsonify({"message": "Student updated successfully"})
app.run()