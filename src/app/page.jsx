"use client";

import axios from "axios";
import Link from "next/link";
import React from "react";
import { ListBulletIcon, TrashIcon } from "@heroicons/react/24/solid";

export default function Home() {
  const [orders, setOrders] = React.useState([]);

  React.useEffect(() => {
    getOrders();
  }, []);

  const getOrders = () => {
    axios
      .get(`${process.env.BACKEND_API}/orders`)
      .then((res) => setOrders(res.data.list));
  };

  const deleteOrder = (order_id) => {
    axios.delete(`${process.env.BACKEND_API}/order/${order_id}`).then((res) => {
      if (res.data.success) {
        getOrders();
      }
    });
  };

  return (
    <main className="flex flex-col items-center w-full p-6 text-black bg-[#F5F6F7] gap-y-10 min-h-[100vh]">
      <h1 className="text-2xl font-bold text-center">Order Management</h1>
      <div className="w-full px-6 py-4 space-y-6 bg-white rounded-lg drop-shadow">
        <div className="flex justify-end w-full">
          <div></div>
          <Link href={"/new"}>
            <button className="px-4 py-2 rounded bg-[#1BA8DF] text-white">
              Add New Order
            </button>
          </Link>
        </div>
        <div className="grid w-full grid-cols-6 bg-[#F5F6F7]">
          <p className="px-4 py-[18px] font-bold capitalize">order id</p>
          <p className="px-4 py-[18px] font-bold capitalize">customer</p>
          <p className="px-4 py-[18px] font-bold capitalize">total products</p>
          <p className="px-4 py-[18px] font-bold capitalize">total price</p>
          <p className="px-4 py-[18px] font-bold capitalize">order date</p>
          <p className="px-4 py-[18px] font-bold capitalize">action</p>
        </div>
        {orders.map((order, index) => {
          return (
            <div
              className={`grid grid-cols-6 ${
                index % 2 !== 0 ? "bg-[#F5F6F7]" : ""
              }`}
              key={order.id}
            >
              <p className="px-4 py-3 capitalize truncate whitespace-nowrap">
                {order.id ? order.id : "-"}
              </p>
              <p className="px-4 py-3 capitalize truncate whitespace-nowrap">
                {order.customer_name ? order.customer_name : "-"}
              </p>
              <p className="px-4 py-3 capitalize truncate whitespace-nowrap">
                {order.total_products ? order.total_products : "-"}
              </p>
              <p className="px-4 py-3 capitalize truncate whitespace-nowrap">
                {order.total_price ? order.total_price : "-"}
              </p>
              <p className="px-4 py-3 capitalize truncate whitespace-nowrap">
                {order.created_at
                  ? new Date(order.created_at).toISOString().substring(0, 10)
                  : "-"}
              </p>
              <div className="grid grid-cols-3 px-4 py-3 capitalize truncate whitespace-nowrap">
                <Link href={`/${order.id}`}>
                  <ListBulletIcon className="w-7 h-7 text-[#00B4FF] hover:bg-black/10 rounded-md p-1" />
                </Link>
                <TrashIcon
                  className="w-7 h-7 text-[#FF0000] hover:bg-black/10 rounded-md p-1"
                  onClick={() => deleteOrder(order.id)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
