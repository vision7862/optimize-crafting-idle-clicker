import { importProducts } from "./importProducts";
import { maxLevelShouldBe } from "./maxLevelShouldBe";

export function computeIdealLevelsForEvent() {
    const eventName: string = "From Dust Till Lawn";
    const products = importProducts(eventName.replace(/\s/g,""));
    const product2 = products[1];
    const maxLvlProd1 = maxLevelShouldBe(product2.buildCost, products[0].outputCount, products[0].revenue, products[0].buildCost);
    return maxLvlProd1;
}

console.log(computeIdealLevelsForEvent());