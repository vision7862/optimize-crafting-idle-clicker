type Product = {
    name: string;
    researchCost: number;
    buildCost: number;
    revenue: number;
    outputCount: number;
    input1Count: number;
    input1Product: Product | null;
    input2Count: number;
    input2Product: Product | null;
}