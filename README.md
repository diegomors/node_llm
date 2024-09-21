# [How to use Llama locally](https://js.langchain.com/docs/integrations/llms/llama_cpp/)

1. Create Node project

```
mkdir node_llm
cd node_llm
npm init -y
```

2. Install dependencies

```
npm install -S node-llama-cpp
npm install @langchain/community @langchain/core
```

3. Download model

3.1. Request access to Llama models

    https://www.llama.com/llama-downloads/

3.2. Proceed download

```
git clone https://github.com/facebookresearch/llama.git
cd llama
./download.sh
```

4. Compile model

```
git clone https://github.com/ggerganov/llama.cpp.git
cd llama.cpp
make
python3 -m venv llama2
source llama2/bin/activate
python3 -m pip install -r requirements.txt
mkdir models/7B
python3 examples/convert_legacy_llama.py --outfile models/7B/ggml-model-f16.bin --outtype f16 ../llama/llama-2-7b
docker run -v ~/workspace/llama.cpp/models:/models ghcr.io/ggerganov/llama.cpp:full --all-in-one "/models" 7B
```

5. Test project

```
npm start
```
