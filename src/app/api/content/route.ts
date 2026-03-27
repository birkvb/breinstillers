import { NextRequest, NextResponse } from "next/server";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO = process.env.GITHUB_REPO || "birkvb/breinstillers";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

function checkAuth(request: NextRequest) {
  const password = request.headers.get("x-admin-password");
  return password === ADMIN_PASSWORD;
}

export async function GET(request: NextRequest) {
  if (!checkAuth(request)) return unauthorized();

  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page");
  if (!page || !["home", "wietske", "contact"].includes(page)) {
    return NextResponse.json({ error: "Invalid page" }, { status: 400 });
  }

  const res = await fetch(
    `https://api.github.com/repos/${REPO}/contents/content/pages/${page}.json`,
    { headers: { Authorization: `Bearer ${GITHUB_TOKEN}` }, cache: "no-store" }
  );
  const data = await res.json();
  const content = JSON.parse(Buffer.from(data.content, "base64").toString());
  return NextResponse.json({ content, sha: data.sha });
}

export async function PUT(request: NextRequest) {
  if (!checkAuth(request)) return unauthorized();

  const { page, content, sha } = await request.json();
  if (!page || !["home", "wietske", "contact"].includes(page)) {
    return NextResponse.json({ error: "Invalid page" }, { status: 400 });
  }

  const encoded = Buffer.from(JSON.stringify(content, null, 2)).toString("base64");
  const res = await fetch(
    `https://api.github.com/repos/${REPO}/contents/content/pages/${page}.json`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `Update ${page} content via admin panel`,
        content: encoded,
        sha,
      }),
    }
  );

  if (!res.ok) {
    const err = await res.json();
    return NextResponse.json({ error: err.message }, { status: res.status });
  }

  return NextResponse.json({ success: true });
}
