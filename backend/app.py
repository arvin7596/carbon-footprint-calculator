from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify({"message": "Test Python!"})

@app.route('/api/process', methods=['POST'])
def process_data():
    data = request.json
    result = f"Processed: {data['input']}"
    return jsonify({"message": result})

if __name__ == '__main__':
    app.run(debug=True)