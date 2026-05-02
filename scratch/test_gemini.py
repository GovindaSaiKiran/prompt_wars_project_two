import google.generativeai as genai
import sys

api_key = "AIzaSyCKaq0B38jGeNYTtROavMYhfw75vNBAoMk"
genai.configure(api_key=api_key)

models_to_try = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-pro']

for model_name in models_to_try:
    try:
        print(f"Testing model: {model_name}...")
        model = genai.GenerativeModel(model_name)
        response = model.generate_content("Hello")
        print(f"Success with {model_name}: {response.text[:50]}...")
        break
    except Exception as e:
        print(f"Failed with {model_name}: {e}")

print("Testing complete.")
