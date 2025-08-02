import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import "server-only";

const secretKey = process.env.SESSION_SECRET;
if (!secretKey) {
  throw new Error("SESSION_SECRET environment variable is required");
}
const encodedKey = new TextEncoder().encode(secretKey);

type SessionPayload = {
  userId: number;
  expiresAt: Date;
};

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function createSession(userId: number) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId, expiresAt });

  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // 개발환경에서는 false
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function getSession() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("session");

    if (!session) return null;

    const { payload } = await jwtVerify(session.value, encodedKey);
    const sessionData = payload as SessionPayload;

    // 만료 시간 검증 추가
    if (new Date(sessionData.expiresAt) <= new Date()) {
      await deleteSession(); // 만료된 세션 삭제
      return null;
    }

    return sessionData;
  } catch (error) {
    return null;
  }
}

export async function isLoggedIn() {
  const session = await getSession();
  return session !== null && new Date(session.expiresAt) > new Date();
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

export async function logout() {
  await deleteSession();
}
