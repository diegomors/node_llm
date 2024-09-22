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