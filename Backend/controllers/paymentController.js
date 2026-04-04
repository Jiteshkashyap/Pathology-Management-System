import { stripe } from "../config/stripe.js";
import PackageModel from "../models/packageModel.js";
import TestModel from "../models/testModel.js";
import {
  calculatePackagePrice,
  calculateTestsPrice,
} from "../utils/priceCalculator.js";

export const createCheckoutSession = async (req, res) => {
  const { test, package: pkgId, appointmentDate, slotTime } = req.body;

  let amount = 0;
  let name = "";

  if (pkgId) {
    const pkg = await PackageModel.findById(pkgId).populate("tests");

    amount = calculatePackagePrice(pkg);
    name = pkg.name;
  } else if (test?.length) {
    const tests = await TestModel.find({ _id: { $in: test } });

    amount = calculateTestsPrice(tests);
    name = "Selected Tests";
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],

    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: { name },
          unit_amount: Math.round(amount * 100),
        },
        quantity: 1,
      },
    ],

    mode: "payment",

    success_url: `${process.env.FRONTEND_URL}/my-appointments?payment=success`,
    cancel_url: `${process.env.FRONTEND_URL}/appointments`,

    metadata: {
      bookingData: JSON.stringify({
        ...req.body,
        patient: req.user.id,
      }),
    },
  });

  res.json({ url: session.url });
};