import { Request, Response } from "express";
import { ArticleModel } from "../../models/articleModel.ts";

interface IQuery {
  service: string;
  priceMin: string | number;
  priceMax: string | number;

  state: string;
  city: string;
  sort: "По популярности" | "По рейтингу" | "По цене";

  page: number;
}

export const getWithSorting = async (req: Request<{}, {}, {}, IQuery>, res: Response) => {
  try {
    const { service, priceMin, priceMax, state, city, sort, page } = req.query;

    const query = ArticleModel.find();

    if (service) {
      const serviceArray = service.split(",");
      query.where("service").in(serviceArray);
    }

    if (priceMin || priceMax) {
      const minPrice = Number(priceMin as string) || 0;
      const maxPrice = Number(priceMax as string) || 1000;

      query.or([
        { // outer range
          $and: [
            { priceMin: { $gte: minPrice } },
            { priceMax: { $lte: maxPrice } }
          ]
        },

        { // inner range
          $and: [
            { priceMin: { $lte: minPrice } },
            { priceMax: { $gte: maxPrice } }
          ]
        },

        { // right range
          $and: [
            { priceMax: { $gte: minPrice } },
            { priceMax: { $lte: maxPrice } }
          ]
        },

        { // left range
          $and: [
            { priceMin: { $gte: minPrice } },
            { priceMin: { $lte: maxPrice } }
          ]
        }
      ]);
    }

    if (sort === "По цене") {
      query.sort({ priceMin: 1 })
    }

    if (sort === "По популярности") {
      query.sort({ viewsCount: -1 })
    }

    if (sort === "По рейтингу") {
      query.sort({ rating: -1 })
    }

    const PERPAGE = 9;
    const PAGE = page ?? 0;
    const SKIP = PAGE * PERPAGE;

    let articles = await query.populate("ownerId").exec();

    if (state) {
      articles = articles.filter(item => item.ownerId?.state === state)
    }

    if (state && city) {
      articles = articles.filter(item => item.ownerId?.city === city)
    }

    const totalDocuments = articles.length;

    articles = articles.slice(SKIP, SKIP + PERPAGE);

    return res.json({ articles, totalDocuments })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ err: "Что-то пошло нее так" })
  }
}