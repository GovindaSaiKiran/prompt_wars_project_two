import google.generativeai as genai
import os

api_key = "AIzaSyCKaq0B38jGeNYTtROavMYhfw75vNBAoMk"
genai.configure(api_key=api_key)

try:
    print("Listing models...")
    for m in genai.list_models():
        if 'generateContent' in m.supported_generation_methods:
            print(f"Model: {m.name}")
except Exception as e:
    print(f"Error: {e}")
