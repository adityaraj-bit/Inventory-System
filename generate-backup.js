import fs from "fs";
import archiver from "archiver";
import bcrypt from "bcryptjs";
import { faker } from "@faker-js/faker";

const OUT = "./backup_data";
const ZIP = "backup.zip";

if (!fs.existsSync(OUT)) fs.mkdirSync(OUT);

function csv(file, headers, rows) {
  if (!rows || rows.length === 0) return;
  
  const content =
    headers.join(",") +
    "\n" +
    rows
      .map((r) =>
        headers
          .map((h) => {
            let v = r[h] ?? "";
            v = String(v).replace(/,/g, " "); // avoid CSV break
            return v;
          })
          .join(",")
      )
      .join("\n");

  fs.writeFileSync(`${OUT}/${file}`, content);
}

function date() {
  return faker.date.past({ years: 2 }).toISOString();
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

(async () => {

const users = [];
const categories = [];
const suppliers = [];
const customers = [];
const products = [];
const orders = [];
const orderItems = [];

const password = await bcrypt.hash("password123",10);

const COUNT = {
  users: 10,
  categories: 15,
  suppliers: 20,
  customers: 100,
  products: 200,
  orders: 500
};

//////////////// USERS //////////////////

for (let i=1;i<=COUNT.users;i++){
  users.push({
    id:`u${i}`,
    email:`user${i}@test.com`,
    password,
    name:faker.person.fullName(),
    role:i===1?"ADMIN":"MANAGER",
    isActive:true,
    createdAt:date(),
    updatedAt:date()
  });
}

//////////////// CATEGORIES //////////////////

for (let i=1;i<=COUNT.categories;i++){
  categories.push({
    id:`c${i}`,
    name:`Category ${i}`,
    isActive:true,
    createdAt:date()
  });
}

//////////////// SUPPLIERS //////////////////

for (let i=1;i<=COUNT.suppliers;i++){
  suppliers.push({
    id:`s${i}`,
    name:`Supplier ${i}`,
    email:`supplier${i}@mail.com`,
    phone:`9${faker.number.int({min:100000000,max:999999999})}`,
    address:`City ${i}`,
    isActive:true,
    createdAt:date()
  });
}

//////////////// CUSTOMERS //////////////////

for (let i=1;i<=COUNT.customers;i++){
  customers.push({
    id:`cust${i}`,
    name:`Customer ${i}`,
    email:`customer${i}@mail.com`,
    phone:`8${faker.number.int({min:100000000,max:999999999})}`,
    address:`City ${i}`,
    createdAt:date()
  });
}

//////////////// PRODUCTS //////////////////

for (let i=1;i<=COUNT.products;i++){

  const category = pick(categories);
  const supplier = pick(suppliers);

  products.push({
    id:`p${i}`,
    name:`Product ${i}`,
    description:`Product description ${i}`,
    price:faker.number.int({min:100,max:80000}),
    sku:`SKU-${i}`,
    stock:faker.number.int({min:10,max:500}),
    categoryId:category.id,
    supplierId:supplier.id,
    isActive:true,
    createdAt:date(),
    updatedAt:date()
  });
}

//////////////// ORDERS //////////////////

let oiId=1;

for (let i=1;i<=COUNT.orders;i++){

  const type = i % 2 === 0 ? "SALE" : "PURCHASE";
  const user = pick(users);
  const customer = type === "SALE" ? pick(customers) : null;
  const supplier = type === "PURCHASE" ? pick(suppliers) : null;

  const orderId=`ord${i}`;
  let total=0;
  const itemCount=faker.number.int({min:1,max:5});

  for (let j=0;j<itemCount;j++){
    const product = pick(products);
    const qty=faker.number.int({min:1,max:20});
    const price=product.price;

    orderItems.push({
      id:`oi${oiId++}`,
      orderId,
      productId:product.id,
      quantity:qty,
      price
    });

    total+=qty*price;
  }

  orders.push({
    id:orderId,
    type,
    customerId:customer?.id || "",
    supplierId:supplier?.id || "",
    status:"COMPLETED",
    totalAmount:total,
    createdAt:date(),
    updatedAt:date(),
    createdBy:user.id
  });
}

//////////////// WRITE CSV //////////////////

csv("users.csv",Object.keys(users[0]),users);
csv("categories.csv",Object.keys(categories[0]),categories);
csv("suppliers.csv",Object.keys(suppliers[0]),suppliers);
csv("customers.csv",Object.keys(customers[0]),customers);
csv("products.csv",Object.keys(products[0]),products);
csv("orders.csv",Object.keys(orders[0]),orders);
csv("order_items.csv",Object.keys(orderItems[0]),orderItems);

//////////////// ZIP //////////////////

const output = fs.createWriteStream(ZIP);
const archive = archiver("zip");

archive.pipe(output);

fs.readdirSync(OUT).forEach(f=>{
  archive.file(`${OUT}/${f}`,{name:f});
});

await archive.finalize();

console.log("backup.zip generated successfully");

})();