// /api/register.js — Vercel + Upstash Redis
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.regusers_REDIS_URL,
  token: process.env.regusers_KV_REST_API_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body;

  if (!email || typeof email !== "string") {
    return res.status(400).json({ error: "Invalid email" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  try {
    // upsert email into a Redis set
    await redis.sadd("email_list", email);

    return res.status(200).json({ message: "Email stored successfully!" });
  } catch (error) {
    console.error("Redis Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
