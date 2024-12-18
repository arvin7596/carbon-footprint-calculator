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

@app.route('/calculate-energy', methods=['POST'])
def process_energy_data():
    data = request.json
    result = calculate_energy(data['electricity'],data['gas'],data['fuel'],12)
    return jsonify(result)

def calculate_energy(electricity,gas,fuel,month):
    global electricity_emission , gas_emission , fuel_emission
    electricity_emission = electricity * month * 0.0005
    gas_emission = gas * month * 0.0053
    fuel_emission = fuel * month * 2.32
    total_usage = electricity_emission + gas_emission + fuel_emission
    return {"electricity_usage" : electricity_emission , "gas_usage" : gas_emission , "fuel_usage":fuel_emission,"total_usage":total_usage }


@app.route('/calculate-waste', methods=['POST'])
def process_waste_data():
    data = request.json
    result = calculate_waste(data['waste'],data['recycle'],12)
    return jsonify(result)

def calculate_waste(waste,recycle,month):
    global waste_emission
    waste_generated = waste * month
    waste_recycled = waste * month * recycle / 100
    waste_emission = waste * month * (0.57 - ( recycle / 100 ))
    return {"waste_generated" : waste_generated , "waste_recycled" : waste_recycled , "waste_remained": waste_emission }


@app.route('/calculate-travel', methods=['POST'])
def process_travel_data():
    data = request.json
    result = calculate_travel(data['traveled'],data['vehicles'])
    return jsonify(result)

def calculate_travel(traveled,vehicles):
    global business_travel_emission
    business_travel_emission = traveled * ( 1 / vehicles ) * 2.31
    return {"business_travel_emission" :  business_travel_emission}


@app.route('/get_report_data')
def report_data():
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
    return jsonify(data)  # Send data as JSON

@app.route('/generate_pdf', methods=['GET'])
def create_pdf_with_table():
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    
    # Title
    pdf.set_text_color(0, 51, 102)  # Dark blue title
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
    
    # Header row with background color
    pdf.set_fill_color(200, 220, 255)  # Light blue
    pdf.set_text_color(0)  # Black text
    for header in headers:
        pdf.cell(80, 10, header, border=1, fill=True, align="C")
    pdf.ln()

    # Table data rows
    row_colors = [(255, 255, 255), (240, 240, 240)]  # Alternating white and light gray
    for i, row in enumerate(data):
        pdf.set_fill_color(*row_colors[i % 2])  # Alternate row colors
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