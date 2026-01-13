export class ProductModel {
    constructor(
        public readonly description: string,
        public readonly id: number,
        public readonly image: string,
        public readonly name: string,
        public readonly price: number,
        public readonly stock: number,
    ) { }
}