from transformers import AutoTokenizer, AutoModel

# Download the model and tokenizer
tokenizer = AutoTokenizer.from_pretrained("BAAI/bge-small-en-v1.5")
model = AutoModel.from_pretrained("BAAI/bge-small-en-v1.5")

# This will save the model in the default Hugging Face cache directory