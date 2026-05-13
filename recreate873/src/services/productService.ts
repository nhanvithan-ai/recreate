import {
  collection,
  getDocs,
  doc,
  setDoc,
  query,
  orderBy,
  onSnapshot,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db, auth } from "../lib/firebase";
import { Product, Category } from "../types";
import { PRODUCTS } from "../data";

/**
 * Seed Firestore products once
 */
export const bootstrapProducts = async () => {
  try {
    const productsRef = collection(db, "products");
    const snapshot = await getDocs(productsRef);

    // Seed if DB is empty or only has dummy/test docs
    if (snapshot.size < 3) {
      console.log("Seeding products...");

      for (const product of PRODUCTS) {
        await setDoc(doc(db, "products", product.id), product);
      }

      console.log("Products seeded successfully");
    } else {
      console.log("Products already exist");
    }
  } catch (error) {
    console.error("Error seeding products:", error);
  }
};

// alias
export const bootstrapData = bootstrapProducts;

/**
 * Fetch products once
 */
export const getProducts = async (): Promise<Product[]> => {
  try {
    const snapshot = await getDocs(collection(db, "products"));
    return snapshot.docs.map((doc) => doc.data() as Product);
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, "products");
    return [];
  }
};

/**
 * Fetch categories
 */
export const getCategories = async (): Promise<Category[]> => {
  try {
    const snapshot = await getDocs(collection(db, "categories"));
    return snapshot.docs.map((doc) => doc.data() as Category);
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, "categories");
    return [];
  }
};

/**
 * Live products listener
 */
export const subscribeToProducts = (
  callback: (products: Product[]) => void
) => {
  return onSnapshot(
    query(collection(db, "products"), orderBy("name")),
    (snapshot) => {
      const products = snapshot.docs.map((doc) => doc.data() as Product);
      callback(products);
    },
    (error) => {
      handleFirestoreError(error, OperationType.LIST, "products");
    }
  );
};

/**
 * Live categories listener
 */
export const subscribeToCategories = (
  callback: (categories: Category[]) => void
) => {
  return onSnapshot(
    collection(db, "categories"),
    (snapshot) => {
      const categories = snapshot.docs.map((doc) => doc.data() as Category);
      callback(categories);
    },
    (error) => {
      handleFirestoreError(error, OperationType.LIST, "categories");
    }
  );
};

/* ---------------- ERROR HANDLING ---------------- */

enum OperationType {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  LIST = "list",
  GET = "get",
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  };
}

function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    operationType,
    path,
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
  };

  console.error("Firestore Error:", errInfo);
}

/* ---------------- ADMIN CRUD ---------------- */

export const addProduct = async (product: Omit<Product, "id">) => {
  try {
    const docRef = doc(collection(db, "products"));
    const newProduct = {
      ...product,
      id: docRef.id,
    };

    await setDoc(docRef, newProduct);
    return newProduct;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, "products");
  }
};

export const updateProduct = async (
  id: string,
  updates: Partial<Product>
) => {
  try {
    await updateDoc(doc(db, "products", id), updates);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `products/${id}`);
  }
};

export const deleteProduct = async (id: string) => {
  try {
    await deleteDoc(doc(db, "products", id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `products/${id}`);
  }
};