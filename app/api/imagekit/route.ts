import ImageKit from "imagekit";
import config from "@/lib/config";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const {
  env: {
    imagekit: { publicKey, privateKey, urlEndpoint },
  },
} = config;

const imagekit = new ImageKit({ publicKey, privateKey, urlEndpoint });

export async function GET(request: NextRequest) {
  // Get the CORS headers set
  const origin = request.headers.get("origin") || "*";

  // Create response with CORS headers
  const response = NextResponse.json(imagekit.getAuthenticationParameters(), {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Credentials": "true",
    },
  });

  return response;
}

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get("origin") || "*";

  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Credentials": "true",
    },
  });
}
