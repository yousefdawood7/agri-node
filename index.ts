import { readFileSync } from "fs";
import http from "http";
import path from "path";

const data = JSON.parse(
  readFileSync(path.join(import.meta.dirname, "data", "data.json"), "utf-8"),
);

const overviewPage = readFileSync(
  path.join(import.meta.dirname, "views", "overview", "overview.html"),
  "utf-8",
);

const overviewCSS = readFileSync(
  path.join(import.meta.dirname, "views", "overview", "styles.css"),
  "utf-8",
);

const productPage = readFileSync(
  path.join(import.meta.dirname, "views", "product", "product.html"),
  "utf-8",
);

const productCSS = readFileSync(
  path.join(import.meta.dirname, "views", "product", "product.html"),
  "utf-8",
);

const card = readFileSync(
  path.join(import.meta.dirname, "views", "product", "product_card.html"),
  "utf-8",
);

type ProductType = {
  id: string;
  productName: string;
  image: string;
  from: string;
  nutrients: string;
  quantity: string;
  price: string;
  organic: boolean;
  description: string;
};

const replaceTemplate = function (template: string, product: ProductType) {
  /*
    {%PRODUCT_NAME%}
    {%PRODUCT_EMOJI%}
    {%IS_PRODUCT_ORGANIC%}
    {%PRODUCT_FROM%}
    {%PRODUCT_NUTRIENTS%}
    {%PRODUCT_QUANTITY%}
    {%PRODUCT_PRICE%}
    {%PRODUCT_DESC%}
    {%PRODUCT_URL%}
    {%PRODUCT_CARD%}
*/

  return template
    .replaceAll("{%PRODUCT_NAME%}", product.productName)
    .replaceAll("{%PRODUCT_EMOJI%}", product.image)
    .replaceAll("{%IS_PRODUCT_ORGANIC%}", product.organic ? "" : "not-organic")
    .replaceAll("{%PRODUCT_FROM%}", product.from)
    .replaceAll("{%PRODUCT_NUTRIENTS%}", product.nutrients)
    .replaceAll("{%PRODUCT_QUANTITY%}", product.quantity)
    .replaceAll("{%PRODUCT_PRICE%}", product.price)
    .replaceAll("{%PRODUCT_DESC%}", product.description)
    .replaceAll(
      "{%PRODUCT_URL%}",
      `${process.env.APP_URL ?? "localhost:3000"}/product/${product.id}`,
    );
};

const replaceCard = function (template: string, products: ProductType[]) {
  return template.replaceAll(
    "{%PRODUCT_CARD%}",
    products.map((product) => replaceTemplate(card, product)).join("\n"),
  );
};

const server = http.createServer((req, res) => {
  if (req.method === "GET" && ["/", "/overview"].includes(req.url!)) {
  }
});

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
