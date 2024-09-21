import { LlamaCpp } from "@langchain/community/llms/llama_cpp";

const llamaPath = "../llama.cpp/models/7B/ggml-model-q4_0.bin";
const question = "Where do Llamas come from?";

const model = new LlamaCpp({ modelPath: llamaPath });

console.log(`You: ${question}`);
const response = await model.invoke(question);
console.log(`AI : ${response}`);