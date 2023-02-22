import FirebaseFunctionsRateLimiter from "firebase-functions-rate-limiter";
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import ShortUniqueId from "short-unique-id";

admin.initializeApp();
const createGamelimiter = FirebaseFunctionsRateLimiter.withFirestoreBackend(
  {
    name: "rate_limit_create_game_action",
    maxCalls: 3,
    periodSeconds: 60,
  },
  admin.firestore()
);

const uid = new ShortUniqueId({
  dictionary: "bcdfghjkmprstwxyz".split(""),
  length: 7,
});

type FirebaseQuerable =
  | FirebaseFirestore.Query
  | admin.firestore.CollectionReference;

export const createGame = functions.https.onCall(async (data, context) => {
  if (!context.auth || !context.auth.uid) {
    throw new functions.https.HttpsError(
      "permission-denied",
      "You must be logged in to create a game"
    );
  }

  await createGamelimiter.rejectOnQuotaExceededOrRecordUsage(context.auth.uid);

  let collection: FirebaseQuerable = admin.firestore().collection("photos");

  if (data?.subject)
    collection = collection.where("subjects", "array-contains", data?.subject);

  const photos = await Promise.all([
    getRandomDocumentFromCollection(collection),
    getRandomDocumentFromCollection(collection),
    getRandomDocumentFromCollection(collection),
    getRandomDocumentFromCollection(collection),
    getRandomDocumentFromCollection(collection),
  ]);

  let id;
  while (!id) {
    id = uid();
    const snapshot = await admin.firestore().collection("games").doc(id).get();

    if (snapshot.exists) id = null;
  }

  await admin.firestore().collection("games").doc(id).set({
    photos,
    type: "all",
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    createdBy: context.auth.uid,
  });

  return {
    id,
    createdBy: context.auth.uid,
  };
});

const getRandomDocumentFromCollection = async (
  collection: FirebaseQuerable
) => {
  const uid = generateRandomId();

  const query = await collection
    .where("__name__", ">=", uid)
    .orderBy("__name__")
    .limit(1);

  const randomQueryData = (await query.get()).docs;
  return randomQueryData[0].data();
};

const generateRandomId = () => {
  return admin.firestore().collection("tmp").doc().id;
};
