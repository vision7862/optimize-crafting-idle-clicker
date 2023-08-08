import { ImportedProduct } from "../src/buildWorkshop/types/ImportedProduct";

export const TrainedToShip: ImportedProduct[] = [
  { "ProductType" : "Wood", "Icon" : "Items/BaseProducts/Wood", "ProductAmount" : 1, "Duration" : 5, "ConstructionPrice" : 10, "ProductPrice" : 1, "DiscoveryPrice" : 1, "Type": "Ore" },
  { "ProductType" : "Planks", "Icon" : "Items/EventProducts/Planks", "ProductAmount" : 4, "LeftResourceType" : "Wood", "LeftResourceAmount" : 1, "Duration" : 5, "ConstructionPrice" : 75, "ProductPrice" : 5, "DiscoveryPrice" : 10, "Type": "Ingot" },
  { "ProductType" : "Coal", "Icon" : "Items/BaseProducts/Coal", "ProductAmount" : 3, "Duration" : 5, "ConstructionPrice" : 2500, "ProductPrice" : 20, "DiscoveryPrice" : 50, "Type": "Ore" },
  { "ProductType" : "Iron Ore", "Icon" : "Items/BaseProducts/IronOre", "ProductAmount" : 2, "Duration" : 5, "ConstructionPrice" : 20000, "ProductPrice" : 150, "DiscoveryPrice" : 100, "Type": "Ore" },
  { "ProductType" : "Iron Ingots", "Icon" : "Items/BaseProducts/IronIngots", "ProductAmount" : 5, "LeftResourceType" : "Coal", "LeftResourceAmount" : 3, "RightResourceType" : "Iron Ore", "RightResourceAmount" : 2, "Duration" : 5, "ConstructionPrice" : 150000, "ProductPrice" : 400, "DiscoveryPrice" : 500, "Type": "Ingot" },
  { "ProductType" : "Iron Rivets", "Icon" : "Items/BaseProducts/IronRivets", "ProductAmount" : 5, "LeftResourceType" : "Iron Ingots", "LeftResourceAmount" : 1, "Duration" : 5, "ConstructionPrice" : 2000000, "ProductPrice" : 800, "DiscoveryPrice" : 1000, "Type": "SemiProduct" },
  { "ProductType" : "Mechanical Parts", "Icon" : "Items/AdditionalProducts/Cogs", "ProductAmount" : 2, "LeftResourceType" : "Wood", "LeftResourceAmount" : 2, "RightResourceType" : "Iron Rivets", "RightResourceAmount" : 8, "Duration" : 5, "ConstructionPrice" : 15000000, "ProductPrice" : 15000, "DiscoveryPrice" : 2000, "Type": "SemiProduct" },
  { "ProductType" : "Boiler", "Icon" : "Items/EventProducts/Boiler", "ProductAmount" : 1, "LeftResourceType" : "Iron Ingots", "LeftResourceAmount" : 4, "RightResourceType" : "Iron Rivets", "RightResourceAmount" : 10, "Duration" : 5, "ConstructionPrice" : 100000000, "ProductPrice" : 60000, "DiscoveryPrice" : 5000, "Type": "EarlyProduct" },
  { "ProductType" : "Steel", "Icon" : "Items/BaseProducts/Steel", "ProductAmount" : 1, "LeftResourceType" : "Coal", "LeftResourceAmount" : 4, "RightResourceType" : "Iron Ingots", "RightResourceAmount" : 2, "Duration" : 5, "ConstructionPrice" : 900000000, "ProductPrice" : 400000, "DiscoveryPrice" : 10000, "Type": "Ingot" },
  { "ProductType" : "Machine Parts", "Icon" : "Items/AdditionalProducts/MachineParts", "ProductAmount" : 2, "LeftResourceType" : "Steel", "LeftResourceAmount" : 1, "Duration" : 5, "ConstructionPrice" : 8000000000, "ProductPrice" : 750000, "DiscoveryPrice" : 20000, "Type": "SemiProduct" },
  { "ProductType" : "Motor Unit", "Icon" : "Items/AdditionalProducts/MotorUnit", "ProductAmount" : 1, "LeftResourceType" : "Iron Ingots", "LeftResourceAmount" : 2, "RightResourceType" : "Machine Parts", "RightResourceAmount" : 1, "Duration" : 5, "ConstructionPrice" : 50000000000, "ProductPrice" : 5000000, "DiscoveryPrice" : 50000, "Type": "SemiProduct" },
  { "ProductType" : "Steam Engine", "Icon" : "Items/AdditionalProducts/SteamEngine", "ProductAmount" : 1, "LeftResourceType" : "Boiler", "LeftResourceAmount" : 1, "RightResourceType" : "Motor Unit", "RightResourceAmount" : 1, "Duration" : 5, "ConstructionPrice" : 300000000000, "ProductPrice" : 20000000, "DiscoveryPrice" : 100000, "Type": "EarlyProduct" },
  { "ProductType" : "Steel Plate", "Icon" : "Items/EventProducts/SteelPlate", "ProductAmount" : 4, "LeftResourceType" : "Steel", "LeftResourceAmount" : 1, "Duration" : 5, "ConstructionPrice" : 2000000000000, "ProductPrice" : 25000000, "DiscoveryPrice" : 150000, "Type": "SemiProduct" },
  { "ProductType" : "Wheel", "Icon" : "Items/EventProducts/Wheel", "ProductAmount" : 2, "LeftResourceType" : "Iron Rivets", "LeftResourceAmount" : 10, "RightResourceType" : "Steel", "RightResourceAmount" : 1, "Duration" : 5, "ConstructionPrice" : 9000000000000, "ProductPrice" : 200000000, "DiscoveryPrice" : 200000, "Type": "EarlyProduct" },
  { "ProductType" : "Boat Hull", "Icon" : "Items/EventProducts/BoatHull", "ProductAmount" : 1, "LeftResourceType" : "Planks", "LeftResourceAmount" : 12, "RightResourceType" : "Steel Plate", "RightResourceAmount" : 6, "Duration" : 5, "ConstructionPrice" : 60000000000000, "ProductPrice" : 900000000, "DiscoveryPrice" : 250000, "Type": "EarlyProduct" },
  { "ProductType" : "Paddle Wheel", "Icon" : "Items/EventProducts/PaddleWheel", "ProductAmount" : 1, "LeftResourceType" : "Wood", "LeftResourceAmount" : 4, "RightResourceType" : "Mechanical Parts", "RightResourceAmount" : 4, "Duration" : 5, "ConstructionPrice" : 300000000000000, "ProductPrice" : 3000000000, "DiscoveryPrice" : 300000, "Type": "SemiProduct" },
  { "ProductType" : "Train Chassis", "Icon" : "Items/EventProducts/TrainChassis", "ProductAmount" : 1, "LeftResourceType" : "Iron Rivets", "LeftResourceAmount" : 12, "RightResourceType" : "Steel Plate", "RightResourceAmount" : 8, "Duration" : 5, "ConstructionPrice" : 1500000000000000, "ProductPrice" : 8000000000, "DiscoveryPrice" : 350000, "Type": "SemiProduct" },
  { "ProductType" : "Running Gear", "Icon" : "Items/EventProducts/RunningGear", "ProductAmount" : 1, "LeftResourceType" : "Machine Parts", "LeftResourceAmount" : 6, "RightResourceType" : "Wheel", "RightResourceAmount" : 6, "Duration" : 5, "ConstructionPrice" : 7500000000000000, "ProductPrice" : 40000000000, "DiscoveryPrice" : 400000, "Type": "EarlyProduct" },
  { "ProductType" : "Boat Engine", "Icon" : "Items/EventProducts/BoatEngine", "ProductAmount" : 1, "LeftResourceType" : "Steam Engine", "LeftResourceAmount" : 1, "RightResourceType" : "Paddle Wheel", "RightResourceAmount" : 2, "Duration" : 5, "ConstructionPrice" : 40000000000000000, "ProductPrice" : 200000000000, "DiscoveryPrice" : 450000, "Type": "SemiProduct" },
  { "ProductType" : "Steam Boat", "Icon" : "Items/AdditionalProducts/SteamBoat", "ProductAmount" : 1, "LeftResourceType" : "Boat Hull", "LeftResourceAmount" : 1, "RightResourceType" : "Boat Engine", "RightResourceAmount" : 1, "Duration" : 5, "ConstructionPrice" : 200000000000000000, "ProductPrice" : 700000000000, "DiscoveryPrice" : 500000, "Type": "LateProduct" },
  { "ProductType" : "Train Engine", "Icon" : "Items/EventProducts/TrainEngine", "ProductAmount" : 1, "LeftResourceType" : "Steam Engine", "LeftResourceAmount" : 1, "RightResourceType" : "Running Gear", "RightResourceAmount" : 1, "Duration" : 5, "ConstructionPrice" : 1500000000000000000, "ProductPrice" : 3000000000000, "DiscoveryPrice" : 600000, "Type": "SemiProduct" },
  { "ProductType" : "Locomotive", "Icon" : "Items/AdditionalProducts/Locomotive", "ProductAmount" : 1, "LeftResourceType" : "Train Chassis", "LeftResourceAmount" : 1, "RightResourceType" : "Train Engine", "RightResourceAmount" : 1, "Duration" : 5, "ConstructionPrice" : 5000000000000000000, "ProductPrice" : 10000000000000, "DiscoveryPrice" : 700000, "Type": "LateProduct" }
]