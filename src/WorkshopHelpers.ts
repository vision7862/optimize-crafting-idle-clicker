import { ProductStatus, Workshop } from "./types/Workshop";

export function getProductLevel(product: Product, workshop: Workshop): number {
    const productStatus: ProductStatus | undefined = workshop.statuses.get(product.name);
    if (productStatus) {
        return productStatus.level
    } else {
        throw new Error("product " + product.name + " does not have a status.");
    }
}