// This is handled by next.config.js rewrites, but for completeness (optional dynamic route)
import { createProxyMiddleware } from 'http-proxy-middleware';  // If needed, add to deps

// Next.js API routes can proxy, but rewrites are simpler.
export default function handler(req: any, res: any) {
  res.status(404).json({ message: 'Use rewrites for proxying.' });
}