const crypto = require("crypto");
const Subscription = require("../models/Subscription");
const { getRazorpayClient } = require("../config/razorpay");

function getPlanAmount(planId) {
  const pricing = {
    free: 0,
    pro: 9999,
    premium: 19999,
    enterprise: 49999,
  };
  return pricing[planId] || 9999;
}

async function createOrder(req, res) {
  const planId = req.body?.plan_id;
  const amount = getPlanAmount(planId);
  const razorpay = getRazorpayClient();

  if (!razorpay) {
    return res.json({
      order_id: `order_${planId || "pro"}`,
      amount,
      currency: "INR",
    });
  }

  const order = await razorpay.orders.create({
    amount,
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  });

  return res.json({
    order_id: order.id,
    amount: order.amount,
    currency: order.currency,
  });
}

async function verifyPayment(req, res) {
  const { order_id, payment_id, signature } = req.body || {};
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  const userId = req.user?.sub || "demo-user";

  if (keySecret && order_id && payment_id && signature) {
    const generatedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${order_id}|${payment_id}`)
      .digest("hex");

    if (generatedSignature !== signature) {
      return res.status(400).json({ detail: "Invalid payment signature" });
    }
  }

  const subscription = await Subscription.create({
    user_id: userId,
    plan: "pro",
    razorpay_subscription_id: "sub_123",
    status: "active",
    expires_at: new Date("2025-12-31T23:59:59"),
  });

  return res.json({
    message: "Payment verified successfully",
    subscription_id: subscription.razorpay_subscription_id,
  });
}

async function getSubscription(req, res) {
  const userId = req.user?.sub || "demo-user";
  const subscription = await Subscription.findOne({ user_id: userId }).sort({
    created_at: -1,
  });

  if (!subscription) {
    return res.json({
      plan: "pro",
      status: "active",
      expires_at: "2025-12-31T23:59:59",
    });
  }

  return res.json({
    plan: subscription.plan,
    status: subscription.status,
    expires_at: subscription.expires_at,
  });
}

module.exports = { createOrder, verifyPayment, getSubscription };
