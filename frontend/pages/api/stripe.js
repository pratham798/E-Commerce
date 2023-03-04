import Stripe from "stripe";
const stripe = new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`);

//According to documentations creating a session
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      //Create checkout session
      const session = await stripe.checkout.sessions.create({
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        shipping_address_collection: {
          allowed_countries: ["IN", "CA", "US"],
        },
        allow_promotion_codes: true,
        shipping_options: [
          { shipping_rate: "shr_1MhzECSCnqy1LvUYNAQ6Wuf8" },
          { shipping_rate: "shr_1Mi4uxSCnqy1LvUYWA9zCR41" },
        ],
        line_items: req.body.map((item) => {
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.Title,
                images: [item.image.data.attributes.formats.thumbnail.url],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };
        }),
        //Bring user to the success or failed page
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      });
      res.status(200).json(session);
    } catch (error) {
      res.status(error.statusCode || 500).json(error.message);
    }
  }
}
