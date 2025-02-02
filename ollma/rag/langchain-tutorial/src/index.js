import { Document } from "@langchain/core/documents";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { OPENAI_API_KEY } from "./utils";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Chroma } from "@langchain/community/vectorstores/chroma";

const documents = [
  new Document({
    pageContent:
      "Dogs are great companions, known for their loyalty and friendliness.",
    metadata: { source: "mammal-pets-doc" },
  }),
  new Document({
    pageContent: "Cats are independent pets that often enjoy their own space.",
    metadata: { source: "mammal-pets-doc" },
  }),
];

const generateData = async () => {
  const FILE_NAME = "kaynes.pdf";
  const FILE_PATH = `./src/data/${FILE_NAME}`;
  const loader = new PDFLoader(FILE_PATH);

  const docs = await loader.load();
  console.log(`#of page in ${FILE_NAME}: ${docs.length}`);

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const splits = await textSplitter.splitDocuments(docs);
  console.log(`#of splits: ${splits.length}`);
  const embeddings = new OpenAIEmbeddings({
    model: "text-embedding-3-large",
    apiKey: OPENAI_API_KEY,
  });

  const vector1 = await embeddings.embedQuery(splits[0].pageContent);
  // const vector2 = await embeddings.embedQuery(splits[1].pageContent);

  // console.assert(vector1.length === vector2.length);
  console.log(`Generated vectors of length ${vector1.length}\n`);
  console.log(vector1.slice(0, 10));

  const vectorStore = new Chroma(embeddings, {
    collectionName: "a-test-collection",
  });

  await vectorStore.addDocuments(allSplits);

  const results1 = await vectorStore.similaritySearch(
    "When was Nike incorporated?"
  );
  
  results1[0];
};

generateData().then(() => {
  console.log("done");
}).catch((e) => {
  console.error(e);
});
