from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/calculate-energy', methods=['POST'])
def process_data():
    data = request.json
    result = calculate_energy(data['electricity'],data['gas'],data['fuel'],12)
    return jsonify(result)



def calculate_energy(electricity,gas,fuel,month):
    electricity_usage = electricity * month * 0.0005
    gas_usage = gas * month * 0.0053
    fuel_usage = fuel * month * 2.32
    total_usage = electricity_usage + gas_usage + fuel_usage
    print(electricity , electricity_usage)
    return {"electricity_usage" : electricity_usage , "gas_usage" : gas_usage , "fuel_usage":fuel_usage,"total_usage":total_usage }



if __name__ == '__main__':
    app.run(debug=True)
