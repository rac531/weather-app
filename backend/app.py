from dotenv import load_dotenv
import os
from flask import Flask, request, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

load_dotenv()

weather_key = os.getenv('WEATHER_API_KEY')

@app.route('/weather', methods=['GET'])
def get_weather():
    city = request.args.get('city')
    if not city:
        return jsonify({"error": "No city specified"}), 400
    
    response = requests.get(f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={weather_key}&units=imperial")

    if response.status_code == 200:
        return jsonify(response.json())
    else:
        return jsonify({"error": "Unable to retrieve data"}), response.status_code
    
if __name__ == '__main__':
    app.run(debug= True)