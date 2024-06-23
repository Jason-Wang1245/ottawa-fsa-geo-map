import { NextRequest, NextResponse } from "next/server";
import { data } from "../../data/data";

export async function GET(request: NextRequest) {
  return NextResponse.json(data);
}
