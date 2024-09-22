// List of product data to process
const inputData = [
    // Example 1: Product with various attributes
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
    // Example 2: Another product with slightly different field names
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
    // Example 3: Product with alternate field names
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
    // Example 4: Product with additional metadata
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

/**
 * Defines the mapping of output fields to possible input keys.
 * This is used to standardize the output regardless of varying input field names.
 * Each output field may correspond to multiple input keys in the input object.
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
 * Extracts mapped fields from a list of product objects.
 * This function processes an array of input objects and standardizes them by applying `extractFields` to each.
 *
 * @param {Array<Object>} inputList - An array of input JSON objects representing multiple products.
 * @returns {Array<Object>} - An array of transformed output JSON objects, with standardized field names.
 */
function extractFieldsFromList(inputList) {
    return inputList.map(item => extractFields(item));
}

/**
 * Extracts mapped fields from a single product object.
 * The function searches for the possible input keys defined in `fieldMappings` 
 * and builds a standardized output object with those fields.
 *
 * @param {Object} inputJson - The input JSON object representing a single product.
 * @returns {Object} - The transformed output JSON object with standardized field names.
 */
function extractFields(inputJson) {
    const output = {};

    // Iterate through field mappings and extract corresponding values
    for (const [field, keys] of Object.entries(fieldMappings)) {
        const fieldData = {};

        // Check if the input JSON contains any of the mapped keys for the current field
        keys.forEach(key => {
            if (inputJson.hasOwnProperty(key)) {
                fieldData[key] = String(inputJson[key]); // Convert field value to string for consistency
            }
        });

        // Assign extracted data for the field, even if it's empty
        output[field] = fieldData;
    }

    // Ensure all specified fields are present in the output, initialize as empty if missing
    for (const field of Object.keys(fieldMappings)) {
        if (!output.hasOwnProperty(field)) {
            output[field] = {}; // Add an empty object if no matching keys were found
        }
    }

    return output;
}

/**
 * Main function to perform field extraction from input data.
 * The input can be either a single JSON object or an array of JSON objects.
 * Depending on the input type, the appropriate extraction function is called.
 * 
 * If the input format is invalid (not an object or array), an error message is logged, and the process exits.
 * 
 * @returns {Promise<void>} - A promise that resolves when the extraction process completes.
 */
export function main() {
    return new Promise((resolve, reject) => {
        // Determine if input is a single object or an array of objects
        let extractedData;
        if (Array.isArray(inputData)) {
            extractedData = extractFieldsFromList(inputData); // Handle array input
        } else if (typeof inputData === 'object' && inputData !== null) {
            extractedData = extractFields(inputData); // Handle single object input
        } else {
            reject(new Error('Invalid input JSON format. Must be an object or an array of objects.'));
        }

        // Log the extracted data for further processing or output
        console.log('Extracted data:', extractedData);

        resolve();
    });
}