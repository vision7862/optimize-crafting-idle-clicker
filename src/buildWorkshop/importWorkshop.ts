import memoize from 'fast-memoize';
import { ACarIsBorn } from '../../products/ACarIsBorn';
import { AirCraft } from '../../products/AirCraft';
import { AlchemistsKitchen } from '../../products/AlchemistsKitchen';
import { ArtOfArtillery } from '../../products/ArtOfArtillery';
import { BoilerAlert } from '../../products/BoilerAlert';
import { BowToTheBowyer } from '../../products/BowToTheBowyer';
import { CommonLens } from '../../products/CommonLens';
import { CraftForFreedom } from '../../products/CraftForFreedom';
import { CraftOClock } from '../../products/CraftOClock';
import { CraftingALaCarte } from '../../products/CraftingALaCarte';
import { CraftsmansShip } from '../../products/CraftsmansShip';
import { CupidsWorkshop } from '../../products/CupidsWorkshop';
import { DiveMind } from '../../products/DiveMind';
import { DoneWhenItsGun } from '../../products/DoneWhenItsGun';
import { DrummingUpBusiness } from '../../products/DrummingUpBusiness';
import { EasterEggs } from '../../products/EasterEggs';
import { FromDustTillLawn } from '../../products/FromDustTillLawn';
import { GameChanger } from '../../products/GameChanger';
import { GameOfPhones } from '../../products/GameOfPhones';
import { HammerTime } from '../../products/HammerTime';
import { IdleFlicker } from '../../products/IdleFlicker';
import { LightClub } from '../../products/LightClub';
import { LockNLoad } from '../../products/LockNLoad';
import { MainWorkshopProducts } from '../../products/MainWorkshop';
import { PoleModel } from '../../products/PoleModel';
import { PowerOfPowder } from '../../products/PowerOfPowder';
import { PrinterIsComing } from '../../products/PrinterIsComing';
import { ProductCycle } from '../../products/ProductCycle';
import { RadioActivity } from '../../products/RadioActivity';
import { SantasWorkshop } from '../../products/SantasWorkshop';
import { SpaceCraft } from '../../products/SpaceCraft';
import { StockMyFridgeUp } from '../../products/StockMyFridgeUp';
import { StringProcessing } from '../../products/StringProcessing';
import { ThatsAKnife } from '../../products/ThatsAKnife';
import { TheNewWorld } from '../../products/TheNewWorld';
import { TheWorldIsMine } from '../../products/TheWorldIsMine';
import { TrainedToShip } from '../../products/TrainedToShip';
import { VitalScience } from '../../products/VitalScience';
import { WindItUp } from '../../products/WindItUp';
import { WorkshopOfHorrors } from '../../products/WorkshopOfHorrors';
import { BLUEPRINT_LIBRARY } from '../upgradeBlueprints/config/BlueprintLibrary';
import { convertBlueprintLibraryToScores } from '../upgradeBlueprints/helpers/blueprintScoreHelpers';
import { getOreOutputMultiplier } from './helpers/otherMultiplierHelpers';
import { ImportedProduct } from './types/ImportedProduct';
import { InputProduct, ProductDetails } from './types/Product';

const typeUpgradeCostMultiplier = new Map<string, number>([
  ['Ore', 1.07],
  ['Ingot', 1.08],
  ['SemiProduct', 1.09],
  ['EarlyProduct', 1.1],
  ['LateProduct', 1.11],
]);

