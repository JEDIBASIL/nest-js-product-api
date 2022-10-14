import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { ProductService } from "./product.service";

@Controller('products')
export class ProductController {
    constructor(private readonly ProductService:ProductService){}
    @Post()
    addProducts(
        // @Body() completeBody: {productTitle:string, productDescription:string, productPrice:number}
            // OR

        @Body('title') productTitle:string, 
        @Body('description') productDescription:string, 
        @Body('price') productPrice:number, 
        
        )
        {return  this.ProductService.insertProduct(productTitle, productDescription, productPrice);}

    @Get()
    getAllProducts() {return this.ProductService.getProducts()}; 
    

    @Get(":id")
    getAllProduct(@Param("id") productId:string) {return this.ProductService.getProduct(productId);}
    
    @Patch(":id")
    updateProduct(
        @Param("id") productId:string, 
        @Body('title') productTitle:string, 
        @Body('description') productDescription:string, 
        @Body('price') productPrice:number){
        this.ProductService.updateProduct(productId,productTitle, productDescription, productPrice)
        return {status:"success",message:"prouduct updated successfully", productId};
        }

    @Delete(":id")
    deleteProduct(@Param("id") productId:string){
        this.ProductService.deleteProduct(productId)
        return {status:"success",message:"prouduct deleted successfully", productId};
    }
    
}