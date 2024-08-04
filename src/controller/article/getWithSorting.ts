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

// const totalDocuments = await ArticleModel.countDocuments(query); // before paginating
// query.skip(SKIP).limit(PERPAGE); // paginating



/*

export const getWithSorting123 = async (req: Request<{}, {}, {}, IQuery>, res: Response) => {
  try {
    const { service, priceMin, priceMax, state, city, sort, page } = req.query;

    const pipeline: mongoose.PipelineStage[] = [];

    pipeline.push({
      $lookup: {
        from: 'user',
        localField: 'ownerId',
        foreignField: '_id',
        as: 'ownerId_NEWFIELD',
      }
    });

    // pipeline.push({
    //   $unwind: '$ownerId',
    // });

    if (service) {
      const serviceArray = service.split(",");
      pipeline.push({
        $match: { service: { $in: serviceArray } }
      });
    }

    if (priceMin || priceMax) {
      const minPrice = Number(priceMin) || 0;
      const maxPrice = Number(priceMax) || 1000;

      pipeline.push({
        $match: {
          $or: [
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
          ]
        }
      });
    }

    if (state && city) {
      pipeline.push({
        $match: {
          'ownerId.state': state,
          'ownerId.city': city
        }
      });
    }

    if (sort === "По цене") {
      pipeline.push({
        $sort: { priceMin: 1 }
      })
    }

    if (sort === "По популярности") {
      pipeline.push({
        $sort: { viewsCount: -1 }
      })
    }

    if (sort === "По рейтингу") {
      pipeline.push({
        $sort: { rating: -1 }
      })
    }

    const totalDocuments = await ArticleModel.aggregate(pipeline).exec();

    const PERPAGE = 9;
    const PAGE = page ?? 0;
    const SKIP = PAGE * PERPAGE;

    pipeline.push({
      $skip: SKIP
    });

    pipeline.push({
      $limit: PERPAGE
    });

    const articles = await ArticleModel.aggregate(pipeline).exec();

    return res.json({ articles, totalDocuments: totalDocuments.length });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ err: "Что-то пошло не так" });
  }
}

*/