const events = new Map<string, ImportedProduct[]>([
  ['A Car Is Born', ACarIsBorn],
  ['Air Craft', AirCraft],
  ['Alchemists Kitchen', AlchemistsKitchen],
  ['Art Of Artillery', ArtOfArtillery],
  ['Boiler Alert', BoilerAlert],
  ['Bow To The Bowyer', BowToTheBowyer],
  ['Common Lens', CommonLens],
  ['Craft For Freedom', CraftForFreedom],
  ['Crafting A La Carte', CraftingALaCarte],
  ['Craft O Clock', CraftOClock],
  ['Craftsmans Ship', CraftsmansShip],
  ['Cupids Workshop.', CupidsWorkshop],
  ['Dive Mind', DiveMind],
  ['Done When Its Gun', DoneWhenItsGun],
  ['Drumming Up Business', DrummingUpBusiness],
  ['Easter Eggs', EasterEggs],
  ['From Dust Till Lawn', FromDustTillLawn],
  ['Game Changer', GameChanger],
  ['Game Of Phones', GameOfPhones],
  ['Hammer Time', HammerTime],
  ['Idle Flicker', IdleFlicker],
  ['Light Club', LightClub],
  ['Lock N Load', LockNLoad],
  ['Pole Model', PoleModel],
  ['Power Of Powder', PowerOfPowder],
  ['Printer Is Coming', PrinterIsComing],
  ['Product Cycle', ProductCycle],
  ['Radio Activity', RadioActivity],
  ['Santas Workshop', SantasWorkshop],
  ['Space Craft', SpaceCraft],
  ['Stock My Fridge Up', StockMyFridgeUp],
  ['String Processing', StringProcessing],
  ['Thats A Knife', ThatsAKnife],
  ['The New World', TheNewWorld],
  ['The World Is Mine', TheWorldIsMine],
  ['Trained To Ship', TrainedToShip],
  ['Vital Science', VitalScience],
  ['Wind It Up', WindItUp],
  ['Workshop Of Horrors', WorkshopOfHorrors],
]);

export const importWorkshop = memoize(
  (onlyReturnBuildable: boolean, eventName?: string): Map<string, ProductDetails> => {
    const blueprintMap = convertBlueprintLibraryToScores(BLUEPRINT_LIBRARY);
    const oreMultiplier = getOreOutputMultiplier(eventName !== undefined);

    const products = new Map<string, ProductDetails>();
    const isEvent = eventName !== undefined;
    const importedProducts: ImportedProduct[] | Readonly<ImportedProduct[]> | undefined = isEvent
      ? events.get(eventName)
      : MainWorkshopProducts;
    if (importedProducts === undefined) {
      throw new Error(`event ${eventName ?? ''} does not exist.`);
    }
    importedProducts.forEach((product: ImportedProduct) => {
      const blueprintScore = blueprintMap.get(product.ProductType);
      const canBuildProductToGetBlueprint = product.Optional !== true;
      const haveBlueprint = blueprintScore !== undefined;
      if (canBuildProductToGetBlueprint || haveBlueprint || !onlyReturnBuildable || isEvent) {
        try {
          products.set(product.ProductType, {
            name: product.ProductType,
            outputCount:
              product.ProductAmount * (product.Tags?.includes('Ore') === true && !isEvent ? oreMultiplier : 1),
            researchCost: product.DiscoveryPrice,
            buildCost: product.ConstructionPrice,
            revenue: product.ProductPrice * (isEvent ? 1 : (blueprintScore ?? 10) / 10),
            upgradeCostMultiplier: typeUpgradeCostMultiplier.get(product.Type) ?? 1.09,
            input1: getInputProduct(
              product.LeftResourceType,
              product.LeftResourceAmount,
              products,
              onlyReturnBuildable,
            ),
            input2: getInputProduct(
              product.RightResourceType,
              product.RightResourceAmount,
              products,
              onlyReturnBuildable,
            ),
          });
        } catch (e) {
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          // console.info(`Cannot import ${details[0].split('x ')[1]} because ${e.message}`);
        }
      }
    });

    return products;
  },
);

export function getInputProduct(
  name: string | undefined,
  count: number | undefined,
  products: Map<string, ProductDetails>,
  onlyReturnBuildable: boolean,
): InputProduct | null {
  if (name === undefined || count === undefined) {
    return null;
  }

  if (products.get(name) !== undefined || !onlyReturnBuildable) {
    return { name, count };
  } else {
    throw new ReferenceError(`product ${name} does not exist`);
  }
}
