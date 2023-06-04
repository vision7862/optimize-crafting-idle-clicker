import { importProducts } from "./importProducts";
import { maxLevelShouldBe } from "./maxLevelShouldBe";
import { Workshop } from "./types/Workshop";

export function computeIdealLevelsForEvent() {
    const eventName: string = "From Dust Till Lawn";
    const products: Product[] = importProducts(eventName.replace(/\s/g,""));
    const workshop: Workshop = setUpWorkshop(products);
    const maxLvlProd1 = maxLevelShouldBe(products[1].buildCost, products[0]);
    return maxLvlProd1;
}

function setUpWorkshop(products: Product[]): Workshop {
    const levels = new Map<string, number>();
    const merchants = new Map<string, number>();
    for(let product of products) {
        levels.set(product.name, 0);
        merchants.set(product.name, 0);
    }

    return {
        products,
        productLevels: levels,
        productMerchants: merchants,
    }
}