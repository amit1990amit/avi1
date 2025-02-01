export const getImageByUrl = (url: string) => {
    return `https://fedtest.bylith.com/api/imager.php?url=${url}&type=fit&width=1000&height=1000&quality=70`
}


interface Label {
    id: string;
    title: string;
    data: string;
}

interface Attribute {
    id: string;
    title: string;
    type: string;
    labels: Label[];
}

interface Variant {
    id: string;
    title: string;
    image: { title: string; url: string };
    price: string;
    labels: { attribute_id: string; label_id: string }[];
}

interface MappedVariant {
    id: string;
    title: string;
    image: string;
    price: string;
    attributes: { [key: string]: string }; // Example: { "Color": "Black", "Waist Size": "30" }
}

/**
 * Function to connect attributes to variants
 * @param variants - List of product variants
 * @param attributes - List of attributes (color, waist, leg, fabric)
 * @returns Array of mapped variants with human-readable attributes
 */
export const mapAttributesToVariants = (variants: Variant[], attributes: Attribute[]): MappedVariant[] | undefined => {

    if (!variants || variants.length === 0 || !attributes || attributes.length === 0) {
        return
    }
    // Create a mapping of attribute ID -> label ID -> label name
    const attributeMap: { [key: string]: { [key: string]: string } } = {};

    attributes.forEach((attr) => {
        attributeMap[attr.id] = {};
        attr.labels.forEach((label) => {
            attributeMap[attr.id][label.id] = label.title;
        });
    });

    // variants && variants.length > 0 && variants.forEach((element: any) => console.log(element));
    // console.log(' attributeMap ', attributeMap, attributes);



    // Process variants to replace label IDs with actual names
    return variants.map((variant) => {
        const mappedAttributes: { [key: string]: string } = {};

        variant.labels.forEach(({ attribute_id, label_id }) => {
            if (attributeMap[attribute_id] && attributeMap[attribute_id][label_id]) {
                const attributeName = attributes.find((attr) => attr.id === attribute_id)?.title || "Unknown";
                mappedAttributes[attributeName] = attributeMap[attribute_id][label_id];
            }
        });

        return {
            id: variant.id,
            title: variant.title,
            image: variant.image.url,
            price: variant.price,
            attributes: mappedAttributes,
        };
    });
};


// Example Usage
//   const mappedVariants = mapAttributesToVariants(variants, attributes);
//   console.log(mappedVariants);


interface Variant {
    id: string;
    labels: { attribute_id: string; label_id: string }[];
}

// Function to get all possible attribute combinations
export const generateAllAttributeCombinations = (attributes: Attribute[]): { [key: string]: string }[] => {
    const attributeOptions: { [key: string]: string[] } = {};

    // Extract all attribute labels
    attributes.forEach((attribute) => {
        attributeOptions[attribute.title] = attribute.labels.map((label) => label.title);
    });

    // Get all possible combinations using a recursive approach
    const generateCombinations = (keys: string[], index: number, current: { [key: string]: string }): { [key: string]: string }[] => {
        if (index === keys.length) return [current];

        const key = keys[index];
        const results: { [key: string]: string }[] = [];

        attributeOptions[key].forEach((value) => {
            results.push(...generateCombinations(keys, index + 1, { ...current, [key]: value }));
        });

        return results;
    };

    return generateCombinations(Object.keys(attributeOptions), 0, {});
};

// Function to check if a combination exists in the given variants
export const filterExistingVariants = (combinations: { [key: string]: string }[], variants: Variant[], attributes: Attribute[]) => {
    // Create a lookup map for existing variants
    const variantSet = new Set(
        variants.map((variant) =>
            JSON.stringify(
                variant.labels.reduce((acc, { attribute_id, label_id }) => {
                    const attributeTitle = attributes.find((attr) => attr.id === attribute_id)?.title;
                    const labelTitle = attributes
                        .find((attr) => attr.id === attribute_id)
                        ?.labels.find((label) => label.id === label_id)?.title;
                    if (attributeTitle && labelTitle) acc[attributeTitle] = labelTitle;
                    return acc;
                }, {} as { [key: string]: string })
            )
        )
    );

    // Filter only valid combinations that exist in the variants list
    return combinations.filter((combination) => variantSet.has(JSON.stringify(combination)));
};


export const add3Dots = (string: string, limit: number) => {
    var dots = "...";
    if (string.length > limit) {
        // you can also use substr instead of substring
        string = string.substring(0, limit) + dots;
    }

    return string;
}