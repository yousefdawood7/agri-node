import { readFileSync } from "fs";
import http from "http";
import path from "path";

const BASE_URL = process.env.APP_URL ?? "http://localhost:3000";

const data = JSON.parse(
  readFileSync(path.join(import.meta.dirname, "data", "data.json"), "utf-8"),
) as ProductType[];

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
  path.join(import.meta.dirname, "views", "product", "styles.css"),
  "utf-8",
);

const card = readFileSync(
  path.join(import.meta.dirname, "views", "product", "product_card.html"),
  "utf-8",
);

type ProductType = {
  id: number;
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
  return template
    .replaceAll("{%PRODUCT_NAME%}", product.productName)
    .replaceAll("{%PRODUCT_EMOJI%}", product.image)
    .replaceAll("{%IS_PRODUCT_ORGANIC%}", product.organic ? "" : "not-organic")
    .replaceAll("{%PRODUCT_FROM%}", product.from)
    .replaceAll("{%PRODUCT_NUTRIENTS%}", product.nutrients)
    .replaceAll("{%PRODUCT_QUANTITY%}", product.quantity)
    .replaceAll("{%PRODUCT_PRICE%}", product.price)
    .replaceAll("{%PRODUCT_DESC%}", product.description)
    .replaceAll("{%PRODUCT_URL%}", `/product?id=${product.id}`);
};

const replaceCard = function (template: string, products: ProductType[]) {
  return template.replaceAll(
    "{%PRODUCT_CARD%}",
    products.map((product) => replaceTemplate(card, product)).join("\n"),
  );
};

const server = http.createServer((req, res) => {
  // HANDLING CSS FILES
  const { pathname, searchParams } = URL.parse(req.url!, BASE_URL)!;

  if (
    req.method === "GET" &&
    ["/product/styles.css", "/overview/styles.css"].includes(pathname)
  )
    return res
      .writeHead(200, { "content-type": "text/css" })
      .end(req.url === "/product/styles.css" ? productCSS : overviewCSS);

  if (req.method === "GET" && ["/", "/overview"].includes(pathname))
    return res
      .writeHead(200, { "content-type": "text/html" })
      .end(replaceCard(overviewPage, data));

  if (req.method === "GET" && pathname === "/product") {
    const productID = searchParams.get("id")!;
    const product = data.find((product) => product.id === +productID);

    if (!product)
      return res
        .writeHead(404, { "content-type": "text/html" })
        .end("<h1>Product Not Found</h1>");

    return res
      .writeHead(200, { "content-type": "text/html" })
      .end(replaceTemplate(productPage, product));
  }

  res
    .writeHead(404, { "content-type": "text/html" })
    .end("<h1>Page not found</h1>");
});

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
