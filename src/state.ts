import { atom, selector, selectorFamily } from "recoil";
import { getLocation, getPhoneNumber, getUserInfo } from "zmp-sdk";
import logo from "static/logo.png";
import { Category } from "types/category";
import {
  Product,
  ProductsCategory,
  Pattern,
  Post,
  PatternItem,
} from "types/product";
import { Cart } from "types/cart";
import { Notification } from "types/notification";
import { calculateDistance } from "utils/location";
import { Store } from "types/delivery";
import { calcFinalPrice } from "utils/product";
import { wait } from "utils/async";
import categories from "../mock/categories.json";
import productsCategory from "../mock/productsCategory.json";
import patterns from "../mock/patterns.json";

export const userState = selector({
  key: "user",
  get: async () => {
    try {
      const { userInfo } = await getUserInfo({ autoRequestPermission: true });
      return userInfo;
    } catch (error) {
      return {
        id: "000000",
        avatar:
          "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/logoAvatar.png",
        name: "Người dùng Zalo",
      };
    }
  },
});

export const bannersState = selector({
  key: "banners",
  get: () => {
    return [
      "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/bannerOp1.png",
      "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/bannerOp2.png",
    ];
  },
});

export const categoriesState = selector<Category[]>({
  key: "categories",
  get: () => categories,
});

export const productsState = selector<Product[]>({
  key: "products",
  get: async ({ get }) => {
    try {
      const res = await fetch(
        `https://viet_tri_api.mkt-viettri.workers.dev/api/products/search/params?standard=yes`,
        {
          method: "GET",
        }
      );
      if (res.ok) {
        return res.json();
      } else {
        return [];
      }
    } catch (error) {
      return [];
    }
  },
});

export const recommendProductsState = selector<Product[]>({
  key: "recommendProducts",
  get: async ({ get }) => {
    try {
      const res = await fetch(
        `https://viet_tri_api.mkt-viettri.workers.dev/api/products/search/params?sale=yes`,
        {
          method: "GET",
        }
      );
      if (res.ok) {
        return res.json();
      } else {
        return [];
      }
    } catch (error) {
      return [];
    }
  },
});

export const productsCategoryState = selector<ProductsCategory[]>({
  key: "productsCategory",
  get: () => productsCategory,
});

export const patternsState = selector<Pattern[]>({
  key: "patterns",
  get: () => patterns,
});

export const postsState = selector<Post[]>({
  key: "posts",
  get: async () => {
    await wait(2000);
    const posts = (await import("../mock/posts.json")).default;
    return posts.map((post) => ({ ...post } as Post));
  },
});

export const newsState = selector<Post[]>({
  key: "news",
  get: async ({ get }) => {
    const res = await fetch(
      `https://viet_tri_api.mkt-viettri.workers.dev/api/posts/news`,
      {
        method: "GET",
      }
    );
    if (res.ok) {
      return res.json();
    } else {
      return [];
    }
  },
});

export const servicesState = selector<Post[]>({
  key: "services",
  get: async ({ get }) => {
    const res = await fetch(
      `https://viet_tri_api.mkt-viettri.workers.dev/api/posts/services`,
      {
        method: "GET",
      }
    );
    if (res.ok) {
      return res.json();
    } else {
      return [];
    }
  },
});

export const projectsState = selector<Post[]>({
  key: "projects",
  get: async ({ get }) => {
    const res = await fetch(
      `https://viet_tri_api.mkt-viettri.workers.dev/api/posts/projects`,
      {
        method: "GET",
      }
    );
    if (res.ok) {
      return res.json();
    } else {
      return [];
    }
  },
});

export const aboutUsState = selector<Post[]>({
  key: "aboutUs",
  get: async ({ get }) => {
    const res = await fetch(
      `https://viet_tri_api.mkt-viettri.workers.dev/api/posts/aboutUs`,
      {
        method: "GET",
      }
    );
    if (res.ok) {
      return res.json();
    } else {
      return [];
    }
  },
});

