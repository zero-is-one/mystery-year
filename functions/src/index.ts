import FirebaseFunctionsRateLimiter from "firebase-functions-rate-limiter";
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import ShortUniqueId from "short-unique-id";

admin.initializeApp();
const createGamelimiter = FirebaseFunctionsRateLimiter.withFirestoreBackend(
  {
    name: "create_game",
    maxCalls: 5,
    periodSeconds: 60,
  },
  admin.firestore()
);

const uid = new ShortUniqueId({
  dictionary: "bcdfghjkmprstwxyz".split(""),
  length: 7,
});

export const createGame = functions.https.onCall(async (data, context) => {
  if (!context.auth || !context.auth.uid) {
    throw new functions.https.HttpsError(
      "permission-denied",
      "You must be logged in to create a game"
    );
  }

  await createGamelimiter.rejectOnQuotaExceededOrRecordUsage(context.auth.uid);

  const photos = await Promise.all([
    getRandomPhoto(),
    getRandomPhoto(),
    getRandomPhoto(),
    getRandomPhoto(),
    getRandomPhoto(),
  ]);

  let id;
  while (!id) {
    id = uid();
    const snapshot = await admin.firestore().collection("games").doc(id).get();

    if (snapshot.exists) id = null;
  }

  await admin.firestore().collection("games").doc(id).set({
    photos,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    createdBy: context.auth.uid,
  });

  return {
    id,
    createdBy: context.auth.uid,
  };
});

const getRandomPhoto = async () => {
  const uid = generateRandomId();
  const photosCollection = admin.firestore().collection("photos");
  const randomQueryRef = await photosCollection
    .where("__name__", ">=", uid)
    .orderBy("__name__")
    .limit(1);
  const randomQueryData = (await randomQueryRef.get()).docs;
  return randomQueryData[0].data();
};

const generateRandomId = () => {
  return admin.firestore().collection("tmp").doc().id;
};
