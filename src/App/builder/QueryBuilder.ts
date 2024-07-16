/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    (this.modelQuery = modelQuery), (this.query = query);
  }

  search(searchableFields: string[]) {
    const { searchTerm } = this?.query;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          field =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' }, // Use regular expressions for case-insensitive search
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }

  filter() {
    const {
      searchTerm,
      sort,
      limit,
      page,
      fields,
      category,
      priceRange,
      ...queryObject
    } = this.query;

    if (category) {
      const categories = (category as string).split(',');
      queryObject.category = { $in: categories };
    }

    if (priceRange) {
      const maxPrice = parseInt(priceRange as string, 10);
      queryObject.price = { $lte: maxPrice };
    }

    queryObject['isDeleted'] = false;

    

    this.modelQuery = this.modelQuery.find(queryObject as FilterQuery<T>);

    return this;
  }

  sort() {
    const { sort } = this?.query;

    const sorting = sort
      ? (sort as string)?.split(',').join(' ')
      : '-createdAt';

    this.modelQuery = this.modelQuery.sort(sorting);

    return this;
  }

  paginate() {
    const { page, limit } = this?.query;
    const pageNumber = Number(page as string) || 1;
    const limitDataCount = Number(limit as string) || 10;
    const skip = page ? (pageNumber - 1) * limitDataCount : 0;

    this.modelQuery = this.modelQuery.skip(skip).limit(limitDataCount);
    return this;
  }

  fieldQuery() {
    const { fields } = this?.query;
    // Define the fields to show in the result, defaulting to excluding '__v' if not provided
    const fieldsToShow = fields
      ? (fields as string)?.split(',').join(' ')
      : '-__v';

    // Select only the specified fields in the final query
    this.modelQuery = this.modelQuery.select(fieldsToShow);

    return this;
  }

  async countTotal() {
    const totalQueries = this.modelQuery.getFilter();
    const total = await this.modelQuery.model.countDocuments(totalQueries);
    const { page, limit } = this?.query;
    const pageNumber = Number(page as string) || 1;
    const limitDataCount = Number(limit as string) || 10;
    const totalPage = Math.ceil(total / limitDataCount);

    return { total, pageNumber, limitDataCount, totalPage };
  }
}

export default QueryBuilder;
