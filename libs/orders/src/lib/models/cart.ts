export class Cart {
    items?: CartItem[];
}
export class CartItem {
    productId: any; 
    quantity: number; 

    constructor(productId: string, quantity: number) {
        this.productId = productId;
        this.quantity = quantity;
    }
}
export class CartItemDetailed{
    product: any; 
    quantity: number;

    constructor(product: any, quantity: number) {
        this.product = product;
        this.quantity = quantity;
    }
}