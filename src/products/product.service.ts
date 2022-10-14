import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";
import {v4 as uuid} from "uuid";

@Injectable()
export class ProductService{
   private products: Product[] = [];

    insertProduct(title: string, description: string, price: number){
        const productId = uuid();
        const newProduct = new Product(productId,title,description, price);
        this.products = [...this.products, newProduct];
        return {status:"success",message:"prouduct added successfully", productId};
    }

    getProducts(){
        return [...this.products]
    }

    getProduct(productId:string){
        const product = this.findProduct(productId)[0]
        return product;
    }

    updateProduct(productId:string,title: string, description: string, price: number){
        // const product = this.findProduct(productId)[0]
        // const productIndex = this.findProduct(productId)[1]
        // OR
        const [product, index] = this.findProduct(productId)
        const updateProduct = {...product};
        if(title) updateProduct.title = title
        if(description) updateProduct.description = description
        if(price) updateProduct.price = price
        this.products[index] = updateProduct
    }

    deleteProduct(productId:string){
        const [product, index] = this.findProduct(productId)
        this.products.splice(index,1)
    }

     private findProduct(productId:string):[Product, number]{
        const productIndex = this.products.findIndex((product)=>product.id == productId)
        const product = this.products[productIndex]
        if(!product) throw new NotFoundException("could not find user ") //return {status:"failed",message:"no product found", productId}
        return [product, productIndex];
     }
}