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
  protectionRail?: string;
  bollard?: string
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
  createdAt: number;
  editedAt?: number;
  image: string;
  price: number;
  categoryId: string;
  subCategory?: string;
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
  image: string;
  catalogImage?: string
}

export interface PatternItem {
  id: string;
  name: string;
  patternId: string;
  image: string;
  sections?: Section [];
  info?: Info;
  subId?: string
}

export interface Section {
  type: "paragraph" | "subheader" | "bulletList" | "image" | "space" | "header"
  content?: string [] 
}

export interface Post {
  id: string;
  title: string;
  type: "news" | "services" | "aboutUs" | "projects";
  thumbnail: string;
  author?: string;
  createdAt: number;
  editedAt?: number;
  sections?: Section []
}