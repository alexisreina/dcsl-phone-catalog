import { DataService } from "./DataService";

export interface Phone {
  id?: string;
  // created?: string;
  name?: string;
  description?: string;
  memory?: number;
  ram?: number;
  manufacturer?: string;
  color?: string;
  image?: {
    src: string;
    width: number;
    height: number;
  };
  price?: number;
  processor?: string;
  screen?: string;
}

type FilterField = keyof Phone;

interface Filter {
  field: FilterField;
  condition: FirebaseFirestore.WhereFilterOp;
  value: Phone[FilterField];
}

export class PhoneService extends DataService<Phone> {
  async getOne(id: string): Promise<Phone | null> {
    const doc = await this.collection.doc(id).get();
    const data = doc.data();

    if (doc.exists && data) {
      return {
        id: doc.id,
        // created: doc.createTime?.toDate().toDateString(),
        ...data,
      };
    }

    return null;
  }

  async list(filter?: Filter): Promise<Phone[]> {
    let ref:
      | FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>
      | FirebaseFirestore.Query<FirebaseFirestore.DocumentData>;

    ref = this.collection;

    if (filter) {
      ref = this.collection.where(filter.field, filter.condition, filter.value);
    }

    const collection = await ref.get();

    return collection.docs.map((doc) => ({
      id: doc.id,
      // created: doc.createTime?.toDate().toDateString(),
      ...doc.data(),
    }));
  }

  async create(phone: Phone): Promise<void> {
    if (phone) {
      const res = this.collection.add(phone);
      console.log(res);
    }
  }

  async update(update: Phone): Promise<void> {
    const { id } = update;

    if (id) {
      const doc = this.collection.doc(id);
      const data = { ...update };
      delete data.id;
      const res = await doc.update(data);
      console.log(res);
    }
  }

  async delete(id: string): Promise<void> {
    if (id) {
      const res = await this.collection.doc(id).delete();
      console.log(res);
    }
  }
}

const phoneService = new PhoneService(process.env.FIREBASE_DB || "");

export default phoneService;
