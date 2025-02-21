import { JSX } from "react"
import { Product } from "./item"

export interface SearchOperation {
    id: string
    title: string
    description: string
    icon: JSX.Element
    action: string
  }
  
  
  export type SearchResult = {
    operations: SearchOperation[]
    products: Product[]
  }