import { importProducts } from "./importProducts";
import { maxLevelShouldBe } from "./maxLevelShouldBe";

export function computeIdealLevelsForEvent() {
    const eventName: string = "From Dust Till Lawn";
    const products = importProducts(eventName.replace(/\s/g,""));
    const maxLvlProd1 = maxLevelShouldBe(products[1].buildCost, products[0]);
    return maxLvlProd1;
}

console.log(computeIdealLevelsForEvent());