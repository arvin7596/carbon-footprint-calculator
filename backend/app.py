from flask import Flask, jsonify, request , send_file , make_response
from flask_cors import CORS
from fpdf import FPDF

app = Flask(__name__)
CORS(app)

electricity_emission = 0
gas_emission = 0
fuel_emission = 0
waste_emission = 0
business_travel_emission = 0
total_emission = 0

def reset_global_data(): 
    global electricity_emission , gas_emission , fuel_emission ,  waste_emission , business_travel_emission ,total_emission
    electricity_emission = 0
    gas_emission = 0
    fuel_emission = 0
    waste_emission = 0
    business_travel_emission = 0
    total_emission = 0

@app.route('/init') 
def index():
    reset_global_data() 


# Api to get electricity , gas and fuel input value from client side 

@app.route('/calculate-energy', methods=['POST'])
def process_energy_data():
    # Get the input data from the request
    input_data = request.json
    
    # Validate if the request has a body
    if not input_data:
        return jsonify({'error': 'No input data provided'}), 400
    
    # Validate Required fields
    required_fields = ['electricity', 'gas', 'fuel']
    
    # Check if all required fields existed
    for field in required_fields:
        if field not in input_data:
            return jsonify({'error': f'Missing required field: {field}'}), 400
        
    # Validate all values are greater or equal to 0 
    for field in required_fields:
        if not isinstance(input_data[field], (int, float)) or input_data[field] < 0:
            return jsonify({'error': f'{field} must be a positive number'}), 400
       
    result = calculate_energy(input_data['electricity'],input_data['gas'],input_data['fuel'],12)
    return jsonify(result)

def calculate_energy(electricity,gas,fuel,month):
    global electricity_emission , gas_emission , fuel_emission
    electricity_emission = electricity * month * 0.0005
    gas_emission = gas * month * 0.0053
    fuel_emission = fuel * month * 2.32
    total_usage = electricity_emission + gas_emission + fuel_emission
    return {"electricity_usage" : electricity_emission , "gas_usage" : gas_emission , "fuel_usage":fuel_emission,"total_usage":total_usage }




# Api to get waste and recycle percentage input value from client side 

@app.route('/calculate-waste', methods=['POST'])
def process_waste_data():
    # Get the input data from the request
    input_data = request.json
    
    # Validate if the request has a body
    if not input_data:
        return jsonify({'error': 'No input data provided'}), 400
    
    # Validate Required fields
    required_fields = ['waste',"recycle"]
    
     # Check if all required fields existed
    for field in required_fields:
        if field not in input_data:
            return jsonify({'error': f'Missing required field: {field}'}), 400
        
    # Validate all values are greater or equal to 0 
    for field in required_fields:
            if not isinstance(input_data[field], (int, float)) or input_data[field] < 0:
                return jsonify({'error': f'{field} must be a positive number'}), 400
    
    # Validate recycle percentage is between 0 and 100
    if not (0 <= input_data['recycle'] <= 100):
        return jsonify({'error': 'recycle percentage must be between 0 and 100'}), 400

    result = calculate_waste(input_data['waste'],input_data['recycle'],12)
    return jsonify(result)

def calculate_waste(waste,recycle,month):
    global waste_emission
    waste_generated = waste * month
    waste_recycled = waste * month * recycle / 100
    waste_emission = waste * month * (0.57 - ( recycle / 100 ))
    return {"waste_generated" : waste_generated , "waste_recycled" : waste_recycled , "waste_remained": waste_emission }



# Api to get kilometers traveled and vehicles fuel input value from client side 
@app.route('/calculate-travel', methods=['POST'])
def process_travel_data():
   # Get the input data from the request
    input_data = request.json
    
    # Validate if the request has a body
    if not input_data:
        return jsonify({'error': 'No input data provided'}), 400
    
   # Validate Required fields
    required_fields = ['traveled', 'vehicles']
    
    # Check if all required fields are present
    for field in required_fields:
        if field not in input_data:
            return jsonify({'error': f'Missing required field: {field}'}), 400
        
    # Validate all values are greater or equal to 0
    for field in required_fields:
        if not isinstance(input_data[field], (int, float)) or input_data[field] < 0:
            return jsonify({'error': f'{field} must be a positive number'}), 400
    # Validate vehicles is greater than 0 because of (1/vehicles) formula
    if not (0 < input_data['vehicles']):
        return jsonify({'error': 'vehicles be greater than 0'}), 400
        
    result = calculate_travel(input_data['traveled'],input_data['vehicles'])
    return jsonify(result)

def calculate_travel(traveled,vehicles):
    global business_travel_emission
    business_travel_emission = traveled * ( 1 / vehicles ) * 2.31
    return {"business_travel_emission" :  business_travel_emission}



@app.route('/get_report_data')
def report_data():
    # Send All calculated emissions for report and table
    global total_emission
    total_emission = electricity_emission + gas_emission + fuel_emission + waste_emission + business_travel_emission
    data = {
        "electricity_emission": round(electricity_emission,3),
        "gas_emission":round(gas_emission,3) ,
        "fuel_emission":round(fuel_emission,3) ,
        "waste_emission":round(waste_emission,3) ,
        "business_travel_emission":round(business_travel_emission,3) ,
        "total_emission": round(total_emission,3)
    }
    return jsonify(data)



@app.route('/generate_pdf', methods=['GET'])
def create_pdf_with_table():
    # Create PDF file with fpdf contains table
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    
    # Title for Table
    pdf.set_text_color(0, 51, 102)  # Color Dark blue title
    pdf.cell(200, 10, txt="Carbon Footprint Report", ln=True, align="C")
    pdf.ln(10)  # Add a line break

    # Table headers
    headers = ["Emission Category", "CO2 Emissions (kgCO2)"]
    data = [
        ["Electricity CO2 Emissions", round(electricity_emission,3)],
        ["Gas CO2 Emissions", round(gas_emission,3)],
        ["Fuel CO2 Emissions", round(fuel_emission,3)],
        ["Waste CO2 Reduction", round(waste_emission,3)],
        ["Business Travel CO2 Emissions", round(business_travel_emission,3)],
        [" Total CO2 Emissions", round(total_emission,3)]
    ]
    
    # Header row
    pdf.set_fill_color(200, 220, 255)  # Light blue
    pdf.set_text_color(0)
    for header in headers:
        pdf.cell(80, 10, header, border=1, fill=True, align="C")
    pdf.ln()

    # Table data rows
    row_colors = [(255, 255, 255), (240, 240, 240)]  # Colors
    for i, row in enumerate(data):
        pdf.set_fill_color(*row_colors[i % 2])  # Colors
        for item in row:
            pdf.cell(80, 10, str(item), border=1, fill=True, align="C")
        pdf.ln()

    # Save PDF to a Bytes stream and return it
    response = make_response(pdf.output(dest="S").encode("latin1"))
    response.headers["Content-Type"] = "application/pdf"
    response.headers["Content-Disposition"] = "inline; filename=report.pdf"
    return response

@app.route("/generate_pdf", methods=["GET"])
def generate_pdf():
    return create_pdf_with_table()

if __name__ == '__main__':
    app.run(debug=True)    