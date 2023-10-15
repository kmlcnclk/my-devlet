import {
  Model,
  Document,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
  UpdateWriteOpResult,
} from "mongoose";

export default class BaseDAO<T extends Document> {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  public async findById(id: string): Promise<T | null> {
    const result: T | null = await this.model.findById(id).exec();
    return result ? (result.toObject() as T) : null;
  }

  public async findOne(where: FilterQuery<T>): Promise<T | null> {
    const result: T | null = await this.model.findOne(where).exec();
    return result ? (result.toObject() as T) : null;
  }

  public async findAll(): Promise<T[]> {
    const result: T[] = await this.model.find().exec();
    return result.map((r) => r.toObject() as T);
  }

  public async remove(where: FilterQuery<T>): Promise<boolean> {
    const result = await this.model.deleteOne(where).exec();
    return result.deletedCount === 1;
  }

  public async findByIdAndUpdate(
    id: string,
    update: UpdateQuery<T>,
    options: QueryOptions = { new: false }
  ): Promise<T | null> {
    const result: T | null = await this.model
      .findByIdAndUpdate(id, update, options)
      .exec();
    return result ? (result.toObject() as T) : null;
  }

  public async updateMany(
    query: FilterQuery<T>,
    update: UpdateQuery<T>,
    options: QueryOptions = { new: false }
  ): Promise<object> {
    const result: UpdateWriteOpResult = await this.model
      .updateMany(query, update, options)
      .exec();
    return { result };
  }

  public async exist(where: FilterQuery<T>): Promise<any> {
    const result = await this.model.exists(where);
    return result;
  }
}
