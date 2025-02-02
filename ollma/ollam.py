import ollama

while True:
    user_input = input("You: ")
    if(user_input == "exit"):
        break
    response = ollama.chat(model='llama3.2', messages=[
        {
            'role': 'user',
            'content': user_input,
        },
    ])
    print("Ollama:", response['message']['content'])

