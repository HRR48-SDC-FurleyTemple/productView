import http from 'k6/http';
import { sleep } from 'k6';
export let options = {
  stages: [
    { duration: '10s', target: 10 },
    { duration: '30s', target: 100 },
    { duration: '30s', target: 300 },
    { duration: '30s', target: 100 },
    { duration: '20s', target: 0 },
  ],
};
export default function () {
  const record = Math.floor(Math.random() * (1000000) + 9000000);
  if (Math.random() <= 0.1) {
    const product = {
      name: "Product Name",
      description: "this is the description",
      articleNumber: "27.4541.24.523",
      details: "these are details",
      materials: "there are random materials",
      sustainability: "sustainability information",
      width: 4,
      length: 4,
      height: 4,
      weight: 4,
      packages: 4,
      shortDesc: "this is a short description",
      threadCount: 4,
      pillowcaseQuantity: 4,
      duvetCoverLength: 4,
      duvetCoverWidth: 4,
      pillowcaseLength: 4,
      pillowcaseWidth: 4,
      fitting: "this is fitting information",
      imagesurls: `[
        'http://placeimg.com/640/480/fashion',
        'http://placeimg.com/640/480/abstract',
        'http://placeimg.com/640/480/animals',
        'http://placeimg.com/640/480/business',
        'http://placeimg.com/640/480/cats',
        'http://placeimg.com/640/480/city'
        ]`
    };
    http.post(`http://localhost:3050/api/productView/products/${record}`, product);
  } else {
    http.get(`http://localhost:3050/api/productView/products/${record}`);
  }
  sleep(1);
}