import { IQuery } from "../config/interfaces";

class APIfeatures {
  query: object[];
  queryString: any;

  constructor(query: object[], queryString: object) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryObj: any = { ...this.queryString };

    const excludedFields: string[] = ["page", "sort", "limit"];
    excludedFields.forEach((el: string) => delete queryObj[el]);

    let queryStr: string | string[] | any = JSON.stringify(queryObj);

    queryStr = queryStr
      .replace(/\b(gte|gt|lt|lte|regex|in)\b/g, (match: string) => "$" + match)
      .split(",");

    this.query.find(JSON.parse(queryStr));

    return this;
  }
  sorting(): object {
    if (this.queryString.sort) {
      const sortBy: any = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-month");
    }

    return this;
  }
  paginating() {
    const page: number = this.queryString.page * 1 || 1;
    const limit: number = this.queryString.limit * 1 || 9;
    const skip: number = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

export default APIfeatures;
