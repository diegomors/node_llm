import readline from 'readline';
import { main as mainDictionary } from './index_dictionary.js';
import { main as mainLangchain } from './index_langchain.js';
import { main as mainLlamaindexGpt } from './index_llamaindex_gpt.js';
import { main as mainLlamaindexRagGpt } from './index_llamaindex_rag_gpt.js';
import { main as mainLlamaindexRagMixtral } from './index_llamaindex_rag_mixtral.js';

// Create a readline interface to take user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Define the prompt question
const promptQuestion = `
Choose which implementation you want to execute:
1. Dictionary
2. Langchain (Llama2 7B)
3. Langchain (Llama2 13B)
4. Llamaindex (OpenAI GPT3)
5. Llamaindex (RAG GPT4)
6. Llamaindex (RAG Mixtral)
Enter the number of your choice: `;

// Show prompt and handle user input
rl.question(promptQuestion, (answer) => {
    switch (answer) {
        case '1':
            console.log('Running Dictionary...');
            mainDictionary().then(() => {
                console.log('Dictionary executed successfully.');
                rl.close();
            }).catch(err => {
                console.error('Error executing Dictionary:', err);
                rl.close();
            });
            break;
        case '2':
            console.log('Running Langchain (Llama2 7B)...');
            mainLangchain(1).then(() => {
                console.log('Langchain (Llama2 7B) executed successfully.');
                rl.close();
            }).catch(err => {
                console.error('Error executing Langchain (Llama2 7B):', err);
                rl.close();
            });
            break;
        case '3':
            console.log('Running Langchain (Llama2 13B)...');
            mainLangchain(2).then(() => {
                console.log('Langchain (Llama2 13B) executed successfully.');
                rl.close();
            }).catch(err => {
                console.error('Error executing Langchain (Llama2 13B):', err);
                rl.close();
            });
            break;
        case '4':
            console.log('Running Llamaindex (OpenAI GPT3)...');
            mainLlamaindexGpt().then(() => {
                console.log('Llamaindex (OpenAI GPT3) executed successfully.');
                rl.close();
            }).catch(err => {
                console.error('Error executing Llamaindex (OpenAI GPT3):', err);
                rl.close();
            });
            break;
        case '5':
            console.log('Running Llamaindex (RAG GPT4)...');
            mainLlamaindexRagGpt().then(() => {
                console.log('Llamaindex (RAG GPT4) executed successfully.');
                rl.close();
            }).catch(err => {
                console.error('Error executing Llamaindex (RAG GPT4):', err);
                rl.close();
            });
            break;
        case '6':
            console.log('Running Llamaindex (RAG Mixtral)...');
            mainLlamaindexRagMixtral().then(() => {
                console.log('Llamaindex (RAG Mixtral) executed successfully.');
                rl.close();
            }).catch(err => {
                console.error('Error executing Llamaindex (RAG Mixtral):', err);
                rl.close();
            });
            break;
        default:
            console.log('Invalid choice. Please enter 1, 2, or 3.');
            rl.close();
    }
});