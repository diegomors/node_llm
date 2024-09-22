// Import the LlamaCpp model from LangChain's community module
import { LlamaCpp } from "@langchain/community/llms/llama_cpp";

/**
 * The prompt that defines the task to extract specific product information from a provided JSON input.
 * It specifies fields to extract, the output format, and an example of how the input/output should be structured.
 */
const prompt = `
Task: Extract product information from the provided JSON data.

Fields to Extract:
    • index: The position of the product in the list.
    • id: The unique identifier of the product.
    • brand: The brand or manufacturer name.
    • name: The name of the product or strain, if applicable.
    • category: The type or classification of the product.
    • discount: Any discount available on the product.
    • price: The product's price or value, if applicable.
    • quantity: The number of product items.
    • weight: The weight of each unit of the product.

Output Requirements:
    • The output must be in JSON format.
    • Ensure all values are strings.
    • Group properties by their respective field names as key-value pairs.
    • Create separate entries for each product.
    • Include all specified fields in the output, even if some values are missing.

Input JSON:
    {
        "index": 1,
        "item_brand_id": "66eaf623-85f9-458d-8659-ba8e55a5647e",
        "item_brand_name": "Good Chemistry Nurseries",
        "item_category": "VAPORIZERS",
        "item_discount": 0,
        "item_discounted_value": 0,
        "item_id": "6584d9ba5269260001c26fed",
        "item_name": "Runtz | Live Rosin Vape Cartridge | 500mg",
        "item_potency_cbd": "",
        "item_potency_thc": "76.75%",
        "item_price": 35,
        "item_strain_type": "HYBRID",
        "item_subcategory": "CARTRIDGES",
        "item_value": 35,
        "item_variant": ".5g",
        "quantity": 1
    }
`;

/**
 * Function to initialize the LlamaCpp model based on the user's choice of model.
 * 
 * @param {string} modelChoice - The user's choice of the model ('1' for 7B, '2' for 13B).
 * @returns {Object} - An initialized LlamaCpp model instance based on the provided choice.
 * 
 * The function selects between the 7B and 13B models, adjusting the model path, 
 * the number of threads, max tokens, and other configuration settings.
 */
async function initModel(modelChoice) {
    let model;

    switch (modelChoice) {
        case '1':
            // Initialize the 7B model with specific settings
            console.log("Using 7B Model...");
            model = new LlamaCpp({
                modelPath: '../llama.cpp/models/7B/ggml-model-q4_0.bin',  // Path to the 7B model file
                nCtx: 4096,           // Context size for the input prompt
                temperature: 0.7,     // Controls randomness in the model's output
                maxTokens: 512,       // Maximum number of tokens to generate in the output
                nThreads: 4           // Number of CPU threads for processing
            });
            break;
        case '2':
            // Initialize the 13B model with specific settings
            console.log("Using 13B Model...");
            model = new LlamaCpp({
                modelPath: '../llama.cpp/models/13B/ggml-model-q4_0.bin',  // Path to the 13B model file
                nCtx: 4096,           // Context size for the input prompt
                temperature: 0.7,     // Controls randomness in the model's output
                maxTokens: 1024,      // Increased maximum number of tokens for larger outputs
                nThreads: 8           // More threads for better performance on the larger model
            });
            break;
        default:
            // Fallback to the default 7B model if an invalid choice is provided
            console.log("Invalid choice. Defaulting to 7B model...");
            model = new LlamaCpp({
                modelPath: '../llama.cpp/models/7B/ggml-model-q4_0.bin',  // Default to the 7B model
                nCtx: 4096,           // Context size for the input prompt
                temperature: 0.7,     // Controls randomness in the model's output
                maxTokens: 512,       // Maximum number of tokens to generate in the output
                nThreads: 4           // Number of CPU threads for processing
            });
    }

    return model;
}

/**
 * Main function to run the model and process the given prompt.
 * 
 * @param {string} modelChoice - The user's choice for the model ('1' for 7B, '2' for 13B).
 * 
 * This function initializes the selected model, sends the predefined prompt to the model, 
 * and logs the extracted product information to the console.
 */
export async function main(modelChoice) {
    // Initialize the model based on the user's input
    const model = await initModel(modelChoice);

    // Invoke the model with the defined prompt and wait for the response
    const extractedData = await model.invoke(prompt);

    // Log the extracted data to the console
    console.log('Extracted data:', extractedData);
}