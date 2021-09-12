import firestore from "./db";

type FilterField<T> = keyof T;
export abstract class DataService<T> {
  protected db: FirebaseFirestore.Firestore = firestore;
  protected collection: FirebaseFirestore.CollectionReference;

  constructor(collectionName: string) {
    this.collection = this.db.collection(collectionName);
  }

  abstract getOne(id: string): Promise<T | null>;
  abstract list(filter?: {
    field: FilterField<T>;
    condition: FirebaseFirestore.WhereFilterOp;
    value: T[FilterField<T>];
  }): Promise<T[]>;
  abstract create(payload: T): Promise<void>;
  abstract update(payload: T): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
