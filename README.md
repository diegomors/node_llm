# Project Overview

This project provides different implementations to perform data extraction.  

    1. Dictionary
        This implementation uses only Javascript itself with a dictionary to extract known data by keywords

    2. Langchain (Llama2 7B)
        This implementation uses the local LLM Llama2 7B to perform data extraction using prompts (doesn't works)

    3. Langchain (Llama2 13B)
        This implementation uses the local LLM Llama2 13B to perform data extraction using prompts (doesn't works)

    4. Llamaindex (OpenAI GPT3)
        This implementation uses the remote LLM GPT 3 to perform data extraction using prompts

    5. Llamaindex (Llama RAG Remote)
        This implementation uses the remote LLM from OpenAI to perform data extraction with RAG 

    6. Llamaindex (Llama RAG Local)
        This implementation uses the local LLM Mixtral to perform data extraction with RAG (HeadersTimeoutError)

# Set up Dictionary

1. Test project

    ```
    npm install
    npm start
    ```

# [Set up Langchain](https://js.langchain.com/docs/integrations/llms/llama_cpp/)

1. Download model

    1.1. Request access to Llama models

        https://www.llama.com/llama-downloads/

    1.2. Proceed download

    ```
    git clone https://github.com/facebookresearch/llama.git
    cd llama
    ./download.sh
    ```

2. Compile model

    ```
    git clone https://github.com/ggerganov/llama.cpp.git
    cd llama.cpp
    make
    python3 -m venv llama2
    source llama2/bin/activate
    python3 -m pip install -r requirements.txt
    ```

    **Llama 2 7B**
    ```
    mkdir models/7B
    python3 examples/convert_legacy_llama.py --outfile models/7B/ggml-model-f16.bin --outtype f16 ../llama/llama-2-7b
    docker run -v ~/workspace/llama.cpp/models:/models ghcr.io/ggerganov/llama.cpp:full --all-in-one "/models" 7B
    ```

    **Llama 2 13B**
    ```
    mkdir models/13B
    python3 examples/convert_legacy_llama.py --outfile models/13B/ggml-model-f16.bin --outtype f16 ../llama/llama-2-13b
    docker run -v ~/workspace/llama.cpp/models:/models ghcr.io/ggerganov/llama.cpp:full --all-in-one "/models" 13B
    ```

3. Test project

    ```
    npm install
    npm start
    ```

# [Set up Llamaindex](https://ts.llamaindex.ai/examples/local_llm)

1. Set up [OPENAI_KEY](https://platform.openai.com/api-keys) in the **.env** file

    ```
    OPENAI_API_KEY={YOUR_KEY}
    ```

2. Install [Ollama](https://ollama.com/)

    ```
    brew install ollama
    ```

3. Set up mixtral:8x7b

    ```
    ollama run mixtral:8x7b
    >>> /load mixtral:8x7b
    ```
    Note: Keep it running.

    Check if it's running
    ```
    curl http://localhost:11434

    Ollama is running
    ```

4. Set up BAAI/bge-small-en-v1.5

    ```
    pip3 install torch torchvision
    python3 ./lib/model/setup_model.py
    ```

    Check if it's installed correctly
    ```
    python3 ./lib/model/check_model.py

    tensor([[0.9301, 0.4620, 0.5878],
        [0.4004, 0.6724, 0.0571],
        [0.5285, 0.5563, 0.5618],
        [0.8154, 0.9178, 0.8803],
        [0.0246, 0.4845, 0.8631]])
    ```

5. Test project

    ```
    npm install
    npm start
    ```