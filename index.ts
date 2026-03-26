import http from "http";

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
*/

const server = http.createServer((req, res) => {});

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
