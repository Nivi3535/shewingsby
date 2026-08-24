import navbar from "@/data/navbarnew.json";
import { NextResponse } from "next/server";

//simply converts to json
export async function GET() {
  return NextResponse.json(navbar);
}
