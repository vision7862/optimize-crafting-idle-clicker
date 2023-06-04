export type Workshop = {
    products: Map<string, Product>;
    statuses: Map<string, ProductStatus>;
}

export type ProductStatus = {
    level: number;
    merchants: number;
}