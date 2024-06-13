"use client";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import React from "react";
import axios from "axios";

const OrderDetail = () => {
  const params = useParams();
  const [order, setOrder] = React.useState({});

  React.useEffect(() => {
    if (params.order_id[0]) {
      axios
        .get(`${process.env.BACKEND_API}/order/${params.order_id[0]}`)
        .then((res) => {
          const arrPrice = res.data.products.map(
            (product) => product.product_price * product.quantity
          );
          const totalPrice = arrPrice.reduce(
            (partialSum, a) => partialSum + a,
            0
          );
          setOrder({ ...res.data, total_order_price: totalPrice });
        });
    }
  }, [params.order_id[0]]);

  return (
    <main className="flex flex-col items-center w-full p-6 text-black bg-[#F5F6F7] gap-y-10 h-[100vh]">
      <h1 className="text-2xl font-bold text-center">Order Detail</h1>
      <div className="w-full px-6 py-4 bg-white divide-y rounded-lg drop-shadow">
        <div className="space-y-4 pb-[30px]">
          <div className="space-y-2.5">
            <p className="capitalize">order ID</p>
            <p className="text-xl font-bold">{order.id ? order.id : "-"}</p>
          </div>
          <div className="space-y-2.5">
            <p className="capitalize">customer name</p>
            <p className="text-xl font-bold">
              {order.customer_name ? order.customer_name : "-"}
            </p>
          </div>
          <div className="space-y-2.5">
            <p className="capitalize">total order price</p>
            <p className="text-xl font-bold">
              {order.total_order_price ? order.total_order_price : "-"}
            </p>
          </div>
        </div>
        <div className="pt-[31px] space-y-4">
          <p className="capitalize text-[#828282]">product detail</p>
          <div>
            <div className={`grid grid-cols-4`}>
              <p className="py-3 font-semibold capitalize truncate whitespace-nowrap">
                product ID
              </p>
              <p className="py-3 font-semibold capitalize truncate whitespace-nowrap">
                quantity
              </p>
              <p className="py-3 font-semibold capitalize truncate whitespace-nowrap">
                price
              </p>
              <p className="py-3 font-semibold capitalize truncate whitespace-nowrap">
                total price
              </p>
            </div>
            {order.products &&
              order.products.map((product) => {
                return (
                  <div className={`grid grid-cols-4`} key={product.id}>
                    <p className="py-3 capitalize truncate whitespace-nowrap">
                      {product.product_id ? product.product_id : "-"}
                    </p>
                    <p className="py-3 capitalize truncate whitespace-nowrap">
                      {product.quantity ? product.quantity : "-"}
                    </p>
                    <p className="py-3 capitalize truncate whitespace-nowrap">
                      {product.product_price ? product.product_price : "-"}
                    </p>
                    <p className="py-3 capitalize truncate whitespace-nowrap">
                      {product.product_price && product.quantity
                        ? product.product_price * product.quantity
                        : "-"}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </main>
  );
};

export default OrderDetail;
