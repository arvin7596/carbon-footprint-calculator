from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/calculate-energy', methods=['POST'])
def process_energy_data():
    data = request.json
    result = calculate_energy(data['electricity'],data['gas'],data['fuel'],12)
    return jsonify(result)

def calculate_energy(electricity,gas,fuel,month):
    electricity_usage = electricity * month * 0.0005
    gas_usage = gas * month * 0.0053
    fuel_usage = fuel * month * 2.32
    total_usage = electricity_usage + gas_usage + fuel_usage
    return {"electricity_usage" : electricity_usage , "gas_usage" : gas_usage , "fuel_usage":fuel_usage,"total_usage":total_usage }


@app.route('/calculate-waste', methods=['POST'])
def process_waste_data():
    data = request.json
    result = calculate_waste(data['waste'],data['recycle'],12)
    return jsonify(result)

def calculate_waste(waste,recycle,month):
    waste_generated = waste * month
    waste_recycled = waste * month * recycle / 100
    waste_remained = waste * month * (0.57 - ( recycle / 100 ))
    return {"waste_generated" : waste_generated , "waste_recycled" : waste_recycled , "waste_remained": waste_remained }


@app.route('/calculate-travel', methods=['POST'])
def process_travel_data():
    data = request.json
    result = calculate_travel(data['traveled'],data['vehicles'])
    return jsonify(result)

def calculate_travel(traveled,vehicles):
    co2_business_travel = traveled * ( 1 / vehicles ) * 2.31
    return {"co2_business_travel" :  co2_business_travel}


if __name__ == '__main__':
    app.run(debug=True)
