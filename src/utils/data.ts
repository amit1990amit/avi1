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
   * Function to map attribute labels to variants
   * @param productData - The full product JSON object
   * @returns Array of variants with readable attributes
   */
  export const mapAttributesToVariantsNew = (productData: any): MappedVariant[] => {
    const attributes: Attribute[] = productData.data.attributes;
    const variants: Variant[] = productData.data.variants;
  
    // Create a mapping of attribute ID -> label ID -> label title
    const attributeMap: { [key: string]: { [key: string]: string } } = {};
  
    attributes.forEach((attr) => {
      attributeMap[attr.id] = {};
      attr.labels.forEach((label) => {
        attributeMap[attr.id][label.id] = label.title;
      });
    });
  
    // Process variants and replace label IDs with actual names
    return variants.map((variant) => {
      const mappedAttributes: { [key: string]: string } = {};
  
      variant.labels.forEach(({ attribute_id, label_id }: any) => {
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
  
//   // Example usage
//   const productData = /* Paste your JSON data here */;
//   const mappedVariants = mapAttributesToVariants(productData);
  
//   console.log(mappedVariants);
  

// Function to extract labels and their label_id from variants
export const extractVariantLabels = (data: any) => {
    const variants = data.data.variants;
    const attributes = data.data.attributes;
    return variants.map((variant: any) => {
      const labelMapping : any = {};
      const d = variant?.english_title
      
      variant.labels.forEach(({ attribute_id, label_id }: any) => {
        
        labelMapping[label_id] = { attribute_id, label_id, d };
      });
      return labelMapping;
    });
  };