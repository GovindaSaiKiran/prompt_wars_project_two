import requests

api_key = "AIzaSyCKaq0B38jGeNYTtROavMYhfw75vNBAoMk"
url = f"https://generativelanguage.googleapis.com/v1beta/models?key={api_key}"

response = requests.get(url)

print(f"Status Code: {response.status_code}")
print(f"Response: {response.text}")
