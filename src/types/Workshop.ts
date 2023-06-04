export type Workshop = {
    products: Product[];
    productLevels: Map<string, number>;
    productMerchants: Map<string, number>;
}