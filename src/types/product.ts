export interface PercentSale {
  type: "percent";
  percent: number;
}

export interface FixedSale {
  amount: number;
  type: "fixed";
}

export type Sale = PercentSale | FixedSale;

export interface Info {
  ceiling?: string;
  frontWall?: string;
  sideWall?: string;
  backWall?: string;
  handrail?: string;
  cabinDoor?: string;
  lobby?: string;
  floors?: string;
  gfnf?: string;
  cabinFloor?: string;
  cabinDoorType?: string;
  floorDoor?: string;
}

export interface TechInfo {
  techSpec?:Section[];
  techDrawing?: Section[];
  spec?: Section[];
  power?: Section[];
  shaft?: Section[];
  images?: Section[];
  videos?: Section[];
}

export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  categoryId: string;
  refImages?: string[];
  sale?: Sale;
  info?: Info;
  techInfo?: TechInfo
}

export interface ProductsCategory {
  lable: string;
  image: string;
  categoryId: string;
}

export interface Pattern {
  id: string;
  lable: string;
  image: string
}

export interface PatternItem {
  id: string;
  name: string;
  patternId: string;
  image: string;
}

export interface Section {
  type: "paragraph" | "subheader" | "bulletList" | "image" | "space" | "header"
  content?: string [] 
}

export interface Post {
  id: string;
  title: string;
  type: "news" | "services" | "aboutUs"
  thumbnail: string;
  author?: string;
  createAt?: string;
  editedAt?: string;
  sections?: Section []
}