

// Import the required packages
import 'dotenv/config';  // For loading environment variables from a .env file
import {
    OpenAI,
    Settings,
    VectorStoreIndex,
    SimpleDirectoryReader
} from 'llamaindex';  // Importing the OpenAI class from llamaindex module

// Main function that processes documents and handles a query
export async function main() {
    // GPT-4o-2024-05-13 and Text-embedding-ada-002-v2
    Settings.llm = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY  // Retrieve API key from environment variables
    });

    // Load data from the specified directory (./data) using the SimpleDirectoryReader class
    const documents = await new SimpleDirectoryReader()
        .loadData({ directoryPath: "./data" });

    // Create a vector store index from the loaded documents
    const index = await VectorStoreIndex.fromDocuments(documents);

    // Initialize the query engine from the index for querying
    const queryEngine = index.asQueryEngine();

    // Query the index with a specific question and store the response
    const response = await queryEngine.query({
        query: `Extract following product information from the provided JSON data. The output format must be a JSON as well.

    • index: The position of the product in the list.
    • id: The unique identifier of the product.
    • brand: The brand or manufacturer name.
    • name: The name of the product or strain, if applicable.
    • category: The type or classification of the product.
    • discount: Any discount available on the product.
    • price: The product's price or value, if applicable.
    • quantity: The number of product items.
    • weight: The weight of each unit of the product.`
    });

    // Log the extracted response from the query engine, trimming any excess whitespace
    console.log("Extracted data:", response.toString());
}