export const selectedCategoryIdState = atom({
  key: "selectedCategoryId",
  default: "thangTaiKhach",
});

export const selectedPatternIdState = atom({
  key: "selectedPatternId",
  default: "cabin",
});

export const productsByCategoryState = selectorFamily<Product[], string>({
  key: "productsByCategory",
  get:
    (categoryId) =>
    async ({ get }) => {
      const res = await fetch(
        `https://viet_tri_api.mkt-viettri.workers.dev/api/products/${categoryId}`,
        {
          method: "GET",
        }
      );
      if (res.ok) {
        return res.json();
      } else {
        return [];
      }
    },
});

export const patternsByCategoryState = selectorFamily<PatternItem[], string>({
  key: "patternsByCategory",
  get:
    (categoryId) =>
    async ({ get }) => {
      const res = await fetch(
        `https://viet_tri_api.mkt-viettri.workers.dev/api/patterns/${categoryId}`,
        {
          method: "GET",
        }
      );
      if (res.ok) {
        return res.json();
      } else {
        return [];
      }
    },
});

export const dataByTypeState = selectorFamily<
  Product[] | Post[] | Pattern[],
  string | undefined
>({
  key: "dataByType",
  get:
    (type) =>
    ({ get }) => {
      switch (type) {
        case "products":
          const productsList = get(productsState);
          return productsList;

        case "deal":
          const products = get(recommendProductsState);
          return products;
        case "catalogue":
          const catalogs = get(patternsState);
          return catalogs;
        case "projects":
          const projects = get(projectsState);
          return projects;
        case "news":
          const news = get(newsState);
          return news;
        case "services":
          const services = get(servicesState);
          return services;
        case "aboutUs":
          const aboutUs = get(aboutUsState);
          return aboutUs;
        default:
          return [];
      }
    },
});

export const postByIdState = selectorFamily<Post[], string | undefined>({
  key: "postById",
  get:
    (postId) =>
    ({ get }) => {
      if (postId?.includes("VTEA")) {
        const aboutUs = get(aboutUsState);
        return aboutUs.filter((posts) => posts.id === postId);
      }
      if (postId?.includes("VTEN")) {
        const news = get(newsState);
        return news.filter((posts) => posts.id === postId);
      }
      if (postId?.includes("VTES")) {
        const services = get(servicesState);
        return services.filter((posts) => posts.id === postId);
      }
      if (postId?.includes("VTEP")) {
        const projects = get(projectsState);
        return projects.filter((posts) => posts.id === postId);
      }
      return [];
    },
});

export const productByIdState = selectorFamily<Product, string | undefined>({
  key: "productById",
  get:
    (productId) =>
    async ({ get }) => {
      const res = await fetch(
        `https://viet_tri_api.mkt-viettri.workers.dev/api/products/search/params?id=${productId}`,
        {
          method: "GET",
        }
      );
      if (res.ok) {
        return res.json();
      } else {
        return {};
      }
    },
});

export const cartState = atom<any[]>({
  key: "cart",
  default: [],
});

export const profileState = atom<any[]>({
  key: "profile",
  default: [],
});

export const notificationsState = atom<Notification[]>({
  key: "notifications",
  default: [],
});

export const requestPhoneTriesState = atom({
  key: "requestPhoneTries",
  default: 0,
});

export const phoneState = selector<string | boolean>({
  key: "phone",
  get: async ({ get }) => {
    const requested = get(requestPhoneTriesState);
    if (requested) {
      const { number, token } = await getPhoneNumber({ fail: console.warn });
      if (number) {
        return number;
      }
      console.warn(
        "Sử dụng token này để truy xuất số điện thoại của người dùng",
        token
      );
      console.warn(
        "Chi tiết tham khảo: ",
        "https://mini.zalo.me/blog/thong-bao-thay-doi-luong-truy-xuat-thong-tin-nguoi-dung-tren-zalo-mini-app"
      );
      console.warn("Giả lập số điện thoại mặc định: 0337076898");
      return "0337076898";
    }
    return false;
  },
});
