import { LlamaCpp } from "@langchain/community/llms/llama_cpp";

// const model = new LlamaCpp({
//     modelPath: '../llama.cpp/models/7B/ggml-model-q4_0.bin',
//     nCtx: 4096,
//     temperature: 0.7,
//     maxTokens: 512, // Adjust this value as needed
//     nThreads: 4, // Adjust based on your CPU
// });

const model = new LlamaCpp({
    modelPath: '../llama.cpp/models/13B/ggml-model-q4_0.bin',
    nCtx: 4096,
    temperature: 0.7,
    maxTokens: 1024, // Adjust this value as needed
    nThreads: 8, // Adjust based on your CPU
});

const promptTemplate = `
Task: Extract product information from the provided JSON data.

Fields to Extract:
    •	index: The position of the product in the list.
    •	id: The unique identifier of the product.
    •	brand: The brand or manufacturer name.
    •	name: The name of the product or strain, if applicable.
    •	category: The type or classification of the product.
    •	discount: Any discount available on the product.
    •	price: The product\'s price or value, if applicable.
    •	quantity: The number of product items.
    •	weight: The weight of each unit of the product.

Output Requirements:
    •	The output must be in JSON format.
    •	Ensure all values are strings.
    •	Group properties by their respective field names as key-value pairs.
    •	Create separate entries for each product.
    •	Include all specified fields in the output, even if some values are missing.

Example:
    Input JSON:
        {inputExample}

    Output JSON:
        {outputExample}

Now process the following input JSON and provide the extracted output.

Input JSON:
    {inputJSON}
`;

async function extractProductData(inputJSON, inputExample, outputExample) {
    const prompt = promptTemplate.replace('{inputJSON}', JSON.stringify(inputJSON))
        .replace('{inputExample}', JSON.stringify(inputExample))
        .replace('{outputExample}', JSON.stringify(outputExample));

    const response = await model.invoke(prompt);

    // Clear the model response
    const cleanedResponse = response.trim();

    console.log(cleanedResponse);

    // Remove markdown code blocks if they exist
    // if (cleanedResponse.startsWith('```json')) {
    //     cleanedResponse = cleanedResponse.replace(/```json([\s\S]*?)```/g, '$1').trim();
    // } else if (cleanedResponse.startsWith('```')) {
    //     cleanedResponse = cleanedResponse.replace(/```([\s\S]*?)```/g, '$1').trim();
    // }

    // Parse the model response
    // let extractedData;
    // try {
    //     extractedData = JSON.parse(cleanedResponse);
    // } catch (error) {
    //     console.error('Error parsing model response:', error);
    //     extractedData = {};
    // }

    // return extractedData;
}

(async () => {
    const inputExample = {
        "index": "1",
        "item_id": "12345",
        "productId": "ABCDE",
        "item_price": 29.99,
        "brand_id": "ABCDE",
        "productBrand": "CoolBreeze",
        "price": 27.99,
        "item_quantity": 3,
        "quantity": 2,
        "strain": "Super Haze",
        "category": "Edible",
        "item_category": "Gummy",
        "variant": ".5g"
    };
    const outputExample = {
        "index": { "index": "1" },
        "id": { "item_id": "12345", "productId": "ABCDE", "brand_id": "ABCDE" },
        "brand": { "productBrand": "CoolBreeze" },
        "name": { "strain": "Super Haze" },
        "category": { "category": "Edible", "item_category": "Gummy" },
        "discount": {},
        "price": { "item_price": "29.99", "price": "27.99" },
        "quantity": { "item_quantity": "3", "quantity": "2" },
        "weight": { "variant": ".5g" }
    };

    const inputDataArray = [
        // Example 1
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
        },
        // Example 2
        {
            "item_brand": "District Cannabis",
            "item_category": "Pre-Rolls",
            "item_category_2": "singles",
            "item_id": "662340368c74980001365d25",
            "item_list_name": "CategoryPage > Native > Menu",
            "item_name": "District Cannabis Preroll (.5g) Spritzer",
            "item_variant": ".5g",
            "price": 5,
            "quantity": 2
        },
        // Example 3
        {
            "id": "bf969a8364cf5961",
            "name": "(AU) BLACKBERRY LAVENDER SLEEP - 1:2 THC/CBN GUMMIES",
            "productBrand": "TREETOWN",
            "productCannabisComplianceType": "EDIBLES",
            "productCannabisType": "HYBRID",
            "productCategoryName": "Edibles",
            "productId": "bf969a8364cf5961",
            "productName": "(AU) BLACKBERRY LAVENDER SLEEP - 1:2 THC/CBN GUMMIES",
            "productPrice": 15,
            "productQuantity": 0,
            "productSubType": "Gummy",
            "quantity": 4
        },
        // Example 4
        {
            "affiliation": "Green Koi (Rec)",
            "index": 0,
            "item_attribution": "Other",
            "item_brand": "TREETOWN",
            "item_category": "Edibles",
            "item_category2": "Gummy",
            "item_id": "bf969a8364cf5961",
            "item_name": "(AU) BLACKBERRY LAVENDER SLEEP - 1:2 THC/CBN GUMMIES",
            "location_id": "00e7c31eac73f4d2",
            "price": 15,
            "quantity": 0
        }
    ];

    for (const inputData of inputDataArray) {
        const extractedData = await extractProductData(inputData, inputExample, outputExample);
        console.log('Extracted data:', extractedData);
    }
})();