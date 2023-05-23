import { Component, OnInit } from '@angular/core';
import { ProductsModel } from '../../products.model.';
import * as data from '../../products.model.'
@Component({
  selector: 'app-shoping',
  templateUrl: './shoping.component.html',
  styleUrls: ['./shoping.component.css']
})
export class ShopingComponent implements OnInit {
products:any 
  constructor (){
  this.products = data
  }

  ngOnInit(): void {
  }

  addToCart(productId,productQty){    
  }


}
