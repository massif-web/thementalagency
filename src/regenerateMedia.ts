import "dotenv/config";
import path from "node:path";
import config from "@payload-config";
import { getPayload } from "payload";
import { migrateBlurDataUrls } from "./blurDataUrlsMigrationScript";

async function regenerateMedia() {
  try {
    const payload = await getPayload({ config });
    const media = await payload.find({
      collection: "media",
      depth: 0,
      limit: 200,
    });

    if (!media.totalDocs) {
      console.log("No media found");
      return;
    }

    for (const mediaDoc of media.docs) {
      const staticDir = path.resolve(
        import.meta.filename,
        "../../public/media",
      );

      try {
        await payload.update({
          collection: "media",
          id: mediaDoc.id,
          data: mediaDoc,
          overwriteExistingFiles: true,
          filePath: `${staticDir}/${mediaDoc.filename}`,
        });

        console.log(`Media ${mediaDoc.id} (${mediaDoc.filename}) updated.`);
      } catch (err) {
        console.error(err);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

await regenerateMedia();
await migrateBlurDataUrls();
process.exit(0);
