type Product = {
    name: string;
    researchCost: number;
    buildCost: number;
    revenue: number;
    outputCount: number;
    input1: InputProduct | null;
    input2: InputProduct | null;
}

type InputProduct = {
    product: Product,
    count: number;
}