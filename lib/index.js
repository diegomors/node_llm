// extractor.js

import fs from 'fs';
import path from 'path';

/**
 * Define the mapping of output fields to possible input keys
 */
const fieldMappings = {
    "index": ["index"],
    "id": ["item_id", "productId", "brand_id", "item_brand_id"],
    "brand": ["productBrand", "item_brand_name"],
    "name": ["name", "strain", "item_name"],
    "category": ["category", "item_category", "item_subcategory"],
    "discount": ["discount", "item_discount", "item_discounted_value"],
    "price": ["price", "item_price", "item_value"],
    "quantity": ["quantity", "item_quantity"],
    "weight": ["variant", "item_variant"]
};

/**
 * Extract fields from a single product
 * @param {Object} inputJson - The input JSON object representing a single product
 * @returns {Object} - The transformed output JSON object
 */
function extractFields(inputJson) {
    const output = {};

    for (const [field, keys] of Object.entries(fieldMappings)) {
        const fieldData = {};

        keys.forEach(key => {
            if (inputJson.hasOwnProperty(key)) {
                fieldData[key] = String(inputJson[key]);
            }
        });

        output[field] = fieldData;
    }

    // Ensure all specified fields are present in the output
    for (const field of Object.keys(fieldMappings)) {
        if (!output.hasOwnProperty(field)) {
            output[field] = {};
        }
    }

    return output;
}

/**
 * Extract fields from a list of products
 * @param {Array} inputList - An array of input JSON objects representing multiple products
 * @returns {Array} - An array of transformed output JSON objects
 */
function extractFieldsFromList(inputList) {
    return inputList.map(item => extractFields(item));
}

/**
 * Read JSON data from a file
 * @param {string} filePath - Path to the JSON file
 * @returns {Object|Array} - Parsed JSON data
 */
function readJsonFile(filePath) {
    const absolutePath = path.resolve(filePath);
    const rawData = fs.readFileSync(absolutePath, 'utf-8');
    return JSON.parse(rawData);
}

/**
 * Write JSON data to a file
 * @param {string} filePath - Path to the output JSON file
 * @param {Object|Array} data - Data to write
 */
function writeJsonFile(filePath, data) {
    const absolutePath = path.resolve(filePath);
    const jsonData = JSON.stringify(data, null, 4); // 4-space indentation for readability
    fs.writeFileSync(absolutePath, jsonData, 'utf-8');
    console.log(`Data successfully written to ${absolutePath}`);
}

/**
 * Main function to perform extraction
 */
function main() {
    // Define input and output file paths
    // const inputFilePath = path.join(__dirname, 'input.json');
    // const outputFilePath = path.join(__dirname, 'output.json');

    // Read the input JSON data
    // let inputData;
    // try {
    //     inputData = readJsonFile(inputFilePath);
    // } catch (error) {
    //     console.error(`Error reading input file: ${error.message}`);
    //     process.exit(1);
    // }

    let inputData = [
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

    // Determine if input is a single object or an array
    let extractedData;
    if (Array.isArray(inputData)) {
        extractedData = extractFieldsFromList(inputData);
    } else if (typeof inputData === 'object' && inputData !== null) {
        extractedData = extractFields(inputData);
    } else {
        console.error('Invalid input JSON format. Must be an object or an array of objects.');
        process.exit(1);
    }

    console.log(extractedData);

    // Write the extracted data to the output file
    // try {
    //     writeJsonFile(outputFilePath, extractedData);
    // } catch (error) {
    //     console.error(`Error writing output file: ${error.message}`);
    //     process.exit(1);
    // }
}

// Execute the main function
main();