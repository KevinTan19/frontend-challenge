"use client";
import React from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

const initialStateOrderForm = {
  customer_name: "",
  products: {
    product1: {
      product_id: "",
      quantity: "",
    },
  },
};

const NewOrder = () => {
  const [orderForm, setOrderForm] = React.useState(initialStateOrderForm);
  const [products, setProducts] = React.useState([]);
  const router = useRouter();

  const addProductField = () => {
    const length = Object.keys(orderForm.products).length + 1;
    const key = "product" + length;
    setOrderForm({
      ...orderForm,
      products: {
        ...orderForm.products,
        [key]: {
          product_id: "",
          quantity: "",
        },
      },
    });
  };

  React.useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    axios.get(`${process.env.BACKEND_API}/products`).then((res) => {
      setProducts(res.data.data);
    });
  };

  const postOrder = (e) => {
    e.preventDefault();
    const formatOrderForm = {
      ...orderForm,
      products: Object.values(orderForm.products),
    };
    axios({
      method: "POST",
      url: `${process.env.BACKEND_API}/order`,
      data: formatOrderForm,
    }).then((res) => (res.data.success ? router.push("/") : null));
  };

  React.useEffect(() => {
    console.log(orderForm);
    // if (orderForm.products.product1.product_id) {
    //   console.log(orderForm.products.product1.product_id);
    //   console.log(
    //     products.filter(
    //       (product) => product.id == orderForm.products.product1.product_id
    //     )[0].price
    //   );
    // }
  }, [orderForm]);
  return (
    <main className="flex flex-col items-center w-full p-6 text-black bg-[#F5F6F7] gap-y-10 min-h-[100vh]">
      <h1 className="text-2xl font-bold text-center">Add New Order</h1>
      <div className="w-full px-6 py-4 bg-white divide-y rounded-lg drop-shadow">
        <form className="w-full divide-y" onSubmit={(e) => postOrder(e)}>
          <div className="w-1/2 pb-8 space-y-1">
            <label className="capitalize">
              customer name <span className="text-red-500">*</span>
            </label>
            <input
              type={"text"}
              className="w-full border-[1px] border-[#E0E0E0] rounded py-1.5 px-4"
              placeholder="Input customer name"
              onChange={(e) =>
                setOrderForm({ ...orderForm, customer_name: e.target.value })
              }
              value={orderForm.customer_name}
            />
          </div>
          {Object.keys(orderForm.products).map((key) => {
            return (
              <div className="py-8 space-y-2.5 " key={key}>
                <p className="capitalize text-[#828282]">product detail</p>
                <div className="grid grid-cols-2 gap-x-8">
                  <div className="w-full space-y-8">
                    <div className="w-full space-y-1">
                      <label className="capitalize">
                        product name <span className="text-red-500">*</span>
                      </label>
                      <select
                        className="w-full border-[1px] border-[#E0E0E0] rounded py-1.5 px-4"
                        onChange={(e) =>
                          setOrderForm({
                            ...orderForm,
                            products: {
                              ...orderForm.products,
                              [key]: {
                                ...orderForm.products[key],
                                product_id: e.target.value,
                              },
                            },
                          })
                        }
                        defaultValue={orderForm.products[key].product_id}
                      >
                        <option disabled value={""}>
                          Select product name
                        </option>
                        {products.map((product) => {
                          return (
                            <option value={product.id} key={product.id}>
                              {product.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="w-full space-y-1">
                      <label className="capitalize">
                        quantity <span className="text-red-500">*</span>
                      </label>
                      <input
                        type={"text"}
                        className="w-full border-[1px] border-[#E0E0E0] rounded py-1.5 px-4"
                        placeholder="Input quantity"
                        value={orderForm.products[key].quantity}
                        onChange={(e) =>
                          setOrderForm({
                            ...orderForm,
                            products: {
                              ...orderForm.products,
                              [key]: {
                                ...orderForm.products[key],
                                quantity: e.target.value,
                              },
                            },
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="w-full space-y-8">
                    <div className="w-full space-y-1">
                      <p className="capitalize">price</p>
                      <p className="w-full border-[1px] border-[#E0E0E0] rounded py-1.5 px-4 bg-[#E0E0E0] text-[#828282]">
                        {orderForm.products[key].product_id
                          ? `
                            ${
                              products.filter(
                                (product) =>
                                  product.id ==
                                  orderForm.products[key].product_id
                              )[0].price
                            }
                            `
                          : "You need to select product name"}
                      </p>
                    </div>
                    <div className="w-full space-y-1">
                      <p className="capitalize">total product price</p>
                      <p className="w-full border-[1px] border-[#E0E0E0] rounded py-1.5 px-4 bg-[#E0E0E0] text-[#828282]">
                        {orderForm.products[key].product_id &&
                        orderForm.products[key].quantity
                          ? `
                            ${
                              products.filter(
                                (product) =>
                                  product.id ==
                                  orderForm.products[key].product_id
                              )[0].price * orderForm.products[key].quantity
                            }
                            `
                          : "You need to input quantity & select product name"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <button
            className="px-4 py-2 rounded font-bold bg-[#052A49] text-white mb-8"
            onClick={(e) => {
              e.preventDefault();
              addProductField();
            }}
          >
            Add New Order
          </button>

          <div className="w-full pt-8 space-y-12">
            <div className="w-1/2 space-y-1">
              <p className="capitalize">total order price</p>
              <p className="w-full border-[1px] border-[#E0E0E0] rounded py-1.5 px-4 bg-[#E0E0E0] text-[#828282] capitalize">
                total price
              </p>
            </div>
            <div className="flex w-full gap-x-4">
              <button
                className="px-12 py-2 rounded font-bold bg-[#1BA8DF] text-white mb-8 capitalize"
                type="submit"
              >
                save
              </button>
              <Link
                className="px-12 py-2 rounded font-bold border-[1px] border-[#E0E0E0] text-[#052A49] mb-8 capitalize flex items-center justify-center"
                href="/"
              >
                back
              </Link>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default NewOrder;
