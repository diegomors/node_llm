Task: Extract product information from the provided JSON data.

Fields to Extract:
    •	index: The position of the product in the list.
    •	id: The unique identifier of the product.
    •	brand: The brand or manufacturer name.
    •	name: The name of the product or strain, if applicable.
    •	category: The type or classification of the product.
    •	discount: Any discount available on the product.
    •	price: The product's price or value, if applicable.
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
        {
            "index":"1",
            "item_id":"12345",
            "productId":"ABCDE",
            "item_price":29.99,
            "brand_id":"ABCDE",
            "productBrand":"CoolBreeze",
            "price":27.99,
            "item_quantity":3,
            "quantity":2,
            "strain":"Super Haze",
            "category":"Edible",
            "item_category":"Gummy",
            "variant":".5g"
        }

    Output JSON:
        {
            "index":{"index":"1"},
            "id":{"item_id":"12345", "productId":"ABCDE", "brand_id":"ABCDE"},
            "brand":{"productBrand":"CoolBreeze"},
            "name":{"strain":"Super Haze"},
            "category":{"category":"Edible", "item_category":"Gummy"},
            "discount":{},
            "price":{"item_price":"29.99", "price":"27.99"},
            "quantity":{"item_quantity":"3", "quantity":"2"},
            "weight":{"variant":".5g"}
        }

Now process the following input JSON and provide the extracted output.

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