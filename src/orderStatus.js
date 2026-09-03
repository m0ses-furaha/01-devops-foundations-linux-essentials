function getOrderStatus(orderId) {
  // TODO: wire up to real order store
  return { orderId, status: "pending" };
}

module.exports = { getOrderStatus };
